// React components for Visualizer widgets, Kony layout as CSS, and the form host that runs the original
// controller lifecycle (onNavigate -> init -> preShow -> render -> postShow, onBreakpointChange).
//
// Layout, as the Visualizer runtime does it (rules verified for react2viz / Retrofit Studio):
//   free layout (2)      children placed by left/right/top/bottom/centerX/centerY; here a one-cell CSS grid,
//                        so offsets are margins and an auto-height container still grows to its tallest child
//   vertical flow (4)    top = space before the child; flex column
//   horizontal flow (3)  left = space before the child; flex row
//   responsiveData.bN    width <= 640 -> b3, <= 1024 -> b2, <= 1366 -> b1, wider -> base values
import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { FormModel, fromSm, mapProps } from "./model.js";
import { app, kony, currentBreakpoint, guard, isStub, ControllerBase } from "./kony.js";

const Ctx = createContext(null);
const LAYOUT = { 2: "free", 3: "hflow", 4: "vflow", 5: "free" };
const CONTAINERS = new Set(["Form", "FlexContainer", "FlexScrollContainer"]);
const DEF_W = { FlexContainer: "100%", FlexScrollContainer: "100%", Segment: "100%", UserWidgetInstance: "100%", TextField: "260dp", TextArea: "260dp", ListBox: "260dp", Calendar: "200dp" };
const DEF_H = { TextField: "40dp", ListBox: "40dp", TextArea: "120dp", Calendar: "40dp" };
const ALIGN = { 1: ["flex-start", "flex-start", "left"], 2: ["flex-start", "center", "center"], 3: ["flex-start", "flex-end", "right"],
  4: ["center", "flex-start", "left"], 5: ["center", "center", "center"], 6: ["center", "flex-end", "right"],
  7: ["flex-end", "flex-start", "left"], 8: ["flex-end", "center", "center"], 9: ["flex-end", "flex-end", "right"] };

const len = (v) => {
  if (v == null || v === "") return null;
  if (v === "preferred") return "auto";
  const s = String(v).trim();
  const m = /^(-?[\d.]+)\s*(dp|px|%)?$/.exec(s);
  if (!m) return null;
  return m[2] === "%" ? `${m[1]}%` : `${m[1]}px`;
};
const isPct = (v) => typeof v === "string" && v.trim().endsWith("%");

// the breakpoint key for a width, from the form's breakpointInfo ({b1: {width: 1366}, ...})
function bpKeyOf(info, width) {
  const list = Object.entries(info || {}).map(([k, v]) => [k, v && v.width]).filter(([, w]) => typeof w === "number").sort((a, b) => a[1] - b[1]);
  const hit = list.find(([, w]) => width <= w);
  return hit ? hit[0] : null;
}
const eff = (m, bp) => (bp && m.responsiveData && m.responsiveData[bp] ? { ...m, ...m.responsiveData[bp] } : m);

// widget colour properties: RRGGBBAA, AA = transparency in percent (separatorColor; konyframework.js)
const widgetColor = (c) => {
  if (typeof c !== "string" || c.length < 6) return null;
  const n = (i) => parseInt(c.slice(i, i + 2), 16);
  const t = c.length >= 8 ? n(6) : 0;
  return `rgba(${n(0)}, ${n(2)}, ${n(4)}, ${Math.max(0, 1 - t / 100)})`;
};

