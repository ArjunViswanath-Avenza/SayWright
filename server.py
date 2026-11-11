"""Saywright backend: voice/typed commands -> Visualizer form -> live React canvas. 127.0.0.1 only.

Started by the desktop shell (main.mjs); can also run alone:  python server.py   then open http://127.0.0.1:8770
Env:  SAYWRIGHT_PORT (default 8770), SAYWRIGHT_PROJECT (Visualizer project that "Save to Visualizer" writes into),
      VOICE_MODEL / VOICE_STT_MODEL as in visualizer-voice.

Reuses, without copying:
  ../visualizer-voice     rules, patterns, local model, Whisper, edit ops, session log (training data)
  ../visualizer-copilot   Form Spec, validator, .sm generator
  ../viz2react            Visualizer project -> React app (render_worker.mjs keeps it warm)

Three projects on disk:
  workspace/<Project>   the Visualizer project you save into (default: copy of committed AvenzaBank)
  work/canvas-project   scratch copy the canvas renders from; every command rewrites the form here, never in the real one
  work/canvas           viz2react output of the scratch project, served at /canvas/
"""
import json
import os
import pathlib
import re
import shutil
import subprocess
import sys
import threading
import time
import urllib.request

HERE = pathlib.Path(__file__).resolve().parent
VOICE = HERE.parent / "visualizer-voice"
VIZ2REACT = HERE.parent / "viz2react"
sys.path.insert(0, str(VOICE))

import uvicorn  # noqa: E402
from fastapi import FastAPI, Request  # noqa: E402
from fastapi.responses import FileResponse, JSONResponse  # noqa: E402
from fastapi.staticfiles import StaticFiles  # noqa: E402
from starlette.concurrency import run_in_threadpool  # noqa: E402

import voice  # noqa: E402  (puts visualizer-copilot on sys.path)
from vcp.catalogue import Catalogue  # noqa: E402
from vcp import templates as tmpl_mod  # noqa: E402
from vcp.attrs import RESP_BY_SPEC  # noqa: E402

from voice import interpret, stt  # noqa: E402
from voice import session as session_mod  # noqa: E402
from voice.export import export  # noqa: E402
from voice.ops import index as tree_index  # noqa: E402
from voice.skins import Skins  # noqa: E402
from vcp.sm_io import read_json, write_json  # noqa: E402

# SAYWRIGHT_HOME: where data, workspace, work and exports live (default: this folder). A second instance for
# testing gets its own home so it never touches the running app's session or project.
HOME = pathlib.Path(os.environ.get("SAYWRIGHT_HOME", HERE))
DATA = HOME / "data"
session_mod.DATA = DATA          # Saywright's sessions go to saywright/data/sessions, same record format

CACHE_FILES = (".cacheEntities.json", ".cacheDependency.json")   # Visualizer caches absolute paths: never copy them
SOURCE = voice.COPILOT / "work" / "head" / "AvenzaBank"
PROJECT = pathlib.Path(os.environ.get("SAYWRIGHT_PROJECT", HOME / "workspace" / "AvenzaBank"))
CANVAS_PROJECT = HOME / "work" / "canvas-project"
CANVAS = HOME / "work" / "canvas"
EXPORTS = HOME / "exports"
SAVED = DATA / "saved_forms.json"   # forms Saywright created in PROJECT: the only ones it may overwrite


def _copy_project(src, dst):
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst, ignore=shutil.ignore_patterns(*CACHE_FILES, ".git"))


if not PROJECT.exists() and SOURCE.exists():
    _copy_project(SOURCE, PROJECT)
if not (PROJECT / "projectProperties.json").exists() or not (PROJECT / "themes").is_dir():
    # e.g. a temp folder cleaned out under a test instance: forms/ left, themes gone -> every skin "does not exist"
    raise SystemExit(f"{PROJECT} is not a complete Visualizer project (no projectProperties.json or themes/). "
                     f"Restore it, or point SAYWRIGHT_PROJECT at a project.")
_copy_project(PROJECT, CANVAS_PROJECT)
DATA.mkdir(parents=True, exist_ok=True)

catalogue = Catalogue(PROJECT)
skins = Skins(catalogue, PROJECT, tmpl_mod.build([PROJECT / "forms"])[0])
session_mod.Session.roles = skins.roles
sys.path.insert(0, str(HERE))
from skinmaker import FORM_SKIN, SkinMaker, parse as parse_skin, parse_breakpoint, parse_image  # noqa: E402
maker = SkinMaker(PROJECT, CANVAS_PROJECT, DATA / "skins", catalogue, skins, read_json, write_json)   # before replay: logs name skins
session = session_mod.Session(catalogue)
TRASH = DATA / "trash"              # deleted forms, so a delete can be undone: <stamp>__<form>/{form.sm, controller, spec}


def _trashed():
    return {p.name.split("__", 1)[1] for p in TRASH.iterdir() if p.is_dir() and "__" in p.name} if TRASH.exists() else set()


# a deleted form must not come back as the session on the next start
_logs = [p for p in sorted((DATA / "sessions").glob("*.jsonl")) if p.stem.split("_", 2)[-1] not in _trashed()]
if _logs:
    try:
        session.replay(_logs[-1])   # pick up where the last run left off
    except Exception as e:      # a log that cannot be replayed must never stop the app: start on an empty form
        print(f"Saywright: could not restore {_logs[-1].name} ({e}); starting a new form. The log is kept.", flush=True)
        session = session_mod.Session(catalogue)


def _saved():
    return set(json.loads(SAVED.read_text(encoding="utf-8"))) if SAVED.exists() else set()


def _repair_saved_forms():
    """Forms Saywright saved before 2026-11-10 have flexes that stack on tablet or mobile with a preferred height but no
    autogrow: Visualizer gives them 220dp and what is inside runs over the next section. Turn autogrow on in those forms
    only (Saywright's own, never the project's other forms). Visualizer rebuilds its caches; reopen the project."""
    if str(HERE / "vision") not in sys.path:
        sys.path.insert(0, str(HERE / "vision"))
    import vizlint
    fixed = []
    for form in sorted(_saved()):
        folder = PROJECT / "forms" / "desktop" / f"{form}.sm"
        for issue in vizlint.lint(folder) if folder.is_dir() else []:
            if issue["rule"] != "grow":
                continue
            path = folder / f"{issue['id']}.json"
            w = read_json(path)
            w["autogrowmode"] = 1
            write_json(path, w)
            fixed.append(f"{form}.{issue['id']}")
    if fixed:
        for cache in CACHE_FILES:
            (PROJECT / cache).unlink(missing_ok=True)
        print(f"Repaired {len(fixed)} flexes so they grow with their content in Visualizer: {', '.join(fixed[:12])}"
              f"{' …' if len(fixed) > 12 else ''}. Reopen the project in Visualizer.", flush=True)
    return fixed


try:
    _repair_saved_forms()
except Exception as e:      # noqa: BLE001  (a repair must never stop the app starting)
    print(f"Could not check saved forms: {e}", flush=True)


