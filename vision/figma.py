"""Figma -> Visualizer form: a frame's real layers, read through Figma's REST API, written as the same prompt the image agent
writes. Nothing is guessed from pixels: text, fonts, colours, gradients, radii, borders, shadows and positions are Figma's own,
and icons and photos are exported from Figma as images.

    python vision/figma.py "<figma link to a frame>" [--tablet <link>] [--mobile <link>] [--out prompt.txt]
    python vision/figma.py "<figma link to a page or section>" --list      the frames in it

Access: Figma's API needs a personal access token, even for a public file (Figma -> Settings -> Security -> Personal access
tokens, scope "File content: read-only"). Saywright reads it from FIGMA_TOKEN or ~/.saywright/figma_token.txt, never from
a prompt or a log. API answers and exported images are cached under the cache folder, so a frame read once builds offline.

How a frame becomes a form:
  layers      every visible layer, in Figma's coordinates relative to the frame (1 Figma px = 1 dp). Groups and frames with no
              fill, border or shadow are only grouping: their children are kept, the layer is not.
  kinds       text -> label; a shape with one centred text -> button; a field-like shape (named input/field/search..., or
              bordered with one left-aligned faint text) -> text box; a small square with a border -> checkbox; vectors,
              icon components and image fills -> image widgets exported from Figma; other filled/bordered shapes -> flexes.
  nesting     by what sits inside what, so a rectangle drawn behind a card's text becomes that card.
  layout      the responsive planner (responsive.py): sections, rows and columns, flows and % widths, tablet and mobile values.
  breakpoints a tablet or mobile frame of the same screen sets that breakpoint (observe.py), matched by the real text.
"""
import argparse
import hashlib
import json
import os
import pathlib
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://api.figma.com/v1"
TOKEN_FILE = pathlib.Path.home() / ".saywright" / "figma_token.txt"
LINK = re.compile(r"figma\.com/(?:design|file|proto|board)/([A-Za-z0-9]{10,})(?:/[^?#\s]*)?(?:\?([^#\s]*))?", re.I)


class FigmaError(Exception):
    pass


def token():
    t = os.environ.get("FIGMA_TOKEN", "").strip()
    if not t and TOKEN_FILE.exists():
        lines = [l.strip() for l in TOKEN_FILE.read_text(encoding="utf-8-sig").splitlines() if l.strip()]
        t = lines[0] if lines else ""
    return t


def has_token():
    return bool(token())


def token_mark(tok=None):
    """A short fingerprint of the token, so a pause Figma put on one token does not stop another. Never the token."""
    tok = token() if tok is None else tok
    return hashlib.sha256(tok.encode()).hexdigest()[:12] if tok else ""


def parse_link(url):
    """A Figma link -> (file key, node id "183:389" or None)."""
    m = LINK.search(url or "")
    if not m:
        raise FigmaError("That is not a Figma link. Copy it from Figma: right-click the frame > Copy link.")
    query = urllib.parse.parse_qs(m.group(2) or "")
    node = (query.get("node-id") or [None])[0]
    return m.group(1), node.replace("-", ":") if node else None


# ---------- the API ----------
def _duration(seconds):
    seconds = int(seconds)
    if seconds >= 86400:
        return f"{seconds // 86400} days {seconds % 86400 // 3600} hours"
    if seconds >= 3600:
        return f"{seconds // 3600} hours {seconds % 3600 // 60} minutes"
    return f"{max(1, seconds // 60)} minutes"