// where a widget sits in its parent's layout
function placement(p, parentLayout) {
  const s = { boxSizing: "border-box", flexShrink: 0, position: "relative", minWidth: 0 };
  const stretchX = p.left != null && p.right != null && p.width == null;
  const stretchY = p.top != null && p.bottom != null && p.height == null;
  const W = stretchX ? null : len(p.width != null ? p.width : DEF_W[p.wType]);
  const H = stretchY ? null : len(p.height != null ? p.height : (CONTAINERS.has(p.wType) && p.autogrowMode !== 1 ? null : DEF_H[p.wType]));
  const centre = (c, size) => (size && size !== "auto" ? `calc(${len(c)} - (${size}) / 2)` : null);
  const horizontal = (selfKey) => {
    if (p.centerX != null) {
      const m = centre(p.centerX, W);
      if (m) { s[selfKey] = "start"; s.marginLeft = m; } else s[selfKey] = "center";
    } else if (stretchX) { s[selfKey] = "stretch"; s.marginLeft = len(p.left); s.marginRight = len(p.right); }
    else if (p.right != null && p.left == null) { s[selfKey] = "end"; s.marginRight = len(p.right); }
    else { s[selfKey] = "start"; s.marginLeft = len(p.left) || "0px"; }
  };
  const vertical = (selfKey) => {
    if (p.centerY != null) {
      const m = centre(p.centerY, H);
      if (m && !isPct(p.centerY)) { s[selfKey] = "start"; s.marginTop = m; } else s[selfKey] = "center";
    } else if (stretchY) { s[selfKey] = "stretch"; s.marginTop = len(p.top); s.marginBottom = len(p.bottom); }
    else if (p.bottom != null && p.top == null) { s[selfKey] = "end"; s.marginBottom = len(p.bottom); }
    else if (isPct(p.top)) { s[selfKey] = "start"; s.top = p.top; }          // % offsets are of the parent's height
    else { s[selfKey] = "start"; s.marginTop = len(p.top) || "0px"; }
  };
  if (parentLayout === "free") {
    s.gridArea = "1 / 1";
    horizontal("justifySelf");
    vertical("alignSelf");
  } else if (parentLayout === "vflow") {
    // Kony determineVerticalFlowY: top = previous bottom + (centerY ? centerY - height/2 : top); centerY wins.
    // A % centerY is left as top: CSS margins resolve % against the width, Kony against the height.
    const flowTop = p.centerY != null && !isPct(p.centerY) && centre(p.centerY, H) ? centre(p.centerY, H) : len(p.top) || "0px";
    if (p.bottom != null) s.marginBottom = len(p.bottom);
    horizontal("alignSelf");
    if (s.alignSelf === "start") s.alignSelf = "flex-start";
    if (s.alignSelf === "end") s.alignSelf = "flex-end";
    s.marginTop = flowTop;
  } else {
    // Kony determineHorizontalFlowX: left = previous right edge + (centerX ? centerX - width/2 : left); centerX
    // wins over left (a % centerX is of the parent's width, as a CSS margin is). Checked: konyframework.js.
    const flowLeft = p.centerX != null && centre(p.centerX, W) ? centre(p.centerX, W) : len(p.left) || "0px";
    if (p.right != null) s.marginRight = len(p.right);
    vertical("alignSelf");
    if (s.alignSelf === "start") s.alignSelf = "flex-start";
    if (s.alignSelf === "end") s.alignSelf = "flex-end";
    s.marginLeft = flowLeft;
  }
  if (W) s.width = W === "auto" ? "max-content" : W;
  if (W === "auto") s.maxWidth = "100%";
  if (H) s.height = H;
  for (const k of ["minWidth", "maxWidth", "minHeight", "maxHeight"]) if (p[k] != null && len(p[k])) s[k] = len(p[k]);
  if (p.zIndex != null) s.zIndex = p.zIndex;
  if (p.isVisible === false) s.display = "none";
  return s;
}

// a container's own layout
function inner(p) {
  const layout = LAYOUT[p.layoutType] || "free";
  const s = layout === "free" ? { display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gridTemplateRows: "minmax(0, 1fr)" }
    : { display: "flex", flexDirection: layout === "vflow" ? "column" : "row", alignItems: "flex-start" };
  if (p.clipBounds !== false) s.overflow = "hidden";
  if (p.wType === "FlexScrollContainer") s.overflow = "auto";
  return { layout, style: s };
}

// a skin kuid or name -> its class; a skin missing from the theme (or none) falls back to the theme's default
// skin for the widget type, as Visualizer does
const skinClass = (skin, wType) => {
  const known = window.__vizSkinKnown, defaults = window.__vizDefaultSkin || {};
  let kuid = skin ? (window.__vizSkinByName && window.__vizSkinByName[skin]) || skin : null;
  if ((!kuid || (known && !known.has(kuid))) && defaults[wType]) kuid = defaults[wType];
  return kuid ? "skn-" + kuid : "";
};

function useWidget(id) {
  const c = useContext(Ctx);
  const raw = c.lookup(id);
  return raw ? { c, p: eff(raw, c.bp), raw } : { c, p: null, raw: null };
}
const textOf = (p) => (p.text != null && p.text !== "" ? p.text : p.i18n_text ? app.i18n[p.i18n_text] || "" : p.text || "");
const fire = (c, p, prop, ide, ...args) => guard(`${p.id}.${prop}`, () => {
  if (typeof p[prop] === "function") return p[prop].apply(c.controller, args);
  if (p[ide] && c.controller && typeof c.controller[p[ide]] === "function") return c.controller[p[ide]](...args);
  return undefined;
});

