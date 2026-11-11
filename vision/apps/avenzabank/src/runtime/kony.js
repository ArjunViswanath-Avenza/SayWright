// The part of the Visualizer runtime API that controllers call, implemented over the React app.
// Anything not implemented is reported once (window.__vizMissing) instead of crashing the form.

export const app = {
  forms: {},            // formId -> { widgets, controller: () => object, actions: () => object }
  controllers: {},      // formId -> controller instance (Kony keeps one per form)
  current: null, previous: null,
  navigate: null,       // set by the router: (formId, context) => void
  breakpoints: [640, 1024, 1366],
  i18n: {},
  missing: new Set(),
};

const missing = (name) => {
  if (!app.missing.has(name)) { app.missing.add(name); console.warn(`[viz2react] kony API not converted: ${name}`); }
};

// kony.* objects that are not implemented answer with a logging stub, so one call does not break a form
const stub = (path) => new Proxy(function () {}, {
  get(_, k) {
    if (k === Symbol.toPrimitive || k === "toString" || k === "valueOf") return () => "";   // used in a string: ""
    if (k === "__stub") return true;
    return typeof k === "symbol" ? undefined : stub(`${path}.${String(k)}`);
  },
  apply() { missing(path); return stub(`${path}()`); },     // chainable: a.b().c() is logged, not a crash
  construct() { missing(`new ${path}`); return stub(`new ${path}`); },
});
export const isStub = (v) => typeof v === "function" && v.__stub === true;
const withStubs = (obj, path) => new Proxy(obj, {
  get(t, k) { return k in t || typeof k === "symbol" ? t[k] : stub(`${path}.${String(k)}`); },
});

class Navigation {
  constructor(target) {
    // new kony.mvc.Navigation("frmX") or ({ appName, friendlyName: "Module/frmX" })
    const name = typeof target === "string" ? target : target && (target.friendlyName || target.formName);
    this.formId = String(name || "").split("/").pop();
  }
  navigate(context) {
    if (!app.forms[this.formId]) { console.error(`[viz2react] navigate to unknown form ${this.formId}`); return; }
    app.navigate(this.formId, context);
  }
}

export function currentBreakpoint(width = window.innerWidth) {
  const list = [...app.breakpoints].sort((a, b) => a - b);
  if (width > list[list.length - 1]) return constants.BREAKPOINT_MAX_VALUE;
  return list.find((b) => width <= b);
}

export const constants = withStubs({
  BREAKPOINT_MAX_VALUE: 9999999,
  CONTAINER_LAYOUT_FREE_FORM: 2, FLOW_HORIZONTAL: 3, FLOW_VERTICAL: 4,
  SEGUI_VIEW_TYPE_TABLEVIEW: "tableview", SEGUI_VIEW_TYPE_PAGEVIEW: "pageview",
  ALERT_TYPE_INFO: "info", ALERT_TYPE_ERROR: "error", ALERT_TYPE_CONFIRMATION: "confirmation",
}, "constants");

// The platform's kony.mvc FormController and form registry. The MDA layer on top (MDAApplication, module
// manager, presenters, business controllers, MDAFormController) is the project's own modules/konymvcextns.js.
function FormController(viewId) { this.viewId = viewId; }
FormController.prototype.show = function (context) { new Navigation(this.viewId).navigate(context); };
const registry = {
  map: new Map(),       // friendlyName -> { formName, controllerName, controllerType, controllerExtName }
  add(friendly, formName, o) { this.map.set(friendly, { formName, ...(o || {}) }); },
  remove(friendly) { this.map.delete(friendly); },
  get(friendly) { return this.map.get(friendly) || null; },
  getControllerType(f) { const r = this.map.get(f); return r ? r.controllerType : undefined; },
  getFriendlyName(f) { return this.map.has(f) ? f : undefined; },
  getControllerName(f) { const r = this.map.get(f); return r ? r.controllerName : undefined; },
  getControllerExtName(f) { const r = this.map.get(f); return r ? r.controllerExtName : undefined; },
};
// the controller of a form, created (with its widgets) the first time it is asked for, as Kony does
const GetController = (formId) => (app.controllerFor ? app.controllerFor(String(formId).split("/").pop()) : null);
const assignFunctions2Controller = (target, exts) => { for (const e of exts || []) for (const [k, v] of Object.entries(e || {})) target[k] = v; return target; };