class Renderer:
    """viz2react in a warm Node process (render_worker.mjs), one request at a time."""

    def __init__(self):
        self.proc, self.lock, self.seq = None, threading.Lock(), 0

    def _start(self):
        self.proc = subprocess.Popen(["node", str(HERE / "render_worker.mjs")], stdin=subprocess.PIPE,
                                     stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True, encoding="utf-8")
        json.loads(self.proc.stdout.readline())   # {"ready": true}

    def render(self, project, out_dir, forms=None):
        with self.lock:
            if self.proc is None or self.proc.poll() is not None:
                self._start()
            self.seq += 1
            req = {"id": self.seq, "project": str(project), "outDir": str(out_dir), "forms": forms}
            self.proc.stdin.write(json.dumps(req) + "\n")
            self.proc.stdin.flush()
            while True:
                line = self.proc.stdout.readline()
                if not line:
                    self.proc = None
                    return {"ok": False, "error": "render worker stopped"}
                reply = json.loads(line)
                if reply.get("id") == self.seq:
                    return reply


renderer = Renderer()
canvas = {"version": 0, "ms": None, "error": None, "form": None}


def _refresh_canvas():
    """Write the form into the scratch project exactly as Save would, then render it with viz2react."""
    t = time.time()
    try:
        info = export(session.root, catalogue, CANVAS_PROJECT)
    except Exception as e:  # the generator refused the tree: keep the last good canvas
        canvas.update(error=f"Could not build the form: {e}")
        return
    reply = renderer.render(CANVAS_PROJECT, CANVAS, [session.root.id])
    canvas.update(version=canvas["version"] + 1, ms=round((time.time() - t) * 1000), form=session.root.id,
                  error=None if reply.get("ok") else reply.get("error", "render failed").splitlines()[0],
                  widgets=info["widgets"], render_ms=reply.get("ms"))


def _state():
    return {**session.state(), "canvas": dict(canvas)}


app = FastAPI(title="Saywright")
app.mount("/ui", StaticFiles(directory=HERE / "ui"), name="ui")
CANVAS.mkdir(parents=True, exist_ok=True)
app.mount("/canvas", StaticFiles(directory=CANVAS, html=True), name="canvas")


@app.middleware("http")
async def local_only(request, call_next):
    if request.client and request.client.host not in ("127.0.0.1", "::1"):
        return JSONResponse({"error": "local only"}, status_code=403)
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-cache"   # the canvas files change after every command
    return response


@app.get("/")
def index():
    return FileResponse(HERE / "ui" / "index.html")


@app.get("/api/status")
def status():
    try:
        urllib.request.urlopen("http://127.0.0.1:11434/api/tags", timeout=2)
        ollama = True
    except OSError:
        ollama = False
    return {"stt": stt.available(), "stt_model": stt.MODEL_NAME, "model": interpret.MODEL, "ollama": ollama,
            "project": str(PROJECT), "project_name": PROJECT.name, "components": session.components,
            "forms": sorted(p.stem for p in (PROJECT / "forms" / "desktop").glob("*.sm")),
            "saved": sorted(_saved()), "problems": catalogue.problems()}


@app.get("/api/state")
def state():
    if canvas["form"] != session.root.id:
        _refresh_canvas()
    return _state()


@app.post("/api/command")
async def command(req: Request):
    body = await req.json()
    text = (body.get("text") or "").strip()
    if not text:
        return {"say": "Say or type a command.", "ok": False, **_state()}
    # refresh false: a step inside a long prompt; rendering every step would take most of the time
    refresh = body.get("refresh", True)
    wanted = DELETE_FORM.match(text)
    if wanted:      # said or typed: it only opens the confirmation, so a misheard word cannot delete a form
        name = wanted.group(1)
        form = session.root.id if not name else (name if re.fullmatch(r"frm[A-Z0-9]\w*", name) else "frm" + "".join(w.capitalize() for w in _form_words(name).split()))
        # "delete the form field" is about a widget: only a name that really is a form, or says frm..., comes here
        if not name or form == session.root.id or form in _saved() or re.fullmatch(r"frm[A-Z0-9]\w*", name):
            return {"ok": True, "path": "form", "say": f"Confirm deleting {form}.", "ask_delete": form, **_state()}
    asked = parse_skin(text)
    if asked:
        return {**_skin_command(asked, refresh), **_state()}
    for answer in (_widget_command(text), _breakpoint_command(text), _form_skin_command(text), _image_command(text)):
        if answer:
            if answer["ok"] and refresh:
                _refresh_canvas()
            return {**answer, **_state()}
    result = session.handle(text, body.get("source", "typed"), body.get("stt_ms"))
    if result.get("export"):
        result.update(_save())
    if result.get("ok") and refresh:
        _refresh_canvas()
    return {**result, **_state()}


# ---------- what a widget is for: change it into another kind, or move it ----------
import widgets as widget_mod  # noqa: E402

KIND_WORDS = {"text box": "textbox", "textbox": "textbox", "text field": "textbox", "input": "textbox", "field": "textbox",
              "password": "password", "password box": "password", "password field": "password",
              "dropdown": "dropdown", "drop down": "dropdown", "list box": "dropdown", "select": "dropdown", "picker": "dropdown",
              "date picker": "date", "date": "date", "calendar": "date", "button": "button", "link": "link", "label": "label",
              "text": "label", "checkbox": "checkbox", "check box": "checkbox", "tick box": "checkbox", "radio": "radio",
              "radio button": "radio", "radio option": "radio", "switch": "switch", "toggle": "switch"}
# "make this a dropdown", "turn lblEmail into a text box", "change it to a date picker", "convert that to a link"
CONVERT = re.compile(r"^(?:please\s+)?(?:make|turn|change|convert)\s+(this|it|that|[A-Za-z]\w*)\s+(?:(?:in)?to\s+)?(?:a |an )?(" +
                     "|".join(sorted(map(re.escape, KIND_WORDS), key=len, reverse=True)) + r")(?:\s+widget)?[.!]?$", re.I)
ARRANGE_SAID = [(re.compile(r"^(?:please\s+)?move\s+(?:this|it)\s+up[.!]?$", re.I), "up"),
                (re.compile(r"^(?:please\s+)?move\s+(?:this|it)\s+down[.!]?$", re.I), "down"),
                (re.compile(r"^(?:please\s+)?(?:move|take)\s+(?:this|it)\s+out(?:\s+of\s+(?:the|its)\s+(?:container|flex|row|column))?[.!]?$", re.I), "out"),
                (re.compile(r"^(?:please\s+)?put\s+(?:this|it)\s+(?:in\s+a\s+row|side by side)\s+with\s+the\s+next(?:\s+one)?[.!]?$", re.I), "row"),
                (re.compile(r"^(?:please\s+)?put\s+(?:this|it)\s+in\s+a\s+column\s+with\s+the\s+next(?:\s+one)?[.!]?$", re.I), "column"),
                (re.compile(r"^(?:please\s+)?unwrap\s+(?:this|it)[.!]?$", re.I), "unwrap"),
                (re.compile(r"^(?:please\s+)?(?:centre|center)\s+(?:this|it)[.!]?$", re.I), "center")]