class Client:
    """Figma's API with as few calls as possible: some plans allow only a handful a month (a Starter plan's token was
    blocked for 4.6 days after about twenty calls). One call reads the whole file, every frame on every page; it is kept,
    and later frames build from it without asking again."""

    def __init__(self, cache):
        self.cache = pathlib.Path(cache)
        self.cache.mkdir(parents=True, exist_ok=True)
        self._files = {}

    def blocked(self):
        """Seconds left on a pause Figma put on this token (0: none). A pause recorded for another token does not count."""
        mark = self.cache / "_rate_limited.json"
        if mark.exists():
            info = json.loads(mark.read_text())
            if info.get("token") and info["token"] != token_mark():
                return 0
            if info.get("until", 0) > time.time():
                return info["until"] - time.time()
        return 0

    def get(self, path, name=None, refresh=False):
        file = self.cache / name if name else None
        if file and file.exists() and not refresh:
            return json.loads(file.read_text(encoding="utf-8"))
        tok = token()
        if not tok:
            raise FigmaError(f"No Figma token. Create one in Figma (Settings > Security > Personal access tokens, read-only file "
                             f"content) and save it as the only line of {TOKEN_FILE}.")
        wait = self.blocked()
        if wait:
            raise FigmaError(f"Figma's API limit for this token is used up; Figma says to try again in {_duration(wait)}. Frames "
                             f"already read still build. A token from a paid Figma seat (Professional or above) has higher limits.")
        req = urllib.request.Request(API + path, headers={"X-Figma-Token": tok})
        for attempt in range(3):
            try:
                with urllib.request.urlopen(req, timeout=180) as r:
                    data = json.load(r)
                break
            except urllib.error.HTTPError as e:
                if e.code == 429:
                    after = int(e.headers.get("Retry-After") or 30)
                    if after <= 20 and attempt < 2:          # a short burst limit: wait it out
                        time.sleep(after)
                        continue
                    (self.cache / "_rate_limited.json").write_text(json.dumps({"until": time.time() + after, "token": token_mark(tok),
                                                                                "tier": e.headers.get("x-figma-plan-tier"),
                                                                                "type": e.headers.get("x-figma-rate-limit-type")}))
                    tier = e.headers.get("x-figma-plan-tier")
                    raise FigmaError(f"Figma's API limit for this token is used up{f' ({tier} plan)' if tier else ''}; Figma says to try "
                                     f"again in {_duration(after)}. Frames already read still build. A token from a paid Figma seat "
                                     f"(Professional or above) has higher limits.") from None
                if e.code == 403:
                    raise FigmaError("Figma refused the request (403): the token is wrong or expired, or it cannot see this file.") from None
                if e.code == 404:
                    raise FigmaError("Figma has no such file or layer (404). Check the link.") from None
                raise FigmaError(f"Figma answered {e.code}.") from None
            except urllib.error.URLError as e:
                raise FigmaError(f"Could not reach Figma: {e.reason}") from None
        if data.get("err") or data.get("status") in (400, 403, 404):
            raise FigmaError(f"Figma: {data.get('err') or data.get('message')}")
        if file:
            file.write_text(json.dumps(data), encoding="utf-8")
        return data

    def file(self, key, refresh=False, fetch=True):
        """The whole file in one call (kept). None when it was never read and fetch is False."""
        if key in self._files and not refresh:
            return self._files[key]
        f = self.cache / f"{key}_file.json"
        if not f.exists() and not fetch:
            return None
        doc = self.get(f"/files/{key}", f"{key}_file.json", refresh)["document"]
        self._files[key] = doc
        return doc

    def node(self, key, node_id, refresh=False, depth=None):
        one = self.cache / f"{key}_{node_id.replace(':', '-')}.json"
        if one.exists() and not refresh:          # a frame read on its own earlier
            got = (json.loads(one.read_text(encoding="utf-8")).get("nodes") or {}).get(node_id)
            if got and got.get("document"):
                return got["document"]
        doc = self.file(key, refresh)
        found = find_node(doc, node_id)
        if not found:
            raise FigmaError(f"Figma has no layer {node_id} in this file.")
        return found

    def tree(self, key, depth=3, refresh=False):
        """The file's pages, sections and frames: from the whole file once it is read, else from an earlier short read."""
        doc = self.file(key, refresh, fetch=False)
        if doc is not None:
            return doc
        old = self.cache / f"{key}_tree{depth}.json"
        if old.exists() and not refresh:
            return json.loads(old.read_text(encoding="utf-8"))["document"]
        return self.file(key, refresh)

    def render(self, key, ids, folder, scale=2, names=None, exact=False):
        """Layers as PNG files (icons, photos, whole frames), all in one call. -> {id: path}. Cached by file name."""
        folder = pathlib.Path(folder)
        folder.mkdir(parents=True, exist_ok=True)
        names = names or {i: f"fig{hashlib.sha1(f'{key}:{i}:{scale}'.encode()).hexdigest()[:10]}.png" for i in ids}
        out = {i: folder / names[i] for i in ids}
        todo = [i for i in ids if not out[i].exists()]
        for start in range(0, len(todo), 100):
            batch = todo[start:start + 100]
            q = urllib.parse.urlencode({"ids": ",".join(batch), "format": "png", "scale": scale, **({"use_absolute_bounds": "true"} if exact else {})})
            urls = self.get(f"/images/{key}?{q}").get("images") or {}
            for i in batch:
                if urls.get(i):
                    with urllib.request.urlopen(urls[i], timeout=90) as r:
                        out[i].write_bytes(r.read())
        return {i: p for i, p in out.items() if p.exists()}


def find_node(node, node_id):
    if node.get("id") == node_id:
        return node
    for k in node.get("children") or []:
        got = find_node(k, node_id)
        if got:
            return got
    return None


# ---------- reading layers ----------
VECTORS = {"VECTOR", "BOOLEAN_OPERATION", "STAR", "POLYGON", "REGULAR_POLYGON", "LINE"}
SHAPES = {"RECTANGLE", "ELLIPSE"}
CONTAINERS = {"FRAME", "GROUP", "INSTANCE", "COMPONENT", "COMPONENT_SET", "SECTION"}
FIELD = re.compile(r"\b(input|text ?field|textbox|field|search|email|password|phone|mobile number|otp|pin)\b", re.I)
BUTTON = re.compile(r"\b(button|btn|cta)\b", re.I)
CHECK = re.compile(r"\b(check ?box|checkbox|tick|radio)\b", re.I)
ICON = re.compile(r"\b(icon|ico|logo|avatar|glyph|arrow|chevron|illustration|image|img|photo|picture)\b", re.I)
DROPDOWN = re.compile(r"\b(drop ?down|select|picker|combo)\b", re.I)


def visible(n):
    return n.get("visible", True) and n.get("opacity", 1) > 0.01


def colour(c, opacity=1.0):
    """Figma colour -> (rgb, alpha)."""
    return (round(c["r"] * 255), round(c["g"] * 255), round(c["b"] * 255)), c.get("a", 1) * opacity


def hex8(rgb, alpha=1.0):
    return "%02x%02x%02x" % rgb + ("" if alpha >= 0.995 else "%02x" % round(alpha * 255))


def paints(n, key="fills"):
    return [p for p in n.get(key) or [] if p.get("visible", True) and p.get("opacity", 1) > 0.01]