export const kony = withStubs({
  // Presentation / util / UIBinder / constants exist as plain objects: konymvcextns.js fills them in
  // (a stub there would be truthy and swallow what it assigns)
  mvc: withStubs({ Navigation, FormController, registry, GetController, getController: GetController, Presentation: {}, util: {}, UIBinder: {}, constants: {} }, "kony.mvc"),
  sdk: withStubs({ isNullOrUndefined: (v) => v === null || v === undefined }, "kony.sdk"),
  application: withStubs({
    getCurrentBreakpoint: () => currentBreakpoint(),
    getCurrentForm: () => app.current && app.controllers[app.current] && app.controllers[app.current].view,
    getPreviousForm: () => (app.previous ? { id: app.previous } : null),
    showLoadingScreen: () => { document.body.classList.add("viz-loading"); },
    dismissLoadingScreen: () => { document.body.classList.remove("viz-loading"); },
    setApplicationBehaviors: () => {},
    openURL: (url) => window.open(url, "_blank"),
  }, "kony.application"),
  flex: withStubs({ FREE_FORM: 2, FLOW_HORIZONTAL: 3, FLOW_VERTICAL: 4, USE_PREFERRED_SIZE: "preferred", AUTOGROW_NONE: 0, AUTOGROW_HEIGHT: 1, DP: "dp", PERCENTAGE: "%" }, "kony.flex"),
  i18n: withStubs({
    getLocalizedString: (key) => (app.i18n[key] != null ? app.i18n[key] : key), getCurrentLocale: () => app.locale || "en_US",
    // one locale is converted; switching reports success and keeps its texts
    setCurrentLocaleAsync: (loc, ok) => { if (typeof ok === "function") setTimeout(() => ok(loc)); },
  }, "kony.i18n"),
  store: withStubs({
    setItem: (k, v) => localStorage.setItem("kony." + k, JSON.stringify(v)),
    getItem: (k) => { const v = localStorage.getItem("kony." + k); return v == null ? null : JSON.parse(v); },
    removeItem: (k) => localStorage.removeItem("kony." + k),
  }, "kony.store"),
  timer: withStubs({
    _t: new Map(),
    schedule(id, fn, secs, repeat) { this.cancel(id); this._t.set(id, (repeat ? setInterval : setTimeout)(fn, secs * 1000)); },
    cancel(id) { const h = this._t.get(id); if (h) { clearTimeout(h); clearInterval(h); this._t.delete(id); } },
  }, "kony.timer"),
  ui: withStubs({ Alert: (cfg) => { window.alert((cfg && (cfg.message || cfg.alertMessage)) || ""); } }, "kony.ui"),
  os: withStubs({
    // what desktop web reports (OrientationHandler reads userAgent at start-up)
    deviceInfo: () => ({ name: "thinclient", category: "desktop", userAgent: navigator.userAgent, screenWidth: window.innerWidth, screenHeight: window.innerHeight,
      deviceWidth: window.innerWidth, deviceHeight: window.innerHeight, version: navigator.appVersion, osversion: navigator.platform, model: "", deviceid: "" }),
    getDeviceCurrentOrientation: () => (window.innerHeight > window.innerWidth ? 1 : 2),
    toNumber: Number, toCurrency: (v) => String(v),
  }, "kony.os"),
  print: (...a) => console.log(...a),
  type: (v) => (v === null ? "null" : Array.isArray(v) ? "table" : typeof v),
}, "kony");