def _widget(wid):
    idx = tree_index(session.root)
    if not wid or wid not in idx:
        return None, None, None, idx
    node, parent = idx[wid]
    grand = idx[parent.id][1] if parent is not None and parent.id in idx else None
    return node, parent, grand, idx


def _convert(wid, to):
    node, parent, _g, idx = _widget(wid)
    if node is None or parent is None:
        return {"ok": False, "say": "Select a widget first."}
    try:
        after = widget_mod._after(parent, node)
        ops, new_id, note = widget_mod.convert(node, parent, idx, to, maker, after)
    except ValueError as e:
        return {"ok": False, "say": str(e)}
    result = session.edit(ops, f"panel: change {wid} into a {widget_mod.KINDS[to][1].lower()}")
    if result["ok"]:
        session.select(new_id)
        _refresh_canvas()
        result["say"] = f"{wid} is now a {widget_mod.KINDS[to][1].lower()}, {new_id}." + (f" {note}" if note else "")
        result["selected_new"] = new_id
    return result


def _arrange(wid, action):
    node, parent, grand, idx = _widget(wid)
    if node is None:
        return {"ok": False, "say": "Select a widget first."}
    try:
        ops, sel, say = widget_mod.arrange(node, parent, grand, idx, action)
    except ValueError as e:
        return {"ok": False, "say": str(e)}
    if not ops:
        return {"ok": False, "say": say}
    result = session.edit(ops, f"panel: {widget_mod.ARRANGE[action].lower()} {wid}")
    if result["ok"]:
        session.select(sel)
        _refresh_canvas()
        result["say"] = say
    return result


@app.get("/api/widget/options")
def widget_options(id: str):
    """Every kind this widget could be, the likely ones first with the reason, and the ways to arrange it."""
    node, parent, _g, _idx = _widget(id)
    if node is None:
        return {"ok": False, "say": f"There is no widget {id}."}
    return {"ok": True, "id": id, "kinds": widget_mod.options(node, parent, maker, _idx) if parent is not None else [],
            "arrange": [{"action": k, "title": v} for k, v in widget_mod.ARRANGE.items()]}


@app.post("/api/widget/convert")
async def widget_convert(req: Request):
    body = await req.json()
    return {**_convert(body.get("id"), body.get("to")), **_state()}


@app.post("/api/widget/arrange")
async def widget_arrange(req: Request):
    body = await req.json()
    return {**_arrange(body.get("id"), body.get("action")), **_state()}


def _widget_command(text):
    """"make this a dropdown", "turn lblEmail into a text box", "move it up", "put it in a row with the next one"."""
    m = CONVERT.match(text)
    if m:
        who = m.group(1)
        wid = session.state().get("selected") if who.lower() in ("this", "it", "that") else who
        return {**_convert(wid, KIND_WORDS[m.group(2).lower()]), "path": "widget"}
    for rx, action in ARRANGE_SAID:
        if rx.match(text):
            return {**_arrange(session.state().get("selected"), action), "path": "widget"}
    return None


@app.post("/api/transcribe")
async def transcribe(req: Request):
    if not stt.available():
        return JSONResponse({"error": "Local speech-to-text is not installed (faster-whisper). Type the command instead."},
                            status_code=503)
    text, ms = stt.transcribe(await req.body())
    return {"text": text, "ms": ms}


@app.post("/api/undo")
def undo():
    result = session.undo()
    if result.get("ok"):
        _refresh_canvas()
    return {**result, **_state()}


@app.post("/api/select")
async def select(req: Request):
    session.select((await req.json()).get("id"))
    return _state()


WTYPE = {"form": "Form", "flex": "FlexContainer", "scrollflex": "FlexScrollContainer", "label": "Label", "button": "Button",
         "textbox": "TextField", "textarea": "TextArea", "listbox": "ListBox", "calendar": "Calendar", "image": "Image",
         "segment": "Segment", "component": "UserWidgetInstance", "richtext": "RichText"}


def _skin_usage():
    """How often each skin is used on the project's own forms: the panel lists the project's habits first."""
    from collections import Counter
    from vcp.sm_io import read_sm
    use = Counter()
    for sm in (PROJECT / "forms").glob("*/*.sm"):
        for w in read_sm(sm).values():
            if w.get("_skin_"):
                use[catalogue.skin_name(w["_skin_"])] += 1
    return use


@app.get("/api/props-meta")
def props_meta():
    """What the properties panel needs: skins per widget type (most used first) with preview CSS, style roles."""
    use = _skin_usage()
    payload = skins.payload()
    by_type = {}
    for info in catalogue.skins.values():
        by_type.setdefault(info.get("wType"), set()).add(info["name"])
    default_names = {t: catalogue.skin_name(k) for t, k in skins.defaults.items()}
    return {"wtype": WTYPE, "roles": skins.roles, "defaults": default_names, "css": payload["by_name"],
            "forkable": sorted(FORKABLE), "breakpoints": BREAKPOINTS, "created": sorted(maker.names),
            "skins": {t: sorted(names, key=lambda n: (-use[n], n.lower())) for t, names in by_type.items() if t},
            "used": {n: c for n, c in use.items() if c}}


# Visualizer desktop web breakpoints (Form breakpointInfo): b1 <= 1366, b2 <= 1024, b3 <= 640; wider = base values
BREAKPOINTS = {"b1": 1366, "b2": 1024, "b3": 640}
FORKABLE = set(RESP_BY_SPEC)   # properties Visualizer can hold per breakpoint (responsiveData.bN)


def _fork(wid, attrs, bp):
    """Breakpoint forking on: forkable properties become bN.<prop> overrides (null removes the override).
    Off: the base value changes AND that property's overrides are removed, so the change shows on every screen.
    Returns (attrs, note)."""
    found = tree_index(session.root).get(wid)
    node_attrs = found[0].attrs if found else {}
    if bp:
        shared = sorted(k for k in attrs if k not in FORKABLE)
        out = {(f"{bp}.{k}" if k in FORKABLE else k): v for k, v in attrs.items()}
        note = f" {', '.join(shared)} cannot differ per screen in Visualizer, so it changed on all screens." if shared else ""
        return out, note
    out, cleared = dict(attrs), []
    for k in attrs:
        for b in BREAKPOINTS:
            if f"{b}.{k}" in node_attrs:
                out[f"{b}.{k}"] = None
                cleared.append(f"{b}.{k}")
    note = f" Removed screen-specific values: {', '.join(cleared)}." if cleared else ""
    return out, note


