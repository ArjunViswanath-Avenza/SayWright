// Saywright front end. Talks only to the local backend (same origin).
const $ = (id) => document.getElementById(id);
let state = null, status = null, busy = false, sttReady = false;
let mode = "design", width = 1366, shownVersion = -1;

async function api(path, body, raw) {
  const opts = body === undefined ? {} : {
    method: "POST",
    headers: { "Content-Type": raw ? "audio/wav" : "application/json" },
    body: raw ? body : JSON.stringify(body),
  };
  const r = await fetch(path, opts);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || data.detail || r.statusText);
  return data;
}
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
function toast(msg) {
  const t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2600);
}

// ---------- canvas: the form as viz2react renders it ----------
function frameDoc() { try { return $("frame").contentDocument; } catch { return null; } }

let fitted = "", scale = 1;
const PAD = 12;   // viewport padding: form x=0 / y=0 sits PAD px into each ruler
function fit() {
  const vp = $("viewport"), box = $("frameBox");
  const availW = Math.floor(vp.clientWidth - 2 * PAD), availH = Math.floor(vp.clientHeight - 2 * PAD);
  if (availW <= 0 || availH <= 0) return;
  // round down, so the scaled form never ends a fraction of a pixel past the viewport
  scale = Math.min(1, Math.floor((availW / width) * 1000) / 1000);
  const height = Math.floor(availH / scale);
  const key = `${width}|${scale}|${height}`;
  if (key !== fitted) {   // ResizeObserver also fires for our own changes: only touch the box when the fit changed
    fitted = key;
    Object.assign(box.style, { width: `${width}px`, height: `${height}px`, transform: `scale(${scale})`,
      // the scaled box still takes its unscaled size in layout; give that space back
      marginBottom: `${-(1 - scale) * height}px`, marginRight: `${-(1 - scale) * width}px` });
  }
  drawRulers();
}

// ---------- rulers: form pixels (1 dp = 1 px), following the form's own scroll ----------
const BP_OF = { 1366: "b1", 1024: "b2", 640: "b3" };
const BP_LABEL = { b1: "Desktop", b2: "Tablet", b3: "Mobile" };
const BP_RANGE = { b1: "applies 1025–1366 px", b2: "applies 641–1024 px", b3: "applies up to 640 px" };
const curBp = () => BP_OF[width];

function frameScroll() {
  const doc = frameDoc(), se = doc && doc.scrollingElement;
  return se ? [se.scrollLeft, se.scrollTop] : [0, 0];
}
function selectedBox() {
  const doc = frameDoc();
  if (!doc || !state || !state.selected || state.selected === state.form) return null;
  const n = doc.querySelector(`[data-viz="${CSS.escape(state.selected)}"]`);
  if (!n) return null;
  const r = n.getBoundingClientRect(), [sx, sy] = frameScroll();
  return r.width || r.height ? { x: r.left + sx, y: r.top + sy, w: r.width, h: r.height } : null;
}
function drawRulers() {
  const [sx, sy] = frameScroll(), sel = selectedBox();
  drawRuler($("rulerTop"), true, sx, sel && [sel.x, sel.x + sel.w]);
  drawRuler($("rulerLeft"), false, sy, sel && [sel.y, sel.y + sel.h]);
}
function drawRuler(cv, horiz, scroll, band) {
  const dpr = window.devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight;
  if (!W || !H) return;
  if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
  const ctx = cv.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  const css = getComputedStyle(document.documentElement), v = (n) => css.getPropertyValue(n).trim();
  const len = horiz ? W : H, depth = horiz ? H : W;
  const at = (px) => PAD + (px - scroll) * scale;               // form px -> ruler px
  const end = horiz ? Math.min(len, at(width)) : len;
  // the form's extent, and the selected widget's extent
  ctx.fillStyle = v("--soft");
  horiz ? ctx.fillRect(at(0), 0, end - at(0), depth) : ctx.fillRect(0, at(0), depth, end - at(0));
  if (band) {
    ctx.fillStyle = "rgba(255,106,19,.22)";
    const a = at(band[0]), b = at(band[1]);
    horiz ? ctx.fillRect(a, 0, b - a, depth) : ctx.fillRect(0, a, depth, b - a);
  }
  const steps = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];
  const minor = steps.find((s) => s * scale >= 5) || 1000;
  const major = steps.find((s) => s * scale >= 48 && s % minor === 0) || 1000;
  ctx.strokeStyle = v("--muted"); ctx.fillStyle = v("--muted"); ctx.lineWidth = 1;
  ctx.font = "9px ui-monospace, Consolas, monospace";
  ctx.beginPath();
  for (let px = Math.max(0, Math.ceil(scroll / minor) * minor); ; px += minor) {
    const p = Math.round(at(px)) + 0.5;
    if (p > end + 0.5) break;
    const isMajor = px % major === 0, t = isMajor ? depth * 0.6 : (px % (minor * 5) === 0 ? depth * 0.35 : depth * 0.2);
    horiz ? (ctx.moveTo(p, depth), ctx.lineTo(p, depth - t)) : (ctx.moveTo(depth, p), ctx.lineTo(depth - t, p));
    if (isMajor) {
      if (horiz) ctx.fillText(String(px), p + 2, 9);
      else { ctx.save(); ctx.translate(9, p + 2); ctx.rotate(Math.PI / 2); ctx.fillText(String(px), 0, 0); ctx.restore(); }
    }
  }
  ctx.stroke();
  if (horiz) {
    // where the narrower breakpoints end, so a desktop layout can be read against tablet and mobile widths
    for (const [bw, name] of [[640, "Mobile"], [1024, "Tablet"]]) {
      if (bw >= width) continue;
      const p = Math.round(at(bw)) + 0.5;
      ctx.strokeStyle = v("--accent"); ctx.setLineDash([3, 2]);
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, depth); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = v("--accent"); ctx.fillText(`${name} ${bw}`, p + 3, depth - 3);
    }
  }
}

function showBp() {
  const bp = curBp(), box = $("bpInfo");
  box.replaceChildren(`${BP_LABEL[bp]} · `, el("b", "", `${width}px`), ` · breakpoint `, el("b", "", bp), ` (${BP_RANGE[bp]})`);
}

function loadCanvas() {
  const c = state.canvas || {};
  $("canvasError").hidden = !c.error;
  $("canvasError").textContent = c.error || "";
  $("renderInfo").textContent = c.ms != null ? `${c.widgets ?? "?"} widgets · rendered in ${c.ms} ms` : "";
  $("emptyHint").hidden = !!(state.tree && state.tree.children.length);
  if (c.version === shownVersion || c.error) { decorate(); return; }
  shownVersion = c.version;
  $("frameBox").classList.add("loading");
  $("frame").src = `/canvas/index.html?v=${c.version}#/${state.form}`;
}

const DESIGN_CSS = `
  [data-sw-sel] { outline: 2px solid #ff6a13 !important; outline-offset: 1px; }
  [data-sw-hover]:not([data-sw-sel]) { outline: 1px dashed #ff6a13 !important; outline-offset: 1px; }
  [data-sw-touched] { animation: swflash 1.2s ease-out 1; }
  @keyframes swflash { 0% { box-shadow: 0 0 0 4px rgba(255,106,19,.55); } 100% { box-shadow: 0 0 0 4px rgba(255,106,19,0); } }
  html.sw-design * { cursor: default !important; }`;

function decorate() {
  const doc = frameDoc();
  if (!doc || !doc.body) return;
  if (!doc.getElementById("sw-style")) {
    const s = doc.createElement("style"); s.id = "sw-style"; s.textContent = DESIGN_CSS; doc.head.appendChild(s);
    hookFrame(doc);
  }
  doc.documentElement.classList.toggle("sw-design", mode === "design");
  doc.querySelectorAll("[data-sw-sel],[data-sw-touched]").forEach((n) => { n.removeAttribute("data-sw-sel"); n.removeAttribute("data-sw-touched"); });
  if (mode !== "design" || !state) return;
  const sel = state.selected && state.selected !== state.form && doc.querySelector(`[data-viz="${CSS.escape(state.selected)}"]`);
  if (sel) sel.setAttribute("data-sw-sel", "");
  const touched = state.last && state.last !== state.form && doc.querySelector(`[data-viz="${CSS.escape(state.last)}"]`);
  if (touched && touched !== sel) touched.setAttribute("data-sw-touched", "");
  drawRulers();
}

function hookFrame(doc) {
  // Design mode: clicks select widgets instead of running the controller; Play mode lets everything through.
  const pick = (e) => (e.target.closest ? e.target.closest("[data-viz]") : null);
  doc.addEventListener("click", async (e) => {
    if (mode !== "design") return;
    e.preventDefault(); e.stopPropagation();
    const t = pick(e);
    if (!t) return;
    propsDismissed = null;
    state = await api("/api/select", { id: t.getAttribute("data-viz") });
    render();
  }, true);
  for (const ev of ["mousedown", "mouseup", "keydown", "input", "change", "focusin"]) {
    doc.addEventListener(ev, (e) => { if (mode === "design" && ev !== "focusin") e.stopPropagation(); if (mode === "design" && ev === "focusin") e.target.blur && e.target.blur(); }, true);
  }
  let hovered = null;
  doc.addEventListener("mouseover", (e) => {
    if (hovered) hovered.removeAttribute("data-sw-hover");
    hovered = mode === "design" ? pick(e) : null;
    if (hovered && hovered.getAttribute("data-viz") !== state.form) hovered.setAttribute("data-sw-hover", ""); else hovered = null;
  });
  doc.addEventListener("mousemove", (e) => {
    const [sx, sy] = frameScroll();
    $("pointer").textContent = `x ${Math.round(e.clientX + sx)}  y ${Math.round(e.clientY + sy)} px`;
  });
  doc.addEventListener("mouseleave", () => { $("pointer").textContent = ""; });
  doc.addEventListener("scroll", drawRulers, { passive: true });
  // keep push-to-talk working while the canvas has focus
  doc.addEventListener("keydown", onKeyDown);
  doc.addEventListener("keyup", onKeyUp);
}

$("frame").addEventListener("load", () => {
  $("frameBox").classList.remove("loading");
  // the runtime renders after load: hook clicks now, mark the selection once React has painted
  // (timers, not requestAnimationFrame: a window in the background never runs animation frames)
  decorate();
  setTimeout(decorate, 60);
  setTimeout(decorate, 300);
});

// ---------- panels ----------
const TYPE_LABEL = { form: "form", flex: "flex", scrollflex: "scroll", label: "label", button: "button", textbox: "text box",
  textarea: "text area", listbox: "list", calendar: "date", image: "image", segment: "segment", component: "component", richtext: "rich text" };