// Visualizer's AMD-style define(): controllers are define({...}), define(function () { return {...} })
// or define("name", [deps], function (a, b) {...}). Dependencies come from the project's own modules
// (modules/require/<name>.js, loaded on first use); names the project does not have get a logging stand-in.
// The definition is captured as the module's value. Modules are keyed by their path under modules/require
// or mvcextensions ("AuthModule/PresentationControllers/PresentationController", "ApplicationManager");
// a bare name also finds modules/require/<name>.
export const modules = { sources: {}, values: {} };
export function resolve(name) {
  const full = String(name).replace(/^\.\//, "").replace(/\.js$/, "");
  const key = full in modules.values || modules.sources[full] != null ? full : full.split("/").pop();
  if (key in modules.values) return modules.values[key];
  if (modules.sources[key] != null) {
    modules.values[key] = undefined;                 // a cycle sees undefined, as AMD would
    const prev = define.last;
    try { new Function("define", "kony", "constants", "require", modules.sources[key] + `\n//# sourceURL=viz/${key}.js`)(define, kony, constants, requireShim); }
    catch (e) { report(`module ${key}`, e); }
    modules.values[key] = define.last;
    define.last = prev;
    return modules.values[key];
  }
  missing(`module ${name}`);
  return (modules.values[key] = stub(`module ${name}`));
}
export function define(...args) {
  const f = args[args.length - 1];
  const deps = args.find((a) => Array.isArray(a)) || [];
  let value;
  try { value = typeof f === "function" ? f(...deps.map(resolve)) : f; } catch (e) { report("define", e); value = {}; }
  const name = args.find((a) => typeof a === "string");
  if (name) modules.values[name] = value;
  define.last = value;
  return value;
}
// require(["A", "B"], function (a, b) {...}) and require("A")
export function requireShim(names, cb) {
  if (typeof names === "string") return resolve(names);
  const vals = (names || []).map(resolve);
  if (typeof cb === "function") try { cb(...vals); } catch (e) { report("require callback", e); }
  return vals[0];
}

// errors thrown by converted code: kept and logged, so one failing call does not blank the form
export function report(where, e) {
  // where in the converted code: the first stack frame inside evaluated source (<anonymous>:line:col)
  // (evaluated sources are named viz/<module>.js by their sourceURL)
  const frame = e && e.stack ? e.stack.split("\n").find((l) => /viz\/\S+\.js:\d+:\d+|<anonymous>:\d+:\d+/.test(l)) || "" : "";
  const at = (/viz\/\S+?\.js:\d+:\d+/.exec(frame) || /<anonymous>:\d+:\d+/.exec(frame) || [""])[0];
  const msg = `${where}: ${e && e.message ? e.message : e}${at ? ` [${at}]` : ""}`;
  (window.__vizErrors = window.__vizErrors || []).push(msg);
  console.error("[viz2react]", msg);
}
export function guard(where, fn) {
  try { return fn(); } catch (e) { report(where, e); return undefined; }
}

// What every form and component controller inherits from the platform's kony.mvc FormController.
export const ControllerBase = {
  attachToModule(m) { this.presenter = (m && m.presentationController) || m; },
  executeOnParent(name, ...args) {
    const p = this.__parent;
    if (p && typeof p[name] === "function") return p[name](...args);
    missing(`executeOnParent ${name}`);
    return undefined;
  },
  getPreviousForm() { return app.previous; },
};

// Kony's property helpers used by component controllers (initGettersSetters)
const accessor = (obj, name, part, fn) => {
  const d = Object.getOwnPropertyDescriptor(obj, name) || {};
  Object.defineProperty(obj, name, { configurable: true, enumerable: true, get: d.get, set: d.set, ...{ [part]: fn } });
};
window.defineGetter = (obj, name, fn) => accessor(obj, name, "get", fn);
window.defineSetter = (obj, name, fn) => accessor(obj, name, "set", fn);

window.kony = kony;
window.constants = constants;
window.require = requireShim;
window.define = define;
window.__vizMissing = app.missing;
// platform globals the MDA framework and Infinity modules use
window.inheritsFrom = (child, parent) => { child.prototype = Object.create(parent.prototype); child.prototype.constructor = child; };
window._kony = { mvc: { GetController, assignFunctions2Controller } };
// app-level objects an Infinity app creates in its preappinit event; until that runs, stand-ins
for (const g of ["applicationManager", "orientationHandler"]) if (!(g in window)) window[g] = stub(g);