def fill_of(n):
    """The top visible fill: {"bg", "bg2", "angle"} for solids and linear gradients, {"image": True} for a picture, or None."""
    ps = paints(n)
    if not ps:
        return None
    p = ps[-1]                                           # Figma's last fill is drawn on top
    op = p.get("opacity", 1) * n.get("opacity", 1)
    if p["type"] == "SOLID":
        rgb, a = colour(p["color"], op)
        return {"bg": hex8(rgb, a), "rgb": rgb, "alpha": a} if a > 0.01 else None
    if p["type"] in ("GRADIENT_RADIAL", "GRADIENT_ANGULAR", "GRADIENT_DIAMOND"):
        return {"radial": True}            # a soft glow, or a picture-like fill: a build has no such gradient
    if p["type"].startswith("GRADIENT"):
        stops = p.get("gradientStops") or []
        if not stops:
            return None
        (c1, a1), (c2, a2) = colour(stops[0]["color"], op), colour(stops[-1]["color"], op)
        h = p.get("gradientHandlePositions") or [{"x": 0, "y": 0}, {"x": 0, "y": 1}]
        dx, dy = h[1]["x"] - h[0]["x"], h[1]["y"] - h[0]["y"]
        # a build draws straight gradients only: top to bottom or left to right (from first stop to last)
        if abs(dy) >= abs(dx):
            angle, flip = 180, dy < 0
        else:
            angle, flip = 90, dx < 0
        if flip:
            (c1, a1), (c2, a2) = (c2, a2), (c1, a1)
        mid = tuple((x + y) // 2 for x, y in zip(c1, c2))
        return {"bg": hex8(c1, a1), "bg2": hex8(c2, a2), "angle": angle, "rgb": mid, "alpha": max(a1, a2)}
    if p["type"] == "IMAGE":
        return {"image": True}
    return None


def stroke_of(n):
    ps = paints(n, "strokes")
    w = n.get("strokeWeight") or 0
    if not ps or w <= 0 or ps[-1]["type"] != "SOLID":
        return None
    rgb, a = colour(ps[-1]["color"], ps[-1].get("opacity", 1) * n.get("opacity", 1))
    return {"border": hex8(rgb, a), "border_width": max(1, round(w))} if a > 0.05 else None


def shadow_of(n):
    for e in n.get("effects") or []:
        if e.get("type") == "DROP_SHADOW" and e.get("visible", True):
            rgb, a = colour(e["color"])
            off = e.get("offset") or {}
            return {"shadow": hex8(rgb, a), "blur": round(e.get("radius", 0)), "spread": round(e.get("spread", 0)),
                    "sx": round(off.get("x", 0)), "sy": round(off.get("y", 0))}
    return None


def blurred(n):
    return any(e.get("type") == "LAYER_BLUR" and e.get("visible", True) for e in n.get("effects") or [])


def radius_of(n, box):
    if n["type"] == "ELLIPSE":
        return round(min(box[2] - box[0], box[3] - box[1]) / 2)
    r = n.get("cornerRadius")
    if r is None and n.get("rectangleCornerRadii"):
        r = max(n["rectangleCornerRadii"])
    return round(r or 0)


def texts_in(n):
    return any(k["type"] == "TEXT" and visible(k) for k in descend(n))


def descend(n):
    for k in n.get("children") or []:
        yield k
        yield from descend(k)


def is_icon(n, box):
    """Drawn rather than laid out: vectors, or a small group of shapes with no text (an icon component), or a picture."""
    if n["type"] in VECTORS:
        return True
    if n["type"] in CONTAINERS | SHAPES and not texts_in(n):
        w, h = box[2] - box[0], box[3] - box[1]
        parts = list(descend(n))
        drawn = parts and all(k["type"] in VECTORS | SHAPES | CONTAINERS for k in parts) and any(k["type"] in VECTORS for k in parts)
        if (drawn and w <= 96 and h <= 96) or (ICON.search(n.get("name", "")) and w <= 160 and h <= 160 and parts):
            return True
    return False


class Layers:
    """A frame's visible layers as the planner's items: {"type", "img": box in frame px, "text", "look"/"style", "kids"}."""

    def __init__(self, frame):
        self.frame = frame
        b = frame["absoluteBoundingBox"]
        self.x0, self.y0, self.W, self.H = b["x"], b["y"], b["width"], b["height"]
        self.items = []       # flat, before nesting
        self.images = {}      # item id() -> Figma node id to export
        self.shapes = []      # every filled or bordered box, for observe.py
        for k in frame.get("children") or []:
            self.read(k, [0.0, 0.0, float(self.W), float(self.H)])
        for z, it in enumerate(self.items):       # Figma's layer order, back to front: overlapping widgets keep it
            it["z"] = z

    def box(self, n, clip, key="absoluteBoundingBox"):
        b = n.get(key) or n.get("absoluteBoundingBox")
        if not b:
            return None
        x1, y1 = b["x"] - self.x0, b["y"] - self.y0
        x2, y2 = x1 + b["width"], y1 + b["height"]
        # clipped by the frame, or by a parent that clips its content: keep what shows
        x1, y1, x2, y2 = max(clip[0], x1), max(clip[1], y1), min(clip[2], x2), min(clip[3], y2)
        return [float(x1), float(y1), float(x2), float(y2)] if x2 - x1 >= 1 and y2 - y1 >= 1 else None

    def read(self, n, clip, in_box=False):
        if not visible(n) or blurred(n) or n.get("isMask"):   # a blurred layer is a soft glow; a mask only clips others
            return
        box = self.box(n, clip)
        if box is None:
            return
        t = n["type"]
        whole = self.box(n, [-1e9, -1e9, 1e9, 1e9])
        if whole != box and not texts_in(n) and (t == "ELLIPSE" or radius_of(n, whole) >= min(whole[2] - whole[0], whole[3] - whole[1]) / 2 - 1):
            return          # a circle or pill cut by its card's edge (a soft arc on a bank card): a build cannot draw an arc
        if t == "TEXT":
            self.text(n, box)
            return
        fill = fill_of(n)
        w, h = box[2] - box[0], box[3] - box[1]
        if fill and fill.get("radial") and not n.get("children") and (w > 120 or h > 120):
            return                                  # a big soft glow: decoration a build cannot draw
        if t in SHAPES | {"FRAME"} and not n.get("children") and max(w, h) <= 24 and w * h <= 300 and fill and not fill.get("image")                 and not stroke_of(n) and not ICON.search(n.get("name", "")) and not in_box:
            return      # confetti: a tiny filled shape on its own; scattered over a page, it would stop the layout finding rows
        if fill and (fill.get("image") or fill.get("radial")) or is_icon(n, box):
            # exported at exactly its box (use_absolute_bounds): a shadow outside it is cut, and nothing overlaps its neighbours
            item = {"type": "image", "text": "", "img": box, "kids": [], "texts": [], "name": n.get("name", "")}
            self.images[id(item)] = n["id"]
            self.items.append(item)
            return
        if fill and fill.get("radial"):
            fill = None
        style = {}
        if fill:
            style.update({k: v for k, v in fill.items() if k in ("bg", "bg2", "angle")})
        style.update(stroke_of(n) or {})
        style.update(shadow_of(n) or {})
        kids = [k for k in n.get("children") or [] if visible(k)]
        grouping = not style and t in ("FRAME", "INSTANCE", "COMPONENT") and n.get("layoutMode") in ("HORIZONTAL", "VERTICAL") and len(kids) >= 2
        if style and (t in SHAPES or t in CONTAINERS):
            style["radius"] = radius_of(n, box)
            item = {"type": "panel", "text": "", "img": box, "kids": [], "texts": [], "style": style, "name": n.get("name", ""),
                    "rgb": (fill or {}).get("rgb"), "figma": n["type"]}
            self.items.append(item)
            self.shapes.append(box)
        elif grouping:
            # an auto-layout frame with no look of its own is still the designer's group (a page's main column next to its
            # sidebar): it stays, as a container without a skin
            self.items.append({"type": "panel", "text": "", "img": box, "kids": [], "texts": [], "style": {}, "name": n.get("name", ""),
                               "rgb": None, "figma": n["type"], "grouping": True})
        inner = box if n.get("clipsContent") else clip
        for k in n.get("children") or []:
            self.read(k, inner, in_box or bool(style and (t in SHAPES or t in CONTAINERS)))

    def text(self, n, box):
        chars = (n.get("characters") or "").replace(" ", " ").replace("\n", " ").strip()
        if not chars:
            return
        st = n.get("style") or {}
        px = float(st.get("fontSize") or 14)
        line = float(st.get("lineHeightPx") or px * 1.2)
        lines = max(1, round((box[3] - box[1]) / max(1, line)))
        runs = self.runs(n, st) if lines == 1 else []
        if len(runs) > 1:
            # one line set in two styles ("We sent it to … · " grey + "Change number" violet): a label per style, side by side,
            # each as wide as its share of the line (measured in Arial, scaled to the line Figma drew)
            from agent import text_width
            widths = [(text_width(r["text"], r["bold"]) or len(r["text"]) * 0.5) * r["px"] for r in runs]
            scale = (box[2] - box[0]) / max(1.0, sum(widths))
            x = box[0]
            for r, w in zip(runs, widths):
                w *= scale
                if r["text"].strip():
                    lead = (len(r["text"]) - len(r["text"].lstrip())) / max(1, len(r["text"])) * w
                    tail = (len(r["text"]) - len(r["text"].rstrip())) / max(1, len(r["text"])) * w
                    self.add_text(n, r["text"].strip(), [x + lead, box[1], x + w - tail, box[3]], r, 1)
                x += w
            return
        base = {"px": px, "bold": (st.get("fontWeight") or 400) >= 600, "fills": paints(n)}
        self.add_text(n, chars, box, base, lines)

    def runs(self, n, st):
        """A text's style runs: [{text, px, bold, fills}] where colour or weight changes."""
        over = n.get("characterStyleOverrides") or []
        table = n.get("styleOverrideTable") or {}
        chars = n.get("characters") or ""
        if not over or not table:
            return []
        out = []
        for i, ch in enumerate(chars):
            o = table.get(str(over[i])) if i < len(over) and over[i] else None
            o = o or {}
            px = float(o.get("fontSize") or st.get("fontSize") or 14)
            bold = (o.get("fontWeight") or st.get("fontWeight") or 400) >= 600
            fills = [p for p in (o.get("fills") or paints(n)) if p.get("visible", True)]
            key = (px, bold, json.dumps(fills[-1].get("color") if fills else None, sort_keys=True))
            if out and out[-1]["key"] == key:
                out[-1]["text"] += ch
            else:
                out.append({"key": key, "text": ch, "px": px, "bold": bold, "fills": fills})
        return [r for r in out if r["text"]] if len(out) > 1 else []

    def add_text(self, n, chars, box, style, lines):
        st = n.get("style") or {}
        if st.get("textCase") == "UPPER":
            chars = chars.upper()
        elif st.get("textCase") == "LOWER":
            chars = chars.lower()
        fills = style.get("fills") or []
        rgb, a = colour(fills[-1]["color"], fills[-1].get("opacity", 1) * n.get("opacity", 1)) if fills and fills[-1]["type"] == "SOLID" else ((20, 20, 20), 1)
        self.items.append({"type": "text", "text": re.sub(r"\s+", " ", chars), "img": box, "kids": [], "texts": [],
                           "look": {"ink": rgb, "alpha": a, "px": style["px"], "bold": style["bold"], "figma": True},
                           "lines": lines, "wrapped": lines > 1, "align": st.get("textAlignHorizontal", "LEFT"), "name": n.get("name", ""),
                           "ink_h": box[3] - box[1] if lines == 1 else (box[3] - box[1]) / lines})


# ---------- the planner ----------
def _planner_class():
    from responsive import ResponsivePlanner
    from plan import SKIN_WORD, _hexs
    from skinmaker import auto_name, clean

    class FigmaPlanner(ResponsivePlanner):
        def __init__(self, layers, render_png, form, exports, project, library, views=None):
            super().__init__(None, [], str(render_png), form, layers.W, project, library, views=views)
            self.s = 1.0                          # Figma px are dp
            self.layers, self.exports = layers, exports
            self.made = set()

        # ----- what is on the screen: Figma's layers, nested by what is inside what -----
        def build_tree(self):
            L = self.layers
            self.root = {"type": "root", "text": "", "img": [0.0, 0.0, float(L.W), float(L.H)], "kids": [], "texts": [], "id": "flxPage",
                         "b": [0.0, 0.0, float(L.W), float(L.H)]}
            items = [dict(it) for it in L.items]
            for it, src in zip(items, L.items):
                it["_src"] = id(src)
            # a shape drawn exactly behind another one (a frame's own background rectangle): one panel
            panels = [it for it in items if it["type"] == "panel"]
            drop = set()
            for a in panels:
                for b in panels:
                    if a is not b and id(b) not in drop and id(a) not in drop and all(abs(p - q) <= 1 for p, q in zip(a["img"], b["img"])):
                        merged = {**a["style"], **b["style"]}
                        b["style"] = merged
                        drop.add(id(a))
            items = [it for it in items if id(it) not in drop]
            by_size = sorted([it for it in items if it["type"] == "panel"], key=lambda p: (p["img"][2] - p["img"][0]) * (p["img"][3] - p["img"][1]))

            def inside(outer, inner):
                return outer["img"][0] - 1 <= inner["img"][0] and outer["img"][1] - 1 <= inner["img"][1] and \
                    outer["img"][2] + 1 >= inner["img"][2] and outer["img"][3] + 1 >= inner["img"][3]

            def area(it):
                return (it["img"][2] - it["img"][0]) * (it["img"][3] - it["img"][1])

            for it in items:
                parent = next((p for p in by_size if p is not it and area(p) > area(it) and inside(p, it)), self.root)
                parent["kids"].append(it)
                it["parent"] = parent
            for it in items:
                if it["type"] == "image" and tuple(it["img"]) not in self.exports:
                    it.update(type="panel", style={}, placeholder=True)      # not exported (Figma's limit): keep its place
                self.kind(it)
            self.roles(items)
            self.room_for_font(items)
            for it in items + [self.root]:
                it["b"] = list(it["img"])

        def room_for_font(self, items):
            """Visualizer sets text in Helvetica/Arial, often wider than the design's font (Inter, SF): a one-line label gets
            the width it needs in Arial, a paragraph 6% more; never past the next thing on its line or its container's edge."""
            from agent import text_width
            for t in items:
                if t["type"] != "text" or t.get("align") not in ("LEFT", "JUSTIFIED"):
                    continue
                need = (text_width(t["text"], t["look"]["bold"]) or 0) * t["look"]["px"] + 3 if t.get("lines", 1) == 1 else 0
                x1, y1, x2, y2 = t["img"]
                p = t["parent"]
                # inside a styled panel, keep its padding (taken as the same on both sides); the page has its own width
                edge = p["img"][2] - (max(0.0, x1 - p["img"][0]) if p is not self.root else 0.0)
                # anything on its line to the right, in any group (a search box beside a heading sits in another group)
                right = [k["img"][0] for k in items if k is not t and k["img"][0] >= x2 - 1 and min(k["img"][3], y2) - max(k["img"][1], y1) > 0]
                limit = min(right + [edge]) - 6
                want = x1 + need if need else x2 + 0.06 * (x2 - x1)
                t["img"][2] = max(x2, min(want, limit))

        def kind(self, it):
            """A panel holding just one text: a button, a field, or still a panel (a chip, a badge)."""
            if it["type"] != "panel":
                return
            w, h = it["img"][2] - it["img"][0], it["img"][3] - it["img"][1]
            kids = it["kids"]
            texts = [k for k in kids if k["type"] == "text"]
            others = [k for k in kids if k["type"] != "text"]
            name = it.get("name", "")
            if not kids and (CHECK.search(name) or (w <= 28 and abs(w - h) <= 4 and it["style"].get("border"))):
                it["type"] = "checkbox"
                return
            if len(texts) != 1 or others or h > 80:
                return
            t = texts[0]
            left, right = t["img"][0] - it["img"][0], it["img"][2] - t["img"][2]
            if DROPDOWN.search(name):
                it.update(type="dropdown", text=t["text"])
            elif FIELD.search(name) and not BUTTON.search(name):
                it.update(type="input", text=t["text"], ph=t)
            elif BUTTON.search(name) or (abs(left - right) <= max(6, 0.12 * w) and h >= 24 and w >= 1.4 * h):
                it.update(type="button", text=t["text"], label=t)
            else:
                return
            it["kids"] = []

        def plan_text(self):
            pass                                  # Figma gives each text its exact style

        def page(self):
            bg = fill_of(self.layers.frame) or {}
            return bg.get("rgb") or (255, 255, 255), []

        # ----- skins: Figma's exact values -----
        def skin(self, wtype, look):
            spec = clean({"wType": wtype, **look})
            name = auto_name(spec)
            if name not in self.made:
                self.made.add(name)
                attrs = []
                if spec.get("bg"):
                    attrs.append(f"background {spec['bg']}" + (f" to {spec['bg2']}, angle {spec['angle']}" if spec.get("bg2") else ""))
                if spec.get("color"):
                    attrs.append(f"text {spec['color']}")
                if spec.get("px"):
                    attrs.append(f"size {spec['px']}")
                if spec.get("bold"):
                    attrs.append("bold")
                if spec.get("border"):
                    attrs.append(f"border {spec['border']}, border width {spec.get('border_width', 1)}")
                if spec.get("radius"):
                    attrs.append(f"radius {spec['radius']}")
                if spec.get("shadow"):
                    attrs.append(f"shadow {spec['shadow']} blur {spec['blur']} spread {spec['spread']} x {spec['sx']} y {spec['sy']}")
                self.lines.append(f"create a {SKIN_WORD[wtype]} skin called {name} with " + ", ".join(attrs))
            return name

        def make_skin(self, wtype, look):            # what the responsive rules ask for (breakpoint font sizes)
            return self.skin(wtype, {k: v for k, v in look.items() if k in ("bg", "bg2", "angle", "color", "px", "bold", "border", "radius")})

        def text_look(self, t):
            look = t["look"]
            return {"color": hex8(look["ink"], look.get("alpha", 1)), "px": max(6, round(look["px"])), "bold": look["bold"]}

        def text_skin(self, node, behind):
            return self.skin("Label", self.text_look(node))

        def panel_skin(self, node):
            style = node.get("style") or {}
            return self.skin("FlexContainer", style) if style else None

        def button_skin(self, node):
            return self.skin("Button", {**node.get("style", {}), **self.text_look(node["label"])})

        def input_skin(self, node):
            return self.skin("TextField", {**node.get("style", {}), **self.text_look(node["ph"])})

        def checkbox_skin(self, node):
            return self.skin("FlexContainer", node.get("style") or {"border": "999999", "radius": 4})

        # ----- what each thing is for (the same reasoning the properties panel shows: widgets.py) -----
        def roles(self, items):
            app = str(pathlib.Path(__file__).resolve().parent.parent)
            if app not in sys.path:
                sys.path.insert(0, app)      # widgets.py lives in the app folder
            import widgets as W
            area = lambda it: (it["img"][2] - it["img"][0]) * (it["img"][3] - it["img"][1])  # noqa: E731
            wh = lambda it: (it["img"][2] - it["img"][0], it["img"][3] - it["img"][1])       # noqa: E731

            def texts(p):
                return [k for k in p["kids"] if k["type"] == "text"]

            def chevron(p, after_x):
                return any(k["type"] in ("image", "panel") and not k.get("style") and k["img"][0] >= after_x and wh(k)[0] <= 28 and wh(k)[1] <= 28
                           and k["img"][0] >= p["img"][0] + 0.7 * wh(p)[0] for k in p["kids"])

            # fields: a box with a small caption over its value (badges and icons may sit with them)
            for p in items:
                st = p.get("style") or {}
                if p["type"] != "panel" or not (st.get("border") or st.get("bg")) or st.get("bg2"):
                    continue
                w, h = wh(p)
                def inner(q):        # its texts, through any unstyled groups (a styled badge keeps its own)
                    for k in q["kids"]:
                        if k["type"] == "text":
                            yield k
                        elif k["type"] == "panel" and not k.get("style"):
                            yield from inner(k)
                ts = sorted(inner(p), key=lambda t: (t["img"][1], t["img"][0]))
                if not (36 <= h <= 100 and w >= 2.2 * h) or not ts:
                    continue
                # an input looks like one: a light box, no big icon tile, a caption that is not an overline (an info card
                # such as "YOU'RE OPENING / Standard Savings" is all three)
                bg = st.get("bg") or "ffffff"
                light = sum(int(bg[i:i + 2], 16) for i in (0, 2, 4)) >= 600 and (len(bg) < 8 or int(bg[6:8], 16) >= 0xc0)
                tile = any((k["type"] == "image" or (k["type"] == "panel" and k.get("style"))) and wh(k)[0] >= 32 and wh(k)[1] >= 32
                           for k in p["kids"])
                if not light or tile:
                    continue
                if len(ts) >= 2:
                    value = max(ts, key=lambda t: (t["look"]["px"], len(t["text"])))
                    if value["type"] != "text":
                        continue            # an inner box already made it its field's value
                    above = [t for t in ts if t is not value and t["img"][3] <= value["img"][1] + 2 and t["look"]["px"] <= value["look"]["px"]]
                    if not above or value.get("lines", 1) > 1:
                        continue
                    caption = above[0]["text"]
                    if caption.isupper() and len(caption) > 3:
                        continue
                    kind = W.field_kind(caption, value["text"], chevron(p, value["img"][2]))
                    value.update(type="field", field_kind=kind, caption=caption)
                elif len(ts) == 1 and st.get("border"):
                    t = ts[0]
                    ink = t["look"]["ink"]
                    faint = max(ink) - min(ink) < 40 and sum(ink) / 3 > 110
                    left, right = t["img"][0] - p["img"][0], p["img"][2] - t["img"][2]
                    if left < right and (faint or W.TYPE_WORDS.search(t["text"]) or W.PICK_WORDS.search(t["text"])):
                        kind = W.field_kind("", t["text"], chevron(p, t["img"][2]))
                        t.update(type="field", field_kind=kind, caption="", hint=True)
            # code boxes: four or more equal squares in a row, each with at most a digit
            by_parent = {}
            for p in items:
                if p["type"] in ("panel", "button") and p.get("style"):
                    by_parent.setdefault(id(p["parent"]), []).append(p)
            for group in by_parent.values():
                sq = [p for p in group if 30 <= wh(p)[0] <= 96 and abs(wh(p)[0] - wh(p)[1]) <= 0.25 * wh(p)[0]
                      and all(k["type"] != "text" or len(k["text"]) <= 2 for k in p["kids"])]
                if len(sq) >= 4 and max(wh(p)[0] for p in sq) - min(wh(p)[0] for p in sq) <= 6 and \
                        max(p["img"][1] for p in sq) - min(p["img"][1] for p in sq) <= 6:
                    for p in sq:
                        digit = next((k for k in p["kids"] if k["type"] == "text"), None)
                        p.update(type="input", text=digit["text"] if digit else "", ph=digit, maxlen=1, kids=[])
            # links: short coloured action text, alone or with an arrow after it
            for t in items:
                if t["type"] != "text" or t.get("lines", 1) > 1 or t["look"]["px"] >= 24 or t["text"].isupper() or len(t["text"].split()) > 5:
                    continue
                par = t["parent"]
                pst = par.get("style") or {}
                if par is not self.root and pst and wh(par)[1] <= 48 and len(texts(par)) == 1:
                    continue             # the only text of a small styled box: a chip or a badge, not a link
                arrow = any(k["type"] in ("image", "panel") and not k.get("style") and 0 <= k["img"][0] - t["img"][2] <= 16 and wh(k)[0] <= 24
                            and min(k["img"][3], t["img"][3]) > max(k["img"][1], t["img"][1]) for k in par["kids"])
                ink = "%02x%02x%02x" % t["look"]["ink"]
                if W.saturated(ink) and (arrow or W.LINK_WORDS.search(t["text"])):
                    t["type"] = "link"
            # a toggle: a pill holding a selected option (a styled button) and plain texts, the other options
            for p in items:
                if p["type"] != "panel" or not (p.get("style") or {}).get("radius"):
                    continue
                buttons = [k for k in p["kids"] if k["type"] == "button"]
                plain = [k for k in p["kids"] if k["type"] == "text"]
                if buttons and plain and len(buttons) + len(plain) <= 4 and len(p["kids"]) == len(buttons) + len(plain):
                    for t in plain:
                        # the option takes the selected one's size, centred where its text was
                        bx = buttons[0]["img"]
                        cx, half = (t["img"][0] + t["img"][2]) / 2, (bx[2] - bx[0]) / 2
                        left = max(p["img"][0], min(cx - half, p["img"][2] - 2 * half))
                        t.update(type="link", segment=wh(buttons[0]), img=[left, bx[1], left + 2 * half, bx[3]])

        def place(self, it, parent, pid, layout, prev):
            t = it.get("type")
            if t not in ("link", "field") and not (t == "input" and it.get("maxlen")):
                return super().place(it, parent, pid, layout, prev)
            where = self.offset_words(it, parent, layout, prev)
            text = (it.get("text") or "").replace('"', "'")
            look = self.text_look(it) if it.get("look") else None
            if t == "link":
                it["id"] = self.ids.make("btn", text)
                w, h = it.get("segment") or (self.w(it) + 4, self.h(it) + 4)
                skin = self.skin("Button", {"bg": "ffffff00", **look})
                self.line({"id": pid}, f'add a button called {it["id"]} with text "{text}", width {round(w)}dp, height {round(h)}dp, {where}, skin {skin}')
                return it["id"]
            if t == "input":          # a code box: one character
                it["id"] = self.ids.make("tbx", "Code")
                skin = self.skin("TextField", {**it.get("style", {}), **(self.text_look(it["ph"]) if it.get("ph") else {"color": "111827", "px": 24})})
                self.line({"id": pid}, f'add a text box called {it["id"]} with text "{text}", max length 1, width {round(self.w(it))}dp, '
                                       f'height {round(self.h(it))}dp, {where}, skin {skin}')
                return it["id"]
            kind = it.get("field_kind", "textbox")
            wtype, word, prefix = {"textbox": ("TextField", "text box", "tbx"), "password": ("TextField", "text box", "tbx"),
                                   "dropdown": ("ListBox", "drop down", "lst"), "date": ("Calendar", "date picker", "cal")}[kind]
            it["id"] = self.ids.make(prefix, text)
            skin = self.skin(wtype, {"bg": "ffffff00", **look})      # the field's box draws the border
            if it.get("hint"):      # the rest of its box, so it stretches with the box on a narrower screen
                rest = max(self.w(it), (parent["img"][2] - it["img"][0]) * self.s - 12)
                size = f"width {self.pct(rest, self.w(parent))}, height {round(self.h(it)) + 6}dp"
            else:
                size = f"width 100%, height {round(self.h(it)) + 6}dp"
            if kind in ("textbox", "password"):
                said = f'with text "{text}", placeholder "{it["caption"]}"' if it.get("caption") else f'with placeholder "{text}"'
                masked = ", masked" if kind == "password" else ""
                self.line({"id": pid}, f'add a text box called {it["id"]} {said}{masked}, {size}, {where}, skin {skin}')
            else:
                self.line({"id": pid}, f'add a {word} called {it["id"]} with placeholder "{text}", {size}, {where}, skin {skin}')
            return it["id"]

        def crop(self, box):
            return self.exports.get(tuple(box)) or self.exports.get("missing", "")

    return FigmaPlanner


# ---------- frames: one link, or the file's matching frames for the other breakpoints ----------
SIZE_WORDS = re.compile(r"\b(web|desktop|tablet|ipad|mobile|phone|iphone|android|dt|mob|tab)\b", re.I)


def frames_in(node):
    """The frames a page, section or group holds (a frame link is its own only frame)."""
    if node["type"] in ("FRAME", "COMPONENT", "INSTANCE") and node.get("absoluteBoundingBox"):
        return [node]
    out = []
    for k in node.get("children") or []:
        if k["type"] in ("FRAME", "COMPONENT", "INSTANCE"):
            out.append(k)
        elif k["type"] in ("SECTION", "GROUP", "CANVAS"):
            out += frames_in(k)
    return out


def breakpoint_of(frame, section=""):
    """The frame's own name first ("Web 1440 / 05 Verify mobile" is Web), then its section; a word must agree with the
    frame's width (a 2810 px frame in a "Mobile Web" section is not a phone screen)."""
    width = frame["absoluteBoundingBox"]["width"]
    by_width = "desktop" if width >= 1100 else "tablet" if width >= 600 else "mobile"
    fits = {"desktop": width >= 1000, "tablet": 600 <= width < 1200, "mobile": width < 600}
    for words in (frame.get("name", ""), section):
        m = SIZE_WORDS.search(words or "")
        if m:
            w = m.group(1).lower()
            bp = "desktop" if w in ("web", "desktop", "dt") else "tablet" if w in ("tablet", "ipad", "tab") else "mobile"
            return bp if fits[bp] else by_width
    return by_width


def screen_name(name):
    """A frame's name without its size words and widths: "Web 1440 / 05 Verify mobile (OTP)" and
    "Mobile / 05 Verify mobile (OTP)" are one screen."""
    n = SIZE_WORDS.sub(" ", name or "")
    n = re.sub(r"\b(?:\d{3,4})(?:\s*(?:px|w|x\s*\d+))?\b", " ", n)       # 1440, 768px, 390w, 1440x960
    return re.sub(r"[\W_]+", " ", n).strip().lower()


def catalogue(client, key, refresh=False):
    """Every frame in the file with its section and breakpoint: [{id, name, section, page, bp, w, h}]."""
    doc = client.tree(key, depth=3, refresh=refresh)
    out = []
    for page in doc.get("children") or []:
        for k in page.get("children") or []:
            section = k.get("name", "") if k["type"] == "SECTION" else ""
            for f in frames_in(k) if k["type"] == "SECTION" else ([k] if k["type"] in ("FRAME", "COMPONENT") else []):
                b = f.get("absoluteBoundingBox") or {}
                if not b:
                    continue
                out.append({"id": f["id"], "name": f.get("name", ""), "section": section, "page": page.get("name", ""),
                            "bp": breakpoint_of(f, section), "w": round(b["width"]), "h": round(b["height"]), "x": b["x"], "y": b["y"]})
    return out


def counterparts(frames, chosen):
    """The tablet and mobile frames of the chosen screen: the same name without size words, else the same place in order
    within their sections (designers lay out each size's screens in the same order)."""
    pick = next(f for f in frames if f["id"] == chosen)
    out = {pick["bp"]: pick}
    for bp in ("desktop", "tablet", "mobile"):
        if bp in out:
            continue
        same = [f for f in frames if f["bp"] == bp and screen_name(f["name"]) and screen_name(f["name"]) == screen_name(pick["name"])]
        if same:
            out[bp] = same[0]
            continue
        mine = sorted((f for f in frames if f["section"] == pick["section"] and f["bp"] == pick["bp"]), key=lambda f: (round(f["y"] / 50), f["x"]))
        theirs = sorted((f for f in frames if f["bp"] == bp), key=lambda f: (f["section"], round(f["y"] / 50), f["x"]))
        if mine and theirs and pick in mine and len(theirs) >= len(mine) * 0.8:
            i = mine.index(pick)
            if i < len(theirs):
                out[bp] = {**theirs[i], "guess": True}
    return out


# ---------- the whole run ----------
def run(links, form=None, project=None, library=None, cache=None, refresh=False):
    """links: {"desktop"|"tablet"|"mobile": Figma frame link}. The widest given builds the form at its own size; the narrower
    ones set their breakpoints. -> {lines, form, width, size, kinds, observed, frames}"""
    import agent
    cache =pathlib.Path(cache or pathlib.Path(__file__).resolve().parent.parent / "work" / "figma")
    client = Client(cache)
    order = [bp for bp in ("desktop", "tablet", "mobile") if links.get(bp)]
    if not order:
        raise FigmaError("Give at least one Figma frame link.")
    nodes = {}
    for bp in order:
        key, node_id = parse_link(links[bp])
        if not node_id:
            raise FigmaError(f"The {bp} link has no layer in it. In Figma, right-click the frame > Copy link to selection.")
        node = client.node(key, node_id, refresh)
        frames = frames_in(node)
        if not frames:
            raise FigmaError(f"The {bp} link is not a frame. Pick a frame (a screen), not a page or section.")
        nodes[bp] = (key, frames[0])
    key, frame = nodes[order[0]]
    layers = Layers(frame)
    images_dir = pathlib.Path(library).parent / "images" if library else cache / "images"
    # icons and pictures from Figma itself; the whole frame too, for the pixel check
    ids = sorted(set(layers.images.values()))
    names = {i: f"fig{hashlib.sha1(f'{key}:{i}:box'.encode()).hexdigest()[:10]}.png" for i in ids}
    shot = cache / "frames" / f"fig{hashlib.sha1(f'{key}:{frame['id']}:1'.encode()).hexdigest()[:10]}.png"
    shot.parent.mkdir(parents=True, exist_ok=True)
    want = ids + ([] if shot.exists() else [frame["id"]])
    names[frame["id"]] = f"frame{hashlib.sha1(f'{key}:{frame['id']}'.encode()).hexdigest()[:10]}.png"
    note = ""
    try:
        got = client.render(key, want, images_dir, scale=2, names=names, exact=True) if want else {}     # one call for all of them
    except FigmaError as e:
        # no exports right now (Figma's limit): the form still builds; icons not exported before keep their place, empty
        got = {i: images_dir / names[i] for i in want if (images_dir / names[i]).exists()}
        note = str(e)
    exports = {}
    for it in layers.items:
        nid = layers.images.get(id(it))
        if nid and nid in got:
            exports[tuple(it["img"])] = got[nid].name
    if not shot.exists():
        from PIL import Image
        if frame["id"] in got:
            Image.open(got[frame["id"]]).convert("RGB").resize((round(layers.W), round(layers.H))).save(shot)
        else:      # no picture of the frame: a plain one of its colour (only the pixel check uses it)
            Image.new("RGB", (round(layers.W), round(layers.H)), (fill_of(frame) or {}).get("rgb") or (255, 255, 255)).save(shot)
    views = {}
    for bp in order[1:]:
        if bp == "desktop":
            continue
        k2, f2 = nodes[bp]
        other = Layers(f2)
        lines = [{"text": t["text"], "box": [int(v) for v in t["img"]], "px": t["look"]["px"]} for t in other.items if t["type"] == "text"]
        pics = [{"name": t.get("name", ""), "box": t["img"]} for t in other.items if t["type"] == "image"]
        views[bp] = (_Size(other.W, other.H), lines, other.shapes, pics)
    Planner = _planner_class()
    texts = [{"text": t["text"], "box": t["img"]} for t in layers.items if t["type"] == "text"]
    planner = Planner(layers, shot, form or agent.form_name(frame.get("name", ""), texts), exports, project or agent.DEFAULT_PROJECT, library, views=views)
    prompt = planner.script()
    missing = sum(1 for it in layers.items if it["type"] == "image" and tuple(it["img"]) not in exports)
    return {"lines": prompt, "form": planner.form, "width": round(layers.W), "size": [round(layers.W), round(layers.H)],
            "missing_images": missing, "note": note,
            "kinds": agent._kinds(prompt), "observed": planner.observed, "shot": str(shot), "mode": "figma",
            "frames": {bp: {"id": f["id"], "name": f.get("name", ""), "w": round(f["absoluteBoundingBox"]["width"])} for bp, (_, f) in nodes.items()}}


class _Size:
    """What observe.Seen needs of a screenshot reader, for a Figma frame."""

    def __init__(self, W, H):
        self.W, self.H = W, H


if __name__ == "__main__":
    sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
    ap = argparse.ArgumentParser()
    ap.add_argument("link")
    ap.add_argument("--tablet")
    ap.add_argument("--mobile")
    ap.add_argument("--name")
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--out")
    ap.add_argument("--refresh", action="store_true")
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    try:
        if a.list:
            key, _ = parse_link(a.link)
            for f in catalogue(Client(pathlib.Path(__file__).resolve().parent.parent / "work" / "figma"), key, a.refresh):
                print(f"{f['bp']:8} {f['w']:>5}x{f['h']:<5} {f['id']:>10}  {f['section'][:30]:30}  {f['name']}")
            sys.exit(0)
        res = run({"desktop": a.link, "tablet": a.tablet, "mobile": a.mobile}, form=a.name, refresh=a.refresh)
    except FigmaError as e:
        sys.exit(f"Figma: {e}")
    text = "\n".join(res["lines"]) + "\n"
    if a.out:
        pathlib.Path(a.out).write_text(text, encoding="utf-8")
    else:
        print(text)
    print(json.dumps({k: v for k, v in res.items() if k != "lines"}), file=sys.stderr)