const CONTAINER_TYPES = new Set(["form", "flex", "scrollflex"]);
let treeInfo = {};   // id -> {node, parent}, rebuilt with the list

function renderTree() {
  const tree = $("tree");
  tree.replaceChildren();
  treeInfo = {};
  (function walk(n, d, parent) {
    treeInfo[n.id] = { node: n, parent };
    const li = el("li", [n.id === state.selected ? "sel" : "", n.id === state.last ? "touched" : ""].join(" "));
    li.style.paddingLeft = `${6 + d * 14}px`;
    li.dataset.id = n.id;
    if (parent) {
      li.draggable = true;
      li.title = "Drag to move it. Alt+↑ / Alt+↓ moves the selected widget.";
      li.append(el("span", "grip", "⠇"));
    } else li.append(el("span", "grip"));
    li.append(el("span", "wt", TYPE_LABEL[n.type] || n.type), el("span", "wid", n.id));
    const txt = n.attrs.text || n.attrs.placeholder || n.attrs.ref;
    if (txt) li.append(el("span", "wtext", `“${txt}”`));
    if (n.attrs.visible === false) li.append(el("span", "wtext", "hidden"));
    tree.appendChild(li);
    n.children.forEach((c) => walk(c, d + 1, n));
  })(state.tree, 0, null);
}

// ---------- drag and drop in the widget list: before / after a widget, or inside a container ----------
let dragId = null;
const within = (id, ancestor) => { for (let p = treeInfo[id]; p; p = p.parent && treeInfo[p.parent.id]) if (p.node.id === ancestor) return true; return false; };

function dropZone(li, e) {
  const id = li.dataset.id, info = treeInfo[id];
  if (!dragId || !info || within(id, dragId)) return null;               // never into itself or its own children
  if (!info.parent) return "inside";                                     // the form row: append to the form
  const r = li.getBoundingClientRect(), f = (e.clientY - r.top) / r.height;
  if (CONTAINER_TYPES.has(info.node.type)) return f < 0.28 ? "before" : f > 0.72 ? "after" : "inside";
  return f < 0.5 ? "before" : "after";
}

// zone -> {parent, after}: after null = first. Siblings are counted without the dragged widget.
function dropTarget(id, zone) {
  const { node, parent } = treeInfo[id];
  const kids = (p) => p.children.map((c) => c.id).filter((c) => c !== dragId);
  if (zone === "inside") { const k = kids(node); return { parent: node.id, after: k.length ? k[k.length - 1] : null }; }
  const k = kids(parent), i = k.indexOf(id);
  return zone === "before" ? { parent: parent.id, after: i > 0 ? k[i - 1] : null } : { parent: parent.id, after: id };
}

function sameSpot(id, to) {
  const { parent } = treeInfo[id];
  const k = parent.children.map((c) => c.id), i = k.indexOf(id);
  return parent.id === to.parent && (i > 0 ? k[i - 1] : null) === to.after;
}

function clearDrop() { $("tree").querySelectorAll(".drop-before,.drop-after,.drop-inside").forEach((x) => x.classList.remove("drop-before", "drop-after", "drop-inside")); }

function moveWidget(id, to) {
  if (sameSpot(id, to)) return;
  editQueue = editQueue.then(async () => {
    try {
      const res = await api("/api/edit", { id, move: to });
      state = res;
      logEntry(`${id}: move into ${to.parent}${to.after ? ` after ${to.after}` : " (first)"}`, res, "panel");
      $("heard").textContent = res.say;
      if (!res.ok) toast(res.say);
      render();
    } catch (e) { toast(`Move failed: ${e.message}`); }
  });
}

$("tree").addEventListener("dragstart", (e) => {
  const li = e.target.closest && e.target.closest("li[data-id]");
  if (!li || !li.draggable) return;
  dragId = li.dataset.id;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", dragId);
  requestAnimationFrame(() => li.classList.add("dragging"));
});
$("tree").addEventListener("dragover", (e) => {
  const li = e.target.closest && e.target.closest("li[data-id]");
  clearDrop();
  if (!li) return;
  const zone = dropZone(li, e);
  if (!zone) { e.dataTransfer.dropEffect = "none"; return; }
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  li.classList.add(`drop-${zone}`);
});
$("tree").addEventListener("dragleave", (e) => { if (!$("tree").contains(e.relatedTarget)) clearDrop(); });
$("tree").addEventListener("drop", (e) => {
  e.preventDefault();
  const li = e.target.closest && e.target.closest("li[data-id]");
  const zone = li && dropZone(li, e), id = dragId;
  clearDrop();
  if (zone && id) moveWidget(id, dropTarget(li.dataset.id, zone));
});
$("tree").addEventListener("dragend", () => {
  dragId = null;
  clearDrop();
  $("tree").querySelectorAll(".dragging").forEach((x) => x.classList.remove("dragging"));
});

// Alt+↑ / Alt+↓: move the selected widget one place up or down among its siblings
function nudgeSelected(dir) {
  const id = state && state.selected, info = id && treeInfo[id];
  if (!info || !info.parent) return;
  const k = info.parent.children.map((c) => c.id), i = k.indexOf(id), j = i + dir;
  if (j < 0 || j >= k.length) { toast(dir < 0 ? `${id} is already first in ${info.parent.id}` : `${id} is already last in ${info.parent.id}`); return; }
  const rest = k.filter((c) => c !== id);
  moveWidget(id, { parent: info.parent.id, after: j > 0 ? rest[j - 1] : null });
}

function render() {
  if (!state) return;
  $("formId").textContent = state.form;
  $("btnUndo").disabled = !state.can_undo;
  $("spec").textContent = state.spec;
  renderTree();
  loadCanvas();
  renderProps();
}

// ---------- properties drawer: every change is one undoable edit, and the canvas re-renders ----------
let meta = null, propsFor = null, propsDismissed = null;
const DIM_RE = /^(-?\d+(\.\d+)?(dp|%|px)|preferred|unset)$/;
// [spec attr, label, kind, widget types (null = all but the form)]
const SECTIONS = [
  ["Content", [
    ["text", "Text", "text", ["label", "button", "textbox", "textarea", "richtext"]],
    ["placeholder", "Placeholder", "text", ["textbox", "textarea", "listbox", "calendar"]],
    ["src", "Image file", "text", ["image"]],
    ["secure", "Masked input", "bool", ["textbox"]],
    ["maxlen", "Max length", "int", ["textbox", "textarea"]],
  ]],
  ["Size", [["w", "Width", "dim"], ["h", "Height", "dim"]], "grid"],
  ["Position", [["top", "Top", "dim"], ["left", "Left", "dim"], ["right", "Right", "dim"], ["bottom", "Bottom", "dim"],
    ["cx", "Ctr X", "dim"], ["cy", "Ctr Y", "dim"]], "grid"],
  ["Container", [
    ["layout", "Arrange children", "layout", ["flex", "scrollflex"]],
    ["autogrow", "Grow with content", "grow", ["flex", "scrollflex"]],
  ]],
  ["Style", [["skin", "Skin", "skin", ["form", "flex", "scrollflex", "label", "button", "textbox", "textarea", "listbox", "calendar", "image", "segment", "richtext"]]]],
  ["Visibility", [["visible", "Visible", "visible"]]],
];

function findNode(id, n = state.tree, parent = null) {
  if (n.id === id) return { node: n, parent };
  for (const c of n.children) { const f = findNode(id, c, n); if (f) return f; }
  return null;
}

function propsMsg(text, bad) { const m = $("propsMsg"); m.textContent = text || ""; m.classList.toggle("bad", !!bad); }

// Breakpoint forking: on = edits become this breakpoint's override (Visualizer responsiveData.bN);
// off = edits change the shared value and drop that property's overrides, so every screen shows the change.
let forking = false;
try { forking = localStorage.getItem("sw.forking") === "1"; } catch { /* storage blocked: default off */ }
const forkable = (attr) => !!meta && meta.forkable.includes(attr);
const forkKey = (attr) => (forking && forkable(attr) ? `${curBp()}.${attr}` : null);
// what a field shows: the override for this breakpoint when forking, else the shared value
function shown(node, attr) {
  const a = node.attrs, fk = forkKey(attr);
  return { value: fk ? a[fk] : a[attr], inherited: a[attr], fk, overridden: !!fk && a[fk] !== undefined,
    elsewhere: Object.keys(meta.breakpoints).filter((b) => a[`${b}.${attr}`] !== undefined) };
}

let editQueue = Promise.resolve();
function sendEdit(body) {
  // edits go out one at a time, in order, so fast typing cannot reorder them
  const bp = forking && body.attrs ? curBp() : null;
  editQueue = editQueue.then(async () => {
    try {
      const res = await api("/api/edit", { id: propsFor, ...body, bp });
      state = res;
      propsMsg(res.ok ? `${res.say}${state.canvas && state.canvas.ms != null ? ` Canvas updated in ${state.canvas.ms} ms.` : ""}` : res.say, !res.ok);
      const what = body.remove ? "delete" : body.rename ? `rename to ${body.rename}`
        : Object.entries(body.attrs || {}).map(([k, v]) => `${k} = ${v === null ? "default" : typeof v === "string" ? v : JSON.stringify(v)}`).join(", ");
      logEntry(`${propsFor}: ${what}${bp ? ` (${BP_LABEL[bp]} only)` : ""}`, res, "panel");
      if (body.rename && res.ok) propsFor = body.rename;
      render();
    } catch (e) { propsMsg(`Error: ${e.message}`, true); }
  });
  return editQueue;
}

const timers = {};
function later(key, fn, ms) { clearTimeout(timers[key]); timers[key] = setTimeout(fn, ms); }

function field(label, input, cls) {
  const f = el("div", "field" + (cls ? " " + cls : ""));
  const l = el("label", "", label);
  if (input.id) l.htmlFor = input.id;
  f.append(l, input);
  return f;
}

// the label's marker: overridden here (with a reset), shared-only property, or "differs on Tablet, Mobile"
function marker(f, node, attr) {
  const sh = shown(node, attr), l = f.querySelector("label");
  if (forking && !forkable(attr)) {
    l.append(el("span", "tagline", "all screens"));
    l.title = "Visualizer keeps one value for this property on every screen.";
  } else if (forking && sh.overridden) {
    f.classList.add("ovr");
    const r = el("button", "reset", "↺"); r.type = "button";
    r.title = `Remove the ${BP_LABEL[curBp()]} value: use the shared value (${sh.inherited ?? "default"})`;
    r.setAttribute("aria-label", r.title);
    r.addEventListener("click", () => sendEdit({ attrs: { [attr]: null } }));
    l.append(r);
  } else if (!forking && sh.elsewhere.length) {
    const t = el("span", "tagline warn", `≠ ${sh.elsewhere.map((b) => BP_LABEL[b]).join(", ")}`);
    t.title = `This property has its own value on ${sh.elsewhere.map((b) => `${BP_LABEL[b]} (${node.attrs[`${b}.${attr}`]})`).join(", ")}. Editing it here sets it for all screens and removes those.`;
    l.append(t);
  }
}