// ---- widgets ----
export function Flex({ id, children, parentLayout }) {
  const { c, p } = useWidget(id);
  if (!p) return null;
  const { layout, style } = inner(p);
  const kids = p.dynamic || !children ? (p.children || []).map((k) => <Widget key={k} id={k} parentLayout={layout} />)
    : React.Children.map(children, (ch) => (React.isValidElement(ch) ? React.cloneElement(ch, { parentLayout: layout }) : ch));
  const click = typeof p.onClick === "function" || p.ide_onClick;
  return (
    <div data-viz={id} className={skinClass(p.skin, p.wType)} style={{ ...placement(p, parentLayout), ...style, ...(p.isVisible === false ? { display: "none" } : {}), cursor: click ? "pointer" : undefined }}
      onClick={click ? (e) => { e.stopPropagation(); fire(c, p, "onClick", "ide_onClick", c.fm.proxy(id)); } : undefined}>
      {kids}
    </div>
  );
}
export const FlexScroll = Flex;

export function Label({ id, parentLayout }) {
  const { p } = useWidget(id);
  if (!p) return null;
  const [v, h, ta] = ALIGN[p.contentAlignment] || ALIGN[4];
  const fixed = p.width != null && p.width !== "preferred";
  return (
    <div data-viz={id} className={skinClass(p.skin, p.wType)} style={{ ...placement(p, parentLayout), display: p.isVisible === false ? "none" : "flex",
      alignItems: v, justifyContent: h, textAlign: ta, whiteSpace: fixed ? "normal" : "nowrap", overflow: "hidden", wordBreak: "break-word" }}>
      <span>{textOf(p)}</span>
    </div>
  );
}

export function Button({ id, parentLayout }) {
  const { c, p } = useWidget(id);
  if (!p) return null;
  const [v, h] = ALIGN[p.contentAlignment] || ALIGN[5];
  return (
    <button data-viz={id} type="button" className={skinClass(p.skin, p.wType)} disabled={p.enabled === false}
      style={{ ...placement(p, parentLayout), display: p.isVisible === false ? "none" : "flex", alignItems: v, justifyContent: h, cursor: "pointer", whiteSpace: "nowrap" }}
      onClick={(e) => { e.stopPropagation(); fire(c, p, "onClick", "ide_onClick", c.fm.proxy(id)); }}>
      {textOf(p)}
    </button>
  );
}

export function TextField({ id, parentLayout }) {
  const { c, p, raw } = useWidget(id);
  if (!p) return null;
  const Tag = p.wType === "TextArea" ? "textarea" : "input";
  return (
    <Tag data-viz={id} className={skinClass(p.skin, p.wType)} type={p.secureTextEntry ? "password" : "text"} value={p.text || ""}
      placeholder={p.placeholder || (p.i18n_placeholder && app.i18n[p.i18n_placeholder]) || ""} maxLength={p.maxTextLength || undefined}
      style={{ ...placement(p, parentLayout), padding: "0 10px" }}
      onChange={(e) => { raw.text = e.target.value; c.fm.changed(); fire(c, p, "onTextChange", "ide_onTextChange", c.fm.proxy(id)); }}
      onKeyDown={(e) => { if (e.key === "Enter") fire(c, p, "onDone", "ide_onDone", c.fm.proxy(id)); }} />
  );
}

export function ListBox({ id, parentLayout }) {
  const { c, p, raw } = useWidget(id);
  if (!p) return null;
  // masterData [[key, value], ...] or masterDataMap [rows, keyField, valueField]
  const opts = Array.isArray(p.masterData) ? p.masterData
    : Array.isArray(p.masterDataMap) && Array.isArray(p.masterDataMap[0]) ? p.masterDataMap[0].map((r) => [r[p.masterDataMap[1]], r[p.masterDataMap[2]]]) : [];
  return (
    <select data-viz={id} className={skinClass(p.skin, p.wType)} value={p.selectedKey || ""} style={placement(p, parentLayout)}
      onChange={(e) => { raw.selectedKey = e.target.value; raw.selectedKeyValue = opts.find((o) => String(o[0]) === e.target.value) || null; c.fm.changed(); fire(c, p, "onSelection", "ide_onSelection", c.fm.proxy(id)); }}>
      {opts.map((o) => <option key={String(o[0])} value={String(o[0])}>{o[1]}</option>)}
    </select>
  );
}

export function Image({ id, parentLayout }) {
  const { c, p } = useWidget(id);
  if (!p) return null;
  const src = p.src && c.images[String(p.src).toLowerCase()];
  return src ? <img data-viz={id} alt="" src={src} style={{ ...placement(p, parentLayout), objectFit: p.imageScaleMode === 0 ? "fill" : "contain" }} />
    : <div data-viz={id} style={{ ...placement(p, parentLayout) }} />;
}