@app.post("/api/edit")
async def edit(req: Request):
    """Properties panel: {id, attrs: {name: value | null}, bp?: "b1"|"b2"|"b3" (breakpoint forking), rename?: newId,
    remove?: true} -> one undoable edit."""
    body = await req.json()
    wid = body.get("id")
    bp = body.get("bp") if body.get("bp") in BREAKPOINTS else None
    ops, label, note = [], [], ""
    if body.get("remove"):
        ops.append({"op": "remove", "id": wid})
        label.append(f"remove {wid}")
    elif body.get("move"):
        # drag and drop in the widget list: {parent, after}; after null = first in parent. Order is structural, so
        # it is the same on every breakpoint (Visualizer has no per-breakpoint child order).
        mv = body["move"]
        ops.append({"op": "move", "id": wid, "parent": mv.get("parent"), "after": mv.get("after")})
        label.append(f"move {wid} into {mv.get('parent')} after {mv.get('after') or '(first)'}")
    else:
        attrs = body.get("attrs") or {}
        if attrs:
            attrs, note = _fork(wid, attrs, bp)
            ops.append({"op": "set", "id": wid, "attrs": attrs})
            label.append(f"set {wid} " + " ".join(f"{k}={v}" for k, v in attrs.items()))
        if body.get("rename") and body["rename"] != wid:
            ops.append({"op": "rename", "id": wid, "to": body["rename"]})
            label.append(f"rename {wid} to {body['rename']}")
    if not ops:
        return {"say": "Nothing to change.", "ok": False, **_state()}
    result = session.edit(ops, "panel: " + "; ".join(label))
    if result["ok"] and note:
        result["say"] += note
    if body.get("remove") and result["ok"]:
        session.select(None)
    if result["ok"]:
        _refresh_canvas()
    return {**result, **_state()}


@app.post("/api/new")
async def new(req: Request):
    form_id = ((await req.json()).get("id") or "frmNewForm").strip()
    if not form_id.isidentifier():
        return {"say": f"{form_id} is not a valid form id (letters, digits and _ only).", "ok": False, **_state()}
    session.start(form_id)
    _refresh_canvas()
    return {"say": f"Started {form_id}.", "ok": True, **_state()}


@app.post("/api/open")
async def open_form(req: Request):
    """Load a form Saywright saved earlier back into the session (its .sm read back as a Form Spec)."""
    form_id = (await req.json()).get("id")
    if form_id not in _saved():
        return {"say": f"{form_id} was not made in Saywright; only those can be reopened for now.", "ok": False, **_state()}
    spec_file = DATA / "specs" / f"{form_id}.spec"   # written by every save
    if not spec_file.exists():
        return {"say": f"No saved spec for {form_id}.", "ok": False, **_state()}
    session.load_spec(spec_file.read_text(encoding="utf-8"))
    _refresh_canvas()
    return {"say": f"Opened {form_id}.", "ok": True, **_state()}


@app.post("/api/save")
def save():
    return {**_save(), **_state()}


def _save():
    form_id = session.root.id
    saved = _saved()
    if (PROJECT / "forms" / "desktop" / f"{form_id}.sm").exists() and form_id not in saved:
        return {"say": f"{form_id} already exists in {PROJECT.name} and was not made here, so I won't overwrite it. "
                       f"Start a new form with another name.", "ok": False}
    try:
        info = export(session.root, catalogue, PROJECT, spec_dir=DATA / "specs")
    except Exception as e:
        return {"say": f"Save failed: {e}", "ok": False}
    new_skins = maker.publish((DATA / "specs" / f"{form_id}.spec").read_text(encoding="utf-8"))
    for f in CACHE_FILES:   # Visualizer rebuilds its caches; stale ones hide new forms
        (PROJECT / f).unlink(missing_ok=True)
    SAVED.write_text(json.dumps(sorted(saved | {form_id})), encoding="utf-8")
    session.mark_export({"form_dir": info["form_dir"], "widgets": info["widgets"]})
    with_skins = f" and {len(new_skins)} new skin{'s' if len(new_skins) != 1 else ''}" if new_skins else ""
    return {"say": f"Saved {form_id} ({info['widgets']} widgets{with_skins}) to {PROJECT.name}. Open the project in Visualizer to see it.",
            "ok": True, "save_info": info}


@app.post("/api/export-react")
async def export_react(req: Request):
    """The saved Visualizer project -> a standalone React app (viz2react). scope: 'form' or 'project'."""
    scope = (await req.json()).get("scope", "form")
    form_id = session.root.id
    if form_id not in _saved():
        return {"say": "Save the form to Visualizer first; the React export is made from the saved project.", "ok": False}
    out = EXPORTS / (f"{PROJECT.name}-{form_id}-react" if scope == "form" else f"{PROJECT.name}-react")
    reply = renderer.render(PROJECT, out, [form_id] if scope == "form" else None)
    if not reply.get("ok"):
        return {"say": f"React export failed: {reply.get('error', '').splitlines()[0]}", "ok": False}
    rep = reply["report"]
    return {"say": f"React app written: {len(rep['forms'])} form(s), {rep['skins']} skins, in {reply['ms']} ms.",
            "ok": True, "react_info": {"dir": str(out), "index": str(out / "index.html"), "forms": len(rep["forms"]),
                                       "start": rep.get("startForm"), "ms": reply["ms"]}}


def _selected_node():
    selected = session.state().get("selected")
    found = tree_index(session.root).get(selected) if selected else None
    return found[0] if found else None


def _breakpoint_command(text):
    """"on mobile, flxRow: layout vertical, width 100%": a value for one breakpoint only, the same as Forking in the panel."""
    asked = parse_breakpoint(text)
    if not asked:
        return None
    if asked.get("bad"):
        return {"ok": False, "path": "breakpoint", "say": f"I can't set '{asked['bad']}'. Use layout, width, height, top, left, right, bottom, visible or skin."}
    result = session.edit([{"op": "set", "id": asked["id"], "attrs": asked["attrs"]}], f"panel: {text}")
    return {**result, "path": "breakpoint"}


def _image_command(text):
    """"add image imgLogo from aiv12.png, width 30dp, ...": a piece the image agent cropped from the screenshot."""
    asked = parse_image(text)
    if not asked:
        return None
    if not maker.copy_image(asked["attrs"]["src"]):
        return {"ok": False, "path": "image", "say": f"There is no image called {asked['attrs']['src']}."}
    result = session.edit([{"op": "add", "type": "image", "id": asked["id"], "attrs": asked["attrs"]}], f"panel: {text}")
    return {**result, "path": "image"}


def _form_skin_command(text):
    m = FORM_SKIN.match(text.strip())
    if not m:
        return None
    result = session.edit([{"op": "set", "id": session.root.id, "attrs": {"skin": m.group(1)}}], f"panel: {text}")
    return {**result, "path": "skin"}