function control(attr, kind, node) {
  const sh = shown(node, attr), id = `p-${attr}`;
  if (kind === "text" || kind === "int") {
    const i = el("input"); i.type = kind === "int" ? "number" : "text"; i.id = id; i.dataset.attr = attr;
    i.value = sh.value ?? "";
    if (sh.fk) i.placeholder = sh.inherited != null ? `${sh.inherited}` : "";
    i.addEventListener("input", () => {
      i.classList.add("dirty");
      later(attr, () => { i.classList.remove("dirty"); sendEdit({ attrs: { [attr]: i.value === "" ? null : (kind === "int" ? Number(i.value) : i.value) } }); }, 450);
    });
    return i;
  }
  if (kind === "dim") {
    const i = el("input"); i.type = "text"; i.id = id; i.dataset.attr = attr;
    i.placeholder = sh.fk && sh.inherited != null ? `${sh.inherited}` : "—";
    i.value = sh.value ?? ""; i.setAttribute("list", "dimHints"); i.spellcheck = false;
    const push = () => {
      const v = i.value.trim();
      const ok = v === "" || DIM_RE.test(v);
      i.classList.toggle("bad", !ok);
      if (!ok) { propsMsg("Use a number with dp, % or px (48%, 200dp), or preferred.", true); return; }
      i.classList.add("dirty");
      later(attr, () => { i.classList.remove("dirty"); sendEdit({ attrs: { [attr]: v === "" ? null : v } }); }, 350);
    };
    i.addEventListener("input", push);
    i.addEventListener("keydown", (e) => {     // ↑/↓ nudge by 1, Shift+↑/↓ by 10, keeping the unit
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      const m = /^(-?\d+(?:\.\d+)?)(dp|%|px)$/.exec((i.value || i.placeholder).trim());
      if (!m) return;
      e.preventDefault();
      const step = (e.shiftKey ? 10 : 1) * (e.key === "ArrowUp" ? 1 : -1);
      i.value = `${Math.round((parseFloat(m[1]) + step) * 100) / 100}${m[2]}`;
      push();
    });
    return i;
  }
  if (kind === "bool" || kind === "visible" || kind === "grow") {
    const wrap = el("label", "check"), c = el("input"); c.type = "checkbox"; c.id = id; c.dataset.attr = attr;
    const cur = sh.value !== undefined ? sh.value : sh.inherited;
    c.checked = kind === "visible" ? cur !== false : !!cur;
    c.addEventListener("change", () => {
      // an override must say true/false; a shared value goes back to the template default when "on"
      const v = sh.fk ? c.checked : kind === "visible" ? (c.checked ? null : false) : kind === "grow" ? (c.checked ? 1 : null) : (c.checked ? true : null);
      sendEdit({ attrs: { [attr]: v } });
    });
    wrap.append(c, kind === "visible" ? "Shown" : kind === "grow" ? "Height follows children" : "On");
    return wrap;
  }
  if (kind === "layout") {
    const s = el("select"); s.id = id; s.dataset.attr = attr;
    for (const [v, t] of [["vertical", "Stacked (vertical flow)"], ["horizontal", "In a row (horizontal flow)"], ["free", "Free form (top/left)"]]) {
      const o = el("option", "", t); o.value = v; s.appendChild(o);
    }
    s.value = sh.value || sh.inherited || "free";
    s.addEventListener("change", () => sendEdit({ attrs: { layout: s.value } }));
    return s;
  }
  if (kind === "skin") {
    const wtype = meta.wtype[node.type], names = meta.skins[wtype] || [];
    const s = el("select"); s.id = id; s.dataset.attr = attr;
    const def = el("option", "", sh.fk ? `Same as all screens (${sh.inherited || meta.defaults[wtype] || "default"})`
      : `Project default${meta.defaults[wtype] ? ` (${meta.defaults[wtype]})` : ""}`);
    def.value = ""; s.appendChild(def);
    const roles = Object.entries(meta.roles).filter(([, n]) => names.includes(n));
    if (roles.length) {
      const g = el("optgroup"); g.label = "Styles";
      roles.forEach(([r, n]) => { const o = el("option", "", `${r[0].toUpperCase() + r.slice(1)} · ${n}`); o.value = n; g.appendChild(o); });
      s.appendChild(g);
    }
    const made = el("optgroup"), used = el("optgroup"), rest = el("optgroup");
    made.label = "Made in Saywright"; used.label = "Used on this project's forms"; rest.label = "Other skins";
    names.forEach((n) => { const o = el("option", "", meta.used[n] ? `${n} (${meta.used[n]})` : n); o.value = n; ((meta.created || []).includes(n) ? made : meta.used[n] ? used : rest).appendChild(o); });
    if (made.children.length) s.appendChild(made);
    if (used.children.length) s.appendChild(used);
    if (rest.children.length) s.appendChild(rest);
    if (sh.value && !names.includes(sh.value)) { const o = el("option", "", sh.value); o.value = sh.value; s.appendChild(o); }
    s.value = sh.value || "";
    s.addEventListener("change", () => { paintSkin(s.value || sh.inherited || meta.defaults[wtype], node); sendEdit({ attrs: { skin: s.value || null } }); });
    return s;
  }
  return el("span", "muted small", "—");
}

function paintSkin(name, node) {
  const p = document.getElementById("skinPreview");
  if (!p) return;
  p.removeAttribute("style");
  Object.assign(p.style, (meta.css && meta.css[name]) || {});
  p.textContent = node.attrs.text || node.attrs.placeholder || name || "Default";
}
// ---------- new skin: a look -> a theme file, applied to the selected widget through the normal (undoable) edit ----------
const TEXT_WIDGETS = ["label", "button", "textbox", "textarea", "listbox", "calendar", "richtext"];
function skinLook(wtype, isText) {
  let bgk = document.querySelector("[data-bgk].on").dataset.bgk;
  const look = { wType: wtype, name: $("skName").value.trim() };
  if (bgk !== "none") look.bg = $("skBg").value;
  if (bgk === "grad") { look.bg2 = $("skBg2").value; look.angle = +$("skAngle").value || 0; }
  if (isText) { look.color = $("skColor").value; look.px = +$("skPx").value || 16; look.bold = $("skBold").checked; }
  if ($("skBorderOn").checked) { look.border = $("skBorder").value; look.border_width = +$("skBorderW").value || 1; }
  if (+$("skRadius").value) look.radius = +$("skRadius").value;
  if ($("skGlowOn").checked) { look.shadow = $("skGlow").value; look.blur = +$("skBlur").value || 0; }
  return look;
}
function paintSkinSample(look) {
  const p = $("skinSample");
  p.removeAttribute("style");
  Object.assign(p.style, {
    background: look.bg2 ? `linear-gradient(${look.angle}deg, ${look.bg}, ${look.bg2})` : look.bg || "transparent",
    color: look.color || "inherit", fontSize: look.px ? `${Math.min(look.px, 40)}px` : "", fontWeight: look.bold ? 700 : 400,
    border: look.border ? `${look.border_width}px solid ${look.border}` : "0", borderRadius: `${look.radius || 0}px`,
    boxShadow: look.shadow ? `0 0 ${look.blur}px ${look.shadow}` : "none",
  });
}
function newSkin(node) {
  const wtype = meta.wtype[node.type], isText = TEXT_WIDGETS.includes(node.type), dlg = $("skinDlg");
  document.querySelectorAll(".sk-text").forEach((e) => { e.hidden = !isText; e.style.display = isText ? "" : "none"; });
  $("skName").value = ""; $("skinMsg").textContent = ""; $("skinMsg").classList.remove("bad");
  $("skinSample").textContent = node.attrs.text || node.attrs.placeholder || "Sample";
  const repaint = () => {
    const kind = document.querySelector("[data-bgk].on").dataset.bgk;
    $("skBg").hidden = kind === "none"; $("skBg2").hidden = $("skAngle").hidden = kind !== "grad";
    paintSkinSample(skinLook(wtype, isText));
  };
  dlg.querySelectorAll("input").forEach((i) => { i.oninput = repaint; });
  document.querySelectorAll("[data-bgk]").forEach((b) => { b.onclick = () => { document.querySelectorAll("[data-bgk]").forEach((x) => x.classList.toggle("on", x === b)); repaint(); }; });
  repaint();
  $("skinCancel").onclick = () => dlg.close();
  dlg.oncancel = null;
  $("skinForm").onsubmit = async (e) => {
    e.preventDefault();
    const res = await api("/api/skin", skinLook(wtype, isText));
    if (!res.ok) { $("skinMsg").textContent = res.say; $("skinMsg").classList.add("bad"); return; }
    dlg.close();
    meta = await api("/api/props-meta");
    state = res; render();
    sendEdit({ attrs: { skin: res.skin } });
    toast(res.say);
  };
  dlg.showModal();
}

const effectiveSkin = (node) => { const sh = shown(node, "skin"); return sh.value || sh.inherited || meta.defaults[meta.wtype[node.type]]; };

function forkSwitch() {
  const row = el("div", "fork" + (forking ? " on" : ""));
  const lab = el("label", "switch"), c = el("input");
  c.type = "checkbox"; c.id = "p-fork"; c.checked = forking; c.setAttribute("role", "switch");
  lab.append(c, el("span", "knob"), el("span", "switch-text", "Breakpoint forking"));
  const bp = curBp();
  const note = el("div", "fork-note", forking
    ? `Changes apply to ${BP_LABEL[bp]} only (${width}px, ${bp}). Switch Desktop / Tablet / Mobile above the canvas to edit another screen.`
    : "Changes apply to Desktop, Tablet and Mobile.");
  c.addEventListener("change", () => {
    forking = c.checked;
    try { localStorage.setItem("sw.forking", forking ? "1" : "0"); } catch { /* not remembered */ }
    $("props").dataset.sig = "";     // rebuild the fields for the new mode
    renderProps();
    propsMsg(forking ? `Breakpoint forking on: edits change ${BP_LABEL[curBp()]} only.` : "Breakpoint forking off: edits change every screen.");
  });
  row.append(lab, note);
  return row;
}