// Segment: the row template rendered once per data row; widgetDataMap maps template widgets to row keys
export function Segment({ id, parentLayout }) {
  const { c, p } = useWidget(id);
  if (!p) return null;
  const tpl = c.templateFor(p.rowTemplate);
  const rows = Array.isArray(p.data) ? p.data : [];
  const sep = p.separatorRequired ? `${p.separatorThickness || 1}px solid ${widgetColor(p.separatorColor) || "transparent"}` : "none";
  const map = p.widgetDataMap || {};
  const style = { ...placement(p, parentLayout), overflow: p.autogrowMode === 1 ? "visible" : "auto" };
  if (p.autogrowMode === 1) style.height = "auto";
  return (
    <div data-viz={id} className={skinClass(p.skin, p.wType)} style={style}>
      {tpl && rows.map((row, i) => {
        // per row: the template's widgets with this row's values
        const values = {};
        for (const [wid, key] of Object.entries(map)) {
          const v = row[key];
          if (v === undefined) continue;
          values[wid] = v !== null && typeof v === "object" ? v : { [tpl.widgets[wid] && tpl.widgets[wid].wType === "Image" ? "src" : "text"]: v };
        }
        const lookup = (wid) => (tpl.models[wid] ? { ...tpl.models[wid], ...(values[wid] || {}) } : c.lookup(wid));
        return (
          <div key={i} style={{ borderBottom: sep, cursor: "pointer" }}
            onClick={() => {
              const m = c.fm.models.get(id);
              m.selectedRowIndex = [0, i]; m.selectedIndex = [0, i]; m.selectedRowItems = [row];
              fire(c, m, "onRowClick", "ide_onRowClick", c.fm.proxy(id), 0, i);
            }}>
            <Ctx.Provider value={{ ...c, lookup }}>
              <Widget id={tpl.root} parentLayout="vflow" />
            </Ctx.Provider>
          </div>
        );
      })}
    </div>
  );
}

// Component instance: the component's own widget tree, with the instance's overrides (dataDiffs)
export function Component({ id, parentLayout }) {
  const { c, p } = useWidget(id);
  if (!p) return null;
  // the instance's own live widgets ("<instance>.<inner>", created by the form model), so what the
  // controller writes to this.view.<instance>.<inner> is what renders
  if (!p.componentRoot) return <div data-viz={id} style={placement(p, parentLayout)} />;
  return (
    <div data-viz={id} style={{ ...placement(p, parentLayout), display: p.isVisible === false ? "none" : "grid", gridTemplateColumns: "minmax(0, 1fr)" }}>
      <Widget id={p.componentRoot} parentLayout="free" />
    </div>
  );
}

const BY_TYPE = { FlexContainer: Flex, FlexScrollContainer: Flex, Label, Button, TextField, TextArea: TextField, ListBox, Image, Segment, UserWidgetInstance: Component, RichText: Label, Calendar: TextField };
export function Widget({ id, parentLayout }) {
  const { p } = useWidget(id);
  if (!p) return null;
  const C = BY_TYPE[p.wType];
  if (!C) return <div data-viz={id} title={`${p.wType} not converted`} style={placement(p, parentLayout)} />;
  return <C id={id} parentLayout={parentLayout} />;
}

// ---- the form host: one controller per form, the Visualizer lifecycle on every navigation ----
// A form's widgets and controller, created once on first use (shown, or asked for with kony.mvc.GetController)
// and kept, as Kony keeps form instances. Widget changes re-render the form while it is on screen.
export function formInstance(formId) {
  if (app.controllers[formId]) return app.controllers[formId];
  const def = app.forms[formId];
  if (!def) return null;
  let queued = false;
  const fm = new FormModel(formId, def.widgets, () => {
    if (!queued) { queued = true; Promise.resolve().then(() => { queued = false; fm.rerender && fm.rerender(); }); }
  }, def.components);
  // underneath the controller: the project's MDAFormController (modules/konymvcextns.js) when the app is an
  // MDA app, with the platform FormController methods; otherwise those methods alone
  const MDA = kony.mvc.MDAFormController;
  let base = ControllerBase;
  if (typeof MDA === "function" && !isStub(MDA)) {
    base = Object.create(MDA.prototype);
    for (const k of ["executeOnParent", "getPreviousForm"]) if (!(k in base)) base[k] = ControllerBase[k];
  }
  const ctl = Object.create(base);
  if (base !== ControllerBase) guard(`${formId} MDAFormController`, () => MDA.call(ctl, formId));
  Object.assign(ctl, guard(`${formId} controller`, def.controller) || {}, guard(`${formId} actions`, def.actions) || {});
  ctl.view = fm.view;
  ctl.__fm = fm;
  fm.base = ControllerBase;
  fm.formController = ctl;
  app.controllers[formId] = ctl;
  // component controllers are created with the form (Kony constructs component instances then)
  for (const [wid, m] of fm.models) if (m.wType === "UserWidgetInstance") fm.ctl(wid);
  return ctl;
}
app.controllerFor = formInstance;

