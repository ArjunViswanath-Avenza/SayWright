// Widget models: what a Visualizer controller sees as this.view.<id>. Built from the .sm widget JSON
// (designer property names -> the runtime names controllers use), mutable like the real widgets: every
// property set re-renders the form. Containers support widgets() / add / remove / removeAll / clone.

// .sm property -> runtime property
const PROP = {
  _text_: "text", isvisible: "isVisible", _skin_: "skin", focusskin: "focusSkin", hoverskin: "hoverSkin",
  _left_: "left", _top_: "top", _right_: "right", _bottom_: "bottom", _width_: "width", _height_: "height",
  centerx: "centerX", centery: "centerY", minwidth: "minWidth", maxwidth: "maxWidth", minheight: "minHeight", maxheight: "maxHeight",
  zindex: "zIndex", layouttype: "layoutType", autogrowmode: "autogrowMode", contentalignment: "contentAlignment",
  clipbounds: "clipBounds", _padding_: "padding", paddinginpixel: "paddingInPixel",
  _placeholder_: "placeholder", securetextentry: "secureTextEntry", maxtextlength: "maxTextLength",
  _src_: "src", imagescalemode: "imageScaleMode", masterdata: "masterData", masterdatamap: "masterDataMap", selectedkey: "selectedKey",
  _data_: "data", rowtemplate: "rowTemplate", widgetdatamap: "widgetDataMap", separatorrequired: "separatorRequired",
  separatorcolor: "separatorColor", separatorthickness: "separatorThickness", sourceUserWidget: "sourceUserWidget",
  responsiveData: "responsiveData", enabled: "enabled", wType: "wType", id: "id", kuid: "kuid", breakpointInfo: "breakpointInfo",
  texti18n: "i18n_text", placeholderi18n: "i18n_placeholder", vizProps: "vizProps", dataDiffs: "dataDiffs", ide_init: "ide_init", ide_preShow: "ide_preShow",
  ide_postShow: "ide_postShow", ide_onClick: "ide_onClick", ide_onRowClick: "ide_onRowClick", ide_onTextChange: "ide_onTextChange",
};

// {type:"string", value:"10dp"} / {type:"ref", value:"preferred"} / {type:"number", value:""} -> "10dp" / "preferred" / null
export function dim(v) {
  if (v == null) return null;
  if (typeof v === "object" && "value" in v) return v.value === "" || v.value == null ? null : String(v.value);
  if (typeof v === "number") return v + "dp";
  return v === "" ? null : String(v);
}
const DIMS = new Set(["left", "top", "right", "bottom", "width", "height", "centerX", "centerY", "minWidth", "maxWidth", "minHeight", "maxHeight"]);

// only the properties present in j, in runtime names (component instance overrides)
export function mapProps(j) {
  const p = {};
  for (const [k, v] of Object.entries(j || {})) {
    const name = PROP[k];
    if (name) p[name] = DIMS.has(name) ? dim(v) : v;
  }
  return p;
}

export function fromSm(j) {
  const p = { children: Array.isArray(j.children) ? [...j.children] : [] };
  for (const [k, v] of Object.entries(j)) {
    const name = PROP[k];
    if (!name) continue;
    p[name] = DIMS.has(name) ? dim(v) : v;
  }
  if (p.isVisible === undefined) p.isVisible = true;
  if (p.enabled === undefined) p.enabled = true;
  if (p.info === undefined) p.info = {};          // the widget's free-form data bag (widget.info.x = ...)
  // design-time segment rows: {w: {"@class": ..., text}} -> {w: {text}}
  if (Array.isArray(p.data)) p.data = p.data.map((row) => Object.fromEntries(Object.entries(row || {}).map(([k, v]) => [k, v && typeof v === "object" ? { ...v, "@class": undefined } : v])));
  if (p.responsiveData) {
    const rd = {};
    for (const [bp, o] of Object.entries(p.responsiveData)) {
      if (!o || typeof o !== "object") continue;
      rd[bp] = Object.fromEntries(Object.entries(o).map(([k, v]) => [k, DIMS.has(k) ? dim(v) : v]));
    }
    p.responsiveData = rd;
  }
  return p;
}

// One form's widgets. view[id] is the proxy controllers write to.
// controller code runs guarded: a failing component does not stop the form
// widget instance methods (FormModel.proxy)
const METHODS = new Set(["setVisibility", "setEnabled", "forceLayout", "widgets", "add", "addAt", "remove", "removeAll", "clone",
  "setData", "addAll", "removeAt", "setDataAt", "setFocus", "setContext"]);