def _skin_command(asked, refresh=True):
    """"create a flex skin called sknCard with background violet to cyan, radius 20" and "give it a new skin with ..."."""
    t = time.time()
    spec = dict(asked["spec"])
    node = _selected_node()
    if asked.get("empty"):
        return {"ok": False, "path": "skin", "say": "Tell me the look, e.g. background violet to cyan, radius 20, text white, size 16."}
    if asked["apply"] and node is None:
        return {"ok": False, "path": "skin", "say": "Select a widget first, so I know what to give the skin to."}
    if "wType" not in spec:
        spec["wType"] = WTYPE.get(node.type, "FlexContainer") if node and asked["apply"] else "FlexContainer"
    try:
        name, created = maker.create(spec)
    except ValueError as e:
        return {"ok": False, "path": "skin", "say": str(e)}
    say = f"{'Created' if created else 'Already have'} skin {name}."
    if asked["apply"]:
        result = session.edit([{"op": "set", "id": node.id, "attrs": {"skin": name}}], f"panel: set {node.id} skin={name}")
        if not result["ok"]:
            return {**result, "path": "skin", "skin": name, "skins_changed": True}
        say += f" {node.id} now uses it."
    if refresh:
        _refresh_canvas()    # also rewrites skins.css from the scratch project's theme
    return {"ok": True, "path": "skin", "say": say, "skin": name, "skins_changed": True, "ms": round((time.time() - t) * 1000)}


@app.post("/api/skin")
async def make_skin(req: Request):
    """Properties panel "New skin": a look -> a skin in the library and the canvas. The panel then applies it as an edit."""
    try:
        name, created = maker.create(await req.json())
    except ValueError as e:
        return {"ok": False, "say": str(e), **_state()}
    _refresh_canvas()
    return {"ok": True, "skin": name, "say": f"{'Created' if created else 'Already have'} skin {name}.", **_state()}


IMAGES = HOME / "work" / "images"   # images dropped on the app, kept so a script can be re-planned or checked later


def _form_words(name):
    """"frmTransferMoney" or "transfer money" -> "transfer money": the planner writes "new form called <words>"."""
    n = re.sub(r"^frm(?=[A-Z0-9])", "", name.strip())
    return " ".join(re.findall(r"[A-Z]?[a-z0-9]+|[A-Z]+(?![a-z])", n)).lower()


_last_image = {}


def _training(record):
    """Every image build: the image, the prompt the rules wrote and how it checked out. Data to train a model on when a GPU is
    available, so it can learn the same behaviour instead of having it described."""
    folder = DATA / "training"
    folder.mkdir(parents=True, exist_ok=True)
    with open(folder / "image_agent.jsonl", "a", encoding="utf-8") as f:
        f.write(json.dumps({"ts": time.strftime("%Y-%m-%dT%H:%M:%S"), **record}, ensure_ascii=False) + "\n")


def _unused_form_words(words):
    """A name whose form id is free, or one Saywright itself saved (Save may overwrite only those)."""
    existing = {p.stem for p in (PROJECT / "forms" / "desktop").glob("*.sm")} - _saved()
    n, out = 1, words
    while "frm" + "".join(w.capitalize() for w in out.split()) in existing:
        n += 1
        out = f"{words} {n}"
    return out


SLOTS = {"desktop": 1366, "tablet": 1024, "mobile": 640}     # the screenshot slots and the breakpoint width each one shows


def _agent(raw, filename, name, width, views_raw=None):
    """raw: the screenshot the form is built from. views_raw: {"tablet"|"mobile": bytes}, the same screen at a narrower
    size; those breakpoints then follow the screenshots instead of the rules."""
    if str(HERE / "vision") not in sys.path:
        sys.path.insert(0, str(HERE / "vision"))
    import agent           # imported on first use: OpenCV and the OCR models are only needed here
    from PIL import Image
    import io
    IMAGES.mkdir(parents=True, exist_ok=True)
    stem = f"{time.strftime('%Y%m%d-%H%M%S')}-{re.sub(r'[^A-Za-z0-9]', '', pathlib.Path(filename or '').stem)[:40] or 'image'}"
    path = IMAGES / f"{stem}.png"
    views = {}
    try:
        Image.open(io.BytesIO(raw)).convert("RGB").save(path)   # jpg/webp/RGBA -> one plain format for the reader
        for bp, data in (views_raw or {}).items():
            views[bp] = IMAGES / f"{stem}-{bp}.png"
            Image.open(io.BytesIO(data)).convert("RGB").save(views[bp])
    except OSError:
        return {"ok": False, "say": "One of the files is not an image I can open. Use PNG or JPG screenshots."}
    t = time.time()
    res = agent.run(str(path), name=_form_words(name) if name else None, filename=filename, width=width, project=PROJECT, library=DATA / "skins",
                    views={bp: str(p) for bp, p in views.items()})
    words = _form_words(res["form"]) if name else _unused_form_words(_form_words(res["form"]))
    lines = res["lines"]
    if words != res["form"]:        # the id was taken: the "new form" line is the only one that names the form
        lines = [f"new form called {words}" if l.startswith("new form called ") else l for l in lines]
    (IMAGES / f"{stem}.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")
    _last_image.update(path=str(path), width=res["width"], form="frm" + "".join(w.capitalize() for w in words.split()))
    _training({"event": "prompt", "image": path.name, "views": {bp: p.name for bp, p in views.items()}, "observed": res.get("observed"),
               "form": _last_image["form"], "width": res["width"], "mode": res["mode"], "size": res["size"], "prompt": lines})
    # a screenshot in the wrong slot: say so, it still builds as asked
    names = {1366: "desktop", 1024: "tablet", 640: "mobile"}
    looks = names.get(res.get("guessed"))
    warn = ""
    if width and looks and looks != names.get(width) and abs(res["guessed"] - width) > 400:
        warn = f"The {names.get(width)} screenshot looks like a {looks} screen. Check it is in the right slot."
    return {"ok": True, "lines": lines, "form": "frm" + "".join(w.capitalize() for w in words.split()), "width": res["width"], "mode": res["mode"],
            "size": res["size"], "kinds": res["kinds"], "seconds": round(time.time() - t, 1), "prompt_file": str(IMAGES / f"{stem}.txt"),
            "observed": res.get("observed") or {}, "warn": warn}


def _image_bytes(value):
    """A data URL or plain base64 -> bytes, or None."""
    import base64
    import binascii
    if not isinstance(value, str) or not value:
        return None
    try:
        return base64.b64decode(value.split(",", 1)[1] if value.startswith("data:") else value)
    except (binascii.Error, ValueError, IndexError):
        return None