export function FormHost({ formId, context, navKey, View }) {
  const def = app.forms[formId];
  const [, rerender] = useReducer((x) => x + 1, 0);
  const [width, setWidth] = useState(window.innerWidth);
  const ctl = formInstance(formId);
  const fm = ctl.__fm;
  fm.rerender = rerender;
  // kony.application.getCurrentBreakpoint() answers with the shown form's breakpoints
  const info = fm.models.get(formId).breakpointInfo;
  const widths = Object.values(info || {}).map((b) => b && b.width).filter((w) => typeof w === "number");
  if (widths.length) app.breakpoints = widths;
  useEffect(() => {
    // navigate(context): onNavigate, the form's init event (first time), preShow, then postShow after render
    const form = fm.models.get(formId);
    if (typeof ctl.onNavigate === "function") guard(`${formId}.onNavigate`, () => ctl.onNavigate(context));
    if (!ctl.__inited) {
      ctl.__inited = true;
      if (form.ide_init && typeof ctl[form.ide_init] === "function") guard(`${formId}.init`, () => ctl[form.ide_init](fm.view));
    }
    if (typeof form.preShow === "function") guard(`${formId}.preShow`, () => form.preShow.call(ctl));
    else if (form.ide_preShow && typeof ctl[form.ide_preShow] === "function") guard(`${formId}.preShow`, () => ctl[form.ide_preShow](fm.view));
    // components whose controller set this.view.preShow (Kony calls them when the form shows)
    for (const [wid, m] of fm.models) if (m.wType === "UserWidgetInstance" && typeof m.preShow === "function") guard(`${wid}.preShow`, () => m.preShow.call(fm.ctl(wid)));
    rerender();
    const t = setTimeout(() => {
      if (typeof form.postShow === "function") guard(`${formId}.postShow`, () => form.postShow.call(ctl));
      else if (form.ide_postShow && typeof ctl[form.ide_postShow] === "function") guard(`${formId}.postShow`, () => ctl[form.ide_postShow](fm.view));
    });
    return () => clearTimeout(t);
  }, [formId, navKey]);
  useEffect(() => {
    let last = currentBreakpoint();
    const onResize = () => {
      setWidth(window.innerWidth);
      const bp = currentBreakpoint();
      if (bp !== last) {
        last = bp;
        const form = fm.models.get(formId);
        if (typeof form.onBreakpointChange === "function") guard(`${formId}.onBreakpointChange`, () => form.onBreakpointChange.call(ctl, fm.view, window.innerWidth));
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [formId]);
  const formModel = fm.models.get(formId);
  // breakpoint overrides whenever the app is responsive (projectProperties enableResponsive) and the form has
  // breakpoints. globalRespDesignEnabled false means the form uses its own breakpoints (KBZ frmLogin: b1-b4 with
  // b4 = 768), not that responsive design is off: frmLogin's desktop layout is in responsiveData.b1.
  const bp = app.responsive !== false && formModel.breakpointInfo ? bpKeyOf(formModel.breakpointInfo, width) : null;
  const value = {
    fm, controller: ctl, bp, images: window.__vizImages || {},
    lookup: (id) => fm.models.get(id),
    templateFor: (root) => def.templates[root] || null,
    componentFor: (kuid) => def.components[kuid] || null,
  };
  const p = eff(formModel, bp);
  const { layout, style } = inner(p);
  return (
    <Ctx.Provider value={value}>
      <div data-viz={formId} className={skinClass(p.skin, p.wType)} style={{ ...style, minHeight: "100vh", width: "100%", position: "relative" }}>
        <View parentLayout={layout} />
      </div>
    </Ctx.Provider>
  );
}

// template / component definitions: their widgets as models, and the root widget id
export function definitions(trees) {
  const out = {};
  for (const [key, t] of Object.entries(trees)) {
    out[key] = { root: t.root, widgets: t.widgets, props: t.props || {}, models: Object.fromEntries(Object.entries(t.widgets).map(([id, j]) => [id, fromSm(j)])) };
  }
  return out;
}