// ---------- what a widget is for: every kind it could be (likely first, with the reason), and ways to arrange it ----------
function widgetSection(node) {
  const sec = el("div", "props-sec widget-sec");
  sec.append(el("div", "sec-h", "What it is"));
  const list = el("div", "kinds");
  list.append(el("div", "hint", "Working out what this could be…"));
  const arr = el("div", "arrange");
  sec.append(list, el("div", "sec-h sub", "Arrange"), arr);
  api(`/api/widget/options?id=${encodeURIComponent(node.id)}`).then((o) => {
    if (propsFor !== node.id) return;
    list.replaceChildren();
    if (!o.ok) { list.append(el("div", "hint", o.say || "")); return; }
    if (!o.kinds.length) list.append(el("div", "hint", "A container with no text of its own: select a widget inside it to change it, or arrange this one below."));
    for (const k of o.kinds) {
      const b = el("button", `kind${k.current ? " current" : ""}${k.suggested ? " suggested" : ""}`);
      b.type = "button";
      const head = el("span", "kind-h", k.title);
      if (k.current) head.append(el("span", "kind-tag", "now"));
      else if (k.suggested) head.append(el("span", "kind-tag", "suggested"));
      b.append(head, el("span", "kind-d", k.why ? `${k.why}. ${k.desc}` : k.desc));
      b.disabled = !!k.current;
      b.title = k.current ? "What this widget is now" : `Change ${node.id} into a ${k.title.toLowerCase()} (Ctrl+Z undoes)`;
      b.onclick = () => widgetAction("/api/widget/convert", { id: node.id, to: k.to }, `${node.id}: change into a ${k.title.toLowerCase()}`);
      list.append(b);
    }
    arr.replaceChildren(...o.arrange.map((a) => {
      const b = el("button", "ghost arr", a.title);
      b.type = "button";
      b.onclick = () => widgetAction("/api/widget/arrange", { id: node.id, action: a.action }, `${node.id}: ${a.title.toLowerCase()}`);
      return b;
    }));
  }).catch((e) => { list.replaceChildren(el("div", "hint", e.message)); });
  return sec;
}

async function widgetAction(path, body, label) {
  const res = await api(path, body).catch((e) => ({ ok: false, say: e.message }));
  if (res.tree) state = res;
  propsMsg(res.say, res.ok === false);
  logEntry(label, res, "panel");
  if (res.ok) { propsFor = null; propsDismissed = null; pendingSay = res.say; }
  render();
}
let pendingSay = null;      // what a change or move said, shown once the panel is rebuilt for the new widget

function buildProps(node, parent) {
  const body = $("propsBody");
  body.replaceChildren();
  $("propsType").textContent = TYPE_LABEL[node.type] || node.type;
  $("propsId").textContent = node.id;
  const isForm = node.type === "form";
  body.append(forkSwitch());

  const idIn = el("input"); idIn.type = "text"; idIn.id = "p-id"; idIn.value = node.id; idIn.spellcheck = false; idIn.disabled = isForm;
  idIn.title = isForm ? "Start a new form to change the form id" : "Enter applies the new id (all screens)";
  const rename = () => {
    const v = idIn.value.trim();
    if (v === node.id) return;
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(v)) { idIn.classList.add("bad"); propsMsg("Ids use letters, digits and _ and cannot start with a digit.", true); return; }
    idIn.classList.remove("bad");
    sendEdit({ rename: v });
  };
  idIn.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); rename(); } });
  idIn.addEventListener("blur", rename);
  const top = el("div", "props-sec");
  top.append(field("Id", idIn));
  if (parent) {
    const pl = shown(parent, "layout");
    top.append(el("div", "hint", `inside ${parent.id}${pl.value || pl.inherited ? ` · ${pl.value || pl.inherited} layout` : ""}`));
  }
  body.append(top);
  if (!isForm) body.append(widgetSection(node));

  for (const [title, fields, layout] of SECTIONS) {
    const usable = fields.filter(([, , , types]) => (types ? types.includes(node.type) : !isForm));
    if (!usable.length) continue;
    const sec = el("div", "props-sec");
    sec.append(el("div", "sec-h", title));
    const box = layout === "grid" ? el("div", "grid2") : sec;
    for (const [attr, label, kind] of usable) {
      const f = field(label, control(attr, kind, node));
      marker(f, node, attr);
      box.append(f);
      if (kind === "skin") {
        const prev = el("div", "skin-preview"); prev.id = "skinPreview";
        const pf = el("div", "field"); pf.append(el("span"), prev); box.append(pf);
        const nf = el("div", "field"), nb = el("button", "ghost btn-new-skin", "New skin…");
        nb.type = "button"; nb.addEventListener("click", () => newSkin(node));
        nf.append(el("span"), nb); box.append(nf);
      }
    }
    if (box !== sec) sec.append(box);
    const pl = parent ? (shown(parent, "layout").value || parent.attrs.layout) : null;
    if (title === "Position" && ["vertical", "horizontal"].includes(pl)) {
      sec.append(el("div", "hint", `In a ${pl} flow, ${pl === "vertical" ? "top" : "left"} is the space before this widget.`));
    }
    body.append(sec);
  }
  if (node.type === "component") body.append(el("p", "muted small", `Component ${node.attrs.ref || ""}: its inside is edited in the component, not here.`));

  // everything else: the widget's Spec attributes as JSON (bN.<prop> keys are the per-breakpoint values)
  const adv = el("details"), sum = el("summary", "", "All attributes (JSON)"), ta = el("textarea");
  ta.id = "p-json"; ta.spellcheck = false; ta.value = JSON.stringify(node.attrs, null, 1);
  const apply = el("button", "ghost", "Apply JSON");
  apply.addEventListener("click", () => {
    let next;
    try { next = JSON.parse(ta.value); } catch (e) { propsMsg(`Not valid JSON: ${e.message}`, true); return; }
    const attrs = {};
    for (const k of Object.keys(node.attrs)) if (!(k in next)) attrs[k] = null;
    for (const [k, v] of Object.entries(next)) if (JSON.stringify(v) !== JSON.stringify(node.attrs[k])) attrs[k] = v;
    if (!Object.keys(attrs).length) { propsMsg("No changes."); return; }
    // the JSON is literal: keys go in exactly as written, never forked
    editQueue = editQueue.then(async () => {
      const res = await api("/api/edit", { id: propsFor, attrs });
      state = res; propsMsg(res.say, !res.ok); logEntry(`${propsFor}: JSON`, res, "panel"); render();
    });
  });
  adv.append(sum, ta, apply);
  body.append(adv);

  if (!isForm) {
    const acts = el("div", "props-actions"), del = el("button", "danger", "Delete widget");
    del.addEventListener("click", async () => {
      const yes = await ask({ title: `Delete ${node.id}?`, text: node.children.length ? `Everything inside it goes too (${node.children.length} widget${node.children.length > 1 ? "s" : ""} directly inside). Ctrl+Z brings it back.` : "Ctrl+Z brings it back.", okLabel: "Delete", danger: true });
      if (yes) sendEdit({ remove: true });
    });
    acts.append(del);
    body.append(acts);
  }
  if (body.querySelector("#skinPreview")) paintSkin(effectiveSkin(node), node);
}

function syncProps(node) {
  // same widget and markers, new state: refresh values the user is not editing right now
  for (const inp of $("propsBody").querySelectorAll("[data-attr]")) {
    if (inp === document.activeElement || inp.classList.contains("dirty")) continue;
    const attr = inp.dataset.attr, sh = shown(node, attr), v = sh.value;
    if (inp.type === "checkbox") { const cur = v !== undefined ? v : sh.inherited; inp.checked = attr === "visible" ? cur !== false : !!cur; }
    else if (attr === "layout") inp.value = v || sh.inherited || "free";
    else inp.value = v ?? "";
    inp.classList.remove("bad");
  }
  const ta = document.getElementById("p-json");
  if (ta && ta !== document.activeElement) ta.value = JSON.stringify(node.attrs, null, 1);
  if (document.getElementById("skinPreview")) paintSkin(effectiveSkin(node), node);
}

function renderProps() {
  const sel = state.selected;
  const hit = sel && meta ? findNode(sel) : null;
  const open = !!hit && propsDismissed !== sel;
  $("props").classList.toggle("open", open);
  $("props").setAttribute("aria-hidden", String(!open));
  if (!open) { propsFor = null; return; }
  // rebuild when the widget, its parent's layout, the mode/breakpoint or which values are overridden change
  const keys = Object.keys(hit.node.attrs).filter((k) => /^b\d+\./.test(k)).sort().join(",");
  const sig = [hit.node.id, hit.node.type, hit.parent ? hit.parent.id + hit.parent.attrs.layout : "", forking ? curBp() : "shared", keys, (meta.created || []).length].join("|");
  if (propsFor !== hit.node.id || $("props").dataset.sig !== sig) {
    const first = propsFor !== hit.node.id;
    // keep the field being typed in focused across the rebuild
    const act = document.activeElement, focusAttr = act && act.dataset && act.dataset.attr && $("propsBody").contains(act) ? act.dataset.attr : null;
    const caret = focusAttr && act.selectionStart != null ? act.selectionStart : null;
    propsFor = hit.node.id;
    $("props").dataset.sig = sig;
    buildProps(hit.node, hit.parent);
    if (focusAttr) {
      const again = $("propsBody").querySelector(`[data-attr="${focusAttr}"]`);
      if (again) { again.focus(); if (caret != null && again.setSelectionRange) try { again.setSelectionRange(caret, caret); } catch { /* number inputs */ } }
    }
    if (first && pendingSay) { propsMsg(pendingSay); pendingSay = null; } else if (first) propsMsg(forking ? `Editing ${BP_LABEL[curBp()]} only. Changes show on the canvas as you type.` : "Changes show on the canvas as you type. Ctrl+Z (outside a field) undoes.");
  } else syncProps(hit.node);
}

function closeProps() { propsDismissed = state && state.selected; renderProps(); }

function logEntry(utt, res, source) {
  const li = el("li", res.ok === false ? "fail" : "");
  li.appendChild(el("div", "utt", utt));
  const meta = el("div", "meta");
  if (source === "voice") meta.appendChild(el("span", "chip", "voice"));
  if (source === "image") meta.appendChild(el("span", "chip image", "from image"));
  if (res.path) meta.appendChild(el("span", res.path === "model" ? "chip model" : "chip", res.path === "model" ? "local model" : res.path === "panel" ? "properties" : res.path));
  const secs = res.llm ? res.llm.reduce((s, x) => s + x.wall_s, 0).toFixed(1) + " s" : (res.ms !== undefined ? res.ms + " ms" : "");
  meta.appendChild(document.createTextNode([secs, res.say].filter(Boolean).join(" · ")));
  li.appendChild(meta);
  $("log").prepend(li);
}