@app.post("/api/agent")
async def image_agent(req: Request):
    """Image agent: a raw image body, nothing else needed (?filename= helps name the form; ?name= and ?width= override what
    it works out). -> the prompt. The UI shows it and runs it line by line through /api/command, like anything typed."""
    q = req.query_params
    name, filename = q.get("name", ""), q.get("filename", "")
    width = int(q["width"]) if q.get("width", "").isdigit() else None
    views = {}
    if req.headers.get("content-type", "").startswith("application/json"):
        # {"images": {"desktop"|"tablet"|"mobile": data URL}, "filename"?, "name"?}: any of the three. The widest one given
        # builds the form at its breakpoint; the narrower ones set their breakpoints.
        try:
            body = json.loads(await req.body())
        except ValueError:
            return {"ok": False, "say": "Send the screenshots as JSON."}
        images = body.get("images") if isinstance(body, dict) else None
        if not isinstance(images, dict) or not images or set(images) - set(SLOTS):
            return {"ok": False, "say": "Give at least one screenshot: desktop, tablet or mobile."}
        decoded = {slot: _image_bytes(images[slot]) for slot in SLOTS if slot in images}
        if any(not v or len(v) > 25_000_000 for v in decoded.values()):
            return {"ok": False, "say": "Each screenshot must be a PNG or JPG up to 25 MB."}
        name, filename = str(body.get("name") or name), str(body.get("filename") or filename)
        slots = list(decoded)
        width = SLOTS[slots[0]]
        raw = decoded[slots[0]]
        views = {slot: decoded[slot] for slot in slots[1:]}
    else:
        raw = await req.body()
        if not raw or len(raw) > 25_000_000:
            return {"ok": False, "say": "Send a PNG or JPG image up to 25 MB."}
    if name and not _form_words(name):
        return {"ok": False, "say": "Name the form, e.g. “transfer money”."}
    if width and width not in BREAKPOINTS.values():
        return {"ok": False, "say": f"Width must be one of {sorted(BREAKPOINTS.values())}."}
    try:
        return await run_in_threadpool(_agent, raw, filename, name, width, views)
    except Exception as e:   # a reader or planner failure: report it, never stop the backend
        return {"ok": False, "say": f"Could not read the image: {e}"}


# ---------- Figma: a frame's real layers instead of a screenshot ----------
FIGMA_CACHE = HOME / "work" / "figma"


def _figma():
    if str(HERE / "vision") not in sys.path:
        sys.path.insert(0, str(HERE / "vision"))
    import figma
    return figma


def _figma_link(key, node_id):
    return f"https://www.figma.com/design/{key}/f?node-id={node_id.replace(':', '-')}"


@app.get("/api/figma/status")
async def figma_status():
    figma = _figma()
    wait = figma.Client(FIGMA_CACHE).blocked()
    return {"ok": True, "token": figma.has_token(), "token_file": str(figma.TOKEN_FILE), "blocked_for": round(wait),
            "blocked_text": figma._duration(wait) if wait else ""}


@app.post("/api/figma/token")
async def figma_token(req: Request):
    """The person pastes their own token in the app; it is checked with Figma, then kept in ~/.saywright/figma_token.txt.
    Never logged, never sent anywhere but api.figma.com."""
    figma = _figma()
    body = await req.json()
    tok = str(body.get("token") or "").strip()
    if not re.fullmatch(r"[A-Za-z0-9_\-]{20,200}", tok):
        return {"ok": False, "say": "That does not look like a Figma personal access token."}

    def check():
        r = urllib.request.Request("https://api.figma.com/v1/me", headers={"X-Figma-Token": tok})
        try:
            with urllib.request.urlopen(r, timeout=30) as resp:
                return json.load(resp).get("handle") or "you"
        except Exception:      # noqa: BLE001  (any failure means the token cannot be used)
            return None
    who = await run_in_threadpool(check)
    if not who:
        return {"ok": False, "say": "Figma did not accept that token."}
    figma.TOKEN_FILE.parent.mkdir(parents=True, exist_ok=True)
    figma.TOKEN_FILE.write_text(tok + "\n", encoding="utf-8")
    (FIGMA_CACHE / "_rate_limited.json").unlink(missing_ok=True)     # a pause belonged to the old token
    return {"ok": True, "say": f"Figma token saved. Signed in as {who}."}


@app.post("/api/figma/frames")
async def figma_frames(req: Request):
    """A Figma link -> the file's frames, and the frame for each breakpoint: the linked frame, and the same screen in the
    file's tablet and mobile sections."""
    figma = _figma()
    body = await req.json()

    def work():
        key, node_id = figma.parse_link(str(body.get("link") or ""))
        client = figma.Client(FIGMA_CACHE)
        frames = figma.catalogue(client, key, refresh=bool(body.get("refresh")))
        picked, linked = {}, None
        ids = {f["id"] for f in frames}
        if node_id in ids:
            linked = node_id
            picked = {bp: f["id"] for bp, f in figma.counterparts(frames, node_id).items()}
            guessed = [bp for bp, f in figma.counterparts(frames, node_id).items() if f.get("guess")]
        else:
            guessed = []
            if node_id:     # a section, a page or a layer inside a frame
                node = client.node(key, node_id, depth=2)
                inside = [f["id"] for f in figma.frames_in(node) if f["id"] in ids]
                if len(inside) == 1:
                    linked = inside[0]
                    picked = {bp: f["id"] for bp, f in figma.counterparts(frames, inside[0]).items()}
        if picked:          # the slots' thumbnails in one call, so the card does not spend one call each
            try:
                client.render(key, sorted(set(picked.values())), FIGMA_CACHE / "thumbs", scale=0.25)
            except figma.FigmaError:
                pass
        return {"ok": True, "key": key, "frames": frames, "picked": picked, "guessed": guessed, "linked": linked}
    try:
        return await run_in_threadpool(work)
    except figma.FigmaError as e:
        return {"ok": False, "say": str(e)}


@app.get("/api/figma/thumb")
async def figma_thumb(key: str, id: str):
    figma = _figma()
    if not re.fullmatch(r"[A-Za-z0-9]{10,}", key) or not re.fullmatch(r"[0-9]+[:\-][0-9]+(?:;[0-9:]+)*", id):
        return JSONResponse({"ok": False}, status_code=400)
    try:
        got = await run_in_threadpool(lambda: figma.Client(FIGMA_CACHE).render(key, [id.replace("-", ":")], FIGMA_CACHE / "thumbs", scale=0.25))
    except figma.FigmaError as e:
        return JSONResponse({"ok": False, "say": str(e)}, status_code=502)
    path = got.get(id.replace("-", ":"))
    return FileResponse(path) if path else JSONResponse({"ok": False}, status_code=404)


def _figma_build(links, name):
    """links: {"desktop"|"tablet"|"mobile": link to a frame}; the frames can come from different files."""
    figma = _figma()
    t = time.time()
    res = figma.run(links, form=_form_words(name) if name else None, project=PROJECT, library=DATA / "skins", cache=FIGMA_CACHE)
    words = _form_words(res["form"]) if name else _unused_form_words(_form_words(res["form"]))
    lines = [f"new form called {words}" if l.startswith("new form called ") else l for l in res["lines"]]
    form = "frm" + "".join(w.capitalize() for w in words.split())
    IMAGES.mkdir(parents=True, exist_ok=True)
    (IMAGES / f"{time.strftime('%Y%m%d-%H%M%S')}-figma-{form}.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")
    first = next(bp for bp in SLOTS if links.get(bp))
    _last_image.update(path=res["shot"], width=SLOTS[first], form=form)
    _training({"event": "prompt", "source": "figma", "frames": res["frames"], "observed": res.get("observed"), "form": form,
               "width": res["width"], "mode": "figma", "size": res["size"], "prompt": lines})
    return {"ok": True, "lines": lines, "form": form, "width": res["width"], "mode": "figma", "size": res["size"], "kinds": res["kinds"],
            "seconds": round(time.time() - t, 1), "observed": res.get("observed") or {}, "frames": res["frames"],
            "warn": f"{res['missing_images']} icons could not be exported from Figma, so they are empty boxes for now. {res['note']}" if res.get("missing_images") else ""}