// widget.frame: its laid-out box relative to its parent, read from the rendered element (zeros before layout)
const frameOf = (id) => {
  const el = typeof document !== "undefined" && document.querySelector(`[data-viz="${CSS.escape(id)}"]`);
  return el ? { x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight } : { x: 0, y: 0, width: 0, height: 0 };
};
const safe = (f) => { try { return f(); } catch (e) { (window.__vizErrors = window.__vizErrors || []).push(`component: ${e.message}`); console.error("[viz2react] component:", e); return undefined; } };

export class FormModel {
  // components: {rootKuid: {root, widgets}}; every component instance gets live widgets of its own,
  // "<instance>.<inner>", with the instance's overrides (dataDiffs) applied: controllers write
  // this.view.OTPModule.tbxCVV.text and the component renders from these widgets
  constructor(formId, widgets, onChange, components = {}) {
    this.formId = formId;
    this.models = new Map();   // id -> raw props object
    this.proxies = new Map();
    this.onChange = onChange;
    this.components = components;
    for (const [id, j] of Object.entries(widgets)) this.models.set(id, fromSm(j));
    for (const [id, m] of [...this.models]) if (m.wType === "UserWidgetInstance") this.instantiate(id, m);
    const self = this;
    this.view = new Proxy({}, {
      get(_, k) {
        if (typeof k === "symbol") return undefined;
        if (k === "id") return formId;
        if (self.models.has(k)) return self.proxy(k);
        return self.proxy(formId)[k];             // form-level properties: preShow, postShow, ...
      },
      set(_, k, v) { self.proxy(formId)[k] = v; return true; },
      has(_, k) { return self.models.has(k); },
    });
  }
  instantiate(id, m) {
    const comp = this.components[m.sourceUserWidget];
    if (!comp) return;
    m.componentRoot = id + "." + comp.root;
    const diffs = m.dataDiffs || {};
    for (const [wid, j] of Object.entries(comp.widgets)) {
      const d = diffs[wid] || {};
      const o = Object.fromEntries(Object.entries(d).filter(([k]) => !k.startsWith("__")).map(([k, v]) => [k, v && typeof v === "object" && "Default" in v ? v.Default : v]));
      const inner = { ...fromSm(j), ...mapProps(o) };
      inner.children = (inner.children || []).map((c) => id + "." + c);
      inner.id = id + "." + wid;
      this.models.set(inner.id, inner);
      if (inner.wType === "UserWidgetInstance") this.instantiate(inner.id, inner);    // nested components
    }
  }
  // the component's own controller for an instance (userwidgets/<ns>/modules/require/<Name>Controller.js):
  // its this.view sees the instance's widgets; created once, constructor and initGettersSetters run
  ctl(id) {
    const m = this.models.get(id);
    if (!m || m.wType !== "UserWidgetInstance") return null;
    if (this.ctls && this.ctls.has(id)) return this.ctls.get(id);
    const comp = this.components[m.sourceUserWidget];
    this.ctls = this.ctls || new Map();
    if (!comp || !comp.controller) { this.ctls.set(id, null); return null; }
    const self = this;
    const c = Object.assign(Object.create(this.base || {}), safe(comp.controller) || {}, safe(comp.actions) || {});
    c.view = new Proxy({}, {
      get(_, k) {
        if (typeof k === "symbol") return undefined;
        if (k === "id") return id;
        if (self.models.has(id + "." + k)) return self.proxy(id + "." + k);
        if (METHODS.has(k)) return self.proxy(id)[k];                 // this.view.forceLayout(), setVisibility(), ...
        return self.models.get(id)[k];
      },
      set(_, k, v) { self.models.get(id)[k] = v; self.changed(); return true; },
    });
    c.__parent = this.formController;
    this.ctls.set(id, c);
    if (Object.prototype.hasOwnProperty.call(c, "constructor") && typeof c.constructor === "function") safe(() => c.constructor({}, {}, {}));
    if (typeof c.initGettersSetters === "function") safe(() => c.initGettersSetters());
    // custom properties: the instance's value (a key on the instance widget) or the component's default
    for (const [k, def] of Object.entries(comp.props || {})) {
      const v = Object.prototype.hasOwnProperty.call(m, k) ? m[k] : def;
      safe(() => { c[k] = v; });
    }
    return c;
  }
  changed() { this.onChange && this.onChange(); }
  register(id, props) { this.models.set(id, props); }
  unregister(id) {
    const m = this.models.get(id);
    if (!m) return;
    (m.children || []).forEach((c) => this.unregister(c));
    this.models.delete(id);
    this.proxies.delete(id);
  }
  get(id) { return this.models.get(id) || (this.detached && this.detached.get(id)); }
  proxy(id) {
    if (this.proxies.has(id)) return this.proxies.get(id);
    const self = this;
    const methods = {
      setVisibility(v) { self.get(id).isVisible = !!v; self.changed(); },
      setEnabled(v) { self.get(id).enabled = !!v; self.changed(); },
      forceLayout() { self.changed(); },
      widgets() { return (self.get(id).children || []).filter((c) => self.models.has(c)).map((c) => self.proxy(c)); },
      add(...ws) { ws.forEach((w) => self.attach(id, w)); self.changed(); },
      addAt(w, index) { self.attach(id, w, index); self.changed(); },
      remove(w) {
        const m = self.get(id), wid = w && (w.id || w);
        m.children = (m.children || []).filter((c) => c !== wid);
        self.unregister(wid);
        self.get(id).dynamic = true;
        self.changed();
      },
      removeAll() {
        const m = self.get(id);
        (m.children || []).forEach((c) => self.unregister(c));
        m.children = [];
        m.dynamic = true;
        self.changed();
      },
      clone(prefix) { return self.cloneTree(id, prefix == null ? "" : String(prefix)); },
      setData(rows) { self.get(id).data = rows; self.changed(); },
      addAll(rows) { const m = self.get(id); m.data = [...(m.data || []), ...rows]; self.changed(); },
      removeAt(i) { const m = self.get(id); m.data = (m.data || []).filter((_, k) => k !== i); self.changed(); },
      setDataAt(row, i) { const m = self.get(id); m.data = (m.data || []).map((r, k) => (k === i ? row : r)); self.changed(); },
      setFocus() {},
      setContext() {},
    };
    const p = new Proxy({}, {
      get(_, k) {
        if (k === "id") return id;
        if (k in methods) return methods[k];
        if (k === "frame") return frameOf(id);
        if (typeof k === "string" && self.models.has(id + "." + k)) return self.proxy(id + "." + k);   // a component's inner widget
        const own = self.get(id);
        if (own && typeof k === "string" && (own.children || []).includes(k)) return self.proxy(k);    // a container's child: flx.lblX
        const ctl = self.ctl(id);                                                                       // its controller's methods / properties
        if (ctl && typeof k === "string" && k in ctl) { const v = ctl[k]; return typeof v === "function" ? v.bind(ctl) : v; }
        const m = self.get(id);
        return m ? m[k] : undefined;
      },
      set(_, k, v) {
        const m = self.get(id);
        if (!m) return true;
        // a component instance: properties / events the form sets belong to the component's controller
        // (its setters run, its code calls this.onX), widget properties to the instance
        const ctl = m.wType === "UserWidgetInstance" ? self.ctl(id) : null;
        if (ctl && (k in ctl || typeof v === "function")) ctl[k] = v;
        if (!ctl || !(k in ctl) || DIMS.has(k) || k === "isVisible") m[k] = DIMS.has(k) ? dim(v) : v;
        self.changed();
        return true;
      },
    });
    this.proxies.set(id, p);
    return p;
  }
  // clone(prefix): a detached copy of the subtree; ids get the prefix (R25: this.view[prefix + id])
  cloneTree(id, prefix) {
    const src = this.models.get(id);
    const copy = JSON.parse(JSON.stringify({ ...src, children: [] }, (k, v) => (typeof v === "function" ? undefined : v)));
    for (const [k, v] of Object.entries(src)) if (typeof v === "function") copy[k] = v;
    copy.id = prefix + id;
    copy.children = (src.children || []).map((c) => this.cloneTree(c, prefix).id);
    copy.dynamic = src.dynamic;
    this.detached = this.detached || new Map();
    this.detached.set(copy.id, copy);
    return this.proxy(copy.id);
  }
  attach(parentId, w, index) {
    const wid = w && (w.id || w);
    const reg = (cid) => {
      const m = this.detached && this.detached.get(cid);
      if (!m) return;
      this.detached.delete(cid);
      this.models.set(cid, m);
      (m.children || []).forEach(reg);
    };
    reg(wid);
    const parent = this.models.get(parentId);
    parent.children = parent.children || [];
    if (index == null || index >= parent.children.length) parent.children.push(wid); else parent.children.splice(index, 0, wid);
    parent.dynamic = true;
  }
}