function reveal(path) { return api("/api/reveal", { path }).then((r) => r.ok || toast(r.say)); }
function pathLine(label, path) {
  const d = el("div", "small");
  d.append(`${label} `);
  const b = el("button", "link", "open folder"); b.onclick = () => reveal(path);
  d.append(b, el("div", "path", path));
  return d;
}
function showSave(info) {
  const box = $("saveInfo"); box.replaceChildren();
  box.append(el("div", "", `${info.widgets} widgets written.`), pathLine("Form:", info.form_dir));
  if (info.warnings && info.warnings.length) box.append(el("div", "small", `Notes: ${info.warnings.join("; ")}`));
}
function showReact(info) {
  const box = $("reactInfo"); box.replaceChildren();
  box.append(el("div", "", `${info.forms} form(s), start ${info.start}, built in ${info.ms} ms. Open index.html from the folder.`), pathLine("App:", info.dir));
}

// ---------- commands ----------
function after(res, label, source) {
  state = res;
  logEntry(label, res, source);
  $("heard").textContent = res.say || "";
  if (res.save_info) { showSave(res.save_info); refreshStatus(); }
  if (res.ask_delete) openFormsDialog(res.ask_delete);
  if (res.skins_changed) api("/api/props-meta").then((m) => { meta = m; if (state) renderProps(); });
  render();
}

async function send(text, source = "typed", sttMs = null, refresh = true) {
  if (!text.trim() || busy) return;
  busy = true;
  $("heard").textContent = `“${text}” …`;
  setMic("busy", "Working…");
  try {
    const res = await api("/api/command", { text, source, stt_ms: sttMs, refresh });
    after(res, text, source);
    return res;
  } catch (e) {
    $("heard").textContent = `Error: ${e.message}`;
    return { ok: false, say: e.message };
  } finally {
    busy = false;
    setMic("", micIdle());
  }
}

// several lines run one after another; returns the lines that did not work. everyN: redraw the canvas only that often
async function sendLines(text, source = "typed", everyN = 1) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean), failed = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines.length > 1) $("micLabel").textContent = `Running ${i + 1} of ${lines.length}…`;
    const res = await send(lines[i], source, null, (i + 1) % everyN === 0 || i === lines.length - 1);
    if (!res || res.ok === false) failed.push(lines[i]);
  }
  return failed;
}

// ---------- image agent: the image is all it needs. It writes a prompt; the prompt runs like anything typed ----------
function agentSay(text, bad) { const st = $("agentStatus"); st.textContent = text; st.classList.toggle("bad", !!bad); }

async function runPrompt(text, label, review = true) {
  const steps = text.split(/\r?\n/).filter((l) => l.trim()).length;
  $("log").replaceChildren();
  agentSay(`${label}Building in ${steps} steps…`);
  const t = performance.now();
  const failed = await sendLines(text, "image", 12);
  const secs = ((performance.now() - t) / 1000).toFixed(0);
  const done = failed.length
    ? `${label}${steps - failed.length} of ${steps} steps worked in ${secs} s. The others are marked in History; fix them in the prompt and run it again.`
    : `${label}Built ${state ? state.form : "the form"} in ${secs} s, all ${steps} steps worked. Check it, then Save to Visualizer.`;
  agentSay(done, failed.length > 0);
  $("heard").textContent = done;
  state = await api("/api/select", { id: null }); render();   // the last step leaves a widget selected; show the whole form
  await agentCheck();
  if (review) agentReview();     // about a minute on CPU, and the form must not wait for it. Figma text is exact: no review
}

// what the form looks like at each breakpoint, from a real render
async function agentCheck() {
  const box = $("agentReport");
  box.hidden = false;
  box.replaceChildren(el("div", "muted", "Checking Desktop, Tablet and Mobile…"));
  const r = await api("/api/agent/check", {}).catch((e) => ({ ok: false, say: e.message }));
  box.replaceChildren();
  if (!r.ok) { box.append(el("div", "muted", r.say)); return; }
  state = await api("/api/state"); render();     // the check may have grown panels
  if (r.grown) box.append(el("div", "muted", `Fixed by the check: ${r.grown} panel${r.grown > 1 ? "s" : ""} grown so nothing spills.`));
  if (r.match != null) box.append(qualityRow(`Looks like the image (${r.match_width})`, `${r.match}%`, r.match < 85));
  if ((r.visualizer || []).length) {
    box.append(qualityRow("In Visualizer itself", `${r.visualizer.length} to fix`, true));
    r.visualizer.slice(0, 3).forEach((v) => box.append(el("div", "muted", v.say)));
  } else box.append(qualityRow("In Visualizer itself", "no known differences", false));
  Object.values(r.widths).sort((a, b) => ({ Desktop: 0, Tablet: 1, Mobile: 2 }[a.name] - { Desktop: 0, Tablet: 1, Mobile: 2 }[b.name])).forEach((w) => {
    const bits = [];
    if (w.clipped.length) bits.push(`${w.clipped.length} clipped`);
    if (w.overlaps.length) bits.push(`${w.overlaps.length} overlap${w.overlaps.length > 1 ? "s" : ""}`);
    if (w.offscreen.length || w.overflow) bits.push("off screen");
    if (w.spills.length) bits.push(`${w.spills.length} spilling`);
    if ((w.covered || []).length) bits.push(`${w.covered.length} covered`);
    box.append(qualityRow(w.name, bits.join(", ") || "clean", bits.length > 0));
  });
}
function qualityRow(label, value, warn) {
  const row = el("div", "q"), v = el("b", warn ? "warn" : "", value);
  row.append(el("span", "", label), v);
  return row;
}
async function agentReview() {
  const line = el("div", "muted", "The local model is reading the text (about a minute). You can keep working.");
  $("agentReport").append(line);
  const r = await api("/api/agent/review", {}).catch((e) => ({ ok: false, say: e.message }));
  line.textContent = r.seconds != null ? `${r.say} (${r.seconds} s)` : r.say;
  if (r.fixed) { state = r; render(); $("agentPrompt").value = applyFixes($("agentPrompt").value, r.changes); }
}
const applyFixes = (prompt, changes) => changes.reduce((text, c) => text.split(`"${c.from}"`).join(`"${c.to}"`), prompt);

// ---------- screenshot slots: desktop, tablet, mobile. Any of them; the widest builds the form ----------
const SLOT_ORDER = ["desktop", "tablet", "mobile"];
const SLOT_NAME = { desktop: "Desktop", tablet: "Tablet", mobile: "Mobile" };
const slotFiles = {};
const slotEl = (slot) => document.querySelector(`.slot[data-slot="${slot}"]`);
let slotTarget = null;      // which slot the file picker fills

const slotFigma = {};       // slot -> a Figma frame {id, name, section, bp, w, h, key}
const figmaFiles = {};      // file key -> its frames; each size can come from its own file

function setSlot(slot, file) {
  const box = slotEl(slot), img = box.querySelector("img");
  if (img.src.startsWith("blob:")) URL.revokeObjectURL(img.src);
  delete slotFigma[slot];
  box.querySelector(".slot-frame").value = "";
  box.classList.remove("figma");
  if (file) { slotFiles[slot] = file; img.src = URL.createObjectURL(file); } else { delete slotFiles[slot]; img.removeAttribute("src"); }
  img.hidden = !file;
  box.querySelector(".slot-plus").textContent = "+";
  box.querySelector(".slot-plus").hidden = !!file;
  box.querySelector(".slot-clear").hidden = !file;
  box.classList.toggle("filled", !!file);
  box.querySelector(".slot-pick").setAttribute("aria-label", `${file ? "Replace" : "Choose"} the ${slot} screenshot`);
  box.title = file ? file.name || "" : "";
  slotsChanged();
}

// a Figma frame in a slot: its thumbnail, rendered by Figma
function setFigmaSlot(slot, frame) {
  if (!frame) { setSlot(slot, null); return; }
  setSlot(slot, null);
  const box = slotEl(slot), img = box.querySelector("img");
  slotFigma[slot] = frame;
  img.onerror = () => { img.hidden = true; box.querySelector(".slot-plus").hidden = false; box.querySelector(".slot-plus").textContent = "F"; };
  box.querySelector(".slot-plus").textContent = "+";
  img.src = `/api/figma/thumb?key=${encodeURIComponent(frame.key)}&id=${encodeURIComponent(frame.id)}`;
  fillPicker(slot, frame.key);
  img.hidden = false;
  box.querySelector(".slot-plus").hidden = true;
  box.querySelector(".slot-clear").hidden = false;
  box.querySelector(".slot-frame").value = frame.id;
  box.classList.add("filled", "figma");
  box.title = `${frame.section ? frame.section + " / " : ""}${frame.name} (${frame.w}×${frame.h})`;
  slotsChanged();
}

function slotsChanged() {
  $("agentBuild").disabled = !Object.keys(slotFiles).length && !Object.keys(slotFigma).length;
}

async function askFigmaToken(replace = false) {
  const tok = await ask({
    title: replace ? "Use another Figma token" : "Figma token",
    text: (replace ? "Figma has paused the current token. A token from another account, or from a paid Figma seat, works straight away. " : "")
      + "Paste a Figma personal access token (Figma > Settings > Security > Personal access tokens, read-only file content). It is checked with Figma and kept on this computer only.",
    value: "", okLabel: "Save", secret: true,
    check: (v) => (v.trim().length < 20 ? { error: "Paste the whole token." } : {}),
  });
  if (!tok) return false;
  const r = await api("/api/figma/token", { token: tok }).catch((e) => ({ ok: false, say: e.message }));
  toast(r.say);
  return !!r.ok;
}

// Figma paused the token: a way to use another one, under the link box
function showTokenSwap(left) {
  const info = $("figmaInfo");
  info.hidden = false;
  info.replaceChildren(el("span", "", `Figma has paused this token (${left} left). Saved frames still build; new icons wait. `), tokenSwapButton());
}
function tokenSwapButton() {
  const b = el("button", "link", "Use another token…");
  b.type = "button";
  b.onclick = async () => { if (await askFigmaToken(true)) $("figmaInfo").replaceChildren(el("span", "", "New token saved. Press Load again.")); };
  return b;
}