@app.post("/api/figma/build")
async def figma_build(req: Request):
    """{"links": {"desktop"|"tablet"|"mobile": frame link}} (each size its own frame, from any file), or
    {"key", "frames": {size: frame id}} (one file) -> the prompt, like /api/agent."""
    figma = _figma()
    body = await req.json()
    links = {}
    if isinstance(body.get("links"), dict):
        for bp, link in body["links"].items():
            if bp not in SLOTS or not link:
                continue
            try:
                key, node = figma.parse_link(str(link))
            except figma.FigmaError as e:
                return {"ok": False, "say": f"{bp.title()}: {e}"}
            if not node:
                return {"ok": False, "say": f"The {bp} link has no frame in it. In Figma, right-click the frame > Copy link to selection."}
            links[bp] = _figma_link(key, node)
    else:
        key, frames = str(body.get("key") or ""), body.get("frames") or {}
        if not re.fullmatch(r"[A-Za-z0-9]{10,}", key) or not isinstance(frames, dict):
            return {"ok": False, "say": "Pick at least one Figma frame."}
        if any(not re.fullmatch(r"[0-9]+:[0-9]+(?:;[0-9:]+)*", str(v)) for v in frames.values() if v):
            return {"ok": False, "say": "Those are not Figma frame ids."}
        links = {bp: _figma_link(key, fid) for bp, fid in frames.items() if bp in SLOTS and fid}
    if not links:
        return {"ok": False, "say": "Give at least one Figma frame."}
    name = str(body.get("name") or "")
    try:
        return await run_in_threadpool(_figma_build, links, name)
    except figma.FigmaError as e:
        return {"ok": False, "say": str(e)}
    except Exception as e:     # a converter failure: report it, never stop the backend
        return {"ok": False, "say": f"Could not build from Figma: {e}"}


