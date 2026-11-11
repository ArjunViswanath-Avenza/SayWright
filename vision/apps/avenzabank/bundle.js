(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // viz2react/node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "viz2react/node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = Symbol.for("react.element");
      var n = Symbol.for("react.portal");
      var p = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r = Symbol.for("react.profiler");
      var t = Symbol.for("react.provider");
      var u = Symbol.for("react.context");
      var v = Symbol.for("react.forward_ref");
      var w = Symbol.for("react.suspense");
      var x = Symbol.for("react.memo");
      var y = Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a) return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g) c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
          c.children = f;
        }
        if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
        if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
        else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a) return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status) return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = X;
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // viz2react/node_modules/react/index.js
  var require_react = __commonJS({
    "viz2react/node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // viz2react/node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "viz2react/node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k(a) {
        if (0 === a.length) return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
            var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
            if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
            else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
            else break a;
          }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      var r = [];
      var t = [];
      var u = 1;
      var v = null;
      var y = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a) {
        for (var b = h(t); null !== b; ) {
          if (null === b.callback) k(t);
          else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
          else break;
          b = h(t);
        }
      }
      function H(a) {
        B = false;
        G(a);
        if (!A) if (null !== h(r)) A = true, I(J);
        else {
          var b = h(t);
          null !== b && K(H, b.startTime - a);
        }
      }
      function J(a, b) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c = y;
        try {
          G(b);
          for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r) && k(r);
              G(b);
            } else k(r);
            v = h(r);
          }
          if (null !== v) var w = true;
          else {
            var m = h(t);
            null !== m && K(H, m.startTime - b);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c, z = false;
        }
      }
      var N = false;
      var O = null;
      var L = -1;
      var P = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a = exports.unstable_now();
          Q = a;
          var b = true;
          try {
            b = O(true, a);
          } finally {
            b ? S() : (N = false, O = null);
          }
        } else N = false;
      }
      var S;
      if ("function" === typeof F) S = function() {
        F(R);
      };
      else if ("undefined" !== typeof MessageChannel) {
        T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else S = function() {
        D(R, 0);
      };
      var T;
      var U;
      function I(a) {
        O = a;
        N || (N = true, S());
      }
      function K(a, b) {
        L = D(function() {
          a(exports.unstable_now());
        }, b);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h(r);
      };
      exports.unstable_next = function(a) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y;
        }
        var c = y;
        y = b;
        try {
          return a();
        } finally {
          y = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y;
        y = a;
        try {
          return b();
        } finally {
          y = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
        return a;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a) {
        var b = y;
        return function() {
          var c = y;
          y = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y = c;
          }
        };
      };
    }
  });

  // viz2react/node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "viz2react/node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // viz2react/node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "viz2react/node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ca = require_scheduler();
      function p(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a, b) {
        ha(a, b);
        ha(a + "Capture", b);
      }
      function ha(a, b) {
        ea[a] = b;
        for (a = 0; a < b.length; a++) da.add(b[a]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a) {
        if (ja.call(ma, a)) return true;
        if (ja.call(la, a)) return false;
        if (ka.test(a)) return ma[a] = true;
        la[a] = true;
        return false;
      }
      function pa(a, b, c, d) {
        if (null !== c && 0 === c.type) return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d) return false;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function qa(a, b, c, d) {
        if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
        if (d) return false;
        if (null !== c) switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
        return false;
      }
      function v(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        z[a] = new v(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        z[b] = new v(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        z[a] = new v(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        z[a] = new v(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        z[a] = new v(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        z[a] = new v(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          ra,
          sa
        );
        z[b] = new v(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function ta(a, b, c, d) {
        var e = z.hasOwnProperty(b) ? z[b] : null;
        if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = Symbol.for("react.element");
      var wa = Symbol.for("react.portal");
      var ya = Symbol.for("react.fragment");
      var za = Symbol.for("react.strict_mode");
      var Aa = Symbol.for("react.profiler");
      var Ba = Symbol.for("react.provider");
      var Ca = Symbol.for("react.context");
      var Da = Symbol.for("react.forward_ref");
      var Ea = Symbol.for("react.suspense");
      var Fa = Symbol.for("react.suspense_list");
      var Ga = Symbol.for("react.memo");
      var Ha = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      Symbol.for("react.debug_trace_mode");
      var Ia = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.cache");
      Symbol.for("react.tracing_marker");
      var Ja = Symbol.iterator;
      function Ka(a) {
        if (null === a || "object" !== typeof a) return null;
        a = Ja && a[Ja] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var A = Object.assign;
      var La;
      function Ma(a) {
        if (void 0 === La) try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          La = b && b[1] || "";
        }
        return "\n" + La + a;
      }
      var Na = false;
      function Oa(a, b) {
        if (!a || Na) return "";
        Na = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b) if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (l) {
              var d = l;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (l) {
              d = l;
            }
            a.call(b.prototype);
          }
          else {
            try {
              throw Error();
            } catch (l) {
              d = l;
            }
            a();
          }
        } catch (l) {
          if (l && d && "string" === typeof l.stack) {
            for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
            for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) {
                    var k = "\n" + e[g].replace(" at new ", " at ");
                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                    return k;
                  }
                while (1 <= g && 0 <= h);
              }
              break;
            }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
      }
      function Pa(a) {
        switch (a.tag) {
          case 5:
            return Ma(a.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Oa(a.type, false), a;
          case 11:
            return a = Oa(a.type.render, false), a;
          case 1:
            return a = Oa(a.type, true), a;
          default:
            return "";
        }
      }
      function Qa(a) {
        if (null == a) return null;
        if ("function" === typeof a) return a.displayName || a.name || null;
        if ("string" === typeof a) return a;
        switch (a) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a) switch (a.$$typeof) {
          case Ca:
            return (a.displayName || "Context") + ".Consumer";
          case Ba:
            return (a._context.displayName || "Context") + ".Provider";
          case Da:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case Ga:
            return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
          case Ha:
            b = a._payload;
            a = a._init;
            try {
              return Qa(a(b));
            } catch (c) {
            }
        }
        return null;
      }
      function Ra(a) {
        var b = a.type;
        switch (a.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b.displayName || "Context") + ".Consumer";
          case 10:
            return (b._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b);
          case 8:
            return b === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b) return b.displayName || b.name || null;
            if ("string" === typeof b) return b;
        }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a;
          case "object":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a) return false;
        var b = a._valueTracker;
        if (!b) return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a) return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function ab(a, b) {
        b = b.checked;
        null != b && ta(a, "checked", b, false);
      }
      function bb(a, b) {
        ab(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c) if ("number" === d) {
          if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
        } else a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function db(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function cb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      var eb = Array.isArray;
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
        return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b) throw Error(p(92));
            if (eb(c)) {
              if (1 < c.length) throw Error(p(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      function kb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var mb;
      var nb = function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      }(function(a, b) {
        if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
          for (; b.firstChild; ) a.appendChild(b.firstChild);
        }
      });
      function ob(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a) {
        qb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          pb[b] = pb[a];
        });
      });
      function rb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
      }
      function sb(a, b) {
        a = a.style;
        for (var c in b) if (b.hasOwnProperty(c)) {
          var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
          "float" === c && (c = "cssFloat");
          d ? a.setProperty(c, e) : a[c] = e;
        }
      }
      var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a, b) {
        if (b) {
          if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children) throw Error(p(60));
            if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
          }
          if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
        }
      }
      function vb(a, b) {
        if (-1 === a.indexOf("-")) return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb) throw Error(p(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a, b, c) {
        if (Ib) return a(b, c);
        Ib = true;
        try {
          return Gb(a, b, c);
        } finally {
          if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
        }
      }
      function Kb(a, b) {
        var c = a.stateNode;
        if (null === c) return null;
        var d = Db(c);
        if (null === d) return null;
        c = d[b];
        a: switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
          default:
            a = false;
        }
        if (a) return null;
        if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
        return c;
      }
      var Lb = false;
      if (ia) try {
        Mb = {};
        Object.defineProperty(Mb, "passive", { get: function() {
          Lb = true;
        } });
        window.addEventListener("test", Mb, Mb);
        window.removeEventListener("test", Mb, Mb);
      } catch (a) {
        Lb = false;
      }
      var Mb;
      function Nb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (m) {
          this.onError(m);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a) {
        Ob = true;
        Pb = a;
      } };
      function Tb(a, b, c, d, e, f, g, h, k) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a, b, c, d, e, f, g, h, k) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l = Pb;
            Ob = false;
            Pb = null;
          } else throw Error(p(198));
          Qb || (Qb = true, Rb = l);
        }
      }
      function Vb(a) {
        var b = a, c = a;
        if (a.alternate) for (; b.return; ) b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function Wb(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b) return b.dehydrated;
        }
        return null;
      }
      function Xb(a) {
        if (Vb(a) !== a) throw Error(p(188));
      }
      function Yb(a) {
        var b = a.alternate;
        if (!b) {
          b = Vb(a);
          if (null === b) throw Error(p(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e) break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c) return Xb(e), a;
              if (f === d) return Xb(e), b;
              f = f.sibling;
            }
            throw Error(p(188));
          }
          if (c.return !== d.return) c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g) throw Error(p(189));
            }
          }
          if (c.alternate !== d) throw Error(p(190));
        }
        if (3 !== c.tag) throw Error(p(188));
        return c.stateNode.current === c ? a : b;
      }
      function Zb(a) {
        a = Yb(a);
        return null !== a ? $b(a) : null;
      }
      function $b(a) {
        if (5 === a.tag || 6 === a.tag) return a;
        for (a = a.child; null !== a; ) {
          var b = $b(a);
          if (null !== b) return b;
          a = a.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a) {
        if (lc && "function" === typeof lc.onCommitFiberRoot) try {
          lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
        } catch (b) {
        }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a) {
        a >>>= 0;
        return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a) {
        switch (a & -a) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a;
        }
      }
      function uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c) return 0;
        var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
        if (0 !== g) {
          var h = g & ~e;
          0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
        } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
        if (0 === d) return 0;
        if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
        0 !== (d & 4) && (d |= c & 16);
        b = a.entangledLanes;
        if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function vc(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 4:
            return b + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a, b) {
        for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
          var g = 31 - oc(f), h = 1 << g, k = e[g];
          if (-1 === k) {
            if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
          } else k <= b && (a.expiredLanes |= h);
          f &= ~h;
        }
      }
      function xc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a;
      }
      function zc(a) {
        for (var b = [], c = 0; 31 > c; c++) b.push(a);
        return b;
      }
      function Ac(a, b, c) {
        a.pendingLanes |= b;
        536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
        a = a.eventTimes;
        b = 31 - oc(b);
        a[b] = c;
      }
      function Bc(a, b) {
        var c = a.pendingLanes & ~b;
        a.pendingLanes = b;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= b;
        a.mutableReadLanes &= b;
        a.entangledLanes &= b;
        b = a.entanglements;
        var d = a.eventTimes;
        for (a = a.expirationTimes; 0 < c; ) {
          var e = 31 - oc(c), f = 1 << e;
          b[e] = 0;
          d[e] = -1;
          a[e] = -1;
          c &= ~f;
        }
      }
      function Cc(a, b) {
        var c = a.entangledLanes |= b;
        for (a = a.entanglements; c; ) {
          var d = 31 - oc(c), e = 1 << d;
          e & b | a[d] & b && (a[d] |= b);
          c &= ~e;
        }
      }
      var C = 0;
      function Dc(a) {
        a &= -a;
        return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b.pointerId);
        }
      }
      function Tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function Uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return Lc = Tc(Lc, a, b, c, d, e), true;
          case "dragenter":
            return Mc = Tc(Mc, a, b, c, d, e), true;
          case "mouseover":
            return Nc = Tc(Nc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function Vc(a) {
        var b = Wc(a.target);
        if (null !== b) {
          var c = Vb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = Wb(c), null !== b) {
                a.blockedOn = b;
                Ic(a.priority, function() {
                  Gc(c);
                });
                return;
              }
            } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function Xc(a) {
        if (null !== a.blockedOn) return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null === c) {
            c = a.nativeEvent;
            var d = new c.constructor(c.type, c);
            wb = d;
            c.target.dispatchEvent(d);
            wb = null;
          } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function Zc(a, b, c) {
        Xc(a) && c.delete(b);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a, b) {
        a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a) {
        function b(b2) {
          return ad(b2, a);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a);
          for (var c = 1; c < Kc.length; c++) {
            var d = Kc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a);
        null !== Mc && ad(Mc, a);
        null !== Nc && ad(Nc, a);
        Oc.forEach(b);
        Pc.forEach(b);
        for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 1, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function gd(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 4, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function fd(a, b, c, d) {
        if (dd) {
          var e = Yc(a, b, c, d);
          if (null === e) hd(a, b, d, id, c), Sc(a, d);
          else if (Uc(e, a, b, c, d)) d.stopPropagation();
          else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
            for (; null !== e; ) {
              var f = Cb(e);
              null !== f && Ec(f);
              f = Yc(a, b, c, d);
              null === f && hd(a, b, d, id, c);
              if (f === e) break;
              e = f;
            }
            null !== e && d.stopPropagation();
          } else hd(a, b, d, null, c);
        }
      }
      var id = null;
      function Yc(a, b, c, d) {
        id = null;
        a = xb(d);
        a = Wc(a);
        if (null !== a) if (b = Vb(a), null === b) a = null;
        else if (c = b.tag, 13 === c) {
          a = Wb(b);
          if (null !== a) return a;
          a = null;
        } else if (3 === c) {
          if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
          a = null;
        } else b !== a && (a = null);
        id = a;
        return null;
      }
      function jd(a) {
        switch (a) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md) return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++) ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a) return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b) return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which) return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length) return b.char;
              if (b.which) return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b)) return a;
      }
      function ve(a, b) {
        if ("change" === a) return b;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          Jb(re, b);
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a) return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a) return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a, b) {
        if (He(a, b)) return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length) return false;
        for (d = 0; d < c.length; d++) {
          var e = c[d];
          if (!ja.call(b, e) || !He(a[e], b[e])) return false;
        }
        return true;
      }
      function Je(a) {
        for (; a && a.firstChild; ) a = a.firstChild;
        return a;
      }
      function Ke(a, b) {
        var c = Je(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b) return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Je(c);
        }
      }
      function Le(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Me() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c) a = b.contentWindow;
          else break;
          b = Xa(a.document);
        }
        return b;
      }
      function Ne(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      function Oe(a) {
        var b = Me(), c = a.focusedElem, d = a.selectionRange;
        if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
          if (null !== d && Ne(c)) {
            if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
            else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
              a = a.getSelection();
              var e = c.textContent.length, f = Math.min(d.start, e);
              d = void 0 === d.end ? f : Math.min(d.end, e);
              !a.extend && f > d && (e = d, d = f, f = e);
              e = Ke(c, f);
              var g = Ke(
                c,
                d
              );
              e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
            }
          }
          b = [];
          for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
          "function" === typeof c.focus && c.focus();
          for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      function Ve(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a) {
        if (Xe[a]) return Xe[a];
        if (!We[a]) return a;
        var b = We[a], c;
        for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
        return a;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a, b) {
        df.set(a, b);
        fa(b, [a]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Ub(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b) for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
            else for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
          }
        }
        if (Qb) throw a = Rb, Qb = false, Rb = null, a;
      }
      function D(a, b) {
        var c = b[of];
        void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
        var d = a + "__bubble";
        c.has(d) || (pf(b, a, 2, false), c.add(d));
      }
      function qf(a, b, c) {
        var d = 0;
        b && (d |= 4);
        pf(c, a, d, b);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a) {
        if (!a[rf]) {
          a[rf] = true;
          da.forEach(function(b2) {
            "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
          });
          var b = 9 === a.nodeType ? a : a.ownerDocument;
          null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
        }
      }
      function pf(a, b, c, d) {
        switch (jd(b)) {
          case 1:
            var e = ed;
            break;
          case 4:
            e = gd;
            break;
          default:
            e = fd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function hd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
          if (null === d) return;
          var g = d.tag;
          if (3 === g || 4 === g) {
            var h = d.stateNode.containerInfo;
            if (h === e || 8 === h.nodeType && h.parentNode === e) break;
            if (4 === g) for (g = d.return; null !== g; ) {
              var k = g.tag;
              if (3 === k || 4 === k) {
                if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
              }
              g = g.return;
            }
            for (; null !== h; ) {
              g = Wc(h);
              if (null === g) return;
              k = g.tag;
              if (5 === k || 6 === k) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
        Jb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = df.get(a);
            if (void 0 !== h2) {
              var k2 = td, n = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c)) break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  n = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  n = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k2 = Hd;
                  break;
                case cf:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
              t = [];
              for (var w = d2, u; null !== w; ) {
                u = w;
                var F = u.stateNode;
                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                if (J) break;
                w = w.return;
              }
              0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
                } else k2 = null, n = d2;
                if (k2 !== n) {
                  t = Bd;
                  F = "onMouseLeave";
                  x = "onMouseEnter";
                  w = "mouse";
                  if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                  J = null == k2 ? h2 : ue(k2);
                  u = null == n ? h2 : ue(n);
                  h2 = new t(F, w + "leave", k2, c, e2);
                  h2.target = J;
                  h2.relatedTarget = u;
                  F = null;
                  Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                  J = F;
                  if (k2 && n) b: {
                    t = k2;
                    x = n;
                    w = 0;
                    for (u = t; u; u = vf(u)) w++;
                    u = 0;
                    for (F = x; F; F = vf(F)) u++;
                    for (; 0 < w - u; ) t = vf(t), w--;
                    for (; 0 < u - w; ) x = vf(x), u--;
                    for (; w--; ) {
                      if (t === x || null !== x && t === x.alternate) break b;
                      t = vf(t);
                      x = vf(x);
                    }
                    t = null;
                  }
                  else t = null;
                  null !== k2 && wf(g2, h2, k2, t, false);
                  null !== n && null !== J && wf(g2, J, n, t, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
              else if (me(h2)) if (we) na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
              else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
              if (na && (na = na(a, d2))) {
                ne(g2, na, c, e2);
                break a;
              }
              xa && xa(a, h2, d2);
              "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
            }
            xa = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe) break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var $a;
            if (ae) b: {
              switch (a) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
            else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
          }
          se(g2, b);
        });
      }
      function tf(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function vf(a) {
        if (null === a) return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function wf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d) break;
          5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a) {
        return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
      }
      function Af(a, b, c) {
        b = zf(b);
        if (zf(a) !== b && c) throw Error(p(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a, b) {
        return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
        return Hf.resolve(null).then(a).catch(If);
      } : Ff;
      function If(a) {
        setTimeout(function() {
          throw a;
        });
      }
      function Kf(a, b) {
        var c = b, d = 0;
        do {
          var e = c.nextSibling;
          a.removeChild(c);
          if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
            if (0 === d) {
              a.removeChild(e);
              bd(b);
              return;
            }
            d--;
          } else "$" !== c && "$?" !== c && "$!" !== c || d++;
          c = e;
        } while (c);
        bd(b);
      }
      function Lf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b) break;
          if (8 === b) {
            b = a.data;
            if ("$" === b || "$!" === b || "$?" === b) break;
            if ("/$" === b) return null;
          }
        }
        return a;
      }
      function Mf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b) return a;
              b--;
            } else "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a) {
        var b = a[Of];
        if (b) return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[uf] || c[Of]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
              if (c = a[Of]) return c;
              a = Mf(a);
            }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[Of] || a[uf];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag) return a.stateNode;
        throw Error(p(33));
      }
      function Db(a) {
        return a[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a) {
        return { current: a };
      }
      function E(a) {
        0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a, b) {
        Tf++;
        Sf[Tf] = a.current;
        a.current = b;
      }
      var Vf = {};
      var H = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a, b) {
        var c = a.type.contextTypes;
        if (!c) return Vf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c) e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Zf(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function $f() {
        E(Wf);
        E(H);
      }
      function ag(a, b, c) {
        if (H.current !== Vf) throw Error(p(168));
        G(H, b);
        G(Wf, c);
      }
      function bg(a, b, c) {
        var d = a.stateNode;
        b = b.childContextTypes;
        if ("function" !== typeof d.getChildContext) return c;
        d = d.getChildContext();
        for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
        return A({}, c, d);
      }
      function cg(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H.current;
        G(H, a);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a, b, c) {
        var d = a.stateNode;
        if (!d) throw Error(p(169));
        c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
        G(Wf, c);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a) {
        null === eg ? eg = [a] : eg.push(a);
      }
      function ig(a) {
        fg = true;
        hg(a);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a = 0, b = C;
          try {
            var c = eg;
            for (C = 1; a < c.length; a++) {
              var d = c[a];
              do
                d = d(true);
              while (null !== d);
            }
            eg = null;
            fg = false;
          } catch (e) {
            throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
          } finally {
            C = b, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a, b) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a;
        ng = b;
      }
      function ug(a, b, c) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a;
        var d = rg;
        a = sg;
        var e = 32 - oc(d) - 1;
        d &= ~(1 << e);
        c += 1;
        var f = 32 - oc(b) + e;
        if (30 < f) {
          var g = e - e % 5;
          f = (d & (1 << g) - 1).toString(32);
          d >>= g;
          e -= g;
          rg = 1 << 32 - oc(b) + e | c << e | d;
          sg = f + a;
        } else rg = 1 << f | c << e | d, sg = a;
      }
      function vg(a) {
        null !== a.return && (tg(a, 1), ug(a, 1, 0));
      }
      function wg(a) {
        for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I = false;
      var zg = null;
      function Ag(a, b) {
        var c = Bg(5, null, null, 0);
        c.elementType = "DELETED";
        c.stateNode = b;
        c.return = a;
        b = a.deletions;
        null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
      }
      function Cg(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
          case 13:
            return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a) {
        return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
      }
      function Eg(a) {
        if (I) {
          var b = yg;
          if (b) {
            var c = b;
            if (!Cg(a, b)) {
              if (Dg(a)) throw Error(p(418));
              b = Lf(c.nextSibling);
              var d = xg;
              b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
            }
          } else {
            if (Dg(a)) throw Error(p(418));
            a.flags = a.flags & -4097 | 2;
            I = false;
            xg = a;
          }
        }
      }
      function Fg(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
        xg = a;
      }
      function Gg(a) {
        if (a !== xg) return false;
        if (!I) return Fg(a), I = true, false;
        var b;
        (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
        if (b && (b = yg)) {
          if (Dg(a)) throw Hg(), Error(p(418));
          for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
        }
        Fg(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a) throw Error(p(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    yg = Lf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            yg = null;
          }
        } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a = yg; a; ) a = Lf(a.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I = false;
      }
      function Jg(a) {
        null === zg ? zg = [a] : zg.push(a);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag) throw Error(p(309));
              var d = c.stateNode;
            }
            if (!d) throw Error(p(147, a));
            var e = d, f = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
            b = function(a2) {
              var b2 = e.refs;
              null === a2 ? delete b2[f] : b2[f] = a2;
            };
            b._stringRef = f;
            return b;
          }
          if ("string" !== typeof a) throw Error(p(284));
          if (!c._owner) throw Error(p(290, a));
        }
        return a;
      }
      function Mg(a, b) {
        a = Object.prototype.toString.call(b);
        throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
      }
      function Ng(a) {
        var b = a._init;
        return b(a._payload);
      }
      function Og(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.deletions;
            null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
          }
        }
        function c(c2, d2) {
          if (!a) return null;
          for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Pg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a) return b2.flags |= 1048576, c2;
          d2 = b2.alternate;
          if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
          b2.flags |= 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags |= 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          var f2 = c2.type;
          if (f2 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
          if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
          d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Lg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function m(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function q(a2, b2, c2) {
          if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case va:
                return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
              case wa:
                return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
              case Ha:
                var d2 = b2._init;
                return q(a2, d2(b2._payload), c2);
            }
            if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
            Mg(a2, b2);
          }
          return null;
        }
        function r(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case va:
                return c2.key === e2 ? k(a2, b2, c2, d2) : null;
              case wa:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
              case Ha:
                return e2 = c2._init, r(
                  a2,
                  b2,
                  e2(c2._payload),
                  d2
                );
            }
            if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
            Mg(a2, c2);
          }
          return null;
        }
        function y(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case va:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
              case wa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
              case Ha:
                var f2 = d2._init;
                return y(a2, b2, c2, f2(d2._payload), e2);
            }
            if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
            Mg(b2, d2);
          }
          return null;
        }
        function n(e2, g2, h2, k2) {
          for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
            u.index > w ? (x = u, u = null) : x = u.sibling;
            var n2 = r(e2, u, h2[w], k2);
            if (null === n2) {
              null === u && (u = x);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, w);
            null === m2 ? l2 = n2 : m2.sibling = n2;
            m2 = n2;
            u = x;
          }
          if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
          if (null === u) {
            for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
            I && tg(e2, w);
            return l2;
          }
          for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function t(e2, g2, h2, k2) {
          var l2 = Ka(h2);
          if ("function" !== typeof l2) throw Error(p(150));
          h2 = l2.call(h2);
          if (null == h2) throw Error(p(151));
          for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
            m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
            var t2 = r(e2, m2, n2.value, k2);
            if (null === t2) {
              null === m2 && (m2 = x);
              break;
            }
            a && m2 && null === t2.alternate && b(e2, m2);
            g2 = f(t2, g2, w);
            null === u ? l2 = t2 : u.sibling = t2;
            u = t2;
            m2 = x;
          }
          if (n2.done) return c(
            e2,
            m2
          ), I && tg(e2, w), l2;
          if (null === m2) {
            for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
            I && tg(e2, w);
            return l2;
          }
          for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          a && m2.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function J(a2, d2, f2, h2) {
          "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
          if ("object" === typeof f2 && null !== f2) {
            switch (f2.$$typeof) {
              case va:
                a: {
                  for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                    if (l2.key === k2) {
                      k2 = f2.type;
                      if (k2 === ya) {
                        if (7 === l2.tag) {
                          c(a2, l2.sibling);
                          d2 = e(l2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                      } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props);
                        d2.ref = Lg(a2, l2, f2);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                      c(a2, l2);
                      break;
                    } else b(a2, l2);
                    l2 = l2.sibling;
                  }
                  f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case wa:
                a: {
                  for (l2 = f2.key; null !== d2; ) {
                    if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                    else b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Sg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
              case Ha:
                return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
            }
            if (eb(f2)) return n(a2, d2, f2, h2);
            if (Ka(f2)) return t(a2, d2, f2, h2);
            Mg(a2, f2);
          }
          return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a) {
        var b = Wg.current;
        E(Wg);
        a._currentValue = b;
      }
      function bh(a, b, c) {
        for (; null !== a; ) {
          var d = a.alternate;
          (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
          if (a === c) break;
          a = a.return;
        }
      }
      function ch(a, b) {
        Xg = a;
        Zg = Yg = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
      }
      function eh(a) {
        var b = a._currentValue;
        if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
          if (null === Xg) throw Error(p(308));
          Yg = a;
          Xg.dependencies = { lanes: 0, firstContext: a };
        } else Yg = Yg.next = a;
        return b;
      }
      var fh = null;
      function gh(a) {
        null === fh ? fh = [a] : fh.push(a);
      }
      function hh(a, b, c, d) {
        var e = b.interleaved;
        null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
        b.interleaved = c;
        return ih(a, d);
      }
      function ih(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      var jh = false;
      function kh(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function mh(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a, b, c) {
        var d = a.updateQueue;
        if (null === d) return null;
        d = d.shared;
        if (0 !== (K & 2)) {
          var e = d.pending;
          null === e ? b.next = b : (b.next = e.next, e.next = b);
          d.pending = b;
          return ih(a, c);
        }
        e = d.interleaved;
        null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
        d.interleaved = b;
        return ih(a, c);
      }
      function oh(a, b, c) {
        b = b.updateQueue;
        if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      function ph(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function qh(a, b, c, d) {
        var e = a.updateQueue;
        jh = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var m = a.alternate;
          null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
        }
        if (null !== f) {
          var q = e.baseState;
          g = 0;
          m = l = k = null;
          h = f;
          do {
            var r = h.lane, y = h.eventTime;
            if ((d & r) === r) {
              null !== m && (m = m.next = {
                eventTime: y,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null
              });
              a: {
                var n = a, t = h;
                r = b;
                y = c;
                switch (t.tag) {
                  case 1:
                    n = t.payload;
                    if ("function" === typeof n) {
                      q = n.call(y, q, r);
                      break a;
                    }
                    q = n;
                    break a;
                  case 3:
                    n.flags = n.flags & -65537 | 128;
                  case 0:
                    n = t.payload;
                    r = "function" === typeof n ? n.call(y, q, r) : n;
                    if (null === r || void 0 === r) break a;
                    q = A({}, q, r);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
            } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
            h = h.next;
            if (null === h) if (h = e.shared.pending, null === h) break;
            else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
          } while (1);
          null === m && (k = q);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = m;
          b = e.shared.interleaved;
          if (null !== b) {
            e = b;
            do
              g |= e.lane, e = e.next;
            while (e !== b);
          } else null === f && (e.shared.lanes = 0);
          rh |= g;
          a.lanes = g;
          a.memoizedState = q;
        }
      }
      function sh(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a) for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e) throw Error(p(191, e));
            e.call(d);
          }
        }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a) {
        if (a === th) throw Error(p(174));
        return a;
      }
      function yh(a, b) {
        G(wh, b);
        G(vh, a);
        G(uh, th);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
        }
        E(uh);
        G(uh, b);
      }
      function zh() {
        E(uh);
        E(vh);
        E(wh);
      }
      function Ah(a) {
        xh(wh.current);
        var b = xh(uh.current);
        var c = lb(b, a.type);
        b !== c && (G(vh, a), G(uh, c));
      }
      function Bh(a) {
        vh.current === a && (E(uh), E(vh));
      }
      var L = Uf(0);
      function Ch(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 128)) return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M = null;
      var N = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P() {
        throw Error(p(321));
      }
      function Mh(a, b) {
        if (null === b) return false;
        for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
        return true;
      }
      function Nh(a, b, c, d, e, f) {
        Hh = f;
        M = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
        a = c(d, e);
        if (Jh) {
          f = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f) throw Error(p(301));
            f += 1;
            O = N = null;
            b.updateQueue = null;
            Fh.current = Qh;
            a = c(d, e);
          } while (Jh);
        }
        Fh.current = Rh;
        b = null !== N && null !== N.next;
        Hh = 0;
        O = N = M = null;
        Ih = false;
        if (b) throw Error(p(300));
        return a;
      }
      function Sh() {
        var a = 0 !== Kh;
        Kh = 0;
        return a;
      }
      function Th() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
        return O;
      }
      function Uh() {
        if (null === N) {
          var a = M.alternate;
          a = null !== a ? a.memoizedState : null;
        } else a = N.next;
        var b = null === O ? M.memoizedState : O.next;
        if (null !== b) O = b, N = a;
        else {
          if (null === a) throw Error(p(310));
          N = a;
          a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          null === O ? M.memoizedState = O = a : O = O.next = a;
        }
        return O;
      }
      function Vh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Wh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = N, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          f = e.next;
          d = d.baseState;
          var h = g = null, k = null, l = f;
          do {
            var m = l.lane;
            if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
            else {
              var q = {
                lane: m,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
              };
              null === k ? (h = k = q, g = d) : k = k.next = q;
              M.lanes |= m;
              rh |= m;
            }
            l = l.next;
          } while (null !== l && l !== f);
          null === k ? g = d : k.next = h;
          He(d, b.memoizedState) || (dh = true);
          b.memoizedState = d;
          b.baseState = g;
          b.baseQueue = k;
          c.lastRenderedState = d;
        }
        a = c.interleaved;
        if (null !== a) {
          e = a;
          do
            f = e.lane, M.lanes |= f, rh |= f, e = e.next;
          while (e !== a);
        } else null === e && (c.lanes = 0);
        return [b.memoizedState, c.dispatch];
      }
      function Xh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (dh = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Yh() {
      }
      function Zh(a, b) {
        var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
        f && (d.memoizedState = e, dh = true);
        d = d.queue;
        $h(ai.bind(null, c, d, a), [a]);
        if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
          c.flags |= 2048;
          bi(9, ci.bind(null, c, d, e, b), void 0, null);
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(c, b, e);
        }
        return e;
      }
      function di(a, b, c) {
        a.flags |= 16384;
        a = { getSnapshot: b, value: c };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
      }
      function ci(a, b, c, d) {
        b.value = c;
        b.getSnapshot = d;
        ei(b) && fi(a);
      }
      function ai(a, b, c) {
        return c(function() {
          ei(b) && fi(a);
        });
      }
      function ei(a) {
        var b = a.getSnapshot;
        a = a.value;
        try {
          var c = b();
          return !He(a, c);
        } catch (d) {
          return true;
        }
      }
      function fi(a) {
        var b = ih(a, 1);
        null !== b && gi(b, a, 1, -1);
      }
      function hi(a) {
        var b = Th();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
        b.queue = a;
        a = a.dispatch = ii.bind(null, M, a);
        return [b.memoizedState, a];
      }
      function bi(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a, b, c, d) {
        var e = Th();
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function li(a, b, c, d) {
        var e = Uh();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== N) {
          var g = N.memoizedState;
          f = g.destroy;
          if (null !== d && Mh(d, g.deps)) {
            e.memoizedState = bi(b, c, f, d);
            return;
          }
        }
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, f, d);
      }
      function mi(a, b) {
        return ki(8390656, 8, a, b);
      }
      function $h(a, b) {
        return li(2048, 8, a, b);
      }
      function ni(a, b) {
        return li(4, 2, a, b);
      }
      function oi(a, b) {
        return li(4, 4, a, b);
      }
      function pi(a, b) {
        if ("function" === typeof b) return a = a(), b(a), function() {
          b(null);
        };
        if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
          b.current = null;
        };
      }
      function qi(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return li(4, 4, pi.bind(null, b, a), c);
      }
      function ri() {
      }
      function si(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ti(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function ui(a, b, c) {
        if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
        He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
        return b;
      }
      function vi(a, b) {
        var c = C;
        C = 0 !== c && 4 > c ? c : 4;
        a(true);
        var d = Gh.transition;
        Gh.transition = {};
        try {
          a(false), b();
        } finally {
          C = c, Gh.transition = d;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a, b, c) {
        var d = yi(a);
        c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, c);
        else if (c = hh(a, b, c, d), null !== c) {
          var e = R();
          gi(c, a, d, e);
          Bi(c, b, d);
        }
      }
      function ii(a, b, c) {
        var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, e);
        else {
          var f = a.alternate;
          if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
            var g = b.lastRenderedState, h = f(g, c);
            e.hasEagerState = true;
            e.eagerState = h;
            if (He(h, g)) {
              var k = b.interleaved;
              null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
              b.interleaved = e;
              return;
            }
          } catch (l) {
          } finally {
          }
          c = hh(a, b, e, d);
          null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
        }
      }
      function zi(a) {
        var b = a.alternate;
        return a === M || null !== b && b === M;
      }
      function Ai(a, b) {
        Jh = Ih = true;
        var c = a.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
      function Bi(a, b, c) {
        if (0 !== (c & 4194240)) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a, b) {
        Th().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b, a),
          c
        );
      }, useLayoutEffect: function(a, b) {
        return ki(4194308, 4, a, b);
      }, useInsertionEffect: function(a, b) {
        return ki(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Th();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Th();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        d.queue = a;
        a = a.dispatch = xi.bind(null, M, a);
        return [d.memoizedState, a];
      }, useRef: function(a) {
        var b = Th();
        a = { current: a };
        return b.memoizedState = a;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
        return Th().memoizedState = a;
      }, useTransition: function() {
        var a = hi(false), b = a[0];
        a = vi.bind(null, a[1]);
        Th().memoizedState = a;
        return [b, a];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a, b, c) {
        var d = M, e = Th();
        if (I) {
          if (void 0 === c) throw Error(p(407));
          c = c();
        } else {
          c = b();
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(d, b, c);
        }
        e.memoizedState = c;
        var f = { value: c, getSnapshot: b };
        e.queue = f;
        mi(ai.bind(
          null,
          d,
          f,
          a
        ), [a]);
        d.flags |= 2048;
        bi(9, ci.bind(null, d, f, c, b), void 0, null);
        return c;
      }, useId: function() {
        var a = Th(), b = Q.identifierPrefix;
        if (I) {
          var c = sg;
          var d = rg;
          c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Kh++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a) {
          var b = Uh();
          return ui(b, N.memoizedState, a);
        },
        useTransition: function() {
          var a = Wh(Vh)[0], b = Uh().memoizedState;
          return [a, b];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a) {
        var b = Uh();
        return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
      }, useTransition: function() {
        var a = Xh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a, b) {
        if (a && a.defaultProps) {
          b = A({}, b);
          a = a.defaultProps;
          for (var c in a) void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      function Di(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : A({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Ei = { isMounted: function(a) {
        return (a = a._reactInternals) ? Vb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = R(), d = yi(a), e = mh(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        b = nh(a, e, d);
        null !== b && (gi(b, a, d, c), oh(b, a, d));
      } };
      function Fi(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
      }
      function Gi(a, b, c) {
        var d = false, e = Vf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Ei;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Hi(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
      }
      function Ii(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = {};
        kh(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4194308);
      }
      function Ji(a, b) {
        try {
          var c = "", d = b;
          do
            c += Pa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e, digest: null };
      }
      function Ki(a, b, c) {
        return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
      }
      function Li(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Oi || (Oi = true, Pi = d);
          Li(a, b);
        };
        return c;
      }
      function Qi(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            return d(e);
          };
          c.callback = function() {
            Li(a, b);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          Li(a, b);
          "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      function Si(a, b, c) {
        var d = a.pingCache;
        if (null === d) {
          d = a.pingCache = new Mi();
          var e = /* @__PURE__ */ new Set();
          d.set(b, e);
        } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
        e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
      }
      function Ui(a) {
        do {
          var b;
          if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
          if (b) return a;
          a = a.return;
        } while (null !== a);
        return null;
      }
      function Vi(a, b, c, d, e) {
        if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
        a.flags |= 65536;
        a.lanes = e;
        return a;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a, b, c, d) {
        b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
      }
      function Yi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        ch(b, e);
        d = Nh(a, b, c, d, f, e);
        c = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && c && vg(b);
        b.flags |= 1;
        Xi(a, b, d, e);
        return b.child;
      }
      function $i(a, b, c, d, e) {
        if (null === a) {
          var f = c.type;
          if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
          a = Rg(c.type, null, d, b, b.mode, e);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        f = a.child;
        if (0 === (a.lanes & e)) {
          var g = f.memoizedProps;
          c = c.compare;
          c = null !== c ? c : Ie;
          if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
        }
        b.flags |= 1;
        a = Pg(f, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function bj(a, b, c, d, e) {
        if (null !== a) {
          var f = a.memoizedProps;
          if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
          else return b.lanes = a.lanes, Zi(a, b, e);
        }
        return cj(a, b, c, d, e);
      }
      function dj(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
        else {
          if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
          d = null !== f ? f.baseLanes : c;
          G(ej, fj);
          fj |= d;
        }
        else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
        Xi(a, b, e, c);
        return b.child;
      }
      function gj(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
      }
      function cj(a, b, c, d, e) {
        var f = Zf(c) ? Xf : H.current;
        f = Yf(b, f);
        ch(b, e);
        c = Nh(a, b, c, d, f, e);
        d = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && d && vg(b);
        b.flags |= 1;
        Xi(a, b, c, e);
        return b.child;
      }
      function hj(a, b, c, d, e) {
        if (Zf(c)) {
          var f = true;
          cg(b);
        } else f = false;
        ch(b, e);
        if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
          var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
          q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
          jh = false;
          var r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          k = b.memoizedState;
          h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
        } else {
          g = b.stateNode;
          lh(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : Ci(b.type, h);
          g.props = l;
          q = b.pendingProps;
          r = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
          var y = c.getDerivedStateFromProps;
          (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
          jh = false;
          r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          var n = b.memoizedState;
          h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
        }
        return jj(a, b, c, d, f, e);
      }
      function jj(a, b, c, d, e, f) {
        gj(a, b);
        var g = 0 !== (b.flags & 128);
        if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
        d = b.stateNode;
        Wi.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
        b.memoizedState = d.state;
        e && dg(b, c, true);
        return b.child;
      }
      function kj(a) {
        var b = a.stateNode;
        b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
        yh(a, b.containerInfo);
      }
      function lj(a, b, c, d, e) {
        Ig();
        Jg(e);
        b.flags |= 256;
        Xi(a, b, c, d);
        return b.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a) {
        return { baseLanes: a, cachePool: null, transitions: null };
      }
      function oj(a, b, c) {
        var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
        (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        if (h) f = true, b.flags &= -129;
        else if (null === a || null !== a.memoizedState) e |= 1;
        G(L, e & 1);
        if (null === a) {
          Eg(b);
          a = b.memoizedState;
          if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
          g = d.children;
          a = d.fallback;
          return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
        }
        e = a.memoizedState;
        if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
        if (f) {
          f = d.fallback;
          g = b.mode;
          e = a.child;
          h = e.sibling;
          var k = { mode: "hidden", children: d.children };
          0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
          null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
          f.return = b;
          d.return = b;
          d.sibling = f;
          b.child = d;
          d = f;
          f = b.child;
          g = a.child.memoizedState;
          g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
          f.memoizedState = g;
          f.childLanes = a.childLanes & ~c;
          b.memoizedState = mj;
          return d;
        }
        f = a.child;
        a = f.sibling;
        d = Pg(f, { mode: "visible", children: d.children });
        0 === (b.mode & 1) && (d.lanes = c);
        d.return = b;
        d.sibling = null;
        null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
        b.child = d;
        b.memoizedState = null;
        return d;
      }
      function qj(a, b) {
        b = pj({ mode: "visible", children: b }, a.mode, 0, null);
        b.return = a;
        return a.child = b;
      }
      function sj(a, b, c, d) {
        null !== d && Jg(d);
        Ug(b, a.child, null, c);
        a = qj(b, b.pendingProps.children);
        a.flags |= 2;
        b.memoizedState = null;
        return a;
      }
      function rj(a, b, c, d, e, f, g) {
        if (c) {
          if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
          if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
          f = d.fallback;
          e = b.mode;
          d = pj({ mode: "visible", children: d.children }, e, 0, null);
          f = Tg(f, e, g, null);
          f.flags |= 2;
          d.return = b;
          f.return = b;
          d.sibling = f;
          b.child = d;
          0 !== (b.mode & 1) && Ug(b, a.child, null, g);
          b.child.memoizedState = nj(g);
          b.memoizedState = mj;
          return f;
        }
        if (0 === (b.mode & 1)) return sj(a, b, g, null);
        if ("$!" === e.data) {
          d = e.nextSibling && e.nextSibling.dataset;
          if (d) var h = d.dgst;
          d = h;
          f = Error(p(419));
          d = Ki(f, d, void 0);
          return sj(a, b, g, d);
        }
        h = 0 !== (g & a.childLanes);
        if (dh || h) {
          d = Q;
          if (null !== d) {
            switch (g & -g) {
              case 4:
                e = 2;
                break;
              case 16:
                e = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e = 32;
                break;
              case 536870912:
                e = 268435456;
                break;
              default:
                e = 0;
            }
            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
          }
          tj();
          d = Ki(Error(p(421)));
          return sj(a, b, g, d);
        }
        if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
        a = f.treeContext;
        yg = Lf(e.nextSibling);
        xg = b;
        I = true;
        zg = null;
        null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
        b = qj(b, d.children);
        b.flags |= 4096;
        return b;
      }
      function vj(a, b, c) {
        a.lanes |= b;
        var d = a.alternate;
        null !== d && (d.lanes |= b);
        bh(a.return, b, c);
      }
      function wj(a, b, c, d, e) {
        var f = a.memoizedState;
        null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
      }
      function xj(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        Xi(a, b, d.children, c);
        d = L.current;
        if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
        else {
          if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
            if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
            else if (19 === a.tag) vj(a, c, b);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b) break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b) break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
          d &= 1;
        }
        G(L, d);
        if (0 === (b.mode & 1)) b.memoizedState = null;
        else switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            wj(b, false, e, c, f);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; null !== e; ) {
              a = e.alternate;
              if (null !== a && null === Ch(a)) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            wj(b, true, c, null, f);
            break;
          case "together":
            wj(b, false, null, null, void 0);
            break;
          default:
            b.memoizedState = null;
        }
        return b.child;
      }
      function ij(a, b) {
        0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      }
      function Zi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        rh |= b.lanes;
        if (0 === (c & b.childLanes)) return null;
        if (null !== a && b.child !== a.child) throw Error(p(153));
        if (null !== b.child) {
          a = b.child;
          c = Pg(a, a.pendingProps);
          b.child = c;
          for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      function yj(a, b, c) {
        switch (b.tag) {
          case 3:
            kj(b);
            Ig();
            break;
          case 5:
            Ah(b);
            break;
          case 1:
            Zf(b.type) && cg(b);
            break;
          case 4:
            yh(b, b.stateNode.containerInfo);
            break;
          case 10:
            var d = b.type._context, e = b.memoizedProps.value;
            G(Wg, d._currentValue);
            d._currentValue = e;
            break;
          case 13:
            d = b.memoizedState;
            if (null !== d) {
              if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
              if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
              G(L, L.current & 1);
              a = Zi(a, b, c);
              return null !== a ? a.sibling : null;
            }
            G(L, L.current & 1);
            break;
          case 19:
            d = 0 !== (c & b.childLanes);
            if (0 !== (a.flags & 128)) {
              if (d) return xj(a, b, c);
              b.flags |= 128;
            }
            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            G(L, L.current);
            if (d) break;
            else return null;
          case 22:
          case 23:
            return b.lanes = 0, dj(a, b, c);
        }
        return Zi(a, b, c);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b) return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          xh(uh.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "select":
              e = A({}, e, { value: void 0 });
              d = A({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
          }
          ub(c, d);
          var g;
          c = null;
          for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
            var h = e[l];
            for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
              for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else c || (f || (f = []), f.push(
              l,
              c
            )), c = k;
            else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
          }
          c && (f = f || []).push("style", c);
          var l = f;
          if (b.updateQueue = l) b.flags |= 4;
        }
      };
      Cj = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Dj(a, b) {
        if (!I) switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
      }
      function S(a) {
        var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
        if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
        else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
        a.subtreeFlags |= d;
        a.childLanes = c;
        return b;
      }
      function Ej(a, b, c) {
        var d = b.pendingProps;
        wg(b);
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S(b), null;
          case 1:
            return Zf(b.type) && $f(), S(b), null;
          case 3:
            d = b.stateNode;
            zh();
            E(Wf);
            E(H);
            Eh();
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a, b);
            S(b);
            return null;
          case 5:
            Bh(b);
            var e = xh(wh.current);
            c = b.type;
            if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            else {
              if (!d) {
                if (null === b.stateNode) throw Error(p(166));
                S(b);
                return null;
              }
              a = xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[Of] = b;
                d[Pf] = f;
                a = 0 !== (b.mode & 1);
                switch (c) {
                  case "dialog":
                    D("cancel", d);
                    D("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], d);
                    break;
                  case "source":
                    D("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d
                    );
                    D("load", d);
                    break;
                  case "details":
                    D("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    D("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    D("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), D("invalid", d);
                }
                ub(c, f);
                e = null;
                for (var g in f) if (f.hasOwnProperty(g)) {
                  var h = f[g];
                  "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                    d.textContent,
                    h,
                    a
                  ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                }
                switch (c) {
                  case "input":
                    Va(d);
                    db(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = Bf);
                }
                d = e;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[Of] = b;
                a[Pf] = d;
                zj(a, b, false, false);
                b.stateNode = a;
                a: {
                  g = vb(c, d);
                  switch (c) {
                    case "dialog":
                      D("cancel", a);
                      D("close", a);
                      e = d;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a);
                      e = d;
                      break;
                    case "video":
                    case "audio":
                      for (e = 0; e < lf.length; e++) D(lf[e], a);
                      e = d;
                      break;
                    case "source":
                      D("error", a);
                      e = d;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a
                      );
                      D("load", a);
                      e = d;
                      break;
                    case "details":
                      D("toggle", a);
                      e = d;
                      break;
                    case "input":
                      Za(a, d);
                      e = Ya(a, d);
                      D("invalid", a);
                      break;
                    case "option":
                      e = d;
                      break;
                    case "select":
                      a._wrapperState = { wasMultiple: !!d.multiple };
                      e = A({}, d, { value: void 0 });
                      D("invalid", a);
                      break;
                    case "textarea":
                      hb(a, d);
                      e = gb(a, d);
                      D("invalid", a);
                      break;
                    default:
                      e = d;
                  }
                  ub(c, e);
                  h = e;
                  for (f in h) if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                  }
                  switch (c) {
                    case "input":
                      Va(a);
                      db(a, d, false);
                      break;
                    case "textarea":
                      Va(a);
                      jb(a);
                      break;
                    case "option":
                      null != d.value && a.setAttribute("value", "" + Sa(d.value));
                      break;
                    case "select":
                      a.multiple = !!d.multiple;
                      f = d.value;
                      null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                        a,
                        !!d.multiple,
                        d.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e.onClick && (a.onclick = Bf);
                  }
                  switch (c) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d = !!d.autoFocus;
                      break a;
                    case "img":
                      d = true;
                      break a;
                    default:
                      d = false;
                  }
                }
                d && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            }
            S(b);
            return null;
          case 6:
            if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
              c = xh(wh.current);
              xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.memoizedProps;
                d[Of] = b;
                if (f = d.nodeValue !== c) {
                  if (a = xg, null !== a) switch (a.tag) {
                    case 3:
                      Af(d.nodeValue, c, 0 !== (a.mode & 1));
                      break;
                    case 5:
                      true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  }
                }
                f && (b.flags |= 4);
              } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
            }
            S(b);
            return null;
          case 13:
            E(L);
            d = b.memoizedState;
            if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
              if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
              else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                if (null === a) {
                  if (!f) throw Error(p(318));
                  f = b.memoizedState;
                  f = null !== f ? f.dehydrated : null;
                  if (!f) throw Error(p(317));
                  f[Of] = b;
                } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
                S(b);
                f = false;
              } else null !== zg && (Fj(zg), zg = null), f = true;
              if (!f) return b.flags & 65536 ? b : null;
            }
            if (0 !== (b.flags & 128)) return b.lanes = c, b;
            d = null !== d;
            d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
            null !== b.updateQueue && (b.flags |= 4);
            S(b);
            return null;
          case 4:
            return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
          case 10:
            return ah(b.type._context), S(b), null;
          case 17:
            return Zf(b.type) && $f(), S(b), null;
          case 19:
            E(L);
            f = b.memoizedState;
            if (null === f) return S(b), null;
            d = 0 !== (b.flags & 128);
            g = f.rendering;
            if (null === g) if (d) Dj(f, false);
            else {
              if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
                g = Ch(a);
                if (null !== g) {
                  b.flags |= 128;
                  Dj(f, false);
                  d = g.updateQueue;
                  null !== d && (b.updateQueue = d, b.flags |= 4);
                  b.subtreeFlags = 0;
                  d = c;
                  for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                  G(L, L.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
              null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
            }
            else {
              if (!d) if (a = Ch(g), null !== a) {
                if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
              } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
              f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
            }
            if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
            S(b);
            return null;
          case 22:
          case 23:
            return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p(156, b.tag));
      }
      function Ij(a, b) {
        wg(b);
        switch (b.tag) {
          case 1:
            return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 3:
            return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
          case 5:
            return Bh(b), null;
          case 13:
            E(L);
            a = b.memoizedState;
            if (null !== a && null !== a.dehydrated) {
              if (null === b.alternate) throw Error(p(340));
              Ig();
            }
            a = b.flags;
            return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 19:
            return E(L), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V = null;
      function Lj(a, b) {
        var c = a.ref;
        if (null !== c) if ("function" === typeof c) try {
          c(null);
        } catch (d) {
          W(a, b, d);
        }
        else c.current = null;
      }
      function Mj(a, b, c) {
        try {
          c();
        } catch (d) {
          W(a, b, d);
        }
      }
      var Nj = false;
      function Oj(a, b) {
        Cf = dd;
        a = Me();
        if (Ne(a)) {
          if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
          else a: {
            c = (c = a.ownerDocument) && c.defaultView || window;
            var d = c.getSelection && c.getSelection();
            if (d && 0 !== d.rangeCount) {
              c = d.anchorNode;
              var e = d.anchorOffset, f = d.focusNode;
              d = d.focusOffset;
              try {
                c.nodeType, f.nodeType;
              } catch (F) {
                c = null;
                break a;
              }
              var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
              b: for (; ; ) {
                for (var y; ; ) {
                  q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                  q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                  3 === q.nodeType && (g += q.nodeValue.length);
                  if (null === (y = q.firstChild)) break;
                  r = q;
                  q = y;
                }
                for (; ; ) {
                  if (q === a) break b;
                  r === c && ++l === e && (h = g);
                  r === f && ++m === d && (k = g);
                  if (null !== (y = q.nextSibling)) break;
                  q = r;
                  r = q.parentNode;
                }
                q = y;
              }
              c = -1 === h || -1 === k ? null : { start: h, end: k };
            } else c = null;
          }
          c = c || { start: 0, end: 0 };
        } else c = null;
        Df = { focusedElem: a, selectionRange: c };
        dd = false;
        for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
        else for (; null !== V; ) {
          b = V;
          try {
            var n = b.alternate;
            if (0 !== (b.flags & 1024)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n) {
                  var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                  x.__reactInternalSnapshotBeforeUpdate = w;
                }
                break;
              case 3:
                var u = b.stateNode.containerInfo;
                1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
          } catch (F) {
            W(b, b.return, F);
          }
          a = b.sibling;
          if (null !== a) {
            a.return = b.return;
            V = a;
            break;
          }
          V = b.return;
        }
        n = Nj;
        Nj = false;
        return n;
      }
      function Pj(a, b, c) {
        var d = b.updateQueue;
        d = null !== d ? d.lastEffect : null;
        if (null !== d) {
          var e = d = d.next;
          do {
            if ((e.tag & a) === a) {
              var f = e.destroy;
              e.destroy = void 0;
              void 0 !== f && Mj(b, c, f);
            }
            e = e.next;
          } while (e !== d);
        }
      }
      function Qj(a, b) {
        b = b.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.create;
              c.destroy = d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Rj(a) {
        var b = a.ref;
        if (null !== b) {
          var c = a.stateNode;
          switch (a.tag) {
            case 5:
              a = c;
              break;
            default:
              a = c;
          }
          "function" === typeof b ? b(a) : b.current = a;
        }
      }
      function Sj(a) {
        var b = a.alternate;
        null !== b && (a.alternate = null, Sj(b));
        a.child = null;
        a.deletions = null;
        a.sibling = null;
        5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
        a.stateNode = null;
        a.return = null;
        a.dependencies = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.stateNode = null;
        a.updateQueue = null;
      }
      function Tj(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function Uj(a) {
        a: for (; ; ) {
          for (; null === a.sibling; ) {
            if (null === a.return || Tj(a.return)) return null;
            a = a.return;
          }
          a.sibling.return = a.return;
          for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
            if (a.flags & 2) continue a;
            if (null === a.child || 4 === a.tag) continue a;
            else a.child.return = a, a = a.child;
          }
          if (!(a.flags & 2)) return a.stateNode;
        }
      }
      function Vj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
        else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
      }
      function Wj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
      }
      var X = null;
      var Xj = false;
      function Yj(a, b, c) {
        for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
      }
      function Zj(a, b, c) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
          lc.onCommitFiberUnmount(kc, c);
        } catch (h) {
        }
        switch (c.tag) {
          case 5:
            U || Lj(c, b);
          case 6:
            var d = X, e = Xj;
            X = null;
            Yj(a, b, c);
            X = d;
            Xj = e;
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
            break;
          case 18:
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
            break;
          case 4:
            d = X;
            e = Xj;
            X = c.stateNode.containerInfo;
            Xj = true;
            Yj(a, b, c);
            X = d;
            Xj = e;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
              e = d = d.next;
              do {
                var f = e, g = f.destroy;
                f = f.tag;
                void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
                e = e.next;
              } while (e !== d);
            }
            Yj(a, b, c);
            break;
          case 1:
            if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
              d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
            } catch (h) {
              W(c, b, h);
            }
            Yj(a, b, c);
            break;
          case 21:
            Yj(a, b, c);
            break;
          case 22:
            c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
            break;
          default:
            Yj(a, b, c);
        }
      }
      function ak(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Kj());
          b.forEach(function(b2) {
            var d = bk.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function ck(a, b) {
        var c = b.deletions;
        if (null !== c) for (var d = 0; d < c.length; d++) {
          var e = c[d];
          try {
            var f = a, g = b, h = g;
            a: for (; null !== h; ) {
              switch (h.tag) {
                case 5:
                  X = h.stateNode;
                  Xj = false;
                  break a;
                case 3:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
                case 4:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
              }
              h = h.return;
            }
            if (null === X) throw Error(p(160));
            Zj(f, g, e);
            X = null;
            Xj = false;
            var k = e.alternate;
            null !== k && (k.return = null);
            e.return = null;
          } catch (l) {
            W(e, b, l);
          }
        }
        if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
      }
      function dk(a, b) {
        var c = a.alternate, d = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b, a);
            ek(a);
            if (d & 4) {
              try {
                Pj(3, a, a.return), Qj(3, a);
              } catch (t) {
                W(a, a.return, t);
              }
              try {
                Pj(5, a, a.return);
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 1:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            break;
          case 5:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            if (a.flags & 32) {
              var e = a.stateNode;
              try {
                ob(e, "");
              } catch (t) {
                W(a, a.return, t);
              }
            }
            if (d & 4 && (e = a.stateNode, null != e)) {
              var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
              a.updateQueue = null;
              if (null !== k) try {
                "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                vb(h, g);
                var l = vb(h, f);
                for (g = 0; g < k.length; g += 2) {
                  var m = k[g], q = k[g + 1];
                  "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                }
                switch (h) {
                  case "input":
                    bb(e, f);
                    break;
                  case "textarea":
                    ib(e, f);
                    break;
                  case "select":
                    var r = e._wrapperState.wasMultiple;
                    e._wrapperState.wasMultiple = !!f.multiple;
                    var y = f.value;
                    null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                      e,
                      !!f.multiple,
                      f.defaultValue,
                      true
                    ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                }
                e[Pf] = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 6:
            ck(b, a);
            ek(a);
            if (d & 4) {
              if (null === a.stateNode) throw Error(p(162));
              e = a.stateNode;
              f = a.memoizedProps;
              try {
                e.nodeValue = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 3:
            ck(b, a);
            ek(a);
            if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
              bd(b.containerInfo);
            } catch (t) {
              W(a, a.return, t);
            }
            break;
          case 4:
            ck(b, a);
            ek(a);
            break;
          case 13:
            ck(b, a);
            ek(a);
            e = a.child;
            e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
            d & 4 && ak(a);
            break;
          case 22:
            m = null !== c && null !== c.memoizedState;
            a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
            ek(a);
            if (d & 8192) {
              l = null !== a.memoizedState;
              if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
                for (q = V = m; null !== V; ) {
                  r = V;
                  y = r.child;
                  switch (r.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pj(4, r, r.return);
                      break;
                    case 1:
                      Lj(r, r.return);
                      var n = r.stateNode;
                      if ("function" === typeof n.componentWillUnmount) {
                        d = r;
                        c = r.return;
                        try {
                          b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                        } catch (t) {
                          W(d, c, t);
                        }
                      }
                      break;
                    case 5:
                      Lj(r, r.return);
                      break;
                    case 22:
                      if (null !== r.memoizedState) {
                        gk(q);
                        continue;
                      }
                  }
                  null !== y ? (y.return = r, V = y) : gk(q);
                }
                m = m.sibling;
              }
              a: for (m = null, q = a; ; ) {
                if (5 === q.tag) {
                  if (null === m) {
                    m = q;
                    try {
                      e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                    } catch (t) {
                      W(a, a.return, t);
                    }
                  }
                } else if (6 === q.tag) {
                  if (null === m) try {
                    q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                  } catch (t) {
                    W(a, a.return, t);
                  }
                } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                  q.child.return = q;
                  q = q.child;
                  continue;
                }
                if (q === a) break a;
                for (; null === q.sibling; ) {
                  if (null === q.return || q.return === a) break a;
                  m === q && (m = null);
                  q = q.return;
                }
                m === q && (m = null);
                q.sibling.return = q.return;
                q = q.sibling;
              }
            }
            break;
          case 19:
            ck(b, a);
            ek(a);
            d & 4 && ak(a);
            break;
          case 21:
            break;
          default:
            ck(
              b,
              a
            ), ek(a);
        }
      }
      function ek(a) {
        var b = a.flags;
        if (b & 2) {
          try {
            a: {
              for (var c = a.return; null !== c; ) {
                if (Tj(c)) {
                  var d = c;
                  break a;
                }
                c = c.return;
              }
              throw Error(p(160));
            }
            switch (d.tag) {
              case 5:
                var e = d.stateNode;
                d.flags & 32 && (ob(e, ""), d.flags &= -33);
                var f = Uj(a);
                Wj(a, f, e);
                break;
              case 3:
              case 4:
                var g = d.stateNode.containerInfo, h = Uj(a);
                Vj(a, h, g);
                break;
              default:
                throw Error(p(161));
            }
          } catch (k) {
            W(a, a.return, k);
          }
          a.flags &= -3;
        }
        b & 4096 && (a.flags &= -4097);
      }
      function hk(a, b, c) {
        V = a;
        ik(a, b, c);
      }
      function ik(a, b, c) {
        for (var d = 0 !== (a.mode & 1); null !== V; ) {
          var e = V, f = e.child;
          if (22 === e.tag && d) {
            var g = null !== e.memoizedState || Jj;
            if (!g) {
              var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
              h = Jj;
              var l = U;
              Jj = g;
              if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
              for (; null !== f; ) V = f, ik(f, b, c), f = f.sibling;
              V = e;
              Jj = h;
              U = l;
            }
            kk(a, b, c);
          } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
        }
      }
      function kk(a) {
        for (; null !== V; ) {
          var b = V;
          if (0 !== (b.flags & 8772)) {
            var c = b.alternate;
            try {
              if (0 !== (b.flags & 8772)) switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  U || Qj(5, b);
                  break;
                case 1:
                  var d = b.stateNode;
                  if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                  else {
                    var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                  }
                  var f = b.updateQueue;
                  null !== f && sh(b, f, d);
                  break;
                case 3:
                  var g = b.updateQueue;
                  if (null !== g) {
                    c = null;
                    if (null !== b.child) switch (b.child.tag) {
                      case 5:
                        c = b.child.stateNode;
                        break;
                      case 1:
                        c = b.child.stateNode;
                    }
                    sh(b, g, c);
                  }
                  break;
                case 5:
                  var h = b.stateNode;
                  if (null === c && b.flags & 4) {
                    c = h;
                    var k = b.memoizedProps;
                    switch (b.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k.autoFocus && c.focus();
                        break;
                      case "img":
                        k.src && (c.src = k.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (null === b.memoizedState) {
                    var l = b.alternate;
                    if (null !== l) {
                      var m = l.memoizedState;
                      if (null !== m) {
                        var q = m.dehydrated;
                        null !== q && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p(163));
              }
              U || b.flags & 512 && Rj(b);
            } catch (r) {
              W(b, b.return, r);
            }
          }
          if (b === a) {
            V = null;
            break;
          }
          c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function gk(a) {
        for (; null !== V; ) {
          var b = V;
          if (b === a) {
            V = null;
            break;
          }
          var c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function jk(a) {
        for (; null !== V; ) {
          var b = V;
          try {
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                var c = b.return;
                try {
                  Qj(4, b);
                } catch (k) {
                  W(b, c, k);
                }
                break;
              case 1:
                var d = b.stateNode;
                if ("function" === typeof d.componentDidMount) {
                  var e = b.return;
                  try {
                    d.componentDidMount();
                  } catch (k) {
                    W(b, e, k);
                  }
                }
                var f = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, f, k);
                }
                break;
              case 5:
                var g = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, g, k);
                }
            }
          } catch (k) {
            W(b, b.return, k);
          }
          if (b === a) {
            V = null;
            break;
          }
          var h = b.sibling;
          if (null !== h) {
            h.return = b.return;
            V = h;
            break;
          }
          V = b.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z = 0;
      var fj = 0;
      var ej = Uf(0);
      var T = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R() {
        return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
      }
      function yi(a) {
        if (0 === (a.mode & 1)) return 1;
        if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
        if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
        a = C;
        if (0 !== a) return a;
        a = window.event;
        a = void 0 === a ? 16 : jd(a.type);
        return a;
      }
      function gi(a, b, c, d) {
        if (50 < yk) throw yk = 0, zk = null, Error(p(185));
        Ac(a, c, d);
        if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
      }
      function Dk(a, b) {
        var c = a.callbackNode;
        wc(a, b);
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
        else if (b = d & -d, a.callbackPriority !== b) {
          null != c && bc(c);
          if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
            0 === (K & 6) && jg();
          }), c = null;
          else {
            switch (Dc(d)) {
              case 1:
                c = fc;
                break;
              case 4:
                c = gc;
                break;
              case 16:
                c = hc;
                break;
              case 536870912:
                c = jc;
                break;
              default:
                c = hc;
            }
            c = Fk(c, Gk.bind(null, a));
          }
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Gk(a, b) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6)) throw Error(p(327));
        var c = a.callbackNode;
        if (Hk() && a.callbackNode !== c) return null;
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) return null;
        if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
        else {
          b = d;
          var e = K;
          K |= 2;
          var f = Jk();
          if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
          do
            try {
              Lk();
              break;
            } catch (h) {
              Mk(a, h);
            }
          while (1);
          $g();
          mk.current = f;
          K = e;
          null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
        }
        if (0 !== b) {
          2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
          if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          if (6 === b) Ck(a, d);
          else {
            e = a.current.alternate;
            if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
            a.finishedWork = e;
            a.finishedLanes = d;
            switch (b) {
              case 0:
              case 1:
                throw Error(p(345));
              case 2:
                Pk(a, tk, uk);
                break;
              case 3:
                Ck(a, d);
                if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                  if (0 !== uc(a, 0)) break;
                  e = a.suspendedLanes;
                  if ((e & d) !== d) {
                    R();
                    a.pingedLanes |= a.suspendedLanes & e;
                    break;
                  }
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 4:
                Ck(a, d);
                if ((d & 4194240) === d) break;
                b = a.eventTimes;
                for (e = -1; 0 < d; ) {
                  var g = 31 - oc(d);
                  f = 1 << g;
                  g = b[g];
                  g > e && (e = g);
                  d &= ~f;
                }
                d = e;
                d = B() - d;
                d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                if (10 < d) {
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 5:
                Pk(a, tk, uk);
                break;
              default:
                throw Error(p(329));
            }
          }
        }
        Dk(a, B());
        return a.callbackNode === c ? Gk.bind(null, a) : null;
      }
      function Nk(a, b) {
        var c = sk;
        a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
        a = Ik(a, b);
        2 !== a && (b = tk, tk = c, null !== b && Fj(b));
        return a;
      }
      function Fj(a) {
        null === tk ? tk = a : tk.push.apply(tk, a);
      }
      function Ok(a) {
        for (var b = a; ; ) {
          if (b.flags & 16384) {
            var c = b.updateQueue;
            if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
              var e = c[d], f = e.getSnapshot;
              e = e.value;
              try {
                if (!He(f(), e)) return false;
              } catch (g) {
                return false;
              }
            }
          }
          c = b.child;
          if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
          else {
            if (b === a) break;
            for (; null === b.sibling; ) {
              if (null === b.return || b.return === a) return true;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return true;
      }
      function Ck(a, b) {
        b &= ~rk;
        b &= ~qk;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - oc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Ek(a) {
        if (0 !== (K & 6)) throw Error(p(327));
        Hk();
        var b = uc(a, 0);
        if (0 === (b & 1)) return Dk(a, B()), null;
        var c = Ik(a, b);
        if (0 !== a.tag && 2 === c) {
          var d = xc(a);
          0 !== d && (b = d, c = Nk(a, d));
        }
        if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
        if (6 === c) throw Error(p(345));
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Pk(a, tk, uk);
        Dk(a, B());
        return null;
      }
      function Qk(a, b) {
        var c = K;
        K |= 1;
        try {
          return a(b);
        } finally {
          K = c, 0 === K && (Gj = B() + 500, fg && jg());
        }
      }
      function Rk(a) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b = K;
        K |= 1;
        var c = ok.transition, d = C;
        try {
          if (ok.transition = null, C = 1, a) return a();
        } finally {
          C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E(ej);
      }
      function Kk(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, Gf(c));
        if (null !== Y) for (c = Y.return; null !== c; ) {
          var d = c;
          wg(d);
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              null !== d && void 0 !== d && $f();
              break;
            case 3:
              zh();
              E(Wf);
              E(H);
              Eh();
              break;
            case 5:
              Bh(d);
              break;
            case 4:
              zh();
              break;
            case 13:
              E(L);
              break;
            case 19:
              E(L);
              break;
            case 10:
              ah(d.type._context);
              break;
            case 22:
            case 23:
              Hj();
          }
          c = c.return;
        }
        Q = a;
        Y = a = Pg(a.current, null);
        Z = fj = b;
        T = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
            c.interleaved = null;
            var e = d.next, f = c.pending;
            if (null !== f) {
              var g = f.next;
              f.next = e;
              d.next = g;
            }
            c.pending = d;
          }
          fh = null;
        }
        return a;
      }
      function Mk(a, b) {
        do {
          var c = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d = M.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N = M = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c || null === c.return) {
              T = 1;
              pk = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = Z;
              h.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k, m = h, q = m.tag;
                if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r = m.alternate;
                  r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
                }
                var y = Ui(g);
                if (null !== y) {
                  y.flags &= -257;
                  Vi(y, g, h, f, b);
                  y.mode & 1 && Si(f, l, b);
                  b = y;
                  k = l;
                  var n = b.updateQueue;
                  if (null === n) {
                    var t = /* @__PURE__ */ new Set();
                    t.add(k);
                    b.updateQueue = t;
                  } else n.add(k);
                  break a;
                } else {
                  if (0 === (b & 1)) {
                    Si(f, l, b);
                    tj();
                    break a;
                  }
                  k = Error(p(426));
                }
              } else if (I && h.mode & 1) {
                var J = Ui(g);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g, h, f, b);
                  Jg(Ji(k, h));
                  break a;
                }
              }
              f = k = Ji(k, h);
              4 !== T && (T = 2);
              null === sk ? sk = [f] : sk.push(f);
              f = g;
              do {
                switch (f.tag) {
                  case 3:
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var x = Ni(f, k, b);
                    ph(f, x);
                    break a;
                  case 1:
                    h = k;
                    var w = f.type, u = f.stateNode;
                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                      f.flags |= 65536;
                      b &= -b;
                      f.lanes |= b;
                      var F = Qi(f, h, b);
                      ph(f, F);
                      break a;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Sk(c);
          } catch (na) {
            b = na;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a = mk.current;
        mk.current = Rh;
        return null === a ? Rh : a;
      }
      function tj() {
        if (0 === T || 3 === T || 2 === T) T = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
      }
      function Ik(a, b) {
        var c = K;
        K |= 2;
        var d = Jk();
        if (Q !== a || Z !== b) uk = null, Kk(a, b);
        do
          try {
            Tk();
            break;
          } catch (e) {
            Mk(a, e);
          }
        while (1);
        $g();
        K = c;
        mk.current = d;
        if (null !== Y) throw Error(p(261));
        Q = null;
        Z = 0;
        return T;
      }
      function Tk() {
        for (; null !== Y; ) Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); ) Uk(Y);
      }
      function Uk(a) {
        var b = Vk(a.alternate, a, fj);
        a.memoizedProps = a.pendingProps;
        null === b ? Sk(a) : Y = b;
        nk.current = null;
      }
      function Sk(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 32768)) {
            if (c = Ej(c, b, fj), null !== c) {
              Y = c;
              return;
            }
          } else {
            c = Ij(c, b);
            if (null !== c) {
              c.flags &= 32767;
              Y = c;
              return;
            }
            if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
            else {
              T = 6;
              Y = null;
              return;
            }
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === T && (T = 5);
      }
      function Pk(a, b, c) {
        var d = C, e = ok.transition;
        try {
          ok.transition = null, C = 1, Wk(a, b, c, d);
        } finally {
          ok.transition = e, C = d;
        }
        return null;
      }
      function Wk(a, b, c, d) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6)) throw Error(p(327));
        c = a.finishedWork;
        var e = a.finishedLanes;
        if (null === c) return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current) throw Error(p(177));
        a.callbackNode = null;
        a.callbackPriority = 0;
        var f = c.lanes | c.childLanes;
        Bc(a, f);
        a === Q && (Y = Q = null, Z = 0);
        0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f = 0 !== (c.flags & 15990);
        if (0 !== (c.subtreeFlags & 15990) || f) {
          f = ok.transition;
          ok.transition = null;
          var g = C;
          C = 1;
          var h = K;
          K |= 4;
          nk.current = null;
          Oj(a, c);
          dk(c, a);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a.current = c;
          hk(c, a, e);
          dc();
          K = h;
          C = g;
          ok.transition = f;
        } else a.current = c;
        vk && (vk = false, wk = a, xk = e);
        f = a.pendingLanes;
        0 === f && (Ri = null);
        mc(c.stateNode, d);
        Dk(a, B());
        if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
        if (Oi) throw Oi = false, a = Pi, Pi = null, a;
        0 !== (xk & 1) && 0 !== a.tag && Hk();
        f = a.pendingLanes;
        0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a = Dc(xk), b = ok.transition, c = C;
          try {
            ok.transition = null;
            C = 16 > a ? 16 : a;
            if (null === wk) var d = false;
            else {
              a = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6)) throw Error(p(331));
              var e = K;
              K |= 4;
              for (V = a.current; null !== V; ) {
                var f = V, g = f.child;
                if (0 !== (V.flags & 16)) {
                  var h = f.deletions;
                  if (null !== h) {
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k];
                      for (V = l; null !== V; ) {
                        var m = V;
                        switch (m.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m, f);
                        }
                        var q = m.child;
                        if (null !== q) q.return = m, V = q;
                        else for (; null !== V; ) {
                          m = V;
                          var r = m.sibling, y = m.return;
                          Sj(m);
                          if (m === l) {
                            V = null;
                            break;
                          }
                          if (null !== r) {
                            r.return = y;
                            V = r;
                            break;
                          }
                          V = y;
                        }
                      }
                    }
                    var n = f.alternate;
                    if (null !== n) {
                      var t = n.child;
                      if (null !== t) {
                        n.child = null;
                        do {
                          var J = t.sibling;
                          t.sibling = null;
                          t = J;
                        } while (null !== t);
                      }
                    }
                    V = f;
                  }
                }
                if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
                else b: for (; null !== V; ) {
                  f = V;
                  if (0 !== (f.flags & 2048)) switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f, f.return);
                  }
                  var x = f.sibling;
                  if (null !== x) {
                    x.return = f.return;
                    V = x;
                    break b;
                  }
                  V = f.return;
                }
              }
              var w = a.current;
              for (V = w; null !== V; ) {
                g = V;
                var u = g.child;
                if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
                else b: for (g = w; null !== V; ) {
                  h = V;
                  if (0 !== (h.flags & 2048)) try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h);
                    }
                  } catch (na) {
                    W(h, h.return, na);
                  }
                  if (h === g) {
                    V = null;
                    break b;
                  }
                  var F = h.sibling;
                  if (null !== F) {
                    F.return = h.return;
                    V = F;
                    break b;
                  }
                  V = h.return;
                }
              }
              K = e;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
                lc.onPostCommitFiberRoot(kc, a);
              } catch (na) {
              }
              d = true;
            }
            return d;
          } finally {
            C = c, ok.transition = b;
          }
        }
        return false;
      }
      function Xk(a, b, c) {
        b = Ji(c, b);
        b = Ni(a, b, 1);
        a = nh(a, b, 1);
        b = R();
        null !== a && (Ac(a, 1, b), Dk(a, b));
      }
      function W(a, b, c) {
        if (3 === a.tag) Xk(a, a, c);
        else for (; null !== b; ) {
          if (3 === b.tag) {
            Xk(b, a, c);
            break;
          } else if (1 === b.tag) {
            var d = b.stateNode;
            if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
              a = Ji(c, a);
              a = Qi(b, a, 1);
              b = nh(b, a, 1);
              a = R();
              null !== b && (Ac(b, 1, a), Dk(b, a));
              break;
            }
          }
          b = b.return;
        }
      }
      function Ti(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = R();
        a.pingedLanes |= a.suspendedLanes & c;
        Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
        Dk(a, b);
      }
      function Yk(a, b) {
        0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c = R();
        a = ih(a, b);
        null !== a && (Ac(a, b, c), Dk(a, c));
      }
      function uj(a) {
        var b = a.memoizedState, c = 0;
        null !== b && (c = b.retryLane);
        Yk(a, c);
      }
      function bk(a, b) {
        var c = 0;
        switch (a.tag) {
          case 13:
            var d = a.stateNode;
            var e = a.memoizedState;
            null !== e && (c = e.retryLane);
            break;
          case 19:
            d = a.stateNode;
            break;
          default:
            throw Error(p(314));
        }
        null !== d && d.delete(b);
        Yk(a, c);
      }
      var Vk;
      Vk = function(a, b, c) {
        if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
        else {
          if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
          dh = 0 !== (a.flags & 131072) ? true : false;
        }
        else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            var d = b.type;
            ij(a, b);
            a = b.pendingProps;
            var e = Yf(b, H.current);
            ch(b, c);
            e = Nh(null, b, d, a, e, c);
            var f = Sh();
            b.flags |= 1;
            "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
            return b;
          case 16:
            d = b.elementType;
            a: {
              ij(a, b);
              a = b.pendingProps;
              e = d._init;
              d = e(d._payload);
              b.type = d;
              e = b.tag = Zk(d);
              a = Ci(d, a);
              switch (e) {
                case 0:
                  b = cj(null, b, d, a, c);
                  break a;
                case 1:
                  b = hj(null, b, d, a, c);
                  break a;
                case 11:
                  b = Yi(null, b, d, a, c);
                  break a;
                case 14:
                  b = $i(null, b, d, Ci(d.type, a), c);
                  break a;
              }
              throw Error(p(
                306,
                d,
                ""
              ));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
          case 3:
            a: {
              kj(b);
              if (null === a) throw Error(p(387));
              d = b.pendingProps;
              f = b.memoizedState;
              e = f.element;
              lh(a, b);
              qh(b, d, null, c);
              var g = b.memoizedState;
              d = g.element;
              if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                e = Ji(Error(p(423)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else if (d !== e) {
                e = Ji(Error(p(424)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
              else {
                Ig();
                if (d === e) {
                  b = Zi(a, b, c);
                  break a;
                }
                Xi(a, b, d, c);
              }
              b = b.child;
            }
            return b;
          case 5:
            return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
          case 6:
            return null === a && Eg(b), null;
          case 13:
            return oj(a, b, c);
          case 4:
            return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
          case 7:
            return Xi(a, b, b.pendingProps, c), b.child;
          case 8:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              f = b.memoizedProps;
              g = e.value;
              G(Wg, d._currentValue);
              d._currentValue = g;
              if (null !== f) if (He(f.value, g)) {
                if (f.children === e.children && !Wf.current) {
                  b = Zi(a, b, c);
                  break a;
                }
              } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                var h = f.dependencies;
                if (null !== h) {
                  g = f.child;
                  for (var k = h.firstContext; null !== k; ) {
                    if (k.context === d) {
                      if (1 === f.tag) {
                        k = mh(-1, c & -c);
                        k.tag = 2;
                        var l = f.updateQueue;
                        if (null !== l) {
                          l = l.shared;
                          var m = l.pending;
                          null === m ? k.next = k : (k.next = m.next, m.next = k);
                          l.pending = k;
                        }
                      }
                      f.lanes |= c;
                      k = f.alternate;
                      null !== k && (k.lanes |= c);
                      bh(
                        f.return,
                        c,
                        b
                      );
                      h.lanes |= c;
                      break;
                    }
                    k = k.next;
                  }
                } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
                else if (18 === f.tag) {
                  g = f.return;
                  if (null === g) throw Error(p(341));
                  g.lanes |= c;
                  h = g.alternate;
                  null !== h && (h.lanes |= c);
                  bh(g, c, b);
                  g = f.sibling;
                } else g = f.child;
                if (null !== g) g.return = f;
                else for (g = f; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f = g.sibling;
                  if (null !== f) {
                    f.return = g.return;
                    g = f;
                    break;
                  }
                  g = g.return;
                }
                f = g;
              }
              Xi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
          case 14:
            return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
          case 15:
            return bj(a, b, b.type, b.pendingProps, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
          case 19:
            return xj(a, b, c);
          case 22:
            return dj(a, b, c);
        }
        throw Error(p(156, b.tag));
      };
      function Fk(a, b) {
        return ac(a, b);
      }
      function $k(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a, b, c, d) {
        return new $k(a, b, c, d);
      }
      function aj(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function Zk(a) {
        if ("function" === typeof a) return aj(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Da) return 11;
          if (a === Ga) return 14;
        }
        return 2;
      }
      function Pg(a, b) {
        var c = a.alternate;
        null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
        c.flags = a.flags & 14680064;
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Rg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a) aj(a) && (g = 1);
        else if ("string" === typeof a) g = 5;
        else a: switch (a) {
          case ya:
            return Tg(c.children, e, f, b);
          case za:
            g = 8;
            e |= 8;
            break;
          case Aa:
            return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
          case Ea:
            return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
          case Fa:
            return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
          case Ia:
            return pj(c, e, f, b);
          default:
            if ("object" === typeof a && null !== a) switch (a.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
            throw Error(p(130, null == a ? a : typeof a, ""));
        }
        b = Bg(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Tg(a, b, c, d) {
        a = Bg(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function pj(a, b, c, d) {
        a = Bg(22, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        a.stateNode = { isHidden: false };
        return a;
      }
      function Qg(a, b, c) {
        a = Bg(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Sg(a, b, c) {
        b = Bg(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function al(a, b, c, d, e) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d;
        this.onRecoverableError = e;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a, b, c, d, e, f, g, h, k) {
        a = new al(a, b, c, h, k);
        1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
        f = Bg(3, null, null, b);
        a.current = f;
        f.stateNode = a;
        f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f);
        return a;
      }
      function cl(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function dl(a) {
        if (!a) return Vf;
        a = a._reactInternals;
        a: {
          if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
          var b = a;
          do {
            switch (b.tag) {
              case 3:
                b = b.stateNode.context;
                break a;
              case 1:
                if (Zf(b.type)) {
                  b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b = b.return;
          } while (null !== b);
          throw Error(p(171));
        }
        if (1 === a.tag) {
          var c = a.type;
          if (Zf(c)) return bg(a, c, b);
        }
        return b;
      }
      function el(a, b, c, d, e, f, g, h, k) {
        a = bl(c, d, true, a, e, f, g, h, k);
        a.context = dl(null);
        c = a.current;
        d = R();
        e = yi(c);
        f = mh(d, e);
        f.callback = void 0 !== b && null !== b ? b : null;
        nh(c, f, e);
        a.current.lanes = e;
        Ac(a, e, d);
        Dk(a, d);
        return a;
      }
      function fl(a, b, c, d) {
        var e = b.current, f = R(), g = yi(e);
        c = dl(c);
        null === b.context ? b.context = c : b.pendingContext = c;
        b = mh(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        a = nh(e, b, g);
        null !== a && (gi(a, e, g, f), oh(a, e, g));
        return g;
      }
      function gl(a) {
        a = a.current;
        if (!a.child) return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function hl(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function il(a, b) {
        hl(a, b);
        (a = a.alternate) && hl(a, b);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a) {
        console.error(a);
      };
      function ll(a) {
        this._internalRoot = a;
      }
      ml.prototype.render = ll.prototype.render = function(a) {
        var b = this._internalRoot;
        if (null === b) throw Error(p(409));
        fl(a, b, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a = this._internalRoot;
        if (null !== a) {
          this._internalRoot = null;
          var b = a.containerInfo;
          Rk(function() {
            fl(null, a, null, null);
          });
          b[uf] = null;
        }
      };
      function ml(a) {
        this._internalRoot = a;
      }
      ml.prototype.unstable_scheduleHydration = function(a) {
        if (a) {
          var b = Hc();
          a = { blockedOn: null, target: a, priority: b };
          for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
          Qc.splice(c, 0, a);
          0 === c && Vc(a);
        }
      };
      function nl(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
      }
      function ol(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function pl() {
      }
      function ql(a, b, c, d, e) {
        if (e) {
          if ("function" === typeof d) {
            var f = d;
            d = function() {
              var a2 = gl(g);
              f.call(a2);
            };
          }
          var g = el(b, d, a, 0, null, false, false, "", pl);
          a._reactRootContainer = g;
          a[uf] = g.current;
          sf(8 === a.nodeType ? a.parentNode : a);
          Rk();
          return g;
        }
        for (; e = a.lastChild; ) a.removeChild(e);
        if ("function" === typeof d) {
          var h = d;
          d = function() {
            var a2 = gl(k);
            h.call(a2);
          };
        }
        var k = bl(a, 0, false, null, null, false, false, "", pl);
        a._reactRootContainer = k;
        a[uf] = k.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk(function() {
          fl(b, k, c, d);
        });
        return k;
      }
      function rl(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = gl(g);
              h.call(a2);
            };
          }
          fl(b, g, a, e);
        } else g = ql(c, b, a, e, d);
        return gl(g);
      }
      Ec = function(a) {
        switch (a.tag) {
          case 3:
            var b = a.stateNode;
            if (b.current.memoizedState.isDehydrated) {
              var c = tc(b.pendingLanes);
              0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b2 = ih(a, 1);
              if (null !== b2) {
                var c2 = R();
                gi(b2, a, 1, c2);
              }
            }), il(a, 1);
        }
      };
      Fc = function(a) {
        if (13 === a.tag) {
          var b = ih(a, 134217728);
          if (null !== b) {
            var c = R();
            gi(b, a, 134217728, c);
          }
          il(a, 134217728);
        }
      };
      Gc = function(a) {
        if (13 === a.tag) {
          var b = yi(a), c = ih(a, b);
          if (null !== c) {
            var d = R();
            gi(c, a, b, d);
          }
          il(a, b);
        }
      };
      Hc = function() {
        return C;
      };
      Ic = function(a, b) {
        var c = C;
        try {
          return C = a, b();
        } finally {
          C = c;
        }
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            bb(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; ) c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e) throw Error(p(90));
                  Wa(d);
                  bb(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = Zb(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber) try {
          kc = vl.inject(ul), lc = vl;
        } catch (a) {
        }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b)) throw Error(p(200));
        return cl(a, b, null, c);
      };
      exports.createRoot = function(a, b) {
        if (!nl(a)) throw Error(p(299));
        var c = false, d = "", e = kl;
        null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
        b = bl(a, 1, false, null, null, c, false, d, e);
        a[uf] = b.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        return new ll(b);
      };
      exports.findDOMNode = function(a) {
        if (null == a) return null;
        if (1 === a.nodeType) return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render) throw Error(p(188));
          a = Object.keys(a).join(",");
          throw Error(p(268, a));
        }
        a = Zb(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a) {
        return Rk(a);
      };
      exports.hydrate = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, true, c);
      };
      exports.hydrateRoot = function(a, b, c) {
        if (!nl(a)) throw Error(p(405));
        var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
        null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
        b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
        a[uf] = b.current;
        sf(a);
        if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
          c,
          e
        );
        return new ml(b);
      };
      exports.render = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!ol(a)) throw Error(p(40));
        return a._reactRootContainer ? (Rk(function() {
          rl(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!ol(c)) throw Error(p(200));
        if (null == a || void 0 === a._reactInternals) throw Error(p(38));
        return rl(a, b, c, false, d);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // viz2react/node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "viz2react/node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // viz2react/node_modules/react-dom/client.js
  var require_client = __commonJS({
    "viz2react/node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m = require_react_dom();
      if (true) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // viz2react/node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "viz2react/node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      var f = require_react();
      var k = Symbol.for("react.element");
      var l = Symbol.for("react.fragment");
      var m = Object.prototype.hasOwnProperty;
      var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p = { key: true, ref: true, __self: true, __source: true };
      function q(c, a, g) {
        var b, d = {}, e = null, h = null;
        void 0 !== g && (e = "" + g);
        void 0 !== a.key && (e = "" + a.key);
        void 0 !== a.ref && (h = a.ref);
        for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
        if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
        return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
      }
      exports.Fragment = l;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // viz2react/node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "viz2react/node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // saywright/vision/apps/avenzabank/src/main.jsx
  var import_react11 = __toESM(require_react(), 1);
  var import_client = __toESM(require_client(), 1);

  // viz2react/node_modules/react-router-dom/dist/index.js
  var React2 = __toESM(require_react());
  var ReactDOM = __toESM(require_react_dom());

  // viz2react/node_modules/react-router/dist/index.js
  var React = __toESM(require_react());

  // viz2react/node_modules/@remix-run/router/dist/router.js
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var Action;
  (function(Action2) {
    Action2["Pop"] = "POP";
    Action2["Push"] = "PUSH";
    Action2["Replace"] = "REPLACE";
  })(Action || (Action = {}));
  var PopStateEventType = "popstate";
  function createHashHistory(options) {
    if (options === void 0) {
      options = {};
    }
    function createHashLocation(window2, globalHistory) {
      let {
        pathname = "/",
        search = "",
        hash = ""
      } = parsePath(window2.location.hash.substr(1));
      if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
        pathname = "/" + pathname;
      }
      return createLocation(
        "",
        {
          pathname,
          search,
          hash
        },
        // state defaults to `null` because `window.history.state` does
        globalHistory.state && globalHistory.state.usr || null,
        globalHistory.state && globalHistory.state.key || "default"
      );
    }
    function createHashHref(window2, to) {
      let base = window2.document.querySelector("base");
      let href = "";
      if (base && base.getAttribute("href")) {
        let url = window2.location.href;
        let hashIndex = url.indexOf("#");
        href = hashIndex === -1 ? url : url.slice(0, hashIndex);
      }
      return href + "#" + (typeof to === "string" ? to : createPath(to));
    }
    function validateHashLocation(location, to) {
      warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
    }
    return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
  }
  function invariant(value, message) {
    if (value === false || value === null || typeof value === "undefined") {
      throw new Error(message);
    }
  }
  function warning(cond, message) {
    if (!cond) {
      if (typeof console !== "undefined") console.warn(message);
      try {
        throw new Error(message);
      } catch (e) {
      }
    }
  }
  function createKey() {
    return Math.random().toString(36).substr(2, 8);
  }
  function getHistoryState(location, index) {
    return {
      usr: location.state,
      key: location.key,
      idx: index
    };
  }
  function createLocation(current, to, state, key) {
    if (state === void 0) {
      state = null;
    }
    let location = _extends({
      pathname: typeof current === "string" ? current : current.pathname,
      search: "",
      hash: ""
    }, typeof to === "string" ? parsePath(to) : to, {
      state,
      // TODO: This could be cleaned up.  push/replace should probably just take
      // full Locations now and avoid the need to run through this flow at all
      // But that's a pretty big refactor to the current test suite so going to
      // keep as is for the time being and just let any incoming keys take precedence
      key: to && to.key || key || createKey()
    });
    return location;
  }
  function createPath(_ref) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = _ref;
    if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
    if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
    return pathname;
  }
  function parsePath(path) {
    let parsedPath = {};
    if (path) {
      let hashIndex = path.indexOf("#");
      if (hashIndex >= 0) {
        parsedPath.hash = path.substr(hashIndex);
        path = path.substr(0, hashIndex);
      }
      let searchIndex = path.indexOf("?");
      if (searchIndex >= 0) {
        parsedPath.search = path.substr(searchIndex);
        path = path.substr(0, searchIndex);
      }
      if (path) {
        parsedPath.pathname = path;
      }
    }
    return parsedPath;
  }
  function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
    if (options === void 0) {
      options = {};
    }
    let {
      window: window2 = document.defaultView,
      v5Compat = false
    } = options;
    let globalHistory = window2.history;
    let action = Action.Pop;
    let listener = null;
    let index = getIndex();
    if (index == null) {
      index = 0;
      globalHistory.replaceState(_extends({}, globalHistory.state, {
        idx: index
      }), "");
    }
    function getIndex() {
      let state = globalHistory.state || {
        idx: null
      };
      return state.idx;
    }
    function handlePop() {
      action = Action.Pop;
      let nextIndex = getIndex();
      let delta = nextIndex == null ? null : nextIndex - index;
      index = nextIndex;
      if (listener) {
        listener({
          action,
          location: history.location,
          delta
        });
      }
    }
    function push(to, state) {
      action = Action.Push;
      let location = createLocation(history.location, to, state);
      if (validateLocation) validateLocation(location, to);
      index = getIndex() + 1;
      let historyState = getHistoryState(location, index);
      let url = history.createHref(location);
      try {
        globalHistory.pushState(historyState, "", url);
      } catch (error) {
        if (error instanceof DOMException && error.name === "DataCloneError") {
          throw error;
        }
        window2.location.assign(url);
      }
      if (v5Compat && listener) {
        listener({
          action,
          location: history.location,
          delta: 1
        });
      }
    }
    function replace2(to, state) {
      action = Action.Replace;
      let location = createLocation(history.location, to, state);
      if (validateLocation) validateLocation(location, to);
      index = getIndex();
      let historyState = getHistoryState(location, index);
      let url = history.createHref(location);
      globalHistory.replaceState(historyState, "", url);
      if (v5Compat && listener) {
        listener({
          action,
          location: history.location,
          delta: 0
        });
      }
    }
    function createURL(to) {
      let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
      let href = typeof to === "string" ? to : createPath(to);
      href = href.replace(/ $/, "%20");
      invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
      return new URL(href, base);
    }
    let history = {
      get action() {
        return action;
      },
      get location() {
        return getLocation(window2, globalHistory);
      },
      listen(fn) {
        if (listener) {
          throw new Error("A history only accepts one active listener");
        }
        window2.addEventListener(PopStateEventType, handlePop);
        listener = fn;
        return () => {
          window2.removeEventListener(PopStateEventType, handlePop);
          listener = null;
        };
      },
      createHref(to) {
        return createHref(window2, to);
      },
      createURL,
      encodeLocation(to) {
        let url = createURL(to);
        return {
          pathname: url.pathname,
          search: url.search,
          hash: url.hash
        };
      },
      push,
      replace: replace2,
      go(n) {
        return globalHistory.go(n);
      }
    };
    return history;
  }
  var ResultType;
  (function(ResultType2) {
    ResultType2["data"] = "data";
    ResultType2["deferred"] = "deferred";
    ResultType2["redirect"] = "redirect";
    ResultType2["error"] = "error";
  })(ResultType || (ResultType = {}));
  function matchRoutes(routes, locationArg, basename) {
    if (basename === void 0) {
      basename = "/";
    }
    return matchRoutesImpl(routes, locationArg, basename, false);
  }
  function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
    let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    let pathname = stripBasename(location.pathname || "/", basename);
    if (pathname == null) {
      return null;
    }
    let branches = flattenRoutes(routes);
    rankRouteBranches(branches);
    let matches = null;
    for (let i = 0; matches == null && i < branches.length; ++i) {
      let decoded = decodePath(pathname);
      matches = matchRouteBranch(branches[i], decoded, allowPartial);
    }
    return matches;
  }
  function flattenRoutes(routes, branches, parentsMeta, parentPath) {
    if (branches === void 0) {
      branches = [];
    }
    if (parentsMeta === void 0) {
      parentsMeta = [];
    }
    if (parentPath === void 0) {
      parentPath = "";
    }
    let flattenRoute = (route, index, relativePath) => {
      let meta = {
        relativePath: relativePath === void 0 ? route.path || "" : relativePath,
        caseSensitive: route.caseSensitive === true,
        childrenIndex: index,
        route
      };
      if (meta.relativePath.startsWith("/")) {
        invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
        meta.relativePath = meta.relativePath.slice(parentPath.length);
      }
      let path = joinPaths([parentPath, meta.relativePath]);
      let routesMeta = parentsMeta.concat(meta);
      if (route.children && route.children.length > 0) {
        invariant(
          // Our types know better, but runtime JS may not!
          // @ts-expect-error
          route.index !== true,
          "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
        );
        flattenRoutes(route.children, branches, routesMeta, path);
      }
      if (route.path == null && !route.index) {
        return;
      }
      branches.push({
        path,
        score: computeScore(path, route.index),
        routesMeta
      });
    };
    routes.forEach((route, index) => {
      var _route$path;
      if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
        flattenRoute(route, index);
      } else {
        for (let exploded of explodeOptionalSegments(route.path)) {
          flattenRoute(route, index, exploded);
        }
      }
    });
    return branches;
  }
  function explodeOptionalSegments(path) {
    let segments = path.split("/");
    if (segments.length === 0) return [];
    let [first, ...rest] = segments;
    let isOptional = first.endsWith("?");
    let required = first.replace(/\?$/, "");
    if (rest.length === 0) {
      return isOptional ? [required, ""] : [required];
    }
    let restExploded = explodeOptionalSegments(rest.join("/"));
    let result = [];
    result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
    if (isOptional) {
      result.push(...restExploded);
    }
    return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
  }
  function rankRouteBranches(branches) {
    branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
  }
  var paramRe = /^:[\w-]+$/;
  var dynamicSegmentValue = 3;
  var indexRouteValue = 2;
  var emptySegmentValue = 1;
  var staticSegmentValue = 10;
  var splatPenalty = -2;
  var isSplat = (s) => s === "*";
  function computeScore(path, index) {
    let segments = path.split("/");
    let initialScore = segments.length;
    if (segments.some(isSplat)) {
      initialScore += splatPenalty;
    }
    if (index) {
      initialScore += indexRouteValue;
    }
    return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
  }
  function compareIndexes(a, b) {
    let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
    return siblings ? (
      // If two routes are siblings, we should try to match the earlier sibling
      // first. This allows people to have fine-grained control over the matching
      // behavior by simply putting routes with identical paths in the order they
      // want them tried.
      a[a.length - 1] - b[b.length - 1]
    ) : (
      // Otherwise, it doesn't really make sense to rank non-siblings by index,
      // so they sort equally.
      0
    );
  }
  function matchRouteBranch(branch, pathname, allowPartial) {
    if (allowPartial === void 0) {
      allowPartial = false;
    }
    let {
      routesMeta
    } = branch;
    let matchedParams = {};
    let matchedPathname = "/";
    let matches = [];
    for (let i = 0; i < routesMeta.length; ++i) {
      let meta = routesMeta[i];
      let end = i === routesMeta.length - 1;
      let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
      let match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end
      }, remainingPathname);
      let route = meta.route;
      if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
        match = matchPath({
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        }, remainingPathname);
      }
      if (!match) {
        return null;
      }
      Object.assign(matchedParams, match.params);
      matches.push({
        // TODO: Can this as be avoided?
        params: matchedParams,
        pathname: joinPaths([matchedPathname, match.pathname]),
        pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
        route
      });
      if (match.pathnameBase !== "/") {
        matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
      }
    }
    return matches;
  }
  function matchPath(pattern, pathname) {
    if (typeof pattern === "string") {
      pattern = {
        path: pattern,
        caseSensitive: false,
        end: true
      };
    }
    let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
    let match = pathname.match(matcher);
    if (!match) return null;
    let matchedPathname = match[0];
    let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
    let captureGroups = match.slice(1);
    let params = compiledParams.reduce((memo2, _ref, index) => {
      let {
        paramName,
        isOptional
      } = _ref;
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    }, {});
    return {
      params,
      pathname: matchedPathname,
      pathnameBase,
      pattern
    };
  }
  function compilePath(path, caseSensitive, end) {
    if (caseSensitive === void 0) {
      caseSensitive = false;
    }
    if (end === void 0) {
      end = true;
    }
    warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
    let params = [];
    let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
      params.push({
        paramName,
        isOptional: isOptional != null
      });
      return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
    });
    if (path.endsWith("*")) {
      params.push({
        paramName: "*"
      });
      regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
    } else if (end) {
      regexpSource += "\\/*$";
    } else if (path !== "" && path !== "/") {
      regexpSource += "(?:(?=\\/|$))";
    } else ;
    let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
    return [matcher, params];
  }
  function decodePath(value) {
    try {
      return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
    } catch (error) {
      warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
      return value;
    }
  }
  function stripBasename(pathname, basename) {
    if (basename === "/") return pathname;
    if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
      return null;
    }
    let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
    let nextChar = pathname.charAt(startIndex);
    if (nextChar && nextChar !== "/") {
      return null;
    }
    return pathname.slice(startIndex) || "/";
  }
  function resolvePath(to, fromPathname) {
    if (fromPathname === void 0) {
      fromPathname = "/";
    }
    let {
      pathname: toPathname,
      search = "",
      hash = ""
    } = typeof to === "string" ? parsePath(to) : to;
    let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
    return {
      pathname,
      search: normalizeSearch(search),
      hash: normalizeHash(hash)
    };
  }
  function resolvePathname(relativePath, fromPathname) {
    let segments = fromPathname.replace(/\/+$/, "").split("/");
    let relativeSegments = relativePath.split("/");
    relativeSegments.forEach((segment) => {
      if (segment === "..") {
        if (segments.length > 1) segments.pop();
      } else if (segment !== ".") {
        segments.push(segment);
      }
    });
    return segments.length > 1 ? segments.join("/") : "/";
  }
  function getInvalidPathError(char, field, dest, path) {
    return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
  }
  function getPathContributingMatches(matches) {
    return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
  }
  function getResolveToMatches(matches, v7_relativeSplatPath) {
    let pathMatches = getPathContributingMatches(matches);
    if (v7_relativeSplatPath) {
      return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
    }
    return pathMatches.map((match) => match.pathnameBase);
  }
  function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
    if (isPathRelative === void 0) {
      isPathRelative = false;
    }
    let to;
    if (typeof toArg === "string") {
      to = parsePath(toArg);
    } else {
      to = _extends({}, toArg);
      invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
      invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
      invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
    }
    let isEmptyPath = toArg === "" || to.pathname === "";
    let toPathname = isEmptyPath ? "/" : to.pathname;
    let from;
    if (toPathname == null) {
      from = locationPathname;
    } else {
      let routePathnameIndex = routePathnames.length - 1;
      if (!isPathRelative && toPathname.startsWith("..")) {
        let toSegments = toPathname.split("/");
        while (toSegments[0] === "..") {
          toSegments.shift();
          routePathnameIndex -= 1;
        }
        to.pathname = toSegments.join("/");
      }
      from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
    }
    let path = resolvePath(to, from);
    let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
    let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
    if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
      path.pathname += "/";
    }
    return path;
  }
  var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
  var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
  var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
  var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
  function isRouteErrorResponse(error) {
    return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
  }
  var validMutationMethodsArr = ["post", "put", "patch", "delete"];
  var validMutationMethods = new Set(validMutationMethodsArr);
  var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
  var validRequestMethods = new Set(validRequestMethodsArr);
  var UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");

  // viz2react/node_modules/react-router/dist/index.js
  function _extends2() {
    _extends2 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends2.apply(this, arguments);
  }
  var DataRouterContext = /* @__PURE__ */ React.createContext(null);
  if (false) {
    DataRouterContext.displayName = "DataRouter";
  }
  var DataRouterStateContext = /* @__PURE__ */ React.createContext(null);
  if (false) {
    DataRouterStateContext.displayName = "DataRouterState";
  }
  if (false) {
    AwaitContext.displayName = "Await";
  }
  var NavigationContext = /* @__PURE__ */ React.createContext(null);
  if (false) {
    NavigationContext.displayName = "Navigation";
  }
  var LocationContext = /* @__PURE__ */ React.createContext(null);
  if (false) {
    LocationContext.displayName = "Location";
  }
  var RouteContext = /* @__PURE__ */ React.createContext({
    outlet: null,
    matches: [],
    isDataRoute: false
  });
  if (false) {
    RouteContext.displayName = "Route";
  }
  var RouteErrorContext = /* @__PURE__ */ React.createContext(null);
  if (false) {
    RouteErrorContext.displayName = "RouteError";
  }
  function useInRouterContext() {
    return React.useContext(LocationContext) != null;
  }
  function useLocation() {
    !useInRouterContext() ? false ? invariant(
      false,
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      "useLocation() may be used only in the context of a <Router> component."
    ) : invariant(false) : void 0;
    return React.useContext(LocationContext).location;
  }
  function useIsomorphicLayoutEffect(cb) {
    let isStatic = React.useContext(NavigationContext).static;
    if (!isStatic) {
      React.useLayoutEffect(cb);
    }
  }
  function useNavigate() {
    let {
      isDataRoute
    } = React.useContext(RouteContext);
    return isDataRoute ? useNavigateStable() : useNavigateUnstable();
  }
  function useNavigateUnstable() {
    !useInRouterContext() ? false ? invariant(
      false,
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      "useNavigate() may be used only in the context of a <Router> component."
    ) : invariant(false) : void 0;
    let dataRouterContext = React.useContext(DataRouterContext);
    let {
      basename,
      future,
      navigator: navigator2
    } = React.useContext(NavigationContext);
    let {
      matches
    } = React.useContext(RouteContext);
    let {
      pathname: locationPathname
    } = useLocation();
    let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
    let activeRef = React.useRef(false);
    useIsomorphicLayoutEffect(() => {
      activeRef.current = true;
    });
    let navigate = React.useCallback(function(to, options) {
      if (options === void 0) {
        options = {};
      }
      false ? warning(activeRef.current, navigateEffectWarning) : void 0;
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator2.go(to);
        return;
      }
      let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
    }, [basename, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
    return navigate;
  }
  function useParams() {
    let {
      matches
    } = React.useContext(RouteContext);
    let routeMatch = matches[matches.length - 1];
    return routeMatch ? routeMatch.params : {};
  }
  function useRoutes(routes, locationArg) {
    return useRoutesImpl(routes, locationArg);
  }
  function useRoutesImpl(routes, locationArg, dataRouterState, future) {
    !useInRouterContext() ? false ? invariant(
      false,
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      "useRoutes() may be used only in the context of a <Router> component."
    ) : invariant(false) : void 0;
    let {
      navigator: navigator2
    } = React.useContext(NavigationContext);
    let {
      matches: parentMatches
    } = React.useContext(RouteContext);
    let routeMatch = parentMatches[parentMatches.length - 1];
    let parentParams = routeMatch ? routeMatch.params : {};
    let parentPathname = routeMatch ? routeMatch.pathname : "/";
    let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
    let parentRoute = routeMatch && routeMatch.route;
    if (false) {
      let parentPath = parentRoute && parentRoute.path || "";
      warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'));
    }
    let locationFromContext = useLocation();
    let location;
    if (locationArg) {
      var _parsedLocationArg$pa;
      let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
      !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? false ? invariant(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')) : invariant(false) : void 0;
      location = parsedLocationArg;
    } else {
      location = locationFromContext;
    }
    let pathname = location.pathname || "/";
    let remainingPathname = pathname;
    if (parentPathnameBase !== "/") {
      let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
      let segments = pathname.replace(/^\//, "").split("/");
      remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
    }
    let matches = matchRoutes(routes, {
      pathname: remainingPathname
    });
    if (false) {
      false ? warning(parentRoute || matches != null, 'No routes matched location "' + location.pathname + location.search + location.hash + '" ') : void 0;
      false ? warning(matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + location.pathname + location.search + location.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.') : void 0;
    }
    let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
      params: Object.assign({}, parentParams, match.params),
      pathname: joinPaths([
        parentPathnameBase,
        // Re-encode pathnames that were decoded inside matchRoutes
        navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
      ]),
      pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
        parentPathnameBase,
        // Re-encode pathnames that were decoded inside matchRoutes
        navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
      ])
    })), parentMatches, dataRouterState, future);
    if (locationArg && renderedMatches) {
      return /* @__PURE__ */ React.createElement(LocationContext.Provider, {
        value: {
          location: _extends2({
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: "default"
          }, location),
          navigationType: Action.Pop
        }
      }, renderedMatches);
    }
    return renderedMatches;
  }
  function DefaultErrorComponent() {
    let error = useRouteError();
    let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
    let stack = error instanceof Error ? error.stack : null;
    let lightgrey = "rgba(200,200,200, 0.5)";
    let preStyles = {
      padding: "0.5rem",
      backgroundColor: lightgrey
    };
    let codeStyles = {
      padding: "2px 4px",
      backgroundColor: lightgrey
    };
    let devInfo = null;
    if (false) {
      console.error("Error handled by React Router default ErrorBoundary:", error);
      devInfo = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ React.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React.createElement("code", {
        style: codeStyles
      }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React.createElement("code", {
        style: codeStyles
      }, "errorElement"), " prop on your route."));
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React.createElement("h3", {
      style: {
        fontStyle: "italic"
      }
    }, message), stack ? /* @__PURE__ */ React.createElement("pre", {
      style: preStyles
    }, stack) : null, devInfo);
  }
  var defaultErrorElement = /* @__PURE__ */ React.createElement(DefaultErrorComponent, null);
  var RenderErrorBoundary = class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        location: props.location,
        revalidation: props.revalidation,
        error: props.error
      };
    }
    static getDerivedStateFromError(error) {
      return {
        error
      };
    }
    static getDerivedStateFromProps(props, state) {
      if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
        return {
          error: props.error,
          location: props.location,
          revalidation: props.revalidation
        };
      }
      return {
        error: props.error !== void 0 ? props.error : state.error,
        location: state.location,
        revalidation: props.revalidation || state.revalidation
      };
    }
    componentDidCatch(error, errorInfo) {
      console.error("React Router caught the following error during render", error, errorInfo);
    }
    render() {
      return this.state.error !== void 0 ? /* @__PURE__ */ React.createElement(RouteContext.Provider, {
        value: this.props.routeContext
      }, /* @__PURE__ */ React.createElement(RouteErrorContext.Provider, {
        value: this.state.error,
        children: this.props.component
      })) : this.props.children;
    }
  };
  function RenderedRoute(_ref) {
    let {
      routeContext,
      match,
      children
    } = _ref;
    let dataRouterContext = React.useContext(DataRouterContext);
    if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
      dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
    }
    return /* @__PURE__ */ React.createElement(RouteContext.Provider, {
      value: routeContext
    }, children);
  }
  function _renderMatches(matches, parentMatches, dataRouterState, future) {
    var _dataRouterState;
    if (parentMatches === void 0) {
      parentMatches = [];
    }
    if (dataRouterState === void 0) {
      dataRouterState = null;
    }
    if (future === void 0) {
      future = null;
    }
    if (matches == null) {
      var _future;
      if (!dataRouterState) {
        return null;
      }
      if (dataRouterState.errors) {
        matches = dataRouterState.matches;
      } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
        matches = dataRouterState.matches;
      } else {
        return null;
      }
    }
    let renderedMatches = matches;
    let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
    if (errors != null) {
      let errorIndex = renderedMatches.findIndex((m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0);
      !(errorIndex >= 0) ? false ? invariant(false, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")) : invariant(false) : void 0;
      renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
    }
    let renderFallback = false;
    let fallbackIndex = -1;
    if (dataRouterState && future && future.v7_partialHydration) {
      for (let i = 0; i < renderedMatches.length; i++) {
        let match = renderedMatches[i];
        if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
          fallbackIndex = i;
        }
        if (match.route.id) {
          let {
            loaderData,
            errors: errors2
          } = dataRouterState;
          let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
          if (match.route.lazy || needsToRunLoader) {
            renderFallback = true;
            if (fallbackIndex >= 0) {
              renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
            } else {
              renderedMatches = [renderedMatches[0]];
            }
            break;
          }
        }
      }
    }
    return renderedMatches.reduceRight((outlet, match, index) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index === 0) {
            warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = /* @__PURE__ */ React.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return /* @__PURE__ */ React.createElement(RenderedRoute, {
          match,
          routeContext: {
            outlet,
            matches: matches2,
            isDataRoute: dataRouterState != null
          },
          children
        });
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React.createElement(RenderErrorBoundary, {
        location: dataRouterState.location,
        revalidation: dataRouterState.revalidation,
        component: errorElement,
        error,
        children: getChildren(),
        routeContext: {
          outlet: null,
          matches: matches2,
          isDataRoute: true
        }
      }) : getChildren();
    }, null);
  }
  var DataRouterHook = /* @__PURE__ */ function(DataRouterHook3) {
    DataRouterHook3["UseBlocker"] = "useBlocker";
    DataRouterHook3["UseRevalidator"] = "useRevalidator";
    DataRouterHook3["UseNavigateStable"] = "useNavigate";
    return DataRouterHook3;
  }(DataRouterHook || {});
  var DataRouterStateHook = /* @__PURE__ */ function(DataRouterStateHook3) {
    DataRouterStateHook3["UseBlocker"] = "useBlocker";
    DataRouterStateHook3["UseLoaderData"] = "useLoaderData";
    DataRouterStateHook3["UseActionData"] = "useActionData";
    DataRouterStateHook3["UseRouteError"] = "useRouteError";
    DataRouterStateHook3["UseNavigation"] = "useNavigation";
    DataRouterStateHook3["UseRouteLoaderData"] = "useRouteLoaderData";
    DataRouterStateHook3["UseMatches"] = "useMatches";
    DataRouterStateHook3["UseRevalidator"] = "useRevalidator";
    DataRouterStateHook3["UseNavigateStable"] = "useNavigate";
    DataRouterStateHook3["UseRouteId"] = "useRouteId";
    return DataRouterStateHook3;
  }(DataRouterStateHook || {});
  function useDataRouterContext(hookName) {
    let ctx = React.useContext(DataRouterContext);
    !ctx ? false ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
    return ctx;
  }
  function useDataRouterState(hookName) {
    let state = React.useContext(DataRouterStateContext);
    !state ? false ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
    return state;
  }
  function useRouteContext(hookName) {
    let route = React.useContext(RouteContext);
    !route ? false ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
    return route;
  }
  function useCurrentRouteId(hookName) {
    let route = useRouteContext(hookName);
    let thisRoute = route.matches[route.matches.length - 1];
    !thisRoute.route.id ? false ? invariant(false, hookName + ' can only be used on routes that contain a unique "id"') : invariant(false) : void 0;
    return thisRoute.route.id;
  }
  function useRouteError() {
    var _state$errors;
    let error = React.useContext(RouteErrorContext);
    let state = useDataRouterState(DataRouterStateHook.UseRouteError);
    let routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);
    if (error !== void 0) {
      return error;
    }
    return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
  }
  function useNavigateStable() {
    let {
      router
    } = useDataRouterContext(DataRouterHook.UseNavigateStable);
    let id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);
    let activeRef = React.useRef(false);
    useIsomorphicLayoutEffect(() => {
      activeRef.current = true;
    });
    let navigate = React.useCallback(function(to, options) {
      if (options === void 0) {
        options = {};
      }
      false ? warning(activeRef.current, navigateEffectWarning) : void 0;
      if (!activeRef.current) return;
      if (typeof to === "number") {
        router.navigate(to);
      } else {
        router.navigate(to, _extends2({
          fromRouteId: id
        }, options));
      }
    }, [router, id]);
    return navigate;
  }
  var alreadyWarned = {};
  function warningOnce(key, cond, message) {
    if (!cond && !alreadyWarned[key]) {
      alreadyWarned[key] = true;
      false ? warning(false, message) : void 0;
    }
  }
  var START_TRANSITION = "startTransition";
  var startTransitionImpl = React[START_TRANSITION];
  function Navigate(_ref4) {
    let {
      to,
      replace: replace2,
      state,
      relative
    } = _ref4;
    !useInRouterContext() ? false ? invariant(
      false,
      // TODO: This error is probably because they somehow have 2 versions of
      // the router loaded. We can help them understand how to avoid that.
      "<Navigate> may be used only in the context of a <Router> component."
    ) : invariant(false) : void 0;
    let {
      future,
      static: isStatic
    } = React.useContext(NavigationContext);
    false ? warning(!isStatic, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.") : void 0;
    let {
      matches
    } = React.useContext(RouteContext);
    let {
      pathname: locationPathname
    } = useLocation();
    let navigate = useNavigate();
    let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
    let jsonPath = JSON.stringify(path);
    React.useEffect(() => navigate(JSON.parse(jsonPath), {
      replace: replace2,
      state,
      relative
    }), [navigate, jsonPath, relative, replace2, state]);
    return null;
  }
  function Route(_props) {
    false ? invariant(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : invariant(false);
  }
  function Router(_ref5) {
    let {
      basename: basenameProp = "/",
      children = null,
      location: locationProp,
      navigationType = Action.Pop,
      navigator: navigator2,
      static: staticProp = false,
      future
    } = _ref5;
    !!useInRouterContext() ? false ? invariant(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : invariant(false) : void 0;
    let basename = basenameProp.replace(/^\/*/, "/");
    let navigationContext = React.useMemo(() => ({
      basename,
      navigator: navigator2,
      static: staticProp,
      future: _extends2({
        v7_relativeSplatPath: false
      }, future)
    }), [basename, future, navigator2, staticProp]);
    if (typeof locationProp === "string") {
      locationProp = parsePath(locationProp);
    }
    let {
      pathname = "/",
      search = "",
      hash = "",
      state = null,
      key = "default"
    } = locationProp;
    let locationContext = React.useMemo(() => {
      let trailingPathname = stripBasename(pathname, basename);
      if (trailingPathname == null) {
        return null;
      }
      return {
        location: {
          pathname: trailingPathname,
          search,
          hash,
          state,
          key
        },
        navigationType
      };
    }, [basename, pathname, search, hash, state, key, navigationType]);
    false ? warning(locationContext != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything.") : void 0;
    if (locationContext == null) {
      return null;
    }
    return /* @__PURE__ */ React.createElement(NavigationContext.Provider, {
      value: navigationContext
    }, /* @__PURE__ */ React.createElement(LocationContext.Provider, {
      children,
      value: locationContext
    }));
  }
  function Routes(_ref6) {
    let {
      children,
      location
    } = _ref6;
    return useRoutes(createRoutesFromChildren(children), location);
  }
  var neverSettledPromise = new Promise(() => {
  });
  function createRoutesFromChildren(children, parentPath) {
    if (parentPath === void 0) {
      parentPath = [];
    }
    let routes = [];
    React.Children.forEach(children, (element, index) => {
      if (!/* @__PURE__ */ React.isValidElement(element)) {
        return;
      }
      let treePath = [...parentPath, index];
      if (element.type === React.Fragment) {
        routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
        return;
      }
      !(element.type === Route) ? false ? invariant(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : invariant(false) : void 0;
      !(!element.props.index || !element.props.children) ? false ? invariant(false, "An index route cannot have child routes.") : invariant(false) : void 0;
      let route = {
        id: element.props.id || treePath.join("-"),
        caseSensitive: element.props.caseSensitive,
        element: element.props.element,
        Component: element.props.Component,
        index: element.props.index,
        path: element.props.path,
        loader: element.props.loader,
        action: element.props.action,
        errorElement: element.props.errorElement,
        ErrorBoundary: element.props.ErrorBoundary,
        hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
        shouldRevalidate: element.props.shouldRevalidate,
        handle: element.props.handle,
        lazy: element.props.lazy
      };
      if (element.props.children) {
        route.children = createRoutesFromChildren(element.props.children, treePath);
      }
      routes.push(route);
    });
    return routes;
  }

  // viz2react/node_modules/react-router-dom/dist/index.js
  var REACT_ROUTER_VERSION = "6";
  try {
    window.__reactRouterVersion = REACT_ROUTER_VERSION;
  } catch (e) {
  }
  if (false) {
    ViewTransitionContext.displayName = "ViewTransition";
  }
  if (false) {
    FetchersContext.displayName = "Fetchers";
  }
  var START_TRANSITION2 = "startTransition";
  var startTransitionImpl2 = React2[START_TRANSITION2];
  var FLUSH_SYNC = "flushSync";
  var flushSyncImpl = ReactDOM[FLUSH_SYNC];
  var USE_ID = "useId";
  var useIdImpl = React2[USE_ID];
  function HashRouter(_ref5) {
    let {
      basename,
      children,
      future,
      window: window2
    } = _ref5;
    let historyRef = React2.useRef();
    if (historyRef.current == null) {
      historyRef.current = createHashHistory({
        window: window2,
        v5Compat: true
      });
    }
    let history = historyRef.current;
    let [state, setStateImpl] = React2.useState({
      action: history.action,
      location: history.location
    });
    let {
      v7_startTransition
    } = future || {};
    let setState = React2.useCallback((newState) => {
      v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
    }, [setStateImpl, v7_startTransition]);
    React2.useLayoutEffect(() => history.listen(setState), [history, setState]);
    return /* @__PURE__ */ React2.createElement(Router, {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      future
    });
  }
  if (false) {
    HistoryRouter.displayName = "unstable_HistoryRouter";
  }
  var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  if (false) {
    Link.displayName = "Link";
  }
  if (false) {
    NavLink.displayName = "NavLink";
  }
  if (false) {
    Form.displayName = "Form";
  }
  if (false) {
    ScrollRestoration.displayName = "ScrollRestoration";
  }
  var DataRouterHook2;
  (function(DataRouterHook3) {
    DataRouterHook3["UseScrollRestoration"] = "useScrollRestoration";
    DataRouterHook3["UseSubmit"] = "useSubmit";
    DataRouterHook3["UseSubmitFetcher"] = "useSubmitFetcher";
    DataRouterHook3["UseFetcher"] = "useFetcher";
    DataRouterHook3["useViewTransitionState"] = "useViewTransitionState";
  })(DataRouterHook2 || (DataRouterHook2 = {}));
  var DataRouterStateHook2;
  (function(DataRouterStateHook3) {
    DataRouterStateHook3["UseFetcher"] = "useFetcher";
    DataRouterStateHook3["UseFetchers"] = "useFetchers";
    DataRouterStateHook3["UseScrollRestoration"] = "useScrollRestoration";
  })(DataRouterStateHook2 || (DataRouterStateHook2 = {}));

  // saywright/vision/apps/avenzabank/src/runtime/kony.js
  var app = {
    forms: {},
    // formId -> { widgets, controller: () => object, actions: () => object }
    controllers: {},
    // formId -> controller instance (Kony keeps one per form)
    current: null,
    previous: null,
    navigate: null,
    // set by the router: (formId, context) => void
    breakpoints: [640, 1024, 1366],
    i18n: {},
    missing: /* @__PURE__ */ new Set()
  };
  var missing = (name) => {
    if (!app.missing.has(name)) {
      app.missing.add(name);
      console.warn(`[viz2react] kony API not converted: ${name}`);
    }
  };
  var stub = (path) => new Proxy(function() {
  }, {
    get(_, k) {
      if (k === Symbol.toPrimitive || k === "toString" || k === "valueOf") return () => "";
      if (k === "__stub") return true;
      return typeof k === "symbol" ? void 0 : stub(`${path}.${String(k)}`);
    },
    apply() {
      missing(path);
      return stub(`${path}()`);
    },
    // chainable: a.b().c() is logged, not a crash
    construct() {
      missing(`new ${path}`);
      return stub(`new ${path}`);
    }
  });
  var isStub = (v) => typeof v === "function" && v.__stub === true;
  var withStubs = (obj, path) => new Proxy(obj, {
    get(t, k) {
      return k in t || typeof k === "symbol" ? t[k] : stub(`${path}.${String(k)}`);
    }
  });
  var Navigation = class {
    constructor(target) {
      const name = typeof target === "string" ? target : target && (target.friendlyName || target.formName);
      this.formId = String(name || "").split("/").pop();
    }
    navigate(context) {
      if (!app.forms[this.formId]) {
        console.error(`[viz2react] navigate to unknown form ${this.formId}`);
        return;
      }
      app.navigate(this.formId, context);
    }
  };
  function currentBreakpoint(width = window.innerWidth) {
    const list = [...app.breakpoints].sort((a, b) => a - b);
    if (width > list[list.length - 1]) return constants.BREAKPOINT_MAX_VALUE;
    return list.find((b) => width <= b);
  }
  var constants = withStubs({
    BREAKPOINT_MAX_VALUE: 9999999,
    CONTAINER_LAYOUT_FREE_FORM: 2,
    FLOW_HORIZONTAL: 3,
    FLOW_VERTICAL: 4,
    SEGUI_VIEW_TYPE_TABLEVIEW: "tableview",
    SEGUI_VIEW_TYPE_PAGEVIEW: "pageview",
    ALERT_TYPE_INFO: "info",
    ALERT_TYPE_ERROR: "error",
    ALERT_TYPE_CONFIRMATION: "confirmation"
  }, "constants");
  function FormController(viewId) {
    this.viewId = viewId;
  }
  FormController.prototype.show = function(context) {
    new Navigation(this.viewId).navigate(context);
  };
  var registry = {
    map: /* @__PURE__ */ new Map(),
    // friendlyName -> { formName, controllerName, controllerType, controllerExtName }
    add(friendly, formName, o) {
      this.map.set(friendly, { formName, ...o || {} });
    },
    remove(friendly) {
      this.map.delete(friendly);
    },
    get(friendly) {
      return this.map.get(friendly) || null;
    },
    getControllerType(f) {
      const r = this.map.get(f);
      return r ? r.controllerType : void 0;
    },
    getFriendlyName(f) {
      return this.map.has(f) ? f : void 0;
    },
    getControllerName(f) {
      const r = this.map.get(f);
      return r ? r.controllerName : void 0;
    },
    getControllerExtName(f) {
      const r = this.map.get(f);
      return r ? r.controllerExtName : void 0;
    }
  };
  var GetController = (formId) => app.controllerFor ? app.controllerFor(String(formId).split("/").pop()) : null;
  var assignFunctions2Controller = (target, exts) => {
    for (const e of exts || []) for (const [k, v] of Object.entries(e || {})) target[k] = v;
    return target;
  };
  var kony = withStubs({
    // Presentation / util / UIBinder / constants exist as plain objects: konymvcextns.js fills them in
    // (a stub there would be truthy and swallow what it assigns)
    mvc: withStubs({ Navigation, FormController, registry, GetController, getController: GetController, Presentation: {}, util: {}, UIBinder: {}, constants: {} }, "kony.mvc"),
    sdk: withStubs({ isNullOrUndefined: (v) => v === null || v === void 0 }, "kony.sdk"),
    application: withStubs({
      getCurrentBreakpoint: () => currentBreakpoint(),
      getCurrentForm: () => app.current && app.controllers[app.current] && app.controllers[app.current].view,
      getPreviousForm: () => app.previous ? { id: app.previous } : null,
      showLoadingScreen: () => {
        document.body.classList.add("viz-loading");
      },
      dismissLoadingScreen: () => {
        document.body.classList.remove("viz-loading");
      },
      setApplicationBehaviors: () => {
      },
      openURL: (url) => window.open(url, "_blank")
    }, "kony.application"),
    flex: withStubs({ FREE_FORM: 2, FLOW_HORIZONTAL: 3, FLOW_VERTICAL: 4, USE_PREFERRED_SIZE: "preferred", AUTOGROW_NONE: 0, AUTOGROW_HEIGHT: 1, DP: "dp", PERCENTAGE: "%" }, "kony.flex"),
    i18n: withStubs({
      getLocalizedString: (key) => app.i18n[key] != null ? app.i18n[key] : key,
      getCurrentLocale: () => app.locale || "en_US",
      // one locale is converted; switching reports success and keeps its texts
      setCurrentLocaleAsync: (loc, ok) => {
        if (typeof ok === "function") setTimeout(() => ok(loc));
      }
    }, "kony.i18n"),
    store: withStubs({
      setItem: (k, v) => localStorage.setItem("kony." + k, JSON.stringify(v)),
      getItem: (k) => {
        const v = localStorage.getItem("kony." + k);
        return v == null ? null : JSON.parse(v);
      },
      removeItem: (k) => localStorage.removeItem("kony." + k)
    }, "kony.store"),
    timer: withStubs({
      _t: /* @__PURE__ */ new Map(),
      schedule(id, fn, secs, repeat) {
        this.cancel(id);
        this._t.set(id, (repeat ? setInterval : setTimeout)(fn, secs * 1e3));
      },
      cancel(id) {
        const h = this._t.get(id);
        if (h) {
          clearTimeout(h);
          clearInterval(h);
          this._t.delete(id);
        }
      }
    }, "kony.timer"),
    ui: withStubs({ Alert: (cfg) => {
      window.alert(cfg && (cfg.message || cfg.alertMessage) || "");
    } }, "kony.ui"),
    os: withStubs({
      // what desktop web reports (OrientationHandler reads userAgent at start-up)
      deviceInfo: () => ({
        name: "thinclient",
        category: "desktop",
        userAgent: navigator.userAgent,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        deviceWidth: window.innerWidth,
        deviceHeight: window.innerHeight,
        version: navigator.appVersion,
        osversion: navigator.platform,
        model: "",
        deviceid: ""
      }),
      getDeviceCurrentOrientation: () => window.innerHeight > window.innerWidth ? 1 : 2,
      toNumber: Number,
      toCurrency: (v) => String(v)
    }, "kony.os"),
    print: (...a) => console.log(...a),
    type: (v) => v === null ? "null" : Array.isArray(v) ? "table" : typeof v
  }, "kony");
  var modules = { sources: {}, values: {} };
  function resolve(name) {
    const full = String(name).replace(/^\.\//, "").replace(/\.js$/, "");
    const key = full in modules.values || modules.sources[full] != null ? full : full.split("/").pop();
    if (key in modules.values) return modules.values[key];
    if (modules.sources[key] != null) {
      modules.values[key] = void 0;
      const prev = define.last;
      try {
        new Function("define", "kony", "constants", "require", modules.sources[key] + `
//# sourceURL=viz/${key}.js`)(define, kony, constants, requireShim);
      } catch (e) {
        report(`module ${key}`, e);
      }
      modules.values[key] = define.last;
      define.last = prev;
      return modules.values[key];
    }
    missing(`module ${name}`);
    return modules.values[key] = stub(`module ${name}`);
  }
  function define(...args) {
    const f = args[args.length - 1];
    const deps = args.find((a) => Array.isArray(a)) || [];
    let value;
    try {
      value = typeof f === "function" ? f(...deps.map(resolve)) : f;
    } catch (e) {
      report("define", e);
      value = {};
    }
    const name = args.find((a) => typeof a === "string");
    if (name) modules.values[name] = value;
    define.last = value;
    return value;
  }
  function requireShim(names, cb) {
    if (typeof names === "string") return resolve(names);
    const vals = (names || []).map(resolve);
    if (typeof cb === "function") try {
      cb(...vals);
    } catch (e) {
      report("require callback", e);
    }
    return vals[0];
  }
  function report(where, e) {
    const frame = e && e.stack ? e.stack.split("\n").find((l) => /viz\/\S+\.js:\d+:\d+|<anonymous>:\d+:\d+/.test(l)) || "" : "";
    const at = (/viz\/\S+?\.js:\d+:\d+/.exec(frame) || /<anonymous>:\d+:\d+/.exec(frame) || [""])[0];
    const msg = `${where}: ${e && e.message ? e.message : e}${at ? ` [${at}]` : ""}`;
    (window.__vizErrors = window.__vizErrors || []).push(msg);
    console.error("[viz2react]", msg);
  }
  function guard(where, fn) {
    try {
      return fn();
    } catch (e) {
      report(where, e);
      return void 0;
    }
  }
  var ControllerBase = {
    attachToModule(m) {
      this.presenter = m && m.presentationController || m;
    },
    executeOnParent(name, ...args) {
      const p = this.__parent;
      if (p && typeof p[name] === "function") return p[name](...args);
      missing(`executeOnParent ${name}`);
      return void 0;
    },
    getPreviousForm() {
      return app.previous;
    }
  };
  var accessor = (obj, name, part, fn) => {
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
  window.inheritsFrom = (child, parent) => {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  };
  window._kony = { mvc: { GetController, assignFunctions2Controller } };
  for (const g of ["applicationManager", "orientationHandler"]) if (!(g in window)) window[g] = stub(g);

  // saywright/vision/apps/avenzabank/src/runtime/viz.jsx
  var import_react = __toESM(require_react(), 1);

  // saywright/vision/apps/avenzabank/src/runtime/model.js
  var PROP = {
    _text_: "text",
    isvisible: "isVisible",
    _skin_: "skin",
    focusskin: "focusSkin",
    hoverskin: "hoverSkin",
    _left_: "left",
    _top_: "top",
    _right_: "right",
    _bottom_: "bottom",
    _width_: "width",
    _height_: "height",
    centerx: "centerX",
    centery: "centerY",
    minwidth: "minWidth",
    maxwidth: "maxWidth",
    minheight: "minHeight",
    maxheight: "maxHeight",
    zindex: "zIndex",
    layouttype: "layoutType",
    autogrowmode: "autogrowMode",
    contentalignment: "contentAlignment",
    clipbounds: "clipBounds",
    _padding_: "padding",
    paddinginpixel: "paddingInPixel",
    _placeholder_: "placeholder",
    securetextentry: "secureTextEntry",
    maxtextlength: "maxTextLength",
    _src_: "src",
    imagescalemode: "imageScaleMode",
    masterdata: "masterData",
    masterdatamap: "masterDataMap",
    selectedkey: "selectedKey",
    _data_: "data",
    rowtemplate: "rowTemplate",
    widgetdatamap: "widgetDataMap",
    separatorrequired: "separatorRequired",
    separatorcolor: "separatorColor",
    separatorthickness: "separatorThickness",
    sourceUserWidget: "sourceUserWidget",
    responsiveData: "responsiveData",
    enabled: "enabled",
    wType: "wType",
    id: "id",
    kuid: "kuid",
    breakpointInfo: "breakpointInfo",
    texti18n: "i18n_text",
    placeholderi18n: "i18n_placeholder",
    vizProps: "vizProps",
    dataDiffs: "dataDiffs",
    ide_init: "ide_init",
    ide_preShow: "ide_preShow",
    ide_postShow: "ide_postShow",
    ide_onClick: "ide_onClick",
    ide_onRowClick: "ide_onRowClick",
    ide_onTextChange: "ide_onTextChange"
  };
  function dim(v) {
    if (v == null) return null;
    if (typeof v === "object" && "value" in v) return v.value === "" || v.value == null ? null : String(v.value);
    if (typeof v === "number") return v + "dp";
    return v === "" ? null : String(v);
  }
  var DIMS = /* @__PURE__ */ new Set(["left", "top", "right", "bottom", "width", "height", "centerX", "centerY", "minWidth", "maxWidth", "minHeight", "maxHeight"]);
  function mapProps(j) {
    const p = {};
    for (const [k, v] of Object.entries(j || {})) {
      const name = PROP[k];
      if (name) p[name] = DIMS.has(name) ? dim(v) : v;
    }
    return p;
  }
  function fromSm(j) {
    const p = { children: Array.isArray(j.children) ? [...j.children] : [] };
    for (const [k, v] of Object.entries(j)) {
      const name = PROP[k];
      if (!name) continue;
      p[name] = DIMS.has(name) ? dim(v) : v;
    }
    if (p.isVisible === void 0) p.isVisible = true;
    if (p.enabled === void 0) p.enabled = true;
    if (p.info === void 0) p.info = {};
    if (Array.isArray(p.data)) p.data = p.data.map((row) => Object.fromEntries(Object.entries(row || {}).map(([k, v]) => [k, v && typeof v === "object" ? { ...v, "@class": void 0 } : v])));
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
  var METHODS = /* @__PURE__ */ new Set([
    "setVisibility",
    "setEnabled",
    "forceLayout",
    "widgets",
    "add",
    "addAt",
    "remove",
    "removeAll",
    "clone",
    "setData",
    "addAll",
    "removeAt",
    "setDataAt",
    "setFocus",
    "setContext"
  ]);
  var frameOf = (id) => {
    const el = typeof document !== "undefined" && document.querySelector(`[data-viz="${CSS.escape(id)}"]`);
    return el ? { x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight } : { x: 0, y: 0, width: 0, height: 0 };
  };
  var safe = (f) => {
    try {
      return f();
    } catch (e) {
      (window.__vizErrors = window.__vizErrors || []).push(`component: ${e.message}`);
      console.error("[viz2react] component:", e);
      return void 0;
    }
  };
  var FormModel = class {
    // components: {rootKuid: {root, widgets}}; every component instance gets live widgets of its own,
    // "<instance>.<inner>", with the instance's overrides (dataDiffs) applied: controllers write
    // this.view.OTPModule.tbxCVV.text and the component renders from these widgets
    constructor(formId, widgets, onChange, components2 = {}) {
      this.formId = formId;
      this.models = /* @__PURE__ */ new Map();
      this.proxies = /* @__PURE__ */ new Map();
      this.onChange = onChange;
      this.components = components2;
      for (const [id, j] of Object.entries(widgets)) this.models.set(id, fromSm(j));
      for (const [id, m] of [...this.models]) if (m.wType === "UserWidgetInstance") this.instantiate(id, m);
      const self = this;
      this.view = new Proxy({}, {
        get(_, k) {
          if (typeof k === "symbol") return void 0;
          if (k === "id") return formId;
          if (self.models.has(k)) return self.proxy(k);
          return self.proxy(formId)[k];
        },
        set(_, k, v) {
          self.proxy(formId)[k] = v;
          return true;
        },
        has(_, k) {
          return self.models.has(k);
        }
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
        const inner2 = { ...fromSm(j), ...mapProps(o) };
        inner2.children = (inner2.children || []).map((c) => id + "." + c);
        inner2.id = id + "." + wid;
        this.models.set(inner2.id, inner2);
        if (inner2.wType === "UserWidgetInstance") this.instantiate(inner2.id, inner2);
      }
    }
    // the component's own controller for an instance (userwidgets/<ns>/modules/require/<Name>Controller.js):
    // its this.view sees the instance's widgets; created once, constructor and initGettersSetters run
    ctl(id) {
      const m = this.models.get(id);
      if (!m || m.wType !== "UserWidgetInstance") return null;
      if (this.ctls && this.ctls.has(id)) return this.ctls.get(id);
      const comp = this.components[m.sourceUserWidget];
      this.ctls = this.ctls || /* @__PURE__ */ new Map();
      if (!comp || !comp.controller) {
        this.ctls.set(id, null);
        return null;
      }
      const self = this;
      const c = Object.assign(Object.create(this.base || {}), safe(comp.controller) || {}, safe(comp.actions) || {});
      c.view = new Proxy({}, {
        get(_, k) {
          if (typeof k === "symbol") return void 0;
          if (k === "id") return id;
          if (self.models.has(id + "." + k)) return self.proxy(id + "." + k);
          if (METHODS.has(k)) return self.proxy(id)[k];
          return self.models.get(id)[k];
        },
        set(_, k, v) {
          self.models.get(id)[k] = v;
          self.changed();
          return true;
        }
      });
      c.__parent = this.formController;
      this.ctls.set(id, c);
      if (Object.prototype.hasOwnProperty.call(c, "constructor") && typeof c.constructor === "function") safe(() => c.constructor({}, {}, {}));
      if (typeof c.initGettersSetters === "function") safe(() => c.initGettersSetters());
      for (const [k, def] of Object.entries(comp.props || {})) {
        const v = Object.prototype.hasOwnProperty.call(m, k) ? m[k] : def;
        safe(() => {
          c[k] = v;
        });
      }
      return c;
    }
    changed() {
      this.onChange && this.onChange();
    }
    register(id, props) {
      this.models.set(id, props);
    }
    unregister(id) {
      const m = this.models.get(id);
      if (!m) return;
      (m.children || []).forEach((c) => this.unregister(c));
      this.models.delete(id);
      this.proxies.delete(id);
    }
    get(id) {
      return this.models.get(id) || this.detached && this.detached.get(id);
    }
    proxy(id) {
      if (this.proxies.has(id)) return this.proxies.get(id);
      const self = this;
      const methods = {
        setVisibility(v) {
          self.get(id).isVisible = !!v;
          self.changed();
        },
        setEnabled(v) {
          self.get(id).enabled = !!v;
          self.changed();
        },
        forceLayout() {
          self.changed();
        },
        widgets() {
          return (self.get(id).children || []).filter((c) => self.models.has(c)).map((c) => self.proxy(c));
        },
        add(...ws) {
          ws.forEach((w) => self.attach(id, w));
          self.changed();
        },
        addAt(w, index) {
          self.attach(id, w, index);
          self.changed();
        },
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
        clone(prefix) {
          return self.cloneTree(id, prefix == null ? "" : String(prefix));
        },
        setData(rows) {
          self.get(id).data = rows;
          self.changed();
        },
        addAll(rows) {
          const m = self.get(id);
          m.data = [...m.data || [], ...rows];
          self.changed();
        },
        removeAt(i) {
          const m = self.get(id);
          m.data = (m.data || []).filter((_, k) => k !== i);
          self.changed();
        },
        setDataAt(row, i) {
          const m = self.get(id);
          m.data = (m.data || []).map((r, k) => k === i ? row : r);
          self.changed();
        },
        setFocus() {
        },
        setContext() {
        }
      };
      const p = new Proxy({}, {
        get(_, k) {
          if (k === "id") return id;
          if (k in methods) return methods[k];
          if (k === "frame") return frameOf(id);
          if (typeof k === "string" && self.models.has(id + "." + k)) return self.proxy(id + "." + k);
          const own = self.get(id);
          if (own && typeof k === "string" && (own.children || []).includes(k)) return self.proxy(k);
          const ctl = self.ctl(id);
          if (ctl && typeof k === "string" && k in ctl) {
            const v = ctl[k];
            return typeof v === "function" ? v.bind(ctl) : v;
          }
          const m = self.get(id);
          return m ? m[k] : void 0;
        },
        set(_, k, v) {
          const m = self.get(id);
          if (!m) return true;
          const ctl = m.wType === "UserWidgetInstance" ? self.ctl(id) : null;
          if (ctl && (k in ctl || typeof v === "function")) ctl[k] = v;
          if (!ctl || !(k in ctl) || DIMS.has(k) || k === "isVisible") m[k] = DIMS.has(k) ? dim(v) : v;
          self.changed();
          return true;
        }
      });
      this.proxies.set(id, p);
      return p;
    }
    // clone(prefix): a detached copy of the subtree; ids get the prefix (R25: this.view[prefix + id])
    cloneTree(id, prefix) {
      const src = this.models.get(id);
      const copy = JSON.parse(JSON.stringify({ ...src, children: [] }, (k, v) => typeof v === "function" ? void 0 : v));
      for (const [k, v] of Object.entries(src)) if (typeof v === "function") copy[k] = v;
      copy.id = prefix + id;
      copy.children = (src.children || []).map((c) => this.cloneTree(c, prefix).id);
      copy.dynamic = src.dynamic;
      this.detached = this.detached || /* @__PURE__ */ new Map();
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
      if (index == null || index >= parent.children.length) parent.children.push(wid);
      else parent.children.splice(index, 0, wid);
      parent.dynamic = true;
    }
  };

  // saywright/vision/apps/avenzabank/src/runtime/viz.jsx
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var Ctx = (0, import_react.createContext)(null);
  var LAYOUT = { 2: "free", 3: "hflow", 4: "vflow", 5: "free" };
  var CONTAINERS = /* @__PURE__ */ new Set(["Form", "FlexContainer", "FlexScrollContainer"]);
  var DEF_W = { FlexContainer: "100%", FlexScrollContainer: "100%", Segment: "100%", UserWidgetInstance: "100%", TextField: "260dp", TextArea: "260dp", ListBox: "260dp", Calendar: "200dp" };
  var DEF_H = { TextField: "40dp", ListBox: "40dp", TextArea: "120dp", Calendar: "40dp" };
  var ALIGN = {
    1: ["flex-start", "flex-start", "left"],
    2: ["flex-start", "center", "center"],
    3: ["flex-start", "flex-end", "right"],
    4: ["center", "flex-start", "left"],
    5: ["center", "center", "center"],
    6: ["center", "flex-end", "right"],
    7: ["flex-end", "flex-start", "left"],
    8: ["flex-end", "center", "center"],
    9: ["flex-end", "flex-end", "right"]
  };
  var len = (v) => {
    if (v == null || v === "") return null;
    if (v === "preferred") return "auto";
    const s = String(v).trim();
    const m = /^(-?[\d.]+)\s*(dp|px|%)?$/.exec(s);
    if (!m) return null;
    return m[2] === "%" ? `${m[1]}%` : `${m[1]}px`;
  };
  var isPct = (v) => typeof v === "string" && v.trim().endsWith("%");
  function bpKeyOf(info, width) {
    const list = Object.entries(info || {}).map(([k, v]) => [k, v && v.width]).filter(([, w]) => typeof w === "number").sort((a, b) => a[1] - b[1]);
    const hit = list.find(([, w]) => width <= w);
    return hit ? hit[0] : null;
  }
  var eff = (m, bp) => bp && m.responsiveData && m.responsiveData[bp] ? { ...m, ...m.responsiveData[bp] } : m;
  var widgetColor = (c) => {
    if (typeof c !== "string" || c.length < 6) return null;
    const n = (i) => parseInt(c.slice(i, i + 2), 16);
    const t = c.length >= 8 ? n(6) : 0;
    return `rgba(${n(0)}, ${n(2)}, ${n(4)}, ${Math.max(0, 1 - t / 100)})`;
  };
  function placement(p, parentLayout) {
    const s = { boxSizing: "border-box", flexShrink: 0, position: "relative", minWidth: 0 };
    const stretchX = p.left != null && p.right != null && p.width == null;
    const stretchY = p.top != null && p.bottom != null && p.height == null;
    const W = stretchX ? null : len(p.width != null ? p.width : DEF_W[p.wType]);
    const H = stretchY ? null : len(p.height != null ? p.height : CONTAINERS.has(p.wType) && p.autogrowMode !== 1 ? null : DEF_H[p.wType]);
    const centre = (c, size) => size && size !== "auto" ? `calc(${len(c)} - (${size}) / 2)` : null;
    const horizontal = (selfKey) => {
      if (p.centerX != null) {
        const m = centre(p.centerX, W);
        if (m) {
          s[selfKey] = "start";
          s.marginLeft = m;
        } else s[selfKey] = "center";
      } else if (stretchX) {
        s[selfKey] = "stretch";
        s.marginLeft = len(p.left);
        s.marginRight = len(p.right);
      } else if (p.right != null && p.left == null) {
        s[selfKey] = "end";
        s.marginRight = len(p.right);
      } else {
        s[selfKey] = "start";
        s.marginLeft = len(p.left) || "0px";
      }
    };
    const vertical = (selfKey) => {
      if (p.centerY != null) {
        const m = centre(p.centerY, H);
        if (m && !isPct(p.centerY)) {
          s[selfKey] = "start";
          s.marginTop = m;
        } else s[selfKey] = "center";
      } else if (stretchY) {
        s[selfKey] = "stretch";
        s.marginTop = len(p.top);
        s.marginBottom = len(p.bottom);
      } else if (p.bottom != null && p.top == null) {
        s[selfKey] = "end";
        s.marginBottom = len(p.bottom);
      } else if (isPct(p.top)) {
        s[selfKey] = "start";
        s.top = p.top;
      } else {
        s[selfKey] = "start";
        s.marginTop = len(p.top) || "0px";
      }
    };
    if (parentLayout === "free") {
      s.gridArea = "1 / 1";
      horizontal("justifySelf");
      vertical("alignSelf");
    } else if (parentLayout === "vflow") {
      const flowTop = p.centerY != null && !isPct(p.centerY) && centre(p.centerY, H) ? centre(p.centerY, H) : len(p.top) || "0px";
      if (p.bottom != null) s.marginBottom = len(p.bottom);
      horizontal("alignSelf");
      if (s.alignSelf === "start") s.alignSelf = "flex-start";
      if (s.alignSelf === "end") s.alignSelf = "flex-end";
      s.marginTop = flowTop;
    } else {
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
  function inner(p) {
    const layout = LAYOUT[p.layoutType] || "free";
    const s = layout === "free" ? { display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gridTemplateRows: "minmax(0, 1fr)" } : { display: "flex", flexDirection: layout === "vflow" ? "column" : "row", alignItems: "flex-start" };
    if (p.clipBounds !== false) s.overflow = "hidden";
    if (p.wType === "FlexScrollContainer") s.overflow = "auto";
    return { layout, style: s };
  }
  var skinClass = (skin, wType) => {
    const known = window.__vizSkinKnown, defaults = window.__vizDefaultSkin || {};
    let kuid = skin ? window.__vizSkinByName && window.__vizSkinByName[skin] || skin : null;
    if ((!kuid || known && !known.has(kuid)) && defaults[wType]) kuid = defaults[wType];
    return kuid ? "skn-" + kuid : "";
  };
  function useWidget(id) {
    const c = (0, import_react.useContext)(Ctx);
    const raw = c.lookup(id);
    return raw ? { c, p: eff(raw, c.bp), raw } : { c, p: null, raw: null };
  }
  var textOf = (p) => p.text != null && p.text !== "" ? p.text : p.i18n_text ? app.i18n[p.i18n_text] || "" : p.text || "";
  var fire = (c, p, prop, ide, ...args) => guard(`${p.id}.${prop}`, () => {
    if (typeof p[prop] === "function") return p[prop].apply(c.controller, args);
    if (p[ide] && c.controller && typeof c.controller[p[ide]] === "function") return c.controller[p[ide]](...args);
    return void 0;
  });
  function Flex({ id, children, parentLayout }) {
    const { c, p } = useWidget(id);
    if (!p) return null;
    const { layout, style } = inner(p);
    const kids = p.dynamic || !children ? (p.children || []).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Widget, { id: k, parentLayout: layout }, k)) : import_react.default.Children.map(children, (ch) => import_react.default.isValidElement(ch) ? import_react.default.cloneElement(ch, { parentLayout: layout }) : ch);
    const click = typeof p.onClick === "function" || p.ide_onClick;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-viz": id,
        className: skinClass(p.skin, p.wType),
        style: { ...placement(p, parentLayout), ...style, ...p.isVisible === false ? { display: "none" } : {}, cursor: click ? "pointer" : void 0 },
        onClick: click ? (e) => {
          e.stopPropagation();
          fire(c, p, "onClick", "ide_onClick", c.fm.proxy(id));
        } : void 0,
        children: kids
      }
    );
  }
  function Label({ id, parentLayout }) {
    const { p } = useWidget(id);
    if (!p) return null;
    const [v, h, ta] = ALIGN[p.contentAlignment] || ALIGN[4];
    const fixed = p.width != null && p.width !== "preferred";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-viz": id, className: skinClass(p.skin, p.wType), style: {
      ...placement(p, parentLayout),
      display: p.isVisible === false ? "none" : "flex",
      alignItems: v,
      justifyContent: h,
      textAlign: ta,
      whiteSpace: fixed ? "normal" : "nowrap",
      overflow: "hidden",
      wordBreak: "break-word"
    }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: textOf(p) }) });
  }
  function Button({ id, parentLayout }) {
    const { c, p } = useWidget(id);
    if (!p) return null;
    const [v, h] = ALIGN[p.contentAlignment] || ALIGN[5];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        "data-viz": id,
        type: "button",
        className: skinClass(p.skin, p.wType),
        disabled: p.enabled === false,
        style: { ...placement(p, parentLayout), display: p.isVisible === false ? "none" : "flex", alignItems: v, justifyContent: h, cursor: "pointer", whiteSpace: "nowrap" },
        onClick: (e) => {
          e.stopPropagation();
          fire(c, p, "onClick", "ide_onClick", c.fm.proxy(id));
        },
        children: textOf(p)
      }
    );
  }
  function TextField({ id, parentLayout }) {
    const { c, p, raw } = useWidget(id);
    if (!p) return null;
    const Tag = p.wType === "TextArea" ? "textarea" : "input";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Tag,
      {
        "data-viz": id,
        className: skinClass(p.skin, p.wType),
        type: p.secureTextEntry ? "password" : "text",
        value: p.text || "",
        placeholder: p.placeholder || p.i18n_placeholder && app.i18n[p.i18n_placeholder] || "",
        maxLength: p.maxTextLength || void 0,
        style: { ...placement(p, parentLayout), padding: "0 10px" },
        onChange: (e) => {
          raw.text = e.target.value;
          c.fm.changed();
          fire(c, p, "onTextChange", "ide_onTextChange", c.fm.proxy(id));
        },
        onKeyDown: (e) => {
          if (e.key === "Enter") fire(c, p, "onDone", "ide_onDone", c.fm.proxy(id));
        }
      }
    );
  }
  function ListBox({ id, parentLayout }) {
    const { c, p, raw } = useWidget(id);
    if (!p) return null;
    const opts = Array.isArray(p.masterData) ? p.masterData : Array.isArray(p.masterDataMap) && Array.isArray(p.masterDataMap[0]) ? p.masterDataMap[0].map((r) => [r[p.masterDataMap[1]], r[p.masterDataMap[2]]]) : [];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "select",
      {
        "data-viz": id,
        className: skinClass(p.skin, p.wType),
        value: p.selectedKey || "",
        style: placement(p, parentLayout),
        onChange: (e) => {
          raw.selectedKey = e.target.value;
          raw.selectedKeyValue = opts.find((o) => String(o[0]) === e.target.value) || null;
          c.fm.changed();
          fire(c, p, "onSelection", "ide_onSelection", c.fm.proxy(id));
        },
        children: opts.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: String(o[0]), children: o[1] }, String(o[0])))
      }
    );
  }
  function Image({ id, parentLayout }) {
    const { c, p } = useWidget(id);
    if (!p) return null;
    const src = p.src && c.images[String(p.src).toLowerCase()];
    return src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { "data-viz": id, alt: "", src, style: { ...placement(p, parentLayout), objectFit: p.imageScaleMode === 0 ? "fill" : "contain" } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-viz": id, style: { ...placement(p, parentLayout) } });
  }
  function Segment({ id, parentLayout }) {
    const { c, p } = useWidget(id);
    if (!p) return null;
    const tpl = c.templateFor(p.rowTemplate);
    const rows = Array.isArray(p.data) ? p.data : [];
    const sep = p.separatorRequired ? `${p.separatorThickness || 1}px solid ${widgetColor(p.separatorColor) || "transparent"}` : "none";
    const map = p.widgetDataMap || {};
    const style = { ...placement(p, parentLayout), overflow: p.autogrowMode === 1 ? "visible" : "auto" };
    if (p.autogrowMode === 1) style.height = "auto";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-viz": id, className: skinClass(p.skin, p.wType), style, children: tpl && rows.map((row, i) => {
      const values = {};
      for (const [wid, key] of Object.entries(map)) {
        const v = row[key];
        if (v === void 0) continue;
        values[wid] = v !== null && typeof v === "object" ? v : { [tpl.widgets[wid] && tpl.widgets[wid].wType === "Image" ? "src" : "text"]: v };
      }
      const lookup = (wid) => tpl.models[wid] ? { ...tpl.models[wid], ...values[wid] || {} } : c.lookup(wid);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          style: { borderBottom: sep, cursor: "pointer" },
          onClick: () => {
            const m = c.fm.models.get(id);
            m.selectedRowIndex = [0, i];
            m.selectedIndex = [0, i];
            m.selectedRowItems = [row];
            fire(c, m, "onRowClick", "ide_onRowClick", c.fm.proxy(id), 0, i);
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, { value: { ...c, lookup }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Widget, { id: tpl.root, parentLayout: "vflow" }) })
        },
        i
      );
    }) });
  }
  function Component2({ id, parentLayout }) {
    const { c, p } = useWidget(id);
    if (!p) return null;
    if (!p.componentRoot) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-viz": id, style: placement(p, parentLayout) });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-viz": id, style: { ...placement(p, parentLayout), display: p.isVisible === false ? "none" : "grid", gridTemplateColumns: "minmax(0, 1fr)" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Widget, { id: p.componentRoot, parentLayout: "free" }) });
  }
  var BY_TYPE = { FlexContainer: Flex, FlexScrollContainer: Flex, Label, Button, TextField, TextArea: TextField, ListBox, Image, Segment, UserWidgetInstance: Component2, RichText: Label, Calendar: TextField };
  function Widget({ id, parentLayout }) {
    const { p } = useWidget(id);
    if (!p) return null;
    const C = BY_TYPE[p.wType];
    if (!C) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-viz": id, title: `${p.wType} not converted`, style: placement(p, parentLayout) });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(C, { id, parentLayout });
  }
  function formInstance(formId) {
    if (app.controllers[formId]) return app.controllers[formId];
    const def = app.forms[formId];
    if (!def) return null;
    let queued = false;
    const fm = new FormModel(formId, def.widgets, () => {
      if (!queued) {
        queued = true;
        Promise.resolve().then(() => {
          queued = false;
          fm.rerender && fm.rerender();
        });
      }
    }, def.components);
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
    for (const [wid, m] of fm.models) if (m.wType === "UserWidgetInstance") fm.ctl(wid);
    return ctl;
  }
  app.controllerFor = formInstance;
  function FormHost({ formId, context, navKey, View }) {
    const def = app.forms[formId];
    const [, rerender] = (0, import_react.useReducer)((x) => x + 1, 0);
    const [width, setWidth] = (0, import_react.useState)(window.innerWidth);
    const ctl = formInstance(formId);
    const fm = ctl.__fm;
    fm.rerender = rerender;
    const info = fm.models.get(formId).breakpointInfo;
    const widths = Object.values(info || {}).map((b) => b && b.width).filter((w) => typeof w === "number");
    if (widths.length) app.breakpoints = widths;
    (0, import_react.useEffect)(() => {
      const form = fm.models.get(formId);
      if (typeof ctl.onNavigate === "function") guard(`${formId}.onNavigate`, () => ctl.onNavigate(context));
      if (!ctl.__inited) {
        ctl.__inited = true;
        if (form.ide_init && typeof ctl[form.ide_init] === "function") guard(`${formId}.init`, () => ctl[form.ide_init](fm.view));
      }
      if (typeof form.preShow === "function") guard(`${formId}.preShow`, () => form.preShow.call(ctl));
      else if (form.ide_preShow && typeof ctl[form.ide_preShow] === "function") guard(`${formId}.preShow`, () => ctl[form.ide_preShow](fm.view));
      for (const [wid, m] of fm.models) if (m.wType === "UserWidgetInstance" && typeof m.preShow === "function") guard(`${wid}.preShow`, () => m.preShow.call(fm.ctl(wid)));
      rerender();
      const t = setTimeout(() => {
        if (typeof form.postShow === "function") guard(`${formId}.postShow`, () => form.postShow.call(ctl));
        else if (form.ide_postShow && typeof ctl[form.ide_postShow] === "function") guard(`${formId}.postShow`, () => ctl[form.ide_postShow](fm.view));
      });
      return () => clearTimeout(t);
    }, [formId, navKey]);
    (0, import_react.useEffect)(() => {
      let last = currentBreakpoint();
      const onResize = () => {
        setWidth(window.innerWidth);
        const bp2 = currentBreakpoint();
        if (bp2 !== last) {
          last = bp2;
          const form = fm.models.get(formId);
          if (typeof form.onBreakpointChange === "function") guard(`${formId}.onBreakpointChange`, () => form.onBreakpointChange.call(ctl, fm.view, window.innerWidth));
        }
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, [formId]);
    const formModel = fm.models.get(formId);
    const bp = app.responsive !== false && formModel.breakpointInfo ? bpKeyOf(formModel.breakpointInfo, width) : null;
    const value = {
      fm,
      controller: ctl,
      bp,
      images: window.__vizImages || {},
      lookup: (id) => fm.models.get(id),
      templateFor: (root) => def.templates[root] || null,
      componentFor: (kuid) => def.components[kuid] || null
    };
    const p = eff(formModel, bp);
    const { layout, style } = inner(p);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, { value, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-viz": formId, className: skinClass(p.skin, p.wType), style: { ...style, minHeight: "100vh", width: "100%", position: "relative" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, { parentLayout: layout }) }) });
  }
  function definitions(trees) {
    const out = {};
    for (const [key, t] of Object.entries(trees)) {
      out[key] = { root: t.root, widgets: t.widgets, props: t.props || {}, models: Object.fromEntries(Object.entries(t.widgets).map(([id, j]) => [id, fromSm(j)])) };
    }
    return out;
  }

  // saywright/vision/apps/avenzabank/src/defs.json
  var defs_default = { templates: { flxrow1: { root: "flxrow1", widgets: { flxAccInfo: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "15dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "40%" }, allboxes: [], autogrowmode: 1, canUpdateUI: true, children: ["lblSavingsAcc", "lblAccNo"], clipbounds: false, containerId: true, containerweight: 100, enablescrolling: true, id: "flxAccInfo", info: null, iscustomlayout: false, isvisible: true, kuid: "b4ae3dbda055456882d86fafc249d19d", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxrow1", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxAmt: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "38%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblSavAmt", "lblPriSav"], clipbounds: false, containerId: true, containerweight: 100, enablescrolling: true, id: "flxAmt", info: null, iscustomlayout: false, isvisible: true, kuid: "ad6efb7fa9284836a18096c253b76af6", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxrow1", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxBg: { DNDConfig: null, _height_: { type: "string", value: "42px" }, _left_: { type: "string", value: "20dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s70bc855a44d417c96b1291c8bc6cbd4", _top_: { type: "string", value: "14dp" }, _width_: { type: "string", value: "42px" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, children: ["imgHome"], clipbounds: false, containerId: true, containerweight: 100, enablescrolling: true, id: "flxBg", info: null, iscustomlayout: false, isvisible: true, kuid: "f9fb6934fc4e454e951c3794c9f7e663", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxHome", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHome: { DNDConfig: null, _height_: { type: "string", value: "60px" }, _left_: { type: "string", value: "10dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "5.12%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxBg"], clipbounds: false, containerId: true, containerweight: 100, enablescrolling: true, id: "flxHome", info: null, iscustomlayout: false, isvisible: true, kuid: "ad2977c0590642d6a755690d1576fb82", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxrow1", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxNext: { DNDConfig: null, _height_: { type: "string", value: "88dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "7%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["imgNext"], clipbounds: false, containerId: true, containerweight: 100, enablescrolling: true, id: "flxNext", info: null, iscustomlayout: false, isvisible: true, kuid: "da50898d865b43b7a459f5246d9b9909", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxrow1", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxrow1: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, children: ["flxHome", "flxAccInfo", "flxAmt", "flxNext"], clipbounds: false, containerId: true, containerweight: 100, controllerInfo: { default: { channel: "desktop", fileType: "js", name: "flxrow1Controller" } }, enablescrolling: true, id: "flxrow1", info: null, isTemplate: true, iscustomlayout: false, isvisible: true, kuid: "f8f2ccfb0ca44ac6982d698eefe37177", layouttype: 3, name: "kony.ui.FlexContainer", parent: "segAccount", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1 }, imgHome: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _bottom_: { type: "string", value: "0dp" }, _height_: { type: "string", value: "20px" }, _left_: { type: "string", value: "10dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _skin_: "s6dd3826f2014a8da2449d98b18b9259", _src_: "home_icon_silhouette.png", _top_: { type: "string", value: "0" }, _width_: { type: "string", value: "26px" }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, containerId: true, containerweight: 100, id: "imgHome", imagescalemode: 1, info: null, invokedProperty: "src", iscustomlayout: false, isvisible: true, kuid: "bffe95669746460fa4dab3e673b8f510", name: "kony.ui.Image2", parent: "flxBg", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, imgNext: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _height_: { type: "string", value: "25px" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "50dp" }, _skin_: "s6dd3826f2014a8da2449d98b18b9259", _src_: "right__1_.png", _top_: { type: "string", value: "15dp" }, _width_: { type: "string", value: "50px" }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, containerId: true, containerweight: 100, id: "imgNext", imagescalemode: 1, info: null, invokedProperty: "src", iscustomlayout: false, isvisible: true, kuid: "b348169c98dc4168aa1814f976f19907", name: "kony.ui.Image2", parent: "flxNext", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, lblAccNo: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "123456XXXX", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblAccNo", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d6bd7f116c724af4ae1120e2b81ded8c", name: "kony.ui.Label", parent: "flxAccInfo", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblPriSav: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _bottom_: { type: "string", value: "40dp" }, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "250dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s411785ec2b9426a8b7688c590993501", _text_: "Primary Savings", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerId: true, containerweight: 100, contentalignment: 4, id: "lblPriSav", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ab9e28f5b5a048cdb2252e42bdb53fa5", name: "kony.ui.Label", parent: "flxAmt", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSavAmt: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "250dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "$12,450.75", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerId: true, containerweight: 100, contentalignment: 4, id: "lblSavAmt", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c0edd2f55ab3456b814db7b21090d2b6", name: "kony.ui.Label", parent: "flxAmt", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSavingsAcc: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Savings Account", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblSavingsAcc", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "hf01ca43cbcd407ea5a9dd2e9cd583ae", name: "kony.ui.Label", parent: "flxAccInfo", pf: "segAccount", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 } } } }, components: { effc0845c8f9420c9f5a770b0abbb7d6: { root: "DashboardHeader", name: "com.avenza.common.DashboardHeader", props: {}, widgets: { DashboardHeader: { DNDConfig: null, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxParent"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "DashboardHeader", info: null, iscustomlayout: false, isvisible: true, kuid: "effc0845c8f9420c9f5a770b0abbb7d6", layouttype: 2, name: "kony.ui.FlexContainer", parent: "userwidgetmodel", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, vizProps: { hidewidgethierarchy: false }, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxBankName: { DNDConfig: null, _height_: { type: "string", value: "91dp" }, _left_: { type: "string", value: "4%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "220px" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblAvenza", "lblBank"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxBankName", info: null, iscustomlayout: false, isvisible: true, kuid: "c875096256914e93a04f51419dd4b705", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "userwidgetmodel", responsiveData: { b2: {} }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCredentails: { DNDConfig: null, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "25%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "320dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblAccounts", "lblTransfers", "lblProfile"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCredentails", info: null, iscustomlayout: false, isvisible: true, kuid: "eb0b1392560a4953b7e3a9eeb613f3db", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "userwidgetmodel", responsiveData: { b1: { left: { type: "string", value: "325px" } }, b2: { left: { type: "string", value: "300px" }, top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLogo: { DNDConfig: null, _height_: { type: "string", value: "50dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "0" }, _skin_: "s5b2a204415149148873029d59dea60d", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "50dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "string", value: "50%" }, children: ["lblMF"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLogo", info: null, iscustomlayout: false, isvisible: true, kuid: "c1e08165035242009bbc615f4b59cfe5", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxUser", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxParent: { DNDConfig: null, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s019fa5a22174c24aad3a7a51091d1e1", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxBankName", "flxCredentails", "flxUser"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxParent", info: null, iscustomlayout: false, isvisible: true, kuid: "j252f775ec9145ccae858e9c9949433d", layouttype: 2, name: "kony.ui.FlexContainer", parent: "DashboardHeader", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxUser: { DNDConfig: null, _height_: { type: "string", value: "89dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "3%" }, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "220px" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblNme", "flxLogo"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxUser", info: null, iscustomlayout: false, isvisible: true, kuid: "ca2db60a02f04bd78350b6c9c248417b", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, lblAccounts: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Accounts", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblAccounts", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a0aa145202da47a1a9e0dbe273680765", name: "kony.ui.Label", parent: "flxCredentails", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblAvenza: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s77dc93446fb437892166de5d8f60e94", _text_: "Avenza", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblAvenza", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d05379e31ed7425bb42b5e6d458c0e01", name: "kony.ui.Label", parent: "flxBankName", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblBank: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s725c5d9d7b94b1bb92915a796c3f701", _text_: "Bank", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblBank", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b9d7a8ca47a548109cd2c6b6d50154a2", name: "kony.ui.Label", parent: "flxBankName", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMF: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s456569a8be94341ba351883398719cf", _text_: "MF", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblMF", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "g3621dacd12b40faa191f86051126bb9", name: "kony.ui.Label", parent: "flxLogo", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblNme: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Maya Fernandes", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblNme", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b3ab109848fb49bead2575592ce6df94", name: "kony.ui.Label", parent: "flxUser", pf: "userwidgetmodel", responsiveData: { b2: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblProfile: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "15%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Profile", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblProfile", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d5015326b98a480e956e4b38fdd0a4c0", name: "kony.ui.Label", parent: "flxCredentails", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTransfers: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "15%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Transfers", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblTransfers", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "bdf3c3e24d3142f5a09288f84f5f889a", name: "kony.ui.Label", parent: "flxCredentails", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 } } }, fe23c764d4fd47fdb6b33453510269bf: { root: "TransFlow", name: "com.avenza.transfer.TransFlow", props: {}, widgets: { flxL1: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "20dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8e1bf97b36c425ba35106913974a1a1", _top_: { type: "string", value: "35dp" }, _width_: { type: "string", value: "15.37%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxL1", info: null, iscustomlayout: false, isvisible: true, kuid: "d3734f42c39b45d68f274bfb1a11aeac", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxL2: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "20dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8e1bf97b36c425ba35106913974a1a1", _top_: { type: "string", value: "34dp" }, _width_: { type: "string", value: "15.37%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxL2", info: null, iscustomlayout: false, isvisible: true, kuid: "a25f46a542cc4fa19eb5378c893e2a0d", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxMain: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "20dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 1, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxR1", "lblDetails", "flxL1", "flxR2", "lblConfirm", "flxL2", "flxR3", "lblDone"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxMain", info: null, iscustomlayout: false, isvisible: true, kuid: "j198be9127e242a49ae5b482fd7cf5b9", layouttype: 3, name: "kony.ui.FlexContainer", parent: "TransFlow", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxR1: { DNDConfig: null, _height_: { type: "string", value: "40dp" }, _left_: { type: "string", value: "18%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s5b2a204415149148873029d59dea60d", _top_: { type: "string", value: "15dp" }, _width_: { type: "string", value: "40dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lbl1"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxR1", info: null, iscustomlayout: false, isvisible: true, kuid: "i1796d7847ca427e818ca6c1af7f16de", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxR2: { DNDConfig: null, _height_: { type: "string", value: "40dp" }, _left_: { type: "string", value: "20dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8e1bf97b36c425ba35106913974a1a1", _top_: { type: "string", value: "15dp" }, _width_: { type: "string", value: "40dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lbl2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxR2", info: null, iscustomlayout: false, isvisible: true, kuid: "j665de96f8a444809e59c66c6476503a", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxR3: { DNDConfig: null, _height_: { type: "string", value: "40dp" }, _left_: { type: "string", value: "20dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8e1bf97b36c425ba35106913974a1a1", _top_: { type: "string", value: "15dp" }, _width_: { type: "string", value: "40dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lbl3"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxR3", info: null, iscustomlayout: false, isvisible: true, kuid: "f3575d0e354d490182bf0604ac57d8c1", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, lbl1: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s456569a8be94341ba351883398719cf", _text_: "1", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lbl1", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b72af3de32e248ea88d936e2b5a309f3", name: "kony.ui.Label", parent: "flxR1", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lbl2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sdccf88dd4634d8986e2b78ffbf3f6e6", _text_: "2", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lbl2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b1309044df3545ac8ed822e2f9f54616", name: "kony.ui.Label", parent: "flxR2", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lbl3: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sdccf88dd4634d8986e2b78ffbf3f6e6", _text_: "3", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lbl3", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b13beb4167bf484b9f9da4c716f9fd7b", name: "kony.ui.Label", parent: "flxR3", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblConfirm: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "15dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Confirm", _top_: { type: "string", value: "24dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblConfirm", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "e06bda5f0d9349d39e9df007a49913ed", name: "kony.ui.Label", parent: "flxMain", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDetails: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "15dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sa27ad141bcf4dddbf9335594f452b79", _text_: "Details", _top_: { type: "string", value: "24dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblDetails", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c311303c7cb94989af24a1efdeb527ec", name: "kony.ui.Label", parent: "flxMain", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDone: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "15dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Done", _top_: { type: "string", value: "24dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblDone", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "gd1a86f7a21549dbb2347a3fd79b5b15", name: "kony.ui.Label", parent: "flxMain", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, TransFlow: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "3dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s18ac633c5434efd9af25ae9169b888a", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 1, canUpdateUI: true, children: ["flxMain"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "TransFlow", info: null, iscustomlayout: false, isvisible: true, kuid: "fe23c764d4fd47fdb6b33453510269bf", layouttype: 2, name: "kony.ui.FlexContainer", parent: "userwidgetmodel", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 } } }, g7c2519a80924e7282b165b871135181: { root: "buttoncb", name: "com.avenza.action.buttoncb", props: {}, widgets: { btnBack: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "10dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "10dp" }, _skin_: "s861076139004c02acde8b657bba0781", _text_: "Back", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "40%" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sebb8da9cae845b7937327af2fecec1c", id: "btnBack", info: null, iscustomlayout: false, isvisible: true, kuid: "c7410c92eb424725ae73e4b0ccf863e3", name: "kony.ui.Button", parent: "flxBg", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, btnContinue: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "sb550693e12b4fcf9c317e9583349c41", _text_: "Continue", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "50%" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sebb8da9cae845b7937327af2fecec1c", id: "btnContinue", info: null, iscustomlayout: false, isvisible: true, kuid: "ia742806862543aab64a2a3283f2e7dc", name: "kony.ui.Button", parent: "flxBg", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, buttoncb: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxBg"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "buttoncb", info: null, iscustomlayout: false, isvisible: true, kuid: "g7c2519a80924e7282b165b871135181", layouttype: 2, name: "kony.ui.FlexContainer", parent: "userwidgetmodel", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, vizProps: { hidewidgethierarchy: false }, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxBg: { DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s682b4dc50d946efb6007b37d9adb85f", _top_: { type: "string", value: "38dp" }, _width_: { type: "string", value: "55%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["btnContinue", "btnBack"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxBg", info: null, iscustomlayout: false, isvisible: true, kuid: "be04cdbe61eb490b9251483fff751c6d", layouttype: 3, name: "kony.ui.FlexContainer", parent: "buttoncb", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 } } }, dc3299f470514829814062d8abd8ef8c: { root: "header2", name: "com.avenza.common.header2", props: {}, widgets: { flxbg: { DNDConfig: null, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sc1f072aaa394d00b455576ff4f77978", _top_: { type: "string", value: "90dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxFrstline", "lblText1", "lblText2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxbg", info: null, iscustomlayout: false, isvisible: true, kuid: "g72b9e873c02480686d4f68f91178fd5", layouttype: 2, name: "kony.ui.FlexContainer", parent: "header2", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxFrstline: { DNDConfig: null, _height_: { type: "string", value: "10dp" }, _left_: { type: "string", value: "62dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s85ae3a40d144bbaba053cd63123ed99", _top_: { type: "string", value: "50dp" }, _width_: { type: "string", value: "85%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxInsindeline"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxFrstline", info: null, iscustomlayout: false, isvisible: true, kuid: "d2c631625e454a87a86e18f81f0f3ec5", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxbg", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxInsindeline: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sb5a3494e1df469daa1041a00a5ac052", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "20%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxInsindeline", info: null, iscustomlayout: false, isvisible: true, kuid: "i43020aa2456425d9540863af9573e36", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxFrstline", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, header2: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxbg"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "header2", info: null, iscustomlayout: false, isvisible: true, kuid: "dc3299f470514829814062d8abd8ef8c", layouttype: 2, name: "kony.ui.FlexContainer", parent: "userwidgetmodel", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, vizProps: { hidewidgethierarchy: false }, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, lblText1: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "104dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Label", _top_: { type: "string", value: "12dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblText1", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c1fdff02487143a18f7c56fea7535dbe", name: "kony.ui.Label", parent: "flxbg", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblText2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "1116dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Label", _top_: { type: "string", value: "12dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblText2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "dc4de2c435dd4562a3d15c5fa8e3c330", name: "kony.ui.Label", parent: "flxbg", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 } } }, c129c7e95f7142d98c81ad7be7b823f0: { root: "SignIn", name: "com.avenza.common.SignIn", props: {}, widgets: { flxContent: { DNDConfig: null, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "50dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "25dp" }, _width_: { type: "string", value: "91.24%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblAvenza", "lblBank", "lblAlhaveAcc", "lblSIgnIn"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxContent", info: null, iscustomlayout: false, isvisible: true, kuid: "jdda855979e949fbbef74672235a7f8c", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxMain: { DNDConfig: null, _height_: { type: "string", value: "160dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100.29%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxContent"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxMain", info: null, iscustomlayout: false, isvisible: true, kuid: "h9cced33074e4362a0a9829bd42de4a9", layouttype: 2, name: "kony.ui.FlexContainer", parent: "SignIn", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, lblAlhaveAcc: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "900dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Already have an account?", _top_: { type: "string", value: "10dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblAlhaveAcc", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b4b220dbb56b491182f402edc7be59f0", name: "kony.ui.Label", parent: "flxContent", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblAvenza: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "54dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s77dc93446fb437892166de5d8f60e94", _text_: "Avenza", _top_: { type: "string", value: "10dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblAvenza", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b216320e87be4df5ba2303d14015b462", name: "kony.ui.Label", parent: "flxContent", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblBank: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "180dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s725c5d9d7b94b1bb92915a796c3f701", _text_: "Bank", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblBank", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "fa53cb5735634b4cab7570d45ade092b", name: "kony.ui.Label", parent: "flxContent", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSIgnIn: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "1150dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s36af7fadd5544f59cd21c1b62dc71c5", _text_: "Sign in ", _top_: { type: "string", value: "32dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50.00%" }, containerweight: 100, contentalignment: 4, id: "lblSIgnIn", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "debcca8c373841d685bfa6afc5fb108e", name: "kony.ui.Label", parent: "flxContent", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, SignIn: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxMain"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "SignIn", info: null, iscustomlayout: false, isvisible: true, kuid: "c129c7e95f7142d98c81ad7be7b823f0", layouttype: 2, name: "kony.ui.FlexContainer", parent: "userwidgetmodel", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, vizProps: { hidewidgethierarchy: false }, wType: "FlexContainer", widgetalignment: 1, zindex: 1 } } }, c8bbc02c88044b4eb89d12cde7dc1064: { root: "MainHeader", name: "com.avenza.common.MainHeader", props: {}, widgets: { flxContents: { DNDConfig: null, _height_: { type: "string", value: "68dp" }, _left_: { type: "string", value: "25dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s18ac633c5434efd9af25ae9169b888a", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "93.70%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "string", value: "50%" }, children: ["lblAccounts", "lblTransfer", "lblProfile", "flxNameRound", "lblMayaFernandes", "lblAvenza", "lblBank"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxContents", info: null, iscustomlayout: false, isvisible: true, kuid: "a978bcd341174297b87cf7be654e014f", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxTop", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxMain: { DNDConfig: null, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxTop"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxMain", info: null, iscustomlayout: false, isvisible: true, kuid: "fddd94b8bc9a4269ab019a1ad0d0fd96", layouttype: 2, name: "kony.ui.FlexContainer", parent: "MainHeader", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxNameRound: { DNDConfig: null, _bottom_: { type: "string", value: "0" }, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "1150dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s5b2a204415149148873029d59dea60d", _top_: { type: "string", value: "0" }, _width_: { type: "string", value: "50dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "string", value: "50%" }, children: ["lblMF"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxNameRound", info: null, iscustomlayout: false, isvisible: true, kuid: "af28fbad67c34b8482ebe3df8ed55179", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxContents", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTop: { DNDConfig: null, _height_: { type: "string", value: "100.00%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s18ac633c5434efd9af25ae9169b888a", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100.00%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "string", value: "50%" }, children: ["flxContents"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTop", info: null, iscustomlayout: false, isvisible: true, kuid: "e52cd87f49ea416f9a2e1e9e9191f09d", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, lblAccounts: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "390dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sa27ad141bcf4dddbf9335594f452b79", _text_: "Accounts", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblAccounts", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "e8f3214f6aa2423a94935cd9dd20bd46", name: "kony.ui.Label", parent: "flxContents", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblAvenza: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "100dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s77dc93446fb437892166de5d8f60e94", _text_: "Avenza", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblAvenza", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d25f7e45e014464e971671bd4bb61986", name: "kony.ui.Label", parent: "flxContents", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblBank: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "228dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s725c5d9d7b94b1bb92915a796c3f701", _text_: "Bank", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50.00%" }, containerweight: 100, contentalignment: 4, id: "lblBank", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "dcdc320a996748db8df474f28fd68d83", name: "kony.ui.Label", parent: "flxContents", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMayaFernandes: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "990dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Maya Fernandes", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblMayaFernandes", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c392bb0e133c4634acc531ea658067fa", name: "kony.ui.Label", parent: "flxContents", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMF: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s456569a8be94341ba351883398719cf", _text_: "MF", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50.99%" }, containerweight: 100, contentalignment: 5, id: "lblMF", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "i5c473c234f94d80af5d4e7fab313998", name: "kony.ui.Label", parent: "flxNameRound", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblProfile: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "630dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Profile", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblProfile", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ef5b4de359fd473896f0c1ca18551699", name: "kony.ui.Label", parent: "flxContents", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTransfer: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "498dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Transfers", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblTransfer", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "j427ee4d366d4565980a76de9cc508f9", name: "kony.ui.Label", parent: "flxContents", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, MainHeader: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxMain"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "MainHeader", info: null, iscustomlayout: false, isvisible: true, kuid: "c8bbc02c88044b4eb89d12cde7dc1064", layouttype: 2, name: "kony.ui.FlexContainer", parent: "userwidgetmodel", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, vizProps: { hidewidgethierarchy: false }, wType: "FlexContainer", widgetalignment: 1, zindex: 1 } } }, efcb47cad4bc4b0498275d698d90c096: { root: "continueback", name: "com.avenza.action.continueback", props: {}, widgets: { btnBack: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "67dp" }, _left_: { type: "string", value: "72dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "s06e5fb48c4a4adc967d37366493ed66", _text_: "Back", _top_: { type: "string", value: "44dp" }, _width_: { type: "string", value: "30%" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sc51d83a01164428b124a1dbbdcf494b", id: "btnBack", info: null, iscustomlayout: false, isvisible: true, kuid: "f0ceeb450591436c9f6c22a62538b360", name: "kony.ui.Button", parent: "flxActionbg", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, btnContinue: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "67px" }, _left_: { type: "string", value: "10dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "s100c6d0bc2f41a0b209a9e7a947df0d", _text_: "Continue", _top_: { type: "string", value: "44dp" }, _width_: { type: "string", value: "38%" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sc7a8b5657bb40f88375b5211799b158", id: "btnContinue", info: null, iscustomlayout: false, isvisible: true, kuid: "b50d09c8f9e5406e84d62dab35dac479", name: "kony.ui.Button", parent: "flxActionbg", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, continueback: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sdf2482457164e5a9b3c123afcaaa6b3", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxActionbg"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "continueback", info: null, iscustomlayout: false, isvisible: true, kuid: "efcb47cad4bc4b0498275d698d90c096", layouttype: 2, name: "kony.ui.FlexContainer", parent: "userwidgetmodel", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxActionbg: { DNDConfig: null, _height_: { type: "string", value: "144px" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "103.95%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["btnContinue", "btnBack"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxActionbg", info: null, iscustomlayout: false, isvisible: true, kuid: "c7f9bc699bf54b079b2cd109ae81eaa9", layouttype: 3, name: "kony.ui.FlexContainer", parent: "continueback", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 } } }, d395ff61523e421787129fd0ad6824d1: { root: "flow", name: "com.avenza.completion.flow", props: {}, widgets: { flow: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "2dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sdf2482457164e5a9b3c123afcaaa6b3", _top_: { type: "string", value: "-2dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxLine", "lblTxt1", "lblTxt2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flow", info: null, iscustomlayout: false, isvisible: true, kuid: "d395ff61523e421787129fd0ad6824d1", layouttype: 2, name: "kony.ui.FlexContainer", parent: "userwidgetmodel", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxInsideline: { DNDConfig: null, _height_: { type: "string", value: "100.00%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s5c170c435234db1acd96030e665a24d", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "22.86%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxInsideline", info: null, iscustomlayout: false, isvisible: true, kuid: "b57b353e359b4854b36e006604d8120a", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxLine", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLine: { DNDConfig: null, _height_: { type: "string", value: "8dp" }, _left_: { type: "string", value: "110dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8e1bf97b36c425ba35106913974a1a1", _top_: { type: "string", value: "33dp" }, _width_: { type: "string", value: "76.87%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxInsideline"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLine", info: null, iscustomlayout: false, isvisible: true, kuid: "e8376fae22ae46f08bfab00c2abadc5d", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flow", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, lblTxt1: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "120dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s5716565157e4423a660e03897d1ee1b", _text_: "Identity documents", _top_: { type: "string", value: "15dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblTxt1", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d0cdf55bbcc54907859f70194dc2d188", name: "kony.ui.Label", parent: "flow", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTxt2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "1040dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sa27ad141bcf4dddbf9335594f452b79", _text_: "Step 4 of 7", _top_: { type: "string", value: "15dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblTxt2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "e67e81cd45ce4dbc8f39a39172f1bbbe", name: "kony.ui.Label", parent: "flow", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 } } }, d6ae2c099d524b24a0fc75babc109d85: { root: "completionflow", name: "com.avenza.common.completionflow", props: {}, widgets: { completionflow: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxFlow"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "completionflow", info: null, iscustomlayout: false, isvisible: true, kuid: "d6ae2c099d524b24a0fc75babc109d85", layouttype: 2, name: "kony.ui.FlexContainer", parent: "userwidgetmodel", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, vizProps: { hidewidgethierarchy: false }, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxFlow: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s019fa5a22174c24aad3a7a51091d1e1", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxTraxck", "flxTitle"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxFlow", info: null, iscustomlayout: false, isvisible: true, kuid: "e91ed7e30c4542c184a66e5b37651a03", layouttype: 2, name: "kony.ui.FlexContainer", parent: "completionflow", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxGreenFlow: { DNDConfig: null, _height_: { type: "string", value: "6dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s50fbea34e464acd87fabfb7b2093b1c", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "20%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxGreenFlow", info: null, iscustomlayout: false, isvisible: true, kuid: "he9b732ee28f4829b4365555309addce", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxTraxck", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTitle: { DNDConfig: null, _height_: { type: "string", value: "30dp" }, _left_: { type: "string", value: "324dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "45%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50.02%" }, children: ["lblGettingStared", "lblStep"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTitle", info: null, iscustomlayout: false, isvisible: true, kuid: "e87bca20a54b4e189b2cfabaaea8fda6", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxFlow", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTraxck: { DNDConfig: null, _height_: { type: "string", value: "6dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "415dp" }, _skin_: "se590c09220e4e5da7bf6f72d6887a41", _top_: { type: "string", value: "44dp" }, _width_: { type: "string", value: "45%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxGreenFlow"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTraxck", info: null, iscustomlayout: false, isvisible: true, kuid: "a96c019dac4a4ffc8b62de635f4164b1", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxFlow", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, lblGettingStared: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Getting started", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblGettingStared", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ifdbf0fb686c4e6381d9135d68dc4ea7", name: "kony.ui.Label", parent: "flxTitle", pf: "userwidgetmodel", responsiveData: { b2: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblStep: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "0" }, _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Step 1 to 7", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblStep", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d802b7d236f4410196c6a9711d985fb7", name: "kony.ui.Label", parent: "flxTitle", pf: "userwidgetmodel", responsiveData: { b2: { skin: "s40b31c9cbf9487ab1dd1bf46e587626" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 } } }, a435f14717074d1d8d9d854d1f44633e: { root: "SignInHeader", name: "com.avenza.common.SignInHeader", props: {}, widgets: { flxBankName: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "5%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "220dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "string", value: "50%" }, children: ["lblAvenza", "lblBank"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxBankName", info: null, iscustomlayout: false, isvisible: true, kuid: "ib0413f350b9470b88a32dbf10db4b37", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxHead", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHead: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxBankName", "flxSignIn"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHead", info: null, iscustomlayout: false, isvisible: true, kuid: "a3dd274704f44571817fddea638d1694", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxParent: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxHead"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxParent", info: null, iscustomlayout: false, isvisible: true, kuid: "cd88a3dc800e4ba2a89adf3cae1687e5", layouttype: 2, name: "kony.ui.FlexContainer", parent: "SignInHeader", pf: "userwidgetmodel", responsiveData: { b2: { skin: "s019fa5a22174c24aad3a7a51091d1e1" } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxSignIn: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "10%" }, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "300dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblaccount", "lblSignIn"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxSignIn", info: null, iscustomlayout: false, isvisible: true, kuid: "ideb5abbbdf646d9afb237e167cb8bdc", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxHead", pf: "userwidgetmodel", responsiveData: { b1: { right: { type: "string", value: "7%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, lblaccount: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Already have an account? ", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblaccount", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ec24afb643064193a0d342fe1e7cec5f", name: "kony.ui.Label", parent: "flxSignIn", pf: "userwidgetmodel", responsiveData: { b1: { skin: "s40b31c9cbf9487ab1dd1bf46e587626" }, b2: { skin: "s40b31c9cbf9487ab1dd1bf46e587626" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblAvenza: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s77dc93446fb437892166de5d8f60e94", _text_: "Avenza", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblAvenza", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "aee8882a2cfb4424b02ef65c049a2376", name: "kony.ui.Label", parent: "flxBankName", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblBank: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s725c5d9d7b94b1bb92915a796c3f701", _text_: "Bank", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblBank", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "dba1247c784d4e508a0de68f4ab441bd", name: "kony.ui.Label", parent: "flxBankName", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSignIn: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s9f3539e8534492d8af6999b0d54a52a", _text_: "Sign in", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblSignIn", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "jeafecd6c3454d61b179276993d52a4a", name: "kony.ui.Label", parent: "flxSignIn", pf: "userwidgetmodel", responsiveData: { b1: { skin: "s90796bbc5f74bf0aef47fc8dc92b29f" }, b2: { skin: "secfc18b873d439fa187d227127e8d7f" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, SignInHeader: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxParent"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "SignInHeader", info: null, iscustomlayout: false, isvisible: true, kuid: "a435f14717074d1d8d9d854d1f44633e", layouttype: 2, name: "kony.ui.FlexContainer", parent: "userwidgetmodel", pf: "userwidgetmodel", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, vizProps: { hidewidgethierarchy: false }, wType: "FlexContainer", widgetalignment: 1, zindex: 1 } } } } };

  // saywright/vision/apps/avenzabank/src/i18n.json
  var i18n_default = {};

  // saywright/vision/apps/avenzabank/src/components/com.avenza.common.DashboardHeaderController.kjs
  var com_avenza_common_DashboardHeaderController_default = "define(function() {\r\n\r\n	return {\r\n\r\n	};\r\n});";

  // saywright/vision/apps/avenzabank/src/components/com.avenza.transfer.TransFlowController.kjs
  var com_avenza_transfer_TransFlowController_default = "define(function() {\r\n\r\n	return {\r\n		constructor: function(baseConfig, layoutConfig, pspConfig) {\r\n\r\n		},\r\n		//Logic for getters/setters of custom properties\r\n		initGettersSetters: function() {\r\n\r\n		}\r\n	};\r\n});";

  // saywright/vision/apps/avenzabank/src/components/com.avenza.action.buttoncbController.kjs
  var com_avenza_action_buttoncbController_default = "define(function() {\r\n\r\n	return {\r\n\r\n	};\r\n});";

  // saywright/vision/apps/avenzabank/src/components/com.avenza.common.header2Controller.kjs
  var com_avenza_common_header2Controller_default = "define(function() {\r\n\r\n	return {\r\n\r\n	};\r\n});";

  // saywright/vision/apps/avenzabank/src/components/com.avenza.common.SignInController.kjs
  var com_avenza_common_SignInController_default = "define(function() {\r\n\r\n	return {\r\n\r\n	};\r\n});";

  // saywright/vision/apps/avenzabank/src/components/com.avenza.common.MainHeaderController.kjs
  var com_avenza_common_MainHeaderController_default = "define(function() {\r\n\r\n	return {\r\n\r\n	};\r\n});";

  // saywright/vision/apps/avenzabank/src/components/com.avenza.action.continuebackController.kjs
  var com_avenza_action_continuebackController_default = "define(function() {\r\n\r\n	return {\r\n		constructor: function(baseConfig, layoutConfig, pspConfig) {\r\n\r\n		},\r\n		//Logic for getters/setters of custom properties\r\n		initGettersSetters: function() {\r\n\r\n		}\r\n	};\r\n});";

  // saywright/vision/apps/avenzabank/src/components/com.avenza.completion.flowController.kjs
  var com_avenza_completion_flowController_default = "define(function() {\r\n\r\n	return {\r\n		constructor: function(baseConfig, layoutConfig, pspConfig) {\r\n\r\n		},\r\n		//Logic for getters/setters of custom properties\r\n		initGettersSetters: function() {\r\n\r\n		}\r\n	};\r\n});";

  // saywright/vision/apps/avenzabank/src/components/com.avenza.common.completionflowController.kjs
  var com_avenza_common_completionflowController_default = "define(function() {\r\n\r\n	return {\r\n\r\n	};\r\n});";

  // saywright/vision/apps/avenzabank/src/components/com.avenza.common.SignInHeaderController.kjs
  var com_avenza_common_SignInHeaderController_default = "define(function() {\r\n\r\n	return {\r\n\r\n	};\r\n});";

  // saywright/vision/apps/avenzabank/src/forms/Form1.jsx
  var import_react2 = __toESM(require_react(), 1);
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
  function Form1({ parentLayout }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, {});
  }

  // saywright/vision/apps/avenzabank/src/forms/Form1.widgets.json
  var Form1_widgets_default = { Form1: { "@class": "com.kony.gen.viz.model.container.KVizScrollFlexForm", DNDConfig: null, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s111a6562bb14b75a75fdca19f43bdef", _title_: null, addWidgetsdone: false, allboxes: [], android: { needAppMenu: false, psp: { windowSoftInputMode: 2 } }, androidwearos: { needAppMenu: false }, breakpointInfo: { b1: { width: 1366 }, b2: { width: 1024 }, b3: { width: 640 } }, canUpdateUI: true, children: [], containerweight: 100, controllerInfo: { default: { channel: "desktop", name: "Form1Controller" } }, desktopweb: { needAppMenu: false }, displayorientation: 1, enabledforidletimeout: false, id: "Form1", info: null, initdone: false, inputaccessoryviewtype: 4, ipad: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iphone: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iscustomlayout: false, isvisible: true, kuid: "j3cb7ecce2104db89b2a5a5ba8559fd8", layouttype: 2, name: "kony.ui.Form2", needappmenu: false, paddinginpixel: false, retaincontentalignment: false, retainflexpositionproperties: false, retainscrollposition: false, snapgridsize: 10, snaptogrid: true, titleBarSkin: "s4b4260b19914c8f8e835ebe11946743", titlebar: true, type: 3, wType: "Form" } };

  // saywright/vision/apps/avenzabank/src/controllers/Form1Controller.kjs
  var Form1Controller_default = "define({ \r\n\r\n //Type your controller code here \r\n\r\n });";

  // saywright/vision/apps/avenzabank/src/controllers/Form1ControllerActions.kjs
  var Form1ControllerActions_default = "define({});\n";

  // saywright/vision/apps/avenzabank/src/forms/FrmAcknowledgement.jsx
  var import_react3 = __toESM(require_react(), 1);
  var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
  function FrmAcknowledgement({ parentLayout }) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxParent", parentLayout, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Flex, { id: "flxHeader", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Component2, { id: "DashboardHeader" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Flex, { id: "flxTransferfow", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Component2, { id: "TransFlow" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxFlow", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxTitle", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblTransfer" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lbl3of3" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Flex, { id: "flxTrack" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Flex, { id: "flxTransferDetail", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxTransfer", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Flex, { id: "flxSuccess", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Image, { id: "imgTick" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxDescription", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblTransfersent" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblDes1" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblDes2" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxDetails", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxCredentials1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblReference" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblId1" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxCredentials2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblFrom" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblId2" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxCredentials3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblTo" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblId3" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxCredentials4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblPosted" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblId4" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxButtons", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { id: "btnBacktoAccounts" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { id: "btnAnotherTransfer" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Flex, { id: "flxDownloadReceipt", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblDownloadreceipt" }) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Flex, { id: "flxButton", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { id: "btnback" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { id: "Button0e71f6afe8c2844" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Flex, { id: "flxDownload", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { id: "lblDownload" }) })
    ] }) });
  }

  // saywright/vision/apps/avenzabank/src/forms/frmAcknowledgement.widgets.json
  var frmAcknowledgement_widgets_default = { btnAnotherTransfer: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "number", value: "" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "0" }, _skin_: "s01575501bae4b55b991c903e35395e4", _text_: "Another transfer", _top_: { type: "string", value: "16dp" }, _width_: { type: "string", value: "250dp" }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sebb8da9cae845b7937327af2fecec1c", id: "btnAnotherTransfer", info: null, iscustomlayout: false, isvisible: true, kuid: "fcee9bb49406409cb528278c0fd216fa", name: "kony.ui.Button", parent: "flxButtons", pf: "frmAcknowledgement", responsiveData: { b1: { centerY: { type: "string", value: "50%" }, width: { type: "string", value: "45%" } }, b2: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0dp" }, top: { type: "string", value: "20dp" }, width: { type: "string", value: "45%" } }, b3: { centerY: { type: "string", value: "" }, top: { type: "string", value: "10dp" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, btnback: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "53dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "sb52da56f1d346c89ce95ad187c57d56", _text_: "Button", _top_: { type: "string", value: "20dp" }, _width_: { type: "string", value: "300dp" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sebb8da9cae845b7937327af2fecec1c", id: "btnback", info: null, iscustomlayout: false, isvisible: true, kuid: "ac7a3665a77c4f70b62b78e1438c932f", name: "kony.ui.Button", parent: "flxButton", pf: "frmAcknowledgement", responsiveData: { b3: { left: { type: "string", value: "0dp" }, skin: "s100c6d0bc2f41a0b209a9e7a947df0d", text: "Back to accounts", top: { type: "string", value: "0dp" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, btnBacktoAccounts: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "s100c6d0bc2f41a0b209a9e7a947df0d", _text_: "Back to accounts", _top_: { type: "string", value: "20dp" }, _width_: { type: "string", value: "260dp" }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sebb8da9cae845b7937327af2fecec1c", id: "btnBacktoAccounts", info: null, iscustomlayout: false, isvisible: true, kuid: "i5d616814542440591370e147c15560b", name: "kony.ui.Button", parent: "flxButtons", pf: "frmAcknowledgement", responsiveData: { b1: { centerY: { type: "string", value: "50%" }, width: { type: "string", value: "50%" } }, b2: { width: { type: "string", value: "45%" } }, b3: { centerX: { type: "string", value: "50%" }, centerY: { type: "string", value: "" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, Button0e71f6afe8c2844: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "37dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "sb52da56f1d346c89ce95ad187c57d56", _text_: "Button", _top_: { type: "string", value: "19dp" }, _width_: { type: "string", value: "300dp" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sebb8da9cae845b7937327af2fecec1c", id: "Button0e71f6afe8c2844", info: null, iscustomlayout: false, isvisible: true, kuid: "e123ca0649464041b8d0aec7e98894ad", name: "kony.ui.Button", parent: "flxButton", pf: "frmAcknowledgement", responsiveData: { b3: { left: { type: "string", value: "0dp" }, skin: "s01575501bae4b55b991c903e35395e4", text: "Another transfer", top: { type: "string", value: "18dp" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, DashboardHeader: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, canUpdateUI: true, clipbounds: false, containerweight: 0, dataDiffs: { DashboardHeader: { __events__: {}, __info__: { isRoot: true, kuid: "i385b3bec3d2412cb07207a249e15ffb", srcKUID: "effc0845c8f9420c9f5a770b0abbb7d6", wType: "FlexContainer" }, height: { Default: { type: "string", value: "90dp" } }, responsiveData: { b1: { height: { type: "string", value: "90dp" } } } }, flxBankName: { __events__: {}, __info__: { kuid: "ddc13e0df96e4db69958de0068bec12b", srcKUID: "c875096256914e93a04f51419dd4b705", wType: "FlexContainer" } }, flxCredentails: { __events__: {}, __info__: { kuid: "bb1986139b184caf98345033ba9851ae", srcKUID: "eb0b1392560a4953b7e3a9eeb613f3db", wType: "FlexContainer" } }, flxLogo: { __events__: {}, __info__: { kuid: "d42472921b904a9b962ca6bf1687b421", srcKUID: "c1e08165035242009bbc615f4b59cfe5", wType: "FlexContainer" } }, flxParent: { __events__: {}, __info__: { kuid: "efc466bde07947d2b89a990b54827f78", srcKUID: "j252f775ec9145ccae858e9c9949433d", wType: "FlexContainer" }, height: { Default: { type: "string", value: "90dp" } }, responsiveData: { b1: { height: { type: "string", value: "90dp" } } } }, flxUser: { __events__: {}, __info__: { kuid: "ec58c5d2dcd6441e90eb87007c2a4dbf", srcKUID: "ca2db60a02f04bd78350b6c9c248417b", wType: "FlexContainer" } }, lblAccounts: { __events__: {}, __info__: { kuid: "ec90463ee1534c49adabf963c0523968", srcKUID: "a0aa145202da47a1a9e0dbe273680765", wType: "Label" } }, lblAvenza: { __events__: {}, __info__: { kuid: "i9120b43143e4df2abcc25c1f9f1d311", srcKUID: "d05379e31ed7425bb42b5e6d458c0e01", wType: "Label" } }, lblBank: { __events__: {}, __info__: { kuid: "d17f431a15da4b2f848e6efcac9040f6", srcKUID: "b9d7a8ca47a548109cd2c6b6d50154a2", wType: "Label" } }, lblMF: { __events__: {}, __info__: { kuid: "cb6c688d70774b139154c1598802b078", srcKUID: "g3621dacd12b40faa191f86051126bb9", wType: "Label" } }, lblNme: { __events__: {}, __info__: { kuid: "f48e81c2ba7b4248a5cb568a01685c50", srcKUID: "b3ab109848fb49bead2575592ce6df94", wType: "Label" } }, lblProfile: { __events__: {}, __info__: { kuid: "g724d16d0743467ba1661d4c6d04929b", srcKUID: "d5015326b98a480e956e4b38fdd0a4c0", wType: "Label" } }, lblTransfers: { __events__: {}, __info__: { kuid: "e750e8c871c740508557811c58c7a014", srcKUID: "bdf3c3e24d3142f5a09288f84f5f889a", wType: "Label" } } }, enablescrolling: true, id: "DashboardHeader", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "i385b3bec3d2412cb07207a249e15ffb", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxHeader", pf: "frmAcknowledgement", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "effc0845c8f9420c9f5a770b0abbb7d6", wType: "UserWidgetInstance", zindex: 1 }, flxButton: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "84dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["btnback", "Button0e71f6afe8c2844"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxButton", info: null, iscustomlayout: false, isvisible: true, kuid: "d564db602acd47dca69af09806ade02d", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmAcknowledgement", responsiveData: { b1: { isVisible: false }, b2: { isVisible: false }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "130dp" }, layoutType: 4, left: { type: "string", value: "48dp" }, top: { type: "string", value: "20dp" }, width: { type: "string", value: "85.05%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxButtons: { DNDConfig: null, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["btnBacktoAccounts", "btnAnotherTransfer"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxButtons", info: null, iscustomlayout: false, isvisible: true, kuid: "h661a28c8ce547debd93b600eec0991c", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxTransfer", pf: "frmAcknowledgement", responsiveData: { b2: { centerX: { type: "string", value: "50%" } }, b3: { height: { type: "string", value: "110dp" }, isVisible: false, layoutType: 4 } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCredentials1: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "40dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "25dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblReference", "lblId1"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCredentials1", info: null, iscustomlayout: false, isvisible: true, kuid: "c09bb4c784ec42c4882d21c7e4298ce8", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetails", pf: "frmAcknowledgement", responsiveData: { b1: { height: { type: "string", value: "40dp" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "25dp" } }, b2: { height: { type: "string", value: "40dp" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "40dp" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "25dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCredentials2: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "40dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "48dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblFrom", "lblId2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCredentials2", info: null, iscustomlayout: false, isvisible: true, kuid: "cf7760ba4f4649fcbfad8b914a782f42", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetails", pf: "frmAcknowledgement", responsiveData: { b1: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "40dp" }, isVisible: true, top: { type: "string", value: "70dp" }, width: { type: "string", value: "90%" } }, b2: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "40dp" }, isVisible: true, top: { type: "string", value: "70dp" }, width: { type: "string", value: "90%" } }, b3: { centerX: { type: "string", value: "50.07%" }, height: { type: "string", value: "40dp" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "70dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCredentials3: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "40dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "48dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblTo", "lblId3"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCredentials3", info: null, iscustomlayout: false, isvisible: true, kuid: "b02dc97ca1a7422c854ba448c185bb19", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetails", pf: "frmAcknowledgement", responsiveData: { b1: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "40dp" }, isVisible: true, top: { type: "string", value: "115dp" }, width: { type: "string", value: "90%" } }, b2: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "40dp" }, isVisible: true, top: { type: "string", value: "115dp" }, width: { type: "string", value: "90%" } }, b3: { centerX: { type: "string", value: "49.93%" }, height: { type: "string", value: "40dp" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "115dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCredentials4: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "40dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "48dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblPosted", "lblId4"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCredentials4", info: null, iscustomlayout: false, isvisible: true, kuid: "ff505b505ab344499d55e80fc4bff02e", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetails", pf: "frmAcknowledgement", responsiveData: { b1: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "40dp" }, isVisible: true, top: { type: "string", value: "155dp" }, width: { type: "string", value: "90%" } }, b2: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "40dp" }, isVisible: true, top: { type: "string", value: "155dp" }, width: { type: "string", value: "90%" } }, b3: { centerX: { type: "string", value: "50.00%" }, height: { type: "string", value: "40dp" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "155dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDescription: { DNDConfig: null, _height_: { type: "string", value: "93dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblTransfersent", "lblDes1", "lblDes2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDescription", info: null, iscustomlayout: false, isvisible: true, kuid: "hd6bd47bfe9c4493bea9e94dc186e83a", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxTransfer", pf: "frmAcknowledgement", responsiveData: { b2: { centerX: { type: "string", value: "50%" } }, b3: { centerX: { type: "string", value: "50%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDetails: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sf883e9d82b542d0a532ffdcc045917a", _top_: { type: "string", value: "20dp" }, _width_: { type: "string", value: "100.30%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxCredentials1", "flxCredentials2", "flxCredentials3", "flxCredentials4"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDetails", info: null, iscustomlayout: false, isvisible: true, kuid: "g5df85d9f7ca4c1b84d3afb0f01e315a", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxTransfer", pf: "frmAcknowledgement", responsiveData: { b2: { centerX: { type: "string", value: "50%" } }, b3: {} }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDownload: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "26dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, children: ["lblDownload"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDownload", info: null, iscustomlayout: false, isvisible: true, kuid: "ee7ec55f70704d71af017358d392bc07", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmAcknowledgement", responsiveData: { b1: { isVisible: false }, b2: { isVisible: false }, b3: { height: { type: "string", value: "50dp" }, left: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDownloadReceipt: { DNDConfig: null, _height_: { type: "string", value: "40dp" }, _left_: { type: "string", value: "1dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblDownloadreceipt"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDownloadReceipt", info: null, iscustomlayout: false, isvisible: true, kuid: "ee84b9207a844380a19dbf0a64bcab34", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxTransfer", pf: "frmAcknowledgement", responsiveData: { b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxFlow: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "33dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, children: ["flxTitle", "flxTrack"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxFlow", info: null, iscustomlayout: false, isvisible: true, kuid: "e16f305e919e4bd89e4aa5ee4a79d749", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmAcknowledgement", responsiveData: { b1: { isVisible: false }, b2: { isVisible: false }, b3: { height: { type: "string", value: "90dp" }, left: { type: "string", value: "0dp" }, skin: "sb5b589e5c734d5c9369126d978ec9d4", top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHeader: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s63b319eebad4a6e9bd67859cee2b3c3", _top_: { type: "string", value: "28dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["DashboardHeader"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHeader", info: null, iscustomlayout: false, isvisible: true, kuid: "d3e25bd757ec42e49a6ce9902b675c43", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmAcknowledgement", responsiveData: { b1: { height: { type: "string", value: "90dp" }, skin: "sc43b73b3ea140218e04bfabf4271907" }, b2: { height: { type: "string", value: "90px" }, skin: "s019fa5a22174c24aad3a7a51091d1e1" }, b3: { isVisible: false, top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxParent: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sf883e9d82b542d0a532ffdcc045917a", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 1, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxHeader", "flxTransferfow", "flxFlow", "flxTransferDetail", "flxButton", "flxDownload"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxParent", info: null, iscustomlayout: false, isvisible: true, kuid: "h3ac6805996c4201a9a59abc159fd606", layouttype: 2, name: "kony.ui.FlexContainer", parent: "frmAcknowledgement", pf: "frmAcknowledgement", responsiveData: { b1: { height: { type: "ref", value: "preferred" } }, b3: { height: { type: "ref", value: "preferred" }, layoutType: 4 } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxSuccess: { DNDConfig: null, _height_: { type: "string", value: "110dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s4c40ad9b8c8453980a72213c3c69f12", _top_: { type: "string", value: "25dp" }, _width_: { type: "string", value: "110dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["imgTick"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxSuccess", info: null, iscustomlayout: false, isvisible: true, kuid: "e0c66c4ba89b4be69d80dab2da4a8929", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxTransfer", pf: "frmAcknowledgement", responsiveData: { b1: { skin: "s8b8e856a5d1449889c3a37865fae271" }, b2: { centerX: { type: "string", value: "50%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTitle: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "15dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "19dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblTransfer", "lbl3of3"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTitle", info: null, iscustomlayout: false, isvisible: true, kuid: "j3dc071523ef4de492343f7708704c6d", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxFlow", pf: "frmAcknowledgement", responsiveData: { b3: { centerX: { type: "string", value: "49.95%" }, height: { type: "string", value: "45dp" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "10dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTrack: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "19dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "61dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTrack", info: null, iscustomlayout: false, isvisible: true, kuid: "d34f66e8c84944adadf5a4b3d66d3e4f", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxFlow", pf: "frmAcknowledgement", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "7dp" }, skin: "s5b2a204415149148873029d59dea60d", width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTransfer: { DNDConfig: null, _height_: { type: "string", value: "100.00%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "85%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxSuccess", "flxDescription", "flxDetails", "flxButtons", "flxDownloadReceipt"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTransfer", info: null, iscustomlayout: false, isvisible: true, kuid: "cf531c11aed944148e794eab66aac10c", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxTransferDetail", pf: "frmAcknowledgement", responsiveData: { b1: {}, b2: {}, b3: { height: { type: "ref", value: "preferred" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTransferDetail: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sa0010b315b34201824b944816f0034b", _top_: { type: "string", value: "225dp" }, _width_: { type: "string", value: "50%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxTransfer"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTransferDetail", info: null, iscustomlayout: false, isvisible: true, kuid: "a723f28b894944549e11c4b6bb98570d", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmAcknowledgement", responsiveData: { b1: { height: { type: "string", value: "620px" } }, b2: { height: { type: "string", value: "620px" }, width: { type: "string", value: "65.43%" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "510px" }, skin: "sa5ecb9419d34124afc660a0b77f0e08", top: { type: "string", value: "40px" }, width: { type: "string", value: "85%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTransferfow: { DNDConfig: null, _bottom_: { type: "number", value: "" }, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "number", value: "" }, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "117dp" }, _width_: { type: "string", value: "75.00%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "number", value: "" }, children: ["TransFlow"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTransferfow", info: null, iscustomlayout: false, isvisible: true, kuid: "a8f8fe0735a74cef8ad9f9d79a5709c3", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmAcknowledgement", responsiveData: { b1: { height: { type: "string", value: "110dp" }, width: { type: "string", value: "100%" } }, b2: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "110dp" }, left: { type: "string", value: "0" }, right: { type: "string", value: "0" }, width: { type: "string", value: "100%" } }, b3: { bottom: { type: "string", value: "" }, centerY: { type: "string", value: "" }, isVisible: false, top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, frmAcknowledgement: { "@class": "com.kony.gen.viz.model.container.KVizScrollFlexForm", DNDConfig: null, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _pxMenuIndex: [2, 1, 1], _skin_: "scf0bb0ac9ac406fad753f56963d9262", _title_: null, addWidgetsdone: false, allboxes: [], android: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, androidwearos: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, breakpointInfo: { b1: { width: 1366 }, b2: { width: 1024 }, b3: { width: 640 } }, canUpdateUI: true, canvasWidth: 1200, children: ["flxParent"], containerweight: 100, controllerInfo: { default: { channel: "desktop", fileType: "js", name: "frmAcknowledgementController" } }, currentBreakpoint: { kuid: "b2", width: 1024 }, currentLocale: "default", desktopweb: { needAppMenu: false }, device: "desktopweb", displayorientation: 1, enabledforidletimeout: false, id: "frmAcknowledgement", info: null, initdone: false, inputaccessoryviewtype: 4, ipad: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iphone: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iscustomlayout: false, isvisible: true, kuid: "ae5110bc798f436ea07de229f4a17202", layouttype: 2, name: "kony.ui.Form2", needappmenu: false, paddinginpixel: false, platform: "desktopweb", prevDevice: "desktopweb", prevPlatform: "desktopweb", retaincontentalignment: false, retainflexpositionproperties: false, retainscrollposition: false, snapgridsize: 10, snaptogrid: true, titleBarSkin: "sb51bcefd50c4c1c959df14dd1d7d808", titlebar: true, type: 3, vizProps: { globalRespDesignEnabled: false }, wType: "Form" }, imgTick: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "5dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _skin_: "sf28157fa49a40478b0515ee8b63e9c4", _src_: "mark.png", _top_: { type: "string", value: "27dp" }, _width_: { type: "string", value: "80dp" }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, containerweight: 100, id: "imgTick", imagescalemode: 1, info: null, invokedProperty: "src", iscustomlayout: false, isvisible: true, kuid: "dd10801983d147688adff9c0ccbb4741", name: "kony.ui.Image2", parent: "flxSuccess", pf: "frmAcknowledgement", retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, lbl3of3: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "485dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "number", value: "" }, _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "4dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lbl3of3", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ha11e4e30fcb4cab81c4cbd35a207282", name: "kony.ui.Label", parent: "flxTitle", pf: "frmAcknowledgement", responsiveData: { b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "sfe3fb0b0b224d27bfd1eb9d074e3f75", text: "3 of 3", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDes1: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "$1,200.00 is on its way to Rahul Mehta.", _top_: { type: "string", value: "49.46%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50.00%" }, containerweight: 100, contentalignment: 4, id: "lblDes1", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "e8db169eddc544eb85394a7294a9b29c", name: "kony.ui.Label", parent: "flxDescription", pf: "frmAcknowledgement", responsiveData: { b2: { centerX: { type: "string", value: "50%" }, skin: "s40b31c9cbf9487ab1dd1bf46e587626" }, b3: { skin: "s8915f96e32f41478267ab8f7e42ff52", text: "$1,200.00 is on its way to Rahul Mehta.It" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDes2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "It should land the same business day.", _top_: { type: "string", value: "80%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblDes2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d12fd157e6b94d40bea8c285a0759752", name: "kony.ui.Label", parent: "flxDescription", pf: "frmAcknowledgement", responsiveData: { b2: { centerX: { type: "string", value: "50%" }, skin: "s40b31c9cbf9487ab1dd1bf46e587626" }, b3: { skin: "s526892cfb9a4babb919421495ac10f3", text: "should land the same business day." } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDownload: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "258dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "14dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblDownload", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ce531049e2c04763a7416675b9fcef75", name: "kony.ui.Label", parent: "flxDownload", pf: "frmAcknowledgement", responsiveData: { b2: { isVisible: false }, b3: { centerX: { type: "string", value: "50%" }, centerY: { type: "string", value: "" }, left: { type: "string", value: "" }, skin: "secfc18b873d439fa187d227127e8d7f", text: "Download receipt(PDF)", top: { type: "string", value: "10%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDownloadreceipt: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "secfc18b873d439fa187d227127e8d7f", _text_: "Download receipt(PDF)", _top_: { type: "string", value: "0" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblDownloadreceipt", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "aac5761998714166898206c85637f33d", name: "kony.ui.Label", parent: "flxDownloadReceipt", pf: "frmAcknowledgement", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblFrom: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _bottom_: { type: "number", value: "" }, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "19dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "1dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblFrom", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c9f288e5823e4ed58cf356fc0325089d", name: "kony.ui.Label", parent: "flxCredentials2", pf: "frmAcknowledgement", responsiveData: { b1: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0" }, skin: "s8125c75228c4db7bcc3d3a111329aa2", text: "From", top: { type: "string", value: "" } }, b2: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0dp" }, skin: "s40b31c9cbf9487ab1dd1bf46e587626", text: "From", top: { type: "string", value: "" } }, b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0" }, skin: "scf4cacb8d9842ccbd1b2dab2b11126c", text: "From", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblId1: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "270dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "number", value: "" }, _skin_: "s87f8f7ce24e45ac84942f0ad86ae0e7", _text_: "Label", _top_: { type: "string", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "49.17%" }, containerweight: 100, contentalignment: 4, id: "lblId1", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c8b9648f29db49e595093eb622a514b9", name: "kony.ui.Label", parent: "flxCredentials1", pf: "frmAcknowledgement", responsiveData: { b1: { left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "sd6c709a84f144d6bd28756038b91e1a", text: "TRF-2026-100482" }, b2: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "sa672bb78ac248f5a18a75c81ca5cd5c", text: "TRF-2026-100482", top: { type: "string", value: "" } }, b3: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0dp" }, skin: "sf1e6221bf7d49c4b774ee4777621924", text: "TRF-2026-100482", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblId2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "308dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "number", value: "" }, _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "1dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblId2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "f7f59c1f9ff748f1a2ce6cd94c4c0551", name: "kony.ui.Label", parent: "flxCredentials2", pf: "frmAcknowledgement", responsiveData: { b1: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "sd6c709a84f144d6bd28756038b91e1a", text: "123456XXXX", top: { type: "string", value: "" } }, b2: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "sa672bb78ac248f5a18a75c81ca5cd5c", text: "123456XXXX", top: { type: "string", value: "" } }, b3: { centerY: { type: "string", value: "49.17%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0dp" }, skin: "s9430d34bd114c11a208452af5908be5", text: "123456XXXX", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblId3: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "308dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "number", value: "" }, _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "1dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblId3", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a078ef208b054c22bf1cd2af3f947ad3", name: "kony.ui.Label", parent: "flxCredentials3", pf: "frmAcknowledgement", responsiveData: { b1: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "sd6c709a84f144d6bd28756038b91e1a", text: "4455XXXX", top: { type: "string", value: "" } }, b2: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "sa672bb78ac248f5a18a75c81ca5cd5c", text: "4455XXXX", top: { type: "string", value: "" } }, b3: { centerY: { type: "string", value: "49.17%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "s9430d34bd114c11a208452af5908be5", text: "4455XXXX", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblId4: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "308dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "number", value: "" }, _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "1dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblId4", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "cb19787ed30649b3a85e31236b0b79eb", name: "kony.ui.Label", parent: "flxCredentials4", pf: "frmAcknowledgement", responsiveData: { b1: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "sd6c709a84f144d6bd28756038b91e1a", text: "5 Oct, 09:47", top: { type: "string", value: "" } }, b2: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "sa672bb78ac248f5a18a75c81ca5cd5c", text: "5 Oct, 09:47", top: { type: "string", value: "" } }, b3: { centerY: { type: "string", value: "49.17%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0" }, skin: "s9430d34bd114c11a208452af5908be5", text: "5 Oct, 09:47", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblPosted: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _bottom_: { type: "number", value: "" }, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "19dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "1dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblPosted", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "jb83aafd49674361a9e9b5ecda690578", name: "kony.ui.Label", parent: "flxCredentials4", pf: "frmAcknowledgement", responsiveData: { b1: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0dp" }, skin: "s8125c75228c4db7bcc3d3a111329aa2", text: "Posted", top: { type: "string", value: "" } }, b2: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0dp" }, skin: "s40b31c9cbf9487ab1dd1bf46e587626", text: "Posted", top: { type: "string", value: "" } }, b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0" }, skin: "sc78b4e3c3ae4679a9d2343ecc610457", text: "Posted", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblReference: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _bottom_: { type: "number", value: "" }, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Label", _top_: { type: "string", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblReference", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c5d10487d5544b76ae3ce2112e10dc6e", name: "kony.ui.Label", parent: "flxCredentials1", pf: "frmAcknowledgement", responsiveData: { b1: { left: { type: "string", value: "0dp" }, skin: "s8125c75228c4db7bcc3d3a111329aa2", text: "Reference" }, b2: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0dp" }, skin: "s40b31c9cbf9487ab1dd1bf46e587626", text: "Reference" }, b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0" }, skin: "s3e257f01d784074af176f933c3ca9ca", text: "Reference", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTo: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _bottom_: { type: "number", value: "" }, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "19dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "1dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblTo", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ac9fc08baa0c4f67904e826e66664ee7", name: "kony.ui.Label", parent: "flxCredentials3", pf: "frmAcknowledgement", responsiveData: { b1: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0" }, skin: "s8125c75228c4db7bcc3d3a111329aa2", text: "To", top: { type: "string", value: "" } }, b2: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0dp" }, skin: "s40b31c9cbf9487ab1dd1bf46e587626", text: "To", top: { type: "string", value: "" } }, b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0" }, skin: "sb20e1968c7943e7ae22c09a9d72ae6e", text: "To", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTransfer: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "31dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "3dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblTransfer", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a226fadbcdec4df3ae865cf89ba6226e", name: "kony.ui.Label", parent: "flxTitle", pf: "frmAcknowledgement", responsiveData: { b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0dp" }, skin: "s63fa6b7c6e948c8a0a4aeda33aded9d", text: "Tranfer sent", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTransfersent: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "number", value: "" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s5716565157e4423a660e03897d1ee1b", _text_: "Transfer sent", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblTransfersent", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "j4232c78a8bf4573b428a175bbf25b68", name: "kony.ui.Label", parent: "flxDescription", pf: "frmAcknowledgement", responsiveData: { b1: { skin: "s3ce57d8e1e94535bc9674f6799b12d7" }, b2: { centerX: { type: "string", value: "50%" }, skin: "s63fa6b7c6e948c8a0a4aeda33aded9d" }, b3: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "" }, skin: "s63fa6b7c6e948c8a0a4aeda33aded9d", text: "On its way" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, TransFlow: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "3dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "number", value: "" }, _skin_: "s18ac633c5434efd9af25ae9169b888a", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 0, data: {}, id: "TransFlow", info: null, iscustomlayout: false, isvisible: true, kuid: "jf835371c4204f479047ada41251086f", masterType: 1, name: "kony.ui.UserWidgetInstance", parent: "flxTransferfow", pf: "frmAcknowledgement", responsiveData: { b1: { centerX: { type: "string", value: "50%" }, centerY: { type: "string", value: "" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "0" }, width: { type: "string", value: "100%" } }, b2: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, left: { type: "string", value: "0dp" }, right: { type: "string", value: "0dp" }, top: { type: "string", value: "0" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, sourceUserWidget: "fe23c764d4fd47fdb6b33453510269bf", wType: "UserWidgetInstance", zindex: 1 } };

  // saywright/vision/apps/avenzabank/src/controllers/frmAcknowledgementController.kjs
  var frmAcknowledgementController_default = "define({ \r\n\r\n //Type your controller code here \r\n\r\n });";

  // saywright/vision/apps/avenzabank/src/controllers/frmAcknowledgementControllerActions.kjs
  var frmAcknowledgementControllerActions_default = "define({});\n";

  // saywright/vision/apps/avenzabank/src/forms/FrmAddress.jsx
  var import_react4 = __toESM(require_react(), 1);
  var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
  function FrmAddress({ parentLayout }) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "flxBg", parentLayout, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Flex, { id: "flxHeader1", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Component2, { id: "SignIn" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Flex, { id: "flxHeader2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Component2, { id: "header2" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "flxTextbg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "lblTxt1" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "lblTxt2" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "flxDetailsbg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "flxRow1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Flex, { id: "imgBg", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Image, { id: "imgTick" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "lblSentence" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "flxRow2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "lblAddress" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TextField, { id: "tbxAddressline" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "flxRow3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "lblAddress2" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TextField, { id: "tbxAddress2" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "lblOptional" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "flxRow4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "city" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "lblState" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "FlxBoxalighn", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TextField, { id: "tbxcity" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ListBox, { id: "lstState" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "flxRow5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "lblPincode" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "lblCountry" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "flxAlighnbox", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TextField, { id: "tbxPincode" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ListBox, { id: "lstCountry" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Flex, { id: "flxRow6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { id: "lblText" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ListBox, { id: "lstYears" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Flex, { id: "flxRow7", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Component2, { id: "buttoncb" }) })
      ] })
    ] }) });
  }

  // saywright/vision/apps/avenzabank/src/forms/frmAddress.widgets.json
  var frmAddress_widgets_default = { buttoncb: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, canUpdateUI: true, centerx: { type: "number", value: "" }, clipbounds: false, containerweight: 0, dataDiffs: { btnBack: { __events__: {}, __info__: { kuid: "a9af86cdbbb14a9abf322dce0081c13f", srcKUID: "c7410c92eb424725ae73e4b0ccf863e3", wType: "Button" }, isVisible: true, left: { Default: { type: "string", value: "460dp" } }, responsiveData: { b1: { left: { type: "string", value: "60dp" } }, b2: { left: { type: "string", value: "50dp" }, right: { type: "string", value: "5dp" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "40%" } }, b3: { isVisible: false, left: { type: "string", value: "100dp" }, width: { type: "string", value: "35%" } } }, right: { Default: { type: "string", value: "" } }, top: { Default: { type: "string", value: "0dp" } }, width: { Default: { type: "string", value: "43.94%" } } }, btnContinue: { __events__: {}, __info__: { kuid: "ffa256939b534b6484c55bca7b99aada", srcKUID: "ia742806862543aab64a2a3283f2e7dc", wType: "Button" }, left: { Default: { type: "string", value: "0dp" } }, responsiveData: { b3: { left: { type: "string", value: "0dp" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "100%" } } }, top: { Default: { type: "string", value: "0dp" } }, width: { Default: { type: "string", value: "50%" } } }, buttoncb: { __events__: {}, __info__: { isRoot: true, kuid: "c02f645ba82e4c428b27d8f923ace6c5", srcKUID: "g7c2519a80924e7282b165b871135181", wType: "FlexContainer" }, autogrowMode: { Default: 0 }, bottom: { Default: { type: "string", value: "" } }, centerX: { Default: { type: "string", value: "" } }, centerY: { Default: { type: "string", value: "" } }, height: { Default: { type: "string", value: "100%" } }, left: { Default: { type: "string", value: "0dp" } }, maxHeight: { Default: { type: "string", value: "" } }, maxWidth: { Default: { type: "string", value: "" } }, minHeight: { Default: { type: "string", value: "" } }, minWidth: { Default: { type: "string", value: "" } }, responsiveData: { b2: { centerX: { type: "string", value: "" }, left: { type: "string", value: "0dp" } }, b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, height: { type: "string", value: "100%" }, left: { type: "string", value: "0dp" }, maxHeight: { type: "string", value: "" }, maxWidth: { type: "string", value: "" }, minHeight: { type: "string", value: "" }, minWidth: { type: "string", value: "" }, right: { type: "string", value: "" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "100%" } } }, right: { Default: { type: "string", value: "" } }, top: { Default: { type: "string", value: "0dp" } }, width: { Default: { type: "string", value: "100%" } } }, flxBg: { __events__: {}, __info__: { kuid: "aa89c2cfe6a64fdc8ccce87574f8c3fd", srcKUID: "be04cdbe61eb490b9251483fff751c6d", wType: "FlexContainer" }, left: { Default: { type: "string", value: "0dp" } }, responsiveData: { b2: { width: { type: "string", value: "100%" } } }, top: { Default: { type: "string", value: "0dp" } }, width: { Default: { type: "string", value: "100.25%" } } } }, enablescrolling: true, id: "buttoncb", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "c02f645ba82e4c428b27d8f923ace6c5", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxRow7", pf: "frmAddress", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "g7c2519a80924e7282b165b871135181", wType: "UserWidgetInstance", zindex: 1 }, city: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "city", _top_: { type: "string", value: "5dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "city", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "afa62925e888406f9d2906738b0e6fb9", name: "kony.ui.Label", parent: "flxRow4", pf: "frmAddress", responsiveData: { b3: { skin: "s00f95126c0846d8ab5c187d75590beb" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, flxAlighnbox: { DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s2f1eb0f0f39464787df00292ffbe2d4", _top_: { type: "string", value: "47dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["tbxPincode", "lstCountry"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxAlighnbox", info: null, iscustomlayout: false, isvisible: true, kuid: "d5a651504fab407db00b7ca9b2a8adb6", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxRow5", pf: "frmAddress", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxBg: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8e1bf97b36c425ba35106913974a1a1", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 1, canUpdateUI: true, children: ["flxHeader1", "flxHeader2", "flxTextbg", "flxDetailsbg"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxBg", info: null, iscustomlayout: false, isvisible: true, kuid: "f5e66c78b2184cd1aef161831db73b0f", layouttype: 4, name: "kony.ui.FlexContainer", parent: "frmAddress", pf: "frmAddress", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, FlxBoxalighn: { DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s2f1eb0f0f39464787df00292ffbe2d4", _top_: { type: "string", value: "47dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, children: ["tbxcity", "lstState"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "FlxBoxalighn", info: null, iscustomlayout: false, isvisible: true, kuid: "cf4706c3c0ce413b8d8a3a7a636b34ab", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxRow4", pf: "frmAddress", responsiveData: { b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, height: { type: "string", value: "60%" }, left: { type: "string", value: "0dp" }, maxHeight: { type: "string", value: "" }, maxWidth: { type: "string", value: "" }, minHeight: { type: "string", value: "" }, minWidth: { type: "string", value: "" }, right: { type: "string", value: "" }, top: { type: "string", value: "40dp" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDetailsbg: { DNDConfig: null, _height_: { type: "string", value: "852dp" }, _left_: { type: "string", value: "248dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s7ecac1b6d2241b589303a356df4710c", _top_: { type: "string", value: "38dp" }, _width_: { type: "string", value: "850px" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxRow1", "flxRow2", "flxRow3", "flxRow4", "flxRow5", "flxRow6", "flxRow7"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDetailsbg", info: null, iscustomlayout: false, isvisible: true, kuid: "faf44500bf2f4308a98aea481745d402", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxBg", pf: "frmAddress", responsiveData: { b1: {}, b2: { width: { type: "string", value: "90%" } }, b3: { centerX: { type: "string", value: "50.00%" }, top: { type: "string", value: "38dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHeader1: { DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se1aa3efcca242688eecbd182a52b37e", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["SignIn"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHeader1", info: null, iscustomlayout: false, isvisible: true, kuid: "a60dc9e4544d4a9ab54ef178020d4178", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBg", pf: "frmAddress", responsiveData: { b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHeader2: { DNDConfig: null, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8820a3a17c0432da7e6ee8e88a0013f", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["header2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHeader2", info: null, iscustomlayout: false, isvisible: true, kuid: "c67a34f3a33645ab9cea5a17d0318d81", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBg", pf: "frmAddress", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRow1: { DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "20dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "scb163df54f445b6a1f0dfeb161c7224", _top_: { type: "string", value: "16dp" }, _width_: { type: "string", value: "95%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["imgBg", "lblSentence"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRow1", info: null, iscustomlayout: false, isvisible: true, kuid: "h0bec7d872184de99e27065208410701", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmAddress", responsiveData: { b2: { centerX: { type: "string", value: "50%" }, width: { type: "string", value: "90%" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "50dp" }, left: { type: "string", value: "20dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRow2: { DNDConfig: null, _height_: { type: "string", value: "110dp" }, _left_: { type: "string", value: "24dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sda5360f15fd4211b34801771a3df107", _top_: { type: "string", value: "22dp" }, _width_: { type: "string", value: "95%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblAddress", "tbxAddressline"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRow2", info: null, iscustomlayout: false, isvisible: true, kuid: "jbb1c645f55f4cad997305a1bfcad16b", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmAddress", responsiveData: { b2: { width: { type: "string", value: "85%" } }, b3: { width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRow3: { DNDConfig: null, _height_: { type: "string", value: "110dp" }, _left_: { type: "string", value: "24dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sda5360f15fd4211b34801771a3df107", _top_: { type: "string", value: "22dp" }, _width_: { type: "string", value: "95%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblAddress2", "tbxAddress2", "lblOptional"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRow3", info: null, iscustomlayout: false, isvisible: true, kuid: "c006c0478ccb492093ea456205f62f5f", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmAddress", responsiveData: { b2: { width: { type: "string", value: "85%" } }, b3: { width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRow4: { DNDConfig: null, _height_: { type: "string", value: "110dp" }, _left_: { type: "string", value: "24dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sc3dc900ab94426eb6c9d640f6471344", _top_: { type: "string", value: "22dp" }, _width_: { type: "string", value: "95%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["city", "lblState", "FlxBoxalighn"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRow4", info: null, iscustomlayout: false, isvisible: true, kuid: "c485fc305197419e9d4584d76ef62243", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmAddress", responsiveData: { b2: { width: { type: "string", value: "85%" } }, b3: { width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRow5: { DNDConfig: null, _height_: { type: "string", value: "110dp" }, _left_: { type: "string", value: "24dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sc3dc900ab94426eb6c9d640f6471344", _top_: { type: "string", value: "22dp" }, _width_: { type: "string", value: "95%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblPincode", "lblCountry", "flxAlighnbox"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRow5", info: null, iscustomlayout: false, isvisible: true, kuid: "c2dd3f6fde5449e9a13a79660d8fa13a", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmAddress", responsiveData: { b2: { width: { type: "string", value: "85%" } }, b3: { width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRow6: { DNDConfig: null, _height_: { type: "string", value: "110dp" }, _left_: { type: "string", value: "24dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8fe9f4379eb4660b6d379e750c20ed9", _top_: { type: "string", value: "22dp" }, _width_: { type: "string", value: "95%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblText", "lstYears"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRow6", info: null, iscustomlayout: false, isvisible: true, kuid: "b11594a9b856444886349db310c637d9", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmAddress", responsiveData: { b2: { width: { type: "string", value: "85%" } }, b3: { width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRow7: { DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "24dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s084ccd8583a4fbdb40ac0c947ac78c6", _top_: { type: "string", value: "22dp" }, _width_: { type: "string", value: "95%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["buttoncb"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRow7", info: null, iscustomlayout: false, isvisible: true, kuid: "fd43828881b54606a4bf1761e73d63fd", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmAddress", responsiveData: { b2: { layoutType: 3, width: { type: "string", value: "85%" } }, b3: { width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTextbg: { DNDConfig: null, _height_: { type: "string", value: "98dp" }, _left_: { type: "string", value: "250dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sa285ba8be344aa090521141baf96256", _top_: { type: "string", value: "22dp" }, _width_: { type: "string", value: "65%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblTxt1", "lblTxt2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTextbg", info: null, iscustomlayout: false, isvisible: true, kuid: "edac65ec504f416d99c8ec4b5228d534", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBg", pf: "frmAddress", responsiveData: { b2: { centerX: { type: "string", value: "50%" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "50dp" }, width: { type: "string", value: "65%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, frmAddress: { "@class": "com.kony.gen.viz.model.container.KVizScrollFlexForm", DNDConfig: null, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _pxMenuIndex: [2, 1, 1], _skin_: "scf0bb0ac9ac406fad753f56963d9262", _title_: null, addWidgetsdone: false, allboxes: [], android: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, androidwearos: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, breakpointInfo: { b1: { width: 1366 }, b2: { width: 1024 }, b3: { width: 640 } }, canUpdateUI: true, canvasWidth: 1200, children: ["flxBg"], containerweight: 100, controllerInfo: { default: { channel: "desktop", fileType: "js", name: "frmAddressController" } }, currentBreakpoint: { kuid: "b3", width: 640 }, currentLocale: "default", desktopweb: { needAppMenu: false }, device: "desktopweb", displayorientation: 1, enabledforidletimeout: false, id: "frmAddress", info: null, initdone: false, inputaccessoryviewtype: 4, ipad: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iphone: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iscustomlayout: false, isvisible: true, kuid: "h9ae119d06e94847a69c15421e574da7", layouttype: 2, name: "kony.ui.Form2", needappmenu: false, paddinginpixel: false, platform: "desktopweb", prevDevice: "desktopweb", prevPlatform: "desktopweb", retaincontentalignment: false, retainflexpositionproperties: false, retainscrollposition: false, snapgridsize: 10, snaptogrid: true, titleBarSkin: "sb51bcefd50c4c1c959df14dd1d7d808", titlebar: true, type: 3, vizProps: { globalRespDesignEnabled: false }, wType: "Form" }, header2: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, autogrowmode: 0, canUpdateUI: true, clipbounds: false, containerweight: 0, dataDiffs: { flxFrstline: { __events__: {}, __info__: { kuid: "b5d46536d54f466c8b31ed83d853b5d0", srcKUID: "d2c631625e454a87a86e18f81f0f3ec5", wType: "FlexContainer" } }, flxInsindeline: { __events__: {}, __info__: { kuid: "ce01695aa5a94fee8f1a8db9281b4d8f", srcKUID: "i43020aa2456425d9540863af9573e36", wType: "FlexContainer" } }, flxbg: { __events__: {}, __info__: { kuid: "ic5f3a6dbdb749ad901d90731bd83cb0", srcKUID: "g72b9e873c02480686d4f68f91178fd5", wType: "FlexContainer" }, left: { Default: { type: "string", value: "0dp" } }, top: { Default: { type: "string", value: "0dp" } } }, header2: { __events__: {}, __info__: { isRoot: true, kuid: "j790fcdd501746248223247eae0837dd", srcKUID: "dc3299f470514829814062d8abd8ef8c", wType: "FlexContainer" }, autogrowMode: { Default: 0 }, bottom: { Default: { type: "string", value: "" } }, centerX: { Default: { type: "string", value: "" } }, centerY: { Default: { type: "string", value: "" } }, height: { Default: { type: "string", value: "100%" } }, left: { Default: { type: "string", value: "0dp" } }, maxHeight: { Default: { type: "string", value: "" } }, maxWidth: { Default: { type: "string", value: "" } }, minHeight: { Default: { type: "string", value: "" } }, minWidth: { Default: { type: "string", value: "" } }, right: { Default: { type: "string", value: "" } }, top: { Default: { type: "string", value: "0dp" } }, width: { Default: { type: "string", value: "100%" } } }, lblText1: { __events__: {}, __info__: { kuid: "e73d83345f264e32afd631dfb032db56", srcKUID: "c1fdff02487143a18f7c56fea7535dbe", wType: "Label" }, responsiveData: {}, text: "Your address" }, lblText2: { __events__: {}, __info__: { kuid: "gca6e5b8f2b34826b0c672b4a8b0fe5d", srcKUID: "dc4de2c435dd4562a3d15c5fa8e3c330", wType: "Label" }, left: { Default: { type: "string", value: "1116dp" } }, responsiveData: { b2: { left: { type: "string", value: "820dp" }, top: { type: "string", value: "12dp" } } }, text: "Step 5 of 7", top: { Default: { type: "string", value: "12dp" } } } }, enablescrolling: true, id: "header2", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "j790fcdd501746248223247eae0837dd", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxHeader2", pf: "frmAddress", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "dc3299f470514829814062d8abd8ef8c", wType: "UserWidgetInstance", zindex: 1 }, imgBg: { DNDConfig: null, _height_: { type: "string", value: "40dp" }, _left_: { type: "string", value: "20dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s3d53a7106c4439581743540eccef5d2", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "5%" }, allboxes: [], canUpdateUI: true, children: ["imgTick"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "imgBg", info: null, iscustomlayout: false, isvisible: true, kuid: "c9877f3ec16a4a99aeb86b915d85fb0c", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxRow1", pf: "frmAddress", responsiveData: { b3: { height: { type: "string", value: "20dp" }, top: { type: "string", value: "15dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, imgTick: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _skin_: "s93be810a54d41cb9973782399707034", _src_: "check_mark.png", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, containerweight: 100, id: "imgTick", imagescalemode: 0, info: null, iscustomlayout: false, isvisible: true, kuid: "c34b4b4d09624c1b88b307ac56469394", name: "kony.ui.Image2", parent: "imgBg", pf: "frmAddress", responsiveData: { b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, height: { type: "string", value: "100%" }, left: { type: "string", value: "0dp" }, maxHeight: { type: "string", value: "" }, maxWidth: { type: "string", value: "" }, minHeight: { type: "string", value: "" }, minWidth: { type: "string", value: "" }, right: { type: "string", value: "" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, lblAddress: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "8dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Address line", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblAddress", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "j8f3dbac92ea426fa90aa5765cfc0268", name: "kony.ui.Label", parent: "flxRow2", pf: "frmAddress", responsiveData: { b3: { skin: "s6bfd1fcaf714c86b5f54af639baff05" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblAddress2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Address line", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblAddress2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "dbbb159998124c3ca69596b8dd354874", name: "kony.ui.Label", parent: "flxRow3", pf: "frmAddress", responsiveData: { b3: { skin: "s2a8d21baf7c432b90ac54c5aa40eda5" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblCountry: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "444dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Country", _top_: { type: "string", value: "5dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblCountry", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c77cedae51314f6284091ec563cf54c2", name: "kony.ui.Label", parent: "flxRow5", pf: "frmAddress", responsiveData: { b3: { left: { type: "string", value: "220dp" }, skin: "s4ec1ae9685d4d46b6d2366753e762d8", top: { type: "string", value: "5dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblOptional: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "150dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "(optional)", _top_: { type: "string", value: "5dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblOptional", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "e6b1c6441957446e9a1eefbffb01ce1e", name: "kony.ui.Label", parent: "flxRow3", pf: "frmAddress", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblPincode: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Pincode", _top_: { type: "string", value: "5dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblPincode", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a6957af7bcf143aa869f4ecb20f2cb0e", name: "kony.ui.Label", parent: "flxRow5", pf: "frmAddress", responsiveData: { b3: { skin: "s38194df35a5460cba7b1088c6839acc" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSentence: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "78dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s37e63e9b33a4cef9d70598666249c37", _text_: "Use the address printed on my passport", _top_: { type: "string", value: "10dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblSentence", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d896ddba6f854e64a115abc2bdcd97ef", name: "kony.ui.Label", parent: "flxRow1", pf: "frmAddress", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "55dp" }, skin: "s5b19969b7b74562a01bf1c7c0a3c671", top: { type: "string", value: "15dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblState: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "444dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "state", _top_: { type: "string", value: "5dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblState", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "acdcef5c9248482caab2e7cc2dd72681", name: "kony.ui.Label", parent: "flxRow4", pf: "frmAddress", responsiveData: { b3: { left: { type: "string", value: "221dp" }, skin: "s723132a99ab447592b92145430fa0d9", top: { type: "string", value: "5dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblText: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "How long have you lived here?", _top_: { type: "string", value: "5dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblText", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "e845aac8536c4b0db1b21acfa379f77d", name: "kony.ui.Label", parent: "flxRow6", pf: "frmAddress", responsiveData: { b3: { skin: "s5b4a51a5c7d400d8dd52d7a8683198c" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTxt1: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sa5c42e031f14861aaead9ccccb1e8b0", _text_: "Where do you live?", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblTxt1", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "e57c0a0b4abd4bebbde0a5309782a722", name: "kony.ui.Label", parent: "flxTextbg", pf: "frmAddress", responsiveData: { b3: { skin: "sc4768d3da2241728c76d702a44882c7" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTxt2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "We post your card and statements here, so make sure it is current.", _top_: { type: "string", value: "60dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblTxt2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d2201af5acf542cf958fd1dab1e6bfdb", name: "kony.ui.Label", parent: "flxTextbg", pf: "frmAddress", responsiveData: { b3: { skin: "s3d6a152421646e4b9d4d68e9291dcb1", text: "We post your card and statements here", top: { type: "string", value: "30dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lstCountry: { "@class": "com.kony.gen.viz.model.component.KVizListBox", DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "78dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "Please Select", _right_: { type: "string", value: "5dp" }, _skin_: "sa8dea55a7164584b4dd968d3e671fff", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "45%" }, canUpdateUI: true, containerweight: 100, contentalignment: 4, focusskin: "sae23eeb48874d9a83df5c77e65d3d79", groupcells: false, id: "lstCountry", info: null, iscustomlayout: false, isvisible: true, kuid: "afa90e849d0143fbb0c9c57694f08db2", masterdata: [["lb1", "India"], ["lb2", "usa"], ["lb3", "Dubail"]], name: "kony.ui.ListBox", parent: "flxAlighnbox", pf: "frmAddress", responsiveData: { b3: { left: { type: "string", value: "70dp" }, width: { type: "string", value: "40%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, selectedkeys: null, selectedkeyvalue: null, selectedkeyvalues: null, size: 18, viewconfig: { toggleViewConfig: { viewStyle: 0 } }, viewtype: 0, wType: "ListBox", zindex: 1 }, lstState: { "@class": "com.kony.gen.viz.model.component.KVizListBox", DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "78dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "Please Select", _right_: { type: "string", value: "5dp" }, _skin_: "sa8dea55a7164584b4dd968d3e671fff", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "45%" }, canUpdateUI: true, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, dropdownimage: "listboxarw.png", focusskin: "sae23eeb48874d9a83df5c77e65d3d79", groupcells: false, id: "lstState", info: null, iscustomlayout: false, isvisible: true, kuid: "f9aa60bc3af14c04bde3c636b40d90f9", masterdata: [["lb1", "TamilNadu"], ["lb2", "Kerala"], ["lb3", "Pondicherry"]], name: "kony.ui.ListBox", paddinginpixel: false, parent: "FlxBoxalighn", pf: "frmAddress", responsiveData: { b3: { centerY: { type: "string", value: "50.00%" }, left: { type: "string", value: "70dp" }, padding: [3, 0, 0, 0], right: { type: "string", value: "" }, width: { type: "string", value: "40%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, selectedkeys: null, selectedkeyvalue: null, selectedkeyvalues: null, size: 18, viewconfig: { toggleViewConfig: { viewStyle: 0 } }, viewtype: 0, wType: "ListBox", zindex: 1 }, lstYears: { "@class": "com.kony.gen.viz.model.component.KVizListBox", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "Please Select", _skin_: "s85b8bbc63ab463b81d809affd988d0e", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, containerweight: 100, contentalignment: 4, dropdownimage: "listboxarw.png", focusskin: "sae23eeb48874d9a83df5c77e65d3d79", groupcells: false, id: "lstYears", info: null, iscustomlayout: false, isvisible: true, kuid: "gfe59c94ae424ef6bfe0fb590c9d257e", masterdata: [["lb1", "1 year"], ["lb2", "2 year"], ["lb3", "3 year"]], name: "kony.ui.ListBox", parent: "flxRow6", pf: "frmAddress", retaincontentalignment: false, retainflexpositionproperties: false, selectedkeys: null, selectedkeyvalue: null, selectedkeyvalues: null, size: 18, viewconfig: { toggleViewConfig: { viewStyle: 0 } }, viewtype: 0, wType: "ListBox", zindex: 1 }, SignIn: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, autogrowmode: 0, canUpdateUI: true, clipbounds: false, containerweight: 0, dataDiffs: { SignIn: { __events__: {}, __info__: { isRoot: true, kuid: "b0505d7fcb2044cdbcaa95bff6b5296d", srcKUID: "c129c7e95f7142d98c81ad7be7b823f0", wType: "FlexContainer" } }, flxContent: { __events__: {}, __info__: { kuid: "eba1f09d85ee400685ccfe5ab97c41bd", srcKUID: "jdda855979e949fbbef74672235a7f8c", wType: "FlexContainer" }, left: { Default: { type: "string", value: "50dp" } }, responsiveData: {}, top: { Default: { type: "string", value: "-10dp" } } }, flxMain: { __events__: {}, __info__: { kuid: "df929663c34842988b41c77b0c5f9f5a", srcKUID: "h9cced33074e4362a0a9829bd42de4a9", wType: "FlexContainer" } }, lblAlhaveAcc: { __events__: {}, __info__: { kuid: "cd923f9fd6f845a4b485a1d316109b4f", srcKUID: "b4b220dbb56b491182f402edc7be59f0", wType: "Label" }, centerY: { Default: { type: "string", value: "50%" } }, left: { Default: { type: "string", value: "900dp" } }, responsiveData: { b2: { centerY: { type: "string", value: "50.00%" }, left: { type: "string", value: "570dp" }, top: { type: "string", value: "10dp" } } }, top: { Default: { type: "string", value: "10dp" } } }, lblAvenza: { __events__: {}, __info__: { kuid: "a8863db761e54483a84f7de0230af439", srcKUID: "b216320e87be4df5ba2303d14015b462", wType: "Label" } }, lblBank: { __events__: {}, __info__: { kuid: "bf79e002c88445ffa3e2f23c40cfbcea", srcKUID: "fa53cb5735634b4cab7570d45ade092b", wType: "Label" } }, lblSIgnIn: { __events__: {}, __info__: { kuid: "cb5c5b531efe42eea31cf8595ab5f050", srcKUID: "debcca8c373841d685bfa6afc5fb108e", wType: "Label" }, centerY: { Default: { type: "string", value: "50.00%" } }, left: { Default: { type: "string", value: "1150dp" } }, responsiveData: { b2: { centerY: { type: "string", value: "50.00%" }, left: { type: "string", value: "810dp" }, top: { type: "string", value: "32dp" } } }, top: { Default: { type: "string", value: "32dp" } } } }, enablescrolling: true, id: "SignIn", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "b0505d7fcb2044cdbcaa95bff6b5296d", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxHeader1", pf: "frmAddress", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "c129c7e95f7142d98c81ad7be7b823f0", wType: "UserWidgetInstance", zindex: 1 }, tbxAddress2: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "60%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "", _skin_: "s2456d373d8b461d8b983cb96af0409c", _text_: "", _top_: { type: "string", value: "30dp" }, _width_: { type: "string", value: "100%" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s595285064c045fcbfbe43f9c8971b96", id: "tbxAddress2", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "c9236d6aeb4e42378bb69b74af270f62", mode: "A", name: "kony.ui.TextBox2", parent: "flxRow3", pf: "frmAddress", placeholderskin: "seb7ade005c04622a6730983f00a34fe", retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 }, tbxAddressline: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "60%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "", _skin_: "s2456d373d8b461d8b983cb96af0409c", _text_: "", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "100%" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s595285064c045fcbfbe43f9c8971b96", id: "tbxAddressline", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "ae6328f5c16f4712bd3444d93588322b", mode: "A", name: "kony.ui.TextBox2", parent: "flxRow2", pf: "frmAddress", placeholderskin: "seb7ade005c04622a6730983f00a34fe", retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 }, tbxcity: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "", _skin_: "s4275e98220a4d4980535bd1ef9a707b", _text_: "", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "45%" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s595285064c045fcbfbe43f9c8971b96", id: "tbxcity", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "fc3fca96f57b4fddb760c47b831f805c", mode: "A", name: "kony.ui.TextBox2", parent: "FlxBoxalighn", pf: "frmAddress", placeholderskin: "seb7ade005c04622a6730983f00a34fe", responsiveData: { b3: { width: { type: "string", value: "40%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 }, tbxPincode: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "", _skin_: "s4275e98220a4d4980535bd1ef9a707b", _text_: "", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "45%" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s595285064c045fcbfbe43f9c8971b96", id: "tbxPincode", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "h6ed013beb05440f8fd2dbaeef433a0d", minwidth: { type: "string", value: "" }, mode: "A", name: "kony.ui.TextBox2", parent: "flxAlighnbox", pf: "frmAddress", placeholderskin: "seb7ade005c04622a6730983f00a34fe", responsiveData: { b3: { desktopweb: { minWidth: { type: "string", value: "" } }, minWidth: { type: "string", value: "" }, width: { type: "string", value: "40%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 } };

  // saywright/vision/apps/avenzabank/src/controllers/frmAddressController.kjs
  var frmAddressController_default = "define({ \r\n\r\n //Type your controller code here \r\n\r\n });";

  // saywright/vision/apps/avenzabank/src/controllers/frmAddressControllerActions.kjs
  var frmAddressControllerActions_default = "define({});\n";

  // saywright/vision/apps/avenzabank/src/forms/FrmDashboard.jsx
  var import_react5 = __toESM(require_react(), 1);
  var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
  function FrmDashboard({ parentLayout }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Flex, { id: "flxMain", parentLayout, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Flex, { id: "flxHeader", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Component2, { id: "MainHeader" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Flex, { id: "flxContent", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Flex, { id: "flxGoodmrng", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { id: "lblAccInfo" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { id: "lblGM" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Button, { id: "btnNewTransfer" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Flex, { id: "flxBalance", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Flex, { id: "flxTotBal", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { id: "lblTotBal" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { id: "lblToAMt" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Flex, { id: "flxSpend", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { id: "lblAva" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { id: "lblAmt2" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Flex, { id: "flxCard", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { id: "lblCard" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { id: "lblCardAmt" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Flex, { id: "flxYrAcc", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { id: "lblYrAcc" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Flex, { id: "flxAccSegment", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Segment, { id: "segAccDetails" }) })
      ] })
    ] }) });
  }

  // saywright/vision/apps/avenzabank/src/forms/frmDashboard.widgets.json
  var frmDashboard_widgets_default = { btnNewTransfer: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "45%" }, _left_: { type: "string", value: "980dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "30dp" }, _skin_: "s42613f00f78467499c3159b9d54b80c", _text_: "New Transfer", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "10%" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "s48281d315f04a599f1dddee5db55c69", id: "btnNewTransfer", info: null, iscustomlayout: false, isvisible: true, kuid: "g0d99b9c67ca42998e156f58ab9278c4", name: "kony.ui.Button", parent: "flxGoodmrng", pf: "frmDashboard", retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, flxAccSegment: { DNDConfig: null, _height_: { type: "string", value: "410dp" }, _left_: { type: "string", value: "113dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "81.21%" }, allboxes: [], canUpdateUI: true, children: ["segAccDetails"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxAccSegment", info: null, iscustomlayout: false, isvisible: true, kuid: "bcfa0524668d4a9082af447b0c393e43", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxContent", pf: "frmDashboard", responsiveData: { b1: { height: { type: "string", value: "416dp" } }, b2: { left: { type: "string", value: "70dp" }, width: { type: "string", value: "87.66%" } }, b3: { height: { type: "string", value: "413dp" }, left: { type: "string", value: "37dp" }, width: { type: "string", value: "89.06%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxBalance: { DNDConfig: null, _height_: { type: "string", value: "173dp" }, _left_: { type: "string", value: "100dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "81%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxTotBal", "flxSpend", "flxCard"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxBalance", info: null, iscustomlayout: false, isvisible: true, kuid: "b8d5a2d221e34cd193f709fa6d3a34e7", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxContent", pf: "frmDashboard", responsiveData: { b2: { left: { type: "string", value: "60dp" }, width: { type: "string", value: "88.67%" } }, b3: { left: { type: "string", value: "20dp" }, width: { type: "string", value: "90.63%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCard: { DNDConfig: null, _height_: { type: "string", value: "60%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "0dp" }, _skin_: "se80a56ca92345239245f90e26b6b50c", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "28%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblCard", "lblCardAmt"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCard", info: null, iscustomlayout: false, isvisible: true, kuid: "bd9140a54c034802acce94960cb9e57b", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBalance", pf: "frmDashboard", responsiveData: { b3: { right: { type: "string", value: "10dp" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "25%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxContent: { DNDConfig: null, _height_: { type: "string", value: "90%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8e1bf97b36c425ba35106913974a1a1", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100.00%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxGoodmrng", "flxBalance", "flxYrAcc", "flxAccSegment"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxContent", info: null, iscustomlayout: false, isvisible: true, kuid: "eb59c4fcb6d24d2abf50a788050cc079", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "frmDashboard", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxGoodmrng: { DNDConfig: null, _height_: { type: "string", value: "12.35%" }, _left_: { type: "string", value: "110dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "100dp" }, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "15dp" }, _width_: { type: "string", value: "81%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblAccInfo", "lblGM", "btnNewTransfer"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxGoodmrng", info: null, iscustomlayout: false, isvisible: true, kuid: "a727c4ed3710478ab760659f6d601316", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxContent", pf: "frmDashboard", responsiveData: { b2: { left: { type: "string", value: "70dp" }, top: { type: "string", value: "16dp" }, width: { type: "string", value: "87.89%" } }, b3: { left: { type: "string", value: "20dp" }, width: { type: "string", value: "87.50%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHeader: { DNDConfig: null, _height_: { type: "string", value: "10%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["MainHeader"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHeader", info: null, iscustomlayout: false, isvisible: true, kuid: "ed18e422bc7f46c997aa6389e3bd5a83", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "frmDashboard", responsiveData: { b2: { width: { type: "string", value: "100.00%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxMain: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxHeader", "flxContent"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxMain", info: null, iscustomlayout: false, isvisible: true, kuid: "b17c8037b3af4f88b2ea538046cde6b2", layouttype: 4, name: "kony.ui.FlexContainer", parent: "frmDashboard", pf: "frmDashboard", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxSpend: { DNDConfig: null, _height_: { type: "string", value: "60%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "0" }, _skin_: "se80a56ca92345239245f90e26b6b50c", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "28%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblAva", "lblAmt2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxSpend", info: null, iscustomlayout: false, isvisible: true, kuid: "h2da931f12a94ff3b3356281c423fb47", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBalance", pf: "frmDashboard", responsiveData: { b3: { width: { type: "string", value: "25%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTotBal: { DNDConfig: null, _height_: { type: "string", value: "60%" }, _left_: { type: "string", value: "10dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s6c5de93befa4cd4b55f51882763f18c", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "28%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblTotBal", "lblToAMt"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTotBal", info: null, iscustomlayout: false, isvisible: true, kuid: "fbf18389d05e418fb18101e626144e8f", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBalance", pf: "frmDashboard", responsiveData: { b3: { width: { type: "string", value: "25%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxYrAcc: { DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "110dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "17%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblYrAcc"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxYrAcc", info: null, iscustomlayout: false, isvisible: true, kuid: "a228b450676147ea8fed51d01d1c7d1b", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxContent", pf: "frmDashboard", responsiveData: { b2: { left: { type: "string", value: "70dp" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "15.63%" } }, b3: { left: { type: "string", value: "37dp" }, width: { type: "string", value: "26.38%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, frmDashboard: { "@class": "com.kony.gen.viz.model.container.KVizScrollFlexForm", DNDConfig: null, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "scf0bb0ac9ac406fad753f56963d9262", _title_: null, addWidgetsdone: false, allboxes: [], android: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, androidwearos: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, breakpointInfo: { b1: { width: 1366 }, b2: { width: 1024 }, b3: { width: 640 } }, canUpdateUI: true, canvasWidth: 1200, children: ["flxMain"], containerweight: 100, controllerInfo: { default: { channel: "desktop", fileType: "js", name: "frmDashboardController" } }, currentLocale: "default", desktopweb: { needAppMenu: false }, device: "desktopweb", displayorientation: 1, enabledforidletimeout: false, id: "frmDashboard", info: null, initdone: false, inputaccessoryviewtype: 4, ipad: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iphone: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iscustomlayout: false, isvisible: true, kuid: "a6f175dbf01d480e87bb66d17c01fba3", layouttype: 2, name: "kony.ui.Form2", needappmenu: false, paddinginpixel: false, platform: "desktopweb", prevDevice: "desktopweb", prevPlatform: "desktopweb", retaincontentalignment: false, retainflexpositionproperties: false, retainscrollposition: false, snapgridsize: 10, snaptogrid: true, titleBarSkin: "sb51bcefd50c4c1c959df14dd1d7d808", titlebar: true, type: 3, wType: "Form" }, lblAccInfo: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "5 accounts \xB7 last updated 09:42", _top_: { type: "string", value: "50dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblAccInfo", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ddb476969b0545e685def37e210cff2a", name: "kony.ui.Label", parent: "flxGoodmrng", pf: "frmDashboard", responsiveData: { b3: { left: { type: "string", value: "8dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblAmt: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "20dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sac923d24dec40dea7f2d695947c7813", _text_: "$164,670.50", _top_: { type: "string", value: "53dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblAmt", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "bb9d2a221c414ae5bb1a6b35b426faff", name: "kony.ui.Label", parent: "flxTotBal", pf: "frmDashboard", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblAmt2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "20dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s008ab2959d04c549755054db8f1adf6", _text_: "$66,981.15", _top_: { type: "string", value: "53dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblAmt2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "df5c9838829a43d382d6b683714aac70", name: "kony.ui.Label", parent: "flxSpend", pf: "frmDashboard", responsiveData: { b3: { left: { type: "string", value: "12dp" }, skin: "s846db32ce324cfc9c1a2e16010e3f82" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblAva: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "20dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Available to spend", _top_: { type: "string", value: "23dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblAva", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a4548a18a1ea40c5a85b95b919d921f5", name: "kony.ui.Label", parent: "flxSpend", pf: "frmDashboard", responsiveData: { b3: { left: { type: "string", value: "12dp" }, skin: "s9724d0fcc8d4aa69b1816b5cb099b5b" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblCard: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "20dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Card outstanding", _top_: { type: "string", value: "23dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblCard", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "j20bff6178834d6089521e4db3cb83ba", name: "kony.ui.Label", parent: "flxCard", pf: "frmDashboard", responsiveData: { b3: { left: { type: "string", value: "12dp" }, skin: "s17f55eccd5e4f47a136aa0845d14cf4" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblCardAmt: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "20dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sef5792603ef4ad5ba6c0b3ec56ec3a6", _text_: "$2,310.65", _top_: { type: "string", value: "53dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblCardAmt", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a7ebb7419e5746e1b90da098a0c66404", name: "kony.ui.Label", parent: "flxCard", pf: "frmDashboard", responsiveData: { b3: { left: { type: "string", value: "12dp" }, skin: "sb894a0dfa5f425da2a4bf8b91cd5d07" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblGM: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s77dc93446fb437892166de5d8f60e94", _text_: "Good morning, Maya", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblGM", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ee76b3b46577490baaa3c5abdbf8b8aa", name: "kony.ui.Label", parent: "flxGoodmrng", pf: "frmDashboard", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblToAMt: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "20dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s31e7f1382ff429db0af8076cb559608", _text_: "$164,670.50", _top_: { type: "string", value: "45dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblToAMt", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ga9646fc3c274be38362917bd3e25355", name: "kony.ui.Label", parent: "flxTotBal", pf: "frmDashboard", responsiveData: { b3: { skin: "s17357821290427f9713b897c320e9bf" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTotBal: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "20dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Total balence", _top_: { type: "string", value: "20dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblTotBal", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c65184a741dd4045aac991aed4f2016f", name: "kony.ui.Label", parent: "flxTotBal", pf: "frmDashboard", responsiveData: { b3: { skin: "sb09cc4000b94b46ad7b18c64de64ab2" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblYrAcc: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Your accounts", _top_: { type: "string", value: "16dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblYrAcc", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a70a676de9ed464f80258384e751f363", name: "kony.ui.Label", parent: "flxYrAcc", pf: "frmDashboard", responsiveData: { b3: { skin: "s430720a17854295b3e2387868a655de" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, MainHeader: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, autogrowmode: 0, canUpdateUI: true, clipbounds: false, containerweight: 0, dataDiffs: { MainHeader: { __events__: {}, __info__: { isRoot: true, kuid: "ia3c68e28eec477bada3ef4feecbf819", srcKUID: "c8bbc02c88044b4eb89d12cde7dc1064", wType: "FlexContainer" }, centerX: { Default: { type: "string", value: "" } }, centerY: { Default: { type: "string", value: "" } }, isVisible: true, left: { Default: { type: "string", value: "0dp" } }, responsiveData: { b3: { isVisible: true } }, top: { Default: { type: "string", value: "0dp" } } }, flxContents: { __events__: {}, __info__: { kuid: "fa610f6f682144a3a82f37ec5f1fa373", srcKUID: "a978bcd341174297b87cf7be654e014f", wType: "FlexContainer" }, left: { Default: { type: "string", value: "25dp" } }, responsiveData: { b2: { left: { type: "string", value: "-30dp" }, width: { type: "string", value: "100.49%" } } }, width: { Default: { type: "string", value: "93.70%" } } }, flxMain: { __events__: {}, __info__: { kuid: "i7e44227c93048aea7abc7eb2899c3f2", srcKUID: "fddd94b8bc9a4269ab019a1ad0d0fd96", wType: "FlexContainer" } }, flxNameRound: { __events__: {}, __info__: { kuid: "i623c689d04a4f3e979b876900860451", srcKUID: "af28fbad67c34b8482ebe3df8ed55179", wType: "FlexContainer" }, centerY: { Default: { type: "string", value: "50%" } }, isVisible: true, left: { Default: { type: "string", value: "1150dp" } }, responsiveData: { b2: { centerY: { type: "string", value: "55.88%" }, isVisible: false, left: { type: "string", value: "885dp" } } } }, flxTop: { __events__: {}, __info__: { kuid: "e9a86a0e41234fc0a7623fc9628283f4", srcKUID: "e52cd87f49ea416f9a2e1e9e9191f09d", wType: "FlexContainer" } }, lblAccounts: { __events__: {}, __info__: { kuid: "g8a8f2e801e6419dad1bb1543ebb3d0b", srcKUID: "e8f3214f6aa2423a94935cd9dd20bd46", wType: "Label" }, left: { Default: { type: "string", value: "390dp" } }, responsiveData: { b2: { left: { type: "string", value: "320dp" } }, b3: { left: { type: "string", value: "250dp" } } } }, lblAvenza: { __events__: {}, __info__: { kuid: "cc786607126a4b8895793ce0661388ee", srcKUID: "d25f7e45e014464e971671bd4bb61986", wType: "Label" }, left: { Default: { type: "string", value: "100dp" } }, responsiveData: { b2: { left: { type: "string", value: "70dp" }, text: "Avenza" }, b3: { left: { type: "string", value: "0dp" }, text: "Avenza" } }, text: "Avenza" }, lblBank: { __events__: {}, __info__: { kuid: "ed0aff3dd6ae4a35a3c18b62b022797c", srcKUID: "dcdc320a996748db8df474f28fd68d83", wType: "Label" }, centerX: { Default: { type: "number", value: "" } }, left: { Default: { type: "string", value: "228dp" } }, responsiveData: { b2: { left: { type: "string", value: "195dp" }, text: "Bank" }, b3: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "125dp" } } }, text: "Bank" }, lblMF: { __events__: {}, __info__: { kuid: "edd81bbdb570475881e6eb03d9d7e7a0", srcKUID: "i5c473c234f94d80af5d4e7fab313998", wType: "Label" } }, lblMayaFernandes: { __events__: {}, __info__: { kuid: "jf6507eb18d84b3ca86769152d8723a9", srcKUID: "c392bb0e133c4634acc531ea658067fa", wType: "Label" }, centerY: { Default: { type: "string", value: "50%" } }, isVisible: true, left: { Default: { type: "string", value: "990dp" } }, responsiveData: { b2: { centerY: { type: "string", value: "50.00%" }, isVisible: false, left: { type: "string", value: "730dp" } } } }, lblProfile: { __events__: {}, __info__: { kuid: "f40f6bbad62e4e37a65f62aa1f643fd8", srcKUID: "ef5b4de359fd473896f0c1ca18551699", wType: "Label" }, left: { Default: { type: "string", value: "630dp" } }, responsiveData: { b2: { left: { type: "string", value: "565dp" } }, b3: { left: { type: "string", value: "455dp" } } } }, lblTransfer: { __events__: {}, __info__: { kuid: "f41110a76ff04ccdb6376ab79bb0018f", srcKUID: "j427ee4d366d4565980a76de9cc508f9", wType: "Label" }, left: { Default: { type: "string", value: "498dp" } }, responsiveData: { b2: { left: { type: "string", value: "438dp" } }, b3: { left: { type: "string", value: "345dp" } } } } }, enablescrolling: true, id: "MainHeader", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "ia3c68e28eec477bada3ef4feecbf819", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxHeader", pf: "frmDashboard", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "c8bbc02c88044b4eb89d12cde7dc1064", wType: "UserWidgetInstance", zindex: 1 }, segAccDetails: { "@class": "com.kony.gen.viz.model.container.KVizSegment2", DNDConfig: null, _data_: [{ imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblAccNo: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "123456XXXX" }, lblPriSav: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Primary Savings" }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblSavingsAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Saving Account" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblAccNo: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "778812XXXX" }, lblPriSav: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Business Current" }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$48,210.00" }, lblSavingsAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Current ACcount" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblAccNo: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "990045XXXX" }, lblPriSav: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Payroll" }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$6,320.40" }, lblSavingsAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Salary Account" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblAccNo: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "556677XXXX" }, lblPriSav: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "FD 2026" }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$100,000.00" }, lblSavingsAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Fixed Deposit" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblAccNo: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "889900XXXX" }, lblPriSav: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Platinum card" }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "-$2,310.65" }, lblSavingsAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Credit Card" } }], _height_: { type: "string", value: "410dp" }, _indicator_: "none", _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 2, _padding_: [0, 0, 0, 0], _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "100.17%" }, autogrowmode: 0, canUpdateUI: true, containerweight: 100, counter: "04", focusedindex: null, focuseditem: null, groupcells: false, hasSections: false, id: "segAccDetails", info: null, ipad: { psp: { indicator: "rowselect" } }, iphone: { psp: { indicator: "rowselect" } }, iscustomlayout: false, isvisible: true, kuid: "fb12f1c9ec4a4aeca521584b7c76cee8", masterdata: {}, name: "kony.ui.SegmentedUI2", needpageindicator: true, pageoffdotimage: "pageoffdot.png", pageondotimage: "pageondot.png", paginationconfig: { position: "bottom" }, parent: "flxAccSegment", pf: "frmDashboard", responsiveData: { b1: {}, b2: { data: [{ imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblACtAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblPrimSavings: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Primary Savings" }, lblSavAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Savings Account " }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "123456XXXX" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblACtAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblPrimSavings: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Business Current" }, lblSavAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Current Account " }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "778812XXXX" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblACtAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblPrimSavings: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Payroll" }, lblSavAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Salary Account " }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "990045XXXX" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblACtAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblPrimSavings: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Fd 2026" }, lblSavAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Fixed Deposit" }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "556677XXXX" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblACtAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblPrimSavings: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Platinum Card" }, lblSavAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Credit Card" }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "889900XXXX" } }], isVisible: true, rowTemplate: "j97adace75e440a6bde4e1de431d1bc4", sectionHeaderTemplate: null, widgetDataMap: { flxAccInfo: "flxAccInfo", flxAmt: "flxAmt", flxBg: "flxBg", flxHome: "flxHome", flxHomeBg: "flxHomeBg", flxNext: "flxNext", imgHome: "imgHome", imgNext: "imgNext", lblACtAmt: "lblACtAmt", lblPrimSavings: "lblPrimSavings", lblSavAcc: "lblSavAcc", lblSavAmt: "lblSavAmt" } }, b3: { data: [{ imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblACtAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblPrimSavings: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Primary Savings" }, lblSavAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Savings Account " }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "123456XXXX" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblACtAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblPrimSavings: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Primary Savings" }, lblSavAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Savings Account " }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "123456XXXX" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblACtAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblPrimSavings: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Primary Savings" }, lblSavAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Savings Account " }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "123456XXXX" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblACtAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblPrimSavings: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Primary Savings" }, lblSavAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Savings Account " }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "123456XXXX" } }, { imgHome: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "home_icon_silhouette.png" }, imgNext: { "@class": "com.viz.ide.model.segment.ImageSegmentData", src: "right__1_.png" }, lblACtAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "$12,450.75" }, lblPrimSavings: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Primary Savings" }, lblSavAcc: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "Savings Account " }, lblSavAmt: { "@class": "com.viz.ide.model.segment.SimpleTextSegmentData", text: "123456XXXX" } }], isVisible: true, rowTemplate: "j97adace75e440a6bde4e1de431d1bc4", sectionHeaderTemplate: null, widgetDataMap: { flxAccInfo: "flxAccInfo", flxAmt: "flxAmt", flxBg: "flxBg", flxHome: "flxHome", flxHomeBg: "flxHomeBg", flxNext: "flxNext", imgHome: "imgHome", imgNext: "imgNext", lblACtAmt: "lblACtAmt", lblPrimSavings: "lblPrimSavings", lblSavAcc: "lblSavAcc", lblSavAmt: "lblSavAmt" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainselection: false, rowTemplateId: "a54818537e804237b9d05c1ca6ea6b59", rowcounter: 4, rowexpandable: false, rowfocusskin: "sc7da77af15d4865a7cf0b102f8741b7", rowskin: "s88fa22c4eff483da91fc5db02653a09", rowtemplate: "flxrow1", screenlevelwidget: false, seccounter: 0, sectionHeaderTemplateId: null, sectionheaderskin: "s63dc8dc6e5b409da85639798de83543", sectionheadertemplate: null, selectedRows: null, selectedState: false, selectedindex: null, selectedindices: null, selecteditems: null, selectedsectionindex: 0, selectionbehavior: "default", separatorcolor: "aaaaaa00", separatorrequired: true, separatorthickness: 1, showscrollbars: false, viewtype: "tableview", vizProps: {}, wType: "Segment", widgetalignment: 5, widgetdatamap: { flxAccInfo: "flxAccInfo", flxAmt: "flxAmt", flxBg: "flxBg", flxHome: "flxHome", flxNext: "flxNext", flxrow1: "flxrow1", imgHome: "imgHome", imgNext: "imgNext", lblAccNo: "lblAccNo", lblPriSav: "lblPriSav", lblSavAmt: "lblSavAmt", lblSavingsAcc: "lblSavingsAcc" }, zindex: 1 } };

  // saywright/vision/apps/avenzabank/src/controllers/frmDashboardController.kjs
  var frmDashboardController_default = "define({ \r\n\r\n //Type your controller code here \r\n\r\n });";

  // saywright/vision/apps/avenzabank/src/controllers/frmDashboardControllerActions.kjs
  var frmDashboardControllerActions_default = "define({});\n";

  // saywright/vision/apps/avenzabank/src/forms/FrmIdentity.jsx
  var import_react6 = __toESM(require_react(), 1);
  var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
  function FrmIdentity({ parentLayout }) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxBg", parentLayout, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Flex, { id: "flxHeader1", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Component2, { id: "SignIn" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Flex, { id: "flxHeader2", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Component2, { id: "flow" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxTextbg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblProve" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblTxt2" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxDetailsbg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxDtlrow1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblDoctype" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ListBox, { id: "lbxPassport" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblDocno" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TextField, { id: "tbxDocno" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxDtlrow2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Flex, { id: "flxImgbg", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Image, { id: "imgCheck" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxTxt", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblPassportphoto" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblpassportfront" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Flex, { id: "flxReplace", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { id: "btnRP" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxDtlrow3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Flex, { id: "flxImg2bg", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Image, { id: "imgTick" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxTxtbg2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblPassportsignaturepage" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblpassportback" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Flex, { id: "flxReplace2", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { id: "btnReplace" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxDtlrow4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Flex, { id: "flxImg3bg", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Image, { id: "imgUpload" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxTxtbg3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblSelfie" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblNotuploaded" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Flex, { id: "flxupload", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { id: "btnUpload" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxrow5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblSentence" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { id: "lblSentence2" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Flex, { id: "flxContinueback", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Component2, { id: "continueback" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { id: "btnContinue" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { id: "btnBack" })
        ] })
      ] })
    ] }) });
  }

  // saywright/vision/apps/avenzabank/src/forms/frmIdentity.widgets.json
  var frmIdentity_widgets_default = { btnBack: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "228dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "s6c16a6148cc4cb2be48e9f907b2f6f8", _text_: "Button", _top_: { type: "string", value: "12dp" }, _width_: { type: "string", value: "300dp" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sc51d83a01164428b124a1dbbdcf494b", id: "btnBack", info: null, iscustomlayout: false, isvisible: true, kuid: "ea871b2a2a364b76aa6a1fb36a338cf3", name: "kony.ui.Button", parent: "flxContinueback", pf: "frmIdentitydocuments", responsiveData: { b1: { isVisible: false }, b2: { isVisible: false }, b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, height: { type: "string", value: "100%" }, left: { type: "string", value: "" }, maxHeight: { type: "string", value: "" }, maxWidth: { type: "string", value: "" }, minHeight: { type: "string", value: "" }, minWidth: { type: "string", value: "" }, right: { type: "string", value: "0dp" }, skin: "s9b23aca6e72468e83549b6941cfab26", text: "Back", top: { type: "string", value: "0dp" }, width: { type: "string", value: "45%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, btnContinue: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "4dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "s6c16a6148cc4cb2be48e9f907b2f6f8", _text_: "Button", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "300dp" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sc51d83a01164428b124a1dbbdcf494b", id: "btnContinue", info: null, iscustomlayout: false, isvisible: true, kuid: "a4e88dda795047b085171333eef86a26", name: "kony.ui.Button", parent: "flxContinueback", pf: "frmIdentitydocuments", responsiveData: { b1: { isVisible: false }, b2: { isVisible: false }, b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, height: { type: "string", value: "100%" }, left: { type: "string", value: "0dp" }, maxHeight: { type: "string", value: "" }, maxWidth: { type: "string", value: "" }, minHeight: { type: "string", value: "" }, minWidth: { type: "string", value: "" }, right: { type: "string", value: "" }, skin: "sbed326dbd584462a324621efb765d26", text: "Continue", top: { type: "string", value: "0dp" }, width: { type: "string", value: "45%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, btnReplace: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "s17d0aff5b264a7eb3b5923944802b7f", _text_: "Replace", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sc51d83a01164428b124a1dbbdcf494b", id: "btnReplace", info: null, iscustomlayout: false, isvisible: true, kuid: "ea03d422bf524a61875fabdddebc83f4", name: "kony.ui.Button", parent: "flxReplace2", pf: "frmIdentitydocuments", responsiveData: { b3: { skin: "scd1a3b2c90f4d95bcf7c081bd42b93c" } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, btnRP: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "sdc221878367432ca8898524d283cb24", _text_: "Replace", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sc51d83a01164428b124a1dbbdcf494b", id: "btnRP", info: null, iscustomlayout: false, isvisible: true, kuid: "d9b71069aac8460ea742d08c2a7a741a", name: "kony.ui.Button", parent: "flxReplace", pf: "frmIdentitydocuments", responsiveData: { b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, height: { type: "string", value: "100%" }, left: { type: "string", value: "0dp" }, maxHeight: { type: "string", value: "" }, maxWidth: { type: "string", value: "" }, minHeight: { type: "string", value: "" }, minWidth: { type: "string", value: "" }, right: { type: "string", value: "" }, skin: "s581cde1a6474773bd72e9f70157fe0b", top: { type: "string", value: "0dp" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, btnUpload: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _right_: { type: "number", value: "" }, _skin_: "s124a6ab958049c39c70711fa6026362", _text_: "Upload", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sc51d83a01164428b124a1dbbdcf494b", id: "btnUpload", info: null, iscustomlayout: false, isvisible: true, kuid: "fbfccbed8f4f47dfbfbb73dc489de158", name: "kony.ui.Button", parent: "flxupload", pf: "frmIdentitydocuments", responsiveData: { b3: { right: { type: "string", value: "7%" }, skin: "sfbc977e6c9f43faaa6b94bdcfd94d46" } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, continueback: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sdf2482457164e5a9b3c123afcaaa6b3", _top_: { type: "string", value: "-20dp" }, _width_: { type: "string", value: "126.30%" }, canUpdateUI: true, containerweight: 0, data: {}, id: "continueback", info: null, iscustomlayout: false, isvisible: true, kuid: "h7856743e860462a99d4a41d378ea526", masterType: 1, name: "kony.ui.UserWidgetInstance", parent: "flxContinueback", pf: "frmIdentitydocuments", responsiveData: { b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, height: { type: "string", value: "100%" }, isVisible: false, left: { type: "string", value: "40dp" }, maxHeight: { type: "string", value: "" }, maxWidth: { type: "string", value: "" }, minHeight: { type: "string", value: "" }, minWidth: { type: "string", value: "" }, right: { type: "string", value: "" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "108.34%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, sourceUserWidget: "efcb47cad4bc4b0498275d698d90c096", wType: "UserWidgetInstance", zindex: 1 }, flow: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "2dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sdf2482457164e5a9b3c123afcaaa6b3", _top_: { type: "string", value: "-2dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 0, data: {}, id: "flow", info: null, iscustomlayout: false, isvisible: true, kuid: "e7f2056316fa4d96a923f0df41bcfd63", masterType: 1, name: "kony.ui.UserWidgetInstance", parent: "flxHeader2", pf: "frmIdentitydocuments", responsiveData: { b2: { centerX: { type: "string", value: "50%" } }, b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, height: { type: "string", value: "80%" }, left: { type: "string", value: "0dp" }, maxHeight: { type: "string", value: "" }, maxWidth: { type: "string", value: "" }, minHeight: { type: "string", value: "" }, minWidth: { type: "string", value: "" }, right: { type: "string", value: "" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "50%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, sourceUserWidget: "d395ff61523e421787129fd0ad6824d1", wType: "UserWidgetInstance", zindex: 1 }, flxBg: { DNDConfig: null, _bottom_: { type: "number", value: "" }, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8e1bf97b36c425ba35106913974a1a1", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], allowhorizontalbounce: false, allowverticalbounce: true, bounces: true, canUpdateUI: true, children: ["flxHeader1", "flxHeader2", "flxTextbg", "flxDetailsbg"], clipbounds: false, containerweight: 100, decelerat: false, dragg: false, enablescrolling: true, horizontalscrollindicator: true, id: "flxBg", info: null, iscustomlayout: false, isvisible: true, kuid: "cb1577553d6d42518bf555a8732b2029", layouttype: 4, name: "kony.ui.FlexScrollContainer", pagingenabled: false, parent: "frmIdentity", pf: "frmIdentity", responsiveData: { b1: { skin: "se13a48586784bed82e34e51ade27e47" }, b2: {}, b3: { bottom: { type: "string", value: "0dp" }, height: { type: "string", value: "100%" }, skin: "s8e1bf97b36c425ba35106913974a1a1" } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, scrolldirection: 2, snapgridsize: 10, snaptogrid: true, track: false, verticalscrollindicator: true, wType: "FlexScrollContainer", widgetalignment: 1, zindex: 1 }, flxContinueback: { DNDConfig: null, _height_: { type: "string", value: "110dp" }, _left_: { type: "string", value: "42dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s10b40c197004002b4c3a80645d36600", _top_: { type: "string", value: "20dp" }, _width_: { type: "string", value: "90.80%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["continueback", "btnContinue", "btnBack"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxContinueback", info: null, iscustomlayout: false, isvisible: true, kuid: "a75daa21efaf47dd9a7d63399d84e191", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmIdentitydocuments", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "70dp" }, skin: "s48b3bb9fb1c4bbca4f2f3e9fb8a5eac", width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDetailsbg: { DNDConfig: null, _bottom_: { type: "number", value: "" }, _height_: { type: "string", value: "1000dp" }, _left_: { type: "string", value: "300dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s5b6cf9ad9b041a8a878c32694be9a5d", _top_: { type: "string", value: "5dp" }, _width_: { type: "string", value: "530px" }, allboxes: [], allowhorizontalbounce: false, allowverticalbounce: true, bounces: true, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxDtlrow1", "flxDtlrow2", "flxDtlrow3", "flxDtlrow4", "flxrow5", "flxContinueback"], clipbounds: false, containerweight: 100, decelerat: false, dragg: false, enablescrolling: true, horizontalscrollindicator: true, id: "flxDetailsbg", info: null, iscustomlayout: false, isvisible: true, kuid: "h5fa8229ec07408f92fb5f2702822f07", layouttype: 4, name: "kony.ui.FlexScrollContainer", pagingenabled: false, parent: "flxBg", pf: "frmIdentitydocuments", responsiveData: { b1: { centerX: { type: "string", value: "50.00%" }, left: { type: "string", value: "269dp" }, top: { type: "string", value: "5dp" }, width: { type: "string", value: "850px" } }, b2: { left: { type: "string", value: "100dp" }, width: { type: "string", value: "800px" } }, b3: { bottom: { type: "string", value: "" }, height: { type: "string", value: "800dp" }, left: { type: "string", value: "" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "95%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, scrolldirection: 2, snapgridsize: 10, snaptogrid: true, track: false, verticalscrollindicator: true, wType: "FlexScrollContainer", widgetalignment: 1, zindex: 1 }, flxDtlrow1: { DNDConfig: null, _height_: { type: "string", value: "150dp" }, _left_: { type: "string", value: "43dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "36dp" }, _skin_: "sb3c68fcf14f4ae5a626e0458804aec4", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "90.59%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblDoctype", "lbxPassport", "lblDocno", "tbxDocno"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDtlrow1", info: null, iscustomlayout: false, isvisible: true, kuid: "gccdc3918a5b44e49d88ac485b8af2be", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmIdentitydocuments", responsiveData: { b1: { left: { type: "string", value: "43dp" }, top: { type: "string", value: "0dp" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "ref", value: "preferred" }, layoutType: 4, left: { type: "string", value: "" }, right: { type: "string", value: "" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDtlrow2: { DNDConfig: null, _height_: { type: "string", value: "150dp" }, _left_: { type: "string", value: "42dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sf30ca9da3a14d01b8c9f0a7576d51aa", _top_: { type: "string", value: "38dp" }, _width_: { type: "string", value: "90.82%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["flxImgbg", "flxTxt", "flxReplace"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDtlrow2", info: null, iscustomlayout: false, isvisible: true, kuid: "h72d0970f8f64551b3cb7e106bc8f310", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmIdentitydocuments", responsiveData: { b3: { centerX: { type: "string", value: "50.00%" }, height: { type: "string", value: "120dp" }, layoutType: 2, top: { type: "string", value: "20dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDtlrow3: { DNDConfig: null, _height_: { type: "string", value: "150dp" }, _left_: { type: "string", value: "42dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sf30ca9da3a14d01b8c9f0a7576d51aa", _top_: { type: "string", value: "38dp" }, _width_: { type: "string", value: "90.82%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["flxImg2bg", "flxTxtbg2", "flxReplace2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDtlrow3", info: null, iscustomlayout: false, isvisible: true, kuid: "b5ce5e06d2f64b02ba1af61e5cf608d2", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmIdentitydocuments", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "120dp" }, left: { type: "string", value: "15dp" }, top: { type: "string", value: "20dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDtlrow4: { DNDConfig: null, _height_: { type: "string", value: "150dp" }, _left_: { type: "string", value: "48dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s11bf18893664ac29c8b1430c3229a09", _top_: { type: "string", value: "36dp" }, _width_: { type: "string", value: "90.82%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["flxImg3bg", "flxTxtbg3", "flxupload"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDtlrow4", info: null, iscustomlayout: false, isvisible: true, kuid: "ef1cbdd138b34200b776107a45a84424", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmIdentitydocuments", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "120dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHeader1: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sa861ee0b6a847c8b6c4cd37390be648", _top_: { type: "string", value: "20dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["SignIn"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHeader1", info: null, iscustomlayout: false, isvisible: true, kuid: "g13e5a37685e49bfaeab9e72e26a68db", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxBg", pf: "frmIdentitydocuments", responsiveData: { b2: { centerX: { type: "string", value: "50%" } }, b3: { centerX: { type: "string", value: "50%" }, isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHeader2: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sd95e9da1bb5482caccbdd9cde2b95ef", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["flow"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHeader2", info: null, iscustomlayout: false, isvisible: true, kuid: "jdaf63e1405b4b948548df4ee32fe402", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBg", pf: "frmIdentitydocuments", responsiveData: { b3: { centerX: { type: "string", value: "50%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxImg2bg: { DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "50dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s81aaa1687934ef48a882c2d9b1b48eb", _top_: { type: "string", value: "40dp" }, _width_: { type: "string", value: "10%" }, allboxes: [], canUpdateUI: true, centery: { type: "number", value: "" }, children: ["imgTick"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxImg2bg", info: null, iscustomlayout: false, isvisible: true, kuid: "i41575fbc35648bf8447b6055b3caabc", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDtlrow3", pf: "frmIdentitydocuments", responsiveData: { b3: { centerY: { type: "string", value: "50%" }, height: { type: "string", value: "50dp" }, left: { type: "string", value: "7dp" }, top: { type: "string", value: "25dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxImg3bg: { DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "36dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sd3c6258ef1a45f28d58ac401c054cc3", _top_: { type: "string", value: "40dp" }, _width_: { type: "string", value: "10%" }, allboxes: [], canUpdateUI: true, centery: { type: "number", value: "" }, children: ["imgUpload"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxImg3bg", info: null, iscustomlayout: false, isvisible: true, kuid: "a64479cb5d9c4ac7baaa48fcdfe271e8", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDtlrow4", pf: "frmIdentitydocuments", responsiveData: { b3: { centerY: { type: "string", value: "50%" }, height: { type: "string", value: "50dp" }, layoutType: 3, left: { type: "string", value: "7dp" }, top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxImgbg: { DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "50dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s81aaa1687934ef48a882c2d9b1b48eb", _top_: { type: "string", value: "40dp" }, _width_: { type: "string", value: "10%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, children: ["imgCheck"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxImgbg", info: null, iscustomlayout: false, isvisible: true, kuid: "i5bad458e5d240f0b7053e3dfa07eb4f", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDtlrow2", pf: "frmIdentitydocuments", responsiveData: { b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, height: { type: "string", value: "50dp" }, left: { type: "string", value: "7dp" }, top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxReplace: { DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "548dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "number", value: "" }, _skin_: "sb5eab200a9c4035ae107361aad3bbde", _top_: { type: "string", value: "40dp" }, _width_: { type: "string", value: "24.90%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["btnRP"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxReplace", info: null, iscustomlayout: false, isvisible: true, kuid: "be548ec8a73544f191059da8147b284b", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDtlrow2", pf: "frmIdentitydocuments", responsiveData: { b2: { left: { type: "string", value: "535dp" } }, b3: { centerX: { type: "string", value: "" }, height: { type: "string", value: "60dp" }, left: { type: "string", value: "" }, right: { type: "string", value: "7dp" }, top: { type: "string", value: "20dp" }, width: { type: "string", value: "20%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxReplace2: { DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "548dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "number", value: "" }, _skin_: "sb5eab200a9c4035ae107361aad3bbde", _top_: { type: "string", value: "40dp" }, _width_: { type: "string", value: "24.90%" }, allboxes: [], canUpdateUI: true, children: ["btnReplace"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxReplace2", info: null, iscustomlayout: false, isvisible: true, kuid: "c925559a44ae4846a21c193e43f50bff", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDtlrow3", pf: "frmIdentitydocuments", responsiveData: { b2: { left: { type: "string", value: "538dp" } }, b3: { height: { type: "string", value: "60dp" }, left: { type: "string", value: "" }, right: { type: "string", value: "7dp" }, top: { type: "string", value: "20dp" }, width: { type: "string", value: "20%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxrow5: { DNDConfig: null, _height_: { type: "string", value: "120dp" }, _left_: { type: "string", value: "48dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sabf41c246f145d483705b980f1c328d", _top_: { type: "string", value: "36dp" }, _width_: { type: "string", value: "90.80%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblSentence", "lblSentence2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxrow5", info: null, iscustomlayout: false, isvisible: true, kuid: "e9cdaec62dd24d1ba2358f9ba17ae366", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetailsbg", pf: "frmIdentitydocuments", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "80dp" }, left: { type: "string", value: "48dp" }, top: { type: "string", value: "36dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTextbg: { DNDConfig: null, _height_: { type: "string", value: "120dp" }, _left_: { type: "string", value: "300dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sd1b928a8d104f599eea8198c477c518", _top_: { type: "string", value: "10dp" }, _width_: { type: "string", value: "62%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblProve", "lblTxt2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTextbg", info: null, iscustomlayout: false, isvisible: true, kuid: "j2c0be7f29fa4b6eb90ce3656885b537", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBg", pf: "frmIdentitydocuments", responsiveData: { b2: { left: { type: "string", value: "150dp" } }, b3: { centerX: { type: "string", value: "39.53%" }, left: { type: "string", value: "10dp" }, top: { type: "string", value: "10dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTxt: { DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "150dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s118a4ccff5b438b947010d95353c0e8", _top_: { type: "string", value: "40dp" }, _width_: { type: "string", value: "46.69%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, children: ["lblPassportphoto", "lblpassportfront"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTxt", info: null, iscustomlayout: false, isvisible: true, kuid: "b8cde37c4a364f4eac29a488d9650742", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDtlrow2", pf: "frmIdentitydocuments", responsiveData: { b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "15%" }, top: { type: "string", value: "20dp" }, width: { type: "string", value: "40%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTxtbg2: { DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "150dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "number", value: "" }, _skin_: "s118a4ccff5b438b947010d95353c0e8", _top_: { type: "string", value: "40dp" }, _width_: { type: "string", value: "46.69%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblPassportsignaturepage", "lblpassportback"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTxtbg2", info: null, iscustomlayout: false, isvisible: true, kuid: "g92ac7cc47f44f96a8ae78d24a3b8fac", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDtlrow3", pf: "frmIdentitydocuments", responsiveData: { b3: { left: { type: "string", value: "15%" }, right: { type: "string", value: "5dp" }, top: { type: "string", value: "20dp" }, width: { type: "string", value: "40%" }, zIndex: 1 } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxTxtbg3: { DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "150dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s4240a3b511d4946ad719ee3edaacad5", _top_: { type: "string", value: "40dp" }, _width_: { type: "string", value: "46%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblSelfie", "lblNotuploaded"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxTxtbg3", info: null, iscustomlayout: false, isvisible: true, kuid: "b6190316ca4344aaa96ee4666628ecf5", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDtlrow4", pf: "frmIdentitydocuments", responsiveData: { b3: { left: { type: "string", value: "15%" }, top: { type: "string", value: "20dp" }, width: { type: "string", value: "40%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxupload: { DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "548dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "number", value: "" }, _skin_: "s5b2a204415149148873029d59dea60d", _top_: { type: "string", value: "40dp" }, _width_: { type: "string", value: "24.90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["btnUpload"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxupload", info: null, iscustomlayout: false, isvisible: true, kuid: "bbd4b30756244bc2b860b35415216220", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDtlrow4", pf: "frmIdentitydocuments", responsiveData: { b2: { left: { type: "string", value: "535dp" } }, b3: { left: { type: "string", value: "" }, right: { type: "string", value: "7dp" }, top: { type: "string", value: "20dp" }, width: { type: "string", value: "20%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, frmIdentity: { "@class": "com.kony.gen.viz.model.container.KVizScrollFlexForm", DNDConfig: null, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "scf0bb0ac9ac406fad753f56963d9262", _title_: null, addWidgetsdone: false, allboxes: [], android: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, androidwearos: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, breakpointInfo: { b1: { width: 1366 }, b2: { width: 1024 }, b3: { width: 640 } }, canUpdateUI: true, canvasWidth: 1200, children: ["flxBg"], containerweight: 100, controllerInfo: { default: { channel: "desktop", fileType: "js", name: "frmIdentityController" } }, currentLocale: "default", desktopweb: { needAppMenu: false }, device: "desktopweb", displayorientation: 1, enabledforidletimeout: false, id: "frmIdentity", info: null, initdone: false, inputaccessoryviewtype: 4, ipad: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iphone: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iscustomlayout: false, isvisible: true, kuid: "ea52c84919eb48f8976a29856fe17070", layouttype: 2, name: "kony.ui.Form2", needappmenu: false, paddinginpixel: false, platform: "desktopweb", prevDevice: "desktopweb", prevPlatform: "desktopweb", retaincontentalignment: false, retainflexpositionproperties: false, retainscrollposition: false, snapgridsize: 10, snaptogrid: true, titleBarSkin: "sb51bcefd50c4c1c959df14dd1d7d808", titlebar: true, type: 3, wType: "Form" }, imgCheck: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _skin_: "s93be810a54d41cb9973782399707034", _src_: "mark.png", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, containerweight: 100, id: "imgCheck", imagescalemode: 0, info: null, iscustomlayout: false, isvisible: true, kuid: "fffe03a742a0453ca55749563a7ec1a3", name: "kony.ui.Image2", parent: "flxImgbg", pf: "frmIdentitydocuments", responsiveData: { b3: {} }, retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, imgTick: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _skin_: "s93be810a54d41cb9973782399707034", _src_: "mark.png", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, containerweight: 100, id: "imgTick", imagescalemode: 0, info: null, iscustomlayout: false, isvisible: true, kuid: "e19c6ffc88e64706b086d8322494d195", name: "kony.ui.Image2", parent: "flxImg2bg", pf: "frmIdentitydocuments", responsiveData: { b3: { left: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, imgUpload: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _skin_: "s93be810a54d41cb9973782399707034", _src_: "upload.png", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, containerweight: 100, id: "imgUpload", imagescalemode: 0, info: null, iscustomlayout: false, isvisible: true, kuid: "e65f4d415e47464eb9d6029da4c181c6", name: "kony.ui.Image2", parent: "flxImg3bg", pf: "frmIdentitydocuments", responsiveData: { b3: { centerX: { type: "string", value: "" }, left: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, lblDocno: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "406dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Document Number", _top_: { type: "string", value: "30dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblDocno", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b67baf8d1cfe4361987737a1d088f678", name: "kony.ui.Label", parent: "flxDtlrow1", pf: "frmIdentitydocuments", responsiveData: { b3: { left: { type: "string", value: "0dp" }, skin: "sc06e2b3aff148b9be475015fcdf8c04", top: { type: "string", value: "5dp" }, width: { type: "string", value: "50%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDoctype: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "1dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Document Type", _top_: { type: "string", value: "30dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblDoctype", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a9205a4190d24ed28fc7583ee3fb2d6b", name: "kony.ui.Label", parent: "flxDtlrow1", pf: "frmIdentitydocuments", responsiveData: { b3: { centerX: { type: "string", value: "" }, left: { type: "string", value: "0dp" }, skin: "sa5fcc76edea40bbaf3be56ff13579f3", top: { type: "string", value: "5dp" }, width: { type: "string", value: "50%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblNotuploaded: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Not uploaded yet", _top_: { type: "string", value: "40dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblNotuploaded", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ee94da52083244faba8ce249b64b1622", name: "kony.ui.Label", parent: "flxTxtbg3", pf: "frmIdentitydocuments", responsiveData: { b3: { skin: "s41059091947477c81244d41c784e404", top: { type: "string", value: "30dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblpassportback: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "passport-back.jpg \xB7 1.8 MB", _top_: { type: "string", value: "40dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblpassportback", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a6b6c597f036441dba9bf83e22c4eb10", name: "kony.ui.Label", parent: "flxTxtbg2", pf: "frmIdentitydocuments", responsiveData: { b3: { skin: "s261d648f81341c8865adda72cdc9782", top: { type: "string", value: "30dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblpassportfront: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "passport-front.jpg \xB7 2.1 MB", _top_: { type: "string", value: "40dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblpassportfront", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "cdc0785f89474fe88bc8bd4082ff9f5b", name: "kony.ui.Label", parent: "flxTxt", pf: "frmIdentitydocuments", responsiveData: { b3: { skin: "s29566873ab34751b1cf4a672b62aa0e", top: { type: "string", value: "30dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblPassportphoto: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s85373afb6664de5adbc35a63f01ae4c", _text_: "Passport \u2014 photo page", _top_: { type: "string", value: "5dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblPassportphoto", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "f5a4b2fd7d6b43bc8bd66bb8692c6639", name: "kony.ui.Label", parent: "flxTxt", pf: "frmIdentitydocuments", responsiveData: { b3: { skin: "sd77ce6491cd46958049efd21d43136f", top: { type: "string", value: "10dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblPassportsignaturepage: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Passport \u2014 signature page", _top_: { type: "string", value: "5dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblPassportsignaturepage", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "f2f336bb4d4942cc814664246f9b81df", name: "kony.ui.Label", parent: "flxTxtbg2", pf: "frmIdentitydocuments", responsiveData: { b3: { skin: "s6552f1b5f4e4822b108fee16af70bb3", top: { type: "string", value: "10dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblProve: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8d9c2cf01cc4e498f512ba6825a14ef", _text_: "Prove your identity", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblProve", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "db4781b34492438dbaf1bb9e6f39efa7", name: "kony.ui.Label", parent: "flxTextbg", pf: "frmIdentitydocuments", responsiveData: { b3: { skin: "s4c961a346f64c7995676ed41df90b12" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSelfie: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Selfie holding your document", _top_: { type: "string", value: "5dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblSelfie", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c0fff4518c0248d7aa660b3f3cb77987", name: "kony.ui.Label", parent: "flxTxtbg3", pf: "frmIdentitydocuments", responsiveData: { b3: { skin: "sf583800d70a47b6b31a5caf9827d0a2", text: "Selfie with document", top: { type: "string", value: "10dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSentence: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "2dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s710cc0ac4c943b5b2377aa825f61a0b", _text_: "Your documents are encrypted and used only to verify your identity. We never", _top_: { type: "string", value: "26dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblSentence", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d87b548ccfb94336aa1e3cf381248efd", name: "kony.ui.Label", parent: "flxrow5", pf: "frmIdentitydocuments", responsiveData: { b2: { text: "Your documents are encrypted and used only to verify your identity." }, b3: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "30dp" }, skin: "sb29af0dcae04e1fa8b02a44cc52f4bb", text: "Encrypted and used only to verify your identity." } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSentence2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "2dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s79a227f3c624166a5c1b2d87c1c2cca", _text_: "share them with third parties.", _top_: { type: "string", value: "58dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblSentence2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d234c0e32a2c4e3aab34c9fb4866af43", name: "kony.ui.Label", parent: "flxrow5", pf: "frmIdentitydocuments", responsiveData: { b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTxt2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Photos must show all four corners, with no glare. JPG or PNG, up to 10 MB each.", _top_: { type: "string", value: "60dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblTxt2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "fac546fbc3fd498a9665ed92a7b3562d", name: "kony.ui.Label", parent: "flxTextbg", pf: "frmIdentitydocuments", responsiveData: { b2: { text: "Photos must show all four corners, with no glare. " }, b3: { skin: "s29d9d3cf0414569b5ea1b9c0e002295", text: "Show all four corners, Up to 10 MB each.", top: { type: "string", value: "50dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lbxPassport: { "@class": "com.kony.gen.viz.model.component.KVizListBox", DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "1dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "Please Select", _skin_: "sb567beab904487c9f413d5c78c3c6ae", _top_: { type: "string", value: "75dp" }, _width_: { type: "string", value: "45%" }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, dropdownimage: "listboxarw.png", focusskin: "sae23eeb48874d9a83df5c77e65d3d79", groupcells: false, id: "lbxPassport", info: null, iscustomlayout: false, isvisible: true, kuid: "h85052ba13f743c690dbbecc3997c76b", masterdata: [["lb1", "Passport"], ["lb2", "Driving Licence"], ["lb3", "National ID"]], name: "kony.ui.ListBox", parent: "flxDtlrow1", pf: "frmIdentitydocuments", responsiveData: { b1: { skin: "s8e09073a92047c7b5eb2f084105c084", top: { type: "string", value: "75dp" } }, b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "5dp" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, selectedkeys: null, selectedkeyvalue: null, selectedkeyvalues: null, size: 18, viewconfig: { toggleViewConfig: { viewStyle: 0 } }, viewtype: 0, wType: "ListBox", zindex: 1 }, SignIn: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "83.33%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, autogrowmode: 0, canUpdateUI: true, clipbounds: false, containerweight: 0, dataDiffs: { SignIn: { __events__: {}, __info__: { isRoot: true, kuid: "d5330da93d944e859b525dd641eba84c", srcKUID: "c129c7e95f7142d98c81ad7be7b823f0", wType: "FlexContainer" }, autogrowMode: { Default: 0 }, height: { Default: { type: "string", value: "83.33%" } }, left: { Default: { type: "string", value: "0dp" } }, top: { Default: { type: "string", value: "0dp" } } }, flxContent: { __events__: {}, __info__: { kuid: "f4f68e35c10a4575807c0dd79ae9c718", srcKUID: "jdda855979e949fbbef74672235a7f8c", wType: "FlexContainer" }, left: { Default: { type: "string", value: "50dp" } }, responsiveData: { b2: { top: { type: "string", value: "0dp" }, width: { type: "string", value: "91.24%" } } }, top: { Default: { type: "string", value: "0dp" } }, width: { Default: { type: "string", value: "91.24%" } } }, flxMain: { __events__: {}, __info__: { kuid: "ib874bf3110f48668ffbec7aa33f5861", srcKUID: "h9cced33074e4362a0a9829bd42de4a9", wType: "FlexContainer" }, autogrowMode: { Default: 0 }, height: { Default: { type: "string", value: "120dp" } } }, lblAlhaveAcc: { __events__: {}, __info__: { kuid: "f1c14933c9b842a19268ee422c67ad56", srcKUID: "b4b220dbb56b491182f402edc7be59f0", wType: "Label" }, centerY: { Default: { type: "string", value: "50%" } }, left: { Default: { type: "string", value: "900dp" } }, responsiveData: { b2: { centerY: { type: "string", value: "50.00%" }, left: { type: "string", value: "520dp" }, top: { type: "string", value: "20dp" } } }, top: { Default: { type: "number", value: "" } } }, lblAvenza: { __events__: {}, __info__: { kuid: "e70891302477416b8d777ce6fe90034e", srcKUID: "b216320e87be4df5ba2303d14015b462", wType: "Label" }, responsiveData: { b2: { top: { type: "string", value: "10dp" } } }, top: { Default: { type: "number", value: "" } } }, lblBank: { __events__: {}, __info__: { kuid: "f8a5f3b60cbc4dd08bab37010f7be5aa", srcKUID: "fa53cb5735634b4cab7570d45ade092b", wType: "Label" }, responsiveData: { b2: { top: { type: "string", value: "10dp" } } }, top: { Default: { type: "number", value: "" } } }, lblSIgnIn: { __events__: {}, __info__: { kuid: "g1ec14c762a54d6a858020ba880491c6", srcKUID: "debcca8c373841d685bfa6afc5fb108e", wType: "Label" }, centerY: { Default: { type: "string", value: "50%" } }, left: { Default: { type: "string", value: "1140dp" } }, responsiveData: { b2: { centerY: { type: "string", value: "47.78%" }, left: { type: "string", value: "760dp" }, top: { type: "string", value: "20dp" } } }, top: { Default: { type: "number", value: "" } } } }, enablescrolling: true, id: "SignIn", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "d5330da93d944e859b525dd641eba84c", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxHeader1", pf: "frmIdentitydocuments", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "c129c7e95f7142d98c81ad7be7b823f0", wType: "UserWidgetInstance", zindex: 1 }, tbxDocno: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "70dp" }, _left_: { type: "string", value: "400dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "", _skin_: "s3e1fb26299e427299060cb91085ad65", _text_: "", _top_: { type: "string", value: "75dp" }, _width_: { type: "string", value: "45%" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s595285064c045fcbfbe43f9c8971b96", id: "tbxDocno", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "b2229ae449d04a1caed67c48d1efc712", mode: "A", name: "kony.ui.TextBox2", parent: "flxDtlrow1", pf: "frmIdentitydocuments", placeholderskin: "seb7ade005c04622a6730983f00a34fe", responsiveData: { b1: { placeholder: "", text: "" }, b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "5dp" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 } };

  // saywright/vision/apps/avenzabank/src/controllers/frmIdentityController.kjs
  var frmIdentityController_default = "define({ \r\n\r\n //Type your controller code here \r\n\r\n });";

  // saywright/vision/apps/avenzabank/src/controllers/frmIdentityControllerActions.kjs
  var frmIdentityControllerActions_default = "define({});\n";

  // saywright/vision/apps/avenzabank/src/forms/FrmLogin.jsx
  var import_react7 = __toESM(require_react(), 1);
  var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
  function FrmLogin({ parentLayout }) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Flex, { id: "flxMain", parentLayout, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Flex, { id: "flxLeftPannel", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Flex, { id: "flxHeader", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblAvenza" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblBank" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Flex, { id: "flxSidecontent", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblBanking" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblInfo1" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Flex, { id: "flxFooter", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblFDIC" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Flex, { id: "flxRight", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Flex, { id: "flxCentre", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Flex, { id: "flxSignIn", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblSignin" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblSingninInfo" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Flex, { id: "flxCredentails", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblUserId" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(TextField, { id: "tbxUserId" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblPassword" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(TextField, { id: "tbxPassword" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblForgetPass" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Flex, { id: "flxRem" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblSignInfo" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Button, { id: "btnSignIn" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Flex, { id: "flxOpenNwAcc", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblNewtoBank" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Label, { id: "lblOpenAcc" })
          ] })
        ] })
      ] }) })
    ] }) });
  }

  // saywright/vision/apps/avenzabank/src/forms/frmLogin.widgets.json
  var frmLogin_widgets_default = { btnSignIn: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "s100c6d0bc2f41a0b209a9e7a947df0d", _text_: "Sign In ", _top_: { type: "string", value: "310dp" }, _width_: { type: "string", value: "480dp" }, canUpdateUI: true, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "s48281d315f04a599f1dddee5db55c69", id: "btnSignIn", info: null, iscustomlayout: false, isvisible: true, kuid: "c9a0a7b9d8fa4a1b8e7fa01def1ce982", name: "kony.ui.Button", parent: "flxCredentails", pf: "frmLogin", responsiveData: { b3: { width: { type: "string", value: "94%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, flxCentre: { DNDConfig: null, _height_: { type: "string", value: "600dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8e1bf97b36c425ba35106913974a1a1", _width_: { type: "string", value: "66.59%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, children: ["flxSignIn", "flxCredentails"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCentre", info: null, iscustomlayout: false, isvisible: true, kuid: "j5cc7c2c142641478d4bac1371d50f96", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxRight", pf: "frmLogin", responsiveData: { b2: { width: { type: "string", value: "78%" } }, b3: { height: { type: "string", value: "75%" }, width: { type: "string", value: "83%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCredentails: { DNDConfig: null, _bottom_: { type: "string", value: "0dp" }, _height_: { type: "string", value: "510dp" }, _left_: { type: "string", value: "20dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _width_: { type: "string", value: "96.60%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblUserId", "tbxUserId", "lblPassword", "tbxPassword", "lblForgetPass", "flxRem", "lblSignInfo", "btnSignIn", "flxOpenNwAcc"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCredentails", info: null, iscustomlayout: false, isvisible: true, kuid: "e730a7106b73409ca025a6d51fec916d", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCentre", pf: "frmLogin", responsiveData: { b2: { centerX: { type: "string", value: "50%" }, height: { type: "ref", value: "preferred" }, width: { type: "string", value: "96%" } }, b3: { bottom: { type: "string", value: "-390%" }, height: { type: "string", value: "80.00%" }, width: { type: "string", value: "96%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxFooter: { DNDConfig: null, _bottom_: { type: "string", value: "25dp" }, _height_: { type: "string", value: "10%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "84.03%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "48%" }, children: ["lblFDIC"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxFooter", info: null, iscustomlayout: false, isvisible: true, kuid: "fcf477dfc63f434ab95e73c38cdfafd4", layouttype: 3, name: "kony.ui.FlexContainer", parent: "flxLeftPannel", pf: "frmLogin", responsiveData: { b2: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "40%" }, height: { type: "ref", value: "preferred" }, top: { type: "string", value: "200dp" }, width: { type: "string", value: "70%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHeader: { DNDConfig: null, _height_: { type: "string", value: "120dp" }, _left_: { type: "string", value: "" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "number", value: "" }, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "81%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblAvenza", "lblBank"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHeader", info: null, iscustomlayout: false, isvisible: true, kuid: "ff2dd925c4114b4fb44217cc7db88b4e", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxLeftPannel", pf: "frmLogin", responsiveData: { b2: { height: { type: "ref", value: "preferred" }, right: { type: "string", value: "0" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLeftPannel: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s5c170c435234db1acd96030e665a24d", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "35%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxHeader", "flxSidecontent", "flxFooter"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLeftPannel", info: null, iscustomlayout: false, isvisible: true, kuid: "eb0f6c6837834f4491d1a607de6a6cb9", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "frmLogin", responsiveData: { b1: {}, b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxMain: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxLeftPannel", "flxRight"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxMain", info: null, iscustomlayout: false, isvisible: true, kuid: "b1c48708e7104f888ca3de6967144250", layouttype: 2, name: "kony.ui.FlexContainer", parent: "frmLogin", pf: "frmLogin", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxOpenNwAcc: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "440dp" }, _width_: { type: "string", value: "84.22%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblNewtoBank", "lblOpenAcc"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxOpenNwAcc", info: null, iscustomlayout: false, isvisible: true, kuid: "hd9d880cfd33443cb07a8a7287b4f2fe", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCredentails", pf: "frmLogin", responsiveData: { b2: { centerX: { type: "string", value: "50%" }, height: { type: "ref", value: "preferred" }, width: { type: "string", value: "85%" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "18.52%" }, top: { type: "string", value: "434dp" }, width: { type: "string", value: "95.79%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRem: { DNDConfig: null, _height_: { type: "string", value: "25dp" }, _left_: { type: "string", value: "5dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sf13a3d3d4cb4937a6752a1aacaf7351", _top_: { type: "string", value: "250dp" }, _width_: { type: "string", value: "25dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRem", info: null, iscustomlayout: false, isvisible: true, kuid: "b04216a4baee444a80e31a22f3632d96", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCredentails", pf: "frmLogin", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRight: { DNDConfig: null, _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "35%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s8e1bf97b36c425ba35106913974a1a1", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "65%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxCentre"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRight", info: null, iscustomlayout: false, isvisible: true, kuid: "cf2982da707e4886acc71ed96bc9a04b", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxMain", pf: "frmLogin", responsiveData: { b3: { left: { type: "string", value: "0.00%" }, width: { type: "string", value: "100.00%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxSidecontent: { DNDConfig: null, _height_: { type: "string", value: "290dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "70dp" }, _width_: { type: "string", value: "87%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblBanking", "lblInfo1"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxSidecontent", info: null, iscustomlayout: false, isvisible: true, kuid: "d3f7efbce0a34419b343192cbfca00fd", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxLeftPannel", pf: "frmLogin", responsiveData: { b1: { centerX: { type: "string", value: "50.00%" }, left: { type: "string", value: "" }, top: { type: "string", value: "70dp" } }, b2: { height: { type: "ref", value: "preferred" }, layoutType: 4 } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxSignIn: { DNDConfig: null, _height_: { type: "string", value: "120dp" }, _left_: { type: "string", value: "20dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "77.96%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblSignin", "lblSingninInfo"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxSignIn", info: null, iscustomlayout: false, isvisible: true, kuid: "bbdfe890885546c2a6dcc6a7a97a7d17", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCentre", pf: "frmLogin", responsiveData: { b2: { centerX: { type: "string", value: "" }, left: { type: "string", value: "10dp" }, width: { type: "string", value: "77%" } }, b3: { centerX: { type: "string", value: "42%" }, height: { type: "string", value: "20%" }, width: { type: "string", value: "77%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, frmLogin: { "@class": "com.kony.gen.viz.model.container.KVizScrollFlexForm", DNDConfig: null, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _pxMenuIndex: [2, 1, 2], _skin_: "s111a6562bb14b75a75fdca19f43bdef", _title_: null, addWidgetsdone: false, allboxes: [], android: { needAppMenu: false, psp: { windowSoftInputMode: 2 } }, androidwearos: { needAppMenu: false }, breakpointInfo: { b1: { width: 1366 }, b2: { width: 1024 }, b3: { width: 640 } }, canUpdateUI: true, canvasWidth: 1200, children: ["flxMain"], containerweight: 100, controllerInfo: { default: { channel: "desktop", fileType: "js", name: "frmLoginController" } }, currentBreakpoint: { kuid: "b1", width: 1366 }, currentLocale: "default", desktopweb: { needAppMenu: false }, device: "desktopweb", displayorientation: 1, enabledforidletimeout: false, id: "frmLogin", info: null, initdone: false, inputaccessoryviewtype: 4, ipad: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iphone: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iscustomlayout: false, isvisible: true, kuid: "f78e1174728742fca055f5b750c8b220", layouttype: 2, name: "kony.ui.Form2", needappmenu: false, paddinginpixel: false, platform: "desktopweb", prevDevice: "desktopweb", prevPlatform: "desktopweb", retaincontentalignment: false, retainflexpositionproperties: false, retainscrollposition: false, snapgridsize: 10, snaptogrid: true, titleBarSkin: "s4b4260b19914c8f8e835ebe11946743", titlebar: true, type: 3, vizProps: { globalRespDesignEnabled: true }, wType: "Form" }, lblAvenza: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "30dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s86bd078fcf54f3f98d5f5fdcc67a1b1", _text_: "Avenza", _top_: { type: "string", value: "50dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblAvenza", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a125a1be92904aa3b961f4bb97923d38", name: "kony.ui.Label", parent: "flxHeader", pf: "frmLogin", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblBank: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "138dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sef21956edcb4c7ca51ad843a3027ac3", _text_: "Bank", _top_: { type: "string", value: "50dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblBank", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c2f9e85f656e4fdd8231c204a9dca968", name: "kony.ui.Label", parent: "flxHeader", pf: "frmLogin", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblBanking: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "40dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s5d88cdd8e204be58a71bf756b8615b5", _text_: "Banking that stays out of your way.", _top_: { type: "string", value: "0" }, _width_: { type: "string", value: "60%" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblBanking", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "je0342e512c04e6992fff41fbff8e45c", name: "kony.ui.Label", parent: "flxSidecontent", pf: "frmLogin", responsiveData: { b1: { width: { type: "string", value: "81.63%" } }, b2: { top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblFDIC: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "40dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sbc0ea51a52643f5a14bf841f8276c29", _text_: "FDIC insured   24/7 support    v2.4.0", _top_: { type: "string", value: "17dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50.00%" }, containerweight: 100, contentalignment: 4, id: "lblFDIC", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ec4d479d172a4e4e81d850c2160c73d0", minheight: { type: "string", value: "" }, name: "kony.ui.Label", parent: "flxFooter", pf: "frmLogin", responsiveData: { b1: { centerX: { type: "string", value: "45%" }, desktopweb: {}, left: { type: "string", value: "30dp" }, minHeight: { type: "string", value: "" }, top: { type: "string", value: "17dp" } }, b2: { skin: "s85047d0cf3b4d749401bac3d36439f8", top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblForgetPass: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "335dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "0dp" }, _skin_: "sf89769263494ed1953e1b3660e9c51f", _text_: "Forget password?", _top_: { type: "string", value: "137dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblForgetPass", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "aa3a5b48cc7449b99411861c7a7e1893", name: "kony.ui.Label", parent: "flxCredentails", pf: "frmLogin", responsiveData: { b2: { contentAlignment: 6, left: { type: "string", value: "" }, right: { type: "string", value: "10dp" }, skin: "s30c5c4c47054a7cb0fda259da242e03", width: { type: "string", value: "200px" } }, b3: { centerY: { type: "string", value: "" }, contentAlignment: 4, height: { type: "string", value: "10.84%" }, left: { type: "string", value: "" }, right: { type: "string", value: "5dp" }, skin: "s2b16e05d5a942c5b8d10ff856b3db19", top: { type: "string", value: "118dp" }, width: { type: "string", value: "30%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblInfo1: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "84dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Accounts, transfers and statements in one place. Secured with 256-bit encryption.", _top_: { type: "string", value: "200dp" }, _width_: { type: "string", value: "76.19%" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblInfo1", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "h3510fad491a40b19a3fcac0a29682b9", minwidth: { type: "string", value: "50%" }, name: "kony.ui.Label", parent: "flxSidecontent", pf: "frmLogin", responsiveData: { b1: { left: { type: "string", value: "38dp" }, width: { type: "string", value: "81.72%" } }, b2: { centerX: { type: "string", value: "50%" }, height: { type: "ref", value: "preferred" }, skin: "s90adfbdffd8468f8ffaf61aee70495b", top: { type: "string", value: "20dp" }, width: { type: "string", value: "58%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblNewtoBank: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "80dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sa27ad141bcf4dddbf9335594f452b79", _text_: "New to Avenza Bank?", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblNewtoBank", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d45c1d0e815c470594df3de2c9976f36", minwidth: { type: "number", value: "" }, name: "kony.ui.Label", parent: "flxOpenNwAcc", pf: "frmLogin", responsiveData: { b2: { skin: "s0ed6f3615aa440b958fb37fd4564df0" }, b3: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "40dp" }, minWidth: { type: "string", value: "" }, skin: "s358c3e83c90414ca9d857f87dc1a7c1", width: { type: "string", value: "35%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblOpenAcc: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "260dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "30dp" }, _skin_: "sf89769263494ed1953e1b3660e9c51f", _text_: "Open an account", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblOpenAcc", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "j3c144b196c94f308b5fefb5b45f8eb5", name: "kony.ui.Label", parent: "flxOpenNwAcc", pf: "frmLogin", responsiveData: { b2: { left: { type: "string", value: "275dp" }, skin: "s4efa5e3feb349ddb2a3d247369eadbd" }, b3: { centerX: { type: "string", value: "47.31%" }, left: { type: "string", value: "" }, right: { type: "string", value: "120dp" }, skin: "s275f04fb97d4567ae3890514dfea268", top: { type: "string", value: "60dp" }, width: { type: "string", value: "30%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblPassword: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s9ec0f34ba8348f0a2a60728db730c88", _text_: "Password", _top_: { type: "string", value: "137dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblPassword", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b45136e6c5694fada163c60bed7779fc", name: "kony.ui.Label", parent: "flxCredentails", pf: "frmLogin", responsiveData: { b3: { centerX: { type: "string", value: "25.51%" }, left: { type: "string", value: "0dp" }, skin: "s9ec0f34ba8348f0a2a60728db730c88", top: { type: "string", value: "137dp" }, width: { type: "string", value: "50%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSignin: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s64e265351554e188fe6bb106e5c7dcd", _text_: "Sign in", _top_: { type: "string", value: "38dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblSignin", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "cc787e551f6a419596886ba43a10a48f", name: "kony.ui.Label", parent: "flxSignIn", pf: "frmLogin", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSignInfo: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "40dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sa27ad141bcf4dddbf9335594f452b79", _text_: "Keep me signed in on this device", _top_: { type: "string", value: "252dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblSignInfo", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ha383bee88f94ebbb5ed593a26a920e8", name: "kony.ui.Label", parent: "flxCredentails", pf: "frmLogin", responsiveData: { b3: { centerX: { type: "string", value: "" }, left: { type: "string", value: "45dp" }, skin: "s8d4bfcdbb1a4329bf42006fee738d39", top: { type: "string", value: "253dp" }, width: { type: "string", value: "55%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSingninInfo: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Use the credentials issued by your branch.", _top_: { type: "string", value: "95dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblSingninInfo", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "f3980f6923234ec2b41496a64510bd5c", name: "kony.ui.Label", parent: "flxSignIn", pf: "frmLogin", responsiveData: { b3: { skin: "s2e7e52ab85b401da8f763a5dae29ce1" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblUserId: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s9ec0f34ba8348f0a2a60728db730c88", _text_: "User Id ", _top_: { type: "string", value: "14dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblUserId", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "h6a6c29fd04140c1bc33c7c13b4b0e3a", name: "kony.ui.Label", parent: "flxCredentails", pf: "frmLogin", responsiveData: { b1: { text: "User Id " }, b3: { centerX: { type: "string", value: "" }, left: { type: "string", value: "5dp" }, skin: "s9ec0f34ba8348f0a2a60728db730c88", width: { type: "string", value: "30%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, tbxPassword: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "Enter your password", _skin_: "s41dbe57b349473688cbf49b846cd507", _text_: "", _top_: { type: "string", value: "170dp" }, _width_: { type: "string", value: "480dp" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s5d61ada02bd49779428c24529288a8c", id: "tbxPassword", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "f2e4732061f34e2eaf5a1d80c96707f1", mode: "A", name: "kony.ui.TextBox2", parent: "flxCredentails", pf: "frmLogin", placeholderskin: "s015dba0ba8c42e9aa1798249ea3fc39", responsiveData: { b3: { width: { type: "string", value: "94%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 }, tbxUserId: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "Enter user id", _skin_: "s41dbe57b349473688cbf49b846cd507", _text_: "", _top_: { type: "string", value: "45dp" }, _width_: { type: "string", value: "480dp" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s5d61ada02bd49779428c24529288a8c", id: "tbxUserId", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "a6bdf0f02f8b4a858a160d904a38af9b", mode: "A", name: "kony.ui.TextBox2", parent: "flxCredentails", pf: "frmLogin", placeholderskin: "s015dba0ba8c42e9aa1798249ea3fc39", responsiveData: { b3: { width: { type: "string", value: "94%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 } };

  // saywright/vision/apps/avenzabank/src/controllers/frmLoginController.kjs
  var frmLoginController_default = "define({ \r\n\r\n //Type your controller code here \r\n\r\n });";

  // saywright/vision/apps/avenzabank/src/controllers/frmLoginControllerActions.kjs
  var frmLoginControllerActions_default = "define({});\n";

  // saywright/vision/apps/avenzabank/src/forms/FrmOpenAccount.jsx
  var import_react8 = __toESM(require_react(), 1);
  var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
  function FrmOpenAccount({ parentLayout }) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxParent", parentLayout, children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Flex, { id: "flxHeader", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Component2, { id: "SignInHeader" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxFlow", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Component2, { id: "completionflow" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Flex, { id: "flxArrow", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Image, { id: "imgArrow" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxContent", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblOpenAccount" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblDes" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblWhichAccount" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxSavingsAccount", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Flex, { id: "flxRadioIcon3", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Flex, { id: "flxGreen" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxSavingsAcct", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblSavings" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblSent3" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lbl325pa" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxCurrentAccount", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Flex, { id: "flxRadioIcon" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxCurrent", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblCurrentAccount" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblSent1" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblNointerest" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxSalaryAccount", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Flex, { id: "flxRadioIcon2" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxSalay", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblSalAcct" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblSent2" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lbl3pa" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblCountry" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ListBox, { id: "lbxCountry" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxInfo", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "flxHave" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxInfo1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Flex, { id: "flxImage", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Image, { id: "imgTick" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblGov" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxInfo2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Flex, { id: "flxImg", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Image, { id: "imgTick2" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblTax" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Flex, { id: "flxInfo3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Flex, { id: "flxIcon", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Image, { id: "imgTick3" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Label, { id: "lblMobile" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Button, { id: "btnGetStarted" })
      ] })
    ] }) });
  }

  // saywright/vision/apps/avenzabank/src/forms/frmOpenAccount.widgets.json
  var frmOpenAccount_widgets_default = { btnGetStarted: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "s100c6d0bc2f41a0b209a9e7a947df0d", _text_: "Get Started", _top_: { type: "string", value: "3%" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sebb8da9cae845b7937327af2fecec1c", id: "btnGetStarted", info: null, iscustomlayout: false, isvisible: true, kuid: "d54a830a1d9a48fda67b4a87c1345521", name: "kony.ui.Button", parent: "flxContent", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, completionflow: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, autogrowmode: 0, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, clipbounds: false, containerweight: 0, dataDiffs: { completionflow: { __events__: {}, __info__: { isRoot: true, kuid: "g91e0e7412934bd8ba887507881ef889", srcKUID: "d6ae2c099d524b24a0fc75babc109d85", wType: "FlexContainer" }, centerX: { Default: { type: "number", value: "" } }, centerY: { Default: { type: "number", value: "" } }, responsiveData: { b1: { centerX: { type: "string", value: "50%" }, centerY: { type: "string", value: "50%" } } } }, flxFlow: { __events__: {}, __info__: { kuid: "dff3237a4dc3452cad5f8d54309d8f13", srcKUID: "e91ed7e30c4542c184a66e5b37651a03", wType: "FlexContainer" }, height: { Default: { type: "string", value: "80dp" } }, left: { Default: { type: "string", value: "0dp" } }, responsiveData: { b1: {}, b3: {} }, top: { Default: { type: "string", value: "0dp" } } }, flxGreenFlow: { __events__: {}, __info__: { kuid: "e3c68d7a94c94b549654b0e797cdf6dc", srcKUID: "he9b732ee28f4829b4365555309addce", wType: "FlexContainer" } }, flxTitle: { __events__: {}, __info__: { kuid: "b4107ace698f40af9378f474b1e0a004", srcKUID: "e87bca20a54b4e189b2cfabaaea8fda6", wType: "FlexContainer" }, centerX: { Default: { type: "string", value: "50.02%" } }, responsiveData: { b1: { centerX: { type: "string", value: "50%" }, width: { type: "string", value: "70%" } }, b2: { centerX: { type: "string", value: "50%" }, width: { type: "string", value: "75%" } }, b3: { centerX: { type: "string", value: "50%" }, width: { type: "string", value: "80%" } } }, width: { Default: { type: "string", value: "45%" } } }, flxTraxck: { __events__: {}, __info__: { kuid: "a936a2ced485454c85ae6c92f7ad6a1b", srcKUID: "a96c019dac4a4ffc8b62de635f4164b1", wType: "FlexContainer" }, autogrowMode: { Default: 0 }, bottom: { Default: { type: "number", value: "" } }, centerX: { Default: { type: "number", value: "" } }, centerY: { Default: { type: "number", value: "" } }, height: { Default: { type: "string", value: "6dp" } }, responsiveData: { b1: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "6dp" }, right: { type: "string", value: "200dp" }, width: { type: "string", value: "70%" } }, b2: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "6dp" }, right: { type: "string", value: "110dp" }, width: { type: "string", value: "75%" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "6dp" }, right: { type: "string", value: "20dp" }, top: { type: "string", value: "70%" }, width: { type: "string", value: "80%" } } }, right: { Default: { type: "string", value: "415dp" } }, top: { Default: { type: "string", value: "44dp" } }, width: { Default: { type: "string", value: "45.39%" } } }, lblGettingStared: { __events__: {}, __info__: { kuid: "ac0cc7be401f487eb32dc40d3782548a", srcKUID: "ifdbf0fb686c4e6381d9135d68dc4ea7", wType: "Label" }, bottom: { Default: { type: "number", value: "" } }, centerY: { Default: { type: "number", value: "" } }, left: { Default: { type: "string", value: "330dp" } }, responsiveData: { b1: { left: { type: "string", value: "0%" }, top: { type: "string", value: "0dp" } }, b2: { bottom: { type: "string", value: "0" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "" } }, b3: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "" } } }, top: { Default: { type: "string", value: "15dp" } } }, lblStep: { __events__: {}, __info__: { kuid: "j9408138845e4cb6a60c3461e3cf2390", srcKUID: "d802b7d236f4410196c6a9711d985fb7", wType: "Label" }, bottom: { Default: { type: "number", value: "" } }, centerY: { Default: { type: "number", value: "" } }, left: { Default: { type: "string", value: "855dp" } }, responsiveData: { b1: { left: { type: "string", value: "" }, right: { type: "string", value: "0%" }, top: { type: "string", value: "0dp" } }, b2: { bottom: { type: "string", value: "0" }, left: { type: "string", value: "" }, right: { type: "string", value: "0%" }, top: { type: "string", value: "" } }, b3: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "0%" }, text: "1 to 7", top: { type: "string", value: "" } } }, right: { Default: { type: "number", value: "" } }, text: "Step 1 to 7", top: { Default: { type: "string", value: "15dp" } } } }, enablescrolling: true, id: "completionflow", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "g91e0e7412934bd8ba887507881ef889", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxFlow", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "d6ae2c099d524b24a0fc75babc109d85", wType: "UserWidgetInstance", zindex: 1 }, flxArrow: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "23dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "12dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["imgArrow"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxArrow", info: null, iscustomlayout: false, isvisible: true, kuid: "d23b36795d4941f58e74b705b75be27a", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxFlow", pf: "frmOpenAccount", responsiveData: { b1: { isVisible: false }, b2: { isVisible: false }, b3: { centerX: { type: "string", value: "" }, height: { type: "string", value: "20dp" }, left: { type: "string", value: "3%" }, top: { type: "string", value: "19%" }, width: { type: "string", value: "20dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxContent: { DNDConfig: null, _height_: { type: "string", value: "1190px" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "161dp" }, _width_: { type: "string", value: "70.00%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblOpenAccount", "lblDes", "lblWhichAccount", "flxSavingsAccount", "flxCurrentAccount", "flxSalaryAccount", "lblCountry", "lbxCountry", "flxInfo", "btnGetStarted"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxContent", info: null, iscustomlayout: false, isvisible: true, kuid: "e17740d3be9442918c2b31e59d952d14", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmOpenAccount", responsiveData: { b2: { width: { type: "string", value: "77%" } }, b3: { centerX: { type: "string", value: "50%" }, top: { type: "string", value: "80dp" }, width: { type: "string", value: "90%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCurrent: { DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "85dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "24%" }, _width_: { type: "string", value: "520dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblCurrentAccount", "lblSent1"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCurrent", info: null, iscustomlayout: false, isvisible: true, kuid: "fbef997da61d4d31b1737f46818f8fe3", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxCurrentAccount", pf: "frmOpenAccount", responsiveData: { b2: { left: { type: "string", value: "70dp" } }, b3: { left: { type: "string", value: "60dp" }, width: { type: "ref", value: "preferred" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCurrentAccount: { DNDConfig: null, _height_: { type: "string", value: "110dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s01debcdc3e04d3b88e4597f0ae2e20c", _top_: { type: "string", value: "2%" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxRadioIcon", "flxCurrent", "lblNointerest"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCurrentAccount", info: null, iscustomlayout: false, isvisible: true, kuid: "b6181e47f8b0460092aba6f33e471d13", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxContent", pf: "frmOpenAccount", responsiveData: { b2: { width: { type: "ref", value: "preferred" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "110dp" }, width: { type: "ref", value: "preferred" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxFlow: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s019fa5a22174c24aad3a7a51091d1e1", _top_: { type: "string", value: "80dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["completionflow", "flxArrow"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxFlow", info: null, iscustomlayout: false, isvisible: true, kuid: "h1d4abb67f1b4299b82fd2023e6609d1", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmOpenAccount", responsiveData: { b3: { top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxGreen: { DNDConfig: null, _height_: { type: "string", value: "12dp" }, _left_: { type: "string", value: "7dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s50fbea34e464acd87fabfb7b2093b1c", _top_: { type: "string", value: "8dp" }, _width_: { type: "string", value: "12dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxGreen", info: null, iscustomlayout: false, isvisible: true, kuid: "gc600c2ace7b4bc69f764549d97357d0", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxRadioIcon3", pf: "frmOpenAccount", responsiveData: { b3: { left: { type: "string", value: "7%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHave: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "35dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Have these ready", _top_: { type: "string", value: "31dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "flxHave", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "f09de697f87c403c9c8ba19a7e6fd446", name: "kony.ui.Label", parent: "flxInfo", pf: "frmOpenAccount", responsiveData: { b2: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c" }, b3: { left: { type: "string", value: "36dp" }, skin: "sa672bb78ac248f5a18a75c81ca5cd5c", top: { type: "string", value: "31dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, flxHeader: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s019fa5a22174c24aad3a7a51091d1e1", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["SignInHeader"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHeader", info: null, iscustomlayout: false, isvisible: true, kuid: "c001af1580c64f71b7cfcd458d63f6b9", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmOpenAccount", responsiveData: { b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxIcon: { DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "50dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "string", value: "50%" }, children: ["imgTick3"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxIcon", info: null, iscustomlayout: false, isvisible: true, kuid: "a2906e237a7143caa2f178d44270952e", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxInfo3", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxImage: { DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "50dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "string", value: "50%" }, children: ["imgTick"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxImage", info: null, iscustomlayout: false, isvisible: true, kuid: "gc664161d6b64c598f95cc41ba2a278c", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxInfo1", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxImg: { DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "50dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "string", value: "50%" }, children: ["imgTick2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxImg", info: null, iscustomlayout: false, isvisible: true, kuid: "eb4bf434127f4cc8addc60e0727f386e", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxInfo2", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxInfo: { DNDConfig: null, _height_: { type: "string", value: "270dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s01debcdc3e04d3b88e4597f0ae2e20c", _top_: { type: "string", value: "3%" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxHave", "flxInfo1", "flxInfo2", "flxInfo3"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxInfo", info: null, iscustomlayout: false, isvisible: true, kuid: "hd8097123d4f43cc9d9899e71d13139d", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxContent", pf: "frmOpenAccount", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "220dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxInfo1: { DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "36dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "70dp" }, _width_: { type: "string", value: "92%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxImage", "lblGov"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxInfo1", info: null, iscustomlayout: false, isvisible: true, kuid: "d3f48030d5c24b7e839c7211d2b0feb1", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxInfo", pf: "frmOpenAccount", responsiveData: { b3: { centerX: { type: "string", value: "49.94%" }, height: { type: "string", value: "42dp" }, left: { type: "string", value: "36dp" }, top: { type: "string", value: "70dp" }, width: { type: "ref", value: "preferred" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxInfo2: { DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "36dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "130dp" }, _width_: { type: "string", value: "92%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50.00%" }, children: ["flxImg", "lblTax"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxInfo2", info: null, iscustomlayout: false, isvisible: true, kuid: "gae9d9ef628c46e8b70ac50e8205734f", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxInfo", pf: "frmOpenAccount", responsiveData: { b3: { centerX: { type: "string", value: "49.95%" }, height: { type: "string", value: "42dp" }, top: { type: "string", value: "112dp" }, width: { type: "ref", value: "preferred" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxInfo3: { DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "36dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "190dp" }, _width_: { type: "string", value: "92%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxIcon", "lblMobile"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxInfo3", info: null, iscustomlayout: false, isvisible: true, kuid: "gb21999c0a04445dad7ad4a81bd1af36", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxInfo", pf: "frmOpenAccount", responsiveData: { b3: { centerX: { type: "string", value: "49.94%" }, height: { type: "string", value: "42dp" }, top: { type: "string", value: "154dp" }, width: { type: "ref", value: "preferred" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxParent: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se590c09220e4e5da7bf6f72d6887a41", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 1, canUpdateUI: true, children: ["flxHeader", "flxFlow", "flxContent"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxParent", info: null, iscustomlayout: false, isvisible: true, kuid: "d999d71a4dd346b086ac68db8b719d8e", layouttype: 2, name: "kony.ui.FlexContainer", parent: "frmOpenAccount", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRadioIcon: { DNDConfig: null, _height_: { type: "string", value: "20dp" }, _left_: { type: "string", value: "4%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s78078be127041069ced8895628e0e61", _top_: { type: "string", value: "25%" }, _width_: { type: "string", value: "20px" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRadioIcon", info: null, iscustomlayout: false, isvisible: true, kuid: "dc8a42c1dec14855aa815ee4e7e9c761", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCurrentAccount", pf: "frmOpenAccount", responsiveData: { b3: { left: { type: "string", value: "5%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRadioIcon2: { DNDConfig: null, _height_: { type: "string", value: "20dp" }, _left_: { type: "string", value: "4%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s78078be127041069ced8895628e0e61", _top_: { type: "string", value: "25%" }, _width_: { type: "string", value: "20px" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRadioIcon2", info: null, iscustomlayout: false, isvisible: true, kuid: "afa680fefcf4452196ad76a3709a7137", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxSalaryAccount", pf: "frmOpenAccount", responsiveData: { b3: { left: { type: "string", value: "5%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxRadioIcon3: { DNDConfig: null, _height_: { type: "string", value: "20dp" }, _left_: { type: "string", value: "4%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s50eb162b81a4e89826c561fec852c20", _top_: { type: "string", value: "25%" }, _width_: { type: "string", value: "20dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxGreen"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxRadioIcon3", info: null, iscustomlayout: false, isvisible: true, kuid: "h8f24a0b504948b3a4f2b6e0c7515a55", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxSavingsAccount", pf: "frmOpenAccount", responsiveData: { b1: { skin: "s0408e2a402741c3926ac70df4f37f2b" }, b2: { skin: "s0408e2a402741c3926ac70df4f37f2b" }, b3: { left: { type: "string", value: "5%" }, skin: "s0408e2a402741c3926ac70df4f37f2b" } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxSalaryAccount: { DNDConfig: null, _height_: { type: "string", value: "110dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s01debcdc3e04d3b88e4597f0ae2e20c", _top_: { type: "string", value: "2%" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxRadioIcon2", "flxSalay", "lbl3pa"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxSalaryAccount", info: null, iscustomlayout: false, isvisible: true, kuid: "e8d4f2b394cf49568cb3db5a61d414a7", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxContent", pf: "frmOpenAccount", responsiveData: { b2: { width: { type: "ref", value: "preferred" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "110dp" }, width: { type: "ref", value: "preferred" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxSalay: { DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "85dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "24%" }, _width_: { type: "string", value: "520dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblSalAcct", "lblSent2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxSalay", info: null, iscustomlayout: false, isvisible: true, kuid: "a4cda7ed35304d6390e2c9941c33c334", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxSalaryAccount", pf: "frmOpenAccount", responsiveData: { b2: { left: { type: "string", value: "70dp" } }, b3: { left: { type: "string", value: "60dp" }, width: { type: "ref", value: "preferred" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxSavingsAccount: { DNDConfig: null, _height_: { type: "string", value: "110dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s0408e2a402741c3926ac70df4f37f2b", _top_: { type: "string", value: "2%" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxRadioIcon3", "flxSavingsAcct", "lbl325pa"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxSavingsAccount", info: null, iscustomlayout: false, isvisible: true, kuid: "dad5d75fd2de45db97d3e656a5233bde", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxContent", pf: "frmOpenAccount", responsiveData: { b2: { width: { type: "ref", value: "preferred" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "110dp" }, width: { type: "ref", value: "preferred" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxSavingsAcct: { DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "string", value: "85dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "24%" }, _width_: { type: "string", value: "520dp" }, allboxes: [], canUpdateUI: true, children: ["lblSavings", "lblSent3"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxSavingsAcct", info: null, iscustomlayout: false, isvisible: true, kuid: "db580e91fc2b4324b154d5afb996b385", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxSavingsAccount", pf: "frmOpenAccount", responsiveData: { b2: { left: { type: "string", value: "70dp" } }, b3: { height: { type: "string", value: "80dp" }, left: { type: "string", value: "60dp" }, top: { type: "string", value: "24%" }, width: { type: "ref", value: "preferred" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, frmOpenAccount: { "@class": "com.kony.gen.viz.model.container.KVizScrollFlexForm", DNDConfig: null, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "scf0bb0ac9ac406fad753f56963d9262", _title_: null, addWidgetsdone: false, allboxes: [], android: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, androidwearos: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, breakpointInfo: { b1: { width: 1366 }, b2: { width: 1024 }, b3: { width: 640 } }, canUpdateUI: true, canvasWidth: 1200, children: ["flxParent"], containerweight: 100, controllerInfo: { default: { channel: "desktop", fileType: "js", name: "frmOpenAccountController" } }, currentBreakpoint: { kuid: "b2", width: 1024 }, currentLocale: "default", desktopweb: { needAppMenu: false }, device: "desktopweb", displayorientation: 1, enabledforidletimeout: false, id: "frmOpenAccount", info: null, initdone: false, inputaccessoryviewtype: 4, ipad: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iphone: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iscustomlayout: false, isvisible: true, kuid: "g01b8432a9c24197ad38537a109a4382", layouttype: 2, name: "kony.ui.Form2", needappmenu: false, paddinginpixel: false, platform: "desktopweb", prevDevice: "desktopweb", prevPlatform: "desktopweb", retaincontentalignment: false, retainflexpositionproperties: false, retainscrollposition: false, snapgridsize: 10, snaptogrid: true, titleBarSkin: "sb51bcefd50c4c1c959df14dd1d7d808", titlebar: true, type: 3, vizProps: { globalRespDesignEnabled: false }, wType: "Form" }, imgArrow: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _height_: { type: "string", value: "150dp" }, _left_: { type: "string", value: "12dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _skin_: "sf28157fa49a40478b0515ee8b63e9c4", _src_: "imagedrag.png", _top_: { type: "string", value: "7dp" }, _width_: { type: "string", value: "150dp" }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, id: "imgArrow", imagescalemode: 1, info: null, invokedProperty: "src", iscustomlayout: false, isvisible: true, kuid: "fcd9358a75f84505be99621a85c4ba85", name: "kony.ui.Image2", parent: "flxArrow", pf: "frmOpenAccount", responsiveData: { b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, height: { type: "string", value: "20dp" }, left: { type: "string", value: "0%" }, src: "left_chevron.png", width: { type: "string", value: "20dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, imgTick: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _height_: { type: "string", value: "30dp" }, _left_: { type: "string", value: "7dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _skin_: "sf28157fa49a40478b0515ee8b63e9c4", _src_: "mark.png", _top_: { type: "string", value: "9dp" }, _width_: { type: "string", value: "30dp" }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, containerweight: 100, id: "imgTick", imagescalemode: 1, info: null, invokedProperty: "src", iscustomlayout: false, isvisible: true, kuid: "fd41ee1fb3624272a98b8b6fed2afd64", name: "kony.ui.Image2", parent: "flxImage", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, imgTick2: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _height_: { type: "string", value: "30dp" }, _left_: { type: "string", value: "7dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _skin_: "sf28157fa49a40478b0515ee8b63e9c4", _src_: "mark.png", _top_: { type: "string", value: "9dp" }, _width_: { type: "string", value: "30dp" }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, containerweight: 100, id: "imgTick2", imagescalemode: 1, info: null, invokedProperty: "src", iscustomlayout: false, isvisible: true, kuid: "i2fe8faf056440adb78072831c7aa6b9", name: "kony.ui.Image2", parent: "flxImg", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, imgTick3: { "@class": "com.kony.gen.viz.model.component.KVizImage2", DNDConfig: null, _base64_: null, _height_: { type: "string", value: "30dp" }, _left_: { type: "string", value: "7dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _skin_: "sf28157fa49a40478b0515ee8b63e9c4", _src_: "mark.png", _top_: { type: "string", value: "9dp" }, _width_: { type: "string", value: "30dp" }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, containerweight: 100, id: "imgTick3", imagescalemode: 1, info: null, invokedProperty: "src", iscustomlayout: false, isvisible: true, kuid: "g264ff336f014e6abd418cd666ee25ac", name: "kony.ui.Image2", parent: "flxIcon", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, srcType: 1, wType: "Image", widgetalignment: 5, zindex: 1 }, lbl325pa: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "3%" }, _skin_: "s08c5089316c4e9d9e90ce20a557e0f7", _text_: "3.25% p.a.", _top_: { type: "string", value: "27dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lbl325pa", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "feb75ee33b854ea088939b09784998fe", name: "kony.ui.Label", parent: "flxSavingsAccount", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lbl3pa: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "3%" }, _skin_: "s08c5089316c4e9d9e90ce20a557e0f7", _text_: "3.00% p.a.", _top_: { type: "string", value: "27dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lbl3pa", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "bcc84c4eb1d847e5877a92288928c6cc", name: "kony.ui.Label", parent: "flxSalaryAccount", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblCountry: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Country of residence", _top_: { type: "string", value: "3%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblCountry", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "e8eea3cf8b7248938547802fcf9cda93", name: "kony.ui.Label", parent: "flxContent", pf: "frmOpenAccount", responsiveData: { b2: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c" }, b3: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c", top: { type: "string", value: "3%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblCurrentAccount: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Current Account", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblCurrentAccount", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c43e53f210ef4d44b1e0be16d200e1dd", name: "kony.ui.Label", parent: "flxCurrent", pf: "frmOpenAccount", responsiveData: { b2: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c" }, b3: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c", text: "Current" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDes: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Takes about 8 minutes. You can save and come back at any point.", _top_: { type: "string", value: "2%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblDes", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "fc445ea905f44f55b6bff16079f48c3e", name: "kony.ui.Label", parent: "flxContent", pf: "frmOpenAccount", responsiveData: { b2: { skin: "s40b31c9cbf9487ab1dd1bf46e587626", width: { type: "string", value: "95%" } }, b3: { skin: "s9262b76be504841ba87554ecac0a21f", text: "Takes about 8 minutes. You can save and come back.", top: { type: "string", value: "1%" }, width: { type: "string", value: "75%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblGov: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "6%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "A government photo ID \u2014 passport, driving licence or national ID", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblGov", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "i6af61aeee3847a38144e6354f78e7d7", name: "kony.ui.Label", parent: "flxInfo1", pf: "frmOpenAccount", responsiveData: { b1: { skin: "s40b31c9cbf9487ab1dd1bf46e587626" }, b2: { left: { type: "string", value: "8%" }, skin: "s40b31c9cbf9487ab1dd1bf46e587626", width: { type: "ref", value: "preferred" } }, b3: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "55px" }, skin: "s9262b76be504841ba87554ecac0a21f", text: "A government photo ID", width: { type: "string", value: "75%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMobile: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "6%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "A mobile number we can send a verification code to", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblMobile", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "df3e79605dc243309abfc0592528dd18", name: "kony.ui.Label", parent: "flxInfo3", pf: "frmOpenAccount", responsiveData: { b1: { skin: "s40b31c9cbf9487ab1dd1bf46e587626" }, b2: { left: { type: "string", value: "8%" }, skin: "s40b31c9cbf9487ab1dd1bf46e587626", width: { type: "string", value: "100%" } }, b3: { left: { type: "string", value: "55px" }, skin: "s9262b76be504841ba87554ecac0a21f", text: "A mobile number for the verification code", width: { type: "string", value: "75%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblNointerest: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "3%" }, _skin_: "s08c5089316c4e9d9e90ce20a557e0f7", _text_: "No interest", _top_: { type: "string", value: "27dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblNointerest", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c52d1834a3b94b64a65737bbbb5df3bc", name: "kony.ui.Label", parent: "flxCurrentAccount", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblOpenAccount: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s87143e906d447fe9eb617c36bdfbbd5", _text_: "Open an account", _top_: { type: "string", value: "5%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblOpenAccount", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b1c42e7df77a42ab985a7523d0df6616", name: "kony.ui.Label", parent: "flxContent", pf: "frmOpenAccount", responsiveData: { b2: { skin: "s89c79a6a6444f5ea951eab885b2df6d" }, b3: { skin: "s89c79a6a6444f5ea951eab885b2df6d", top: { type: "string", value: "3%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSalAcct: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Salary Account", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblSalAcct", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d1b85634b2f94842b95c2091a9950ad7", name: "kony.ui.Label", parent: "flxSalay", pf: "frmOpenAccount", responsiveData: { b2: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c" }, b3: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c", text: "Salary" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSavings: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Savings Account", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblSavings", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "j8001d6b040141c39eca99ef19f2c47a", name: "kony.ui.Label", parent: "flxSavingsAcct", pf: "frmOpenAccount", responsiveData: { b2: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c" }, b3: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c", text: "Savings" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSent1: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s40b31c9cbf9487ab1dd1bf46e587626", _text_: "For business use. Higher transaction limits, overdraft on request.", _top_: { type: "string", value: "15%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblSent1", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "g999ca27683d440b918c4c1ba0e21f04", name: "kony.ui.Label", parent: "flxCurrent", pf: "frmOpenAccount", responsiveData: { b2: { width: { type: "ref", value: "preferred" } }, b3: { skin: "s9262b76be504841ba87554ecac0a21f", text: "For business. Higher limits, overdraft on request.", top: { type: "string", value: "10%" }, width: { type: "string", value: "75%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSent2: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s40b31c9cbf9487ab1dd1bf46e587626", _text_: "Zero balance account opened through your employer.", _top_: { type: "string", value: "15%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblSent2", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "fc600b8825b346e38d669293b888d25d", name: "kony.ui.Label", parent: "flxSalay", pf: "frmOpenAccount", responsiveData: { b2: { width: { type: "ref", value: "preferred" } }, b3: { skin: "s9262b76be504841ba87554ecac0a21f", text: "Zero balance account opened via your employer.", top: { type: "string", value: "10%" }, width: { type: "string", value: "75%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblSent3: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s40b31c9cbf9487ab1dd1bf46e587626", _text_: "Everyday banking with interest on your balance. No minimum.", _top_: { type: "string", value: "15%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblSent3", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "e51002e01377485c9d98f475ad9aec28", name: "kony.ui.Label", parent: "flxSavingsAcct", pf: "frmOpenAccount", responsiveData: { b2: { skin: "s40b31c9cbf9487ab1dd1bf46e587626", width: { type: "ref", value: "preferred" } }, b3: { skin: "s9262b76be504841ba87554ecac0a21f", text: "Everyday banking with interest. No minimum balance.", top: { type: "string", value: "10%" }, width: { type: "string", value: "75%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTax: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "6%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Your tax number", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblTax", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "db1244ad67d94dcfb0311e8ea350dee5", name: "kony.ui.Label", parent: "flxInfo2", pf: "frmOpenAccount", responsiveData: { b1: { skin: "s40b31c9cbf9487ab1dd1bf46e587626" }, b2: { left: { type: "string", value: "8%" }, skin: "s40b31c9cbf9487ab1dd1bf46e587626", width: { type: "string", value: "100%" } }, b3: { centerY: { type: "string", value: "50%" }, left: { type: "string", value: "55px" }, skin: "s9262b76be504841ba87554ecac0a21f", width: { type: "string", value: "75%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblWhichAccount: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Which account would you like?", _top_: { type: "string", value: "3%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblWhichAccount", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "afb29761ff7445e8a41dfb8d956f1410", name: "kony.ui.Label", parent: "flxContent", pf: "frmOpenAccount", responsiveData: { b2: { skin: "sa672bb78ac248f5a18a75c81ca5cd5c" }, b3: { left: { type: "string", value: "0dp" }, skin: "sa672bb78ac248f5a18a75c81ca5cd5c", text: "Which account?" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lbxCountry: { "@class": "com.kony.gen.viz.model.component.KVizListBox", DNDConfig: null, _height_: { type: "string", value: "40dp" }, _left_: { type: "string", value: "31dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "Please Select", _skin_: "sb55aafa7d074caaa8778956b173389d", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "300dp" }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, dropdownimage: "listboxarw.png", focusskin: "s253a8de773e491b8b80a3ce92e9515e", groupcells: false, id: "lbxCountry", info: null, iscustomlayout: false, isvisible: true, kuid: "j14037aaa0374467bf491505442b6570", masterdata: [["lb1", "India"], ["lb2", "United Arab Emirates"], ["lb3", "Singapore"], ["lb4", "United Kingdom"]], name: "kony.ui.ListBox", parent: "flxContent", pf: "frmOpenAccount", responsiveData: { b1: { centerX: { type: "string", value: "" }, height: { type: "string", value: "60dp" }, left: { type: "string", value: "0dp" }, skin: "s10d9c1ec12d41ed82f126767474ca85", top: { type: "string", value: "2%" }, width: { type: "string", value: "100%" } }, b2: { height: { type: "string", value: "60dp" }, left: { type: "string", value: "0dp" }, skin: "s10d9c1ec12d41ed82f126767474ca85", top: { type: "string", value: "2%" }, width: { type: "string", value: "100%" } }, b3: { centerX: { type: "string", value: "" }, height: { type: "string", value: "60dp" }, left: { type: "string", value: "0dp" }, skin: "s10d9c1ec12d41ed82f126767474ca85", top: { type: "string", value: "1%" }, width: { type: "string", value: "100%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, selectedkey: "lb1", selectedkeys: null, selectedkeyvalue: ["lb1", "India"], selectedkeyvalues: null, size: 18, viewconfig: { toggleViewConfig: { viewStyle: 0 } }, viewtype: 0, wType: "ListBox", zindex: 1 }, SignInHeader: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, autogrowmode: 0, canUpdateUI: true, clipbounds: false, containerweight: 0, dataDiffs: { SignInHeader: { __events__: {}, __info__: { isRoot: true, kuid: "b16a1d4220514e6b9bb86e605d3c5dce", srcKUID: "a435f14717074d1d8d9d854d1f44633e", wType: "FlexContainer" }, centerY: { Default: { type: "string", value: "" } }, responsiveData: {}, top: { Default: { type: "string", value: "0dp" } } }, flxBankName: { __events__: {}, __info__: { kuid: "c0900924c1594c1293de0e15dde0f5b2", srcKUID: "ib0413f350b9470b88a32dbf10db4b37", wType: "FlexContainer" } }, flxHead: { __events__: {}, __info__: { kuid: "ef672b73491a4292a8a90a0078bd1110", srcKUID: "a3dd274704f44571817fddea638d1694", wType: "FlexContainer" } }, flxParent: { __events__: {}, __info__: { kuid: "f9588b40887847a58d6e5c9aff40f134", srcKUID: "cd88a3dc800e4ba2a89adf3cae1687e5", wType: "FlexContainer" } }, flxSignIn: { __events__: {}, __info__: { kuid: "h268a11eee3d4feeb30a5382cd86951a", srcKUID: "ideb5abbbdf646d9afb237e167cb8bdc", wType: "FlexContainer" }, responsiveData: { b1: { right: { type: "string", value: "7%" } }, b2: { right: { type: "string", value: "6%" } } }, right: { Default: { type: "string", value: "10%" } } }, lblAvenza: { __events__: {}, __info__: { kuid: "b6f16027c67f42d09311b8b3d5904e42", srcKUID: "aee8882a2cfb4424b02ef65c049a2376", wType: "Label" } }, lblBank: { __events__: {}, __info__: { kuid: "b5b7436e9c3e4c4ba2f82589ed16065e", srcKUID: "dba1247c784d4e508a0de68f4ab441bd", wType: "Label" } }, lblSignIn: { __events__: {}, __info__: { kuid: "cccdb1b7be76419182c66b4ad1696076", srcKUID: "jeafecd6c3454d61b179276993d52a4a", wType: "Label" }, left: { Default: { type: "string", value: "1%" } }, responsiveData: {} }, lblaccount: { __events__: {}, __info__: { kuid: "a891ae954e10440cb9f7b2da1305bbf5", srcKUID: "ec24afb643064193a0d342fe1e7cec5f", wType: "Label" } } }, enablescrolling: true, id: "SignInHeader", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "b16a1d4220514e6b9bb86e605d3c5dce", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxHeader", pf: "frmOpenAccount", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "a435f14717074d1d8d9d854d1f44633e", wType: "UserWidgetInstance", zindex: 1 } };

  // saywright/vision/apps/avenzabank/src/controllers/frmOpenAccountController.kjs
  var frmOpenAccountController_default = "define({ \r\n\r\n //Type your controller code here \r\n\r\n });";

  // saywright/vision/apps/avenzabank/src/controllers/frmOpenAccountControllerActions.kjs
  var frmOpenAccountControllerActions_default = "define({});\n";

  // saywright/vision/apps/avenzabank/src/forms/FrmPersonalDetails.jsx
  var import_react9 = __toESM(require_react(), 1);
  var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
  function FrmPersonalDetails({ parentLayout }) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxParent", parentLayout, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Flex, { id: "flxHeader", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Component2, { id: "SignInHeader" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Flex, { id: "flxFlow", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Component2, { id: "completionflow" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxContents", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Label, { id: "lblTell" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Label, { id: "lblEnter" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxDetails", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxName", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxFirstname", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Label, { id: "lblFirstname" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TextField, { id: "tbxFirstname" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxLastName", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Label, { id: "lblLastname" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TextField, { id: "tbxLastname" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxBasicDetails", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxDOB", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Label, { id: "lblDOB" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TextField, { id: "calDOB" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxNationality", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Label, { id: "Nationality" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ListBox, { id: "lbxNationality" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Flex, { id: "flxEmail", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxMail", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Label, { id: "lblEmail" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TextField, { id: "tbxEmail" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Flex, { id: "flxNumber", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxMobileNumber", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Label, { id: "lblMobilenumber" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ListBox, { id: "tbxCode" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TextField, { id: "tbxNumber" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Label, { id: "lblVerification" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxUpdates", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Flex, { id: "flxBox" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Label, { id: "lblUpdates" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Flex, { id: "flxButton", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Button, { id: "btnContinue" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Button, { id: "btnBack" })
          ] })
        ] })
      ] })
    ] }) });
  }

  // saywright/vision/apps/avenzabank/src/forms/frmPersonalDetails.widgets.json
  var frmPersonalDetails_widgets_default = { btnBack: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "0dp" }, _skin_: "s01575501bae4b55b991c903e35395e4", _text_: "Back", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "25%" }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sebb8da9cae845b7937327af2fecec1c", id: "btnBack", info: null, iscustomlayout: false, isvisible: true, kuid: "c781f09df81e401a8267973c6c68678d", name: "kony.ui.Button", parent: "flxButton", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, btnContinue: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _skin_: "s100c6d0bc2f41a0b209a9e7a947df0d", _text_: "Continue", _top_: { type: "string", value: "35dp" }, _width_: { type: "string", value: "65%" }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sebb8da9cae845b7937327af2fecec1c", id: "btnContinue", info: null, iscustomlayout: false, isvisible: true, kuid: "db29899c27f14ded936d99565b38ecf0", name: "kony.ui.Button", parent: "flxButton", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, calDOB: { "@class": "com.kony.gen.viz.model.component.KVizDateField", DNDConfig: null, Image: "calbtn.png", __id: "frmPersonalDetails_Calendar0f12875d05ef941", __input: "Calendar0f12875d05ef941", _data_: null, _date_: "13/10/2026", _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [0, 0, 0, 0], _placeholder_: "", _skin_: "sd728793f0d2459d8c74bfac2bd17400", _top_: { type: "string", value: "35dp" }, _width_: { type: "string", value: "100%" }, advview: "default", calendaricon: "calbtn.png", canUpdateUI: true, containerweight: 100, contentalignment: 5, datecomponents: [13, 10, 2026, 0, 0, 0], dateeditable: true, dateformat: "dd/MM/yyyy", datesGroup: [], datesState: 0, day: 13, daytextalignmentincell: 5, displayedMonths: [10, 2026], entereddate: [13, 10, 2026, 0, 0, 0], format: "dd/MM/yyyy", formatteddate: "13/10/2026", hidedaysheader: false, hidemonthsheader: false, hour: 0, id: "calDOB", info: null, iscustomlayout: false, isvisible: true, kuid: "b0575dafc5c74c8e89d3b48afec4ace5", minutes: 0, month: 10, monthsinrow: 3, name: "kony.ui.Calendar", navigatorAlert: "Invalid Selection", noofmonths: 1, pagedate: "/2026", parent: "flxDOB", pf: "frmPersonalDetails", popupHeight: "auto", popupWidth: "auto", retaincontentalignment: false, retainflexpositionproperties: false, seconds: 0, selectdate: "//2026", startDay: 0, viewtype: "default", wType: "Calendar", widgetalignment: 5, widths: ["14.2857%;", "14.2857%;", "14.2857%;", "14.2857%;", "14.2857%;", "14.2857%;", "14.2857%;"], year: 2026, zindex: 1 }, completionflow: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, autogrowmode: 0, canUpdateUI: true, clipbounds: false, containerweight: 0, dataDiffs: { completionflow: { __events__: {}, __info__: { isRoot: true, kuid: "g0c9663038c54e999effafd7122f8769", srcKUID: "d6ae2c099d524b24a0fc75babc109d85", wType: "FlexContainer" } }, flxFlow: { __events__: {}, __info__: { kuid: "ja3868f707e14887a6b922b885074486", srcKUID: "e91ed7e30c4542c184a66e5b37651a03", wType: "FlexContainer" } }, flxGreenFlow: { __events__: {}, __info__: { kuid: "ff4b0a33f68541ff9c9a446e14d69515", srcKUID: "he9b732ee28f4829b4365555309addce", wType: "FlexContainer" } }, flxTitle: { __events__: {}, __info__: { kuid: "c57146e0873e45d5afcce1284037e22f", srcKUID: "e87bca20a54b4e189b2cfabaaea8fda6", wType: "FlexContainer" }, centerX: { Default: { type: "string", value: "50%" } }, responsiveData: {}, width: { Default: { type: "string", value: "75%" } } }, flxTraxck: { __events__: {}, __info__: { kuid: "a996175810d94406a9ec990a515e3301", srcKUID: "a96c019dac4a4ffc8b62de635f4164b1", wType: "FlexContainer" }, centerX: { Default: { type: "string", value: "50%" } }, responsiveData: {}, width: { Default: { type: "string", value: "75%" } } }, lblGettingStared: { __events__: {}, __info__: { kuid: "e4edc7e306fb4422b29cfcb95d23630a", srcKUID: "ifdbf0fb686c4e6381d9135d68dc4ea7", wType: "Label" } }, lblStep: { __events__: {}, __info__: { kuid: "fd3be9474dfa407cbafa5b135f68c0e2", srcKUID: "d802b7d236f4410196c6a9711d985fb7", wType: "Label" } } }, enablescrolling: true, id: "completionflow", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "g0c9663038c54e999effafd7122f8769", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxFlow", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "d6ae2c099d524b24a0fc75babc109d85", wType: "UserWidgetInstance", zindex: 1 }, flxBasicDetails: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "30dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50.04%" }, children: ["flxDOB", "flxNationality"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxBasicDetails", info: null, iscustomlayout: false, isvisible: true, kuid: "f7a7b405693944c9b368284d997b6ab8", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetails", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxBox: { DNDConfig: null, _height_: { type: "string", value: "20dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sa8a5f0c9e3a4beea568f2667856ad49", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "20dp" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "string", value: "50%" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxBox", info: null, iscustomlayout: false, isvisible: true, kuid: "db270c09be9a4db1bd2713362de5eff8", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxUpdates", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxButton: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _left_: { type: "string", value: "49dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "12dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["btnContinue", "btnBack"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxButton", info: null, iscustomlayout: false, isvisible: true, kuid: "b2b6fa3172a0447398b0eadbda6b27ce", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetails", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxContents: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "198dp" }, _width_: { type: "string", value: "75%" }, allboxes: [], autogrowmode: 1, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblTell", "lblEnter", "flxDetails"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxContents", info: null, iscustomlayout: false, isvisible: true, kuid: "i36fbb58c01841e1add7573a5e5c56a1", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDetails: { DNDConfig: null, _height_: { type: "string", value: "755px" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s01debcdc3e04d3b88e4597f0ae2e20c", _top_: { type: "string", value: "45px" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["flxName", "flxBasicDetails", "flxEmail", "flxNumber", "lblVerification", "flxUpdates", "flxButton"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDetails", info: null, iscustomlayout: false, isvisible: true, kuid: "b53347b3520b47a284803d6569a404a8", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxContents", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDOB: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "4dp" }, _width_: { type: "string", value: "45%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblDOB", "calDOB"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDOB", info: null, iscustomlayout: false, isvisible: true, kuid: "d2bf0ed5fa6b43f39049e2e567021caa", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBasicDetails", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxEmail: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "30px" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxMail"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxEmail", info: null, iscustomlayout: false, isvisible: true, kuid: "c1a75effc775452893d46d1397691a8a", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetails", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxFirstname: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "4dp" }, _width_: { type: "string", value: "45%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblFirstname", "tbxFirstname"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxFirstname", info: null, iscustomlayout: false, isvisible: true, kuid: "ja2a3365af0e4996aa96ba3eaffad230", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxName", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxFlow: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s019fa5a22174c24aad3a7a51091d1e1", _top_: { type: "string", value: "118dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["completionflow"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxFlow", info: null, iscustomlayout: false, isvisible: true, kuid: "d4a544d379ca48fb804ca15428e4a63e", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHeader: { DNDConfig: null, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s019fa5a22174c24aad3a7a51091d1e1", _top_: { type: "string", value: "28dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["SignInHeader"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHeader", info: null, iscustomlayout: false, isvisible: true, kuid: "bd683c1862dc488087538cb3b3f49753", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLastName: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "0" }, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "45%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblLastname", "tbxLastname"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLastName", info: null, iscustomlayout: false, isvisible: true, kuid: "b37a18831c6b4028991335153f129e1c", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxName", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxMail: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "4dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblEmail", "tbxEmail"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxMail", info: null, iscustomlayout: false, isvisible: true, kuid: "e8af89b65f104ee3895ff9febe28b197", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxEmail", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxMobileNumber: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _left_: { type: "string", value: "0" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "0" }, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["lblMobilenumber", "tbxCode", "tbxNumber"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxMobileNumber", info: null, iscustomlayout: false, isvisible: true, kuid: "b5278a0583924eefa1eb692aad7d83a2", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxNumber", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxName: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "40dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxFirstname", "flxLastName"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxName", info: null, iscustomlayout: false, isvisible: true, kuid: "abe70376a8fd4a538d46523ed1a495a6", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetails", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxNationality: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "0" }, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "45%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["Nationality", "lbxNationality"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxNationality", info: null, iscustomlayout: false, isvisible: true, kuid: "b684392bfc0a486e9542ab2619049483", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBasicDetails", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxNumber: { DNDConfig: null, _height_: { type: "string", value: "100dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "30dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxMobileNumber"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxNumber", info: null, iscustomlayout: false, isvisible: true, kuid: "i5044a2055fc4b7a8c81eb3fe71f378c", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetails", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxParent: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se590c09220e4e5da7bf6f72d6887a41", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 1, canUpdateUI: true, children: ["flxHeader", "flxFlow", "flxContents"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxParent", info: null, iscustomlayout: false, isvisible: true, kuid: "fff5827624954a998efe26f678bf2b72", layouttype: 2, name: "kony.ui.FlexContainer", parent: "frmPersonalDetails", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxUpdates: { DNDConfig: null, _height_: { type: "string", value: "37dp" }, _left_: { type: "string", value: "61dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "25dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxBox", "lblUpdates"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxUpdates", info: null, iscustomlayout: false, isvisible: true, kuid: "e0ff42d9fee14c2d81e3e6180ed2072b", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDetails", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, frmPersonalDetails: { "@class": "com.kony.gen.viz.model.container.KVizScrollFlexForm", DNDConfig: null, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "scf0bb0ac9ac406fad753f56963d9262", _title_: null, addWidgetsdone: false, allboxes: [], android: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, androidwearos: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, breakpointInfo: { b1: { width: 1366 }, b2: { width: 1024 }, b3: { width: 640 } }, canUpdateUI: true, canvasWidth: 1200, children: ["flxParent"], containerweight: 100, controllerInfo: { default: { channel: "desktop", fileType: "js", name: "frmPersonalDetailsController" } }, currentLocale: "default", desktopweb: { needAppMenu: false }, device: "desktopweb", displayorientation: 1, enabledforidletimeout: false, id: "frmPersonalDetails", info: null, initdone: false, inputaccessoryviewtype: 4, ipad: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iphone: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iscustomlayout: false, isvisible: true, kiosk: { needAppMenu: false }, kuid: "j457911c2c79443586b7bbfb3add699d", layouttype: 2, name: "kony.ui.Form2", needappmenu: false, paddinginpixel: false, platform: "desktopweb", prevDevice: "desktopweb", prevPlatform: "desktopweb", retaincontentalignment: false, retainflexpositionproperties: false, retainscrollposition: false, snapgridsize: 10, snaptogrid: true, spaan: { needAppMenu: false }, spaandroidtablet: { needAppMenu: false }, spaip: { needAppMenu: false }, spaipad: { needAppMenu: false }, spawindowstablet: { needAppMenu: false }, spawinphone8: { needAppMenu: false }, titleBarSkin: "sb51bcefd50c4c1c959df14dd1d7d808", titlebar: true, type: 3, wType: "Form", windows8: { needAppMenu: false }, winphone8: { needAppMenu: false } }, lblDOB: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Date of birth", _top_: { type: "string", value: "0%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblDOB", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "f4e888b82f9f4ce0870e66a04225f295", name: "kony.ui.Label", parent: "flxDOB", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblEmail: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Email", _top_: { type: "string", value: "0%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblEmail", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d544044d011c4ff3b0fd7099c68d8959", name: "kony.ui.Label", parent: "flxMail", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblEnter: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s40b31c9cbf9487ab1dd1bf46e587626", _text_: "Enter your name exactly as it appears on your photo ID.", _top_: { type: "string", value: "18px" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblEnter", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "g5bc5e03fe2b4ce985d67ce3822795e7", name: "kony.ui.Label", parent: "flxContents", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblFirstname: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "First name", _top_: { type: "string", value: "0%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblFirstname", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "d24403fac79142ff9e913a82946c69f3", name: "kony.ui.Label", parent: "flxFirstname", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblLastname: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Last name", _top_: { type: "string", value: "0%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblLastname", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a91063ae6b634e62ac74bbcdb917dc24", name: "kony.ui.Label", parent: "flxLastName", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMobilenumber: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Mobile Number", _top_: { type: "string", value: "0%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblMobilenumber", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "eed7076c2fef436085d60f44b8da337b", name: "kony.ui.Label", parent: "flxMobileNumber", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblTell: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s89c79a6a6444f5ea951eab885b2df6d", _text_: "Tell us about you", _top_: { type: "string", value: "45px" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblTell", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "f304b1c9a666436cb8674b3761e46ccb", name: "kony.ui.Label", parent: "flxContents", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblUpdates: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "40dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s40b31c9cbf9487ab1dd1bf46e587626", _text_: "Send me product updates and offers. You can turn this off at any time.", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblUpdates", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ec31f221062045bbb1875bf1c9d6cd72", name: "kony.ui.Label", parent: "flxUpdates", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblVerification: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s40b31c9cbf9487ab1dd1bf46e587626", _text_: "We send a verification code to this number on the next step", _top_: { type: "string", value: "8dp" }, _width_: { type: "string", value: "90%" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblVerification", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "cf3601dfb0d4454888a483346df0079d", name: "kony.ui.Label", parent: "flxDetails", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lbxNationality: { "@class": "com.kony.gen.viz.model.component.KVizListBox", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "Please Select", _skin_: "s10d9c1ec12d41ed82f126767474ca85", _top_: { type: "string", value: "35dp" }, _width_: { type: "string", value: "100%" }, canUpdateUI: true, containerweight: 100, contentalignment: 4, dropdownimage: "listboxarw.png", focusskin: "s253a8de773e491b8b80a3ce92e9515e", groupcells: false, id: "lbxNationality", info: null, iscustomlayout: false, isvisible: true, kuid: "b9e38fa764fe49f8a1aaa2b49c1cf5ec", masterdata: [["lb1", "Indian"], ["lb2", "British"], ["lb3", "Singaporean"]], name: "kony.ui.ListBox", parent: "flxNationality", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, selectedkey: "lb1", selectedkeys: null, selectedkeyvalue: ["lb1", "Indian"], selectedkeyvalues: null, size: 18, viewconfig: { toggleViewConfig: { viewStyle: 0 } }, viewtype: 0, wType: "ListBox", zindex: 1 }, Nationality: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0%" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Nationality", _top_: { type: "string", value: "0%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "Nationality", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ae517e6b0ca148749263bdc1c5399e3d", name: "kony.ui.Label", parent: "flxNationality", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, SignInHeader: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "100%" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, autogrowmode: 0, canUpdateUI: true, clipbounds: false, containerweight: 0, dataDiffs: { SignInHeader: { __events__: {}, __info__: { isRoot: true, kuid: "ec6364f3b2674fd78c69579b15568bd6", srcKUID: "a435f14717074d1d8d9d854d1f44633e", wType: "FlexContainer" } }, flxBankName: { __events__: {}, __info__: { kuid: "caa4663e609044bbbfe22e02aefc2c9a", srcKUID: "ib0413f350b9470b88a32dbf10db4b37", wType: "FlexContainer" } }, flxHead: { __events__: {}, __info__: { kuid: "ed66f8faf4c448ff95dc61ce15dd6eac", srcKUID: "a3dd274704f44571817fddea638d1694", wType: "FlexContainer" } }, flxParent: { __events__: {}, __info__: { kuid: "d2ab306958d94d2d94d6a6e4e22652e3", srcKUID: "cd88a3dc800e4ba2a89adf3cae1687e5", wType: "FlexContainer" } }, flxSignIn: { __events__: {}, __info__: { kuid: "d82e6ee83aa14ebb985cc70d1b38945e", srcKUID: "ideb5abbbdf646d9afb237e167cb8bdc", wType: "FlexContainer" } }, lblAvenza: { __events__: {}, __info__: { kuid: "gd7fe0cab35a4ebd889210fe7e1eee47", srcKUID: "aee8882a2cfb4424b02ef65c049a2376", wType: "Label" } }, lblBank: { __events__: {}, __info__: { kuid: "a0ab3ae16bc34c9caed8f9e3962e5bf1", srcKUID: "dba1247c784d4e508a0de68f4ab441bd", wType: "Label" } }, lblSignIn: { __events__: {}, __info__: { kuid: "acf174b23390408495861cafcb16de7b", srcKUID: "jeafecd6c3454d61b179276993d52a4a", wType: "Label" } }, lblaccount: { __events__: {}, __info__: { kuid: "d7e9d825385c4c5a9f9a39a7d79c7126", srcKUID: "ec24afb643064193a0d342fe1e7cec5f", wType: "Label" } } }, enablescrolling: true, id: "SignInHeader", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "ec6364f3b2674fd78c69579b15568bd6", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxHeader", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "a435f14717074d1d8d9d854d1f44633e", wType: "UserWidgetInstance", zindex: 1 }, tbxCode: { "@class": "com.kony.gen.viz.model.component.KVizListBox", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "Please Select", _skin_: "s10d9c1ec12d41ed82f126767474ca85", _top_: { type: "string", value: "35dp" }, _width_: { type: "string", value: "15.16%" }, canUpdateUI: true, containerweight: 100, contentalignment: 4, focusskin: "s253a8de773e491b8b80a3ce92e9515e", groupcells: false, id: "tbxCode", info: null, iscustomlayout: false, isvisible: true, kuid: "jbb1de86e2b343539a0d559fd918bbcd", masterdata: [["lb1", "+91"], ["lb2", "+44"], ["lb3", "+65"]], name: "kony.ui.ListBox", parent: "flxMobileNumber", pf: "frmPersonalDetails", retaincontentalignment: false, retainflexpositionproperties: false, selectedkey: "lb1", selectedkeys: null, selectedkeyvalue: ["lb1", "+91"], selectedkeyvalues: null, size: 18, viewconfig: { toggleViewConfig: { viewStyle: 0 } }, viewtype: 0, wType: "ListBox", zindex: 1 }, tbxEmail: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "", _skin_: "s04153e6847d48feba2812200e6e629d", _text_: "maya.fernandes@example.com", _top_: { type: "string", value: "35dp" }, _width_: { type: "string", value: "100%" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s595285064c045fcbfbe43f9c8971b96", id: "tbxEmail", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "a6024f1ca7b94058a3d8064724b8ec4b", mode: "A", name: "kony.ui.TextBox2", parent: "flxMail", pf: "frmPersonalDetails", placeholderskin: "seb7ade005c04622a6730983f00a34fe", retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 }, tbxFirstname: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "", _skin_: "s04153e6847d48feba2812200e6e629d", _text_: "Maya", _top_: { type: "string", value: "35dp" }, _width_: { type: "string", value: "100%" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s595285064c045fcbfbe43f9c8971b96", id: "tbxFirstname", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "c7057396d1de43ed9fac8b530a29c8c7", mode: "A", name: "kony.ui.TextBox2", parent: "flxFirstname", pf: "frmPersonalDetails", placeholderskin: "seb7ade005c04622a6730983f00a34fe", retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 }, tbxLastname: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "", _skin_: "s04153e6847d48feba2812200e6e629d", _text_: "Fernandes", _top_: { type: "string", value: "35dp" }, _width_: { type: "string", value: "100%" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s595285064c045fcbfbe43f9c8971b96", id: "tbxLastname", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "eee190e97ee94405b50cde74495ac2d3", mode: "A", name: "kony.ui.TextBox2", parent: "flxLastName", pf: "frmPersonalDetails", placeholderskin: "seb7ade005c04622a6730983f00a34fe", retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 }, tbxNumber: { "@class": "com.kony.gen.viz.model.component.KVizTextBox2", DNDConfig: null, _height_: { type: "string", value: "60dp" }, _margin_: [0, 0, 0, 0], _padding_: [3, 0, 0, 0], _placeholder_: "", _right_: { type: "string", value: "0" }, _skin_: "s04153e6847d48feba2812200e6e629d", _text_: "98450 11234", _top_: { type: "string", value: "35dp" }, _width_: { type: "string", value: "83%" }, autocapitalize: "none", autocomplete: false, autocorrect: false, autofilter: false, canUpdateUI: true, containerheight: "", containerheightmode: 1, containerweight: 100, contentalignment: 4, focusskin: "s595285064c045fcbfbe43f9c8971b96", id: "tbxNumber", info: null, iscustomlayout: false, isvisible: true, keyboardtype: "A", kuid: "b0b9598a817741d6a578ba76ca385b18", mode: "A", name: "kony.ui.TextBox2", parent: "flxMobileNumber", pf: "frmPersonalDetails", placeholderskin: "seb7ade005c04622a6730983f00a34fe", retaincontentalignment: false, retainflexpositionproperties: false, securetextentry: false, textinputmode: "A", tooltip: "", viewtype: "default", wType: "TextField", zindex: 1 } };

  // saywright/vision/apps/avenzabank/src/controllers/frmPersonalDetailsController.kjs
  var frmPersonalDetailsController_default = "define({ \r\n\r\n //Type your controller code here \r\n\r\n });";

  // saywright/vision/apps/avenzabank/src/controllers/frmPersonalDetailsControllerActions.kjs
  var frmPersonalDetailsControllerActions_default = "define({});\n";

  // saywright/vision/apps/avenzabank/src/forms/FrmProfile.jsx
  var import_react10 = __toESM(require_react(), 1);
  var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
  function FrmProfile({ parentLayout }) {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_jsx_runtime10.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxParent", parentLayout, children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxHeader", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Component2, { id: "DashboardHeader" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxProfile", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxDes", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblProfile" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblDes" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxEdit", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Button, { id: "btnEdit" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxInfo", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxCustDetail", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxMF", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblMF" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxCustName", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblMayaFernandes" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblCustDes" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxLine6" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxCustId", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblCustID" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblId" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxLine8" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxBranch", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblBranch" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblBranchName" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxLine9" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxKYC", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblKYC" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblVerified" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxLine10" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxPersonalInfo", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblPersonalDetails" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lvlDes" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxName", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblName" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblMaya" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxLine1" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxDOB", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblDOB" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblDate" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxLine2" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxMail", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblMail" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblMailId" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxLine7" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxMobile", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblMobile" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblMobilenum" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxLine4" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxAddress", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblMailingaddress" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblAddress" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxLine5" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Flex, { id: "flxUserName", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Flex, { id: "flxNameLogo", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblM" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblMayaFer" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Label, { id: "lblDesCust" })
      ] })
    ] }) });
  }

  // saywright/vision/apps/avenzabank/src/forms/frmProfile.widgets.json
  var frmProfile_widgets_default = { btnEdit: { "@class": "com.kony.gen.viz.model.component.KVizButton", DNDConfig: null, _height_: { type: "string", value: "50dp" }, _left_: { type: "number", value: "" }, _margin_: [6, 6, 6, 6], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "12dp" }, _skin_: "s100c6d0bc2f41a0b209a9e7a947df0d", _text_: "Edit Profile", _top_: { type: "string", value: "20dp" }, _width_: { type: "string", value: "45%" }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 5, displaytext: true, focusskin: "sebb8da9cae845b7937327af2fecec1c", id: "btnEdit", info: null, iscustomlayout: false, isvisible: true, kuid: "fb04f2245f2a41dd94a1366c63e27d19", name: "kony.ui.Button", parent: "flxEdit", pf: "frmProfile", responsiveData: { b1: { centerX: { type: "string", value: "" }, left: { type: "string", value: "" }, right: { type: "string", value: "0dp" }, width: { type: "string", value: "50%" } }, b3: { centerY: { type: "string", value: "50%" }, right: { type: "string", value: "0dp" }, text: "Edit" } }, retaincontentalignment: false, retainflexpositionproperties: false, wType: "Button", zindex: 1 }, DashboardHeader: { "@class": "com.kony.gen.viz.model.component.KVizUserWidget", DNDConfig: null, _children_: [], _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, areflexpropsreferenced: false, autogrowmode: 0, canUpdateUI: true, clipbounds: false, containerweight: 0, dataDiffs: { DashboardHeader: { __events__: {}, __info__: { isRoot: true, kuid: "cce6cbfae0934cffbb486a957961b15c", srcKUID: "effc0845c8f9420c9f5a770b0abbb7d6", wType: "FlexContainer" } }, flxBankName: { __events__: {}, __info__: { kuid: "e03d52fc24094ed4ad43f7fd2af408fa", srcKUID: "c875096256914e93a04f51419dd4b705", wType: "FlexContainer" } }, flxCredentails: { __events__: {}, __info__: { kuid: "f291362054fc46c090ec8d9655f5d1bb", srcKUID: "eb0b1392560a4953b7e3a9eeb613f3db", wType: "FlexContainer" } }, flxLogo: { __events__: {}, __info__: { kuid: "a25802c6a1b14427bc0b7716187f09d8", srcKUID: "c1e08165035242009bbc615f4b59cfe5", wType: "FlexContainer" } }, flxParent: { __events__: {}, __info__: { kuid: "iec86a31873349cd9c472866361e6854", srcKUID: "j252f775ec9145ccae858e9c9949433d", wType: "FlexContainer" } }, flxUser: { __events__: {}, __info__: { kuid: "f8febf4131e8440d9a7aea1b7268cc95", srcKUID: "ca2db60a02f04bd78350b6c9c248417b", wType: "FlexContainer" } }, lblAccounts: { __events__: {}, __info__: { kuid: "d64ae3887bb84942b5a13ca014fc35d3", srcKUID: "a0aa145202da47a1a9e0dbe273680765", wType: "Label" } }, lblAvenza: { __events__: {}, __info__: { kuid: "b21a820f9284451aa98677c8bd6f4b83", srcKUID: "d05379e31ed7425bb42b5e6d458c0e01", wType: "Label" } }, lblBank: { __events__: {}, __info__: { kuid: "gd2796143d214a51888d6989bca8c0c8", srcKUID: "b9d7a8ca47a548109cd2c6b6d50154a2", wType: "Label" } }, lblMF: { __events__: {}, __info__: { kuid: "i4c2e359f4c54681912f81c38e90dbad", srcKUID: "g3621dacd12b40faa191f86051126bb9", wType: "Label" } }, lblNme: { __events__: {}, __info__: { kuid: "c2211a4dda524488aef843970e88eb16", srcKUID: "b3ab109848fb49bead2575592ce6df94", wType: "Label" } }, lblProfile: { __events__: {}, __info__: { kuid: "gc3175b32f7846a9a711ef54d1984d7b", srcKUID: "d5015326b98a480e956e4b38fdd0a4c0", wType: "Label" } }, lblTransfers: { __events__: {}, __info__: { kuid: "d8eeabe57625440aa18ba1a9e6fe2bec", srcKUID: "bdf3c3e24d3142f5a09288f84f5f889a", wType: "Label" } } }, enablescrolling: true, id: "DashboardHeader", info: null, iscustomlayout: false, isdatareferenced: false, isvisible: true, kuid: "cce6cbfae0934cffbb486a957961b15c", layouttype: 2, masterType: 0, name: "kony.ui.UserWidgetInstance", parent: "flxHeader", pf: "frmProfile", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, sourceUserWidget: "effc0845c8f9420c9f5a770b0abbb7d6", wType: "UserWidgetInstance", zindex: 1 }, flxAddress: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "45dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "51.79%" }, children: ["lblMailingaddress", "lblAddress", "flxLine5"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxAddress", info: null, iscustomlayout: false, isvisible: true, kuid: "c2c0f4ecaa0c4707b03b8be08972d411", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxPersonalInfo", pf: "frmProfile", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, layoutType: 4, left: { type: "string", value: "0dp" }, top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxBranch: { DNDConfig: null, _height_: { type: "string", value: "48dp" }, _left_: { type: "string", value: "45dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "52.50%" }, children: ["lblBranch", "lblBranchName", "flxLine9"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxBranch", info: null, iscustomlayout: false, isvisible: true, kuid: "g2c438ff85394bf2a0fa0d623329f2ed", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCustDetail", pf: "frmProfile", responsiveData: { b1: { centerX: { type: "string", value: "50%" } }, b2: { centerX: { type: "string", value: "50%" } }, b3: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCustDetail: { DNDConfig: null, _height_: { type: "string", value: "460dp" }, _left_: { type: "string", value: "5.50%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s0476a2dbda8422593024a9df7917965", _top_: { type: "string", value: "20dp" }, _width_: { type: "string", value: "29.30%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["flxMF", "flxCustName", "flxLine6", "flxCustId", "flxBranch", "flxKYC"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCustDetail", info: null, iscustomlayout: false, isvisible: true, kuid: "f0d0add5080c49ebaf42bf0a8f0e99eb", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxInfo", pf: "frmProfile", responsiveData: { b1: { height: { type: "string", value: "408dp" }, left: { type: "string", value: "4%" }, width: { type: "string", value: "30%" } }, b2: { height: { type: "string", value: "400dp" }, width: { type: "string", value: "30%" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "156dp" }, isVisible: true, left: { type: "string", value: "6.10%" }, top: { type: "string", value: "450dp" }, width: { type: "string", value: "89.20%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCustId: { DNDConfig: null, _height_: { type: "string", value: "48dp" }, _left_: { type: "string", value: "45dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "4%" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "51.79%" }, children: ["lblCustID", "lblId", "flxLine8"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCustId", info: null, iscustomlayout: false, isvisible: true, kuid: "c5a215b4db014c46bd8bfa218f360cfd", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCustDetail", pf: "frmProfile", responsiveData: { b1: { centerX: { type: "string", value: "50%" } }, b2: { centerX: { type: "string", value: "50%" }, top: { type: "string", value: "3%" } }, b3: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "" }, top: { type: "string", value: "3%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxCustName: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "23dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblMayaFernandes", "lblCustDes"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxCustName", info: null, iscustomlayout: false, isvisible: true, kuid: "ic1ee39fd385448780a935ad5e035d66", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCustDetail", pf: "frmProfile", responsiveData: { b1: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "70dp" }, top: { type: "string", value: "4%" } }, b2: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "60dp" }, left: { type: "string", value: "" }, top: { type: "string", value: "3.00%" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "-30dp" }, isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDes: { DNDConfig: null, _bottom_: { type: "string", value: "0dp" }, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "5.50%" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "0dp" }, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _width_: { type: "string", value: "26.98%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, children: ["lblProfile", "lblDes"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDes", info: null, iscustomlayout: false, isvisible: true, kuid: "d8bbcae27e534f07bd079f9cf6573613", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxProfile", pf: "frmProfile", responsiveData: { b1: { left: { type: "string", value: "4%" }, width: { type: "string", value: "310px" } }, b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, layoutType: 3, left: { type: "string", value: "6%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxDOB: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "45dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "51.79%" }, children: ["lblDOB", "lblDate", "flxLine2"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxDOB", info: null, iscustomlayout: false, isvisible: true, kuid: "h196ab2351744a83bb81dac5d61b120e", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxPersonalInfo", pf: "frmProfile", responsiveData: { b1: { height: { type: "string", value: "80dp" }, top: { type: "string", value: "0dp" } }, b2: { height: { type: "string", value: "90dp" }, top: { type: "string", value: "-10dp" } }, b3: { centerX: { type: "string", value: "50%" }, layoutType: 4, left: { type: "string", value: "0dp" }, top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxEdit: { DNDConfig: null, _bottom_: { type: "string", value: "0" }, _height_: { type: "string", value: "80dp" }, _left_: { type: "number", value: "" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "2%" }, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _width_: { type: "string", value: "31.00%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, children: ["btnEdit"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxEdit", info: null, iscustomlayout: false, isvisible: true, kuid: "ae45153d94f041baa0d2f900e4ec4bb8", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxProfile", pf: "frmProfile", responsiveData: { b1: { centerX: { type: "string", value: "" }, left: { type: "string", value: "" }, right: { type: "string", value: "3%" }, width: { type: "string", value: "200dp" } }, b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, right: { type: "string", value: "4%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxHeader: { DNDConfig: null, _height_: { type: "string", value: "90dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sa8a12b983e84fff8d45b6348388a7ac", _top_: { type: "string", value: "28dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: ["DashboardHeader"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxHeader", info: null, iscustomlayout: false, isvisible: true, kuid: "e3d18673429f49ef9df3feea7d9bd9b0", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmProfile", responsiveData: { b1: { skin: "s019fa5a22174c24aad3a7a51091d1e1" }, b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxInfo: { DNDConfig: null, _height_: { type: "string", value: "620dp" }, _left_: { type: "string", value: "110dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "260dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxCustDetail", "flxPersonalInfo"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxInfo", info: null, iscustomlayout: false, isvisible: true, kuid: "e2ef3d4e7f784d89b7debf5349522295", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmProfile", responsiveData: { b3: { centerX: { type: "string", value: "50.00%" }, height: { type: "string", value: "615px" }, isVisible: true, left: { type: "string", value: "0dp" }, top: { type: "string", value: "350dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxKYC: { DNDConfig: null, _height_: { type: "string", value: "48dp" }, _left_: { type: "string", value: "45dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "52.54%" }, children: ["lblKYC", "lblVerified", "flxLine10"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxKYC", info: null, iscustomlayout: false, isvisible: true, kuid: "fdd39d906db34e8780962eda40f4c412", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCustDetail", pf: "frmProfile", responsiveData: { b1: { centerX: { type: "string", value: "50%" } }, b2: { centerX: { type: "string", value: "50%" }, top: { type: "string", value: "0dp" } }, b3: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "0dp" }, top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLine1: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s1e8c158e45a4a859817d34685dccf5e", _top_: { type: "string", value: "90dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "number", value: "" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLine1", info: null, iscustomlayout: false, isvisible: true, kuid: "h8cab6074dea4d0b97007e324cf46a3a", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxName", pf: "frmProfile", responsiveData: { b3: { centerY: { type: "string", value: "" }, top: { type: "string", value: "15%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLine10: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s1e8c158e45a4a859817d34685dccf5e", _top_: { type: "string", value: "6%" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLine10", info: null, iscustomlayout: false, isvisible: true, kuid: "h66ebf8be91a4398aab4f3b449435dcd", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxKYC", pf: "frmProfile", responsiveData: { b1: { isVisible: false }, b2: { isVisible: false }, b3: { centerX: { type: "string", value: "" }, isVisible: true, left: { type: "string", value: "0dp" }, top: { type: "string", value: "83%" }, width: { type: "string", value: "96%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLine2: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s1e8c158e45a4a859817d34685dccf5e", _top_: { type: "string", value: "80dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "number", value: "" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLine2", info: null, iscustomlayout: false, isvisible: true, kuid: "b16928397aec49e6882d9269222e27be", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxDOB", pf: "frmProfile", responsiveData: { b3: { centerY: { type: "string", value: "" }, top: { type: "string", value: "15%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLine4: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s1e8c158e45a4a859817d34685dccf5e", _top_: { type: "string", value: "80dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "number", value: "" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLine4", info: null, iscustomlayout: false, isvisible: true, kuid: "cc26df28f10b4f6b98717ffea89600f9", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxMobile", pf: "frmProfile", responsiveData: { b3: { centerY: { type: "string", value: "" }, top: { type: "string", value: "15%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLine5: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s1e8c158e45a4a859817d34685dccf5e", _top_: { type: "string", value: "80dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "number", value: "" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLine5", info: null, iscustomlayout: false, isvisible: true, kuid: "a867c5aca29a4907a8d55ca59617cc6d", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxAddress", pf: "frmProfile", responsiveData: { b3: { centerY: { type: "string", value: "" }, top: { type: "string", value: "15%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLine6: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s1e8c158e45a4a859817d34685dccf5e", _top_: { type: "string", value: "6%" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLine6", info: null, iscustomlayout: false, isvisible: true, kuid: "f2baa07585454b2988eaf0c33a49537c", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCustDetail", pf: "frmProfile", responsiveData: { b1: { top: { type: "string", value: "3%" } }, b2: { centerX: { type: "string", value: "50%" }, top: { type: "string", value: "4.00%" } }, b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLine7: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s1e8c158e45a4a859817d34685dccf5e", _top_: { type: "string", value: "80dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centery: { type: "number", value: "" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLine7", info: null, iscustomlayout: false, isvisible: true, kuid: "c4da26d0894e48fe84e19ca7bfc1b10f", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxMail", pf: "frmProfile", responsiveData: { b3: { centerY: { type: "string", value: "" }, top: { type: "string", value: "15%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLine8: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s1e8c158e45a4a859817d34685dccf5e", _top_: { type: "string", value: "6%" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLine8", info: null, iscustomlayout: false, isvisible: true, kuid: "i0e8b413b9a045419fdca98b5781a31d", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCustId", pf: "frmProfile", responsiveData: { b1: { isVisible: false }, b2: { isVisible: false }, b3: { centerX: { type: "string", value: "" }, isVisible: true, left: { type: "string", value: "0dp" }, top: { type: "string", value: "83%" }, width: { type: "string", value: "96%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxLine9: { DNDConfig: null, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s1e8c158e45a4a859817d34685dccf5e", _top_: { type: "string", value: "6%" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxLine9", info: null, iscustomlayout: false, isvisible: true, kuid: "g462817ddefd43c5b85d3cd69c0ae304", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxBranch", pf: "frmProfile", responsiveData: { b1: { isVisible: false }, b2: { isVisible: false }, b3: { centerX: { type: "string", value: "" }, isVisible: true, left: { type: "string", value: "0dp" }, top: { type: "string", value: "83%" }, width: { type: "string", value: "96%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxMail: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "45dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "51.79%" }, children: ["lblMail", "lblMailId", "flxLine7"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxMail", info: null, iscustomlayout: false, isvisible: true, kuid: "f8e8dd7f668b4e689ab8fd68304a852a", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxPersonalInfo", pf: "frmProfile", responsiveData: { b2: {}, b3: { centerX: { type: "string", value: "50%" }, layoutType: 4, left: { type: "string", value: "0dp" }, top: { type: "string", value: "0.00%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxMF: { DNDConfig: null, _height_: { type: "string", value: "120dp" }, _left_: { type: "string", value: "62dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s5b2a204415149148873029d59dea60d", _top_: { type: "string", value: "6%" }, _width_: { type: "string", value: "120px" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["lblMF"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxMF", info: null, iscustomlayout: false, isvisible: true, kuid: "e24101f0d2044c52b53621564b8b2a89", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxCustDetail", pf: "frmProfile", responsiveData: { b2: { centerX: { type: "string", value: "50.00%" }, top: { type: "string", value: "6.00%" } }, b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxMobile: { DNDConfig: null, _height_: { type: "string", value: "80dp" }, _left_: { type: "string", value: "45dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, centerx: { type: "string", value: "51.79%" }, children: ["lblMobile", "lblMobilenum", "flxLine4"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxMobile", info: null, iscustomlayout: false, isvisible: true, kuid: "f90098a1b9864453b8294d859c98425f", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxPersonalInfo", pf: "frmProfile", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, layoutType: 4, left: { type: "string", value: "0dp" }, top: { type: "string", value: "0%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxName: { DNDConfig: null, _height_: { type: "string", value: "105dp" }, _left_: { type: "string", value: "45dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "90%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "51.79%" }, children: ["lblName", "lblMaya", "flxLine1"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxName", info: null, iscustomlayout: false, isvisible: true, kuid: "ic3e5b3254674f08ac984810e7f3e16f", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxPersonalInfo", pf: "frmProfile", responsiveData: { b1: { height: { type: "string", value: "95dp" } }, b3: { centerX: { type: "string", value: "50%" }, layoutType: 4, left: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxNameLogo: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "260dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "51dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, children: ["lblM"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxNameLogo", info: null, iscustomlayout: false, isvisible: true, kuid: "gbf6f84e812d474d91b8b56fadcbc078", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxUserName", pf: "frmProfile", responsiveData: { b3: { centerX: { type: "string", value: "50.00%" }, centerY: { type: "string", value: "" }, height: { type: "string", value: "100dp" }, skin: "s5b2a204415149148873029d59dea60d", top: { type: "string", value: "30dp" }, width: { type: "string", value: "100px" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxParent: { DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "sf883e9d82b542d0a532ffdcc045917a", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 1, canUpdateUI: true, children: ["flxHeader", "flxProfile", "flxInfo", "flxUserName"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxParent", info: null, iscustomlayout: false, isvisible: true, kuid: "d31074b3e99047b587e4727aef5d39f2", layouttype: 2, name: "kony.ui.FlexContainer", parent: "frmProfile", pf: "frmProfile", retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxPersonalInfo: { DNDConfig: null, _height_: { type: "string", value: "568dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _right_: { type: "string", value: "30dp" }, _skin_: "se613248e060409c96cc5f12720cd7c5", _top_: { type: "string", value: "20dp" }, _width_: { type: "string", value: "58.61%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["lblPersonalDetails", "lvlDes", "flxName", "flxDOB", "flxMail", "flxMobile", "flxAddress"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxPersonalInfo", info: null, iscustomlayout: false, isvisible: true, kuid: "f70b8592a8564b2b943c8eca47a66c4b", layouttype: 4, name: "kony.ui.FlexContainer", parent: "flxInfo", pf: "frmProfile", responsiveData: { b1: { right: { type: "string", value: "3%" }, width: { type: "string", value: "60%" } }, b2: { width: { type: "string", value: "59%" } }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "428dp" }, top: { type: "string", value: "0dp" }, width: { type: "string", value: "89.20%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxProfile: { DNDConfig: null, _height_: { type: "string", value: "130dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "118dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "string", value: "50%" }, children: ["flxDes", "flxEdit"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxProfile", info: null, iscustomlayout: false, isvisible: true, kuid: "c4dc2b30cdda4a94a0ab1703f199fb14", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmProfile", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "90dp" }, isVisible: true, top: { type: "string", value: "260dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, flxUserName: { DNDConfig: null, _height_: { type: "string", value: "220dp" }, _left_: { type: "string", value: "31dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "se2378f36ddf49cbb6fc2b9329ed14a5", _top_: { type: "string", value: "16dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], canUpdateUI: true, centerx: { type: "number", value: "" }, children: ["flxNameLogo", "lblMayaFer", "lblDesCust"], clipbounds: false, containerweight: 100, enablescrolling: true, id: "flxUserName", info: null, iscustomlayout: false, isvisible: true, kuid: "ef538f674ffe4532b97508b5b0e56f0c", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxParent", pf: "frmProfile", responsiveData: { b1: { isVisible: false }, b2: { isVisible: false }, b3: { centerX: { type: "string", value: "50%" }, height: { type: "string", value: "260dp" }, layoutType: 4, left: { type: "string", value: "0dp" }, skin: "s5c170c435234db1acd96030e665a24d", top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snaptogrid: true, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, frmProfile: { "@class": "com.kony.gen.viz.model.container.KVizScrollFlexForm", DNDConfig: null, _margin_: [0, 0, 0, 0], _orientation_: 1, _padding_: [0, 0, 0, 0], _percent_: true, _pxMenuIndex: [2, 1, 7], _skin_: "scf0bb0ac9ac406fad753f56963d9262", _title_: null, addWidgetsdone: false, allboxes: [], android: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, androidwearos: { needAppMenu: false, psp: { windowSoftInputMode: 1 } }, breakpointInfo: { b1: { width: 1366 }, b2: { width: 1024 }, b3: { width: 640 } }, canUpdateUI: true, canvasWidth: 1200, children: ["flxParent"], containerweight: 100, controllerInfo: { default: { channel: "desktop", fileType: "js", name: "frmProfileController" } }, currentBreakpoint: { kuid: "b1", width: 1366 }, currentLocale: "default", desktopweb: { needAppMenu: false }, device: "desktopweb", displayorientation: 1, enabledforidletimeout: false, flxLine3: { DNDConfig: null, __parentReadjusting__: false, _height_: { type: "string", value: "0dp" }, _left_: { type: "string", value: "0dp" }, _margin_: [0, 0, 0, 0], _orientation_: 6, _padding_: [0, 0, 0, 0], _percent_: true, _skin_: "s1e8c158e45a4a859817d34685dccf5e", _top_: { type: "string", value: "0dp" }, _width_: { type: "string", value: "100%" }, allboxes: [], autogrowmode: 0, canUpdateUI: true, children: [], clipbounds: false, containerweight: 100, enablescrolling: true, genericProperties: { centerY: { type: "number", value: "" }, top: { type: "string", value: "80dp" } }, id: "flxLine3", info: null, iscustomlayout: false, isvisible: true, kuid: "cd4d0b2aa5d34b8a84270b9148a20a7c", layouttype: 2, name: "kony.ui.FlexContainer", parent: "flxEmail", pf: "frmProfile", responsiveData: { b3: { centerY: { type: "string", value: "" }, top: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, retainflowhorizontalalignment: false, snapgridsize: 10, snapshot: { md5: "bONT4gmMxH489BfZPOWrx8nxJmM=" }, snaptogrid: true, undoPropsStorage: {}, wType: "FlexContainer", widgetalignment: 1, zindex: 1 }, id: "frmProfile", info: null, initdone: false, inputaccessoryviewtype: 4, ipad: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iphone: { needAppMenu: false, psp: { inputAccessoryViewType: 4 }, titleBar: false }, iscustomlayout: false, isvisible: true, kuid: "ed8d8aff826949adba9fe96011e88e75", layouttype: 2, lblEmail: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, __parentReadjusting__: false, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Email", _top_: { type: "string", value: "0" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, genericProperties: { centerY: { type: "string", value: "50%" }, skin: "s8125c75228c4db7bcc3d3a111329aa2", top: { type: "number", value: "" } }, id: "lblEmail", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "da0e89daaa094cf5a64b957cf6c20ad6", name: "kony.ui.Label", parent: "flxEmail", pf: "frmProfile", responsiveData: { b2: { skin: "s441468afde04f739e9f6d4968f1179f" }, b3: { centerY: { type: "string", value: "" }, top: { type: "string", value: "0" } } }, retaincontentalignment: false, retainflexpositionproperties: false, snapshot: { md5: "2SrfyJwfvF17xiBNOFSPBY1ARSU=" }, tooltip: "", undoPropsStorage: {}, wType: "Label", zindex: 1 }, lblEmailid: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, __parentReadjusting__: false, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "5%" }, _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "maya.fernandes@example.com", _top_: { type: "string", value: "0" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 6, genericProperties: { centerY: { type: "string", value: "50%" }, skin: "sd6c709a84f144d6bd28756038b91e1a", top: { type: "number", value: "" } }, id: "lblEmailid", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "i02eb7bb5294484685a4be5522ec4097", name: "kony.ui.Label", parent: "flxEmail", pf: "frmProfile", responsiveData: { b2: { skin: "s0715085a83646d9935a7f164d9f856a" }, b3: { centerY: { type: "string", value: "" }, top: { type: "string", value: "0" } } }, retaincontentalignment: false, retainflexpositionproperties: false, snapToGrid: true, snapshot: { md5: "OrlV74K8HFziw03j73rRf+OkFQU=" }, tooltip: "", undoPropsStorage: {}, wType: "Label", zindex: 1 }, name: "kony.ui.Form2", needappmenu: false, paddinginpixel: false, platform: "desktopweb", prevDevice: "desktopweb", prevPlatform: "desktopweb", retaincontentalignment: false, retainflexpositionproperties: false, retainscrollposition: false, snapgridsize: 10, snaptogrid: true, titleBarSkin: "sb51bcefd50c4c1c959df14dd1d7d808", titlebar: true, type: 3, vizProps: { globalRespDesignEnabled: false }, wType: "Form" }, lblAddress: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "number", value: "" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "5%" }, _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "42 Residency Road, Bengaluru 560025", _top_: { type: "number", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 6, id: "lblAddress", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c7583e0612c84a0b96c2275e54ff2895", name: "kony.ui.Label", parent: "flxAddress", pf: "frmProfile", responsiveData: { b1: { width: { type: "ref", value: "preferred" } }, b2: { right: { type: "string", value: "0%" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c", width: { type: "string", value: "60%" } }, b3: { centerY: { type: "string", value: "" }, left: { type: "string", value: "0dp" }, right: { type: "string", value: "" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c", top: { type: "string", value: "8%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblBranch: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Branch", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblBranch", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "f1026f20a55d4fe8b20bcc77c69820c3", name: "kony.ui.Label", parent: "flxBranch", pf: "frmProfile", responsiveData: { b2: { skin: "s9262b76be504841ba87554ecac0a21f" }, b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0" }, skin: "s9262b76be504841ba87554ecac0a21f" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblBranchName: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "5%" }, _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Bengaluru \u2014 MG Road", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 6, id: "lblBranchName", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "fc712f9075bd469f914c3fca8fc83d89", name: "kony.ui.Label", parent: "flxBranch", pf: "frmProfile", responsiveData: { b1: { width: { type: "string", value: "75%" } }, b2: { right: { type: "string", value: "0%" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c", text: "Bengaluru \u2014 MG Road", width: { type: "string", value: "70%" } }, b3: { skin: "s1a51eaec25f4a4c917b75867fd4d15c" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblCustDes: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Customer since March 2021", _top_: { type: "string", value: "3%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblCustDes", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b726dd5bb81b436998989e7f67bd6183", name: "kony.ui.Label", parent: "flxCustName", pf: "frmProfile", responsiveData: { b1: { top: { type: "string", value: "60%" } }, b2: { centerX: { type: "string", value: "50%" }, skin: "s9262b76be504841ba87554ecac0a21f", top: { type: "string", value: "60%" } }, b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblCustID: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Customer ID", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblCustID", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "h9b81598e51845d0912a52f95ec4e880", name: "kony.ui.Label", parent: "flxCustId", pf: "frmProfile", responsiveData: { b1: { text: "Customer ID" }, b2: { skin: "s9262b76be504841ba87554ecac0a21f" }, b3: { skin: "s9262b76be504841ba87554ecac0a21f" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDate: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "number", value: "" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "5%" }, _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "12 July 1989", _top_: { type: "number", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 6, id: "lblDate", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "edd9700979884d60812f344c9a068733", name: "kony.ui.Label", parent: "flxDOB", pf: "frmProfile", responsiveData: { b2: { right: { type: "string", value: "0%" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c" }, b3: { centerY: { type: "string", value: "" }, left: { type: "string", value: "0" }, right: { type: "string", value: "" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c", top: { type: "string", value: "8%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDes: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Your personal and contact details", _top_: { type: "string", value: "10dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblDes", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b6ff0619d4234cffa67e411e09dcbb08", name: "kony.ui.Label", parent: "flxDes", pf: "frmProfile", responsiveData: { b2: { skin: "s40b31c9cbf9487ab1dd1bf46e587626" }, b3: { isVisible: false, left: { type: "string", value: "0dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDesCust: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "231dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "191dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblDesCust", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ab5a0639fc504f179bacd2f3fe263ad8", name: "kony.ui.Label", parent: "flxUserName", pf: "frmProfile", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "" }, skin: "s9262b76be504841ba87554ecac0a21f", text: "Customer since March 2021", top: { type: "string", value: "6dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblDOB: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Date of birth", _top_: { type: "number", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblDOB", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "je2c9b7367b447019750e3fbc5731562", name: "kony.ui.Label", parent: "flxDOB", pf: "frmProfile", responsiveData: { b2: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0" }, skin: "s9262b76be504841ba87554ecac0a21f", top: { type: "string", value: "" } }, b3: { centerY: { type: "string", value: "" }, skin: "s9262b76be504841ba87554ecac0a21f", top: { type: "string", value: "9%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblId: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "5%" }, _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "CUS-884210", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 6, id: "lblId", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "g75e8b3c426548a0936b29402ce49025", name: "kony.ui.Label", parent: "flxCustId", pf: "frmProfile", responsiveData: { b2: { right: { type: "string", value: "0%" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c" }, b3: { skin: "s1a51eaec25f4a4c917b75867fd4d15c" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblKYC: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "KYC", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblKYC", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "g5b42c70e85f486d8e4c3e75f74a85db", name: "kony.ui.Label", parent: "flxKYC", pf: "frmProfile", responsiveData: { b2: { skin: "s40b31c9cbf9487ab1dd1bf46e587626" }, b3: { skin: "s9262b76be504841ba87554ecac0a21f", text: "KYC" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblM: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _bottom_: { type: "number", value: "" }, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "21dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "31dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblM", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "dc6f1974e06f4b0b86d98bc9a8770e53", name: "kony.ui.Label", parent: "flxNameLogo", pf: "frmProfile", responsiveData: { b3: { bottom: { type: "string", value: "" }, centerX: { type: "string", value: "50%" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "" }, skin: "s31e7f1382ff429db0af8076cb559608", text: "MF", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMail: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Mobile", _top_: { type: "number", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblMail", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "bacfb5951948444eb8e99c57439e19f1", name: "kony.ui.Label", parent: "flxMail", pf: "frmProfile", responsiveData: { b1: { text: "Email" }, b2: { skin: "s9262b76be504841ba87554ecac0a21f", text: "Email" }, b3: { centerY: { type: "string", value: "" }, skin: "s9262b76be504841ba87554ecac0a21f", text: "Email", top: { type: "string", value: "9%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMailId: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "number", value: "" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "5%" }, _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "+91 98450 11234", _top_: { type: "number", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 6, id: "lblMailId", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ce569d93284f4ad58fe4e412e462bcd6", name: "kony.ui.Label", parent: "flxMail", pf: "frmProfile", responsiveData: { b1: { text: "maya.fernandes@example.com" }, b2: { right: { type: "string", value: "0%" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c", text: "maya.fernandes@example.com" }, b3: { centerY: { type: "string", value: "" }, left: { type: "string", value: "0" }, right: { type: "string", value: "" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c", text: "maya.fernandes@example.com", top: { type: "string", value: "8%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMailingaddress: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Mailing address", _top_: { type: "number", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblMailingaddress", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "c443f4c2433649f681f2af0bdfdfc1df", name: "kony.ui.Label", parent: "flxAddress", pf: "frmProfile", responsiveData: { b2: { skin: "s9262b76be504841ba87554ecac0a21f" }, b3: { centerY: { type: "string", value: "" }, skin: "s9262b76be504841ba87554ecac0a21f", top: { type: "string", value: "9%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMaya: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "number", value: "" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "5%" }, _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "Maya Fernandes", _top_: { type: "number", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 6, id: "lblMaya", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "gdd27591e5414853a8294ccba3ff4487", name: "kony.ui.Label", parent: "flxName", pf: "frmProfile", responsiveData: { b2: { right: { type: "string", value: "0%" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c" }, b3: { centerY: { type: "string", value: "" }, left: { type: "string", value: "0" }, right: { type: "string", value: "" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c", top: { type: "string", value: "5%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMayaFer: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "277dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s514557c6dbd40bcb25c8c7067d216dd", _text_: "Label", _top_: { type: "string", value: "151dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblMayaFer", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ea528376d2f44666bdbe46dce117f366", name: "kony.ui.Label", parent: "flxUserName", pf: "frmProfile", responsiveData: { b3: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "" }, skin: "s31e7f1382ff429db0af8076cb559608", text: "Maya Fernandes", top: { type: "string", value: "20dp" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMayaFernandes: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "number", value: "" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s5716565157e4423a660e03897d1ee1b", _text_: "Maya Fernandes", _top_: { type: "string", value: "5%" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblMayaFernandes", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ccaa5d53792e48d693761b959bbc70ed", name: "kony.ui.Label", parent: "flxCustName", pf: "frmProfile", responsiveData: { b1: { centerX: { type: "string", value: "50%" }, left: { type: "string", value: "" }, skin: "s63fa6b7c6e948c8a0a4aeda33aded9d" }, b2: { centerX: { type: "string", value: "50%" }, skin: "s007f41a3af34efe932653e11f76a8c0", top: { type: "string", value: "5.00%" } }, b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMF: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s31e7f1382ff429db0af8076cb559608", _text_: "MF", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "string", value: "50%" }, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblMF", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a820530e17854adab9c3070c6159f0ea", name: "kony.ui.Label", parent: "flxMF", pf: "frmProfile", responsiveData: { b2: {} }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMobile: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Mobile", _top_: { type: "number", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblMobile", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "ebd01827d75048f99b73678387b9dbeb", name: "kony.ui.Label", parent: "flxMobile", pf: "frmProfile", responsiveData: { b2: { skin: "s9262b76be504841ba87554ecac0a21f" }, b3: { centerY: { type: "string", value: "" }, skin: "s9262b76be504841ba87554ecac0a21f", top: { type: "string", value: "9%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblMobilenum: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "number", value: "" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "5%" }, _skin_: "sd6c709a84f144d6bd28756038b91e1a", _text_: "+91 98450 11234", _top_: { type: "number", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 6, id: "lblMobilenum", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "e01afb10dd9742bebda3af883c24ef0c", name: "kony.ui.Label", parent: "flxMobile", pf: "frmProfile", responsiveData: { b2: { right: { type: "string", value: "0%" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c" }, b3: { centerY: { type: "string", value: "" }, left: { type: "string", value: "0" }, right: { type: "string", value: "" }, skin: "s1a51eaec25f4a4c917b75867fd4d15c", top: { type: "string", value: "8%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblName: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Full Name", _top_: { type: "number", value: "" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 4, id: "lblName", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b943072c7843422e8942b370f999259a", name: "kony.ui.Label", parent: "flxName", pf: "frmProfile", responsiveData: { b2: { skin: "s9262b76be504841ba87554ecac0a21f" }, b3: { centerY: { type: "string", value: "" }, skin: "s9262b76be504841ba87554ecac0a21f", top: { type: "string", value: "30%" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblPersonalDetails: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "45dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s63fa6b7c6e948c8a0a4aeda33aded9d", _text_: "Personal details", _top_: { type: "string", value: "38dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lblPersonalDetails", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "f4ece586efdc444a84d29cd4b00003fc", name: "kony.ui.Label", parent: "flxPersonalInfo", pf: "frmProfile", responsiveData: { b2: { left: { type: "string", value: "41dp" }, top: { type: "string", value: "38dp" } }, b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblProfile: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "0dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "sa09a63f478448d4ace823fb5013f67e", _text_: "Profile", _top_: { type: "string", value: "0dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centerx: { type: "number", value: "" }, centery: { type: "number", value: "" }, containerweight: 100, contentalignment: 4, id: "lblProfile", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "fab98500eda04523b6169736b8a8a6e4", name: "kony.ui.Label", parent: "flxDes", pf: "frmProfile", responsiveData: { b1: { skin: "s87143e906d447fe9eb617c36bdfbbd5" }, b2: { skin: "s89c79a6a6444f5ea951eab885b2df6d" }, b3: { centerX: { type: "string", value: "" }, centerY: { type: "string", value: "50%" }, left: { type: "string", value: "0" }, skin: "sd6c709a84f144d6bd28756038b91e1a", text: "Personal details", top: { type: "string", value: "" } } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lblVerified: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _right_: { type: "string", value: "5%" }, _skin_: "s90796bbc5f74bf0aef47fc8dc92b29f", _text_: "Verified", _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, centery: { type: "string", value: "50%" }, containerweight: 100, contentalignment: 6, id: "lblVerified", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "a417873934094402a23462bb659aac92", name: "kony.ui.Label", parent: "flxKYC", pf: "frmProfile", responsiveData: { b2: { right: { type: "string", value: "0%" }, skin: "s90796bbc5f74bf0aef47fc8dc92b29f" } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 }, lvlDes: { "@class": "com.kony.gen.viz.model.component.KVizLabel", DNDConfig: null, _height_: { type: "ref", value: "preferred" }, _left_: { type: "string", value: "45dp" }, _margin_: [1, 1, 1, 1], _padding_: [0, 0, 0, 0], _skin_: "s8125c75228c4db7bcc3d3a111329aa2", _text_: "Your details as they appear on your account.", _top_: { type: "string", value: "10dp" }, _width_: { type: "ref", value: "preferred" }, _wrapping_: 2, android: { textStyle: { letterSpacing: 0, strikeThrough: false } }, canUpdateUI: true, containerweight: 100, contentalignment: 4, id: "lvlDes", info: null, ipad: { psp: { wrapping: 2 } }, iphone: { psp: { wrapping: 2 } }, iscustomlayout: false, isvisible: true, kuid: "b13cdbaec8534972870b22980c812d44", name: "kony.ui.Label", parent: "flxPersonalInfo", pf: "frmProfile", responsiveData: { b2: { left: { type: "string", value: "41dp" }, skin: "s9262b76be504841ba87554ecac0a21f", top: { type: "string", value: "10dp" } }, b3: { isVisible: false } }, retaincontentalignment: false, retainflexpositionproperties: false, tooltip: "", wType: "Label", zindex: 1 } };

  // saywright/vision/apps/avenzabank/src/controllers/frmProfileController.kjs
  var frmProfileController_default = "define({ \r\n\r\n //Type your controller code here \r\n\r\n });";

  // saywright/vision/apps/avenzabank/src/controllers/frmProfileControllerActions.kjs
  var frmProfileControllerActions_default = "define({});\n";

  // saywright/vision/apps/avenzabank/src/main.jsx
  var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
  app.i18n = i18n_default;
  app.locale = "en_US";
  app.responsive = true;
  modules.sources = window.__vizSources || {};
  for (const [name, config] of Object.entries(window.__vizModuleConfigs || {})) window[name + "Config"] = config;
  var named = (src, name) => src + "\n//# sourceURL=viz/" + name + ".js";
  for (const [name, src] of window.__vizGlobals || []) guard("global script " + name, () => (0, eval)(named(src, "global/" + name)));
  window.__vizSkinByName = { "CopydefBtnNormal0a0d81ed3f7444d": "s581cde1a6474773bd72e9f70157fe0b", "CopydefBtnNormal0a5557b20e63745": "s4f3fa1e1ca4448285ee527ad17e450c", "CopydefBtnNormal0ae317713c0ca4c": "s17d0aff5b264a7eb3b5923944802b7f", "CopydefBtnNormal0afede12408f341": "s124a6ab958049c39c70711fa6026362", "CopydefBtnNormal0b2690c9922ae43": "sfbc977e6c9f43faaa6b94bdcfd94d46", "CopydefBtnNormal0b78168f6ddb240": "seba8ffdfed844379bfba7d39477e9b4", "CopydefBtnNormal0e65199e104e94b": "sdc221878367432ca8898524d283cb24", "CopydefBtnNormal0e7bb2c9c37df4e": "s861076139004c02acde8b657bba0781", "CopydefBtnNormal0f0985a56c1c541": "sbed326dbd584462a324621efb765d26", "CopydefBtnNormal0fa9cb29f04d048": "s06e5fb48c4a4adc967d37366493ed66", "CopydefBtnNormal0g1e6c71a5f5f4b": "s42613f00f78467499c3159b9d54b80c", "CopydefBtnNormal0gf10b69669a742": "s9b23aca6e72468e83549b6941cfab26", "CopydefBtnNormal0icb935ab15454e": "scd1a3b2c90f4d95bcf7c081bd42b93c", "CopydefBtnNormal0j77e8f6895b24e": "sb550693e12b4fcf9c317e9583349c41", "CopydefLabel0a30e15efa27544": "s710cc0ac4c943b5b2377aa825f61a0b", "CopydefLabel0a402b768501147": "s4efa5e3feb349ddb2a3d247369eadbd", "CopydefLabel0abd0b01dcb2342": "s9430d34bd114c11a208452af5908be5", "CopydefLabel0ac07d4ebd8e448": "sf89769263494ed1953e1b3660e9c51f", "CopydefLabel0ac82cca7bc7349": "s647803293f940dbb4cf104c69459959", "CopydefLabel0b0b66afa195248": "sb894a0dfa5f425da2a4bf8b91cd5d07", "CopydefLabel0b1677eaed3754d": "s275f04fb97d4567ae3890514dfea268", "CopydefLabel0b22e47146f7f4a": "s4c9376b9c944c669f6a6a7cf4a31c3d", "CopydefLabel0b4bbdc0ef14241": "sb29af0dcae04e1fa8b02a44cc52f4bb", "CopydefLabel0b5e6e40cd4ca4c": "s87f8f7ce24e45ac84942f0ad86ae0e7", "CopydefLabel0b6f5019be09449": "s79a227f3c624166a5c1b2d87c1c2cca", "CopydefLabel0b73cbc39d9754c": "s6dc56c276e048c9b6e6d098d4f835da", "CopydefLabel0b958727ed83141": "s64e265351554e188fe6bb106e5c7dcd", "CopydefLabel0ba27824920aa42": "s026f1b6ee9e4cd4ab74d98393e4fd30", "CopydefLabel0bc00db53951640": "sc4768d3da2241728c76d702a44882c7", "CopydefLabel0be13ab1080f348": "s2b14763640c43f997791cb8ccb3227d", "CopydefLabel0c08cfe8ca13b4b": "s86bd078fcf54f3f98d5f5fdcc67a1b1", "CopydefLabel0c13e141c115945": "s1fcc9daa0f14ed98170b86a23013806", "CopydefLabel0c254d69e69e941": "sfe3fb0b0b224d27bfd1eb9d074e3f75", "CopydefLabel0c3c9764bd3c74f": "sf1e6221bf7d49c4b774ee4777621924", "CopydefLabel0c4a8fec8b9624a": "s7db257b9c5048118915cc036e71e37a", "CopydefLabel0c7139e42ff7c48": "sb20e1968c7943e7ae22c09a9d72ae6e", "CopydefLabel0c7937e5e36bd40": "sef21956edcb4c7ca51ad843a3027ac3", "CopydefLabel0ce5b8b0bf7f84e": "s50f6d65939749bdbdfb44bdf94b9ad1", "CopydefLabel0d7056cf42c9e46": "s85047d0cf3b4d749401bac3d36439f8", "CopydefLabel0d8a44e27438545": "s4c961a346f64c7995676ed41df90b12", "CopydefLabel0d9c36a8cc7b24d": "sbc0ea51a52643f5a14bf841f8276c29", "CopydefLabel0dd2a5ead19054c": "sef5792603ef4ad5ba6c0b3ec56ec3a6", "CopydefLabel0dfd9cd9a952d46": "s846db32ce324cfc9c1a2e16010e3f82", "CopydefLabel0e3bcb53ad6ad42": "s257941a14984a93a323e7f6dee37489", "CopydefLabel0e6892d8c9ea34c": "s008ab2959d04c549755054db8f1adf6", "CopydefLabel0e6f60e61ec344d": "s3604fd5c5954525bd54fed15e280880", "CopydefLabel0ebdd07682b8c4e": "s8915f96e32f41478267ab8f7e42ff52", "CopydefLabel0f806ed6ed0af43": "s30c5c4c47054a7cb0fda259da242e03", "CopydefLabel0fc502290290e44": "sc78b4e3c3ae4679a9d2343ecc610457", "CopydefLabel0g3ca6c356c1746": "s5d88cdd8e204be58a71bf756b8615b5", "CopydefLabel0h7b888e0f97a48": "s526892cfb9a4babb919421495ac10f3", "CopydefLabel0heac53a79ef44e": "sa09a63f478448d4ace823fb5013f67e", "CopydefLabel0i48a73cd57b348": "sa5c42e031f14861aaead9ccccb1e8b0", "CopydefLabel0i4dcdbb062fe44": "s8d9c2cf01cc4e498f512ba6825a14ef", "CopydefLabel0i514040be4c243": "s5e3271e2e324d0f9397d9634cf60893", "CopydefLabel0i87441492b0940": "s2b16e05d5a942c5b8d10ff856b3db19", "CopydefLabel0j4b2596f3ab741": "scf4cacb8d9842ccbd1b2dab2b11126c", "CopydefListBoxNormal0a12f8465989c4d": "s9f7e12e0afa4499a3851d31f683643e", "CopydefListBoxNormal0a82a44aff7e74f": "s85b8bbc63ab463b81d809affd988d0e", "CopydefListBoxNormal0d0d0b50170a247": "sa8dea55a7164584b4dd968d3e671fff", "CopydefListBoxNormal0d9d942a6ad864b": "sb567beab904487c9f413d5c78c3c6ae", "CopydefListBoxNormal0i5cb7a22f61b48": "s8e09073a92047c7b5eb2f084105c084", "CopydefRichTextNormal0a4120516dac941": "sc09980996c64bfcbd20ab67f7423d33", "CopydefTextBoxNormal0d77bd26223a145": "saad5b49be234659bb0889b68b978820", "CopydefTextBoxNormal0eaf25455ad3d48": "s55b3ce3d23048b4866297b47fbea925", "CopydefTextBoxNormal0hbd5f23d6fc145": "sf26e6313d6b41439d056d22cd5ce7af", "CopydefTextBoxNormal0heb2a21ebdf147": "s3d8eedf291a49beb4b60fc49d61c601", "CopydefTextBoxNormal0i21a18f066c142": "s4275e98220a4d4980535bd1ef9a707b", "CopydefTextBoxNormal0i8ca863f45734d": "s3e1fb26299e427299060cb91085ad65", "CopydefTextBoxNormal0jb4cd01c85f54a": "s4befeef91c549a3a02d2e009d5a71f5", "CopysknflxE0bbc41ecc63ec47": "se13a48586784bed82e34e51ade27e47", "CopysknflxE0h8a78cce7e574b": "s490f5bd30e448c5af2a25ec87884025", "CopysknlblDescription0a24fe32376df42": "s441468afde04f739e9f6d4968f1179f", "CopysknLblDescription0a5e41a9efff54f": "s358c3e83c90414ca9d857f87dc1a7c1", "CopysknlblDescription0aaa86948098e41": "s3d6a152421646e4b9d4d68e9291dcb1", "CopysknlblDescription0b0c7ba7b7fe442": "s3358049fcbd479a866de16dbded47d5", "CopysknlblDescription0b10bfc8e9b834b": "s2e7e52ab85b401da8f763a5dae29ce1", "CopysknlblDescription0b5b219635d9d45": "s15f8f11a5284c8ca3f6a51c2c46878d", "CopysknlblDescription0b6df324c89a54a": "s66881c4389f45ebb5e95b94edb95653", "CopysknlblDescription0bd8328d6832242": "s90adfbdffd8468f8ffaf61aee70495b", "CopysknlblDescription0d026a894a65644": "s05479f132dd4294ba1dcd349f2e3dba", "CopysknlblDescription0d0fa5a65fcb549": "s2c9f3ebcb624446aeaa0e936a07e0c1", "CopysknlblDescription0de6f5a4da6dc4b": "s29d9d3cf0414569b5ea1b9c0e002295", "CopysknlblDescription0df1066b822e946": "s411785ec2b9426a8b7688c590993501", "CopysknlblDescription0e0e924d4d1e244": "s9d1178f60f6473284f0ce225b8e2f2b", "CopysknlblDescription0ec5d7cc074784e": "s29566873ab34751b1cf4a672b62aa0e", "CopysknlblDescription0fa2f558fe81d44": "scf6dff36c6e4a9189af9299cdd3a68d", "CopysknlblDescription0fd87e000d6674b": "s3e257f01d784074af176f933c3ca9ca", "CopysknlblDescription0g66d14618ed94a": "s41059091947477c81244d41c784e404", "CopysknlblDescription0g9511a4400b047": "s751233b86ba4b1593ad85c76b3e90f3", "CopysknLblDescription0h9c0956a278e4f": "s8d4bfcdbb1a4329bf42006fee738d39", "CopysknLblDescription0ha0627e295394b": "s0ed6f3615aa440b958fb37fd4564df0", "CopysknlblDescription0hcc3c6b1fd6c4a": "sb411455aba54a149bc80d928d4e5307", "CopysknlblDescription0ic90ca4de1714a": "s8b6ce37bfed4e3199f255423bfecfbc", "CopysknlblDescription0j562c45054f94b": "s17f55eccd5e4f47a136aa0845d14cf4", "CopysknlblDescription0j5a4a31311704b": "s261d648f81341c8865adda72cdc9782", "Copysknlblffffff0d7ac6f8900474b": "s17357821290427f9713b897c320e9bf", "CopysknlblHeading0a9af929039c444": "sa9c2e1767814cdd969cbf5b230a8915", "CopysknlblHeading0cc18f261f0f04d": "sca048000aec4d5d8995c6c3111970bd", "CopysknlblHeading0d0f147a4d5644c": "s61e8b65f4504a1f92a0ee4620163f12", "CopysknlblHeading0e8e5ae6cbf8148": "s3f8b9433a934e8b95656f244f6fa8c3", "CopysknlblHeading0ec299f1b634347": "s0715085a83646d9935a7f164d9f856a", "CopysknlblHeading0ic4336b9829946": "s9c588b44a2140ff867ccc2e08a4de45", "CopysknlblHeading0j00cb0c97d0341": "safdb57f26bb402abd55d4041faae8d9", "Copysknlblinsidebox0j2263608898f46": "s5b19969b7b74562a01bf1c7c0a3c671", "CopysknlblSignIn0a3ea94dbb0254d": "s16a316fbda341a88236da27f40a7b34", "CopysknlblSignIn0bc165012852840": "s3ce57d8e1e94535bc9674f6799b12d7", "CopysknlblSignIn0j881dc701f4445": "sf670f03652544ca8fc1116b225317c9", "CopysknlblSubheading0a055d30ffe704a": "sa5fcc76edea40bbaf3be56ff13579f3", "CopysknlblSubheading0a53a9f31d1b94c": "s6552f1b5f4e4822b108fee16af70bb3", "CopysknlblSubheading0a6db960209e741": "s4ec1ae9685d4d46b6d2366753e762d8", "CopysknlblSubheading0b287a28488aa41": "sc06e2b3aff148b9be475015fcdf8c04", "CopysknlblSubheading0b2ac1fe30c0a4d": "s6bfd1fcaf714c86b5f54af639baff05", "CopysknlblSubheading0b7369a5f38ff4f": "sf583800d70a47b6b31a5caf9827d0a2", "CopysknlblSubheading0b97a36470d2842": "s00f95126c0846d8ab5c187d75590beb", "CopysknlblSubHeading0c076125de3f244": "s627c0c6209e4e088b68c0eeee9ae5e4", "CopysknlblSubheading0cc39d3f5a07543": "s38194df35a5460cba7b1088c6839acc", "CopysknlblSubheading0d1263353f6e94a": "s85373afb6664de5adbc35a63f01ae4c", "CopysknlblSubheading0db8b9737991347": "s5b4a51a5c7d400d8dd52d7a8683198c", "CopysknlblSubheading0e2e5b7a641ba42": "s2a8d21baf7c432b90ac54c5aa40eda5", "CopysknlblSubheading0eece7d5dcbba41": "s15f13f8098f4b30886d80afcddc795d", "CopysknlblSubheading0hde6913084fd43": "s723132a99ab447592b92145430fa0d9", "CopysknlblSubheading0ia8eb05c4fd743": "s430720a17854295b3e2387868a655de", "CopysknlblSubheading0j612b683d90b4f": "sd77ce6491cd46958049efd21d43136f", "CopyslFbox0a0c4eb5a93bb41": "s94ff17797e346af9e9305c13db24ac1", "CopyslFbox0a7856aec039c4d": "sbe80d2570b646acaebf1bbe7c1c7772", "CopyslFbox0ac3676890c5041": "sf30ca9da3a14d01b8c9f0a7576d51aa", "CopyslFbox0ad85847653fd46": "sb5eab200a9c4035ae107361aad3bbde", "CopyslFbox0b192eff7a66f49": "sc1f072aaa394d00b455576ff4f77978", "CopyslFbox0b396302fd7cc44": "s60ed17f383d40479748b9617bc6ee26", "CopyslFbox0b3bbf3129ed34f": "s5999d2a9e72470a9c2ba451981acc46", "CopyslFbox0b469d9118cd447": "sb5b589e5c734d5c9369126d978ec9d4", "CopyslFbox0b4c7ee1ee3e44f": "sd95e9da1bb5482caccbdd9cde2b95ef", "CopyslFbox0b56e85092e244f": "s084ccd8583a4fbdb40ac0c947ac78c6", "CopyslFbox0bb493771c5f743": "s6c5de93befa4cd4b55f51882763f18c", "CopyslFbox0bccb91c59ac241": "scf8a74785d04b3f8a5b9b14df0d5c1d", "CopyslFbox0c1b50c86b7514d": "s1e8c158e45a4a859817d34685dccf5e", "CopyslFbox0c242f9866c5248": "sa5ecb9419d34124afc660a0b77f0e08", "CopyslFbox0c3b38a9ba5ed4c": "s682b4dc50d946efb6007b37d9adb85f", "CopyslFbox0c6834cd9b7a746": "sd1b928a8d104f599eea8198c477c518", "CopyslFbox0cada837ccabc4c": "s0476a2dbda8422593024a9df7917965", "CopyslFbox0cd61d3caff674f": "sda5360f15fd4211b34801771a3df107", "CopyslFbox0cf62699586c744": "sf13a3d3d4cb4937a6752a1aacaf7351", "CopyslFbox0d012d51f212148": "s10b40c197004002b4c3a80645d36600", "CopyslFbox0d2ef367b407745": "s5b6cf9ad9b041a8a878c32694be9a5d", "CopyslFbox0d3b0a73863ef41": "se613248e060409c96cc5f12720cd7c5", "CopyslFbox0d47b2d92816e4c": "sd291bf00394445786ebf7276eefdfdc", "CopyslFbox0d4ab94adb9a342": "s48b3bb9fb1c4bbca4f2f3e9fb8a5eac", "CopyslFbox0d86b8c8983af4c": "s70bc855a44d417c96b1291c8bc6cbd4", "CopyslFbox0d91ffe6173984c": "sa0010b315b34201824b944816f0034b", "CopyslFbox0db1eda77f80c40": "sb3c68fcf14f4ae5a626e0458804aec4", "CopyslFbox0dc67fb60ad164b": "s8b8e856a5d1449889c3a37865fae271", "CopyslFbox0de7284c1f6c04e": "s8820a3a17c0432da7e6ee8e88a0013f", "CopyslFbox0e142d86d9d5243": "s85ae3a40d144bbaba053cd63123ed99", "CopyslFbox0e2826642c09a4e": "sa861ee0b6a847c8b6c4cd37390be648", "CopyslFbox0e432c92def2f42": "sd3c6258ef1a45f28d58ac401c054cc3", "CopyslFbox0e6880fe229444b": "s7fa03fcdd674248a9623399190b4d1b", "CopyslFbox0eb96a2121c3542": "s1131bac98594fa4accdbcbc02acd9c8", "CopyslFbox0eda14eafd92247": "s11bf18893664ac29c8b1430c3229a09", "CopyslFbox0f324fbaf2f0d40": "s2f1eb0f0f39464787df00292ffbe2d4", "CopyslFbox0f48cecf62bf944": "sa1f62146cd84171b2ad3473f39ad2da", "CopyslFbox0f5683737927a44": "scb163df54f445b6a1f0dfeb161c7224", "CopyslFbox0f6494d966ba240": "se1aa3efcca242688eecbd182a52b37e", "CopyslFbox0f6c9a001956743": "se80a56ca92345239245f90e26b6b50c", "CopyslFbox0f8591aefc7e74c": "s71b0c210d884365bdee50784b85fbbf", "CopyslFbox0fac8525238ca47": "s118a4ccff5b438b947010d95353c0e8", "CopyslFbox0fbada40a0cae49": "s4240a3b511d4946ad719ee3edaacad5", "CopyslFbox0fc1284e4126246": "s3d53a7106c4439581743540eccef5d2", "CopyslFbox0g65a0021390641": "sa8a12b983e84fff8d45b6348388a7ac", "CopyslFbox0g86f15b4a96841": "sabf41c246f145d483705b980f1c328d", "CopyslFbox0gdffc0cf3c7346": "sb3fd1475d9e451aa8aa5f29ecb7ee0f", "CopyslFbox0gecb469b2a3642": "s84cf0f2e69d4550935c21ed36781b39", "CopyslFbox0gee56fcaa33843": "sc3dc900ab94426eb6c9d640f6471344", "CopyslFbox0gf274345b8b646": "s144dc64e9ce49f2812151ff642429b7", "CopyslFbox0h8c6e6f6de6c40": "sd97bc3b79c8496ea637c2c23ac89636", "CopyslFbox0h9b05a33e69142": "sa285ba8be344aa090521141baf96256", "CopyslFbox0he908eb7adf244": "seca0cee83f649fd84e05404dfeb0e76", "CopyslFbox0i822d67d38604b": "s8fe9f4379eb4660b6d379e750c20ed9", "CopyslFbox0ia3ce11db3d54c": "sb5a3494e1df469daa1041a00a5ac052", "CopyslFbox0iacd6097bcd74b": "s63b319eebad4a6e9bd67859cee2b3c3", "CopyslFbox0if9f55cc7e3141": "s4c40ad9b8c8453980a72213c3c69f12", "CopyslFbox0j73a0c5ebdc549": "s9d266d142a947819103c7ed67145f25", "CopyslFbox0jb3921d1abba40": "s34da7f84e074a969832f982708badbc", "CopyslFbox0jc9d97a15a5a44": "s81aaa1687934ef48a882c2d9b1b48eb", "CopyslFbox0jdef1006db5344": "s7ecac1b6d2241b589303a356df4710c", "defBtnFocus": "sebb8da9cae845b7937327af2fecec1c", "defBtnNormal": "sb52da56f1d346c89ce95ad187c57d56", "defLabel": "s9a3f745894c453a98d4febf9fd76b62", "defLabel0d76a6a1a81ad41": "sbd85dd3539640be8899d0e2d87b2a25", "defListBoxFocus": "s253a8de773e491b8b80a3ce92e9515e", "defListBoxNormal": "sb55aafa7d074caaa8778956b173389d", "defTextBoxFocus": "s595285064c045fcbfbe43f9c8971b96", "defTextBoxNormal": "s2456d373d8b461d8b983cb96af0409c", "defTextBoxPlaceholder": "seb7ade005c04622a6730983f00a34fe", "sbnbtn15577d": "sf2a206073ed405d957a82837cc0d0f8", "skbflx5b6b7a5px": "sa8a5f0c9e3a4beea568f2667856ad49", "skbflxRadio15577D": "s50fbea34e464acd87fabfb7b2093b1c", "sknbtn15577d": "s100c6d0bc2f41a0b209a9e7a947df0d", "sknBtnContinue": "s01575501bae4b55b991c903e35395e4", "sknbtnffffff": "s389f87431b74dcc8a7ae9599d53e8de", "sknCal5b6b7a": "sd728793f0d2459d8c74bfac2bd17400", "sknDesc5b6b7a10px": "s0ed9024401248308ec5d025defba506", "sknflx00000020px": "sdccf88dd4634d8986e2b78ffbf3f6e6", "sknflx0f2233": "s5c170c435234db1acd96030e665a24d", "sknflx15577d": "s5b2a204415149148873029d59dea60d", "sknflx5b6b7a10px": "s019fa5a22174c24aad3a7a51091d1e1", "sknflxBorder15577D": "s0408e2a402741c3926ac70df4f37f2b", "sknflxButton5b6b7a": "s78078be127041069ced8895628e0e61", "sknflxE3E9EE": "s8e1bf97b36c425ba35106913974a1a1", "sknflxe8ecef": "se590c09220e4e5da7bf6f72d6887a41", "sknflxe8ecefborder20px": "sf883e9d82b542d0a532ffdcc045917a", "sknflxHeaderBorder5b6b7a20px": "s01debcdc3e04d3b88e4597f0ae2e20c", "sknflxLinee8ecef1px": "sa9fd17bede247b7a8d5fdb43b5e31c2", "sknlbHeading0f223325pxBold": "s007f41a3af34efe932653e11f76a8c0", "sknlbl15577d17px": "s08c5089316c4e9d9e90ce20a557e0f7", "sknlbl33333325px": "s678e67203b04379bfa735403422e8a6", "sknlblAvenza0f223337pxBold": "s77dc93446fb437892166de5d8f60e94", "sknlblBank15577d37pxBold": "s725c5d9d7b94b1bb92915a796c3f701", "sknLblDescription": "sa27ad141bcf4dddbf9335594f452b79", "sknlblDescription5b6b7a180x": "sf512a7d8fad490e8d3ade16cb54e86b", "sknlblDescription5b6b7a18px": "s40b31c9cbf9487ab1dd1bf46e587626", "sknlblDescription5b6b7a20px": "s8125c75228c4db7bcc3d3a111329aa2", "sknlblDescriptionMobile0f223317pxBold": "s1a51eaec25f4a4c917b75867fd4d15c", "sknlblDescriptionMobile5b6b7a17px": "s9262b76be504841ba87554ecac0a21f", "sknlblffffff20px": "s456569a8be94341ba351883398719cf", "sknlblffffff25px": "s6b29a9ae55347f1bd4149d18e9e94dd", "sknlblffffff30px": "s31e7f1382ff429db0af8076cb559608", "sknlblFFFFFF55px": "s3530c1e21634777900e0c65e9bc9253", "sknlblHeading0f223318pxbold": "sa672bb78ac248f5a18a75c81ca5cd5c", "sknlblHeading0f223320px": "sd6c709a84f144d6bd28756038b91e1a", "sknlblinsidebox": "s37e63e9b33a4cef9d70598666249c37", "sknLblRowHeading": "s987aa8f3684485495e5771ed43b7539", "sknlblSignIn0f223330pxBold": "s5716565157e4423a660e03897d1ee1b", "sknLblStrip": "s52ff568c6624bde8beb0b52c7121ae4", "sknlblSubheading00000015px": "s9ec0f34ba8348f0a2a60728db730c88", "sknlblSubheading0f223325px": "s63fa6b7c6e948c8a0a4aeda33aded9d", "sknlblSubHeading0f223325pxBold": "secfc18b873d439fa187d227127e8d7f", "sknlblSubHeading15577d18pxBold": "s90796bbc5f74bf0aef47fc8dc92b29f", "sknlblSubHeading15577d25pxBold": "s9f3539e8534492d8af6999b0d54a52a", "sknLblTimeStamp": "sc855e0c99df47afbb39e13fe8b04ad8", "sknlblTitle0f223335pxBold": "s89c79a6a6444f5ea951eab885b2df6d", "sknlblTitle0f223340px": "s87143e906d447fe9eb617c36bdfbbd5", "sknSampleRowTemplate": "s941714718f24905bf858e0717bc9292", "sknSampleSectionHeaderTemplate": "s4bc8a6f1e444bfc9d4e2d4e03c6af19", "sknSectionHeaderLabelSkin": "seeba50b9c744a05b4e096f25998746c", "skntbx5b6b7a15px": "s04153e6847d48feba2812200e6e629d", "skntbx5b6b7a20px": "s10d9c1ec12d41ed82f126767474ca85", "slCalendar": "s9f7e205da1e4c1d8d8dc2e8fb9c7899", "slDynamicNotificationForm": "sfa1032f22d74a53bac85d5dcfc89246", "slFbox": "se2378f36ddf49cbb6fc2b9329ed14a5", "slForm": "scf0bb0ac9ac406fad753f56963d9262", "slImage": "s93be810a54d41cb9973782399707034", "slSplashiOS": "sfc61891ae01403284e37ad340db0ede", "slStaticNotificationForm": "sf38b09cb0b6420eaa45688ef2ae2aeb", "slTitleBar": "sb51bcefd50c4c1c959df14dd1d7d808", "slWatchForm": "s65544694c444d87b53d8d8a10bec747" };
  window.__vizSkinKnown = /* @__PURE__ */ new Set(["s581cde1a6474773bd72e9f70157fe0b", "s4f3fa1e1ca4448285ee527ad17e450c", "s17d0aff5b264a7eb3b5923944802b7f", "s124a6ab958049c39c70711fa6026362", "sfbc977e6c9f43faaa6b94bdcfd94d46", "seba8ffdfed844379bfba7d39477e9b4", "sdc221878367432ca8898524d283cb24", "s861076139004c02acde8b657bba0781", "sbed326dbd584462a324621efb765d26", "s06e5fb48c4a4adc967d37366493ed66", "s42613f00f78467499c3159b9d54b80c", "s9b23aca6e72468e83549b6941cfab26", "scd1a3b2c90f4d95bcf7c081bd42b93c", "sb550693e12b4fcf9c317e9583349c41", "s710cc0ac4c943b5b2377aa825f61a0b", "s4efa5e3feb349ddb2a3d247369eadbd", "s9430d34bd114c11a208452af5908be5", "sf89769263494ed1953e1b3660e9c51f", "s647803293f940dbb4cf104c69459959", "sb894a0dfa5f425da2a4bf8b91cd5d07", "s275f04fb97d4567ae3890514dfea268", "s4c9376b9c944c669f6a6a7cf4a31c3d", "sb29af0dcae04e1fa8b02a44cc52f4bb", "s87f8f7ce24e45ac84942f0ad86ae0e7", "s79a227f3c624166a5c1b2d87c1c2cca", "s6dc56c276e048c9b6e6d098d4f835da", "s64e265351554e188fe6bb106e5c7dcd", "s026f1b6ee9e4cd4ab74d98393e4fd30", "sc4768d3da2241728c76d702a44882c7", "s2b14763640c43f997791cb8ccb3227d", "s86bd078fcf54f3f98d5f5fdcc67a1b1", "s1fcc9daa0f14ed98170b86a23013806", "sfe3fb0b0b224d27bfd1eb9d074e3f75", "sf1e6221bf7d49c4b774ee4777621924", "s7db257b9c5048118915cc036e71e37a", "sb20e1968c7943e7ae22c09a9d72ae6e", "sef21956edcb4c7ca51ad843a3027ac3", "s50f6d65939749bdbdfb44bdf94b9ad1", "s85047d0cf3b4d749401bac3d36439f8", "s4c961a346f64c7995676ed41df90b12", "sbc0ea51a52643f5a14bf841f8276c29", "sef5792603ef4ad5ba6c0b3ec56ec3a6", "s846db32ce324cfc9c1a2e16010e3f82", "s257941a14984a93a323e7f6dee37489", "s008ab2959d04c549755054db8f1adf6", "s3604fd5c5954525bd54fed15e280880", "s8915f96e32f41478267ab8f7e42ff52", "s30c5c4c47054a7cb0fda259da242e03", "sc78b4e3c3ae4679a9d2343ecc610457", "s5d88cdd8e204be58a71bf756b8615b5", "s526892cfb9a4babb919421495ac10f3", "sa09a63f478448d4ace823fb5013f67e", "sa5c42e031f14861aaead9ccccb1e8b0", "s8d9c2cf01cc4e498f512ba6825a14ef", "s5e3271e2e324d0f9397d9634cf60893", "s2b16e05d5a942c5b8d10ff856b3db19", "scf4cacb8d9842ccbd1b2dab2b11126c", "s9f7e12e0afa4499a3851d31f683643e", "s85b8bbc63ab463b81d809affd988d0e", "sa8dea55a7164584b4dd968d3e671fff", "sb567beab904487c9f413d5c78c3c6ae", "s8e09073a92047c7b5eb2f084105c084", "sc09980996c64bfcbd20ab67f7423d33", "saad5b49be234659bb0889b68b978820", "s55b3ce3d23048b4866297b47fbea925", "sf26e6313d6b41439d056d22cd5ce7af", "s3d8eedf291a49beb4b60fc49d61c601", "s4275e98220a4d4980535bd1ef9a707b", "s3e1fb26299e427299060cb91085ad65", "s4befeef91c549a3a02d2e009d5a71f5", "se13a48586784bed82e34e51ade27e47", "s490f5bd30e448c5af2a25ec87884025", "s441468afde04f739e9f6d4968f1179f", "s358c3e83c90414ca9d857f87dc1a7c1", "s3d6a152421646e4b9d4d68e9291dcb1", "s3358049fcbd479a866de16dbded47d5", "s2e7e52ab85b401da8f763a5dae29ce1", "s15f8f11a5284c8ca3f6a51c2c46878d", "s66881c4389f45ebb5e95b94edb95653", "s90adfbdffd8468f8ffaf61aee70495b", "s05479f132dd4294ba1dcd349f2e3dba", "s2c9f3ebcb624446aeaa0e936a07e0c1", "s29d9d3cf0414569b5ea1b9c0e002295", "s411785ec2b9426a8b7688c590993501", "s9d1178f60f6473284f0ce225b8e2f2b", "s29566873ab34751b1cf4a672b62aa0e", "scf6dff36c6e4a9189af9299cdd3a68d", "s3e257f01d784074af176f933c3ca9ca", "s41059091947477c81244d41c784e404", "s751233b86ba4b1593ad85c76b3e90f3", "s8d4bfcdbb1a4329bf42006fee738d39", "s0ed6f3615aa440b958fb37fd4564df0", "sb411455aba54a149bc80d928d4e5307", "s8b6ce37bfed4e3199f255423bfecfbc", "s17f55eccd5e4f47a136aa0845d14cf4", "s261d648f81341c8865adda72cdc9782", "s17357821290427f9713b897c320e9bf", "sa9c2e1767814cdd969cbf5b230a8915", "sca048000aec4d5d8995c6c3111970bd", "s61e8b65f4504a1f92a0ee4620163f12", "s3f8b9433a934e8b95656f244f6fa8c3", "s0715085a83646d9935a7f164d9f856a", "s9c588b44a2140ff867ccc2e08a4de45", "safdb57f26bb402abd55d4041faae8d9", "s5b19969b7b74562a01bf1c7c0a3c671", "s16a316fbda341a88236da27f40a7b34", "s3ce57d8e1e94535bc9674f6799b12d7", "sf670f03652544ca8fc1116b225317c9", "sa5fcc76edea40bbaf3be56ff13579f3", "s6552f1b5f4e4822b108fee16af70bb3", "s4ec1ae9685d4d46b6d2366753e762d8", "sc06e2b3aff148b9be475015fcdf8c04", "s6bfd1fcaf714c86b5f54af639baff05", "sf583800d70a47b6b31a5caf9827d0a2", "s00f95126c0846d8ab5c187d75590beb", "s627c0c6209e4e088b68c0eeee9ae5e4", "s38194df35a5460cba7b1088c6839acc", "s85373afb6664de5adbc35a63f01ae4c", "s5b4a51a5c7d400d8dd52d7a8683198c", "s2a8d21baf7c432b90ac54c5aa40eda5", "s15f13f8098f4b30886d80afcddc795d", "s723132a99ab447592b92145430fa0d9", "s430720a17854295b3e2387868a655de", "sd77ce6491cd46958049efd21d43136f", "s94ff17797e346af9e9305c13db24ac1", "sbe80d2570b646acaebf1bbe7c1c7772", "sf30ca9da3a14d01b8c9f0a7576d51aa", "sb5eab200a9c4035ae107361aad3bbde", "sc1f072aaa394d00b455576ff4f77978", "s60ed17f383d40479748b9617bc6ee26", "s5999d2a9e72470a9c2ba451981acc46", "sb5b589e5c734d5c9369126d978ec9d4", "sd95e9da1bb5482caccbdd9cde2b95ef", "s084ccd8583a4fbdb40ac0c947ac78c6", "s6c5de93befa4cd4b55f51882763f18c", "scf8a74785d04b3f8a5b9b14df0d5c1d", "s1e8c158e45a4a859817d34685dccf5e", "sa5ecb9419d34124afc660a0b77f0e08", "s682b4dc50d946efb6007b37d9adb85f", "sd1b928a8d104f599eea8198c477c518", "s0476a2dbda8422593024a9df7917965", "sda5360f15fd4211b34801771a3df107", "sf13a3d3d4cb4937a6752a1aacaf7351", "s10b40c197004002b4c3a80645d36600", "s5b6cf9ad9b041a8a878c32694be9a5d", "se613248e060409c96cc5f12720cd7c5", "sd291bf00394445786ebf7276eefdfdc", "s48b3bb9fb1c4bbca4f2f3e9fb8a5eac", "s70bc855a44d417c96b1291c8bc6cbd4", "sa0010b315b34201824b944816f0034b", "sb3c68fcf14f4ae5a626e0458804aec4", "s8b8e856a5d1449889c3a37865fae271", "s8820a3a17c0432da7e6ee8e88a0013f", "s85ae3a40d144bbaba053cd63123ed99", "sa861ee0b6a847c8b6c4cd37390be648", "sd3c6258ef1a45f28d58ac401c054cc3", "s7fa03fcdd674248a9623399190b4d1b", "s1131bac98594fa4accdbcbc02acd9c8", "s11bf18893664ac29c8b1430c3229a09", "s2f1eb0f0f39464787df00292ffbe2d4", "sa1f62146cd84171b2ad3473f39ad2da", "scb163df54f445b6a1f0dfeb161c7224", "se1aa3efcca242688eecbd182a52b37e", "se80a56ca92345239245f90e26b6b50c", "s71b0c210d884365bdee50784b85fbbf", "s118a4ccff5b438b947010d95353c0e8", "s4240a3b511d4946ad719ee3edaacad5", "s3d53a7106c4439581743540eccef5d2", "sa8a12b983e84fff8d45b6348388a7ac", "sabf41c246f145d483705b980f1c328d", "sb3fd1475d9e451aa8aa5f29ecb7ee0f", "s84cf0f2e69d4550935c21ed36781b39", "sc3dc900ab94426eb6c9d640f6471344", "s144dc64e9ce49f2812151ff642429b7", "sd97bc3b79c8496ea637c2c23ac89636", "sa285ba8be344aa090521141baf96256", "seca0cee83f649fd84e05404dfeb0e76", "s8fe9f4379eb4660b6d379e750c20ed9", "sb5a3494e1df469daa1041a00a5ac052", "s63b319eebad4a6e9bd67859cee2b3c3", "s4c40ad9b8c8453980a72213c3c69f12", "s9d266d142a947819103c7ed67145f25", "s34da7f84e074a969832f982708badbc", "s81aaa1687934ef48a882c2d9b1b48eb", "s7ecac1b6d2241b589303a356df4710c", "sebb8da9cae845b7937327af2fecec1c", "sb52da56f1d346c89ce95ad187c57d56", "s9a3f745894c453a98d4febf9fd76b62", "sbd85dd3539640be8899d0e2d87b2a25", "s253a8de773e491b8b80a3ce92e9515e", "sb55aafa7d074caaa8778956b173389d", "s595285064c045fcbfbe43f9c8971b96", "s2456d373d8b461d8b983cb96af0409c", "seb7ade005c04622a6730983f00a34fe", "sf2a206073ed405d957a82837cc0d0f8", "sa8a5f0c9e3a4beea568f2667856ad49", "s50fbea34e464acd87fabfb7b2093b1c", "s100c6d0bc2f41a0b209a9e7a947df0d", "s01575501bae4b55b991c903e35395e4", "s389f87431b74dcc8a7ae9599d53e8de", "sd728793f0d2459d8c74bfac2bd17400", "s0ed9024401248308ec5d025defba506", "sdccf88dd4634d8986e2b78ffbf3f6e6", "s5c170c435234db1acd96030e665a24d", "s5b2a204415149148873029d59dea60d", "s019fa5a22174c24aad3a7a51091d1e1", "s0408e2a402741c3926ac70df4f37f2b", "s78078be127041069ced8895628e0e61", "s8e1bf97b36c425ba35106913974a1a1", "se590c09220e4e5da7bf6f72d6887a41", "sf883e9d82b542d0a532ffdcc045917a", "s01debcdc3e04d3b88e4597f0ae2e20c", "sa9fd17bede247b7a8d5fdb43b5e31c2", "s007f41a3af34efe932653e11f76a8c0", "s08c5089316c4e9d9e90ce20a557e0f7", "s678e67203b04379bfa735403422e8a6", "s77dc93446fb437892166de5d8f60e94", "s725c5d9d7b94b1bb92915a796c3f701", "sa27ad141bcf4dddbf9335594f452b79", "sf512a7d8fad490e8d3ade16cb54e86b", "s40b31c9cbf9487ab1dd1bf46e587626", "s8125c75228c4db7bcc3d3a111329aa2", "s1a51eaec25f4a4c917b75867fd4d15c", "s9262b76be504841ba87554ecac0a21f", "s456569a8be94341ba351883398719cf", "s6b29a9ae55347f1bd4149d18e9e94dd", "s31e7f1382ff429db0af8076cb559608", "s3530c1e21634777900e0c65e9bc9253", "sa672bb78ac248f5a18a75c81ca5cd5c", "sd6c709a84f144d6bd28756038b91e1a", "s37e63e9b33a4cef9d70598666249c37", "s987aa8f3684485495e5771ed43b7539", "s5716565157e4423a660e03897d1ee1b", "s52ff568c6624bde8beb0b52c7121ae4", "s9ec0f34ba8348f0a2a60728db730c88", "s63fa6b7c6e948c8a0a4aeda33aded9d", "secfc18b873d439fa187d227127e8d7f", "s90796bbc5f74bf0aef47fc8dc92b29f", "s9f3539e8534492d8af6999b0d54a52a", "sc855e0c99df47afbb39e13fe8b04ad8", "s89c79a6a6444f5ea951eab885b2df6d", "s87143e906d447fe9eb617c36bdfbbd5", "s941714718f24905bf858e0717bc9292", "s4bc8a6f1e444bfc9d4e2d4e03c6af19", "seeba50b9c744a05b4e096f25998746c", "s04153e6847d48feba2812200e6e629d", "s10d9c1ec12d41ed82f126767474ca85", "s9f7e205da1e4c1d8d8dc2e8fb9c7899", "sfa1032f22d74a53bac85d5dcfc89246", "se2378f36ddf49cbb6fc2b9329ed14a5", "scf0bb0ac9ac406fad753f56963d9262", "s93be810a54d41cb9973782399707034", "sfc61891ae01403284e37ad340db0ede", "sf38b09cb0b6420eaa45688ef2ae2aeb", "sb51bcefd50c4c1c959df14dd1d7d808", "s65544694c444d87b53d8d8a10bec747"]);
  window.__vizDefaultSkin = { "Button": "sb52da56f1d346c89ce95ad187c57d56", "Label": "s9a3f745894c453a98d4febf9fd76b62", "ListBox": "sb55aafa7d074caaa8778956b173389d", "TextField": "s2456d373d8b461d8b983cb96af0409c", "Calendar": "s9f7e205da1e4c1d8d8dc2e8fb9c7899", "WatchDynamicNotificationForm": "sfa1032f22d74a53bac85d5dcfc89246", "FlexContainer": "se2378f36ddf49cbb6fc2b9329ed14a5", "Form": "scf0bb0ac9ac406fad753f56963d9262", "Image": "s93be810a54d41cb9973782399707034", "WatchStaticNotificationForm": "sf38b09cb0b6420eaa45688ef2ae2aeb", "TitleBar": "sb51bcefd50c4c1c959df14dd1d7d808" };
  window.__vizImages = { "imagedrag.png": "images/imagedrag.png", "check_mark.png": "images/check_mark.png", "mark.png": "images/mark.png", "upload.png": "images/upload.png" };
  var load = (src, name) => () => {
    new Function("define", "kony", "constants", "require", named(src, name))(define, kony, constants, requireShim);
    return define.last;
  };
  var templates = definitions(defs_default.templates);
  var components = definitions(defs_default.components);
  components["effc0845c8f9420c9f5a770b0abbb7d6"].controller = load(com_avenza_common_DashboardHeaderController_default, "com.avenza.common.DashboardHeaderController");
  components["fe23c764d4fd47fdb6b33453510269bf"].controller = load(com_avenza_transfer_TransFlowController_default, "com.avenza.transfer.TransFlowController");
  components["g7c2519a80924e7282b165b871135181"].controller = load(com_avenza_action_buttoncbController_default, "com.avenza.action.buttoncbController");
  components["dc3299f470514829814062d8abd8ef8c"].controller = load(com_avenza_common_header2Controller_default, "com.avenza.common.header2Controller");
  components["c129c7e95f7142d98c81ad7be7b823f0"].controller = load(com_avenza_common_SignInController_default, "com.avenza.common.SignInController");
  components["c8bbc02c88044b4eb89d12cde7dc1064"].controller = load(com_avenza_common_MainHeaderController_default, "com.avenza.common.MainHeaderController");
  components["efcb47cad4bc4b0498275d698d90c096"].controller = load(com_avenza_action_continuebackController_default, "com.avenza.action.continuebackController");
  components["d395ff61523e421787129fd0ad6824d1"].controller = load(com_avenza_completion_flowController_default, "com.avenza.completion.flowController");
  components["d6ae2c099d524b24a0fc75babc109d85"].controller = load(com_avenza_common_completionflowController_default, "com.avenza.common.completionflowController");
  components["a435f14717074d1d8d9d854d1f44633e"].controller = load(com_avenza_common_SignInHeaderController_default, "com.avenza.common.SignInHeaderController");
  var VIEWS = {};
  app.forms.Form1 = { widgets: Form1_widgets_default, controller: load(Form1Controller_default, "Form1Controller"), actions: load(Form1ControllerActions_default, "Form1ControllerActions"), templates, components };
  VIEWS.Form1 = Form1;
  app.forms.frmAcknowledgement = { widgets: frmAcknowledgement_widgets_default, controller: load(frmAcknowledgementController_default, "frmAcknowledgementController"), actions: load(frmAcknowledgementControllerActions_default, "frmAcknowledgementControllerActions"), templates, components };
  VIEWS.frmAcknowledgement = FrmAcknowledgement;
  app.forms.frmAddress = { widgets: frmAddress_widgets_default, controller: load(frmAddressController_default, "frmAddressController"), actions: load(frmAddressControllerActions_default, "frmAddressControllerActions"), templates, components };
  VIEWS.frmAddress = FrmAddress;
  app.forms.frmDashboard = { widgets: frmDashboard_widgets_default, controller: load(frmDashboardController_default, "frmDashboardController"), actions: load(frmDashboardControllerActions_default, "frmDashboardControllerActions"), templates, components };
  VIEWS.frmDashboard = FrmDashboard;
  app.forms.frmIdentity = { widgets: frmIdentity_widgets_default, controller: load(frmIdentityController_default, "frmIdentityController"), actions: load(frmIdentityControllerActions_default, "frmIdentityControllerActions"), templates, components };
  VIEWS.frmIdentity = FrmIdentity;
  app.forms.frmLogin = { widgets: frmLogin_widgets_default, controller: load(frmLoginController_default, "frmLoginController"), actions: load(frmLoginControllerActions_default, "frmLoginControllerActions"), templates, components };
  VIEWS.frmLogin = FrmLogin;
  app.forms.frmOpenAccount = { widgets: frmOpenAccount_widgets_default, controller: load(frmOpenAccountController_default, "frmOpenAccountController"), actions: load(frmOpenAccountControllerActions_default, "frmOpenAccountControllerActions"), templates, components };
  VIEWS.frmOpenAccount = FrmOpenAccount;
  app.forms.frmPersonalDetails = { widgets: frmPersonalDetails_widgets_default, controller: load(frmPersonalDetailsController_default, "frmPersonalDetailsController"), actions: load(frmPersonalDetailsControllerActions_default, "frmPersonalDetailsControllerActions"), templates, components };
  VIEWS.frmPersonalDetails = FrmPersonalDetails;
  app.forms.frmProfile = { widgets: frmProfile_widgets_default, controller: load(frmProfileController_default, "frmProfileController"), actions: load(frmProfileControllerActions_default, "frmProfileControllerActions"), templates, components };
  VIEWS.frmProfile = FrmProfile;
  var contexts = {};
  function FormRoute() {
    const { form } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    app.navigate = (formId, context) => {
      app.previous = app.current;
      contexts[formId] = context;
      navigate("/" + formId);
    };
    if (!app.forms[form]) return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Navigate, { to: "/Form1", replace: true });
    app.current = form;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(FormHost, { formId: form, context: contexts[form], navKey: location.key, View: VIEWS[form] });
  }
  (0, import_client.createRoot)(document.getElementById("root")).render(
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(HashRouter, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(Routes, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Route, { path: "/:form", element: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(FormRoute, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Route, { path: "*", element: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Navigate, { to: "/Form1", replace: true }) })
    ] }) })
  );
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/index.js:
  (**
   * React Router v6.26.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.26.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