// a slot's frame picker: the frames of the file its frame comes from
function fillPicker(slot, key) {
  const sel = slotEl(slot).querySelector(".slot-frame");
  if (sel.dataset.key !== key) {
    const frames = figmaFiles[key] || [];
    const sections = [...new Set(frames.map((f) => f.section || f.page))];
    sel.replaceChildren(new Option("No frame", ""));
    for (const sec of sections) {
      const group = document.createElement("optgroup");
      group.label = sec || "Frames";
      frames.filter((f) => (f.section || f.page) === sec).forEach((f) => group.append(new Option(`${f.name} (${f.w}×${f.h})`, f.id)));
      sel.append(group);
    }
    sel.dataset.key = key;
  }
  sel.hidden = false;
}

const figmaLinkOf = (slot) => document.querySelector(`[data-figma="${slot}"]`);

// the three links: each size takes the frame its own link points to; a size left empty is looked for in the file of the
// first link given (the same screen by name, else by position in its section)
async function loadFigmaLinks() {
  const given = SLOT_ORDER.filter((s) => figmaLinkOf(s).value.trim());
  SLOT_ORDER.forEach((s) => figmaLinkOf(s).classList.remove("bad"));
  if (!given.length) { toast("Paste a Figma link for at least one size."); figmaLinkOf("desktop").focus(); return; }
  const st = await api("/api/figma/status").catch(() => ({ token: false }));
  if (!st.token && !(await askFigmaToken())) { agentSay("Figma needs a token to read the file.", true); return; }
  if (st.blocked_for) toast(`Figma has paused this token for ${st.blocked_text}. Frames already read still load and build.`);
  agentSay(`Reading ${given.length > 1 ? "the Figma files" : "the Figma file"}…`);
  $("figmaLoad").disabled = true;
  const notes = [], answers = {};
  for (const slot of given) {
    const r = await api("/api/figma/frames", { link: figmaLinkOf(slot).value.trim() }).catch((e) => ({ ok: false, say: e.message }));
    if (!r.ok) { figmaLinkOf(slot).classList.add("bad"); notes.push(`${SLOT_NAME[slot]}: ${r.say}`); continue; }
    figmaFiles[r.key] = r.frames;
    answers[slot] = r;
    const frame = r.frames.find((f) => f.id === r.linked);
    if (frame) {
      setFigmaSlot(slot, { ...frame, key: r.key });
      if (frame.bp !== slot) notes.push(`${SLOT_NAME[slot]} link is a ${frame.w}px frame (${frame.name}); it is used for ${SLOT_NAME[slot]} as given.`);
    } else {
      setFigmaSlot(slot, null);
      fillPicker(slot, r.key);
      notes.push(`${SLOT_NAME[slot]}: the link is a page or section, not one frame; pick its frame below.`);
    }
  }
  $("figmaLoad").disabled = false;
  const first = given.map((s) => answers[s]).find(Boolean);
  for (const slot of SLOT_ORDER) {
    if (given.includes(slot) || !first) continue;
    const id = (first.picked || {})[slot];
    const frame = first.frames.find((f) => f.id === id);
    setFigmaSlot(slot, frame ? { ...frame, key: first.key } : null);
    if (!frame) fillPicker(slot, first.key);
    else notes.push(`${SLOT_NAME[slot]}: found ${frame.name}${(first.guessed || []).includes(slot) ? " by position, check it" : ""}.`);
  }
  const info = $("figmaInfo");
  info.hidden = false;
  const paused = st.blocked_for ? `Figma has paused this token (${st.blocked_text} left): saved frames still build. ` : "";
  info.textContent = paused + (notes.join(" ") || SLOT_ORDER.filter((s) => slotFigma[s]).map((s) => `${SLOT_NAME[s]}: ${slotFigma[s].name}`).join(" · "));
  if (st.blocked_for) info.append(" ", tokenSwapButton());
  const chosen = SLOT_ORDER.filter((s) => slotFigma[s]);
  agentSay(chosen.length ? "Check the frames under each size, then press Build form." : "Pick a frame under Desktop, Tablet or Mobile, then press Build form.", !chosen.length && !!notes.length);
}

// (one link for all three sizes, kept for drops and older callers)
async function loadFigma(link) {
  if (!link) { toast("Paste a Figma link first."); return; }
  const st = await api("/api/figma/status").catch(() => ({ token: false }));
  if (!st.token && !(await askFigmaToken())) { agentSay("Figma needs a token to read the file.", true); return; }
  if (st.blocked_for) {
    toast(`Figma has paused this token for ${st.blocked_text}. Frames already read still load and build.`);
    showTokenSwap(st.blocked_text);
  }
  agentSay("Reading the Figma file…");
  $("figmaLoad").disabled = true;
  const r = await api("/api/figma/frames", { link }).catch((e) => ({ ok: false, say: e.message }));
  $("figmaLoad").disabled = false;
  if (!r.ok) { agentSay(r.say, true); return; }
  figmaFiles[r.key] = r.frames;
  SLOT_ORDER.forEach((slot) => {
    const frame = r.frames.find((f) => f.id === (r.picked || {})[slot]);
    setFigmaSlot(slot, frame ? { ...frame, key: r.key } : null);
    if (!frame) fillPicker(slot, r.key);
  });
  const chosen = SLOT_ORDER.filter((s) => slotFigma[s]);
  const info = $("figmaInfo");
  info.hidden = false;
  const paused = st.blocked_for ? ` Figma has paused this token (${st.blocked_text} left): saved frames still build.` : "";
  info.textContent = `${r.frames.length} frames in the file.${paused} ` + (chosen.length
    ? chosen.map((s) => `${SLOT_NAME[s]}: ${slotFigma[s].name}${(r.guessed || []).includes(s) ? " (found by position; check it)" : ""}`).join(" · ")
    : "The link is not one frame: pick a frame under each size.");
  if (st.blocked_for) info.append(" ", tokenSwapButton());
  agentSay(chosen.length ? "Check the frames under each size, then press Build form." : "Pick a frame under Desktop, Tablet or Mobile, then press Build form.");
}

function imageSize(file) {
  return new Promise((resolve) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => { resolve([img.naturalWidth, img.naturalHeight]); URL.revokeObjectURL(url); };
    img.onerror = () => { resolve([0, 0]); URL.revokeObjectURL(url); };
    img.src = url;
  });
}

// an image dropped or pasted anywhere, or picked with "From image…": a tall one is a phone screen; others fill the
// first free of desktop and tablet. A slot it is dropped on says it outright.
async function addImage(file, slot) {
  if (!file || !file.type.startsWith("image/")) { toast("That is not an image. Use a PNG or JPG screenshot."); return; }
  if (!slot) {
    const [w, h] = await imageSize(file);
    slot = h > w * 1.3 ? "mobile" : !slotFiles.desktop ? "desktop" : !slotFiles.tablet ? "tablet" : "desktop";
  }
  setSlot(slot, file);
  $("agent").hidden = false;
  const have = SLOT_ORDER.filter((s) => slotFiles[s]).map((s) => SLOT_NAME[s]);
  const missing = SLOT_ORDER.filter((s) => !slotFiles[s]).map((s) => SLOT_NAME[s].toLowerCase());
  agentSay(`${have.join(", ")} ready. ${missing.length ? `Add the ${missing.join(" or ")} screenshot if you have it, or press Build form.` : "Press Build form."}`);
  $("agentBuild").focus();
}

const asDataUrl = (file) => new Promise((resolve, reject) => {
  const r = new FileReader();
  r.onload = () => resolve(r.result);
  r.onerror = () => reject(r.error);
  r.readAsDataURL(file);
});

// what the narrower screenshots set, in words
function showSeen(observed, source = "screenshot") {
  const box = $("agentSeen");
  box.replaceChildren();
  const bps = Object.keys(observed || {});
  box.hidden = !bps.length;
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  bps.forEach((bp) => {
    const o = observed[bp], bits = [];
    if (o.stack) bits.push(`${plural(o.stack, "row stacks", "rows stack")}`);
    if (o.row) bits.push(`${plural(o.row, "row stays", "rows stay")} side by side`);
    if (o.hidden.length) bits.push(`hidden: ${o.hidden.slice(0, 4).join(", ")}${o.hidden.length > 4 ? "…" : ""}`);
    if (o.sizes) bits.push(`${plural(o.sizes, "text resized", "texts resized")}`);
    if (o.full) bits.push(`${plural(o.full, "button or field", "buttons and fields")} full width`);
    const row = el("div", "seen");
    row.append(el("b", "", `${SLOT_NAME[bp]} from your ${source}: `), document.createTextNode(`${bits.join("; ") || "same as the design"}. Matched ${o.matched} of ${o.of} texts.`));
    box.append(row);
    if ((o.reworded || []).length) box.append(el("div", "muted", `Worded differently in the ${bp} ${source}, kept with the wider screen's words: ${o.reworded.slice(0, 3).join("; ")}.`));
    if ((o.moved || []).length) box.append(el("div", "muted", `Shown in another place in the ${bp} ${source}; Visualizer cannot move a widget, so its section hides: ${o.moved.slice(0, 3).map((t) => `“${t}”`).join(", ")}.`));
    if (o.only_here.length) box.append(el("div", "muted", `Only in the ${bp} ${source}, not added: ${o.only_here.slice(0, 3).map((t) => `“${t}”`).join(", ")}.`));
    if (o.order.length) box.append(el("div", "muted", `The ${bp} ${source} shows ${o.order.join(", ")} in another order; Visualizer keeps one order, so it stays as on the wider screen.`));
  });
}