def _pixel_match(image_path, render_path):
    """How alike the image and the render look, 0-100: both shrunk so small shifts do not count."""
    import cv2
    import numpy as np
    a, b = cv2.imread(image_path), cv2.imread(render_path)
    if a is None or b is None:
        return None
    b = cv2.resize(b, (a.shape[1], round(b.shape[0] * a.shape[1] / b.shape[1])))
    h = min(a.shape[0], b.shape[0])
    small = lambda m: cv2.resize(m[:h], (a.shape[1] // 8, h // 8), interpolation=cv2.INTER_AREA).astype(np.float32)  # noqa: E731
    return round(100 * (1 - float(np.abs(small(a) - small(b)).mean()) / 255))


def _quality():
    form = session.root.id
    out = HOME / "work" / "checks"
    prefix = {"1366": "", "1024": "b2.", "640": "b3."}
    grown = 0
    for attempt in range(4):       # look, grow any panel something spills out of, look again
        done = subprocess.run(["node", str(HERE / "vision" / "check.mjs"), str(CANVAS), form, str(out)], capture_output=True, text=True, encoding="utf-8", timeout=120)
        if done.returncode:
            return {"ok": False, "say": "The quality check could not run."}
        widths = json.loads(done.stdout)["widths"]
        ops = {}
        known = tree_index(session.root)
        for w, r in widths.items():
            for spill in r["spills"]:
                if spill["panel"] in known:
                    key = (spill["panel"], prefix[w] + "h")
                    ops[key] = max(ops.get(key, 0), spill["height"] + spill["by"] + 12)
        # cards side by side at one height stay at one height: a grown card takes its row's same-height neighbours along
        for (wid, key), h in list(ops.items()):
            node, parent = known[wid]
            for sib in (parent.children if parent else []):
                if sib.id != wid and sib.attrs.get(key) == node.attrs.get(key) and node.attrs.get(key):
                    ops[(sib.id, key)] = max(ops.get((sib.id, key), 0), h)
        if not ops or attempt == 3:
            break
        session.edit([{"op": "set", "id": wid, "attrs": {key: f"{h}dp"}} for (wid, key), h in ops.items()], f"panel: image agent grew {len(ops)} panels so nothing spills")
        _refresh_canvas()
        grown += len(ops)
    report = {"ok": True, "form": form, "widths": {}, "grown": grown}
    names = {"1366": "Desktop", "1024": "Tablet", "640": "Mobile"}
    for w, r in widths.items():
        covered = r.get("covered", [])
        problems = len(r["clipped"]) + len(r["overlaps"]) + len(r["offscreen"]) + len(r["spills"]) + len(covered) + (1 if r["overflow"] else 0)
        report["widths"][w] = {"name": names[w], "problems": problems, "clipped": r["clipped"], "overlaps": r["overlaps"], "offscreen": r["offscreen"],
                               "spills": r["spills"], "covered": covered, "overflow": r["overflow"], "height": r["height"]}
    # what Visualizer's own runtime does that the canvas does not (vizlint.py): from the form's generated JSON
    if str(HERE / "vision") not in sys.path:
        sys.path.insert(0, str(HERE / "vision"))
    import vizlint
    report["visualizer"] = vizlint.lint(CANVAS_PROJECT / "forms" / "desktop" / f"{form}.sm")
    if _last_image.get("form") == form:
        w = str(_last_image["width"])
        report["match"] = _pixel_match(_last_image["path"], str(out / f"{form}-{w}.png"))
        report["match_width"] = names.get(w)
    _training({"event": "check", "form": form, "report": {k: v for k, v in report.items() if k != "ok"}})
    return report


@app.post("/api/agent/check")
async def agent_check():
    """Render the form at each breakpoint and report clipped text, overlaps and anything off the screen."""
    try:
        return await run_in_threadpool(_quality)
    except (subprocess.TimeoutExpired, ValueError, KeyError, OSError) as e:
        return {"ok": False, "say": f"The quality check could not run: {e}"}


def _review():
    if str(HERE / "vision") not in sys.path:
        sys.path.insert(0, str(HERE / "vision"))
    import review
    found = tree_index(session.root)
    texts = [(wid, key, node.attrs[key]) for wid, (node, _p) in found.items() for key in ("text", "placeholder") if isinstance(node.attrs.get(key), str)]
    res = review.review([t for _, _, t in texts])
    ops = [{"op": "set", "id": wid, "attrs": {key: res["changes"][t]}} for wid, key, t in texts if t in res["changes"]]
    if ops:
        session.edit(ops, f"panel: model text review, {len(ops)} changes")
        _refresh_canvas()
    return res, ops


@app.post("/api/agent/review")
async def agent_review():
    """The local model reads the form's text for OCR mistakes. Each accepted change is one undoable edit."""
    res, ops = await run_in_threadpool(_review)
    return {"ok": not res["error"], "say": res["error"] or (f"{len(ops)} text fixes from the model." if ops else "The model found nothing to fix."), "fixed": len(ops),
            "seconds": res["seconds"], "changes": [{"from": a, "to": b} for a, b in res["changes"].items()], **_state()}


DELETE_FORM = re.compile(r"^(?:please\s+)?(?:delete|remove)\s+(?:(?:this|the|current|my)\s+)*form(?:\s+(?:called|named))?(?:\s+([A-Za-z][\w ]*))?[.!]?$", re.I)


def _form_paths(form_id, project=None):
    project = project or PROJECT
    return {"form": project / "forms" / "desktop" / f"{form_id}.sm", "controller": project / "controllers" / "desktop" / f"{form_id}Controller"}


def _references(form_id):
    """Other files in the project that name this form: deleting it would leave them pointing at nothing."""
    own = {p.resolve() for p in _form_paths(form_id).values()}
    found = []
    pattern = re.compile(rf"\b{re.escape(form_id)}\b")
    for folder, suffixes in (("controllers", (".js",)), ("modules", (".js",)), ("forms", (".json",)), ("templates", (".json",)), ("navigation", (".json",))):
        for f in (PROJECT / folder).rglob("*") if (PROJECT / folder).exists() else []:
            if f.suffix not in suffixes or not f.is_file() or any(o in f.resolve().parents for o in own):
                continue
            try:
                if pattern.search(f.read_text(encoding="utf-8", errors="ignore")):
                    found.append(f.relative_to(PROJECT).as_posix())
            except OSError:
                continue
    props = PROJECT / "projectProperties.json"
    if props.exists() and pattern.search(props.read_text(encoding="utf-8", errors="ignore")):
        found.append("projectProperties.json")
    return found


def _trash_list():
    if not TRASH.exists():
        return []
    items = []
    for p in sorted(TRASH.iterdir(), reverse=True):
        if p.is_dir() and "__" in p.name:
            stamp, form = p.name.split("__", 1)
            items.append({"trash": p.name, "form": form, "deleted": stamp})
    return items


@app.get("/api/forms")
def forms_list(id: str = ""):
    """What the Delete form dialog shows. With ?id= it also lists what else in the project names that form."""
    current = session.root.id
    saved = sorted(_saved())
    return {"current": current, "current_saved": current in saved, "saved": saved, "trash": _trash_list(),
            "references": _references(id) if id in saved else []}


@app.post("/api/forms/delete")
async def forms_delete(req: Request):
    """A form Saywright made -> the trash, where it can be restored. Forms that came with the project are refused."""
    form_id = (await req.json()).get("id", "")
    current = form_id == session.root.id
    saved = _saved()
    if form_id not in saved:
        if current:     # never saved, so nothing is on disk: this just starts again
            session.start("frmNewForm")
            _refresh_canvas()
            return {"ok": True, "say": f"Discarded {form_id}: it was never saved.", "current_deleted": True, **_state()}
        exists = _form_paths(form_id)["form"].exists() if form_id.isidentifier() else False
        return {"ok": False, "say": f"{form_id} came with {PROJECT.name}, so Saywright won't delete it. Delete it in Visualizer if you mean to." if exists
                else f"There is no saved form called {form_id}.", **_state()}
    slot = TRASH / f"{time.strftime('%Y%m%d-%H%M%S')}__{form_id}"
    slot.mkdir(parents=True, exist_ok=True)
    moved = []
    try:
        for key, path in _form_paths(form_id).items():
            if path.exists():
                shutil.move(str(path), str(slot / path.name))
                moved.append((path, slot / path.name))
    except OSError as e:     # e.g. Visualizer holding a file open: put back what moved, so the form is not left half deleted
        for original, kept in moved:
            shutil.move(str(kept), str(original))
        slot.rmdir()
        return {"ok": False, "say": f"Could not delete {form_id}: {e}. If it is open in Visualizer, close it there and try again.", **_state()}
    spec = DATA / "specs" / f"{form_id}.spec"
    if spec.exists():
        shutil.move(str(spec), str(slot / spec.name))
    for path in _form_paths(form_id, CANVAS_PROJECT).values():    # the scratch copy, or the canvas would keep rendering it
        if path.exists():
            shutil.rmtree(path)
    for f in CACHE_FILES:     # Visualizer rebuilds its caches; stale ones point at the deleted form
        (PROJECT / f).unlink(missing_ok=True)
    SAVED.write_text(json.dumps(sorted(saved - {form_id})), encoding="utf-8")
    if current:
        session.start("frmNewForm")
        _refresh_canvas()
    return {"ok": True, "say": f"Deleted {form_id}. It is in the trash: you can restore it from Delete form.", "current_deleted": current, "deleted": form_id, **_state()}


@app.post("/api/forms/restore")
async def forms_restore(req: Request):
    """Put a deleted form back. Refused if a form of that name exists again."""
    name = (await req.json()).get("trash", "")
    item = next((i for i in _trash_list() if i["trash"] == name), None)     # only names from the listing: no paths from outside
    if not item:
        return {"ok": False, "say": "That form is no longer in the trash.", **_state()}
    form_id = item["form"]
    paths = _form_paths(form_id)
    if paths["form"].exists():
        return {"ok": False, "say": f"A form called {form_id} exists again, so I won't overwrite it. Rename or delete that one first.", **_state()}
    slot = TRASH / name
    try:
        for path in paths.values():
            kept = slot / path.name
            if kept.exists():
                path.parent.mkdir(parents=True, exist_ok=True)
                shutil.move(str(kept), str(path))
        spec = slot / f"{form_id}.spec"
        if spec.exists():
            (DATA / "specs").mkdir(parents=True, exist_ok=True)
            shutil.move(str(spec), str(DATA / "specs" / spec.name))
        slot.rmdir()
    except OSError as e:
        return {"ok": False, "say": f"Could not restore {form_id}: {e}", **_state()}
    for f in CACHE_FILES:
        (PROJECT / f).unlink(missing_ok=True)
    SAVED.write_text(json.dumps(sorted(_saved() | {form_id})), encoding="utf-8")
    return {"ok": True, "say": f"Restored {form_id}. Open it from Open saved.", "restored": form_id, **_state()}


@app.post("/api/reveal")
async def reveal(req: Request):
    """Open a folder in Explorer. Only folders under the project or Saywright's own exports."""
    target = pathlib.Path((await req.json()).get("path", "")).resolve()
    allowed = [PROJECT.resolve(), EXPORTS.resolve()]
    if not any(target == a or a in target.parents for a in allowed) or not target.exists():
        return {"ok": False, "say": "Not a Saywright folder."}
    os.startfile(target if target.is_dir() else target.parent)  # noqa: S606 (Windows, local only)
    return {"ok": True}


if __name__ == "__main__":
    port = int(os.environ.get("SAYWRIGHT_PORT", "8770"))
    uvicorn.run(app, host="127.0.0.1", port=port, log_level="warning")