async function buildFromSlots() {
  if (SLOT_ORDER.some((s) => slotFigma[s])) return buildFromFigma();
  const slots = SLOT_ORDER.filter((s) => slotFiles[s]);
  if (!slots.length) { toast("Add at least one screenshot."); return; }
  if (busy) { toast("Wait for the current command to finish."); return; }
  $("agent").hidden = false;
  $("agentBody").hidden = true;
  $("agentReport").hidden = true;
  $("agentSeen").hidden = true;
  const names = slots.map((s) => SLOT_NAME[s].toLowerCase());
  agentSay(`Reading the ${names.join(", ")} screenshot${slots.length > 1 ? "s" : ""} on this machine. About ${15 * slots.length} s…`);
  busy = true;
  $("agentBuild").disabled = true;
  setMic("busy", "Reading the screenshots…");
  let res;
  try {
    const images = {};
    for (const s of slots) images[s] = await asDataUrl(slotFiles[s]);
    const r = await fetch("/api/agent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ images, filename: slotFiles[slots[0]].name || "" }) });
    res = await r.json();
  } catch (e) {
    res = { ok: false, say: `Could not read the screenshots: ${e.message}` };
  } finally {
    busy = false;
    $("agentBuild").disabled = false;
    setMic("", micIdle());
  }
  if (!res.ok) { agentSay(res.say, true); toast(res.say); return; }
  if (res.warn) toast(res.warn);
  $("agentBody").hidden = false;
  $("agentPrompt").value = res.lines.join("\n");
  showSeen(res.observed);
  const k = res.kinds || {};
  const count = (n, one) => (n ? `${n} ${one}${n === 1 ? "" : "s"}` : "");
  const what = [count(k.flex, "container"), count(k.label, "label"), count(k.button, "button"), count(k["text"], "input"), count(k.skin, "new skin")].filter(Boolean).join(", ");
  await runPrompt(res.lines.join("\n"), `Read in ${res.seconds} s, built at ${SLOT_NAME[slots[0]]} size: ${what}. `);
  refreshStatus();
}

// Figma frames: their real layers, so nothing is read from pixels
async function buildFromFigma() {
  const slots = SLOT_ORDER.filter((s) => slotFigma[s]);
  if (busy) { toast("Wait for the current command to finish."); return; }
  if (SLOT_ORDER.some((s) => slotFiles[s])) toast("Screenshots are left out: the Figma frames are exact.");
  $("agentBody").hidden = true;
  $("agentReport").hidden = true;
  $("agentSeen").hidden = true;
  agentSay(`Reading ${slots.length} Figma frame${slots.length > 1 ? "s" : ""}: layers, styles and icons…`);
  busy = true;
  $("agentBuild").disabled = true;
  setMic("busy", "Reading Figma…");
  let res;
  try {
    const links = Object.fromEntries(slots.map((s) => [s, `https://www.figma.com/design/${slotFigma[s].key}/f?node-id=${slotFigma[s].id.replace(":", "-")}`]));
    res = await api("/api/figma/build", { links });
  } catch (e) {
    res = { ok: false, say: `Could not read Figma: ${e.message}` };
  } finally {
    busy = false;
    $("agentBuild").disabled = false;
    setMic("", micIdle());
  }
  if (!res.ok) { agentSay(res.say, true); toast(res.say); return; }
  if (res.warn) toast(res.warn);
  $("agentBody").hidden = false;
  $("agentPrompt").value = res.lines.join("\n");
  showSeen(res.observed, "Figma frame");
  const k = res.kinds || {};
  const count = (n, one) => (n ? `${n} ${one}${n === 1 ? "" : "s"}` : "");
  const what = [count(k.flex, "container"), count(k.label, "label"), count(k.button, "button"), count(k["text"], "input"), count(k.image, "image"), count(k.skin, "new skin")].filter(Boolean).join(", ");
  await runPrompt(res.lines.join("\n"), `Read from Figma in ${res.seconds} s (${slotFigma[slots[0]].name}, ${res.width}px): ${what}. `, false);
  refreshStatus();
}

async function save() {
  const res = await api("/api/save", {});
  after(res, "save");
  if (res.ok) { toast(res.say); showTab("out"); }
}

async function exportReact(scope) {
  toast("Building the React app…");
  const res = await api("/api/export-react", { scope });
  logEntry(`export React (${scope === "form" ? "this form" : "whole project"})`, res);
  $("heard").textContent = res.say;
  if (res.react_info) { showReact(res.react_info); showTab("out"); }
  toast(res.say);
}

// ---------- microphone: 16 kHz mono WAV recorded here, transcribed locally by Whisper ----------
let recorder = null;
const micIdle = () => (sttReady ? "Click or hold Space to talk" : "Mic off: type below");
function setMic(m, label) {
  const b = $("mic");
  b.classList.toggle("recording", m === "recording");
  b.classList.toggle("busy", m === "busy");
  b.setAttribute("aria-pressed", m === "recording");
  $("micLabel").textContent = label;
}

async function startRecording() {
  if (recorder || busy) return;
  if (!sttReady) { $("heard").textContent = "Local speech-to-text is not installed. Type the command below."; return; }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } });
  const ctx = new AudioContext();
  const src = ctx.createMediaStreamSource(stream);
  const node = ctx.createScriptProcessor(4096, 1, 1);
  const chunks = [];
  node.onaudioprocess = (ev) => chunks.push(new Float32Array(ev.inputBuffer.getChannelData(0)));
  src.connect(node); node.connect(ctx.destination);
  recorder = { stream, ctx, node, chunks };
  setMic("recording", "Listening… click or release Space to stop");
}

async function stopRecording() {
  if (!recorder) return;
  const { stream, ctx, node, chunks } = recorder;
  recorder = null;
  node.disconnect();
  stream.getTracks().forEach((t) => t.stop());
  const rate = ctx.sampleRate;
  await ctx.close();
  setMic("busy", "Transcribing…");
  try {
    const { text, ms } = await api("/api/transcribe", toWav(chunks, rate, 16000), true);
    if (!text) { $("heard").textContent = "I did not catch that."; setMic("", micIdle()); return; }
    await send(text, "voice", ms);
  } catch (e) {
    $("heard").textContent = `Error: ${e.message}`;
    setMic("", micIdle());
  }
}

function toWav(chunks, fromRate, toRate) {
  const total = chunks.reduce((s, c) => s + c.length, 0);
  const input = new Float32Array(total);
  let o = 0;
  for (const c of chunks) { input.set(c, o); o += c.length; }
  const ratio = fromRate / toRate, n = Math.floor(total / ratio);
  const pcm = new Int16Array(n);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, input[Math.floor(i * ratio)]));
    pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  const buf = new ArrayBuffer(44 + pcm.length * 2), v = new DataView(buf);
  const str = (off, s) => [...s].forEach((ch, i) => v.setUint8(off + i, ch.charCodeAt(0)));
  str(0, "RIFF"); v.setUint32(4, 36 + pcm.length * 2, true); str(8, "WAVE"); str(12, "fmt ");
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, toRate, true);
  v.setUint32(28, toRate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); str(36, "data");
  v.setUint32(40, pcm.length * 2, true);
  new Int16Array(buf, 44).set(pcm);
  return new Blob([buf], { type: "audio/wav" });
}

// ---------- wiring ----------
let spaceDown = false;
const typing = () => ["TEXTAREA", "INPUT", "SELECT"].includes(document.activeElement && document.activeElement.tagName);
function onKeyDown(e) {
  if (e.key === "Escape" && $("props").classList.contains("open")) { e.preventDefault(); closeProps(); return; }
  if (e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown") && !typing()) { e.preventDefault(); nudgeSelected(e.key === "ArrowUp" ? -1 : 1); return; }
  if (e.code === "Space" && !spaceDown && !typing() && !e.repeat) { spaceDown = true; e.preventDefault(); startRecording(); }
  else if (e.ctrlKey && e.key.toLowerCase() === "s") { e.preventDefault(); save(); }
  else if (e.ctrlKey && e.key.toLowerCase() === "z" && !typing()) { e.preventDefault(); $("btnUndo").click(); }
}
function onKeyUp(e) {
  if (e.code === "Space" && spaceDown) { spaceDown = false; e.preventDefault(); stopRecording(); }
}
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

$("mic").addEventListener("click", () => (recorder ? stopRecording() : startRecording()));
$("typed").addEventListener("submit", (e) => { e.preventDefault(); const t = $("cmd").value; $("cmd").value = ""; sendLines(t); });
$("cmd").addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("typed").requestSubmit(); } });
$("hintList").addEventListener("click", (e) => { if (e.target.tagName === "LI" && !e.target.textContent.includes("·")) { $("cmd").value = e.target.textContent; $("cmd").focus(); } });
$("btnUndo").addEventListener("click", async () => after(await api("/api/undo", {}), "undo"));
$("btnSave").addEventListener("click", save);
$("btnReact").addEventListener("click", () => exportReact("form"));
$("btnReactForm").addEventListener("click", () => exportReact("form"));
$("btnReactAll").addEventListener("click", () => exportReact("project"));
$("btnImage").addEventListener("click", () => {
  const opened = $("agent").hidden;
  $("agent").hidden = false;
  if (opened && !Object.keys(slotFiles).length) agentSay("Add a desktop, tablet or mobile screenshot: click a box, drop an image on it, or paste one.");
  slotEl(SLOT_ORDER.find((s) => !slotFiles[s]) || "desktop").querySelector(".slot-pick").focus();
});
$("imgFile").addEventListener("change", (e) => { const f = e.target.files[0]; e.target.value = ""; if (f) addImage(f, slotTarget); });
$("agentBuild").addEventListener("click", buildFromSlots);
$("figmaForm").addEventListener("submit", (e) => { e.preventDefault(); loadFigmaLinks(); });
document.querySelectorAll(".slot-frame").forEach((sel) => sel.addEventListener("change", () => {
  const slot = sel.closest(".slot").dataset.slot;
  const key = sel.dataset.key, frame = key && (figmaFiles[key] || []).find((f) => f.id === sel.value);
  setFigmaSlot(slot, frame ? { ...frame, key } : null);
  if (!frame) fillPicker(slot, key);
}));
document.querySelectorAll(".slot").forEach((box) => {
  const slot = box.dataset.slot;
  box.querySelector(".slot-pick").addEventListener("click", () => { slotTarget = slot; $("imgFile").click(); });
  box.querySelector(".slot-clear").addEventListener("click", () => { setSlot(slot, null); agentSay(`${SLOT_NAME[slot]} screenshot removed.`); });
});
// a drag shows the overlay over everything (the canvas iframe would swallow the drop); its three targets pick the slot
const overSlot = (e) => (e.target instanceof Element ? e.target.closest(".drop-slot") : null);
const lightSlot = (target) => document.querySelectorAll(".drop-slot").forEach((d) => d.classList.toggle("over", d === target));
$("agentClose").addEventListener("click", () => { $("agent").hidden = true; });
$("agentRun").addEventListener("click", () => { if (!busy && $("agentPrompt").value.trim()) runPrompt($("agentPrompt").value, ""); });
$("agentCopy").addEventListener("click", () => navigator.clipboard.writeText($("agentPrompt").value).then(() => toast("Prompt copied."), () => toast("Could not copy: select the text and press Ctrl+C.")));
// an image dropped anywhere on the window (without this, Electron would open the dropped file in place of the app)
const filesDrag = (e) => e.dataTransfer && [...e.dataTransfer.types].includes("Files");
document.addEventListener("dragenter", (e) => { if (filesDrag(e)) { e.preventDefault(); $("dropZone").hidden = false; } });
document.addEventListener("dragover", (e) => { if (filesDrag(e)) { e.preventDefault(); e.dataTransfer.dropEffect = "copy"; lightSlot(overSlot(e)); } });
document.addEventListener("dragleave", (e) => { if (filesDrag(e) && !e.relatedTarget) { $("dropZone").hidden = true; lightSlot(null); } });
document.addEventListener("drop", (e) => {
  if (!filesDrag(e)) return;
  e.preventDefault();
  const target = overSlot(e);
  $("dropZone").hidden = true;
  lightSlot(null);
  addImage(e.dataTransfer.files[0], target ? target.dataset.slot : null);
});
// Ctrl+V of an image (Figma "Copy as PNG", Win+Shift+S snips); text still pastes into the command box as before
document.addEventListener("paste", (e) => {
  const item = [...(e.clipboardData ? e.clipboardData.items : [])].find((i) => i.kind === "file" && i.type.startsWith("image/"));
  if (!item) return;
  e.preventDefault();
  addImage(item.getAsFile());
});
// ---------- in-app dialog: Electron does not implement window.prompt, and confirm() blocks the page ----------
// ask({title, text, value?, okLabel?, danger?, check?(value) -> {error?, hint?, value?}}) -> value (or true) | null
function ask({ title, text = "", value = null, okLabel = "OK", danger = false, check = null, secret = false }) {
  const dlg = $("dlg"), input = $("dlgInput"), hint = $("dlgHint"), ok = $("dlgOk");
  input.type = secret ? "password" : "text";
  input.autocomplete = "off";
  $("dlgTitle").textContent = title;
  $("dlgText").textContent = text;
  input.hidden = value === null;
  input.value = value ?? "";
  ok.textContent = okLabel;
  ok.classList.toggle("danger-ok", danger);
  hint.textContent = ""; hint.classList.remove("bad"); input.classList.remove("bad");
  const verdict = () => (check ? check(input.value) : {});
  const show = () => {
    const v = verdict();
    hint.textContent = v.error || v.hint || "";
    hint.classList.toggle("bad", !!v.error);
    input.classList.toggle("bad", !!v.error);
    ok.disabled = !!v.error;
  };
  input.oninput = show;
  if (value !== null) show();
  return new Promise((resolve) => {
    const done = (res) => { dlg.close(); $("dlgForm").onsubmit = null; $("dlgCancel").onclick = null; dlg.oncancel = null; resolve(res); };
    $("dlgForm").onsubmit = (e) => {
      e.preventDefault();
      if (value === null) return done(true);
      const v = verdict();
      if (!v.error) done(v.value ?? input.value.trim());
    };
    $("dlgCancel").onclick = () => done(null);
    dlg.oncancel = (e) => { e.preventDefault(); done(null); };   // Esc
    dlg.showModal();
    if (value !== null) { input.focus(); input.select(); } else ok.focus();
  });
}

// "login voice", "Login", "frmLogin voice" -> frmLoginVoice; an id typed Visualizer-style stays as it is
function formId(text) {
  const t = text.trim();
  if (/^frm[A-Z0-9]\w*$/.test(t)) return t;
  const words = (t.match(/[A-Za-z0-9]+/g) || []).filter((w, i) => !(i === 0 && w.toLowerCase() === "frm"));
  if (!words.length) return "";
  const id = "frm" + words.map((w) => w[0].toUpperCase() + w.slice(1)).join("");
  return /^frm[A-Za-z0-9]+$/.test(id) ? id : "";
}

$("btnNew").addEventListener("click", async () => {
  const name = await ask({
    title: "New form", text: "Name the form. Words are turned into a Visualizer id: “open account” → frmOpenAccount.",
    value: "frmNewForm", okLabel: "Create form",
    check: (v) => {
      const id = formId(v);
      if (!id) return { error: "Use letters and digits, e.g. frmOpenAccount or “open account”." };
      if (status && status.forms.includes(id) && !status.saved.includes(id)) {
        return { value: id, hint: `${id} already exists in ${status.project_name}. You can design it here, but Save will not overwrite it: pick another name to save.` };
      }
      if (status && status.saved.includes(id)) return { value: id, hint: `${id} was saved before: this starts it again from empty (use “Open saved…” to continue it).` };
      return { value: id, hint: `Form id: ${id}` };
    },
  });
  if (!name) return;
  const res = await api("/api/new", { id: name });
  $("log").replaceChildren();
  after(res, `new form ${name}`);
});
// ---------- delete a form: only ones made here; goes to the trash; said or typed, it still stops at this dialog ----------
async function openFormsDialog(wanted) {
  if ($("formsDlg").open) return;
  const info = await api("/api/forms");
  const pick = $("formsPick"), warn = $("formsWarn"), ok = $("formsOk"), dlg = $("formsDlg");
  const fill = (select, items) => { select.replaceChildren(...items.map(([value, label]) => { const o = el("option", "", label); o.value = value; return o; })); };
  const items = info.saved.map((f) => [f, f === info.current ? `${f} (open now)` : f]);
  if (!info.current_saved) items.unshift([info.current, `${info.current} (open now, never saved)`]);
  fill(pick, items);
  const refused = wanted && !items.some(([f]) => f === wanted);
  pick.value = wanted && !refused ? wanted : info.current;
  if (!pick.value && items.length) pick.value = items[0][0];
  const describe = async () => {
    const id = pick.value;
    ok.disabled = !id;
    warn.classList.remove("bad");
    if (!id) { warn.textContent = "There are no forms to delete."; return; }
    if (!info.saved.includes(id)) { warn.textContent = "This form was never saved, so this just clears it and starts a new one."; return; }
    // the scan takes a couple of seconds: the dialog is already up, and Delete waits for the answer
    ok.disabled = true;
    warn.textContent = "Checking whether anything else in the project uses it…";
    const check = await api(`/api/forms?id=${encodeURIComponent(id)}`);
    if (pick.value !== id) return;      // another form was picked meanwhile
    ok.disabled = false;
    if (check.references.length) {
      const many = check.references.length > 1;
      warn.textContent = `Warning: ${check.references.length} other file${many ? "s" : ""} in the project name${many ? "" : "s"} this form, so ${many ? "they" : "it"} would point at nothing: ${check.references.slice(0, 3).join(", ")}${check.references.length > 3 ? ", …" : ""}`;
      warn.classList.add("bad");
    } else {
      warn.textContent = id === info.current ? "It is open now: a new empty form starts in its place." : "Nothing else in the project uses it.";
    }
  };
  pick.onchange = describe;
  const first = describe();
  if (refused) first.then(() => { warn.textContent = `${wanted} isn't listed: it came with the project or doesn't exist, so Saywright won't delete it.`; warn.classList.add("bad"); });
  $("formsTrash").hidden = !info.trash.length;
  fill($("formsTrashPick"), info.trash.map((t) => [t.trash, `${t.form} (${t.deleted.slice(0, 4)}-${t.deleted.slice(4, 6)}-${t.deleted.slice(6, 8)} ${t.deleted.slice(9, 11)}:${t.deleted.slice(11, 13)})`]));
  const close = () => { dlg.close(); $("formsForm").onsubmit = null; $("formsCancel").onclick = null; $("formsRestore").onclick = null; };
  $("formsCancel").onclick = close;
  $("formsRestore").onclick = async () => {
    const res = await api("/api/forms/restore", { trash: $("formsTrashPick").value });
    close();
    state = res; render(); refreshStatus();
    $("heard").textContent = res.say; toast(res.say);
  };
  $("formsForm").onsubmit = async (e) => {
    e.preventDefault();
    const res = await api("/api/forms/delete", { id: pick.value });
    close();
    if (res.current_deleted) { $("log").replaceChildren(); propsDismissed = null; }
    logEntry(`delete form ${pick.value}`, res);
    state = res; render(); refreshStatus();
    $("heard").textContent = res.say; toast(res.say);
  };
  dlg.showModal();
  $("formsCancel").focus();      // not the delete button: Enter or Space alone must not delete
}
$("btnDeleteForm").addEventListener("click", () => openFormsDialog());
$("openForm").addEventListener("change", async (e) => {
  const id = e.target.value; e.target.value = "";
  if (!id) return;
  $("log").replaceChildren();
  after(await api("/api/open", { id }), `open ${id}`);
});
$("tree").addEventListener("click", async (e) => {
  const t = e.target.closest("[data-id]");
  if (t) { propsDismissed = null; state = await api("/api/select", { id: t.dataset.id }); render(); }
});
$("propsBack").addEventListener("click", closeProps);
function showTab(name) {
  document.querySelectorAll(".tab").forEach((x) => x.classList.toggle("on", x.dataset.tab === name));
  document.querySelectorAll("[data-pane]").forEach((p) => { p.hidden = p.dataset.pane !== name; });
}
document.querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
document.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => {
  mode = b.dataset.mode;
  document.querySelectorAll("[data-mode]").forEach((x) => x.classList.toggle("on", x === b));
  shownVersion = -1;            // Play starts the form fresh (lifecycle runs again); Design reloads clean too
  loadCanvas();
}));
document.querySelectorAll("[data-w]").forEach((b) => b.addEventListener("click", () => {
  width = +b.dataset.w;
  document.querySelectorAll("[data-w]").forEach((x) => x.classList.toggle("on", x === b));
  showBp();
  fit();
  // the form picks its breakpoint on resize: make sure it hears about the new width straight away
  try { $("frame").contentWindow.dispatchEvent(new Event("resize")); } catch { /* not loaded yet */ }
  setTimeout(drawRulers, 150);   // the form re-lays out for the new breakpoint; move the selection band with it
  if (state) renderProps();
}));
new ResizeObserver(fit).observe($("stage"));

async function refreshStatus() {
  status = await api("/api/status");
  const sel = $("openForm");
  sel.replaceChildren(el("option", "", status.saved.length ? "Open saved…" : "No saved forms yet"));
  sel.firstChild.value = "";
  status.saved.forEach((f) => { const o = el("option", "", f); o.value = f; sel.appendChild(o); });
}

(async function init() {
  await refreshStatus();
  meta = await api("/api/props-meta");
  sttReady = status.stt;
  const pill = (id, text, on, title) => { const p = $(id); p.textContent = text; p.className = "pill " + (on ? "on" : "off"); if (title) p.title = title; };
  pill("pillProject", status.project_name, true, `Saves into ${status.project}`);
  pill("pillStt", sttReady ? `Whisper ${status.stt_model}` : "Mic off", sttReady);
  pill("pillModel", status.model + (status.ollama ? "" : " (Ollama off)"), status.ollama);
  setMic("", micIdle());
  showBp();
  fit();
  state = await api("/api/state");
  render();
})();
