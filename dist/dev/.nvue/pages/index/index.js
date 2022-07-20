var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b;
import { getCurrentInstance, isInSSRComponentSetup, injectHook, h, Fragment, inject, onMounted, onUnmounted, ref, computed, watch, createVNode, Text, defineComponent, provide, onBeforeMount, openBlock, createElementBlock, normalizeStyle, unref, normalizeClass, renderSlot, createElementVNode, createCommentVNode, nextTick, toDisplayString as toDisplayString$1, resolveComponent, createBlock, withCtx, renderList, withModifiers, toRaw, onBeforeUnmount } from "vue";
import { defineStore } from "pinia";
Object.freeze({});
Object.freeze([]);
const objectToString$1 = Object.prototype.toString;
const toTypeString$1 = (value) => objectToString$1.call(value);
const toRawType = (value) => {
  return toTypeString$1(value).slice(8, -1);
};
const ON_LOAD = "onLoad";
function isDebugMode() {
  return typeof __channelId__ === "string" && __channelId__;
}
function jsonStringifyReplacer(k, p) {
  switch (toRawType(p)) {
    case "Function":
      return "function() { [native code] }";
    default:
      return p;
  }
}
function normalizeLog(type, filename, args) {
  if (isDebugMode()) {
    args.push(filename.replace("at ", "uni-app:///"));
    return console[type].apply(console, args);
  }
  const msgs = args.map(function(v) {
    const type2 = toTypeString$1(v).toLowerCase();
    if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
      try {
        v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
      } catch (e) {
        v = type2;
      }
    } else {
      if (v === null) {
        v = "---NULL---";
      } else if (v === void 0) {
        v = "---UNDEFINED---";
      } else {
        const vType = toRawType(v).toUpperCase();
        if (vType === "NUMBER" || vType === "BOOLEAN") {
          v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
        } else {
          v = String(v);
        }
      }
    }
    return v;
  });
  return msgs.join("---COMMA---") + " " + filename;
}
function formatAppLog(type, filename, ...args) {
  const res = normalizeLog(type, filename, args);
  res && console[type](res);
}
function requireNativePlugin(name2) {
  return weex.requireModule(name2);
}
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
const language$2 = "English-US";
var en = {
  language: language$2,
  "index.search.subtext": "Fully compatible with vue3 TypeScript pinia component library",
  "index.search.tips": "Chinese/English name",
  "index.search.btntext": "search",
  "index.com.navtitle": "TMUI All platforms",
  "index.com.title": "Category Navigation",
  "index.com.tongyong": "Universal",
  "index.com.row": "Layout",
  "index.com.show": "Display",
  "index.com.form": "Form",
  "index.com.fd": "Reminder",
  "index.com.nav": "Navigation",
  "index.com.yewu": "Business",
  "index.com.other": "Other",
  "index.com.tubiao": "Chart",
  "index.com.tongyongSub": "can't translate",
  "index.com.rowSub": "can't translate",
  "index.com.showSub": "can't translate",
  "index.com.formSub": "can't translate",
  "index.com.fdSub": "can't translate",
  "index.com.navSub": "can't translate",
  "index.com.yewuSub": "can't translate",
  "index.com.otherSub": "can't translate",
  "index.com.tubiaoSub": "Echarts 5.3.2",
  "index.com.bottom": "tmui 3.0.0 fully compatible",
  "index.com.setLocal": "language setting",
  "index.com.love": "Action support",
  "index.com.loveSub": "Watch an ad",
  "index.com.themetext": "Dynamically switch themes\uFF0Cmore of see docs",
  "index.com.themeGreen": "Yellow",
  "index.com.themeBlue": "Blue",
  "index.com.themeRed": "Red",
  "index.com.themeDefault": "Default",
  "index.com.themeCustText": "custom",
  "message.load.text": "Loading",
  "message.error.text": "Error",
  "message.info.text": "Tips",
  "message.warn.text": "Warning",
  "message.quest.text": "Question",
  "message.success.text": "Success",
  "message.disabled.text": "Disabled",
  "message.wait.text": "Waiting"
};
const language$1 = "\u7B80\u4F53-\u4E2D\u56FD";
var zhHans = {
  language: language$1,
  "index.search.subtext": "\u5168\u7AEF\u517C\u5BB9vue3 TypeScript pinia\u7EC4\u4EF6\u5E93",
  "index.search.tips": "\u7EC4\u4EF6\u4E2D\u6587/\u82F1\u6587\u540D\u79F0",
  "index.search.btntext": "\u641C\u7D22\u7EC4\u4EF6",
  "index.com.navtitle": "TMUI \u5168\u5E73\u53F0\u7EC4\u4EF6\u5E93",
  "index.com.title": "\u5206\u7C7B\u5BFC\u822A",
  "index.com.tongyong": "\u901A\u7528\u7EC4\u4EF6",
  "index.com.tongyongSub": "\u9AD8\u9891\u5E38\u7528\u7EC4\u4EF6",
  "index.com.row": "\u5E03\u5C40\u7EC4\u4EF6",
  "index.com.rowSub": "\u5E03\u5C40\u6392\u7248",
  "index.com.show": "\u5C55\u793A\u7EC4\u4EF6",
  "index.com.showSub": "\u5E38\u89C1\u6570\u636E\u5C55\u793A",
  "index.com.form": "\u8868\u5355\u5F55\u5165",
  "index.com.formSub": "\u6570\u636E\u63D0\u4EA4\u7C7B",
  "index.com.fd": "\u53CD\u9988\u7C7B\u578B",
  "index.com.fdSub": "\u63D0\u793A\u5F39\u5C42\u7C7B\u7EC4\u4EF6",
  "index.com.nav": "\u5BFC\u822A\u7C7B\u578B",
  "index.com.navSub": "\u5206\u9875\u5BFC\u822A\u7C7B",
  "index.com.yewu": "\u4E1A\u52A1\u578B\u7EC4\u4EF6",
  "index.com.yewuSub": "\u4F18\u60E0\u5238\u5BFC\u8D2D\u7C7B",
  "index.com.other": "\u5176\u5B83",
  "index.com.otherSub": "\u529F\u80FD\u578B\u7EC4\u4EF6",
  "index.com.tubiao": "\u56FE\u8868\u7EC4\u4EF6",
  "index.com.tubiaoSub": "Echarts 5.3.2",
  "index.com.bottom": "tmui 3.0.0 \u539F\u751F\u6E32\u67D3\uFF0C\u5168\u7AEF\u517C\u5BB9",
  "index.com.setLocal": "\u8BBE\u7F6E\u8BED\u8A00",
  "index.com.love": "TMUI\u7528\u6237\u4E2D\u5FC3",
  "index.com.loveSub": "\u770B\u5E7F\u544A\u8D5A\u79EF\u5206",
  "index.com.themetext": "\u52A8\u6001\u5207\u6362\u4E3B\u9898,\u9ED8\u8BA4\u4E3B\u9898\u89C1\u6587\u6863",
  "index.com.themeGreen": "\u5C0F\u9EC4",
  "index.com.themeBlue": "\u84DD\u8272",
  "index.com.themeRed": "\u7EA2\u8272",
  "index.com.themeDefault": "\u9ED8\u8BA4",
  "index.com.themeCustText": "\u81EA\u5B9A",
  "message.load.text": "\u52A0\u8F7D\u4E2D",
  "message.error.text": "\u64CD\u4F5C\u9519\u8BEF",
  "message.info.text": "\u63D0\u793A\u4FE1\u606F",
  "message.warn.text": "\u8B66\u544A\u4FE1\u606F",
  "message.quest.text": "\u4F3C\u4E4E\u6709\u95EE\u9898",
  "message.success.text": "\u64CD\u4F5C\u6210\u529F",
  "message.disabled.text": "\u7981\u6B62\u64CD\u4F5C",
  "message.wait.text": "\u8BF7\u7A0D\u5019.."
};
/*!
  * @intlify/shared v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = typeof window !== "undefined";
let mark;
let measure;
{
  const perf = inBrowser && window.performance;
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = (tag) => perf.mark(tag);
    measure = (name2, startTag, endTag) => {
      perf.measure(name2, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
    };
  }
}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format(message, ...args) {
  if (args.length === 1 && isObject$2(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier) => {
    return args.hasOwnProperty(identifier) ? args[identifier] : "";
  });
}
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const makeSymbol = (name2) => hasSymbol ? Symbol(name2) : name2;
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val2) => typeof val2 === "number" && isFinite(val2);
const isDate = (val2) => toTypeString(val2) === "[object Date]";
const isRegExp = (val2) => toTypeString(val2) === "[object RegExp]";
const isEmptyObject = (val2) => isPlainObject(val2) && Object.keys(val2).length === 0;
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const assign = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function hasOwn$2(obj, key) {
  return hasOwnProperty$2.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val2) => typeof val2 === "function";
const isString = (val2) => typeof val2 === "string";
const isBoolean = (val2) => typeof val2 === "boolean";
const isObject$2 = (val2) => val2 !== null && typeof val2 === "object";
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val2) => toTypeString(val2) === "[object Object]";
const toDisplayString = (val2) => {
  return val2 == null ? "" : isArray(val2) || isPlainObject(val2) && val2.toString === objectToString ? JSON.stringify(val2, null, 2) : String(val2);
};
const RANGE = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  const lines = source.split(/\r?\n/);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        if (j === i) {
          const pad = start - (count - lineLength) + 1;
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + 1;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter;
}
/*!
  * @intlify/message-resolver v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function hasOwn$1(obj, key) {
  return hasOwnProperty$1.call(obj, key);
}
const isObject$1 = (val2) => val2 !== null && typeof val2 === "object";
const pathStateMachine = [];
pathStateMachine[0] = {
  ["w"]: [0],
  ["i"]: [3, 0],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[1] = {
  ["w"]: [1],
  ["."]: [2],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[2] = {
  ["w"]: [2],
  ["i"]: [3, 0],
  ["0"]: [3, 0]
};
pathStateMachine[3] = {
  ["i"]: [3, 0],
  ["0"]: [3, 0],
  ["w"]: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  ["o"]: [7, 1]
};
pathStateMachine[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [
    4,
    2
  ],
  ["]"]: [1, 3],
  ["o"]: 8,
  ["l"]: [4, 0]
};
pathStateMachine[5] = {
  ["'"]: [4, 0],
  ["o"]: 8,
  ["l"]: [5, 0]
};
pathStateMachine[6] = {
  ['"']: [4, 0],
  ["o"]: 8,
  ["l"]: [6, 0]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code = ch.charCodeAt(0);
  switch (code) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse$1(path) {
  const keys = [];
  let index2 = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[0] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[1] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[2] = () => {
    actions[0]();
    subPathDepth++;
  };
  actions[3] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[0]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[1]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index2 + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index2++;
      newChar = "\\" + nextChar;
      actions[0]();
      return true;
    }
  }
  while (mode !== null) {
    index2++;
    c = path[index2];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap["l"] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveValue(obj, path) {
  if (!isObject$1(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse$1(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val2 = last[hit[i]];
    if (val2 === void 0) {
      return null;
    }
    last = val2;
    i++;
  }
  return last;
}
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn$1(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        currentObj = currentObj[subKeys[i]];
      }
      currentObj[subKeys[lastIndex]] = obj[key];
      delete obj[key];
      if (isObject$1(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
/*!
  * @intlify/runtime v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index2 = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index2 : index2;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$2(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$2(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  const _list = options.list || [];
  const list = (index2) => _list[index2];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject$2(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name2) => options.modifiers ? options.modifiers[name2] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const ctx = {
    ["list"]: list,
    ["named"]: named,
    ["plural"]: plural,
    ["linked"]: (key, modifier) => {
      const msg = message(key)(ctx);
      return isString(modifier) ? _modifier(modifier)(msg) : msg;
    },
    ["message"]: message,
    ["type"]: type,
    ["interpolate"]: interpolate,
    ["normalize"]: normalize
  };
  return ctx;
}
/*!
  * @intlify/message-compiler v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const errorMessages$2 = {
  [0]: `Expected token: '{0}'`,
  [1]: `Invalid token in placeholder: '{0}'`,
  [2]: `Unterminated single quote in placeholder`,
  [3]: `Unknown escape sequence: \\{0}`,
  [4]: `Invalid unicode escape sequence: {0}`,
  [5]: `Unbalanced closing brace`,
  [6]: `Unterminated closing brace`,
  [7]: `Empty placeholder`,
  [8]: `Not allowed nest placeholder`,
  [9]: `Invalid linked format`,
  [10]: `Plural must have messages`,
  [11]: `Unexpected empty linked modifier`,
  [12]: `Unexpected empty linked key`,
  [13]: `Unexpected lexical analysis in token: '{0}'`
};
function createCompileError(code, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = format((messages || errorMessages$2)[code] || "", ...args || []);
  const error = new SyntaxError(String(msg));
  error.code = code;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
/*!
  * @intlify/devtools-if v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const IntlifyDevToolsHooks = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate"
};
/*!
  * @intlify/core-base v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n, version, meta) {
  devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
    timestamp: Date.now(),
    i18n,
    version,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const warnMessages$1 = {
  [0]: `Not found '{key}' key in '{locale}' locale messages.`,
  [1]: `Fall back to translate '{key}' key with '{target}' locale.`,
  [2]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
  [3]: `Fall back to number format '{key}' key with '{target}' locale.`,
  [4]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
  [5]: `Fall back to datetime format '{key}' key with '{target}' locale.`
};
function getWarnMessage$1(code, ...args) {
  return format(warnMessages$1[code], ...args);
}
const VERSION$1 = "9.1.9";
const NOT_REOSLVED = -1;
const MISSING_RESOLVE_VALUE = "";
function getDefaultLinkedModifiers() {
  return {
    upper: (val2) => isString(val2) ? val2.toUpperCase() : val2,
    lower: (val2) => isString(val2) ? val2.toLowerCase() : val2,
    capitalize: (val2) => isString(val2) ? `${val2.charAt(0).toLocaleUpperCase()}${val2.substr(1)}` : val2
  };
}
let _compiler;
let _additionalMeta = null;
const setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = () => _additionalMeta;
let _cid = 0;
function createCoreContext(options = {}) {
  const version = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) ? options.locale : "en-US";
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const messages = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
  const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const internalOptions = options;
  const __datetimeFormatters = isObject$2(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$2(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$2(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    datetimeFormats,
    numberFormats,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    onWarn,
    __datetimeFormatters,
    __numberFormatters,
    __meta
  };
  {
    context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
  }
  {
    initI18nDevTools(context, version, __meta);
  }
  return context;
}
function isTranslateFallbackWarn(fallback, key) {
  return fallback instanceof RegExp ? fallback.test(key) : fallback;
}
function isTranslateMissingWarn(missing, key) {
  return missing instanceof RegExp ? missing.test(key) : missing;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  {
    const emitter = context.__v_emitter;
    if (emitter) {
      emitter.emit("missing", {
        locale,
        key,
        type,
        groupId: `${type}:${key}`
      });
    }
  }
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    if (isTranslateMissingWarn(missingWarn, key)) {
      onWarn(getWarnMessage$1(0, { key, locale }));
    }
    return key;
  }
}
function getLocaleChain(ctx, fallback, start) {
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(start);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) ? fallback : isPlainObject(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(start, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  getLocaleChain(ctx, fallback, locale);
}
function createCoreError(code) {
  return createCompileError(code, null, { messages: errorMessages$1 });
}
const errorMessages$1 = {
  [14]: "Invalid arguments",
  [15]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [16]: "The argument provided is not a valid ISO date string"
};
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val2) => isFunction(val2);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key : fallbackFormat ? key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = isString(options.locale) ? options.locale : context.locale;
  escapeParameter && escapeParams(options);
  let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || {}
  ];
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  if (isString(format2) && context.messageCompiler == null) {
    warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
    return key;
  }
  let occurred = false;
  const errorDetector = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged) : messaged;
  {
    const payloads = {
      timestamp: Date.now(),
      key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject$2(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn } = context;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(1, {
        key,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    message = messages[targetLocale] || {};
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-resolve-start";
      endTag = "intlify-message-resolve-end";
      mark && mark(startTag);
    }
    if ((format2 = resolveValue(message, key)) === null) {
      format2 = message[key];
    }
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start && format2) {
        emitter.emit("message-resolve", {
          type: "message-resolve",
          key,
          message: format2,
          time: end - start,
          groupId: `${type}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message resolve", startTag, endTag);
      }
    }
    if (isString(format2) || isFunction(format2))
      break;
    const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
    if (missingRet !== key) {
      format2 = missingRet;
    }
    from = to;
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  let start = null;
  let startTag;
  let endTag;
  if (inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-compilation-start";
    endTag = "intlify-message-compilation-end";
    mark && mark(startTag);
  }
  const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
  if (inBrowser) {
    const end = window.performance.now();
    const emitter = context.__v_emitter;
    if (emitter && start) {
      emitter.emit("message-compilation", {
        type: "message-compilation",
        message: format2,
        time: end - start,
        groupId: `${"translate"}:${key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message compilation", startTag, endTag);
    }
  }
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  let start = null;
  let startTag;
  let endTag;
  if (inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-evaluation-start";
    endTag = "intlify-message-evaluation-end";
    mark && mark(startTag);
  }
  const messaged = msg(msgCtx);
  if (inBrowser) {
    const end = window.performance.now();
    const emitter = context.__v_emitter;
    if (emitter && start) {
      emitter.emit("message-evaluation", {
        type: "message-evaluation",
        value: messaged,
        time: end - start,
        groupId: `${"translate"}:${msg.key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message evaluation", startTag, endTag);
    }
  }
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
    throw createCoreError(14);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
  return {
    warnHtmlMessage,
    onError: (err) => {
      errorDetector && errorDetector(err);
      {
        const message = `Message compilation error: ${err.message}`;
        const codeFrame = err.location && generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("compile-error", {
            message: source,
            error: err.message,
            start: err.location && err.location.start.offset,
            end: err.location && err.location.end.offset,
            groupId: `${"translate"}:${key}`
          });
        }
        console.error(codeFrame ? `${message}
${codeFrame}` : message);
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules } = context;
  const resolveMessage = (key) => {
    const val2 = resolveValue(message, key);
    if (isString(val2)) {
      let occurred = false;
      const errorDetector = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val2, key, errorDetector);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val2)) {
      return val2;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
const intlDefined = typeof Intl !== "undefined";
const Availabilities = {
  dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
  numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
};
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
  const { __datetimeFormatters } = context;
  if (!Availabilities.dateTimeFormat) {
    onWarn(getWarnMessage$1(4));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(5, {
        key,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id2 = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id2 = `${id2}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id2);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id2, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  let options = {};
  let overrides = {};
  let value;
  if (isString(arg1)) {
    if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
      throw createCoreError(16);
    }
    value = new Date(arg1);
    try {
      value.toISOString();
    } catch (e) {
      throw createCoreError(16);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(15);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(14);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    options = arg2;
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id2 = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id2)) {
      continue;
    }
    context.__datetimeFormatters.delete(id2);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
  const { __numberFormatters } = context;
  if (!Availabilities.numberFormat) {
    onWarn(getWarnMessage$1(2));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(3, {
        key,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id2 = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id2 = `${id2}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id2);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id2, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  let options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(14);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    options = arg2;
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id2 = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id2)) {
      continue;
    }
    context.__numberFormatters.delete(id2);
  }
}
/*!
  * vue-i18n v9.1.9
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.1.9";
function initFeatureFlags() {
  let needWarn = false;
  {
    needWarn = true;
  }
  if (needWarn) {
    console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
  }
}
const warnMessages = {
  [6]: `Fall back to {type} '{key}' with root locale.`,
  [7]: `Not supported 'preserve'.`,
  [8]: `Not supported 'formatter'.`,
  [9]: `Not supported 'preserveDirectiveContent'.`,
  [10]: `Not supported 'getChoiceIndex'.`,
  [11]: `Component name legacy compatible: '{name}' -> 'i18n'`,
  [12]: `Not found parent scope. use the global scope.`
};
function getWarnMessage(code, ...args) {
  return format(warnMessages[code], ...args);
}
function createI18nError(code, ...args) {
  return createCompileError(code, null, { messages: errorMessages, args });
}
const errorMessages = {
  [14]: "Unexpected return type in composer",
  [15]: "Invalid argument",
  [16]: "Must be called at the top of a `setup` function",
  [17]: "Need to install with `app.use` function",
  [22]: "Unexpected error",
  [18]: "Not available in legacy mode",
  [19]: `Required in value: {0}`,
  [20]: `Invalid value`,
  [21]: `Cannot setup vue-devtools plugin`
};
const DEVTOOLS_META = "__INTLIFY_META__";
const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
const DatetimePartsSymbol = makeSymbol("__datetimeParts");
const NumberPartsSymbol = makeSymbol("__numberParts");
const EnableEmitter = makeSymbol("__enableEmitter");
const DisableEmitter = makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOption = makeSymbol("__injectWithOption");
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach(({ locale: locale2, resource }) => {
      if (locale2) {
        ret[locale2] = ret[locale2] || {};
        deepCopy(resource, ret[locale2]);
      } else {
        deepCopy(resource, ret);
      }
    });
  }
  if (options.flatJson) {
    for (const key in ret) {
      if (hasOwn$2(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val2) => !isObject$2(val2) || isArray(val2);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(20);
  }
  for (const key in src) {
    if (hasOwn$2(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy(src[key], des[key]);
      }
    }
  }
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
};
function createComposer(options = {}) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(__root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US");
  const _fallbackLocale = ref(__root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value);
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  function getCoreContext() {
    return createCoreContext({
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      messageCompiler: function compileToFunction(source) {
        return (ctx) => {
          return ctx.normalize([source]);
        };
      },
      datetimeFormats: _datetimeFormats.value,
      numberFormats: _numberFormats.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      __datetimeFormatters: isPlainObject(_context) ? _context.__datetimeFormatters : void 0,
      __numberFormatters: isPlainObject(_context) ? _context.__numberFormatters : void 0,
      __v_emitter: isPlainObject(_context) ? _context.__v_emitter : void 0,
      __meta: { framework: "vue" }
    });
  }
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val2) => {
      _locale.value = val2;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val2) => {
      _fallbackLocale.value = val2;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val2);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = computed(() => _datetimeFormats.value);
  const numberFormats = computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  function isResolvedTranslateMessage(type, arg) {
    return type !== "translate" || !!arg.resolvedMessage === false;
  }
  function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
    trackReactivityValues();
    let ret;
    {
      try {
        setAdditionalMeta(getMetaInfo());
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
      }
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      if (__root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
        if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
          warn(getWarnMessage(6, {
            key,
            type: warnType
          }));
        }
        {
          const { __v_emitter: emitter } = _context;
          if (emitter && _fallbackRoot) {
            emitter.emit("fallback", {
              type: warnType,
              key,
              to: "global",
              groupId: `${warnType}:${key}`
            });
          }
        }
      }
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(14);
    }
  }
  function t(...args) {
    return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val2) => isString(val2));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$2(arg3)) {
      throw createI18nError(15);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val2) => isString(val2));
  }
  function n(...args) {
    return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val2) => isString(val2));
  }
  function normalize(values) {
    return values.map((val2) => isString(val2) ? createVNode(Text, null, val2, 0) : val2);
  }
  const interpolate = (val2) => val2;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function transrateVNode(...args) {
    return wrapWithDeps((context) => {
      let ret;
      const _context2 = context;
      try {
        _context2.processor = processor;
        ret = translate(_context2, ...args);
      } finally {
        _context2.processor = null;
      }
      return ret;
    }, () => parseTranslateArgs(...args), "translate", (root) => root[TransrateVNodeSymbol](...args), (key) => [createVNode(Text, null, key, 0)], (val2) => isArray(val2));
  }
  function numberParts(...args) {
    return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), () => [], (val2) => isString(val2) || isArray(val2));
  }
  function datetimeParts(...args) {
    return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), () => [], (val2) => isString(val2) || isArray(val2));
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = isString(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return resolveValue(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = resolveValue(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root) {
    watch(__root.locale, (val2) => {
      if (_inheritLocale) {
        _locale.value = val2;
        _context.locale = val2;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val2) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val2;
        _context.fallbackLocale = val2;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val2) {
      _inheritLocale = val2;
      if (val2 && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    datetimeFormats,
    numberFormats,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val2) {
      _missingWarn = val2;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val2) {
      _fallbackWarn = val2;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val2) {
      _fallbackRoot = val2;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val2) {
      _fallbackFormat = val2;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val2) {
      _warnHtmlMessage = val2;
      _context.warnHtmlMessage = val2;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val2) {
      _escapeParameter = val2;
      _context.escapeParameter = val2;
    },
    t,
    rt,
    d,
    n,
    te,
    tm,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getDateTimeFormat,
    setDateTimeFormat,
    mergeDateTimeFormat,
    getNumberFormat,
    setNumberFormat,
    mergeNumberFormat,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [TransrateVNodeSymbol]: transrateVNode,
    [NumberPartsSymbol]: numberParts,
    [DatetimePartsSymbol]: datetimeParts,
    [SetPluralRulesSymbol]: setPluralRules,
    [InejctWithOption]: options.__injectWithOption
  };
  {
    composer[EnableEmitter] = (emitter) => {
      _context.__v_emitter = emitter;
    };
    composer[DisableEmitter] = () => {
      _context.__v_emitter = void 0;
    };
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val2) => val2 === "parent" || val2 === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
({
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val2) => isNumber(val2) || !isNaN(val2)
    }
  }, baseFormatProps),
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    const keys = Object.keys(slots).filter((key) => key !== "_");
    return () => {
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign({}, attrs);
      return isString(props.tag) ? h(props.tag, assignedAttrs, children) : isObject$2(props.tag) ? h(props.tag, assignedAttrs, children) : h(Fragment, assignedAttrs, children);
    };
  }
});
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    return slots.default ? slots.default() : [];
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject$2(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index2) => {
        const slot = slots[part.type];
        return slot ? slot({ [part.type]: part.value, index: index2, parts }) : [part.value];
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign({}, attrs);
    return isString(props.tag) ? h(props.tag, assignedAttrs, children) : isObject$2(props.tag) ? h(props.tag, assignedAttrs, children) : h(Fragment, assignedAttrs, children);
  };
}
const NUMBER_FORMAT_KEYS = [
  "localeMatcher",
  "style",
  "unit",
  "unitDisplay",
  "currency",
  "currencyDisplay",
  "useGrouping",
  "numberingSystem",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "notation",
  "formatMatcher"
];
({
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => i18n[NumberPartsSymbol](...args));
  }
});
const DATETIME_FORMAT_KEYS = [
  "dateStyle",
  "timeStyle",
  "fractionalSecondDigits",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "localeMatcher",
  "timeZone",
  "hour12",
  "hourCycle",
  "formatMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName"
];
({
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => i18n[DatetimePartsSymbol](...args));
  }
});
function addTimelineEvent(event, payload) {
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(16);
  }
  if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(17);
  }
  const i18n = inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
  if (!i18n) {
    throw createI18nError(22);
  }
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
  if (scope === "global") {
    let messages = isObject$2(options.messages) ? options.messages : {};
    if ("__i18nGlobal" in instance.type) {
      messages = getLocaleMessages(global2.locale.value, {
        messages,
        __i18n: instance.type.__i18nGlobal
      });
    }
    const locales = Object.keys(messages);
    if (locales.length) {
      locales.forEach((locale) => {
        global2.mergeLocaleMessage(locale, messages[locale]);
      });
    }
    if (isObject$2(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$2(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      {
        warn(getWarnMessage(12));
      }
      composer2 = global2;
    }
    return composer2;
  }
  if (i18n.mode === "legacy") {
    throw createI18nError(18);
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const type = instance.type;
    const composerOptions = assign({}, options);
    if (type.__i18n) {
      composerOptions.__i18n = type.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer(composerOptions);
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    } else {
      const vueI18n = i18nInternal.__getInstance(current);
      if (vueI18n != null) {
        composer = vueI18n.__composer;
      }
      if (useComponent && composer && !composer[InejctWithOption]) {
        composer = null;
      }
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle(i18n, target, composer) {
  let emitter = null;
  onMounted(() => {
    if (target.vnode.el) {
      target.vnode.el.__VUE_I18N__ = composer;
      emitter = createEmitter();
      const _composer = composer;
      _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
      emitter.on("*", addTimelineEvent);
    }
  }, target);
  onUnmounted(() => {
    if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
      emitter && emitter.off("*", addTimelineEvent);
      const _composer = composer;
      _composer[DisableEmitter] && _composer[DisableEmitter]();
      delete target.vnode.el.__VUE_I18N__;
    }
    i18n.__deleteInstance(target);
  }, target);
}
{
  initFeatureFlags();
}
{
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const isObject = (val2) => val2 !== null && typeof val2 === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format2, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format2.length) {
    let char = format2[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format2[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format2[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val2, key) => hasOwnProperty.call(val2, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages, watcher, formater }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== "undefined" && uni.getLocale) {
    return uni.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    [locale, messages] = [
      messages,
      locale
    ];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages,
    watcher
  });
  let t = (key, values) => {
    if (typeof getApp !== "function") {
      t = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t(key, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
const language = function(key) {
  const messages = {
    en,
    "zh-Hans": zhHans
  };
  ({
    locale: uni.getLocale(),
    messages
  });
  const { t } = initVueI18n(messages);
  return t(key);
};
var colortool = {
  rgbaToHsla(scolor) {
    let { r, g, b, a } = scolor;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var l = (min + max) / 2;
    var difference = max - min;
    var h2 = 0, s = 0;
    if (max == min) {
      h2 = 0;
      s = 0;
    } else {
      s = l > 0.5 ? difference / (2 - max - min) : difference / (max + min);
      switch (max) {
        case r:
          h2 = (g - b) / difference + (g < b ? 6 : 0);
          break;
        case g:
          h2 = 2 + (b - r) / difference;
          break;
        case b:
          h2 = 4 + (r - g) / difference;
          break;
      }
      h2 = Math.round(h2 * 60);
    }
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return { h: h2, s, l, a };
  },
  hslaToRgba(scolor) {
    let { h: h2, s, l, a } = scolor;
    h2 = h2 / 360;
    s = s / 100;
    l = l / 100;
    var rgb = [];
    if (s == 0) {
      rgb = [Math.round(l * 255), Math.round(l * 255), Math.round(l * 255)];
    } else {
      var q = l >= 0.5 ? l + s - l * s : l * (1 + s);
      var p = 2 * l - q;
      rgb[0] = h2 + 1 / 3;
      rgb[1] = h2;
      rgb[2] = h2 - 1 / 3;
      for (var i = 0; i < rgb.length; i++) {
        var tc = rgb[i];
        if (tc < 0) {
          tc = tc + 1;
        } else if (tc > 1) {
          tc = tc - 1;
        }
        switch (true) {
          case tc < 1 / 6:
            tc = p + (q - p) * 6 * tc;
            break;
          case (1 / 6 <= tc && tc < 0.5):
            tc = q;
            break;
          case (0.5 <= tc && tc < 2 / 3):
            tc = p + (q - p) * (4 - 6 * tc);
            break;
          default:
            tc = p;
            break;
        }
        rgb[i] = Math.round(tc * 255);
      }
    }
    return { r: rgb[0], g: rgb[1], b: rgb[2], a };
  },
  cssToRgba: function(sColor) {
    if (!sColor) {
      return { r: 0, g: 0, b: 0, a: 0 };
    }
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return {
        r: sColorChange[0],
        g: sColorChange[1],
        b: sColorChange[2],
        a: 1
      };
    } else if (/^(rgb|RGB|rgba|RGBA)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB|RGBA|rgba)*/g, "").split(",");
      let p = arr.map((val2) => Number(val2));
      if (p.length < 3) {
        return {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        };
      }
      if (p.length == 3) {
        p.push(1);
      }
      return {
        r: p[0],
        g: p[1],
        b: p[2],
        a: p[3]
      };
    } else {
      return {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      };
    }
  },
  rgbaToHsva: function(rgba2) {
    if (!rgba2)
      return {
        h: 0,
        s: 1,
        v: 1,
        a: 1
      };
    const r = rgba2.r / 255;
    const g = rgba2.g / 255;
    const b = rgba2.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h2 = 0;
    if (max !== min) {
      if (max === r) {
        h2 = 60 * (0 + (g - b) / (max - min));
      } else if (max === g) {
        h2 = 60 * (2 + (b - r) / (max - min));
      } else if (max === b) {
        h2 = 60 * (4 + (r - g) / (max - min));
      }
    }
    if (h2 < 0)
      h2 = h2 + 360;
    const s = max === 0 ? 0 : (max - min) / max;
    const hsv = [h2, s, max];
    return {
      h: hsv[0],
      s: hsv[1],
      v: hsv[2],
      a: rgba2.a
    };
  },
  hsvaToRgba: function(sColor) {
    var { h: h2, s, v, a } = sColor;
    var r = 0;
    var g = 0;
    var b = 0;
    var i;
    var f;
    var p;
    var q;
    var t;
    i = Math.floor(h2 * 6);
    f = h2 * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    return { r, g, b, a };
  },
  rgbaToCss: function(sColor) {
    return `rgba(${sColor.r},${sColor.g},${sColor.b},${sColor.a})`;
  }
};
var cssDirection = /* @__PURE__ */ ((cssDirection2) => {
  cssDirection2["left"] = "left";
  cssDirection2["right"] = "right";
  cssDirection2["bottom"] = "bottom";
  cssDirection2["top"] = "top";
  cssDirection2["leftright"] = "x";
  cssDirection2["topbottom"] = "y";
  cssDirection2["topleft"] = "top-left";
  cssDirection2["topright"] = "top-right";
  cssDirection2["bottomleft"] = "bottom-left";
  cssDirection2["bottomright"] = "bottom-right";
  cssDirection2["all"] = "all";
  return cssDirection2;
})(cssDirection || {});
var linearDirection = /* @__PURE__ */ ((linearDirection2) => {
  linearDirection2["left"] = "to left";
  linearDirection2["right"] = "to right";
  linearDirection2["top"] = "to top";
  linearDirection2["bottom"] = "to bottom";
  linearDirection2["none"] = "";
  return linearDirection2;
})(linearDirection || {});
var linearDeep = /* @__PURE__ */ ((linearDeep2) => {
  linearDeep2["light"] = "light";
  linearDeep2["dark"] = "dark";
  linearDeep2["accent"] = "accent";
  return linearDeep2;
})(linearDeep || {});
var borderStyle = /* @__PURE__ */ ((borderStyle2) => {
  borderStyle2["solid"] = "solid";
  borderStyle2["dashed"] = "dashed";
  borderStyle2["dotted"] = "dotted";
  return borderStyle2;
})(borderStyle || {});
const theme$1 = {};
var colors = [];
var colorObj = __spreadValues({
  red: "#ff2414",
  pink: "#ea2a6a",
  purple: "#9C27B0",
  "deep-purple": "#673AB7",
  indigo: "#3F51B5",
  blue: "#2196F3",
  "light-blue": "#03A9F4",
  cyan: "#00BCD4",
  teal: "#009688",
  green: "#4ec752",
  "light-green": "#8BC34A",
  lime: "#CDDC39",
  yellow: "#ffe814",
  amber: "#FFC107",
  orange: "#ffa114",
  "deep-orange": "#FF5722",
  brown: "#795548",
  "blue-grey": "#607D8B",
  grey: "#9E9E9E",
  black: "#000000",
  white: "#FFFFFF",
  primary: "#3B5CF0",
  "grey-5": "#fafafa",
  "grey-4": "#f5f5f5",
  "grey-3": "#eeeeee",
  "grey-2": "#e0e0e0",
  "grey-1": "#bdbdbd",
  "grey-darken-1": "#757575",
  "grey-darken-2": "#616161",
  "grey-darken-3": "#424242",
  "grey-darken-4": "#212121",
  "grey-darken-5": "#131313",
  "grey-darken-6": "#0a0a0a"
}, theme$1);
for (const key in colorObj) {
  if (Object.prototype.hasOwnProperty.call(colorObj, key)) {
    const element = String(colorObj[key]);
    if (isCssColor(element)) {
      let rgba = colortool.cssToRgba(element);
      colors.push({
        name: key,
        value: element,
        hsva: colortool.rgbaToHsva(colortool.cssToRgba(element)),
        rgba: colortool.cssToRgba(element),
        hsla: colortool.rgbaToHsla(rgba),
        csscolor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      });
    }
  }
}
function isCssColor(color) {
  const reg1 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  const reg2 = /^(rgb|RGB|rgba|RGBA)/;
  return reg1.test(color) || reg2.test(color);
}
function getColor(colorName) {
  let isHand = colors.findIndex(function(el, index2) {
    return el.name == colorName;
  });
  if (isHand == -1) {
    colorName = "primary";
    isHand = colors.findIndex(function(el, index2) {
      return el.name == colorName;
    });
    formatAppLog("error", "at tmui/tool/theme/theme.ts:80", "\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
  }
  return colors[isHand];
}
class themeColors {
  constructor(c = colors) {
    __publicField(this, "colors", []);
    this.colors = c;
  }
  add(colorName = "", value = "") {
    let isHand = this.colors.filter(function(el, index2) {
      return el.name == colorName;
    });
    if (isHand.length > 0) {
      formatAppLog("error", "at tmui/tool/theme/theme.ts:96", "\u5DF2\u5B58\u5728\u76F8\u5173\u989C\u8272\u540D\u79F0!!!");
      return this.colors;
    }
    if (!value) {
      formatAppLog("error", "at tmui/tool/theme/theme.ts:100", "\u989C\u8272\u503C\u5FC5\u586B!!!");
      return this.colors;
    }
    let rgba = colortool.cssToRgba(value);
    let color = {
      csscolor: "",
      hsva: { h: 0, s: 0, v: 0, a: 0 },
      hsla: { h: 0, s: 0, l: 0, a: 0 },
      rgba: { r: 0, g: 0, b: 0, a: 0 },
      name: colorName,
      value
    };
    color.csscolor = colortool.rgbaToCss(rgba);
    color.hsva = colortool.rgbaToHsva(rgba);
    color.rgba = rgba;
    color.hsla = colortool.rgbaToHsla(rgba);
    this.colors.push(color);
    return this.colors;
  }
  del(colorName) {
    let isHand = this.colors.findIndex(function(el, index2) {
      return el.name == colorName;
    });
    if (isHand == -1) {
      formatAppLog("error", "at tmui/tool/theme/theme.ts:123", "\u5220\u9664\u5931\u8D25\uFF0C\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
      return;
    }
    this.colors.splice(isHand, 1);
  }
  getColor(colorName) {
    let isHand = this.colors.findIndex(function(el, index2) {
      return el.name == colorName;
    });
    if (isHand == -1) {
      colorName = "primary";
      isHand = this.colors.findIndex(function(el, index2) {
        return el.name == colorName;
      });
      formatAppLog("error", "at tmui/tool/theme/theme.ts:137", "\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
    }
    return this.colors[isHand];
  }
  getTheme(config = { colorname: "primary", dark: false }) {
    var _a2, _b2;
    if (!config["colorname"]) {
      formatAppLog("error", "at tmui/tool/theme/theme.ts:145", "\u989C\u8272\u540D\u79F0\u5FC5\u586B");
      config.colorname = "primary";
    }
    let index2 = this.colors.findIndex((el) => el.name == config.colorname);
    if (index2 == -1) {
      formatAppLog("error", "at tmui/tool/theme/theme.ts:150", "\u4E3B\u9898\u4E0D\u5B58\u5728\uFF0C\u9ED8\u8BA4\u4E3Aprimary");
      config.colorname = "primary";
    }
    let isBlack = false;
    let isWhite = false;
    let isBlackAndWhite = false;
    let isGrey = false;
    let nowColor = __spreadValues({}, this.colors[index2]);
    config.borderWidth = isNaN(parseInt(String(config["borderWidth"]))) ? 0 : config["borderWidth"];
    config.borderStyle = config["borderStyle"] ? config["borderStyle"] : "solid";
    config.borderDirection = config["borderDirection"] || cssDirection.all;
    config.linearDirection = config["linearDirection"] || linearDirection.none;
    config.linearDeep = config["linearDeep"] || linearDeep.light;
    config.shadow = isNaN(parseInt(String(config["shadow"]))) ? 6 : config["shadow"];
    config.round = isNaN(parseInt(String(config["round"]))) ? 4 : config["round"];
    config.opaticy = isNaN(parseInt(String(config["opaticy"]))) ? 1 : config["opaticy"];
    config.outlined = typeof config["outlined"] == "boolean" ? config["outlined"] : false;
    config.text = typeof config["text"] == "boolean" ? config["text"] : false;
    config.blur = typeof config["blur"] == "boolean" ? config["blur"] : false;
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
      isBlack = true;
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
      isWhite = true;
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l < 100) {
      isGrey = true;
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
      isBlackAndWhite = true;
    }
    let css = {};
    css.color = nowColor.value;
    css.config = __spreadValues({}, config);
    css.isBlackAndWhite = isBlackAndWhite;
    css.gradientColor = [];
    css.colorname = config.colorname;
    let borderhsl = __spreadValues({}, nowColor.hsla);
    css.borderCss = {};
    let bghsl = __spreadValues({}, nowColor.hsla);
    if (config.dark) {
      if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
        bghsl.l = 40;
      }
    }
    if (config.blur) {
      bghsl.a = 0.85;
    }
    css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadValues({}, bghsl)));
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config.dark) {
      css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, bghsl), { l: 8 })));
      css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config.dark && nowColor.hsla.l == 100) {
      css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 90 })));
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config.dark && nowColor.hsla.l == 0) {
      css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
    }
    css.backgroundColorCss = { "background-color": css.backgroundColor };
    let txcolor = __spreadValues({}, nowColor.hsla);
    if (config.dark) {
      txcolor.l = 95;
    } else {
      if (((_a2 = nowColor.hsla) == null ? void 0 : _a2.l) <= 60) {
        txcolor.l = 95;
      } else if (((_b2 = nowColor.hsla) == null ? void 0 : _b2.l) > 60) {
        if (isGrey) {
          txcolor.l = 10;
        } else {
          txcolor.l = 20;
        }
      }
    }
    if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
      txcolor.l = 20;
    }
    if (config.outlined) {
      txcolor.l = 50;
      if (config.dark) {
        txcolor.l = 55;
      } else {
        if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          txcolor.l = 20;
        }
      }
      if ((isBlack || isWhite) && config.dark) {
        txcolor.l = 100;
      }
      config.borderWidth = config["borderWidth"] || 2;
      let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 0, a: 0 };
      let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
      css.backgroundColor = o_bgcss;
      css.backgroundColorCss = { "background-color": o_bgcss };
      css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
      css.border = css.textColor;
    }
    if (config.text) {
      txcolor.l = 90;
      if (isGrey) {
        txcolor.l = 15;
      } else {
        txcolor.l = 55;
        if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          txcolor.l = 20;
        }
      }
      if (config.dark) {
        txcolor.l = 55;
      }
      if (isBlack) {
        txcolor.l = 90;
      }
      if (isWhite) {
        txcolor.l = 15;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config.dark) {
        txcolor.l = 90;
      }
      css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
      css.border = css.textColor;
      let o_now_bgColor = nowColor.csscolor;
      let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 96, a: nowColor.hsla.a };
      if (config.dark) {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          n_hsl.l = 12;
          n_hsl.s = 35;
        } else {
          n_hsl.l = 12;
          n_hsl.s = 0;
        }
      }
      if (config.blur) {
        n_hsl.a = 0.85;
      }
      o_now_bgColor = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
      css.backgroundColor = o_now_bgColor;
      css.backgroundColorCss = { "background-color": o_now_bgColor };
    }
    if (config.shadow) {
      let n_hsl = { h: nowColor.hsla.h, s: 100, l: 50, a: 0.2 };
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        n_hsl = { h: 0, s: 0, l: 20, a: 0.07 };
      }
      let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
      css.shadowColor = {
        boxShadow: `0rpx ${config.shadow * 2.5}rpx ${config.shadow * 6}rpx ${o_bgcss}`
      };
    }
    if (config.linearDirection) {
      let liner_color_1 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
      let liner_color_2 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
      let dir_str = linearDirection[config.linearDirection];
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
        if (config.linearDeep == "light") {
          liner_color_1.l = 80;
          liner_color_2.l = 20;
        } else {
          liner_color_1.l = 50;
          liner_color_2.l = 40;
        }
      } else if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
        if (config.linearDeep == "light") {
          liner_color_1.l = 40;
          liner_color_2.l = 10;
        } else {
          liner_color_1.l = 30;
          liner_color_2.l = 0;
        }
      } else {
        liner_color_2.h = nowColor.hsla.h;
        liner_color_2.s = nowColor.hsla.s;
        liner_color_1.h = nowColor.hsla.h;
        liner_color_1.s = nowColor.hsla.s;
        if (config.linearDeep == "light") {
          liner_color_1.l = 70;
          liner_color_1.s = 95;
          liner_color_1.h -= 5;
          liner_color_2.l = 45;
          liner_color_2.s = 95;
          liner_color_2.h += 5;
        } else if (config.linearDeep == "dark") {
          liner_color_1.l = 70;
          liner_color_1.s = 50;
          liner_color_2.l = 45;
          liner_color_2.s = 100;
        } else if (config.linearDeep == "accent") {
          liner_color_1.h -= 0;
          liner_color_1.s = 80;
          liner_color_1.l = 55;
          liner_color_2.l = 65;
          liner_color_2.h -= 35;
          liner_color_2.s = 80;
        }
      }
      if (config.dark) {
        liner_color_1.l = 40;
        liner_color_2.l = 40;
        txcolor.l = 90;
      }
      let color_t_1 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_1));
      let color_t_2 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_2));
      if (!config.text && !config.outlined) {
        css.backgroundColorCss = { "background-image": `linear-gradient(${dir_str},${color_t_1},${color_t_2})` };
        let newBgcolor = {
          h: (liner_color_1.h + liner_color_2.h) / 2,
          s: (liner_color_1.s + liner_color_2.s) / 2,
          l: (liner_color_1.l + liner_color_2.l) / 2,
          a: (liner_color_1.a + liner_color_2.a) / 2
        };
        if (!config.dark) {
          if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            txcolor.l = 20;
          }
        }
        css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(newBgcolor));
        css.gradientColor = [color_t_1, color_t_2];
      }
    }
    if (config.dark == true) {
      css.cardcolor = "rgba(26, 26,26, 1.0)";
      css.inputcolor = "rgba(31, 31,31, 1.0)";
      css.bodycolor = "rgba(5,5,5, 1.0)";
      css.disablecolor = "rgba(30, 30, 30, 1.0)";
      css.textDisableColor = "rgba(100, 100, 100, 1.0)";
    }
    css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
    if (config.dark) {
      if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l + 10 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 12 })));
      }
    } else {
      if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l - 10 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 90 })));
      }
    }
    if (config.borderDirection == "all") {
      css.borderCss[`border`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    } else if (config.borderDirection == "x" || config.borderDirection == "leftright") {
      css.borderCss[`border-left`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      css.borderCss[`border-right`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    } else if (config.borderDirection == "y" || config.borderDirection == "topbottom") {
      css.borderCss[`border-top`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      css.borderCss[`border-bottom`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    } else if (config.borderDirection == "bottomleft") {
      css.borderCss[`border-left`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      css.borderCss[`border-bottom`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    } else if (config.borderDirection == "bottomright") {
      css.borderCss[`border-right`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      css.borderCss[`border-bottom`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    } else if (config.borderDirection == "topleft") {
      css.borderCss[`border-left`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      css.borderCss[`border-top`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    } else if (config.borderDirection == "topright") {
      css.borderCss[`border-right`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      css.borderCss[`border-top`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    } else {
      let str = "-" + config.borderDirection;
      css.borderCss[`border${str}`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    }
    return css;
  }
}
var theme = {
  isCssColor,
  themeColors,
  getColor
};
function setCookie(key, data) {
  try {
    uni.setStorageSync(key, data);
    return true;
  } catch (e) {
    return false;
  }
}
function getCookie(key) {
  try {
    const value = uni.getStorageSync(key);
    try {
      let val2 = JSON.parse(value);
      return val2;
    } catch (e) {
      return value;
    }
  } catch (e) {
    return void 0;
  }
}
let pdefault_cookies_color = getCookie("setTmVuetifyColor") || "";
let pdefault_cookies_black = getCookie("setTmVuetifyBlack");
let pdefault_cookies_local = getCookie("setTmVuetifyLocal") || "zh-Hans";
let pdefault_cookies_colorArrayList = getCookie("colorArrayList");
let dark = typeof pdefault_cookies_black === "boolean" ? pdefault_cookies_black : false;
let themeObj = new theme.themeColors();
if (pdefault_cookies_colorArrayList) {
  const result2 = pdefault_cookies_colorArrayList.filter((item) => themeObj.colors.every((subItem) => subItem.name !== item.name));
  themeObj = new theme.themeColors([...themeObj.colors, ...result2]);
}
const colorArray = themeObj.colors;
const os = (_b = (_a = uni.getSystemInfoSync()) == null ? void 0 : _a.osName) != null ? _b : "";
setCookie("colorArrayList", colorArray);
const useTmpiniaStore = defineStore("tmpinia", {
  state: () => {
    return {
      tmStore: {
        color: pdefault_cookies_color,
        dark,
        tmVueTifly_pages: "",
        tmVueTifly_pagesIndex: "",
        os,
        wxshareConfig_miniMp: {
          title: "",
          desc: "",
          imageUrl: "",
          path: "",
          copyLink: "",
          query: {}
        },
        colorList: colorArray,
        local: pdefault_cookies_local
      }
    };
  },
  actions: {
    setPageNow(url) {
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        tmVueTifly_pages: url
      });
    },
    setPageNowIndex(index2) {
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        tmVueTifly_pagesIndex: index2
      });
    },
    setTmVuetifyDark(dark2) {
      dark2 = typeof dark2 !== "boolean" ? false : dark2;
      setCookie("setTmVuetifyBlack", dark2);
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        dark: dark2
      });
    },
    setWxShare(cfg) {
      let pcf = cfg || {};
      if (typeof pcf !== "object" || Array.isArray(cfg))
        pcf = {};
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        wxshareConfig_miniMp: __spreadValues(__spreadValues({}, this.tmStore.wxshareConfig_miniMp), pcf)
      });
    },
    setTmVuetifyTheme(color) {
      let defaultColorName = color;
      if (!defaultColorName || defaultColorName == "" || theme.isCssColor(defaultColorName)) {
        defaultColorName = "";
      }
      setCookie("setTmVuetifyColor", defaultColorName);
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), { color: defaultColorName });
    },
    setTmVuetifyAddTheme(colorName, color, isSet = true) {
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        colorList: themeObj.add(colorName, color)
      });
      setCookie("colorArrayList", this.tmStore.colorList);
      if (isSet) {
        this.setTmVuetifyTheme(colorName);
      }
    },
    setTmLocal(language2) {
      language2 = language2 || "zh-Hans";
      setCookie("setTmVuetifyLocal", language2);
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        local: language2
      });
    }
  }
});
const custom_props = {
  _style: {
    type: [Array, String, Object],
    default: () => []
  },
  _class: {
    type: [Array, String],
    default: ""
  },
  color: {
    type: String,
    default: "primary"
  },
  followTheme: {
    type: [Boolean, String],
    default: false
  },
  dark: {
    type: [Boolean, String],
    default: false
  },
  followDark: {
    type: [Boolean, String],
    default: true
  },
  round: {
    type: [Number],
    default: 0
  },
  shadow: {
    type: [Number],
    default: 0
  },
  outlined: {
    type: [Boolean],
    default: false
  },
  border: {
    type: [Number],
    default: 0
  },
  borderStyle: {
    type: [String],
    default: borderStyle.solid,
    validator: (value) => {
      let mp = ["dashed", "dotted", "solid"];
      if (!mp.includes(value)) {
        formatAppLog("error", "at tmui/tool/lib/minxs.ts:78", "\u8FB9\u7EBF\u7C7B\u578B\u53EA\u80FD\u4E3AborderStyle\u4E2D\u7684\u4E00\u79CD\u3002");
      }
      return mp.includes(value);
    }
  },
  borderDirection: {
    type: String,
    default: cssDirection.all,
    validator: (value) => {
      let mp = ["all", "bottom", "bottomleft", "bottomright", "left", "leftright", "right", "right", "top", "topbottom", "topleft", "topright", "x", "y"];
      if (!mp.includes(value)) {
        formatAppLog("error", "at tmui/tool/lib/minxs.ts:92", "\u8FB9\u7EBF\u65B9\u5411\u683C\u5F0F\u53EA\u80FD\u4E3AcssDirection\u4E2D\u7684\u4E00\u79CD\u3002");
      }
      return mp.includes(value);
    }
  },
  text: {
    type: [Boolean, String],
    default: false
  },
  transprent: {
    type: [Boolean, String],
    default: true
  },
  linear: {
    type: [String],
    default: linearDirection.none,
    validator: (value) => {
      let mp = ["left", "right", "bottom", "top", ""];
      if (!mp.includes(value)) {
        formatAppLog("error", "at tmui/tool/lib/minxs.ts:120", "\u6E10\u53D8\u65B9\u5411\u53EA\u80FD\u4E3A,left:\u53F3->\u5DE6\uFF0Cright:\u5DE6->\u53F3\u3002top:\u4E0B->\u4E0A\uFF0Cbottom:\u4E0A->\u4E0B,\u4E2D\u7684\u4E00\u79CD\u3002");
      }
      return mp.includes(value);
    }
  },
  linearDeep: {
    type: [String],
    default: linearDeep.light,
    validator: (value) => {
      let mp = ["accent", "dark", "light"];
      if (!mp.includes(value)) {
        formatAppLog("error", "at tmui/tool/lib/minxs.ts:132", "\u6E10\u53D8\u65B9\u5411\u53EA\u80FD\u4E3Alight,dark,accent\u4E2D\u7684\u4E00\u79CD\u3002");
      }
      return mp.includes(value);
    }
  },
  isDisabledRoundAndriod: {
    type: [Boolean, String],
    default: false
  },
  blur: {
    type: Boolean,
    default: false
  }
};
const computedDark = (props, tmcfg) => {
  const followDark = props.followDark;
  const dark2 = props.dark;
  const glboalDark = tmcfg.dark;
  if (followDark) {
    return glboalDark;
  }
  return dark2;
};
const computedClass = (props) => {
  const _class = props._class;
  if (typeof _class == "string") {
    return _class;
  }
  if (Array.isArray(_class)) {
    return _class.join(" ");
  }
  return "";
};
const computedStyle = (props) => {
  const _style = props._style;
  if (typeof _style == "string") {
    let p = _style.split(";");
    let k = p.map((el) => {
      el = el.replace(";", "");
      let node = {};
      let idx = el.split(":");
      node[idx[0]] = idx[1];
      return node;
    });
    let kl = {};
    k.forEach((el) => {
      kl = __spreadValues(__spreadValues({}, kl), el);
    });
    return kl;
  }
  if (typeof _style == "object" && !Array.isArray(_style)) {
    return _style;
  }
  if (typeof _style == "object" && Array.isArray(_style)) {
    let kl = {};
    _style.forEach((el) => {
      kl = __spreadValues(__spreadValues({}, kl), el);
    });
    return kl;
  }
  return {};
};
const computedTheme = (props, dark2, store) => {
  const color = props.color;
  const border = props.border;
  const shadow = props.shadow;
  const round = props.round;
  const outlined = props.outlined;
  const text = props.text;
  const borderStyle2 = props.borderStyle;
  const borderDirection = props.borderDirection;
  const linear = props.linear;
  const linearDeep2 = props.linearDeep;
  const blur = props.blur;
  if (theme.isCssColor(color)) {
    formatAppLog("error", "at tmui/tool/lib/minxs.ts:213", "\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u4E0A\u7684\u989C\u8272\u503C\uFF0C\u8BF7\u5728theme/theme.js\u4E2D\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684\u989C\u8272\u503C\u4E3A\u4E3B\u9898\u3002\u5F53\u524D\u5DF2\u5207\u6362\u4E3Aprimary\u4E3B\u9898\u3002");
  }
  let defaultColorName = color || "primary";
  if ((props == null ? void 0 : props.followTheme) == true && store.color) {
    defaultColorName = store.color;
  }
  var theme$12 = new theme.themeColors(store.colorList);
  let c = theme$12.getTheme({
    colorname: defaultColorName,
    dark: dark2,
    borderWidth: border,
    shadow: parseInt(String(shadow)),
    round: parseInt(String(round)),
    outlined: outlined ? true : false,
    text: text ? true : false,
    borderStyle: borderStyle2,
    borderDirection,
    linearDirection: linear,
    linearDeep: linearDeep2,
    blur
  });
  return c;
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val2] of props) {
    target[key] = val2;
  }
  return target;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "tm-app",
  props: __spreadProps(__spreadValues({}, custom_props), {
    theme: {
      type: String,
      default: "grey-5"
    },
    bgImg: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "grey-4"
    },
    darkColor: {
      type: String,
      default: "#050505"
    },
    blur: {
      type: [Boolean, String],
      default: false
    },
    navbar: {
      type: Object,
      default: () => {
        return {
          background: "#ffffff",
          fontColor: "#000000"
        };
      }
    },
    tabar: {
      type: Object,
      default: () => {
        return {
          background: "#ffffff",
          fontColor: "#222222"
        };
      }
    }
  }),
  setup(__props, { expose }) {
    var _a2, _b2;
    const props = __props;
    const store = useTmpiniaStore();
    getCurrentInstance();
    const tmcfg = computed(() => store.tmStore);
    const isSetThemeOk = ref(false);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(props, isDark.value, tmcfg.value));
    const {
      safeArea,
      windowWidth,
      windowHeight,
      statusBarHeight,
      windowTop
    } = uni.getSystemInfoSync();
    const sysinfo = uni.getSystemInfoSync();
    const view_width = ref(sysinfo.windowWidth);
    let view_height = ref(windowHeight + (windowTop || 0));
    if ((((_a2 = sysinfo == null ? void 0 : sysinfo.safeArea) == null ? void 0 : _a2.top) || 0) > 0) {
      view_height.value = sysinfo.screenHeight;
    } else {
      view_height.value = (((_b2 = sysinfo == null ? void 0 : sysinfo.safeArea) == null ? void 0 : _b2.height) || 0) - Math.abs(statusBarHeight || 0);
    }
    let appConfig = ref({
      width: view_width,
      height: view_height,
      theme: tmcomputed.value.backgroundColor,
      bgImg: props.bgImg,
      dark: isDark.value
    });
    function setAppStyle() {
      var _a3, _b3;
      if (isDark.value) {
        appConfig.value.theme = props.darkColor;
      } else {
        appConfig.value.theme = tmcomputed.value.backgroundColor;
      }
      if ((_b3 = (_a3 = plus == null ? void 0 : plus.webview) == null ? void 0 : _a3.currentWebview()) == null ? void 0 : _b3.setStyle) {
        plus.webview.currentWebview().setStyle({
          background: appConfig.value.theme,
          backgroundColorTop: appConfig.value.theme,
          backgroundColorBottom: appConfig.value.theme,
          userSelect: true,
          webviewBGTransparent: true
        });
      }
      if (uni.getSystemInfoSync().osName == "android") {
        var Color = plus.android.importClass("android.graphics.Color");
        plus.android.importClass("android.view.Window");
        var mainActivity = plus.android.runtimeMainActivity();
        var window_android = mainActivity == null ? void 0 : mainActivity.getWindow();
        if (appConfig.value.dark) {
          window_android.setNavigationBarColor(Color.BLACK);
        } else {
          window_android.setNavigationBarColor(Color.WHITE);
        }
      }
      if (isDark.value) {
        uni.setNavigationBarColor({
          backgroundColor: appConfig.value.theme,
          frontColor: "#ffffff"
        });
        uni.setTabBarStyle({
          backgroundColor: "#000000",
          borderStyle: "#1a1a1a",
          color: "#ffffff"
        }).catch((e) => {
        });
      } else {
        uni.setNavigationBarColor({
          backgroundColor: props.navbar.background,
          frontColor: props.navbar.fontColor
        }).catch((e) => {
        });
        uni.setTabBarStyle({
          backgroundColor: props.navbar.background,
          borderStyle: "#888888",
          color: props.navbar.fontColor
        }).catch((e) => {
        });
      }
      isSetThemeOk.value = true;
    }
    provide("appTextColor", computed(() => tmcomputed.value.textColor));
    provide("custom_space_size", [0, 0]);
    function setTheme(colorName) {
      store.setTmVuetifyTheme(colorName);
    }
    function setDark(dark2) {
      let maindark = !isDark.value;
      if (typeof dark2 !== "undefined" && typeof dark2 == "boolean") {
        maindark = dark2;
      }
      appConfig.value.dark = maindark;
      store.setTmVuetifyDark(maindark);
    }
    expose({
      setTheme,
      setDark
    });
    onBeforeMount(() => setAppStyle());
    watch([() => tmcfg.value.color, isDark], () => {
      isSetThemeOk.value = false;
      setAppStyle();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col relative",
        style: normalizeStyle([unref(appConfig).theme ? { background: unref(appConfig).theme } : "", { width: unref(appConfig).width + "px", minHeight: unref(appConfig).height + "px" }])
      }, [
        isSetThemeOk.value ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: normalizeClass(["flex flex-col flex-1", [__props.blur ? "blur" : ""]]),
          style: normalizeStyle([
            {
              zIndex: 1,
              width: unref(appConfig).width + "px",
              minHeight: unref(appConfig).height + "px"
            },
            __props.blur ? { backgroundColor: unref(isDark) ? "rgba(0,0,0,0.3)" : "rgba(248, 248, 248, 0.7)" } : ""
          ])
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createElementVNode("u-text", null, "\u5728\u8FD9\u91CC\u653E\u7F6E\u5185\u5BB9")
          ])
        ], 6)) : createCommentVNode("v-if", true)
      ], 4);
    };
  }
});
var tmApp = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-app/tm-app.vue"]]);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "tm-sheet",
  props: __spreadProps(__spreadValues({}, custom_props), {
    parenClass: {
      type: String,
      default: ""
    },
    contStyle: {
      type: String,
      default: ""
    },
    height: {
      type: [Number],
      default: 0
    },
    width: {
      type: [Number],
      default: 0
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: [Number, String],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [32, 24]
    },
    padding: {
      type: Array,
      default: () => [24, 24]
    },
    unit: {
      type: String,
      default: "rpx"
    },
    hoverClass: {
      type: String,
      default: "none"
    },
    darkBgColor: {
      type: String,
      default: ""
    },
    noLevel: {
      type: Boolean,
      default: false
    },
    blur: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click", "longpress", "touchend", "touchstart", "touchcancel", "mousedown", "mouseup", "mouseleave"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    getCurrentInstance();
    const parenClass_p = computed(() => props.parenClass);
    const contStyle_p = computed(() => props.contStyle);
    const _transprent = computed(() => props.transprent);
    const tmcfg = computed(() => store.tmStore);
    const _blur = computed(() => {
      if (tmcfg.value.os == "android" && _isNvue.value) {
        return false;
      }
      return props.blur;
    });
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => {
      let text = props.text;
      if (_blur.value && tmcfg.value.os == "ios") {
        text = true;
      }
      return computedTheme(__spreadProps(__spreadValues({}, props), { blur: _blur.value, text }), isDark.value, tmcfg.value);
    });
    const _isNvue = ref(false);
    _isNvue.value = true;
    const _margin = computed(() => props.margin);
    const _padding = computed(() => props.padding);
    const _width = computed(() => props.width);
    const _height = computed(() => props.height);
    const _noLevel = computed(() => props.noLevel);
    const _blue_sheet = ref(true);
    const _blurEffect = computed(() => {
      if (props.blur === true && isDark.value)
        return "dark";
      if (props.blur === true && !isDark.value)
        return "extralight";
      return "none";
    });
    watch(() => isDark.value, () => {
      if (store.tmStore.os == "ios" && _blur.value === true) {
        _blue_sheet.value = false;
        nextTick(() => _blue_sheet.value = true);
      }
    });
    const _bgcolor = computed(() => {
      var _a2;
      if (_transprent.value === true)
        return `background-color:rgba(255,255,255,0);`;
      if (props.darkBgColor !== "" && isDark.value === true) {
        return `background-color:${props.darkBgColor};`;
      }
      if (((_a2 = tmcomputed.value.gradientColor) == null ? void 0 : _a2.length) === 2) {
        return tmcomputed.value.backgroundColorCss;
      }
      if (_noLevel.value && tmcomputed.value.isBlackAndWhite === true && isDark.value === true) {
        return `background-color: ${tmcomputed.value.inputcolor}`;
      }
      return `background-color: ${tmcomputed.value.backgroundColor}`;
    });
    const isLongPress = ref(false);
    function longpress(e) {
      isLongPress.value = true;
      emits("longpress", e);
    }
    function touchstart(e) {
      isLongPress.value = true;
      emits("touchstart", e);
    }
    function touchend(e) {
      isLongPress.value = false;
      emits("touchend", e);
    }
    function touchcancel(e) {
      isLongPress.value = false;
      emits("touchcancel", e);
    }
    function mousedown(e) {
      isLongPress.value = true;
      emits("mousedown", e);
    }
    function mouseup(e) {
      isLongPress.value = false;
      emits("mouseup", e);
    }
    function mouseleave(e) {
      isLongPress.value = false;
      emits("mouseleave", e);
    }
    computed(() => {
      let w = parseFloat(String(_width.value)) - parseFloat(String(props.padding[0]));
      w = w - parseFloat(String(props.border)) * 2;
      return w;
    });
    computed(() => {
      let h2 = parseFloat(String(_height.value)) - parseFloat(String(props.padding[1]));
      h2 = h2 - parseFloat(String(props.border)) * 2;
      return h2;
    });
    let textColor = computed(() => {
      return tmcomputed.value.textColor;
    });
    provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return _blue_sheet.value ? (openBlock(), createElementBlock("view", {
        key: 0,
        renderWhole: true,
        blurEffect: unref(_blurEffect),
        onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
        onLongpress: longpress,
        onTouchend: touchend,
        onTouchstart: touchstart,
        onTouchcancel: touchcancel,
        onMousedown: mousedown,
        onMouseup: mouseup,
        onMouseleave: mouseleave,
        class: normalizeClass([
          "flex flex-col",
          unref(parenClass_p),
          `mx-${unref(_margin)[0]}`,
          `my-${unref(_margin)[1]}`,
          `px-${unref(_padding)[0]}`,
          `py-${unref(_padding)[1]}`,
          isLongPress.value ? props.hoverClass : "",
          props.hoverClass != "" && props.hoverClass != "none" ? "pointer" : "",
          !_ctx.isDisabledRoundAndriod ? `round-${props.round}` : ""
        ]),
        style: normalizeStyle([
          unref(_height) ? { height: unref(_height) + unref(_padding)[1] * 2 + props.unit } : "",
          unref(_width) ? { width: unref(_width) + unref(_padding)[0] * 2 + props.unit } : "",
          unref(tmcomputed).borderCss,
          unref(_blur) && unref(store).tmStore.os == "ios" && _isNvue.value === true ? "" : unref(_bgcolor),
          !unref(_transprent) && props.shadow > 0 ? unref(tmcomputed).shadowColor : "",
          !unref(_transprent) && unref(_blur) ? { "backdrop-filter": "blur(10px)" } : "",
          unref(customCSSStyle)
        ])
      }, [
        createElementVNode("view", {
          renderWhole: true,
          class: normalizeClass(["flex  flex-col flex-1", unref(customClass)]),
          style: normalizeStyle(unref(contStyle_p))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6)
      ], 46, ["blurEffect"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmSheet = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-sheet/tm-sheet.vue"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "tm-text",
  props: __spreadProps(__spreadValues({}, custom_props), {
    label: {
      type: [String, Number],
      default: ""
    },
    fontSize: {
      type: [Number, String],
      default: 28
    },
    color: {
      type: String,
      default: ""
    },
    selectable: {
      type: [Boolean, String],
      default: false
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const _label = computed(() => props.label);
    const _fontSize = computed(() => Number(props.fontSize));
    const appTextColor = inject("appTextColor", computed(() => void 0));
    const textColor = computed(() => {
      if (props.followTheme && store.tmStore.color)
        return store.tmStore.color;
      let isColorHex = theme.isCssColor(props.color);
      if (isColorHex)
        return props.color;
      if (props.color && !isColorHex) {
        let nowcolor = theme.getColor(props.color);
        return nowcolor.csscolor;
      }
      if (!appTextColor) {
        if (isDark)
          return "rgba(252, 252, 252, 1.0)";
        return "rgba(34, 34, 34, 1.0)";
      }
      if (appTextColor.value) {
        return appTextColor.value;
      }
      return "rgba(34, 34, 34, 1.0)";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        renderWhole: true,
        class: "flex",
        style: { "line-height": "0" }
      }, [
        createElementVNode("u-text", {
          renderWhole: true,
          onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
          selectable: __props.selectable,
          userSelect: __props.selectable,
          class: normalizeClass([unref(_fontSize) ? "" : "text-size-m", unref(customClass)]),
          style: normalizeStyle([
            {
              lineHeight: (unref(_fontSize) ? unref(_fontSize) * 1.3 : 42) + props.unit,
              color: unref(textColor)
            },
            unref(_fontSize) ? { fontSize: unref(_fontSize) + props.unit } : "",
            unref(customCSSStyle)
          ])
        }, toDisplayString$1(unref(_label)), 15, ["selectable", "userSelect"])
      ]);
    };
  }
});
var tmText = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-text/tm-text.vue"]]);
const id = "2660213";
const name = "tmui";
const font_family = "tmicon";
const css_prefix_text = "tmicon-";
const description = "";
const glyphs = [
  {
    icon_id: "1250665",
    name: "\u5706",
    font_class: "yuan",
    unicode: "e657",
    unicode_decimal: 58967
  },
  {
    icon_id: "7137863",
    name: "ios-airplane",
    font_class: "ios-airplane",
    unicode: "e852",
    unicode_decimal: 59474
  },
  {
    icon_id: "7137864",
    name: "ios-woman",
    font_class: "ios-woman",
    unicode: "e859",
    unicode_decimal: 59481
  },
  {
    icon_id: "7137869",
    name: "ios-aperture",
    font_class: "ios-aperture",
    unicode: "e866",
    unicode_decimal: 59494
  },
  {
    icon_id: "7137873",
    name: "ios-alarm",
    font_class: "ios-alarm",
    unicode: "e868",
    unicode_decimal: 59496
  },
  {
    icon_id: "7137875",
    name: "ios-arrow-dropdown",
    font_class: "ios-arrow-dropdown",
    unicode: "e869",
    unicode_decimal: 59497
  },
  {
    icon_id: "7137879",
    name: "ios-arrow-dropleft-c",
    font_class: "ios-arrow-dropleft-c",
    unicode: "e876",
    unicode_decimal: 59510
  },
  {
    icon_id: "7137880",
    name: "ios-arrow-dropleft",
    font_class: "ios-arrow-dropleft",
    unicode: "e87c",
    unicode_decimal: 59516
  },
  {
    icon_id: "7137881",
    name: "ios-arrow-dropup",
    font_class: "ios-arrow-dropup",
    unicode: "e87f",
    unicode_decimal: 59519
  },
  {
    icon_id: "7137882",
    name: "ios-arrow-dropright-",
    font_class: "ios-arrow-dropright-",
    unicode: "e880",
    unicode_decimal: 59520
  },
  {
    icon_id: "7137883",
    name: "ios-arrow-dropdown-c",
    font_class: "ios-arrow-dropdown-c",
    unicode: "e886",
    unicode_decimal: 59526
  },
  {
    icon_id: "7137886",
    name: "ios-arrow-dropup-cir",
    font_class: "ios-arrow-dropup-cir",
    unicode: "e88d",
    unicode_decimal: 59533
  },
  {
    icon_id: "7137887",
    name: "ios-arrow-dropright",
    font_class: "ios-arrow-dropright",
    unicode: "e890",
    unicode_decimal: 59536
  },
  {
    icon_id: "7137892",
    name: "ios-attach",
    font_class: "ios-attach",
    unicode: "e893",
    unicode_decimal: 59539
  },
  {
    icon_id: "7137893",
    name: "ios-at",
    font_class: "ios-at",
    unicode: "e894",
    unicode_decimal: 59540
  },
  {
    icon_id: "7137901",
    name: "ios-bed",
    font_class: "ios-bed",
    unicode: "e895",
    unicode_decimal: 59541
  },
  {
    icon_id: "7137903",
    name: "ios-battery-full",
    font_class: "ios-battery-full",
    unicode: "e896",
    unicode_decimal: 59542
  },
  {
    icon_id: "7137906",
    name: "ios-bookmarks",
    font_class: "ios-bookmarks",
    unicode: "e897",
    unicode_decimal: 59543
  },
  {
    icon_id: "7137926",
    name: "ios-bluetooth",
    font_class: "ios-bluetooth",
    unicode: "e898",
    unicode_decimal: 59544
  },
  {
    icon_id: "7137930",
    name: "ios-cellular",
    font_class: "ios-cellular",
    unicode: "e899",
    unicode_decimal: 59545
  },
  {
    icon_id: "7137971",
    name: "ios-cut",
    font_class: "ios-cut",
    unicode: "e89a",
    unicode_decimal: 59546
  },
  {
    icon_id: "7138027",
    name: "ios-leaf",
    font_class: "ios-leaf",
    unicode: "e89b",
    unicode_decimal: 59547
  },
  {
    icon_id: "7138043",
    name: "ios-mic",
    font_class: "ios-mic",
    unicode: "e89c",
    unicode_decimal: 59548
  },
  {
    icon_id: "7138045",
    name: "ios-mail-open",
    font_class: "ios-mail-open",
    unicode: "e89d",
    unicode_decimal: 59549
  },
  {
    icon_id: "7138078",
    name: "ios-partly-sunny",
    font_class: "ios-partly-sunny",
    unicode: "e8a0",
    unicode_decimal: 59552
  },
  {
    icon_id: "7138095",
    name: "ios-radio-button-on",
    font_class: "ios-radio-button-on",
    unicode: "e8a1",
    unicode_decimal: 59553
  },
  {
    icon_id: "7138098",
    name: "ios-radio-button-off",
    font_class: "ios-radio-button-off",
    unicode: "e8a2",
    unicode_decimal: 59554
  },
  {
    icon_id: "7138105",
    name: "ios-remove",
    font_class: "ios-remove",
    unicode: "e8a3",
    unicode_decimal: 59555
  },
  {
    icon_id: "7138112",
    name: "ios-remove-circle-ou",
    font_class: "ios-remove-circle-ou",
    unicode: "e8a4",
    unicode_decimal: 59556
  },
  {
    icon_id: "7138113",
    name: "ios-remove-circle",
    font_class: "ios-remove-circle",
    unicode: "e8a5",
    unicode_decimal: 59557
  },
  {
    icon_id: "7138118",
    name: "ios-rocket",
    font_class: "ios-rocket",
    unicode: "e8a6",
    unicode_decimal: 59558
  },
  {
    icon_id: "7138122",
    name: "ios-ribbon",
    font_class: "ios-ribbon",
    unicode: "e8a7",
    unicode_decimal: 59559
  },
  {
    icon_id: "7138128",
    name: "ios-star",
    font_class: "ios-star",
    unicode: "e8a8",
    unicode_decimal: 59560
  },
  {
    icon_id: "7138134",
    name: "ios-star-half",
    font_class: "ios-star-half",
    unicode: "e8a9",
    unicode_decimal: 59561
  },
  {
    icon_id: "7138135",
    name: "ios-star-outline",
    font_class: "ios-star-outline",
    unicode: "e8aa",
    unicode_decimal: 59562
  },
  {
    icon_id: "7138137",
    name: "ios-snow",
    font_class: "ios-snow",
    unicode: "e8ab",
    unicode_decimal: 59563
  },
  {
    icon_id: "7138138",
    name: "ios-stopwatch",
    font_class: "ios-stopwatch",
    unicode: "e8ac",
    unicode_decimal: 59564
  },
  {
    icon_id: "7138139",
    name: "ios-sunny",
    font_class: "ios-sunny",
    unicode: "e8ad",
    unicode_decimal: 59565
  },
  {
    icon_id: "7138160",
    name: "ios-unlock",
    font_class: "ios-unlock",
    unicode: "e8ae",
    unicode_decimal: 59566
  },
  {
    icon_id: "7138165",
    name: "ios-trophy",
    font_class: "ios-trophy",
    unicode: "e8af",
    unicode_decimal: 59567
  },
  {
    icon_id: "7138167",
    name: "ios-umbrella",
    font_class: "ios-umbrella",
    unicode: "e8b0",
    unicode_decimal: 59568
  },
  {
    icon_id: "7138168",
    name: "ios-videocam",
    font_class: "ios-videocam",
    unicode: "e8b1",
    unicode_decimal: 59569
  },
  {
    icon_id: "7138169",
    name: "ios-volume-high",
    font_class: "ios-volume-high",
    unicode: "e8b2",
    unicode_decimal: 59570
  },
  {
    icon_id: "7138170",
    name: "ios-water",
    font_class: "ios-water",
    unicode: "e8b3",
    unicode_decimal: 59571
  },
  {
    icon_id: "7138176",
    name: "ios-wifi",
    font_class: "ios-wifi",
    unicode: "e8b4",
    unicode_decimal: 59572
  },
  {
    icon_id: "7138213",
    name: "md-water",
    font_class: "md-water",
    unicode: "e8b5",
    unicode_decimal: 59573
  },
  {
    icon_id: "7138292",
    name: "md-checkbox",
    font_class: "md-checkbox",
    unicode: "e8b6",
    unicode_decimal: 59574
  },
  {
    icon_id: "7138295",
    name: "md-chatbubbles",
    font_class: "md-chatbubbles",
    unicode: "e8b7",
    unicode_decimal: 59575
  },
  {
    icon_id: "7138296",
    name: "md-chatboxes",
    font_class: "md-chatboxes",
    unicode: "e8b8",
    unicode_decimal: 59576
  },
  {
    icon_id: "7138301",
    name: "md-cloud-done",
    font_class: "md-cloud-done",
    unicode: "e8b9",
    unicode_decimal: 59577
  },
  {
    icon_id: "7138303",
    name: "md-cloud-upload",
    font_class: "md-cloud-upload",
    unicode: "e8ba",
    unicode_decimal: 59578
  },
  {
    icon_id: "7138310",
    name: "md-cloudy",
    font_class: "md-cloudy",
    unicode: "e8bb",
    unicode_decimal: 59579
  },
  {
    icon_id: "7138328",
    name: "md-contrast",
    font_class: "md-contrast",
    unicode: "e8bc",
    unicode_decimal: 59580
  },
  {
    icon_id: "7138332",
    name: "md-disc",
    font_class: "md-disc",
    unicode: "e8bd",
    unicode_decimal: 59581
  },
  {
    icon_id: "7138369",
    name: "md-heart-empty",
    font_class: "md-heart-empty",
    unicode: "e8be",
    unicode_decimal: 59582
  },
  {
    icon_id: "7138372",
    name: "md-heart",
    font_class: "md-heart",
    unicode: "e8bf",
    unicode_decimal: 59583
  },
  {
    icon_id: "7138374",
    name: "md-home",
    font_class: "md-home",
    unicode: "e8c0",
    unicode_decimal: 59584
  },
  {
    icon_id: "7138376",
    name: "md-mail-open",
    font_class: "md-mail-open",
    unicode: "e8c1",
    unicode_decimal: 59585
  },
  {
    icon_id: "7138391",
    name: "md-heart-half",
    font_class: "md-heart-half",
    unicode: "e8c2",
    unicode_decimal: 59586
  },
  {
    icon_id: "7138393",
    name: "md-person",
    font_class: "md-person",
    unicode: "e8c3",
    unicode_decimal: 59587
  },
  {
    icon_id: "7138405",
    name: "md-people",
    font_class: "md-people",
    unicode: "e8c4",
    unicode_decimal: 59588
  },
  {
    icon_id: "7138421",
    name: "md-more",
    font_class: "md-more",
    unicode: "e8c5",
    unicode_decimal: 59589
  },
  {
    icon_id: "7138431",
    name: "md-moon",
    font_class: "md-moon",
    unicode: "e8c6",
    unicode_decimal: 59590
  },
  {
    icon_id: "7138481",
    name: "md-pin",
    font_class: "md-pin",
    unicode: "e8c7",
    unicode_decimal: 59591
  },
  {
    icon_id: "577338",
    name: "\u66F4\u591A",
    font_class: "gengduo",
    unicode: "e73a",
    unicode_decimal: 59194
  },
  {
    icon_id: "1420800",
    name: "IOS",
    font_class: "ios",
    unicode: "e60c",
    unicode_decimal: 58892
  },
  {
    icon_id: "1445619",
    name: "wifi-off",
    font_class: "wifi-off",
    unicode: "e93a",
    unicode_decimal: 59706
  },
  {
    icon_id: "3629124",
    name: "\u5217\u8868\u7A7A\u7A7A",
    font_class: "shiliangzhinengduixiang-",
    unicode: "e6ad",
    unicode_decimal: 59053
  },
  {
    icon_id: "3977929",
    name: "\u5FAE\u4FE1\u652F\u4ED8",
    font_class: "weixinzhifu",
    unicode: "e605",
    unicode_decimal: 58885
  },
  {
    icon_id: "8338693",
    name: "\u94F6\u884C\u5361",
    font_class: "yinhangqia",
    unicode: "e6c9",
    unicode_decimal: 59081
  },
  {
    icon_id: "9306316",
    name: "\u4E91\u95EA\u4ED8",
    font_class: "yunshanfu",
    unicode: "e68b",
    unicode_decimal: 59019
  },
  {
    icon_id: "15989503",
    name: "\u5934\u6761\u6837\u5F0F",
    font_class: "toutiaoyangshi",
    unicode: "e622",
    unicode_decimal: 58914
  },
  {
    icon_id: "18166694",
    name: "\u6296\u97F3",
    font_class: "douyin",
    unicode: "e8db",
    unicode_decimal: 59611
  },
  {
    icon_id: "18166716",
    name: "\u652F\u4ED8,\u652F\u4ED8\u5B9D",
    font_class: "alipay",
    unicode: "e8de",
    unicode_decimal: 59614
  },
  {
    icon_id: "24164616",
    name: "\u534E\u4E3A",
    font_class: "huawei",
    unicode: "e610",
    unicode_decimal: 58896
  },
  {
    icon_id: "167190",
    name: "\u94FE\u63A5",
    font_class: "lianjie",
    unicode: "e665",
    unicode_decimal: 58981
  },
  {
    icon_id: "1185485",
    name: "\u5FAE\u4FE1",
    font_class: "weixin",
    unicode: "e63f",
    unicode_decimal: 58943
  },
  {
    icon_id: "6556747",
    name: "\u670B\u53CB\u5708",
    font_class: "pengyouquan",
    unicode: "e615",
    unicode_decimal: 58901
  },
  {
    icon_id: "6756291",
    name: "\u5FAE\u535A",
    font_class: "weibo",
    unicode: "e608",
    unicode_decimal: 58888
  },
  {
    icon_id: "16286932",
    name: "QQ",
    font_class: "QQ",
    unicode: "e60f",
    unicode_decimal: 58895
  },
  {
    icon_id: "16322953",
    name: "\u5C0F\u7A0B\u5E8F",
    font_class: "xiaochengxu",
    unicode: "e706",
    unicode_decimal: 59142
  },
  {
    icon_id: "6151036",
    name: "display-code",
    font_class: "display-code",
    unicode: "e792",
    unicode_decimal: 59282
  },
  {
    icon_id: "6151037",
    name: "display-arrow-right",
    font_class: "display-arrow-right",
    unicode: "e793",
    unicode_decimal: 59283
  },
  {
    icon_id: "6151038",
    name: "display-arrow-left",
    font_class: "display-arrow-left",
    unicode: "e794",
    unicode_decimal: 59284
  },
  {
    icon_id: "6151039",
    name: "laptop-error",
    font_class: "laptop-error",
    unicode: "e795",
    unicode_decimal: 59285
  },
  {
    icon_id: "6151040",
    name: "laptop-check",
    font_class: "laptop-check",
    unicode: "e796",
    unicode_decimal: 59286
  },
  {
    icon_id: "6151041",
    name: "laptop",
    font_class: "laptop",
    unicode: "e797",
    unicode_decimal: 59287
  },
  {
    icon_id: "6151050",
    name: "mobile-error",
    font_class: "mobile-error",
    unicode: "e798",
    unicode_decimal: 59288
  },
  {
    icon_id: "6151051",
    name: "mobile-check",
    font_class: "mobile-check",
    unicode: "e799",
    unicode_decimal: 59289
  },
  {
    icon_id: "6151052",
    name: "mobile-alt",
    font_class: "mobile-alt",
    unicode: "e79a",
    unicode_decimal: 59290
  },
  {
    icon_id: "6151059",
    name: "aliwangwang",
    font_class: "aliwangwang",
    unicode: "e79d",
    unicode_decimal: 59293
  },
  {
    icon_id: "6151060",
    name: "nail",
    font_class: "nail",
    unicode: "e79e",
    unicode_decimal: 59294
  },
  {
    icon_id: "6151061",
    name: "nail-fixed",
    font_class: "nail-fixed",
    unicode: "e79f",
    unicode_decimal: 59295
  },
  {
    icon_id: "6151070",
    name: "edit",
    font_class: "edit",
    unicode: "e7a0",
    unicode_decimal: 59296
  },
  {
    icon_id: "6151072",
    name: "dollar",
    font_class: "dollar",
    unicode: "e7a1",
    unicode_decimal: 59297
  },
  {
    icon_id: "6151080",
    name: "transanction",
    font_class: "transanction",
    unicode: "e7a2",
    unicode_decimal: 59298
  },
  {
    icon_id: "6151087",
    name: "filter-fill",
    font_class: "filter-fill",
    unicode: "e7a3",
    unicode_decimal: 59299
  },
  {
    icon_id: "6151089",
    name: "all-fill",
    font_class: "all-fill",
    unicode: "e7a4",
    unicode_decimal: 59300
  },
  {
    icon_id: "6151090",
    name: "database plus-fill",
    font_class: "databaseplus-fill",
    unicode: "e7a5",
    unicode_decimal: 59301
  },
  {
    icon_id: "6151091",
    name: "database-fill",
    font_class: "database-fill",
    unicode: "e7a6",
    unicode_decimal: 59302
  },
  {
    icon_id: "6151092",
    name: "comment lines-fill",
    font_class: "commentlines-fill",
    unicode: "e7a7",
    unicode_decimal: 59303
  },
  {
    icon_id: "6151093",
    name: "comment dots-fill",
    font_class: "commentdots-fill",
    unicode: "e7a8",
    unicode_decimal: 59304
  },
  {
    icon_id: "6151095",
    name: "paper plane-fill",
    font_class: "paperplane-fill",
    unicode: "e7a9",
    unicode_decimal: 59305
  },
  {
    icon_id: "6151096",
    name: "eye slash-fill",
    font_class: "eyeslash-fill",
    unicode: "e7aa",
    unicode_decimal: 59306
  },
  {
    icon_id: "6151097",
    name: "eye-fill",
    font_class: "eye-fill",
    unicode: "e7ab",
    unicode_decimal: 59307
  },
  {
    icon_id: "6151098",
    name: "lightbulb-fill",
    font_class: "lightbulb-fill",
    unicode: "e7ac",
    unicode_decimal: 59308
  },
  {
    icon_id: "6151099",
    name: "flag-fill",
    font_class: "flag-fill",
    unicode: "e7ad",
    unicode_decimal: 59309
  },
  {
    icon_id: "6151100",
    name: "tag-fill",
    font_class: "tag-fill",
    unicode: "e7ae",
    unicode_decimal: 59310
  },
  {
    icon_id: "6151101",
    name: "position-fill",
    font_class: "position-fill",
    unicode: "e7af",
    unicode_decimal: 59311
  },
  {
    icon_id: "6151102",
    name: "location-fill",
    font_class: "location-fill",
    unicode: "e7b0",
    unicode_decimal: 59312
  },
  {
    icon_id: "6151103",
    name: "map-fill",
    font_class: "map-fill",
    unicode: "e7b1",
    unicode_decimal: 59313
  },
  {
    icon_id: "6151105",
    name: "inbox in-fill",
    font_class: "inboxin-fill",
    unicode: "e7b2",
    unicode_decimal: 59314
  },
  {
    icon_id: "6151106",
    name: "box-fill",
    font_class: "box-fill",
    unicode: "e7b3",
    unicode_decimal: 59315
  },
  {
    icon_id: "6151108",
    name: "database set-fill",
    font_class: "databaseset-fill",
    unicode: "e7b4",
    unicode_decimal: 59316
  },
  {
    icon_id: "6151109",
    name: "layer group-fill",
    font_class: "layergroup-fill",
    unicode: "e7b5",
    unicode_decimal: 59317
  },
  {
    icon_id: "6151111",
    name: "cry-fill",
    font_class: "cry-fill",
    unicode: "e7b6",
    unicode_decimal: 59318
  },
  {
    icon_id: "6151113",
    name: "smile-fill",
    font_class: "smile-fill",
    unicode: "e7b7",
    unicode_decimal: 59319
  },
  {
    icon_id: "6151115",
    name: "unlock-fill",
    font_class: "unlock-fill",
    unicode: "e7b8",
    unicode_decimal: 59320
  },
  {
    icon_id: "6151117",
    name: "lock-fill",
    font_class: "lock-fill",
    unicode: "e7b9",
    unicode_decimal: 59321
  },
  {
    icon_id: "6151118",
    name: "align right-fill",
    font_class: "alignright-fill",
    unicode: "e7ba",
    unicode_decimal: 59322
  },
  {
    icon_id: "6151119",
    name: "align left-fill",
    font_class: "alignleft-fill",
    unicode: "e7bb",
    unicode_decimal: 59323
  },
  {
    icon_id: "6151120",
    name: "border bottom-fill",
    font_class: "borderbottom-fill",
    unicode: "e7bc",
    unicode_decimal: 59324
  },
  {
    icon_id: "6151121",
    name: "border top-fill",
    font_class: "bordertop-fill",
    unicode: "e7bd",
    unicode_decimal: 59325
  },
  {
    icon_id: "6151122",
    name: "align center-fill",
    font_class: "aligncenter-fill",
    unicode: "e7be",
    unicode_decimal: 59326
  },
  {
    icon_id: "6151123",
    name: "border verticle-fill",
    font_class: "borderverticle-fill",
    unicode: "e7bf",
    unicode_decimal: 59327
  },
  {
    icon_id: "6151126",
    name: "pic center-fill",
    font_class: "piccenter-fill",
    unicode: "e7c0",
    unicode_decimal: 59328
  },
  {
    icon_id: "6151127",
    name: "pic side-fill",
    font_class: "picside-fill",
    unicode: "e7c1",
    unicode_decimal: 59329
  },
  {
    icon_id: "6151128",
    name: "folder open-fill",
    font_class: "folderopen-fill",
    unicode: "e7c2",
    unicode_decimal: 59330
  },
  {
    icon_id: "6151129",
    name: "folder plus-fill",
    font_class: "folderplus-fill",
    unicode: "e7c3",
    unicode_decimal: 59331
  },
  {
    icon_id: "6151130",
    name: "folder-fill",
    font_class: "folder-fill",
    unicode: "e7c4",
    unicode_decimal: 59332
  },
  {
    icon_id: "6151132",
    name: "file-SQL",
    font_class: "file-SQL",
    unicode: "e7c5",
    unicode_decimal: 59333
  },
  {
    icon_id: "6151133",
    name: "file plus-fill",
    font_class: "fileplus-fill",
    unicode: "e7c6",
    unicode_decimal: 59334
  },
  {
    icon_id: "6151134",
    name: "file-fill",
    font_class: "file-fill",
    unicode: "e7c7",
    unicode_decimal: 59335
  },
  {
    icon_id: "6151135",
    name: "copy-fill",
    font_class: "copy-fill",
    unicode: "e7c8",
    unicode_decimal: 59336
  },
  {
    icon_id: "6151136",
    name: "headset-fill",
    font_class: "headset-fill",
    unicode: "e7c9",
    unicode_decimal: 59337
  },
  {
    icon_id: "6151138",
    name: "phone-fill",
    font_class: "phone-fill",
    unicode: "e7ca",
    unicode_decimal: 59338
  },
  {
    icon_id: "6151139",
    name: "pause circle-fill",
    font_class: "pausecircle-fill",
    unicode: "e7cb",
    unicode_decimal: 59339
  },
  {
    icon_id: "6151140",
    name: "stop circle-fill",
    font_class: "stopcircle-fill",
    unicode: "e7cc",
    unicode_decimal: 59340
  },
  {
    icon_id: "6151141",
    name: "play circle-fill",
    font_class: "playcircle-fill",
    unicode: "e7cd",
    unicode_decimal: 59341
  },
  {
    icon_id: "6151143",
    name: "delete-fill",
    font_class: "delete-fill",
    unicode: "e7ce",
    unicode_decimal: 59342
  },
  {
    icon_id: "6151144",
    name: "picture-fill",
    font_class: "picture-fill",
    unicode: "e7cf",
    unicode_decimal: 59343
  },
  {
    icon_id: "6151145",
    name: "mail-fill",
    font_class: "mail-fill",
    unicode: "e7d0",
    unicode_decimal: 59344
  },
  {
    icon_id: "6151146",
    name: "heart-fill",
    font_class: "heart-fill",
    unicode: "e7d1",
    unicode_decimal: 59345
  },
  {
    icon_id: "6151147",
    name: "collection-fill",
    font_class: "collection-fill",
    unicode: "e7d2",
    unicode_decimal: 59346
  },
  {
    icon_id: "6151149",
    name: "user-group-fill",
    font_class: "user-group-fill",
    unicode: "e7d3",
    unicode_decimal: 59347
  },
  {
    icon_id: "6151150",
    name: "user plus-fill",
    font_class: "userplus-fill",
    unicode: "e7d4",
    unicode_decimal: 59348
  },
  {
    icon_id: "6151151",
    name: "user-fill",
    font_class: "user-fill",
    unicode: "e7d5",
    unicode_decimal: 59349
  },
  {
    icon_id: "6151152",
    name: "cog-fill",
    font_class: "cog-fill",
    unicode: "e7d6",
    unicode_decimal: 59350
  },
  {
    icon_id: "6151154",
    name: "clock-fill",
    font_class: "clock-fill",
    unicode: "e7d7",
    unicode_decimal: 59351
  },
  {
    icon_id: "6151155",
    name: "calendar alt-fill",
    font_class: "calendaralt-fill",
    unicode: "e7d8",
    unicode_decimal: 59352
  },
  {
    icon_id: "6151157",
    name: "cloud download-fill",
    font_class: "clouddownload-fill",
    unicode: "e7d9",
    unicode_decimal: 59353
  },
  {
    icon_id: "6151158",
    name: "cloud upload-fill",
    font_class: "cloudupload-fill",
    unicode: "e7da",
    unicode_decimal: 59354
  },
  {
    icon_id: "6151159",
    name: "exchange-fill",
    font_class: "exchange-fill",
    unicode: "e7db",
    unicode_decimal: 59355
  },
  {
    icon_id: "6151161",
    name: "info-circle-fill",
    font_class: "info-circle-fill",
    unicode: "e7dc",
    unicode_decimal: 59356
  },
  {
    icon_id: "6151162",
    name: "question-circle-fill",
    font_class: "question-circle-fill",
    unicode: "e7dd",
    unicode_decimal: 59357
  },
  {
    icon_id: "6151171",
    name: "exclamation circle-f",
    font_class: "exclamationcircle-f",
    unicode: "e7de",
    unicode_decimal: 59358
  },
  {
    icon_id: "6151173",
    name: "minus-circle-fill",
    font_class: "minus-circle-fill",
    unicode: "e7df",
    unicode_decimal: 59359
  },
  {
    icon_id: "6151174",
    name: "plus-circle-fill",
    font_class: "plus-circle-fill",
    unicode: "e7e0",
    unicode_decimal: 59360
  },
  {
    icon_id: "6151176",
    name: "times-circle-fill",
    font_class: "times-circle-fill",
    unicode: "e7e1",
    unicode_decimal: 59361
  },
  {
    icon_id: "6151177",
    name: "check-circle-fill",
    font_class: "check-circle-fill",
    unicode: "e7e2",
    unicode_decimal: 59362
  },
  {
    icon_id: "6151178",
    name: "compress alt-fill",
    font_class: "compressalt-fill",
    unicode: "e7e3",
    unicode_decimal: 59363
  },
  {
    icon_id: "6151181",
    name: "expand alt-fill",
    font_class: "expandalt-fill",
    unicode: "e7e4",
    unicode_decimal: 59364
  },
  {
    icon_id: "6151187",
    name: "filter",
    font_class: "filter",
    unicode: "e7e5",
    unicode_decimal: 59365
  },
  {
    icon_id: "6151188",
    name: "all",
    font_class: "all",
    unicode: "e7e6",
    unicode_decimal: 59366
  },
  {
    icon_id: "6151192",
    name: "database-plus",
    font_class: "database-plus",
    unicode: "e7e7",
    unicode_decimal: 59367
  },
  {
    icon_id: "6151193",
    name: "database",
    font_class: "database",
    unicode: "e7e8",
    unicode_decimal: 59368
  },
  {
    icon_id: "6151195",
    name: "comment-lines",
    font_class: "comment-lines",
    unicode: "e7e9",
    unicode_decimal: 59369
  },
  {
    icon_id: "6151196",
    name: "comment-dots",
    font_class: "comment-dots",
    unicode: "e7ea",
    unicode_decimal: 59370
  },
  {
    icon_id: "6151198",
    name: "paper-plane",
    font_class: "paper-plane",
    unicode: "e7eb",
    unicode_decimal: 59371
  },
  {
    icon_id: "6151208",
    name: "eye-slash",
    font_class: "eye-slash",
    unicode: "e7ec",
    unicode_decimal: 59372
  },
  {
    icon_id: "6151209",
    name: "eye",
    font_class: "eye",
    unicode: "e7ed",
    unicode_decimal: 59373
  },
  {
    icon_id: "6151210",
    name: "lightbulb",
    font_class: "lightbulb",
    unicode: "e7ee",
    unicode_decimal: 59374
  },
  {
    icon_id: "6151211",
    name: "flag",
    font_class: "flag",
    unicode: "e7ef",
    unicode_decimal: 59375
  },
  {
    icon_id: "6151212",
    name: "tag",
    font_class: "tag",
    unicode: "e7f0",
    unicode_decimal: 59376
  },
  {
    icon_id: "6151214",
    name: "position",
    font_class: "position",
    unicode: "e7f1",
    unicode_decimal: 59377
  },
  {
    icon_id: "6151215",
    name: "location",
    font_class: "location",
    unicode: "e7f2",
    unicode_decimal: 59378
  },
  {
    icon_id: "6151216",
    name: "map",
    font_class: "map",
    unicode: "e7f3",
    unicode_decimal: 59379
  },
  {
    icon_id: "6151218",
    name: "inbox-in",
    font_class: "inbox-in",
    unicode: "e7f4",
    unicode_decimal: 59380
  },
  {
    icon_id: "6151219",
    name: "box",
    font_class: "box",
    unicode: "e7f5",
    unicode_decimal: 59381
  },
  {
    icon_id: "6151221",
    name: "database-set",
    font_class: "database-set",
    unicode: "e7f6",
    unicode_decimal: 59382
  },
  {
    icon_id: "6151223",
    name: "layer-group",
    font_class: "layer-group",
    unicode: "e7f7",
    unicode_decimal: 59383
  },
  {
    icon_id: "6151224",
    name: "wind-cry",
    font_class: "wind-cry",
    unicode: "e7f8",
    unicode_decimal: 59384
  },
  {
    icon_id: "6151225",
    name: "wind-smile",
    font_class: "wind-smile",
    unicode: "e7f9",
    unicode_decimal: 59385
  },
  {
    icon_id: "6151227",
    name: "unlock",
    font_class: "unlock",
    unicode: "e7fa",
    unicode_decimal: 59386
  },
  {
    icon_id: "6151228",
    name: "lock",
    font_class: "lock",
    unicode: "e7fb",
    unicode_decimal: 59387
  },
  {
    icon_id: "6151230",
    name: "align-right",
    font_class: "align-right",
    unicode: "e7fc",
    unicode_decimal: 59388
  },
  {
    icon_id: "6151231",
    name: "align-left",
    font_class: "align-left",
    unicode: "e7fd",
    unicode_decimal: 59389
  },
  {
    icon_id: "6151232",
    name: "border-bottom",
    font_class: "border-bottom",
    unicode: "e7fe",
    unicode_decimal: 59390
  },
  {
    icon_id: "6151233",
    name: "border-top",
    font_class: "border-top",
    unicode: "e7ff",
    unicode_decimal: 59391
  },
  {
    icon_id: "6151234",
    name: "align-center",
    font_class: "align-center",
    unicode: "e800",
    unicode_decimal: 59392
  },
  {
    icon_id: "6151236",
    name: "border-verticle",
    font_class: "border-verticle",
    unicode: "e801",
    unicode_decimal: 59393
  },
  {
    icon_id: "6151237",
    name: "pic-center",
    font_class: "pic-center",
    unicode: "e802",
    unicode_decimal: 59394
  },
  {
    icon_id: "6151238",
    name: "pic-side",
    font_class: "pic-side",
    unicode: "e803",
    unicode_decimal: 59395
  },
  {
    icon_id: "6151239",
    name: "folder-open",
    font_class: "folder-open",
    unicode: "e804",
    unicode_decimal: 59396
  },
  {
    icon_id: "6151241",
    name: "folder-plus",
    font_class: "folder-plus",
    unicode: "e805",
    unicode_decimal: 59397
  },
  {
    icon_id: "6151242",
    name: "folder",
    font_class: "folder",
    unicode: "e806",
    unicode_decimal: 59398
  },
  {
    icon_id: "6151251",
    name: "file-SQL",
    font_class: "file-SQL1",
    unicode: "e807",
    unicode_decimal: 59399
  },
  {
    icon_id: "6151252",
    name: "file-plus",
    font_class: "file-plus",
    unicode: "e808",
    unicode_decimal: 59400
  },
  {
    icon_id: "6151253",
    name: "file",
    font_class: "file",
    unicode: "e809",
    unicode_decimal: 59401
  },
  {
    icon_id: "6151256",
    name: "copy",
    font_class: "copy",
    unicode: "e80a",
    unicode_decimal: 59402
  },
  {
    icon_id: "6151257",
    name: "headset",
    font_class: "headset",
    unicode: "e80b",
    unicode_decimal: 59403
  },
  {
    icon_id: "6151258",
    name: "phone",
    font_class: "phone",
    unicode: "e80c",
    unicode_decimal: 59404
  },
  {
    icon_id: "6151260",
    name: "pause circle",
    font_class: "pausecircle",
    unicode: "e80d",
    unicode_decimal: 59405
  },
  {
    icon_id: "6151261",
    name: "stop circle",
    font_class: "stopcircle",
    unicode: "e80e",
    unicode_decimal: 59406
  },
  {
    icon_id: "6151262",
    name: "play circle",
    font_class: "playcircle",
    unicode: "e80f",
    unicode_decimal: 59407
  },
  {
    icon_id: "6151263",
    name: "delete",
    font_class: "delete",
    unicode: "e810",
    unicode_decimal: 59408
  },
  {
    icon_id: "6151264",
    name: "picture",
    font_class: "picture",
    unicode: "e811",
    unicode_decimal: 59409
  },
  {
    icon_id: "6151265",
    name: "mail",
    font_class: "mail",
    unicode: "e812",
    unicode_decimal: 59410
  },
  {
    icon_id: "6151266",
    name: "like",
    font_class: "like",
    unicode: "e813",
    unicode_decimal: 59411
  },
  {
    icon_id: "6151267",
    name: "collection",
    font_class: "collection",
    unicode: "e814",
    unicode_decimal: 59412
  },
  {
    icon_id: "6151268",
    name: "user-group",
    font_class: "user-group",
    unicode: "e815",
    unicode_decimal: 59413
  },
  {
    icon_id: "6151270",
    name: "account-plus",
    font_class: "account-plus",
    unicode: "e816",
    unicode_decimal: 59414
  },
  {
    icon_id: "6151272",
    name: "account",
    font_class: "account",
    unicode: "e817",
    unicode_decimal: 59415
  },
  {
    icon_id: "6151273",
    name: "cog",
    font_class: "cog",
    unicode: "e818",
    unicode_decimal: 59416
  },
  {
    icon_id: "6151275",
    name: "clock",
    font_class: "clock",
    unicode: "e819",
    unicode_decimal: 59417
  },
  {
    icon_id: "6151276",
    name: "calendar-alt",
    font_class: "calendar-alt",
    unicode: "e81a",
    unicode_decimal: 59418
  },
  {
    icon_id: "6151277",
    name: "cloud download",
    font_class: "clouddownload",
    unicode: "e81b",
    unicode_decimal: 59419
  },
  {
    icon_id: "6151278",
    name: "cloud upload",
    font_class: "cloudupload",
    unicode: "e81c",
    unicode_decimal: 59420
  },
  {
    icon_id: "6151279",
    name: "exchange",
    font_class: "exchange",
    unicode: "e81d",
    unicode_decimal: 59421
  },
  {
    icon_id: "6151280",
    name: "info-circle",
    font_class: "info-circle",
    unicode: "e81e",
    unicode_decimal: 59422
  },
  {
    icon_id: "6151281",
    name: "question-circle",
    font_class: "question-circle",
    unicode: "e81f",
    unicode_decimal: 59423
  },
  {
    icon_id: "6151282",
    name: "exclamation-circle",
    font_class: "exclamation-circle",
    unicode: "e820",
    unicode_decimal: 59424
  },
  {
    icon_id: "6151283",
    name: "minus-circle",
    font_class: "minus-circle",
    unicode: "e821",
    unicode_decimal: 59425
  },
  {
    icon_id: "6151285",
    name: "plus-circle",
    font_class: "plus-circle",
    unicode: "e822",
    unicode_decimal: 59426
  },
  {
    icon_id: "6151286",
    name: "times-circle",
    font_class: "times-circle",
    unicode: "e823",
    unicode_decimal: 59427
  },
  {
    icon_id: "6151287",
    name: "check-circle",
    font_class: "check-circle",
    unicode: "e824",
    unicode_decimal: 59428
  },
  {
    icon_id: "6151288",
    name: "compress-alt",
    font_class: "compress-alt",
    unicode: "e825",
    unicode_decimal: 59429
  },
  {
    icon_id: "6151289",
    name: "expand-alt",
    font_class: "expand-alt",
    unicode: "e826",
    unicode_decimal: 59430
  },
  {
    icon_id: "6151290",
    name: "ban",
    font_class: "ban",
    unicode: "e827",
    unicode_decimal: 59431
  },
  {
    icon_id: "6151292",
    name: "minus",
    font_class: "minus",
    unicode: "e828",
    unicode_decimal: 59432
  },
  {
    icon_id: "6151293",
    name: "plus",
    font_class: "plus",
    unicode: "e829",
    unicode_decimal: 59433
  },
  {
    icon_id: "6151294",
    name: "times",
    font_class: "times",
    unicode: "e82a",
    unicode_decimal: 59434
  },
  {
    icon_id: "6151295",
    name: "check",
    font_class: "check",
    unicode: "e82b",
    unicode_decimal: 59435
  },
  {
    icon_id: "6151299",
    name: "search-minus",
    font_class: "search-minus",
    unicode: "e82c",
    unicode_decimal: 59436
  },
  {
    icon_id: "6151300",
    name: "search-plus",
    font_class: "search-plus",
    unicode: "e82d",
    unicode_decimal: 59437
  },
  {
    icon_id: "6151301",
    name: "search",
    font_class: "search",
    unicode: "e82e",
    unicode_decimal: 59438
  },
  {
    icon_id: "6151304",
    name: "reply",
    font_class: "reply",
    unicode: "e82f",
    unicode_decimal: 59439
  },
  {
    icon_id: "6151306",
    name: "undo",
    font_class: "undo",
    unicode: "e830",
    unicode_decimal: 59440
  },
  {
    icon_id: "6151307",
    name: "redo",
    font_class: "redo",
    unicode: "e831",
    unicode_decimal: 59441
  },
  {
    icon_id: "6151308",
    name: "external-link",
    font_class: "external-link",
    unicode: "e832",
    unicode_decimal: 59442
  },
  {
    icon_id: "6151309",
    name: "arrows-alt",
    font_class: "arrows-alt",
    unicode: "e833",
    unicode_decimal: 59443
  },
  {
    icon_id: "6151310",
    name: "indent",
    font_class: "indent",
    unicode: "e834",
    unicode_decimal: 59444
  },
  {
    icon_id: "6151311",
    name: "outdent",
    font_class: "outdent",
    unicode: "e835",
    unicode_decimal: 59445
  },
  {
    icon_id: "6151312",
    name: "sort-line",
    font_class: "sort-line",
    unicode: "e836",
    unicode_decimal: 59446
  },
  {
    icon_id: "6151314",
    name: "switch",
    font_class: "switch",
    unicode: "e837",
    unicode_decimal: 59447
  },
  {
    icon_id: "6151316",
    name: "wind-descending",
    font_class: "wind-descending",
    unicode: "e838",
    unicode_decimal: 59448
  },
  {
    icon_id: "6151317",
    name: "wind-ascending",
    font_class: "wind-ascending",
    unicode: "e839",
    unicode_decimal: 59449
  },
  {
    icon_id: "6151351",
    name: "download",
    font_class: "download",
    unicode: "e83a",
    unicode_decimal: 59450
  },
  {
    icon_id: "6151353",
    name: "upload",
    font_class: "upload",
    unicode: "e83b",
    unicode_decimal: 59451
  },
  {
    icon_id: "6151360",
    name: "arrow-to-bottom",
    font_class: "arrow-to-bottom",
    unicode: "e83c",
    unicode_decimal: 59452
  },
  {
    icon_id: "6151361",
    name: "arrow-to-top",
    font_class: "arrow-to-top",
    unicode: "e83d",
    unicode_decimal: 59453
  },
  {
    icon_id: "6151363",
    name: "long-arrow-down",
    font_class: "long-arrow-down",
    unicode: "e83e",
    unicode_decimal: 59454
  },
  {
    icon_id: "6151364",
    name: "long-arrow-up",
    font_class: "long-arrow-up",
    unicode: "e83f",
    unicode_decimal: 59455
  },
  {
    icon_id: "6151368",
    name: "arrow-right",
    font_class: "arrow-right",
    unicode: "e840",
    unicode_decimal: 59456
  },
  {
    icon_id: "6151370",
    name: "arrow-left",
    font_class: "arrow-left",
    unicode: "e841",
    unicode_decimal: 59457
  },
  {
    icon_id: "6151371",
    name: "sort",
    font_class: "sort",
    unicode: "e842",
    unicode_decimal: 59458
  },
  {
    icon_id: "6151377",
    name: "sort-down",
    font_class: "sort-down",
    unicode: "e843",
    unicode_decimal: 59459
  },
  {
    icon_id: "6151384",
    name: "sort-up",
    font_class: "sort-up",
    unicode: "e844",
    unicode_decimal: 59460
  },
  {
    icon_id: "6151385",
    name: "caret-right",
    font_class: "caret-right",
    unicode: "e845",
    unicode_decimal: 59461
  },
  {
    icon_id: "6151386",
    name: "caret-left",
    font_class: "caret-left",
    unicode: "e846",
    unicode_decimal: 59462
  },
  {
    icon_id: "6151387",
    name: "arrows-v",
    font_class: "arrows-v",
    unicode: "e847",
    unicode_decimal: 59463
  },
  {
    icon_id: "6151390",
    name: "angle- double-down",
    font_class: "angle-double-down",
    unicode: "e848",
    unicode_decimal: 59464
  },
  {
    icon_id: "6151391",
    name: "angle-double-up",
    font_class: "angle-double-up",
    unicode: "e849",
    unicode_decimal: 59465
  },
  {
    icon_id: "6151392",
    name: "angle-double-right",
    font_class: "angle-double-right",
    unicode: "e84a",
    unicode_decimal: 59466
  },
  {
    icon_id: "6151393",
    name: "angle-double-left",
    font_class: "angle-double-left",
    unicode: "e84b",
    unicode_decimal: 59467
  },
  {
    icon_id: "6151394",
    name: "angle-down",
    font_class: "angle-down",
    unicode: "e84c",
    unicode_decimal: 59468
  },
  {
    icon_id: "6151395",
    name: "angle-up",
    font_class: "angle-up",
    unicode: "e84d",
    unicode_decimal: 59469
  },
  {
    icon_id: "6151396",
    name: "angle-right",
    font_class: "angle-right",
    unicode: "e84e",
    unicode_decimal: 59470
  },
  {
    icon_id: "6151456",
    name: "angle-left",
    font_class: "angle-left",
    unicode: "e84f",
    unicode_decimal: 59471
  },
  {
    icon_id: "6168585",
    name: "paperclip",
    font_class: "paperclip",
    unicode: "e850",
    unicode_decimal: 59472
  },
  {
    icon_id: "6172713",
    name: "connection",
    font_class: "connection",
    unicode: "e851",
    unicode_decimal: 59473
  },
  {
    icon_id: "6172717",
    name: "training",
    font_class: "training",
    unicode: "e853",
    unicode_decimal: 59475
  },
  {
    icon_id: "6172721",
    name: "process",
    font_class: "process",
    unicode: "e854",
    unicode_decimal: 59476
  },
  {
    icon_id: "6172722",
    name: "news",
    font_class: "news",
    unicode: "e855",
    unicode_decimal: 59477
  },
  {
    icon_id: "6172724",
    name: "save",
    font_class: "save",
    unicode: "e856",
    unicode_decimal: 59478
  },
  {
    icon_id: "6172748",
    name: "print",
    font_class: "print",
    unicode: "e857",
    unicode_decimal: 59479
  },
  {
    icon_id: "6172751",
    name: "new-releases",
    font_class: "new-releases",
    unicode: "e858",
    unicode_decimal: 59480
  },
  {
    icon_id: "6172758",
    name: "release",
    font_class: "release",
    unicode: "e85a",
    unicode_decimal: 59482
  },
  {
    icon_id: "6172762",
    name: "alert",
    font_class: "alert",
    unicode: "e85b",
    unicode_decimal: 59483
  },
  {
    icon_id: "6172770",
    name: "backspace",
    font_class: "backspace",
    unicode: "e85c",
    unicode_decimal: 59484
  },
  {
    icon_id: "6172775",
    name: "gem",
    font_class: "gem",
    unicode: "e85d",
    unicode_decimal: 59485
  },
  {
    icon_id: "6172776",
    name: "integral",
    font_class: "integral",
    unicode: "e85e",
    unicode_decimal: 59486
  },
  {
    icon_id: "6172777",
    name: "star-circle",
    font_class: "star-circle",
    unicode: "e85f",
    unicode_decimal: 59487
  },
  {
    icon_id: "6172778",
    name: "user-circle",
    font_class: "user-circle",
    unicode: "e860",
    unicode_decimal: 59488
  },
  {
    icon_id: "6172783",
    name: "cloud-machine-fill",
    font_class: "cloud-machine-fill",
    unicode: "e861",
    unicode_decimal: 59489
  },
  {
    icon_id: "6172784",
    name: "cloud-machine",
    font_class: "cloud-machine",
    unicode: "e862",
    unicode_decimal: 59490
  },
  {
    icon_id: "6172785",
    name: "terminal-fill",
    font_class: "terminal-fill",
    unicode: "e863",
    unicode_decimal: 59491
  },
  {
    icon_id: "6172786",
    name: "terminal",
    font_class: "terminal",
    unicode: "e864",
    unicode_decimal: 59492
  },
  {
    icon_id: "6173016",
    name: "shopping-cart-fill",
    font_class: "shopping-cart-fill",
    unicode: "e865",
    unicode_decimal: 59493
  },
  {
    icon_id: "6228652",
    name: "resource",
    font_class: "resource",
    unicode: "e867",
    unicode_decimal: 59495
  },
  {
    icon_id: "6303226",
    name: "rank",
    font_class: "rank",
    unicode: "e86a",
    unicode_decimal: 59498
  },
  {
    icon_id: "6343820",
    name: "sync-alt",
    font_class: "sync-alt",
    unicode: "e86b",
    unicode_decimal: 59499
  },
  {
    icon_id: "6343821",
    name: "compass",
    font_class: "compass",
    unicode: "e86c",
    unicode_decimal: 59500
  },
  {
    icon_id: "6343822",
    name: "arrow-alt- from-top",
    font_class: "arrow-alt-from-top",
    unicode: "e86d",
    unicode_decimal: 59501
  },
  {
    icon_id: "6343823",
    name: "arrow-alt-from-botto",
    font_class: "arrow-alt-from-botto",
    unicode: "e86e",
    unicode_decimal: 59502
  },
  {
    icon_id: "6343824",
    name: "menu",
    font_class: "menu",
    unicode: "e86f",
    unicode_decimal: 59503
  },
  {
    icon_id: "6353291",
    name: "icon-drag",
    font_class: "icon-drag",
    unicode: "e870",
    unicode_decimal: 59504
  },
  {
    icon_id: "6353292",
    name: "early-warning",
    font_class: "early-warning",
    unicode: "e871",
    unicode_decimal: 59505
  },
  {
    icon_id: "6353293",
    name: "share",
    font_class: "share",
    unicode: "e872",
    unicode_decimal: 59506
  },
  {
    icon_id: "6353306",
    name: "share",
    font_class: "share1",
    unicode: "e873",
    unicode_decimal: 59507
  },
  {
    icon_id: "6861314",
    name: "management",
    font_class: "management-",
    unicode: "e874",
    unicode_decimal: 59508
  },
  {
    icon_id: "6863066",
    name: "accesskeys",
    font_class: "accesskeys",
    unicode: "e875",
    unicode_decimal: 59509
  },
  {
    icon_id: "7357537",
    name: "arrow-sort down-small",
    font_class: "arrow-sortdown-smal",
    unicode: "e877",
    unicode_decimal: 59511
  },
  {
    icon_id: "7410218",
    name: "minus-square-fill",
    font_class: "minus-square-fill",
    unicode: "e878",
    unicode_decimal: 59512
  },
  {
    icon_id: "7410219",
    name: "plus-square-fill",
    font_class: "plus-square-fill",
    unicode: "e879",
    unicode_decimal: 59513
  },
  {
    icon_id: "7410220",
    name: "minus-square",
    font_class: "minus-square",
    unicode: "e87a",
    unicode_decimal: 59514
  },
  {
    icon_id: "7410222",
    name: "plus-square",
    font_class: "plus-square",
    unicode: "e87b",
    unicode_decimal: 59515
  },
  {
    icon_id: "7906283",
    name: "step mode",
    font_class: "stepmode",
    unicode: "e87d",
    unicode_decimal: 59517
  },
  {
    icon_id: "7906284",
    name: "scrolling mode",
    font_class: "scrollingmode",
    unicode: "e87e",
    unicode_decimal: 59518
  },
  {
    icon_id: "8268337",
    name: "shopping cart",
    font_class: "shoppingcart",
    unicode: "e881",
    unicode_decimal: 59521
  },
  {
    icon_id: "8305716",
    name: "waiting-fill",
    font_class: "waiting-fill",
    unicode: "e882",
    unicode_decimal: 59522
  },
  {
    icon_id: "8305718",
    name: "waiting",
    font_class: "waiting",
    unicode: "e883",
    unicode_decimal: 59523
  },
  {
    icon_id: "8307796",
    name: "right-arrow-rect",
    font_class: "right-arrow-rect",
    unicode: "e884",
    unicode_decimal: 59524
  },
  {
    icon_id: "8307800",
    name: "left-arrow-rect",
    font_class: "left-arrow-rect",
    unicode: "e885",
    unicode_decimal: 59525
  },
  {
    icon_id: "8623603",
    name: "bell",
    font_class: "bell",
    unicode: "e887",
    unicode_decimal: 59527
  },
  {
    icon_id: "8762555",
    name: "structured data",
    font_class: "structured-data",
    unicode: "e888",
    unicode_decimal: 59528
  },
  {
    icon_id: "6150957",
    name: "drag",
    font_class: "drag",
    unicode: "e769",
    unicode_decimal: 59241
  },
  {
    icon_id: "8762556",
    name: "vector",
    font_class: "vector",
    unicode: "e889",
    unicode_decimal: 59529
  },
  {
    icon_id: "6150958",
    name: "ellipsis-v",
    font_class: "ellipsis-vertical",
    unicode: "e76a",
    unicode_decimal: 59242
  },
  {
    icon_id: "9009443",
    name: "NEW",
    font_class: "NEW-copy",
    unicode: "e88a",
    unicode_decimal: 59530
  },
  {
    icon_id: "6150959",
    name: "gallery-view",
    font_class: "gallery-view",
    unicode: "e76b",
    unicode_decimal: 59243
  },
  {
    icon_id: "9009475",
    name: "HOT",
    font_class: "HOT-copy",
    unicode: "e88b",
    unicode_decimal: 59531
  },
  {
    icon_id: "6150960",
    name: "WIFI",
    font_class: "WIFI",
    unicode: "e76c",
    unicode_decimal: 59244
  },
  {
    icon_id: "9066652",
    name: "home",
    font_class: "home",
    unicode: "e88c",
    unicode_decimal: 59532
  },
  {
    icon_id: "6150961",
    name: "bug-report",
    font_class: "bug-report",
    unicode: "e76d",
    unicode_decimal: 59245
  },
  {
    icon_id: "9340469",
    name: "monitoring",
    font_class: "monitoring",
    unicode: "e88e",
    unicode_decimal: 59534
  },
  {
    icon_id: "6150962",
    name: "qrcode",
    font_class: "qrcode",
    unicode: "e76e",
    unicode_decimal: 59246
  },
  {
    icon_id: "9340470",
    name: "diagnose",
    font_class: "diagnose",
    unicode: "e88f",
    unicode_decimal: 59535
  },
  {
    icon_id: "6150963",
    name: "scan",
    font_class: "scan",
    unicode: "e76f",
    unicode_decimal: 59247
  },
  {
    icon_id: "10273624",
    name: "loading",
    font_class: "loading",
    unicode: "e891",
    unicode_decimal: 59537
  },
  {
    icon_id: "6150964",
    name: "cut",
    font_class: "cut",
    unicode: "e770",
    unicode_decimal: 59248
  },
  {
    icon_id: "11307823",
    name: "Directory tree",
    font_class: "Directory-tree",
    unicode: "e892",
    unicode_decimal: 59538
  },
  {
    icon_id: "6150965",
    name: "gift",
    font_class: "gift",
    unicode: "e771",
    unicode_decimal: 59249
  },
  {
    icon_id: "12253601",
    name: "application",
    font_class: "application",
    unicode: "e89e",
    unicode_decimal: 59550
  },
  {
    icon_id: "6150966",
    name: "link",
    font_class: "link",
    unicode: "e772",
    unicode_decimal: 59250
  },
  {
    icon_id: "12253602",
    name: "application  group",
    font_class: "applicationgroup",
    unicode: "e89f",
    unicode_decimal: 59551
  },
  {
    icon_id: "6150968",
    name: "poweroff",
    font_class: "poweroff",
    unicode: "e774",
    unicode_decimal: 59252
  },
  {
    icon_id: "6150969",
    name: "key",
    font_class: "key",
    unicode: "e775",
    unicode_decimal: 59253
  },
  {
    icon_id: "6150970",
    name: "safety-certificate",
    font_class: "safety-certificate",
    unicode: "e776",
    unicode_decimal: 59254
  },
  {
    icon_id: "6150971",
    name: "supervise",
    font_class: "supervise",
    unicode: "e777",
    unicode_decimal: 59255
  },
  {
    icon_id: "6151018",
    name: "tag-subscipt",
    font_class: "tag-subscipt",
    unicode: "e78a",
    unicode_decimal: 59274
  },
  {
    icon_id: "6151030",
    name: "chart-pie-alt",
    font_class: "chart-pie-alt",
    unicode: "e78c",
    unicode_decimal: 59276
  },
  {
    icon_id: "6151031",
    name: "chart-relation",
    font_class: "chart-relation",
    unicode: "e78d",
    unicode_decimal: 59277
  },
  {
    icon_id: "6151032",
    name: "chart-scatter-plot",
    font_class: "chart-scatter-plot",
    unicode: "e78e",
    unicode_decimal: 59278
  },
  {
    icon_id: "6151033",
    name: "chart-area",
    font_class: "chart-area",
    unicode: "e78f",
    unicode_decimal: 59279
  },
  {
    icon_id: "6151034",
    name: "chart-line",
    font_class: "chart-line",
    unicode: "e790",
    unicode_decimal: 59280
  },
  {
    icon_id: "6151035",
    name: "chart-bar",
    font_class: "chart-bar",
    unicode: "e791",
    unicode_decimal: 59281
  }
];
var fontList = {
  id,
  name,
  font_family,
  css_prefix_text,
  description,
  glyphs
};
const tmiconFont = "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AFVVK1UEAP6r/lUCgP2AAav+VQAABQAA/8AEAANAAAMACwASABYAHQAAExEhEQEVITUhESERLQE1JRUHFxMzAyM3NTcnNQUVVQNW/wD+qv6rBAD9hv76AQafn4wuUi66n58BBgLb/aMCXf0/WloDJvza7oFRgGBJSQEY/mMlYElJYIBRAAMAAP/ABAADQAADAAsAEgAAExEhEQEVITUhESERASEVIRU3J1UDVv8A/qr+qwQA/mv+VQGr1dUC2/2jAl39P1paAyb82gHGa6DW1QADAAD/wAQAA0AAAwALABIAABMRIREBFSE1IREhEQEhFSEVJzdVA1b/AP6q/qsEAP2VAav+VdXVAtv9owJd/T9aWgMm/NoBxmug1tUABAAA/8AEAANAAAMACwAPABMAABMRIREBFSE1IREhEQEXASchBwE3VQNW/wD+qv6rBAD+Yzr++joBQDr++joC2/2jAl39P1paAyb82gI+Ov76OjoBBjoAAAMAAP/ABAADQAADAAsAEQAAExEhEQEVITUhESERATcXASc3VQNW/wD+qv6rBAD989E8/vOzPALb/aMCXf0/WloDJvzaAVDWPf7ttz0AAAAAAgAA/8AEAANAAAMACwAAExEhEQEVITUhESERVQNW/wD+qv6rBAAC2/2jAl39P1paAyb82gAAAAAGAMD/gANAA4AAAwATABcAIAAkACgAAAERIRElITIWFREUBiMhIiY1ETQ2EyEVITcyNjQmIgYUFhMXBychByc3ARAB4P34AjARFxcR/dARFxc5AeD+IPARFxciFxd3OPs4ATM4+zgDK/yqA1ZVGRL8VhIZGRIDqhIZ/NWqKhkkGRkkGQKrOPs4OPs4AAUAwP+AA0ADgAADABMAFwAgACYAAAERIRElITIWFREUBiMhIiY1ETQ2EyEVITcyNjQmIgYUFgM3FwcnNwEQAeD9+AIwERcXEf3QERcXOQHg/iDwERcXIhcXFbMz5pozAyv8qgNWVRkS/FYSGRkSA6oSGfzVqioZJBkZJBkByKMv0YwuAAQAwP+AA0ADgAADABMAFwAgAAABESERJSEyFhURFAYjISImNRE0NhMhFSE3MjY0JiIGFBYBEAHg/fgCMBEXFxH90BEXFzkB4P4g8BEXFyIXFwMr/KoDVlUZEvxWEhkZEgOqEhn81aoqGSQZGSQZAAAE////gAP/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KwEAq1ZWAAAABwAA/4AEAAOAAAMABwALAA8AEwAXABsAABUhFSEBESERFyMRMwERIREXIxEzAREhERcjETMEAPwAAQD/AKtWVgNV/wCrVlb+1f8Aq1ZWK1UEAPyrA1VV/VUDAPyrA1VV/VUCVf1WAqpV/gAABwAA/4AEAAOAAAMABwALAA8AEwAXABsAAAEhNSEBESERJzMRIwERIREnMxEjAREhESczESMEAPwABAD/AAEAq1ZW/KsBAKtWVgErAQCrVlYDK1X8AANV/KtVAqv9AANV/KtVAqv9qwKq/VZVAgAAAAUAQP+AA8ADgAADAAcACwAPABMAAAURMxEBIREhNxUhNQEhESE3FSE1Acxo/gwDgPyAWgLM/TQCzP00WQIagAQA/AABv/7YxWNjAg3+2MZjYwAAAAUAAP/ABAADQAADAAcACwAPABMAABEhFSEBESERFyMRMwERIREXIxEzBAD8AAG//tjFY2MCDf7YxmNjAbRoAfT8gAOAWv00Asz9NALMWf3mAAAAAAYAAP+ABAADgAADAAcACwAPABMAFwAAESEVIREhFSETIREhNxUhNQEhESE3FSE1BAD8AAQA/ACAAwD9AFUCVv1VAwD9AFUCVgOAXfy6XQNG/ui7XV3+6P7pul1dAAAAAAYAAP+ABAADgAADAAcACwAPABMAFwAAAREjESERIxEFESERFyMRMwERIREXIxEzBABd/LpdA0b+6bpdXf7o/um6XV0DgPwABAD8AAQAgP0AAwBV/aoCq/0AAwBV/aoAAAQAAP/ABAEDQAAFAAsAEQAdAAATESERISclIRchESETESURISclIRchMhYVEQUTNDZXA1X+LWv+kwGVawIA/ABWA1X+LWv+swF1awHgDhL7/wETAub9NAJGhlqG/QYCZv3pAQGQhlqGEw3+NRACYQ0TAAAAAwAA/8AEAANAAAUACwAXAAATESERISclIRchESEBNTMVMxUjFSM1IzVVA1b+LGv+lAGUawIB/AACgFWAgFWAAub9NAJGhlqG/QYBgICAVYCAVQAAAgAA/8AEAANAAAUACwAAExEhESEnJSEXIREhVQNW/ixr/pQBlGsCAfwAAub9NAJGhlqG/QYAAAAHAID/gAOAA4AABgAJAA8ANwBLAF4AZAAAEzUzASERIRMzNQMRIREhEQE3FhcWNzI2NCYnLgE3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Y29uAAB0AG0AaQBjAG8AbgAAdG1pY29uAABWAGUAcgBzAGkAbwBuACAAMQAuADAAAFZlcnNpb24gMS4wAAB0AG0AaQBjAG8AbgAAdG1pY29uAABHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAABHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuAABoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAABodHRwOi8vZm9udGVsbG8uY29tAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAABXgAAAAEAAgECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBEwEUARUBFgEXARgBGQEaARsBHAEdAR4BHwEgASEBIgEjASQBJQEmAScBKAEpASoBKwEsAS0BLgEvATABMQEyAAcBMwE0ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAUEBQgFDAUQBRQFGAUcBSAFJAUoBSwFMAU0BTgFPAVABUQFSAVMBVAFVAVYBVwFYAVkBWgFbAVwBXQFeAV8BYAFhAWIBYwFkAWUBZgFnAWgBaQFqAWsBbAFtAW4BbwFwAXEBcgFzAXQBdQF2AXcBeAF5AXoBewF8AX0BfgF/AYABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAbABsQGyAbMBtAG1AbYBtwG4AO8ADgG5AboBuwG8Ab0BvgG/AcABwQHCAcMBxAHFAcYBxwHIAckBygHLAcwBzQHOAc8B0AHRAdIB0wHUAdUB1gHXAdgB2QHaAdsB3AHdAd4B3wHgAeEB4gHjAeQB5QHmAecB6AHpAeoB6wHsAJwB7QHuAe8B8AHxAfIB8wH0AfUB9gH3AfgB+QH6AfsB/AH9Af4B/wIAAgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgInAigCKQIqAisCLAItAi4CLwIwAjECMgIzAjQCNQI2AjcCOAI5AjoCOwI8Aj0CPgI/AkACQQJCAkMCRAJFAkYCRwJIAkkCSgJLAkwCTQJOAk8CUAJRAlICUwJUAlUCVgJXAlgLd2VpeGluemhpZnUFd2VpYm8DaW9zAlFRBmh1YXdlaQtwZW5neW91cXVhbg50b3V0aWFveWFuZ3NoaQZ3ZWl4aW4EeXVhbgdsaWFuamllCXl1bnNoYW5mdRhzaGlsaWFuZ3poaW5lbmdkdWl4aWFuZy0KeWluaGFuZ3FpYQt4aWFvY2hlbmd4dQdnZW5nZHVvBGRyYWcRZWxsaXBzaXMtdmVydGljYWwMZ2FsbGVyeS12aWV3BFdJRkkKYnVnLXJlcG9ydAZxcmNvZGUEc2NhbgNjdXQEZ2lmdARsaW5rCHBvd2Vyb2ZmA2tleRJzYWZldHktY2VydGlmaWNhdGUJc3VwZXJ2aXNlDHRhZy1zdWJzY2lwdA1jaGFydC1waWUtYWx0DmNoYXJ0LXJlbGF0aW9uEmNoYXJ0LXNjYXR0ZXItcGxvdApjaGFydC1hcmVhCmNoYXJ0LWxpbmUJY2hhcnQtYmFyDGRpc3BsYXktY29kZRNkaXNwbGF5LWFycm93LXJpZ2h0EmRpc3BsYXktYXJyb3ctbGVmdAxsYXB0b3AtZXJyb3IMbGFwdG9wLWNoZWNrBmxhcHRvcAxtb2JpbGUtZXJyb3IMbW9iaWxlLWNoZWNrCm1vYmlsZS1hbHQLYWxpd2FuZ3dhbmcEbmFpbApuYWlsLWZpeGVkBGVkaXQMdHJhbnNhbmN0aW9uC2ZpbHRlci1maWxsCGFsbC1maWxsEWRhdGFiYXNlcGx1cy1maWxsDWRhdGFiYXNlLWZpbGwRY29tbWVudGxpbmVzLWZpbGwQY29tbWVudGRvdHMtZmlsbA9wYXBlcnBsYW5lLWZpbGwNZXllc2xhc2gtZmlsbAhleWUtZmlsbA5saWdodGJ1bGItZmlsbAlmbGFnLWZpbGwIdGFnLWZpbGwNcG9zaXRpb24tZmlsbA1sb2NhdGlvbi1maWxsCG1hcC1maWxsDGluYm94aW4tZmlsbAhib3gtZmlsbBBkYXRhYmFzZXNldC1maWxsD2xheWVyZ3JvdXAtZmlsbAhjcnktZmlsbApzbWlsZS1maWxsC3VubG9jay1maWxsCWxvY2stZmlsbA9hbGlnbnJpZ2h0LWZpbGwOYWxpZ25sZWZ0LWZpbGwRYm9yZGVyYm90dG9tLWZpbGwOYm9yZGVydG9wLWZpbGwQYWxpZ25jZW50ZXItZmlsbBNib3JkZXJ2ZXJ0aWNsZS1maWxsDnBpY2NlbnRlci1maWxsDHBpY3NpZGUtZmlsbA9mb2xkZXJvcGVuLWZpbGwPZm9sZGVycGx1cy1maWxsC2ZvbGRlci1maWxsCGZpbGUtU1FMDWZpbGVwbHVzLWZpbGwJZmlsZS1maWxsCWNvcHktZmlsbAxoZWFkc2V0LWZpbGwKcGhvbmUtZmlsbBBwYXVzZWNpcmNsZS1maWxsD3N0b3BjaXJjbGUtZmlsbA9wbGF5Y2lyY2xlLWZpbGwLZGVsZXRlLWZpbGwMcGljdHVyZS1maWxsCW1haWwtZmlsbApoZWFydC1maWxsD2NvbGxlY3Rpb24tZmlsbA91c2VyLWdyb3VwLWZpbGwNdXNlcnBsdXMtZmlsbAl1c2VyLWZpbGwIY29nLWZpbGwKY2xvY2stZmlsbBBjYWxlbmRhcmFsdC1maWxsEmNsb3VkZG93bmxvYWQtZmlsbBBjbG91ZHVwbG9hZC1maWxsDWV4Y2hhbmdlLWZpbGwQaW5mby1jaXJjbGUtZmlsbBRxdWVzdGlvbi1jaXJjbGUtZmlsbBNleGNsYW1hdGlvbmNpcmNsZS1mEW1pbnVzLWNpcmNsZS1maWxsEHBsdXMtY2lyY2xlLWZpbGwRdGltZXMtY2lyY2xlLWZpbGwRY2hlY2stY2lyY2xlLWZpbGwQY29tcHJlc3NhbHQtZmlsbA5leHBhbmRhbHQtZmlsbAZmaWx0ZXIDYWxsDWRhdGFiYXNlLXBsdXMIZGF0YWJhc2UNY29tbWVudC1saW5lcwxjb21tZW50LWRvdHMLcGFwZXItcGxhbmUJZXllLXNsYXNoA2V5ZQlsaWdodGJ1bGIEZmxhZwN0YWcIcG9zaXRpb24IbG9jYXRpb24DbWFwCGluYm94LWluA2JveAxkYXRhYmFzZS1zZXQLbGF5ZXItZ3JvdXAId2luZC1jcnkKd2luZC1zbWlsZQZ1bmxvY2sEbG9jawthbGlnbi1yaWdodAphbGlnbi1sZWZ0DWJvcmRlci1ib3R0b20KYm9yZGVyLXRvcAxhbGlnbi1jZW50ZXIPYm9yZGVyLXZlcnRpY2xlCnBpYy1jZW50ZXIIcGljLXNpZGULZm9sZGVyLW9wZW4LZm9sZGVyLXBsdXMGZm9sZGVyCWZpbGUtU1FMMQlmaWxlLXBsdXMEZmlsZQRjb3B5B2hlYWRzZXQFcGhvbmULcGF1c2VjaXJjbGUKc3RvcGNpcmNsZQpwbGF5Y2lyY2xlBmRlbGV0ZQdwaWN0dXJlBG1haWwEbGlrZQpjb2xsZWN0aW9uCnVzZXItZ3JvdXAMYWNjb3VudC1wbHVzB2FjY291bnQDY29nBWNsb2NrDGNhbGVuZGFyLWFsdA1jbG91ZGRvd25sb2FkC2Nsb3VkdXBsb2FkCGV4Y2hhbmdlC2luZm8tY2lyY2xlD3F1ZXN0aW9uLWNpcmNsZRJleGNsYW1hdGlvbi1jaXJjbGUMbWludXMtY2lyY2xlC3BsdXMtY2lyY2xlDHRpbWVzLWNpcmNsZQxjaGVjay1jaXJjbGUMY29tcHJlc3MtYWx0CmV4cGFuZC1hbHQDYmFuBXRpbWVzBWNoZWNrDHNlYXJjaC1taW51cwtzZWFyY2gtcGx1cwZzZWFyY2gFcmVwbHkEdW5kbwRyZWRvDWV4dGVybmFsLWxpbmsKYXJyb3dzLWFsdAZpbmRlbnQHb3V0ZGVudAlzb3J0LWxpbmUGc3dpdGNoD3dpbmQtZGVzY2VuZGluZw53aW5kLWFzY2VuZGluZwhkb3dubG9hZAZ1cGxvYWQPYXJyb3ctdG8tYm90dG9tDGFycm93LXRvLXRvcA9sb25nLWFycm93LWRvd24NbG9uZy1hcnJvdy11cAthcnJvdy1yaWdodAphcnJvdy1sZWZ0BHNvcnQJc29ydC1kb3duB3NvcnQtdXALY2FyZXQtcmlnaHQKY2FyZXQtbGVmdAhhcnJvd3MtdhFhbmdsZS1kb3VibGUtZG93bg9hbmdsZS1kb3VibGUtdXASYW5nbGUtZG91YmxlLXJpZ2h0EWFuZ2xlLWRvdWJsZS1sZWZ0CmFuZ2xlLWRvd24IYW5nbGUtdXALYW5nbGUtcmlnaHQKYW5nbGUtbGVmdAlwYXBlcmNsaXAKY29ubmVjdGlvbgxpb3MtYWlycGxhbmUIdHJhaW5pbmcHcHJvY2VzcwRuZXdzBHNhdmUFcHJpbnQMbmV3LXJlbGVhc2VzCWlvcy13b21hbgdyZWxlYXNlBWFsZXJ0CWJhY2tzcGFjZQNnZW0Lc3Rhci1jaXJjbGULdXNlci1jaXJjbGUSY2xvdWQtbWFjaGluZS1maWxsDWNsb3VkLW1hY2hpbmUNdGVybWluYWwtZmlsbAh0ZXJtaW5hbBJzaG9wcGluZy1jYXJ0LWZpbGwMaW9zLWFwZXJ0dXJlCHJlc291cmNlCWlvcy1hbGFybRJpb3MtYXJyb3ctZHJvcGRvd24EcmFuawhzeW5jLWFsdAdjb21wYXNzEmFycm93LWFsdC1mcm9tLXRvcBRhcnJvdy1hbHQtZnJvbS1ib3R0bwRtZW51CWljb24tZHJhZw1lYXJseS13YXJuaW5nBXNoYXJlBnNoYXJlMQttYW5hZ2VtZW50LQphY2Nlc3NrZXlzFGlvcy1hcnJvdy1kcm9wbGVmdC1jE2Fycm93LXNvcnRkb3duLXNtYWwRbWludXMtc3F1YXJlLWZpbGwQcGx1cy1zcXVhcmUtZmlsbAxtaW51cy1zcXVhcmULcGx1cy1zcXVhcmUSaW9zLWFycm93LWRyb3BsZWZ0CHN0ZXBtb2RlDXNjcm9sbGluZ21vZGUQaW9zLWFycm93LWRyb3B1cBRpb3MtYXJyb3ctZHJvcHJpZ2h0LQxzaG9wcGluZ2NhcnQMd2FpdGluZy1maWxsB3dhaXRpbmcQcmlnaHQtYXJyb3ctcmVjdA9sZWZ0LWFycm93LXJlY3QUaW9zLWFycm93LWRyb3Bkb3duLWMEYmVsbA9zdHJ1Y3R1cmVkLWRhdGEGdmVjdG9yCE5FVy1jb3B5CEhPVC1jb3B5BGhvbWUUaW9zLWFycm93LWRyb3B1cC1jaXIKbW9uaXRvcmluZwhkaWFnbm9zZRNpb3MtYXJyb3ctZHJvcHJpZ2h0B2xvYWRpbmcORGlyZWN0b3J5LXRyZWUKaW9zLWF0dGFjaAZpb3MtYXQHaW9zLWJlZBBpb3MtYmF0dGVyeS1mdWxsDWlvcy1ib29rbWFya3MNaW9zLWJsdWV0b290aAxpb3MtY2VsbHVsYXIHaW9zLWN1dAhpb3MtbGVhZgdpb3MtbWljDWlvcy1tYWlsLW9wZW4LYXBwbGljYXRpb24QYXBwbGljYXRpb25ncm91cBBpb3MtcGFydGx5LXN1bm55E2lvcy1yYWRpby1idXR0b24tb24UaW9zLXJhZGlvLWJ1dHRvbi1vZmYKaW9zLXJlbW92ZRRpb3MtcmVtb3ZlLWNpcmNsZS1vdRFpb3MtcmVtb3ZlLWNpcmNsZQppb3Mtcm9ja2V0Cmlvcy1yaWJib24IaW9zLXN0YXINaW9zLXN0YXItaGFsZhBpb3Mtc3Rhci1vdXRsaW5lCGlvcy1zbm93DWlvcy1zdG9wd2F0Y2gJaW9zLXN1bm55Cmlvcy11bmxvY2sKaW9zLXRyb3BoeQxpb3MtdW1icmVsbGEMaW9zLXZpZGVvY2FtD2lvcy12b2x1bWUtaGlnaAlpb3Mtd2F0ZXIIaW9zLXdpZmkIbWQtd2F0ZXILbWQtY2hlY2tib3gObWQtY2hhdGJ1YmJsZXMMbWQtY2hhdGJveGVzDW1kLWNsb3VkLWRvbmUPbWQtY2xvdWQtdXBsb2FkCW1kLWNsb3VkeQttZC1jb250cmFzdAdtZC1kaXNjDm1kLWhlYXJ0LWVtcHR5CG1kLWhlYXJ0B21kLWhvbWUMbWQtbWFpbC1vcGVuDW1kLWhlYXJ0LWhhbGYJbWQtcGVyc29uCW1kLXBlb3BsZQdtZC1tb3JlB21kLW1vb24GbWQtcGluBmRvdXlpbgZhbGlwYXkId2lmaS1vZmYAAAAB//8AAgABAAAADAAAABYAAAACAAEAAwFdAAEABAAAAAIAAAAAAAAAAQAAAADVpCcIAAAAAN6AluYAAAAA3oCW5g==";
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "tm-icon",
  props: __spreadProps(__spreadValues({}, custom_props), {
    label: {
      type: String,
      default: ""
    },
    fontSize: {
      type: [Number],
      default: 34
    },
    color: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    spin: {
      type: [Boolean],
      defalut: true
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["click", "longpress"],
  setup(__props, { emit: emits }) {
    const props = __props;
    var domModule = weex.requireModule("dom");
    const Binding = requireNativePlugin("bindingx");
    const store = useTmpiniaStore();
    const { proxy } = getCurrentInstance();
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    computed(() => computedTheme(props, isDark.value, tmcfg.value));
    function clickhandle(e) {
      emits("click", e);
    }
    const appTextColor = inject("appTextColor", computed(() => void 0));
    const textColor = computed(() => {
      if (props.followTheme && store.tmStore.color)
        return store.tmStore.color;
      let isColorHex = theme.isCssColor(props.color);
      if (isColorHex)
        return props.color;
      if (props.color && !isColorHex) {
        let nowcolor = theme.getColor(props.color);
        return nowcolor.csscolor;
      }
      if (appTextColor.value)
        return appTextColor.value;
      return "rgba(34, 34, 34, 1.0)";
    });
    const fontSizeComputed = computed(() => {
      return { fontSize: (props.fontSize || 30) + props.unit };
    });
    computed(() => {
      let prefix = props.name.split("-")[0];
      return prefix;
    });
    const iconComputed = computed(() => {
      let name2 = props.name.substr(props.name.indexOf("-") + 1);
      let itemIcon = fontList.glyphs.find((item, index2) => {
        return item.font_class == name2;
      });
      if (itemIcon) {
        return JSON.parse('"\\u' + String(itemIcon.unicode) + '"');
      }
      return props.name;
    });
    const isImg = computed(() => {
      if (props.name[0] == "." || props.name[0] == "/" || props.name.substring(0, 5) == "data:" || props.name.substring(0, 4) == "http" || props.name.substring(0, 5) == "https" || props.name.substring(0, 3) == "ftp") {
        return true;
      }
      return false;
    });
    const spinComputed = computed(() => props.spin);
    const custom_space_size = inject("custom_space_size", [0, 0]);
    computed(() => parseInt(props.fontSize || 34) + custom_space_size[0]);
    computed(() => parseInt(props.fontSize || 34) + custom_space_size[1]);
    const bindxToken = ref(null);
    function getEl(el) {
      if (typeof el === "string" || typeof el === "number")
        return el;
      if (WXEnvironment) {
        return el.ref;
      } else {
        return el instanceof HTMLElement ? el : el.$el;
      }
    }
    function spinNvueAni() {
      if (!proxy.$refs["icon"])
        return;
      let icon = getEl(proxy.$refs.icon);
      Binding.bind({
        eventType: "timing",
        exitExpression: "t>1200",
        props: [
          {
            element: icon,
            property: "transform.rotate",
            expression: "linear(t,0,360,1200)"
          }
        ]
      }, function(res) {
        if (res.state === "exit") {
          spinNvueAni();
        }
        bindxToken.value = res.token;
      });
    }
    watch(spinComputed, () => {
      Binding.unbindAll();
      if (val) {
        nextTick(function() {
          spinNvueAni();
        });
      }
    });
    onBeforeMount(() => {
      domModule.addRule("fontFace", {
        fontFamily: "tmicon",
        src: "url('data:font/ttf;charset=utf-8;base64," + tmiconFont + "')"
      });
    });
    onMounted(() => {
      if (spinComputed.value) {
        spinNvueAni();
      }
    });
    onUnmounted(() => {
      if (bindxToken.value) {
        Binding.unbind({
          token: bindxToken.value,
          eventType: "timing"
        });
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        renderWhole: true,
        class: "flex flex-row flex-row-center-center",
        style: normalizeStyle([{
          marginRight: unref(custom_space_size)[0] + "rpx",
          marginBottom: unref(custom_space_size)[1] + "rpx"
        }])
      }, [
        !unref(isImg) ? (openBlock(), createElementBlock("u-text", {
          key: 0,
          renderWhole: true,
          ref: "icon",
          onClick: clickhandle,
          onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
          class: normalizeClass([unref(spinComputed) ? "spin" : "", "text-size-n d-inline-block ", "tmicon", unref(customClass)]),
          style: normalizeStyle([{ fontFamily: "tmicon", color: unref(textColor) }, unref(fontSizeComputed), unref(customCSSStyle)])
        }, toDisplayString$1(unref(iconComputed)), 39)) : createCommentVNode("v-if", true),
        unref(isImg) ? (openBlock(), createElementBlock("u-image", {
          key: 1,
          renderWhole: true,
          onClick: clickhandle,
          onLongpress: _cache[1] || (_cache[1] = ($event) => emits("longpress", $event)),
          ref: "icon",
          src: unref(iconComputed),
          class: normalizeClass([unref(spinComputed) ? "spin" : "", unref(customClass)]),
          style: normalizeStyle([{ width: (props.fontSize || 30) + props.unit, height: (props.fontSize || 30) + props.unit }, unref(customCSSStyle)])
        }, null, 46, ["src"])) : createCommentVNode("v-if", true)
      ], 4);
    };
  }
});
var tmIcon = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-icon/tm-icon.vue"]]);
var _style_0$5 = { "button": { "": { "backgroundColor": "rgba(0,0,0,0)", "borderWidth": 0, "borderStyle": "solid", "borderColor": "rgba(0,0,0,0)", "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "backgroundColor::after": "rgba(0,0,0,0)", "borderWidth::after": 0, "borderStyle::after": "solid", "borderColor::after": "rgba(0,0,0,0)" } }, "buttonHover": { "": { "backgroundColor": "rgba(0,0,0,0)" } }, "bhover": { "": { "opacity": 0.7 } } };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "tm-button",
  props: __spreadProps(__spreadValues({}, custom_props), {
    transprent: {
      type: Boolean,
      default: false
    },
    followTheme: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "normal"
    },
    fontSize: {
      type: Number,
      default: 0
    },
    fontColor: {
      type: String,
      default: ""
    },
    margin: {
      type: Array,
      default: () => [0, 16]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    shadow: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    block: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    formType: {
      type: String,
      default: ""
    },
    openType: {
      type: String,
      default: ""
    },
    appParameter: {
      type: String,
      default: ""
    },
    sessionFrom: {
      type: String,
      default: ""
    },
    sendMessageTitle: {
      type: String,
      default: ""
    },
    sendMessagePath: {
      type: String,
      default: ""
    },
    sendMessageImg: {
      type: String,
      default: ""
    },
    sendMessageCard: {
      type: String,
      default: ""
    }
  }),
  emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "tap", "longpress", "getphonenumber", "getUserInfo", "getUserProfile", "error", "opensetting", "launchapp", "contact"],
  setup(__props, { emit: emits }) {
    var _a2;
    const props = __props;
    const { proxy } = getCurrentInstance();
    const formtype = computed(() => props.formType);
    let FormParent = null;
    if (formtype.value == "reset" || formtype.value == "submit") {
      FormParent = proxy == null ? void 0 : proxy.$parent;
      while (FormParent) {
        if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
          break;
        } else {
          FormParent = (_a2 = FormParent == null ? void 0 : FormParent.$parent) != null ? _a2 : void 0;
        }
      }
    }
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isclickOn = ref(false);
    const _load = computed(() => props.loading);
    const _disabled = computed(() => props.disabled);
    const _label = computed(() => props.label);
    const _icon = computed(() => props.icon);
    const sizeObj = {
      block: { w: 0, h: 80, fontSize: 28, round: 3 },
      mini: { w: 88, h: 36, fontSize: 20, round: 2 },
      small: { w: 120, h: 56, fontSize: 22, round: 3 },
      normal: { w: 220, h: 80, fontSize: 28, round: 3 },
      middle: { w: 360, h: 80, fontSize: 30, round: 3 },
      large: { w: 535, h: 88, fontSize: 32, round: 4 }
    };
    const btnSizeObj = computed(() => {
      let fontSize = props.fontSize || 0;
      if (props.block) {
        return { w: 0, h: props.height || sizeObj.block.h, fontSize: fontSize || sizeObj.block.fontSize, round: props.round || sizeObj.normal.round };
      }
      return {
        w: props.width || sizeObj[props.size].w,
        h: props.height || sizeObj[props.size].h,
        fontSize: fontSize || sizeObj[props.size].fontSize,
        round: props.round || sizeObj[props.size].round
      };
    });
    const _fontColor = computed(() => props.fontColor);
    function touchstart(e) {
      isclickOn.value = true;
      emits("touchstart", e);
    }
    function touchend(e) {
      isclickOn.value = false;
      emits("touchend", e);
    }
    function onclick(e) {
      if (FormParent != null && typeof FormParent != "undefined" && formtype.value && !props.loading) {
        FormParent[formtype.value]();
      }
      emits("click", e);
      if (props.url !== "" && typeof props.url === "string") {
        let url = props.url;
        if (url[0] !== "/")
          url = "/" + url;
        uni.navigateTo({
          url
        });
        return;
      }
      if (props.openType == "getUserInfo" || props.openType == "getUserProfile")
        ;
    }
    return (_ctx, _cache) => {
      const _component_button = resolveComponent("button");
      return openBlock(), createBlock(tmSheet, {
        "no-level": "",
        _style: [{ opacity: isclickOn.value || unref(_disabled) ? 0.7 : 1 }],
        "hover-class": "bhover",
        round: unref(btnSizeObj).round,
        width: unref(btnSizeObj).w,
        height: unref(btnSizeObj).h,
        padding: props.padding,
        margin: props.margin,
        color: props.color,
        shadow: props.shadow,
        transprent: props.transprent,
        linear: props.linear,
        "linear-deep": props.linearDeep,
        text: props.text,
        outlined: props.outlined,
        dark: props.dark,
        "follow-dark": props.followDark,
        "follow-theme": props.followTheme,
        "border-direction": props.borderDirection,
        "border-style": props.borderStyle,
        border: props.border,
        blur: props.blur,
        _class: "flex flex-row flex-center pointer"
      }, {
        default: withCtx(() => [
          createVNode(_component_button, {
            onClick: onclick,
            onTouchstart: touchstart,
            onTouchend: touchend,
            onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
            onTouchcancel: _cache[1] || (_cache[1] = ($event) => {
              isclickOn.value = false;
              emits("touchcancel", $event);
            }),
            onTouchmove: _cache[2] || (_cache[2] = ($event) => emits("touchmove", $event)),
            onGetphonenumber: _cache[3] || (_cache[3] = ($event) => emits("getphonenumber", $event)),
            onError: _cache[4] || (_cache[4] = ($event) => emits("error", $event)),
            onOpensetting: _cache[5] || (_cache[5] = ($event) => emits("opensetting", $event)),
            onLaunchapp: _cache[6] || (_cache[6] = ($event) => emits("launchapp", $event)),
            onContact: _cache[7] || (_cache[7] = ($event) => emits("contact", $event)),
            "form-type": props.formType,
            openType: props.openType,
            appParameter: props.appParameter,
            sessionFrom: props.sessionFrom,
            sendMessageTitle: props.sendMessageTitle,
            sendMessagePath: props.sendMessagePath,
            sendMessageImg: props.sendMessageImg,
            sendMessageCard: props.sendMessageCard,
            loading: unref(_load),
            disabled: unref(_disabled),
            "hover-start-time": 1e7,
            "hover-stop-propagation": "",
            "hover-class": "buttonHover",
            class: normalizeClass(["button flex-1 flex-center", [unref(customClass)]]),
            style: normalizeStyle([[{ height: unref(btnSizeObj).h + "rpx" }, unref(customCSSStyle)], { "border": "0px solid rgba(0, 0, 0, 0)", "background": "rgba(0, 0, 0, 0)", "border-radius": "0px" }])
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, () => [
                unref(_icon) ? (openBlock(), createBlock(tmIcon, {
                  key: 0,
                  userInteractionEnabled: false,
                  color: unref(_fontColor),
                  _class: unref(_label) ? "pr-10" : "",
                  fontSize: unref(btnSizeObj).fontSize * 0.9,
                  name: unref(_icon)
                }, null, 8, ["color", "_class", "fontSize", "name"])) : createCommentVNode("v-if", true),
                createVNode(tmText, {
                  userInteractionEnabled: false,
                  color: unref(_fontColor),
                  fontSize: unref(btnSizeObj).fontSize,
                  label: unref(_label)
                }, null, 8, ["color", "fontSize", "label"])
              ])
            ]),
            _: 3
          }, 8, ["form-type", "openType", "appParameter", "sessionFrom", "sendMessageTitle", "sendMessagePath", "sendMessageImg", "sendMessageCard", "loading", "disabled", "class", "style"])
        ]),
        _: 3
      }, 8, ["_style", "round", "width", "height", "padding", "margin", "color", "shadow", "transprent", "linear", "linear-deep", "text", "outlined", "dark", "follow-dark", "follow-theme", "border-direction", "border-style", "border", "blur"]);
    };
  }
});
var tmButton = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["styles", [_style_0$5]], ["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-button/tm-button.vue"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "tm-float-button",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    position: {
      type: String,
      default: "br",
      validator: (val2) => {
        let isv = ["bc", "bl", "br", "tc", "tl", "tr"].includes(val2);
        if (!isv) {
          formatAppLog("error", "at tmui/components/tm-float-button/tm-float-button.vue:76", "\u4F4D\u7F6E\u53C2\u6570\u4E3A:'bc','bl','br','tc','tl','tr'\u5176\u4E2D\u7684\u4E00\u9879");
        }
        return isv;
      }
    },
    actionsPos: {
      type: String,
      default: "top",
      validator: (val2) => {
        let isv = ["left", "right", "top", "bottom"].includes(val2);
        if (!isv) {
          formatAppLog("error", "at tmui/components/tm-float-button/tm-float-button.vue:88", "\u4F4D\u7F6E\u53C2\u6570\u4E3A:'left','right','top','bottom'\u5176\u4E2D\u7684\u4E00\u9879");
        }
        return isv;
      }
    },
    width: {
      type: Number,
      default: 112
    },
    height: {
      type: Number,
      default: 112
    },
    offset: {
      type: Array,
      default: () => [32, 32]
    },
    actions: {
      type: Array,
      default: () => []
    },
    btn: {
      type: Object,
      default: () => {
      },
      required: true
    },
    showActions: {
      type: Boolean,
      default: false
    },
    clickHidnActions: {
      type: Boolean,
      default: true
    }
  },
  emits: ["click", "change"],
  setup(__props, { emit: emits }) {
    var _a2;
    const props = __props;
    let { windowTop, windowWidth } = uni.getSystemInfoSync();
    windowTop = windowTop || 0;
    const isH5 = ref(false);
    const showActions = ref((_a2 = props.showActions) != null ? _a2 : false);
    const BtnPos = computed(() => props.position);
    const AcionPos = computed(() => props.actionsPos);
    const _offset = computed(() => {
      var _a3;
      let ost = (_a3 = props.offset) != null ? _a3 : [0, 0];
      ost = [uni.upx2px(props.offset[0]), uni.upx2px(props.offset[1])];
      return ost;
    });
    const centerPosLeft = computed(() => {
      let ps = (windowWidth - uni.upx2px(props.width * 1.5)) / 2 + uni.upx2px(_offset.value[0]);
      return ps;
    });
    const _btn = computed(() => {
      var _a3;
      return __spreadValues({ icon: "tmicon-plus", fontSize: 20, color: "primary", linear: "", linearDeep: "accent", label: "", iconSize: 42, fontColor: "" }, (_a3 = props.btn) != null ? _a3 : {});
    });
    const _actionsItem = computed(() => {
      let asbtn = props.actions.map((el) => {
        let default_btn = { icon: "tmicon-plus", fontSize: 20, color: "primary", linear: "", linearDeep: "accent", label: "", fontColor: "", iconSize: 36 };
        return __spreadValues(__spreadValues({}, default_btn), el);
      });
      return asbtn;
    });
    const AcionPos_xy = computed(() => {
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bc") && AcionPos.value == "bottom") {
        return { top: `${props.height}rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
      }
      if ((BtnPos.value == "bl" || BtnPos.value == "br") && AcionPos.value == "bottom") {
        return { top: `${props.height}rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
      }
      if ((BtnPos.value == "bl" || BtnPos.value == "br") && AcionPos.value == "top") {
        return { top: `0px`, dispaly: "flex", "flex-direction": "column-reverse" };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bc") && AcionPos.value == "top") {
        return { top: `-0rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tc" || BtnPos.value == "bl" || BtnPos.value == "br" || BtnPos.value == "bc") && AcionPos.value == "right") {
        return { left: `${props.height}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row" };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bl" || BtnPos.value == "br" || BtnPos.value == "bc") && AcionPos.value == "left") {
        return { right: `${props.height}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row-reverse" };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "right") {
        return { right: `${0}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row" };
      }
    });
    const parent_style = computed(() => {
      let height_width = showActions.value ? (props.actions.length + 1) * props.height : props.height;
      height_width = (props.actions.length + 1) * props.height;
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc") && AcionPos.value == "bottom") {
        return { height: height_width + "rpx" };
      }
      if (BtnPos.value == "tl" && AcionPos.value == "top") {
        let top = -(props.actions.length * props.height - _offset.value[1]);
        top = -props.height + _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tc") && AcionPos.value == "right") {
        return { width: height_width + "rpx" };
      }
      if (BtnPos.value == "tl" && AcionPos.value == "left") {
        let left = -(props.actions.length * props.height - _offset.value[0]);
        left = -props.height + _offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}rpx) translateY(${_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "left") {
        -(props.actions.length * props.height - _offset.value[0]);
        -props.height + _offset.value[0];
        return {
          width: height_width + "rpx",
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "top") {
        let top = -(props.actions.length * props.height - _offset.value[1]);
        return {
          height: height_width + "rpx",
          transform: `translateX(-${_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "right") {
        let right = props.actions.length * props.height - _offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${right}rpx) translateY(${_offset.value[1]}rpx)`
        };
      }
      if (BtnPos.value == "tc" && AcionPos.value == "left") {
        let left = centerPosLeft.value - uni.upx2px(props.actions.length * props.height) - uni.upx2px(_offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "tc" && AcionPos.value == "top") {
        let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
        let top = -(props.actions.length * props.height - _offset.value[1]);
        return {
          height: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "bottom") {
        let top = props.actions.length * props.height - _offset.value[1];
        top = props.height - _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "top") {
        let top = -_offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "right") {
        return {
          width: height_width + "rpx"
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "left") {
        let left = -(props.actions.length * props.height - _offset.value[0]);
        left = -props.height + _offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}rpx) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "bottom") {
        let top = props.actions.length * props.height - _offset.value[1];
        top = props.height - _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${-_offset.value[0]}rpx) translateY(${top}rpx)`
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "top") {
        let top = -_offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${-_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "right") {
        let right = props.actions.length * props.height - _offset.value[0];
        right = props.height - _offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${right}rpx) translateY(${-_offset.value[1]}rpx)`
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "left") {
        let left = -_offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}rpx) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "left") {
        let left = centerPosLeft.value - uni.upx2px(props.actions.length * props.height) - uni.upx2px(_offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "right") {
        let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "top") {
        let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
        let top = -_offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "bottom") {
        let left = centerPosLeft.value + uni.upx2px(_offset.value[0]);
        let top = props.actions.length * props.height + _offset.value[1];
        top = props.height - _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${top}rpx)`,
          "flex-direction": "column"
        };
      }
    });
    function onclick(e) {
      if (props.clickHidnActions) {
        showActions.value = !showActions.value;
      } else {
        showActions.value = true;
      }
      emits("click", e);
    }
    function change(index2, item) {
      if (props.clickHidnActions) {
        showActions.value = false;
      }
      emits("change", index2, item);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "fixed zIndex-12 flex",
        style: normalizeStyle([
          unref(BtnPos) == "tl" ? { transform: `translateX(${unref(_offset)[0]}rpx) translateY(${unref(_offset)[1]}rpx)` } : "",
          unref(BtnPos) == "tr" ? { transform: `translateX(-${unref(_offset)[0]}rpx) translateY(${unref(_offset)[1]}rpx)`, right: "0px" } : "",
          unref(BtnPos) == "tc" ? { transform: `translateX(${unref(centerPosLeft)}px) translateY(${unref(_offset)[1]}rpx)` } : "",
          unref(BtnPos) == "bl" ? { transform: `translateX(${unref(_offset)[0]}rpx) translateY(-${unref(_offset)[1]}rpx)`, bottom: "0px" } : "",
          unref(BtnPos) == "br" ? { transform: `translateX(-${unref(_offset)[0]}rpx) translateY(-${unref(_offset)[1]}rpx)`, right: "0px", bottom: "0px" } : "",
          unref(BtnPos) == "bc" ? { transform: `translateX(${unref(centerPosLeft)}px) translateY(-${unref(_offset)[1]}rpx)`, bottom: "0px" } : "",
          !isH5.value && (unref(BtnPos) == "tl" || unref(BtnPos) == "tc" || unref(BtnPos) == "tr") ? { top: "0px" } : "",
          unref(parent_style)
        ])
      }, [
        createCommentVNode(" \u4E3B\u6309\u94AE "),
        createElementVNode("view", {
          style: normalizeStyle([{ width: props.width + "rpx", height: props.height + "rpx" }]),
          class: "flex-center"
        }, [
          createVNode(tmSheet, {
            transprent: true,
            padding: [0, 0],
            margin: [0, 0],
            color: unref(_btn).color
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(tmButton, {
                  followTheme: props.followTheme,
                  onClick: onclick,
                  _class: "flex flex-col flex-col-center-center",
                  shadow: 3,
                  linear: unref(_btn).linear,
                  "linear-deep": unref(_btn).linearDeep,
                  color: unref(_btn).color,
                  margin: [0, 0],
                  round: 16,
                  padding: [0, 0],
                  width: props.width - 12,
                  height: props.height - 12
                }, {
                  default: withCtx(() => [
                    createVNode(tmIcon, {
                      userInteractionEnabled: false,
                      "follow-dark": false,
                      color: unref(_btn).fontColor,
                      name: unref(_btn).icon,
                      "font-size": unref(_btn).iconSize
                    }, null, 8, ["color", "name", "font-size"]),
                    unref(_btn).label ? (openBlock(), createBlock(tmText, {
                      key: 0,
                      userInteractionEnabled: false,
                      "follow-dark": false,
                      color: unref(_btn).fontColor,
                      label: unref(_btn).label,
                      "font-size": unref(_btn).fontSize
                    }, null, 8, ["color", "label", "font-size"])) : createCommentVNode("v-if", true)
                  ]),
                  _: 1
                }, 8, ["followTheme", "linear", "linear-deep", "color", "width", "height"])
              ])
            ]),
            _: 3
          }, 8, ["color"])
        ], 4),
        createCommentVNode(" \u5B50\u83DC\u5355 "),
        unref(_actionsItem).length > 0 && showActions.value ? (openBlock(), createElementBlock("view", {
          key: 0,
          userInteractionEnabled: showActions.value,
          class: "absolute flex",
          style: normalizeStyle([unref(AcionPos_xy)])
        }, [
          createElementVNode("view", {
            style: normalizeStyle([{ width: props.width + "rpx", height: props.height + "rpx" }]),
            class: "flex-center"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_actionsItem), (item, index2) => {
              return openBlock(), createBlock(tmSheet, {
                followTheme: props.followTheme,
                onClick: ($event) => change(index2, item),
                key: index2,
                _class: "flex flex-col flex-col-center-center",
                round: 16,
                shadow: 2,
                linear: item.linear,
                "linear-deep": item.linearDeep,
                color: item.color,
                margin: [0, 0],
                padding: [0, 0],
                width: props.width - 12,
                height: props.height - 12
              }, {
                default: withCtx(() => [
                  createVNode(tmIcon, {
                    userInteractionEnabled: false,
                    color: item.fontColor,
                    name: item.icon,
                    "font-size": item.iconSize
                  }, null, 8, ["color", "name", "font-size"]),
                  item.label ? (openBlock(), createBlock(tmText, {
                    key: 0,
                    userInteractionEnabled: false,
                    color: item.fontColor,
                    label: item.label,
                    "font-size": item.fontSize
                  }, null, 8, ["color", "label", "font-size"])) : createCommentVNode("v-if", true)
                ]),
                _: 2
              }, 1032, ["followTheme", "onClick", "linear", "linear-deep", "color", "width", "height"]);
            }), 128))
          ], 4)
        ], 12, ["userInteractionEnabled"])) : createCommentVNode("v-if", true)
      ], 4);
    };
  }
});
var tmFloatButton = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-float-button/tm-float-button.vue"]]);
var _style_0$4 = { "fade": { "": { "opacity": 0 } }, "fade-reverse": { "": { "opacity": 1 } }, "up": { "": { "transform": "translateY(0%)" } }, "up-reverse": { "": { "transform": "translateY(-101%)" } }, "down": { "": { "transform": "translateY(0%)" } }, "down-reverse": { "": { "transform": "translateY(101%)" } }, "left": { "": { "transform": "translateX(0%)" } }, "left-reverse": { "": { "transform": "translateX(-101%)" } }, "right": { "": { "transform": "translateX(0%)" } }, "right-reverse": { "": { "transform": "translateX(101%)" } }, "zoom": { "": { "transform": "scale(0, 0)", "opacity": 0 } }, "zoom-reverse": { "": { "transform": "scale(1, 1)", "opacity": 1 } } };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "tm-translate",
  props: __spreadProps(__spreadValues({}, custom_props), {
    duration: {
      type: Number,
      default: 200
    },
    delay: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: "fade"
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 0
    },
    reverse: {
      type: [Boolean, String],
      default: false
    }
  }),
  emits: ["start", "end", "click"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const Binding = requireNativePlugin("bindingx");
    const dom = requireNativePlugin("dom");
    function hanlder(e) {
      emits("click", e);
    }
    const { proxy } = getCurrentInstance();
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const computedHeight = computed(() => {
      if (!props.height || !Number(props.height)) {
        return 0;
      }
      if (String(props.height).indexOf("px") > -1 || String(props.height).indexOf("rpx") > -1) {
        return String(props.height);
      }
      return String(props.height) + "rpx";
    });
    const computedWidth = computed(() => {
      if (!props.width) {
        return 0;
      }
      if (String(props.width).indexOf("px") > -1 || String(props.width).indexOf("rpx") > -1) {
        return props.width;
      }
      return props.width + "rpx";
    });
    const animationName = computed(() => props.name || "fade");
    const durationtos = computed(() => props.duration);
    const computedReverse = computed(() => props.reverse);
    const reverseAniPrefxname = computed(() => computedReverse.value ? "-reverse" : "");
    const animationStatus = ref(0);
    const tmid = ref(Number(uni.$tm.u.getUid(3)));
    const isLoadEl = ref(false);
    const animationData = ref(null);
    function init() {
      nextTick(() => {
        isLoadEl.value = true;
        if (props.autoPlay == true && !props.disabled) {
          play();
        }
      });
    }
    function play() {
      if (props.disabled == true)
        return;
      animationStatus.value = 0;
      clearTimeout(tmid.value);
      nextTick(function() {
        tmid.value = setTimeout(function() {
          nvueAmatons();
        }, 50);
      });
    }
    function stop() {
      if (props.disabled == true)
        return;
      clearTimeout(tmid.value);
      animationStatus.value = 0;
    }
    function reset() {
      if (props.disabled == true)
        return;
      stop();
      animationStatus.value = 0;
    }
    expose({
      init,
      play,
      stop,
      reset
    });
    function getEl(el) {
      if (typeof el === "string" || typeof el === "number")
        return el;
      if (WXEnvironment) {
        return el.ref;
      } else {
        return el instanceof HTMLElement ? el : el.$el;
      }
    }
    onMounted(() => init());
    onUnmounted(() => {
      clearTimeout(tmid.value);
      animationStatus.value = 0;
    });
    function nvueAmatons() {
      var el = proxy.$refs.nvueElAni;
      let propsAni = {};
      dom.getComponentRect(el, function(res) {
        const {
          width,
          height
        } = res.size;
        let elDom = getEl(el);
        if (animationName.value == "fade") {
          propsAni = {
            exitExpression: `t>${durationtos.value}`,
            props: [{
              element: elDom,
              property: "opacity",
              expression: `easeOutSine(t,0,1,${durationtos.value})`
            }]
          };
        } else if (animationName.value == "up") {
          propsAni = {
            exitExpression: `t>${durationtos.value}`,
            props: [{
              element: elDom,
              property: "transform.translateY",
              expression: computedReverse.value ? `easeOutSine(t,-${height},${height},${durationtos.value})` : `easeOutSine(t,${0},-${height},${durationtos.value})`
            }]
          };
        } else if (animationName.value == "down") {
          propsAni = {
            exitExpression: `t>${durationtos.value}`,
            props: [{
              element: elDom,
              property: "transform.translateY",
              expression: computedReverse.value ? `easeOutSine(t,${height},-${height},${durationtos.value})` : `easeOutSine(t,${0},${height},${durationtos.value})`
            }]
          };
        } else if (animationName.value == "right") {
          propsAni = {
            exitExpression: `t>${durationtos.value}`,
            props: [{
              element: elDom,
              property: "transform.translateX",
              expression: computedReverse.value ? `easeOutSine(t,${width},-${width},${durationtos.value})` : `easeOutSine(t,${0},${width},${durationtos.value})`
            }]
          };
        } else if (animationName.value == "left") {
          propsAni = {
            exitExpression: `t>${durationtos.value}`,
            props: [{
              element: elDom,
              property: "transform.translateX",
              expression: computedReverse.value ? `easeOutSine(t,-${width},${width},${durationtos.value})` : `easeOutSine(t,${0},-${width},${durationtos.value})`
            }]
          };
        } else if (animationName.value == "zoom") {
          propsAni = {
            exitExpression: `t>${durationtos.value}`,
            props: [
              {
                element: elDom,
                property: "transform.scale",
                expression: computedReverse.value ? `easeOutSine(t,1,-1,${durationtos.value})` : `easeOutSine(t,0,1,${durationtos.value})`
              },
              {
                element: elDom,
                property: "opacity",
                expression: computedReverse.value ? `easeOutSine(t,1,-1,${durationtos.value})` : `easeOutSine(t,0,1,${durationtos.value})`
              }
            ]
          };
        }
        emits("start");
        animationStatus.value = 1;
        Binding.bind(__spreadValues({
          eventType: "timing"
        }, propsAni), function(res2) {
          if (res2.state === "exit") {
            emits("end");
            animationStatus.value = 2;
            Binding.unbind({
              token: res2.token,
              eventType: "timing"
            });
          }
        });
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "bodywk",
        onClick: hanlder,
        class: normalizeClass([unref(customClass), "overflow"]),
        style: normalizeStyle([
          unref(computedHeight) ? { height: unref(computedHeight) } : "",
          unref(computedWidth) ? { width: unref(computedWidth) } : "",
          unref(customCSSStyle)
        ])
      }, [
        isLoadEl.value ? (openBlock(), createElementBlock("view", {
          key: 0,
          ref: "nvueElAni",
          animation: animationData.value,
          class: normalizeClass([
            "flex-col flex",
            unref(animationName) + unref(reverseAniPrefxname),
            unref(customClass)
          ])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 10, ["animation"])) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var tmTranslate = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["styles", [_style_0$4]], ["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-translate/tm-translate.vue"]]);
var _style_0$3 = { "blurbg": { "": { "opacity": 0 } } };
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "tm-overlay",
  props: __spreadProps(__spreadValues({}, custom_props), {
    align: {
      type: String,
      default: "flex-center"
    },
    bgColor: {
      type: String,
      default: "rgba(0,0,0,0.35)"
    },
    zIndex: {
      type: [Number, String],
      default: 120
    },
    show: {
      type: Boolean,
      default: false
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    duration: {
      type: Number,
      default: 300
    }
  }),
  emits: ["click", "open", "close", "update:show"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const animation = requireNativePlugin("animation");
    const {
      proxy
    } = getCurrentInstance();
    const customCSSStyle = computedStyle(props);
    const customClass = computedClass(props);
    const width = ref(0);
    const height = ref(0);
    const top = ref(0);
    ref(false);
    let timids = uni.$tm.u.getUid(1);
    const { windowTop, windowWidth, windowHeight, safeArea, statusBarHeight } = uni.getSystemInfoSync();
    const sysinfo = uni.getSystemInfoSync();
    width.value = windowWidth;
    height.value = windowHeight + (windowTop || 0);
    if (sysinfo.safeArea.top > 0) {
      height.value = sysinfo.screenHeight;
    } else {
      height.value = sysinfo.safeArea.height - Math.abs(statusBarHeight);
    }
    const timeid = ref(uni.$tm.u.getUid(3));
    const animationData = ref(null);
    const showMask = ref(false);
    onUnmounted(() => clearTimeout(timeid.value));
    const align_rpx = computed(() => props.align);
    const bgColor_rp = computed(() => {
      if (!props.bgColor || props.transprent)
        return "rgba(0,0,0,0)";
      return props.bgColor || "rgba(0,0,0,0.2)";
    });
    onMounted(() => {
      if (!props.show)
        return;
      open(props.show);
    });
    function close(e) {
      e.stopPropagation();
      emits("click", e);
      if (!props.overlayClick)
        return;
      open(false);
    }
    function open(off) {
      fadeInNvue(off);
    }
    function fadeInNvue(off = false) {
      if (off == false) {
        if (showMask.value == off)
          return;
        clearTimeout(timids);
        timids = setTimeout(function() {
          var testEl = proxy.$refs.overlay;
          animation.transition(testEl, {
            styles: {
              backgroundColor: bgColor_rp.value,
              opacity: 0
            },
            duration: props.duration,
            timingFunction: "ease",
            delay: 0
          }, () => {
            showMask.value = off;
            emits("close");
            emits("update:show", false);
          });
        }, props.duration);
      } else {
        showMask.value = off;
        emits("open");
        clearTimeout(timids);
        timids = setTimeout(function() {
          var testEl = proxy.$refs.overlay;
          animation.transition(testEl, {
            styles: {
              backgroundColor: bgColor_rp.value,
              opacity: 1
            },
            duration: props.duration,
            timingFunction: "ease",
            delay: 0
          }, () => {
          });
        }, 50);
      }
    }
    watch(() => props.show, (newval) => {
      open(newval);
    });
    expose({ close, open });
    return (_ctx, _cache) => {
      return showMask.value ? (openBlock(), createElementBlock("view", {
        key: 0,
        ref: "overlay",
        onClick: withModifiers(close, ["stop"]),
        class: normalizeClass([unref(bgColor_rp) && !props.transprent ? "blurbg" : "", unref(align_rpx), " navbarheight flex flex-col  l-0  ", unref(customClass)]),
        style: normalizeStyle([
          unref(bgColor_rp) && !props.transprent ? { backgroundColor: showMask.value ? unref(bgColor_rp) : "" } : "",
          { position: "fixed" },
          __props.zIndex ? { zIndex: __props.zIndex } : "",
          { width: width.value + "px", height: height.value + "px", top: top.value + "px" },
          unref(customCSSStyle)
        ]),
        animation: animationData.value
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 14, ["onClick", "animation"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["styles", [_style_0$3]], ["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-overlay/tm-overlay.vue"]]);
var modelType = /* @__PURE__ */ ((modelType2) => {
  modelType2["load"] = "load";
  modelType2["error"] = "error";
  modelType2["info"] = "info";
  modelType2["warn"] = "warn";
  modelType2["quest"] = "quest";
  modelType2["success"] = "success";
  modelType2["disabled"] = "disabled";
  modelType2["wait"] = "wait";
  return modelType2;
})(modelType || {});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "tm-message",
  props: {
    _style: {
      type: [Array, String, Object],
      default: () => {
      }
    },
    _class: {
      type: [Array, String],
      default: "flex-center"
    },
    mask: {
      type: [Boolean],
      default: true
    },
    duration: {
      type: Number,
      default: 1300
    }
  },
  emits: ["click"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    const { proxy } = getCurrentInstance();
    const uid = ref(uni.$tm.u.getUid(5));
    const bgColor = ref("white");
    const model_ref = ref(modelType.info);
    const showValue = ref(false);
    const icon_ref = ref("");
    const text_ref = ref("");
    const color_ref = ref("");
    const reverse = ref(false);
    const dur = ref(0);
    ref(false);
    const showMask = ref(props.mask);
    const dark_ref = ref(false);
    onUnmounted(() => clearTimeout(uid.value));
    watch(() => props.mask, (val2) => showMask.value = val2);
    const zindex = "";
    const modelIcon = computed(() => {
      return {
        load: {
          icon: "tmicon-loading",
          color: "primary",
          text: language("message.load.text")
        },
        error: {
          icon: "tmicon-times-circle",
          color: "red",
          text: language("message.error.text")
        },
        info: {
          icon: "tmicon-info-circle",
          text: language("message.info.text"),
          color: "black"
        },
        warn: {
          icon: "tmicon-exclamation-circle",
          text: language("message.warn.text"),
          color: "orange"
        },
        quest: {
          icon: "tmicon-question-circle",
          text: language("message.quest.text"),
          color: "pink"
        },
        success: {
          icon: "tmicon-check-circle",
          text: language("message.success.text"),
          color: "green"
        },
        disabled: {
          icon: "tmicon-ban",
          text: language("message.disabled.text"),
          color: "red"
        },
        wait: {
          icon: "tmicon-ios-alarm",
          text: language("message.wait.text"),
          color: "black"
        }
      };
    });
    function msgOver() {
      proxy.$refs.tranAni.stop();
      proxy.$refs.tranAni.reset();
      clearTimeout(uid.value);
      uid.value = setTimeout(function() {
        if (dur.value > 0 && model_ref.value != "load") {
          reverse.value = false;
          showValue.value = false;
        }
      }, dur.value);
    }
    function show(argFs) {
      let arg = argFs || {};
      let { duration, icon, text, color, dark: dark2, model, mask } = arg;
      model_ref.value = typeof model == "undefined" ? model_ref.value : model;
      icon_ref.value = icon = icon != null ? icon : modelIcon.value[model_ref.value].icon;
      text_ref.value = text = text != null ? text : modelIcon.value[model_ref.value].text;
      color_ref.value = color = color != null ? color : modelIcon.value[model_ref.value].color;
      showMask.value = typeof mask === "boolean" ? mask : showMask.value;
      if (dark2 === true) {
        bgColor.value = "black";
      }
      if (typeof dark2 !== "boolean") {
        dark2 = store.tmStore.dark;
      }
      if (color_ref.value == "white" || color_ref.value == "black") {
        color_ref.value = "";
      }
      dark_ref.value = dark2;
      if (typeof duration === "undefined") {
        duration = props.duration;
      }
      dur.value = isNaN(parseInt(String(duration))) ? 1500 : parseInt(String(duration));
      showValue.value = true;
      reverse.value = false;
      clearTimeout(uid.value);
      uid.value = setTimeout(() => {
        clearTimeout(uid.value);
        uid.value = setTimeout(() => {
          proxy.$refs.tranAni.play();
        }, 50);
      }, 50);
    }
    function hide() {
      showValue.value = false;
    }
    expose({ show, hide });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmOverlay, {
        transprent: !showMask.value,
        _style: zindex,
        overlayClick: false,
        show: showValue.value,
        "onUpdate:show": _cache[0] || (_cache[0] = ($event) => showValue.value = $event)
      }, {
        default: withCtx(() => [
          createVNode(tmTranslate, {
            onEnd: msgOver,
            reverse: reverse.value,
            ref: "tranAni",
            name: "zoom",
            duration: 150,
            "auto-play": false
          }, {
            default: withCtx(() => [
              createVNode(tmSheet, {
                blur: "",
                _style: props._style,
                _class: props._class,
                color: bgColor.value,
                border: 1,
                shadow: 10,
                width: 300,
                height: 300,
                margin: [40, 40],
                round: 12,
                padding: [24, 0]
              }, {
                default: withCtx(() => [
                  createElementVNode("view", {
                    class: "flex flex-center flex-col ma-30",
                    style: { "line-height": "normal" }
                  }, [
                    createVNode(tmTranslate, {
                      name: "zoom",
                      delay: 200
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          _style: "line-height: normal",
                          style: { "line-height": "normal" },
                          _class: "pa-10",
                          spin: model_ref.value == "load",
                          color: color_ref.value,
                          fontSize: 72,
                          name: icon_ref.value
                        }, null, 8, ["spin", "color", "name"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmText, {
                      "font-size": 30,
                      _class: "pt-8 text-overflow-1",
                      label: text_ref.value
                    }, null, 8, ["label"])
                  ])
                ]),
                _: 1
              }, 8, ["_style", "_class", "color"])
            ]),
            _: 1
          }, 8, ["reverse"])
        ]),
        _: 1
      }, 8, ["transprent", "show"]);
    };
  }
});
var tmMessage = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-message/tm-message.vue"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "tm-input",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "grey-4"
    },
    focusColor: {
      type: String,
      default: "primary"
    },
    fontColor: {
      type: String,
      default: ""
    },
    text: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    border: {
      type: Number,
      default: 0
    },
    transprent: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 3
    },
    shadow: {
      type: Number,
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    height: {
      type: Number,
      default: 64
    },
    prefix: {
      type: String,
      default: ""
    },
    prefixLabel: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    suffixLabel: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 30
    },
    search: {
      type: String,
      default: ""
    },
    searchLabel: {
      type: String,
      default: ""
    },
    showClear: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    errorLabel: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    align: {
      type: String,
      default: "left"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    inputPadding: {
      type: Array,
      default: () => [24, 0]
    },
    showCharNumber: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: -1
    },
    type: {
      type: String,
      default: "text"
    },
    cursorSpacing: {
      type: Number,
      default: 24
    },
    confirmType: {
      type: String,
      default: "done"
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    autoBlur: {
      type: Boolean,
      default: true
    },
    holdKeyboard: {
      type: Boolean,
      default: false
    },
    adjustPosition: {
      type: Boolean,
      default: true
    },
    focus: {
      type: Boolean,
      default: false
    },
    cursor: {
      type: Number,
      default: 0
    },
    showConfirmBar: {
      type: Boolean,
      default: true
    },
    selectionStart: {
      type: Number,
      default: -1
    },
    selectionEnd: {
      type: Number,
      default: -1
    },
    disableDefaultPadding: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["focus", "blur", "confirm", "input", "update:modelValue", "clear", "search", "keyboardheightchange", "click"],
  setup(__props, { emit: emits }) {
    var _a2;
    const props = __props;
    const store = useTmpiniaStore();
    const { proxy } = getCurrentInstance();
    let parentFormItem = proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_a2 = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _a2 : void 0;
      }
    }
    const isAndroid = ref(false);
    isAndroid.value = uni.getSystemInfoSync().platform == "android" ? true : false;
    const _height = computed(() => props.height);
    const _inputPadding = computed(() => {
      if (props.search !== "" || props.searchLabel !== "") {
        return [4, 0];
      }
      return props.inputPadding;
    });
    const propsDetail = computed(() => {
      return {
        focus: props.focus,
        prefix: props.prefix,
        prefixLabel: props.prefixLabel,
        fontSize: props.fontSize,
        fontSize_px: uni.upx2px(props.fontSize),
        suffix: props.suffix,
        suffixLabel: props.suffixLabel,
        fontColor: props.fontColor,
        search: props.search,
        searchLabel: props.searchLabel,
        showClear: props.showClear,
        password: props.password,
        disabled: props.disabled,
        placeholder: props.placeholder,
        showCharNumber: props.showCharNumber,
        maxlength: props.maxlength,
        cursorSpacing: props.cursorSpacing,
        confirmType: props.confirmType,
        confirmHold: props.confirmHold,
        autoBlur: props.autoBlur,
        holdKeyboard: props.holdKeyboard,
        adjustPosition: props.adjustPosition,
        type: props.type,
        cursor: props.cursor,
        showConfirmBar: props.showConfirmBar,
        selectionStart: props.selectionStart,
        selectionEnd: props.selectionEnd,
        disableDefaultPadding: props.disableDefaultPadding,
        fixed: props.fixed
      };
    });
    const tmcfg = computed(() => store.tmStore);
    computed(() => computedStyle(props));
    computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const _requiredError = ref(false);
    const _foucsActive = ref(props.focus || false);
    watch(() => props.focus, () => {
      _foucsActive.value = props.focus;
    });
    const _color = computed(() => {
      let color = props.color;
      if (_foucsActive.value) {
        if (props.followTheme && store.tmStore.color) {
          color = store.tmStore.color;
        } else {
          color = props.focusColor;
        }
      }
      if (_requiredError.value)
        color = "red";
      return color;
    });
    const tmcomputed = computed(() => {
      const _props = __spreadProps(__spreadValues({}, props), { color: _color.value });
      return computedTheme(_props, isDark.value, tmcfg.value);
    });
    const showPasswordText = ref(propsDetail.value.password);
    const showPasswordIcon = computed(() => props.password);
    ref(props.errorLabel);
    const _value = ref(props.modelValue);
    const _valueLenChar = computed(() => {
      let str = String(_value.value).split("");
      return str.length;
    });
    watch(() => props.modelValue, () => _value.value = props.modelValue);
    const rulesObj = inject("tmFormItemRules", computed(() => {
      var _a3;
      return [{
        message: (_a3 = props == null ? void 0 : props.errorLabel) != null ? _a3 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
        required: false,
        validator: false
      }];
    }));
    function searchClick() {
      emits("search", _value.value);
    }
    function clearBtn() {
      _value.value = "";
      emits("update:modelValue", "");
      emits("clear");
    }
    function changeSeePassword() {
      showPasswordText.value = !showPasswordText.value;
    }
    function focus() {
      _foucsActive.value = true;
      emits("focus");
    }
    function blur() {
      _foucsActive.value = false;
      pushFormItem();
      emits("blur");
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function inputHandler(e) {
      _value.value = e.detail.value;
      emits("input", e.detail.value);
      emits("update:modelValue", e.detail.value);
      return e.detail.value;
    }
    watch(_value, () => uni.$tm.u.debounce(() => pushFormItem(), 350));
    const tmFormFun = inject("tmFormFun", computed(() => ""));
    const validate = (rules) => {
      rules = rules.map((el) => {
        if (typeof el.validator === "function" && el.required === true) {
          return el;
        } else if (typeof el.validator === "boolean" && el.required === true) {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val2) => {
              return String(val2).length == 0 || typeof val2 === null ? false : true;
            }
          });
        } else {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val2) => {
              return true;
            }
          });
        }
      });
      let rules_filter = rules.filter((el) => {
        return typeof el.validator === "function" && el.required === true;
      });
      let rules_fun = rules_filter.map((el) => {
        return new Promise(async (res, rej) => {
          if (typeof el.validator === "function") {
            let vr = await el.validator(_value.value);
            if (vr) {
              res({
                message: String(el.message),
                validator: true
              });
            } else {
              rej({
                message: el.message,
                validator: false
              });
            }
          } else {
            res({
              message: el.message,
              validator: true
            });
          }
        });
      });
      return Promise.all(rules_fun);
    };
    async function pushFormItem(isCheckVail = true) {
      if (parentFormItem) {
        if (isCheckVail) {
          validate(toRaw(rulesObj.value)).then((ev) => {
            parentFormItem.pushCom({
              value: _value.value,
              isRequiredError: false,
              componentsName: "tm-input",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: _value.value,
              isRequiredError: true,
              componentsName: "tm-input",
              message: er.message
            });
          });
        }
      }
    }
    watch(tmFormFun, () => {
      if (tmFormFun.value == "validate") {
        pushFormItem();
      }
      if (tmFormFun.value == "reset") {
        _value.value = "";
        _requiredError.value = false;
        emits("update:modelValue", _value.value);
        pushFormItem(false);
      }
      if (tmFormFun.value == "clearValidate") {
        _requiredError.value = false;
        pushFormItem(false);
      }
    });
    pushFormItem(false);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        transprent: true,
        margin: props.margin,
        padding: props.padding
      }, {
        default: withCtx(() => [
          createVNode(tmSheet, {
            transprent: props.transprent,
            round: props.round,
            "no-level": "",
            margin: [0, 0],
            padding: unref(_inputPadding),
            border: props.border,
            text: props.text,
            color: unref(_color),
            outlined: props.outlined,
            shadow: props.shadow,
            linear: props.linear,
            linearDeep: props.linearDeep
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                class: normalizeClass(["flex flex-row", [unref(propsDetail).type == "textarea" ? "flex-row-top-center" : "flex-row-center-center"]]),
                style: normalizeStyle([{ height: `${unref(_height)}rpx` }])
              }, [
                unref(propsDetail).search || unref(propsDetail).searchLabel ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "px-9"
                })) : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "left"),
                unref(propsDetail).prefix ? (openBlock(), createElementBlock("view", {
                  key: 1,
                  class: "pr-16"
                }, [
                  createVNode(tmIcon, {
                    "font-size": unref(propsDetail).fontSize,
                    name: unref(propsDetail).prefix
                  }, null, 8, ["font-size", "name"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).prefixLabel ? (openBlock(), createElementBlock("view", {
                  key: 2,
                  class: "pr-24"
                }, [
                  createVNode(tmText, {
                    "font-size": unref(propsDetail).fontSize,
                    label: unref(propsDetail).prefixLabel
                  }, null, 8, ["font-size", "label"])
                ])) : createCommentVNode("v-if", true),
                !isAndroid.value ? (openBlock(), createElementBlock("view", {
                  key: 3,
                  onClick: _cache[2] || (_cache[2] = ($event) => emits("click", $event)),
                  class: "flex-1 relative flex-row flex",
                  style: normalizeStyle([{ width: "0px" }])
                }, [
                  createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                  unref(propsDetail).type != "textarea" ? (openBlock(), createElementBlock("u-input", {
                    key: 0,
                    class: "flex-1",
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[0] || (_cache[0] = ($event) => emits("keyboardheightchange")),
                    password: showPasswordText.value,
                    maxlength: unref(propsDetail).maxlength,
                    disabled: unref(propsDetail).disabled,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmType: unref(propsDetail).confirmType,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    type: unref(propsDetail).type,
                    placeholder: unref(propsDetail).placeholder,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "password", "maxlength", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "type", "placeholder", "placeholderStyle"])) : createCommentVNode("v-if", true),
                  unref(propsDetail).type == "textarea" ? (openBlock(), createElementBlock("u-textarea", {
                    key: 1,
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[1] || (_cache[1] = ($event) => emits("keyboardheightchange")),
                    maxlength: unref(propsDetail).maxlength,
                    disabled: unref(propsDetail).disabled,
                    placeholder: unref(propsDetail).placeholder,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmType: unref(propsDetail).confirmType,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    cursor: unref(propsDetail).cursor,
                    showConfirmBar: unref(propsDetail).showConfirmBar,
                    selectionStart: unref(propsDetail).selectionStart,
                    selectionEnd: unref(propsDetail).selectionEnd,
                    disableDefaultPadding: unref(propsDetail).disableDefaultPadding,
                    fixed: unref(propsDetail).fixed,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    type: unref(propsDetail).type,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        width: "auto",
                        "word-break": "break-word",
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    class: "wrap flex-1 py-12",
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "maxlength", "disabled", "placeholder", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "adjustPosition", "type", "placeholderStyle"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                isAndroid.value ? (openBlock(), createElementBlock("view", {
                  key: 4,
                  class: "flex-1 relative flex-row flex",
                  style: normalizeStyle([{ width: "0px" }])
                }, [
                  createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                  unref(propsDetail).type != "textarea" ? (openBlock(), createElementBlock("u-input", {
                    key: 0,
                    class: "flex-1",
                    onClick: _cache[3] || (_cache[3] = ($event) => emits("click", $event)),
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[4] || (_cache[4] = ($event) => emits("keyboardheightchange")),
                    password: showPasswordText.value,
                    disabled: unref(propsDetail).disabled,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmType: unref(propsDetail).confirmType,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    maxlength: unref(propsDetail).maxlength,
                    type: unref(propsDetail).type,
                    placeholder: unref(propsDetail).placeholder,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "password", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "type", "placeholder", "placeholderStyle"])) : createCommentVNode("v-if", true),
                  unref(propsDetail).type == "textarea" ? (openBlock(), createElementBlock("u-textarea", {
                    key: 1,
                    onClick: _cache[5] || (_cache[5] = ($event) => emits("click", $event)),
                    userInteractionEnabled: false,
                    value: _value.value,
                    focus: unref(propsDetail).focus,
                    onFocus: focus,
                    onBlur: blur,
                    onConfirm: confirm,
                    onInput: inputHandler,
                    onKeyboardheightchange: _cache[6] || (_cache[6] = ($event) => emits("keyboardheightchange")),
                    disabled: unref(propsDetail).disabled,
                    placeholder: unref(propsDetail).placeholder,
                    cursorSpacing: unref(propsDetail).cursorSpacing,
                    confirmType: unref(propsDetail).confirmType,
                    confirmHold: unref(propsDetail).confirmHold,
                    autoBlur: unref(propsDetail).autoBlur,
                    holdKeyboard: unref(propsDetail).holdKeyboard,
                    adjustPosition: unref(propsDetail).adjustPosition,
                    maxlength: unref(propsDetail).maxlength,
                    autoHeight: unref(propsDetail).autoHeight,
                    cursor: unref(propsDetail).cursor,
                    showConfirmBar: unref(propsDetail).showConfirmBar,
                    selectionStart: unref(propsDetail).selectionStart,
                    selectionEnd: unref(propsDetail).selectionEnd,
                    disableDefaultPadding: unref(propsDetail).disableDefaultPadding,
                    fixed: unref(propsDetail).fixed,
                    type: unref(propsDetail).type,
                    style: normalizeStyle([
                      {
                        height: `${unref(_height)}rpx`,
                        width: "auto",
                        "word-break": "break-word",
                        color: unref(propsDetail).fontColor ? unref(propsDetail).fontColor : unref(tmcomputed).textColor,
                        "text-align": props.align,
                        "fontSize": `${unref(propsDetail).fontSize_px}px`
                      }
                    ]),
                    class: "wrap flex-1 py-10",
                    placeholderStyle: `fontSize:${unref(propsDetail).fontSize_px}px`
                  }, null, 44, ["value", "focus", "disabled", "placeholder", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "autoHeight", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "type", "placeholderStyle"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).showClear && unref(_valueLenChar) > 0 ? (openBlock(), createElementBlock("view", {
                  key: 5,
                  class: "pl-16"
                }, [
                  createVNode(tmIcon, {
                    onClick: clearBtn,
                    "font-size": unref(propsDetail).fontSize * 0.9,
                    name: "tmicon-times-circle-fill"
                  }, null, 8, ["font-size"])
                ])) : createCommentVNode("v-if", true),
                _requiredError.value ? (openBlock(), createElementBlock("view", {
                  key: 6,
                  class: "pl-16"
                }, [
                  createVNode(tmIcon, {
                    "font-size": unref(propsDetail).fontSize,
                    name: "tmicon-exclamation-circle"
                  }, null, 8, ["font-size"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).suffix ? (openBlock(), createElementBlock("view", {
                  key: 7,
                  class: "pl-16"
                }, [
                  createVNode(tmIcon, {
                    "font-size": unref(propsDetail).fontSize * 0.85,
                    name: unref(propsDetail).suffix
                  }, null, 8, ["font-size", "name"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).suffixLabel ? (openBlock(), createElementBlock("view", {
                  key: 8,
                  class: "pl-16"
                }, [
                  createVNode(tmText, {
                    "font-size": unref(propsDetail).fontSize,
                    label: unref(propsDetail).suffixLabel
                  }, null, 8, ["font-size", "label"])
                ])) : createCommentVNode("v-if", true),
                unref(showPasswordIcon) ? (openBlock(), createElementBlock("view", {
                  key: 9,
                  class: "pl-16"
                }, [
                  createCommentVNode(" tmicon-eyeslash-fill "),
                  createVNode(tmIcon, {
                    onClick: changeSeePassword,
                    "font-size": unref(propsDetail).fontSize,
                    name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
                  }, null, 8, ["font-size", "name"])
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).showCharNumber && unref(_valueLenChar) > 0 && unref(propsDetail).type != "textarea" ? (openBlock(), createElementBlock("view", {
                  key: 10,
                  class: "pl-16 flex-row flex"
                }, [
                  createVNode(tmText, { label: unref(_valueLenChar) }, null, 8, ["label"]),
                  unref(propsDetail).maxlength > 0 ? (openBlock(), createBlock(tmText, {
                    key: 0,
                    label: "/" + unref(propsDetail).maxlength
                  }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                unref(propsDetail).showCharNumber && unref(_valueLenChar) > 0 && unref(propsDetail).type == "textarea" ? (openBlock(), createElementBlock("view", {
                  key: 11,
                  class: "pl-16 flex-row flex absolute r-0 b-12"
                }, [
                  createVNode(tmText, { label: unref(_valueLenChar) }, null, 8, ["label"]),
                  unref(propsDetail).maxlength > 0 ? (openBlock(), createBlock(tmText, {
                    key: 0,
                    label: "/" + unref(propsDetail).maxlength
                  }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "right", {}, () => [
                  unref(propsDetail).search || unref(propsDetail).searchLabel ? (openBlock(), createElementBlock("view", {
                    key: 0,
                    class: "pl-16"
                  }, [
                    createVNode(tmButton, {
                      followTheme: props.followTheme,
                      onClick: searchClick,
                      color: props.focusColor,
                      "font-size": 24,
                      height: unref(_height) - 11,
                      padding: [16, 0],
                      block: "",
                      margin: [0, 0],
                      icon: unref(propsDetail).search,
                      label: unref(propsDetail).searchLabel
                    }, null, 8, ["followTheme", "color", "height", "icon", "label"])
                  ])) : createCommentVNode("v-if", true)
                ])
              ], 6)
            ]),
            _: 3
          }, 8, ["transprent", "round", "padding", "border", "text", "color", "outlined", "shadow", "linear", "linearDeep"]),
          createCommentVNode(' <view v-if="propsDetail.showBottomBotder" :class="[`mt-${props.margin[1]*2}`]">\r\n            <tm-divider :margin="[0,0]"></tm-divider>\r\n        </view> '),
          createCommentVNode(" _requiredError "),
          createCommentVNode(' <view v-if="false" class="pt-12">\r\n            <tmText :font-size="24" color="red" :label="_errorLabel"></tmText>\r\n        </view> ')
        ]),
        _: 3
      }, 8, ["margin", "padding"]);
    };
  }
});
var tmInput = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-input/tm-input.vue"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "tm-divider",
  props: __spreadProps(__spreadValues({}, custom_props), {
    color: {
      type: String,
      default: "grey-3"
    },
    fontColor: {
      type: String,
      default: "grey-1"
    },
    vertical: {
      type: [Boolean],
      default: false
    },
    height: {
      type: [Number, String],
      default: 26
    },
    label: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: "center"
    },
    margin: {
      type: Array,
      default: () => [16, 24]
    },
    border: {
      type: [Number],
      default: 1
    },
    realColor: {
      type: [Boolean],
      default: false
    }
  }),
  setup(__props) {
    const props = __props;
    const store = useTmpiniaStore();
    const borderDir = computed(() => props.vertical ? "left" : "bottom");
    getCurrentInstance();
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), tmcfg.value));
    const tmcomputed = computed(() => computedTheme(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), isDark.value, tmcfg.value));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", null, [
        !props.label || props.vertical ? (openBlock(), createElementBlock("view", {
          key: 0,
          style: normalizeStyle([unref(tmcomputed).borderCss, props.vertical ? { width: "0px", height: props.height + "rpx" } : ""]),
          class: normalizeClass([props.vertical ? `mx-${props.margin[0]}` : `my-${props.margin[1]}`])
        }, null, 6)) : createCommentVNode("v-if", true),
        __props.label && !props.vertical ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: "flex flex-row flex-center"
        }, [
          createElementVNode("view", {
            style: normalizeStyle([unref(tmcomputed) ? { backgroundColor: props.realColor ? unref(tmcomputed).color : unref(tmcomputed).border, height: props.border + "rpx" } : ""]),
            class: normalizeClass([`my-${props.margin[1]}`, __props.align == "left" ? "flex-2" : "", __props.align == "right" ? "flex-10" : "", __props.align == "center" ? "flex-1" : ""])
          }, null, 6),
          createElementVNode("view", {
            class: normalizeClass([unref(isDark) ? "opacity-4" : ""])
          }, [
            createVNode(tmText, {
              fontSize: 26,
              dark: unref(isDark),
              followTheme: props.followTheme,
              color: props.fontColor,
              label: props.label,
              _class: ["mx-32"]
            }, null, 8, ["dark", "followTheme", "color", "label"])
          ], 2),
          createElementVNode("view", {
            style: normalizeStyle([unref(tmcomputed) ? { backgroundColor: props.realColor ? unref(tmcomputed).color : unref(tmcomputed).border, height: props.border + "rpx" } : ""]),
            class: normalizeClass([`my-${props.margin[1]}`, __props.align == "left" ? "flex-10" : "", __props.align == "right" ? "flex-2" : "", __props.align == "center" ? "flex-1" : ""])
          }, null, 6)
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmDivider = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-divider/tm-divider.vue"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "tm-badge",
  props: __spreadProps(__spreadValues({}, custom_props), {
    round: {
      type: [Number, String],
      default: 6
    },
    border: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 22
    },
    status: {
      type: [Boolean, String],
      default: false
    },
    dot: {
      type: [Boolean, String],
      default: false
    },
    icon: {
      type: [Boolean, String],
      default: false
    },
    count: {
      type: [Number, String],
      default: 0
    },
    maxCount: {
      type: [Number, String],
      default: 999
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const istext = computed(() => {
      return isNaN(parseInt(String(props.count)));
    });
    const show = computed(() => {
      if (!props.dot && !props.icon && !props.count)
        return false;
      return true;
    });
    const size = computed(() => {
      if (props.status || props.dot) {
        return {
          w: 12,
          h: 12,
          pr: 6,
          t: 3
        };
      }
      if (props.icon) {
        let p = props.fontSize * 1.6;
        return {
          w: p,
          h: p,
          pr: 12,
          t: 10
        };
      }
      if (isNaN(parseInt(String(props.count)))) {
        return {
          w: 0,
          h: 0,
          pr: 10,
          t: 10
        };
      }
      if (props.count < 10) {
        return {
          w: 30,
          h: 30,
          pr: 12,
          t: 10
        };
      }
      if (props.count >= 10) {
        return {
          w: 0,
          h: 0,
          pr: 10,
          t: 10
        };
      }
    });
    const _icon = computed(() => props.icon);
    const _dot = computed(() => props.dot);
    const _count = computed(() => props.count);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex", [props.status ? "flex-row flex-row-center-center mx-8" : ""]])
      }, [
        !props.status ? (openBlock(), createElementBlock("view", { key: 0 }, [
          renderSlot(_ctx.$slots, "default")
        ])) : createCommentVNode("v-if", true),
        unref(show) ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: normalizeClass([
            (unref(_dot) || unref(_count) || unref(_icon)) && !props.status ? "absolute flex-top-start-end r-0" : ""
          ]),
          style: { zIndex: 10 }
        }, [
          createVNode(tmSheet, {
            onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
            color: props.color,
            _class: [unref(customClass), "flex-center flex-col"],
            _style: [unref(customCSSStyle), { flexShrink: 1 }],
            followTheme: props.followTheme,
            dark: props.dark,
            round: props.round,
            shadow: props.shadow,
            outlined: props.outlined,
            border: props.border,
            borderStyle: props.borderStyle,
            borderDirection: props.borderDirection,
            text: props.text,
            transprent: props.transprent,
            linear: props.linear,
            linearDeep: props.linearDeep,
            width: unref(size).w,
            height: unref(size).h,
            margin: props.margin,
            padding: props.padding
          }, {
            default: withCtx(() => [
              unref(_count) > 0 && !unref(istext) ? (openBlock(), createBlock(tmText, {
                key: 0,
                color: "white",
                "font-size": props.fontSize,
                _class: unref(size).h == 0 ? "py-3 px-8" : "",
                label: unref(_count) > props.maxCount ? props.maxCount + "+" : unref(_count)
              }, null, 8, ["font-size", "_class", "label"])) : createCommentVNode("v-if", true),
              unref(_count) && unref(istext) ? (openBlock(), createBlock(tmText, {
                key: 1,
                color: "white",
                "font-size": props.fontSize,
                _class: unref(size).h == 0 ? "py-3 px-8" : "",
                label: unref(_count)
              }, null, 8, ["font-size", "_class", "label"])) : createCommentVNode("v-if", true),
              unref(_icon) ? (openBlock(), createBlock(tmIcon, {
                key: 2,
                color: "white",
                "font-size": props.fontSize,
                name: unref(_icon)
              }, null, 8, ["font-size", "name"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding"])
        ], 2)) : createCommentVNode("v-if", true),
        props.status ? (openBlock(), createBlock(tmText, {
          key: 2,
          "font-size": props.fontSize,
          _class: "ml-10",
          label: props.label
        }, null, 8, ["font-size", "label"])) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var tmBadge = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-badge/tm-badge.vue"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "tm-grid-item",
  props: __spreadProps(__spreadValues({}, custom_props), {
    height: {
      type: Number,
      default: 100
    },
    transprent: {
      type: Boolean,
      default: true
    },
    dot: {
      type: [Boolean, String],
      default: false
    },
    icon: {
      type: [Boolean, String],
      default: false
    },
    count: {
      type: [Number, String],
      default: 0
    },
    maxCount: {
      type: [Number, String],
      default: 999
    },
    bgColor: {
      type: String,
      default: "white"
    },
    color: {
      type: String,
      default: "red"
    },
    url: {
      type: String,
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a2;
    const props = __props;
    const store = useTmpiniaStore();
    const { proxy } = getCurrentInstance();
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => {
      return computedTheme(__spreadProps(__spreadValues({}, props), { color: props.bgColor }), isDark.value, tmcfg.value);
    });
    const _colWidth = inject("tmGridItemWidth", 0);
    const _tmGridshowBorder = inject("tmGridshowBorder", computed(() => false));
    const tmGridshowCachList = inject("tmGridshowCachList", computed(() => []));
    const uid = ref({
      id: uni.$tm.u.getUid(1),
      type: ""
    });
    let parentFormItem = proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.keyName) == "tmGrid" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_a2 = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _a2 : void 0;
      }
    }
    onMounted(() => {
      if (parentFormItem == null ? void 0 : parentFormItem.pushKey) {
        parentFormItem.pushKey(uid.value);
      }
    }), onBeforeUnmount(() => {
      parentFormItem.delKey(uid.value);
    });
    let wkStyle = ref(`width:${_colWidth}'rpx'`);
    watch([tmGridshowCachList, _tmGridshowBorder], () => {
      nextTick(() => setStyleFun());
    }, { deep: true });
    function setStyleFun() {
      let ar = tmGridshowCachList.value.filter((el) => el.id == uid.value.id);
      if (ar.length == 1) {
        uid.value = ar[0];
      }
      if (!_tmGridshowBorder.value) {
        wkStyle.value = `border:0rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
        return;
      }
      if (uid.value.type == 1) {
        wkStyle.value = `border:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
      }
      if (uid.value.type == 2) {
        wkStyle.value = `border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid rgba(0,0,0,0);border-top:1rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
      }
      if (uid.value.type == 3) {
        wkStyle.value = `border-top:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
      }
      if (uid.value.type == 4) {
        wkStyle.value = `border-left:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-top:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
      }
    }
    function onClick(e) {
      emits("click", e);
      if (props.url !== "") {
        try {
          uni.navigateTo({
            url: props.url
          });
        } catch (e2) {
        }
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        style: normalizeStyle(unref(wkStyle))
      }, [
        createVNode(tmSheet, {
          color: props.bgColor,
          text: props.text,
          border: 0,
          "hover-class": "opacity-6",
          transprent: props.transprent,
          height: props.height,
          width: unref(_colWidth) - 0.5,
          margin: [0, 0],
          padding: [0, 0],
          _class: "flex-col flex",
          onClick
        }, {
          default: withCtx(() => [
            createElementVNode("view", { class: "flex-1 flex flex-col-center-center" }, [
              createVNode(tmBadge, {
                userInteractionEnabled: true,
                fontSize: 20,
                dot: props.dot,
                count: props.count,
                "max-count": props.maxCount,
                icon: props.icon,
                color: props.color
              }, {
                default: withCtx(() => [
                  createElementVNode("view", { class: "flex-col flex-col-center-center flex px-10" }, [
                    renderSlot(_ctx.$slots, "default")
                  ])
                ]),
                _: 3
              }, 8, ["dot", "count", "max-count", "icon", "color"])
            ])
          ]),
          _: 3
        }, 8, ["color", "text", "transprent", "height", "width"])
      ], 4);
    };
  }
});
var tmGridItem = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-grid-item/tm-grid-item.vue"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "tm-grid",
  props: __spreadProps(__spreadValues({}, custom_props), {
    round: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 750
    },
    col: {
      type: Number,
      default: 5
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: Boolean,
      default: false
    }
  }),
  setup(__props, { expose }) {
    const props = __props;
    let _cachList = ref([]);
    const _colWidth = computed(() => props.width / props.col);
    provide("tmGridItemWidth", _colWidth.value + (props.showBorder ? 1 : 0));
    provide("tmGridshowBorder", computed(() => props.showBorder));
    provide("tmGridshowCachList", computed(() => _cachList.value));
    function pushKey(e) {
      let index2 = _cachList.value.findIndex((el) => el.id == e.id);
      if (index2 == -1) {
        _cachList.value.push(e);
      } else {
        _cachList.value.splice(index2, 1, e);
      }
      setIndexType();
    }
    function delKey(e) {
      _cachList.value.findIndex((el) => el.id == e.id);
      setIndexType();
    }
    function setIndexType() {
      let totallen = _cachList.value.length;
      _cachList.value = _cachList.value.map((el, index2) => {
        let aIndex = index2 + 1;
        if (aIndex <= props.col) {
          el.type = 4;
          if (aIndex == totallen && totallen == 1 || aIndex == 1) {
            el.type = 1;
          }
        } else {
          if (aIndex % props.col == 1) {
            el.type = 3;
          } else {
            el.type = 2;
          }
        }
        return el;
      });
    }
    expose({
      pushKey,
      delKey,
      keyName: "tmGrid"
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmSheet, {
        round: props.round,
        transprent: props.transprent,
        color: props.color,
        margin: [0, 0],
        padding: [0, 0],
        _class: "flex flex-row flex-row-top-start",
        contStyle: "flex-wrap:wrap;"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["round", "transprent", "color"]);
    };
  }
});
var tmGrid = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-grid/tm-grid.vue"]]);
var _style_0$2 = { "statusHeightTop": { "": { "zIndex": 400 } } };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "tm-navbar",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: [String],
      default: "white"
    },
    text: {
      type: [Boolean],
      default: false
    },
    border: {
      type: [Number],
      default: 0
    },
    shadow: {
      type: [Number],
      default: 1
    },
    borderDirection: {
      type: String,
      default: "bottom"
    },
    round: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    height: {
      type: [Number],
      default: 44
    },
    leftWidth: {
      type: [Number],
      default: 220
    },
    rightWidth: {
      type: [Number],
      default: 220
    },
    fontSize: {
      type: [Number],
      default: 30
    },
    iconFontSize: {
      type: [Number],
      default: 37
    },
    title: {
      type: [String],
      default: "\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898"
    },
    fontColor: {
      type: [String],
      default: ""
    },
    homeColor: {
      type: [String],
      default: ""
    },
    hideHome: {
      type: Boolean,
      default: false
    },
    homePath: {
      type: [String],
      default: "/pages/index/index"
    },
    blur: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["click", "close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    useTmpiniaStore();
    getCurrentInstance();
    const _height = computed(() => props.height);
    const _width = uni.getSystemInfoSync().screenWidth;
    const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    const _barHeight = computed(() => statusBarHeight + _height.value);
    const _leftWidth = computed(() => props.leftWidth);
    const _rightWidth = computed(() => props.rightWidth);
    const contentwidth = computed(() => {
      return _width - uni.upx2px(_leftWidth.value) - uni.upx2px(_rightWidth.value);
    });
    const _title = computed(() => props.title);
    const _fontColor = computed(() => props.fontColor);
    const _homeColor = computed(() => props.homeColor);
    const _blur = computed(() => props.blur);
    const _pages = ref(0);
    onMounted(() => {
      _pages.value = getCurrentPages().length;
    });
    const backhome = () => {
      uni.reLaunch({
        url: props.homePath
      });
    };
    const goback = () => {
      uni.navigateBack({});
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", null, [
        createElementVNode("view", {
          class: "statusHeight",
          style: normalizeStyle({ height: unref(_barHeight) + "px" })
        }, null, 4),
        createElementVNode("view", {
          class: "fixed l-0 t-0 statusHeightTop flex",
          style: normalizeStyle({ width: unref(_width) + "px", height: unref(_barHeight) + "px" })
        }, [
          createVNode(tmSheet, {
            onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
            blur: unref(_blur),
            color: props.color,
            _class: _ctx._class,
            _style: _ctx._style,
            followTheme: props.followTheme,
            dark: props.dark,
            round: props.round,
            shadow: props.shadow,
            outlined: props.outlined,
            border: props.border,
            borderStyle: props.borderStyle,
            borderDirection: props.borderDirection,
            text: props.text,
            transprent: props.transprent,
            linear: props.linear,
            linearDeep: props.linearDeep,
            margin: props.margin,
            padding: props.padding,
            height: unref(_barHeight),
            width: unref(_width),
            unit: "px"
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                class: "statusHeight",
                style: normalizeStyle({ height: unref(statusBarHeight) + "px" })
              }, null, 4),
              createElementVNode("view", { class: "flex flex-row flex-1 flex-row flex-row-center-betweent" }, [
                createElementVNode("view", {
                  class: "flex-row flex flex-row-center-start pl-24",
                  style: normalizeStyle({ width: unref(_leftWidth) + "rpx" })
                }, [
                  _pages.value > 1 ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    unit: props.unit,
                    "font-size": props.iconFontSize,
                    _class: "pointer",
                    onClick: goback,
                    name: "tmicon-angle-left"
                  }, null, 8, ["unit", "font-size"])) : createCommentVNode("v-if", true),
                  _pages.value == 1 && !__props.hideHome ? (openBlock(), createBlock(tmIcon, {
                    key: 1,
                    unit: props.unit,
                    _class: "pointer",
                    onClick: backhome,
                    color: unref(_homeColor),
                    "font-size": props.iconFontSize,
                    name: "tmicon-md-home"
                  }, null, 8, ["unit", "color", "font-size"])) : createCommentVNode("v-if", true),
                  renderSlot(_ctx.$slots, "left")
                ], 4),
                createElementVNode("view", {
                  class: "flex flex-row-center-center",
                  style: normalizeStyle({ width: unref(contentwidth) + "px" })
                }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createVNode(tmText, {
                      unit: props.unit,
                      _class: "text-weight-b text-overflow-1",
                      color: unref(_fontColor),
                      "font-size": props.fontSize,
                      label: unref(_title)
                    }, null, 8, ["unit", "color", "font-size", "label"])
                  ])
                ], 4),
                createElementVNode("view", {
                  class: "flex-row flex flex-row-center-end pr-24",
                  style: normalizeStyle({ width: unref(_rightWidth) + "rpx" })
                }, [
                  renderSlot(_ctx.$slots, "right")
                ], 4)
              ])
            ]),
            _: 3
          }, 8, ["blur", "color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "margin", "padding", "height", "width"])
        ], 4)
      ]);
    };
  }
});
var tmNavbar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["styles", [_style_0$2]], ["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-navbar/tm-navbar.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "tm-image",
  props: __spreadProps(__spreadValues({}, custom_props), {
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: true
    },
    border: {
      type: Number,
      default: 0
    },
    width: {
      type: [Number],
      default: 200,
      required: true
    },
    height: {
      type: [Number],
      default: 200,
      required: true
    },
    src: {
      type: String,
      default: "",
      required: true
    },
    errorIcon: {
      type: String,
      default: ""
    },
    errorLabel: {
      type: String,
      default: "\u52A0\u8F7D\u9519\u8BEF"
    },
    loadIcon: {
      type: String,
      default: ""
    },
    preview: {
      type: [Boolean],
      default: false
    },
    extra: {
      type: [Boolean],
      default: false
    },
    extraPosition: {
      type: String,
      default: "in"
    },
    delete: {
      type: [Boolean],
      default: false
    },
    allowDelete: {
      type: [Boolean],
      default: true
    },
    model: {
      type: String,
      default: "scaleToFill"
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["load", "error", "click", "delete", "close"],
  setup(__props, { emit: emits }) {
    var _a2;
    const props = __props;
    const {
      proxy
    } = getCurrentInstance();
    if (!props.height && !props.width) {
      formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:152", "\u9519\u8BEF\uFF1A\u56FE\u7247\u5BBD\u5EA6\u548C\u9AD8\u5EA6\u5FC5\u987B\u8BBE\u7F6E\u4E00\u4E2A");
    }
    const img_width = computed(() => {
      return props.width;
    });
    const img_height = computed(() => {
      return props.height - props.padding[1];
    });
    const img_src = computed(() => props.src);
    const loading = ref(true);
    const error = ref(false);
    const isRmove = ref(false);
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmImageGroup) == "tmImageGroup" || !parent) {
        break;
      } else {
        parent = (_a2 = parent == null ? void 0 : parent.$parent) != null ? _a2 : void 0;
      }
    }
    const ImagGrupList = inject("ImagGrupList", computed(() => []));
    if (parent == null ? void 0 : parent.pushKey) {
      parent.pushKey({
        width: img_width.value,
        height: img_width.value,
        src: props.src
      });
    }
    watch(img_src, () => {
      loading.value = true;
      error.value = false;
      if (parent == null ? void 0 : parent.pushKey) {
        parent.pushKey({
          width: img_width.value,
          height: img_width.value,
          src: props.src
        });
      }
    });
    function imageLoad(event) {
      loading.value = false;
      emits("load", event);
    }
    function imageError(event) {
      formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:203", "\u56FE\u7247\u52A0\u8F7D\u9519:" + props.src);
      error.value = true;
      loading.value = false;
      emits("error", event);
    }
    function imageClick(event) {
      emits("click", event);
      if (props.preview) {
        let list = ImagGrupList.value.length > 0 ? ImagGrupList.value : [props.src];
        uni.previewImage({
          urls: list,
          current: props.src
        });
      }
    }
    async function del() {
      var _a3;
      isRmove.value = false;
      if (!props.allowDelete) {
        emits("delete", props.src);
        return;
      }
      if ((_a3 = proxy.$refs) == null ? void 0 : _a3.aniplay) {
        proxy.$refs.aniplay.play();
      } else {
        isRmove.value = true;
        emits("close", props.src);
      }
    }
    function aniEnd() {
      isRmove.value = true;
      emits("close", props.src);
    }
    return (_ctx, _cache) => {
      return !isRmove.value ? (openBlock(), createBlock(tmTranslate, {
        key: 0,
        width: unref(img_width) + props.padding[0] * 2 + props.unit,
        onEnd: aniEnd,
        ref: "aniplay",
        autoPlay: false,
        name: "zoom",
        reverse: ""
      }, {
        default: withCtx(() => [
          createVNode(tmSheet, {
            color: props.color,
            transprent: props.transprent,
            margin: props.margin,
            round: props.round,
            border: props.border,
            padding: [props.padding[0], 0],
            class: normalizeClass(["round-" + props.round]),
            width: unref(img_width) - props.padding[0] * 2,
            unit: props.unit
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                class: normalizeClass([`pb-${props.padding[1]}`])
              }, [
                loading.value ? (openBlock(), createElementBlock("u-image", {
                  key: 0,
                  src: unref(img_src),
                  style: { "width": "10px", "height": "10px", "opacity": "0", "transform": "translateX(120000px)" },
                  onLoad: imageLoad,
                  onError: imageError,
                  mode: "scaleToFill"
                }, null, 40, ["src"])) : createCommentVNode("v-if", true),
                !loading.value && !error.value ? (openBlock(), createElementBlock("u-image", {
                  key: 1,
                  onClick: imageClick,
                  class: normalizeClass(["round-" + props.round]),
                  src: unref(img_src),
                  style: normalizeStyle([{ width: unref(img_width) + props.unit, height: unref(img_height) + props.unit }]),
                  mode: props.model
                }, null, 14, ["src", "mode"])) : createCommentVNode("v-if", true),
                loading.value && !error.value ? (openBlock(), createElementBlock("view", {
                  key: 2,
                  style: normalizeStyle([{ width: unref(img_width) + props.unit, height: unref(img_height) + props.unit }]),
                  class: "flex flex-center opacity-3"
                }, [
                  createVNode(tmIcon, {
                    spin: "",
                    name: "tmicon-loading"
                  })
                ], 4)) : createCommentVNode("v-if", true),
                !loading.value && error.value ? (openBlock(), createElementBlock("view", {
                  key: 3,
                  style: normalizeStyle([{ width: unref(img_width) + props.unit, height: unref(img_height) + props.unit }]),
                  class: "flex flex-col flex-center opacity-5"
                }, [
                  createVNode(tmIcon, { name: "tmicon-exclamation-circle" }),
                  createVNode(tmText, {
                    _class: "pt-10",
                    "font-size": 26,
                    label: props.errorLabel
                  }, null, 8, ["label"])
                ], 4)) : createCommentVNode("v-if", true),
                createCommentVNode(" extra "),
                props.extra ? (openBlock(), createElementBlock("view", {
                  key: 4,
                  onClick: withModifiers(imageClick, ["stop"]),
                  class: normalizeClass([
                    props.extraPosition == "in" ? "absolute l-0 b-0 zIndex-5" : "",
                    "flex flex-col flex-col-bottom-start"
                  ]),
                  style: normalizeStyle([
                    props.extra && props.extraPosition == "in" ? { height: unref(img_height) + props.unit, width: unref(img_width) + props.unit } : "",
                    props.extra && props.extraPosition == "out" ? { width: unref(img_width) + props.unit } : ""
                  ])
                }, [
                  renderSlot(_ctx.$slots, "extra")
                ], 14, ["onClick"])) : createCommentVNode("v-if", true),
                createCommentVNode(" delete \u5C55\u793A\u5220\u9664\u6309\u94AE\u3002 "),
                props.delete ? (openBlock(), createElementBlock("view", {
                  key: 5,
                  class: "absolute r-10 t-10 flex flex-col flex-col-center-end zIndex-10",
                  style: normalizeStyle([props.delete ? { width: unref(img_width) + props.unit } : ""])
                }, [
                  createVNode(tmIcon, {
                    onClick: del,
                    color: "red",
                    name: "tmicon-times-circle-fill"
                  })
                ], 4)) : createCommentVNode("v-if", true)
              ], 2)
            ]),
            _: 3
          }, 8, ["color", "transprent", "margin", "round", "border", "padding", "class", "width", "unit"])
        ]),
        _: 3
      }, 8, ["width"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmImage = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-image/tm-image.vue"]]);
var _style_0$1 = {};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-cell",
  props: __spreadProps(__spreadValues({}, custom_props), {
    shadow: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [32, 0]
    },
    padding: {
      type: Array,
      default: () => [24, 24]
    },
    height: {
      type: [Number],
      default: 0
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    title: {
      type: String,
      default: ""
    },
    titleFontSize: {
      type: [Number, String],
      default: 28
    },
    label: {
      type: String,
      default: ""
    },
    labelColor: {
      type: String,
      default: "grey"
    },
    rightText: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: "tmicon-angle-right"
    },
    rightColor: {
      type: String,
      default: "grey"
    },
    showAvatar: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: ""
    },
    avatarSize: {
      type: Number,
      default: 60
    },
    avatarRound: {
      type: Number,
      default: 10
    },
    border: {
      type: [Number],
      default: 0
    },
    borderDirection: {
      type: [String],
      default: cssDirection.bottom
    },
    bottomBorder: {
      type: [Boolean],
      default: false
    },
    url: {
      type: String,
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    function cellClick(e) {
      emits("click", e);
      if (props.url !== "") {
        try {
          uni.navigateTo({
            url: props.url,
            fail(error) {
              formatAppLog("error", "at tmui/components/tm-cell/tm-cell.vue:199", "\u6253\u5F00\u8FDE\u63A5\u9519\u8BEF\uFF1A", error);
            }
          });
        } catch (e2) {
        }
      }
    }
    const _computedValue = computed(() => props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { class: "relative overflow" }, [
        createVNode(tmSheet, {
          onClick: cellClick,
          color: props.color,
          followTheme: props.followTheme,
          dark: props.dark,
          followDark: props.followDark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          transprent: props.transprent,
          linear: props.linear,
          linearDeep: props.linearDeep,
          width: props.width,
          height: props.height,
          margin: props.margin,
          padding: props.padding,
          _class: props._class,
          _style: props._style,
          "hover-class": "opacity-6"
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              userInteractionEnabled: true,
              class: normalizeClass(["flex flex-row flex-row-center-center", [unref(_computedValue).url ? "url" : ""]])
            }, [
              unref(_computedValue).showAvatar ? (openBlock(), createElementBlock("view", {
                key: 0,
                style: normalizeStyle({
                  width: `${unref(_computedValue).avatarSize}rpx`,
                  height: `${unref(_computedValue).avatarSize}rpx`
                }),
                class: "flex flex-row flex-row-center-center"
              }, [
                renderSlot(_ctx.$slots, "avatar", {}, () => [
                  createVNode(tmImage, {
                    round: unref(_computedValue).avatarRound,
                    width: unref(_computedValue).avatarSize,
                    height: unref(_computedValue).avatarSize,
                    src: unref(_computedValue).avatar
                  }, null, 8, ["round", "width", "height", "src"])
                ])
              ], 4)) : createCommentVNode("v-if", true),
              createElementVNode("view", {
                class: "flex-3",
                style: { "width": "0px" }
              }, [
                createElementVNode("view", {
                  class: normalizeClass(["flex flex-5 flex-col", [unref(_computedValue).showAvatar ? "pl-24" : ""]])
                }, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createVNode(tmText, {
                      fontSize: unref(_computedValue).titleFontSize,
                      label: unref(_computedValue).title
                    }, null, 8, ["fontSize", "label"])
                  ]),
                  renderSlot(_ctx.$slots, "label", {}, () => [
                    unref(_computedValue).label ? (openBlock(), createElementBlock("view", {
                      key: 0,
                      class: "mt-6"
                    }, [
                      createVNode(tmText, {
                        color: unref(_computedValue).labelColor,
                        fontSize: 22,
                        label: unref(_computedValue).label
                      }, null, 8, ["color", "label"])
                    ])) : createCommentVNode("v-if", true)
                  ])
                ], 2)
              ]),
              createElementVNode("view", {
                class: "flex-1 flex-row flex-row-center-end",
                style: { "width": "0px" }
              }, [
                createElementVNode("view", { class: "flex flex-1 flex-row flex-row-center-end pr-12" }, [
                  renderSlot(_ctx.$slots, "rightText", {}, () => [
                    unref(_computedValue).rightText ? (openBlock(), createBlock(tmText, {
                      key: 0,
                      color: unref(_computedValue).rightColor,
                      fontSize: 24,
                      label: unref(_computedValue).rightText
                    }, null, 8, ["color", "label"])) : createCommentVNode("v-if", true)
                  ])
                ]),
                renderSlot(_ctx.$slots, "right", {}, () => [
                  unref(_computedValue).rightIcon ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    _class: "opacity-3",
                    name: unref(_computedValue).rightIcon,
                    fontSize: 22
                  }, null, 8, ["name"])) : createCommentVNode("v-if", true)
                ])
              ])
            ], 2)
          ]),
          _: 3
        }, 8, ["color", "followTheme", "dark", "followDark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding", "_class", "_style"]),
        unref(_computedValue).bottomBorder ? (openBlock(), createBlock(tmDivider, {
          key: 0,
          margin: [0, 0],
          style: normalizeStyle({
            left: `${unref(_computedValue).avatar !== "" ? unref(_computedValue).avatarSize + unref(_computedValue).margin[0] : 0}rpx`
          })
        }, null, 8, ["style"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmCell = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["styles", [_style_0$1]], ["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-cell/tm-cell.vue"]]);
var _style_0 = { "flex-left-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-right-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-end" } }, "flex-top-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-end-custom": { "": { "display": "flex", "justifyContent": "flex-end", "alignItems": "flex-end" } }, "flex-center-custom": { "": { "display": "flex", "justifyContent": "center", "alignItems": "center", "flexDirection": "row" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-drawer",
  props: __spreadProps(__spreadValues({}, custom_props), {
    mask: {
      type: [Boolean, String],
      default: true
    },
    placement: {
      type: String,
      default: "bottom"
    },
    show: {
      type: [Boolean, String],
      default: false
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 600
    },
    round: {
      type: Number,
      default: 12
    },
    duration: {
      type: Number,
      default: 300
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    closeable: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    title: [String],
    okText: {
      type: [String],
      default: "\u5B8C\u6210"
    },
    okColor: {
      type: [String],
      default: "primary"
    },
    okLoading: {
      type: [Boolean, String],
      default: false
    },
    cancelText: {
      type: [String],
      default: "\u53D6\u6D88"
    },
    hideCancel: {
      type: [Boolean, String],
      default: false
    },
    hideHeader: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click", "open", "close", "update:show", "ok", "cancel"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const store = useTmpiniaStore();
    const { proxy } = getCurrentInstance();
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(props, isDark.value, tmcfg.value));
    const syswidth = ref(0);
    const sysheight = ref(0);
    const reverse = ref(true);
    const aniEnd = ref(false);
    const flag = ref(null);
    const timeid = ref(null);
    let { windowWidth, windowHeight, windowTop, safeArea, statusBarHeight, titleBarHeight } = uni.getSystemInfoSync();
    syswidth.value = windowWidth;
    sysheight.value = windowHeight;
    sysheight.value = safeArea.height;
    timeid.value = uni.$tm.u.getUid(4);
    if (props.show) {
      reverse.value = false;
    }
    watch(() => props.show, (val2) => {
      if (val2) {
        open();
      } else {
        close();
      }
    });
    onMounted(() => open());
    const ok_loading = computed(() => props.okLoading);
    const round_rp = computed(() => {
      if (aniname.value == "left")
        return "round-r-" + props.round;
      if (aniname.value == "right")
        return "round-l-" + props.round;
      if (aniname.value == "up")
        return "round-b-" + props.round;
      if (aniname.value == "down")
        return "round-t-" + props.round;
      if (aniname.value == "zoom")
        return "round-" + props.round;
    });
    const reverse_rp = computed(() => {
      if (aniname.value != "zoom")
        return reverse.value;
      return !reverse.value;
    });
    const aniname = computed(() => {
      if (props.placement == "center")
        return "zoom";
      if (props.placement == "top")
        return "up";
      if (props.placement == "bottom")
        return "down";
      return props.placement;
    });
    const anwidth = computed(() => {
      if (aniname.value == "zoom") {
        return props.width + "rpx";
      }
      if (props.placement == "left" || props.placement == "right") {
        return props.width + "rpx";
      }
      return syswidth.value + "px";
    });
    const anheight = computed(() => {
      let wucha = 0;
      if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
        return props.height + wucha + "rpx";
      }
      return sysheight.value + "px";
    });
    const contentHeight = computed(() => {
      let base_height = props.hideHeader ? 0 : 44;
      if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
        return uni.upx2px(props.height) - base_height + "px";
      }
      return sysheight.value - base_height + "px";
    });
    const align_rp = computed(() => {
      if (aniname.value == "down") {
        return "flex-col-bottom-center";
      }
      if (aniname.value == "up") {
        return "flex-top-custom";
      }
      if (aniname.value == "left") {
        return "flex-row-top-start";
      }
      if (aniname.value == "right") {
        return "flex-row-bottom-start";
      }
      if (aniname.value == "zoom") {
        return "flex-center";
      }
    });
    function ok() {
      if (props.disabled)
        return;
      emits("ok");
      close();
    }
    function cancel() {
      if (props.disabled)
        return;
      emits("cancel");
      close();
    }
    function open() {
      if (props.disabled)
        return;
      if (flag.value)
        return;
      aniEnd.value = false;
      reverse.value = reverse.value === false ? true : false;
      nextTick(function() {
        var _a2;
        if (!((_a2 = proxy == null ? void 0 : proxy.$refs) == null ? void 0 : _a2.drawerANI))
          return;
        flag.value = true;
        proxy.$refs.drawerANI.play();
        timeid.value = setTimeout(function() {
          emits("open");
          flag.value = false;
        }, props.duration);
      });
    }
    function animationClose() {
      aniEnd.value = true;
    }
    function close() {
      if (props.disabled)
        return;
      if (flag.value)
        return;
      uni.$tm.u.throttle(closeFun(), props.duration);
    }
    function clickClose(e) {
      if (props.disabled)
        return;
      emits("click", e);
      if (flag.value)
        return;
      if (!props.overlayClick)
        return;
      uni.$tm.u.throttle(cancel(), props.duration);
    }
    function closeFun() {
      if (props.disabled)
        return;
      if (flag.value)
        return;
      nextTick(function() {
        var _a2;
        reverse.value = false;
        if (!((_a2 = proxy == null ? void 0 : proxy.$refs) == null ? void 0 : _a2.drawerANI))
          return;
        flag.value = true;
        nextTick(function() {
          proxy.$refs.drawerANI.play();
          timeid.value = setTimeout(function() {
            if (aniEnd.value) {
              emits("close");
              emits("update:show", false);
              flag.value = false;
            }
          }, props.duration);
        });
      });
    }
    expose({ close, open });
    return (_ctx, _cache) => {
      return __props.show ? (openBlock(), createBlock(tmOverlay, {
        key: 0,
        transprent: !props.mask,
        onClick: clickClose,
        align: unref(align_rp),
        overlayClick: false,
        show: props.show,
        "onUpdate:show": _cache[1] || (_cache[1] = ($event) => props.show = $event)
      }, {
        default: withCtx(() => [
          createVNode(tmTranslate, {
            onEnd: animationClose,
            reverse: unref(reverse_rp),
            width: unref(anwidth),
            height: unref(anheight),
            ref: "drawerANI",
            "auto-play": false,
            name: unref(aniname),
            duration: props.duration
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $event.stopPropagation(), ["stop"])),
                style: normalizeStyle([
                  { width: unref(anwidth), height: unref(anheight) },
                  !props.transprent ? unref(tmcomputed).borderCss : "",
                  !props.transprent ? unref(tmcomputed).backgroundColorCss : "",
                  !props.transprent ? unref(tmcomputed).shadowColor : "",
                  unref(customCSSStyle)
                ]),
                class: normalizeClass([unref(round_rp), "flex flex-col overflow ", unref(customClass)])
              }, [
                !props.closeable && !props.hideHeader ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "flex flex-row flex-row-center-center flex-between px-24",
                  style: { "height": "44px" }
                }, [
                  createElementVNode("view", { class: "flex-4 flex-shrink" }, [
                    !props.hideCancel ? (openBlock(), createBlock(tmText, {
                      key: 0,
                      onClick: cancel,
                      label: props.cancelText
                    }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                  ]),
                  createElementVNode("view", { class: "flex-8 px-32 flex-center" }, [
                    createVNode(tmText, {
                      _class: "text-overflow-1 opacity-7",
                      label: props.title
                    }, null, 8, ["label"])
                  ]),
                  createElementVNode("view", { class: "flex-4 flex-shrink flex-row flex-row-center-end" }, [
                    !unref(ok_loading) ? (openBlock(), createBlock(tmText, {
                      key: 0,
                      color: __props.okColor,
                      onClick: ok,
                      dark: props.dark,
                      label: props.okText
                    }, null, 8, ["color", "dark", "label"])) : createCommentVNode("v-if", true),
                    unref(ok_loading) ? (openBlock(), createBlock(tmIcon, {
                      key: 1,
                      color: __props.okColor,
                      spin: unref(ok_loading),
                      dark: unref(isDark),
                      _class: unref(isDark) !== true ? "opacity-4" : "",
                      fontSize: 34,
                      name: unref(ok_loading) ? "tmicon-jiazai_dan" : "tmicon-times-circle-fill"
                    }, null, 8, ["color", "spin", "dark", "_class", "name"])) : createCommentVNode("v-if", true)
                  ])
                ])) : createCommentVNode("v-if", true),
                props.closeable && !props.hideHeader ? (openBlock(), createElementBlock("view", {
                  key: 1,
                  class: "flex flex-row flex-row-center-center flex-between px-24",
                  style: { "height": "44px" }
                }, [
                  createElementVNode("view", { class: "flex-9 pr-32" }, [
                    createVNode(tmText, {
                      _class: "text-overflow-1 opacity-7",
                      dark: props.dark,
                      label: props.title
                    }, null, 8, ["dark", "label"])
                  ]),
                  createElementVNode("view", { class: "flex-3 flex-shrink flex-row flex-row-center-end" }, [
                    createVNode(tmIcon, {
                      onClick: cancel,
                      dark: props.dark,
                      _class: unref(isDark) !== true ? "opacity-3" : "",
                      fontSize: 36,
                      name: "tmicon-times-circle-fill"
                    }, null, 8, ["dark", "_class"])
                  ])
                ])) : createCommentVNode("v-if", true),
                createElementVNode("scroll-view", {
                  scrollY: "",
                  style: normalizeStyle([{ height: unref(contentHeight) }]),
                  class: "overflow"
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 4)
              ], 6)
            ]),
            _: 3
          }, 8, ["reverse", "width", "height", "name", "duration"])
        ]),
        _: 3
      }, 8, ["transprent", "align", "show"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmDrawer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "D:/mp/anydoor-v2/src/tmui/components/tm-drawer/tm-drawer.vue"]]);
var logoimg = "/static/logo.png";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const store = useTmpiniaStore();
    const {
      proxy
    } = getCurrentInstance();
    const str = ref("");
    const showCustomColor = ref("#60ab41");
    const showCustomName = ref("darkGreen");
    const showCustom = ref(false);
    function onChangeDark() {
      proxy.$refs.app.setDark();
    }
    function search() {
      if (str.value.trim() === "") {
        proxy.$refs.msg.show({
          model: "error",
          text: "\u4E0D\u80FD\u4E3A\u7A7A",
          mask: true
        });
        return;
      }
      uni.navigateTo({
        url: "search?key=" + str.value
      });
    }
    function seLocal() {
      if (language("language") == "English-US") {
        uni.setLocale("zh-Hans");
      } else {
        uni.setLocale("en");
      }
    }
    function setTheme(colorname) {
      proxy.$refs.app.setTheme(colorname);
    }
    function changeCustomColor() {
      formatAppLog("log", "at pages/index/index.nvue:220", 1);
      if (!showCustomColor.value || !showCustomName.value) {
        proxy.$refs.msg.show({
          model: "error",
          text: "\u5FC5\u586B\u5185\u5BB9",
          mask: true
        });
        return;
      }
      showCustom.value = false;
      store.setTmVuetifyAddTheme(showCustomName.value, showCustomColor.value);
    }
    onLoad(() => {
    });
    return (_ctx, _cache) => {
      const _component_navigator = resolveComponent("navigator");
      return openBlock(), createElementBlock("scroll-view", {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
        style: { flexDirection: "column" }
      }, [
        createVNode(tmApp, { ref: "app" }, {
          default: withCtx(() => [
            createVNode(tmNavbar, {
              title: unref(language)("index.com.navtitle"),
              shadow: 0,
              "hide-home": ""
            }, {
              left: withCtx(() => [
                createElementVNode("view", { class: "flex flex-center flex-row" }, [
                  createVNode(_component_navigator, {
                    url: "settheme",
                    class: "pl-10 pr-12"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmIcon, {
                        "font-size": 32,
                        name: "tmicon-cog-fill"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(tmIcon, {
                    onClick: onChangeDark,
                    color: unref(store).tmStore.dark ? "yellow" : "",
                    _class: "pl-32",
                    "font-size": 42,
                    name: "tmicon-ios-sunny"
                  }, null, 8, ["color"])
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            createVNode(tmSheet, {
              margin: [0, 0],
              followTheme: true
            }, {
              default: withCtx(() => [
                createElementVNode("view", { class: "flex-row flex-row-center-start pb-10" }, [
                  createVNode(tmImage, {
                    width: 108,
                    height: 67.5,
                    src: unref(logoimg)
                  }, null, 8, ["height", "src"]),
                  createElementVNode("view", {
                    class: "pl-16 flex-1",
                    style: { "width": "0px" }
                  }, [
                    createVNode(tmText, {
                      _class: "text-weight-b",
                      "font-size": 36,
                      label: "TMUI 3.0.74"
                    }),
                    createVNode(tmText, {
                      _class: "opacity-6",
                      label: unref(language)("index.search.subtext")
                    }, null, 8, ["label"])
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, { margin: [0, 0] }, {
              default: withCtx(() => [
                createVNode(tmInput, {
                  placeholder: unref(language)("index.search.tips"),
                  border: 1,
                  showClear: "",
                  prefix: "tmicon-search",
                  modelValue: str.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => str.value = $event),
                  onSearch: search,
                  searchLabel: unref(language)("index.search.btntext")
                }, null, 8, ["placeholder", "modelValue", "searchLabel"])
              ]),
              _: 1
            }),
            createElementVNode("view", { class: "mt-24" }),
            createVNode(tmSheet, {
              margin: [32, 0],
              round: 3
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: unref(language)("index.com.themetext")
                }, null, 8, ["label"]),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-around" }, [
                  createVNode(tmButton, {
                    width: 100,
                    color: "yellow",
                    size: "small",
                    onClick: _cache[1] || (_cache[1] = ($event) => setTheme("yellow")),
                    label: unref(language)("index.com.themeGreen")
                  }, null, 8, ["label"]),
                  createVNode(tmButton, {
                    width: 100,
                    color: "blue",
                    size: "small",
                    onClick: _cache[2] || (_cache[2] = ($event) => setTheme("blue")),
                    label: unref(language)("index.com.themeBlue")
                  }, null, 8, ["label"]),
                  createVNode(tmButton, {
                    width: 100,
                    color: "red",
                    size: "small",
                    onClick: _cache[3] || (_cache[3] = ($event) => setTheme("red")),
                    label: unref(language)("index.com.themeRed")
                  }, null, 8, ["label"]),
                  createVNode(tmButton, {
                    color: "brown",
                    shadow: 0,
                    width: 100,
                    size: "small",
                    onClick: _cache[4] || (_cache[4] = ($event) => showCustom.value = true),
                    label: unref(language)("index.com.themeCustText")
                  }, null, 8, ["label"]),
                  createVNode(tmButton, {
                    width: 160,
                    size: "small",
                    onClick: _cache[5] || (_cache[5] = ($event) => setTheme("")),
                    label: unref(language)("index.com.themeDefault")
                  }, null, 8, ["label"])
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, {
              round: 3,
              margin: [32, 24]
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: unref(language)("index.com.title")
                }, null, 8, ["label"]),
                createVNode(tmDivider),
                createVNode(tmGrid, {
                  col: 3,
                  width: 630
                }, {
                  default: withCtx(() => [
                    createVNode(tmGridItem, {
                      url: "../changyong/index",
                      height: 180,
                      count: 3,
                      color: "primary"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "primary",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-layergroup-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.tongyong")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.tongyongSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../layout/index",
                      height: 180
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "blue",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-map-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.row")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.rowSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../showdata/index",
                      height: 180
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "pink",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-paperplane-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.show")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.showSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../form/index",
                      height: 180,
                      dot: "",
                      color: "green"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "orange",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-commentdots-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.form")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.formSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../fankui/index",
                      height: 180,
                      count: "YES"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "green",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-lightbulb-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.fd")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.fdSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../daohang/index",
                      height: 180,
                      count: "NEW"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "teal",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-flag-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.nav")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.navSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      transprent: false,
                      "bg-color": "red",
                      text: "",
                      url: "../yewu/index",
                      height: 180,
                      count: "HOT",
                      color: "orange"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "red",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-box-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.yewu")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.yewuSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../other/index",
                      height: 180
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "cyan",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-smile-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.other")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.otherSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      text: "",
                      url: "../chart/index",
                      height: 180,
                      count: "CHAR"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "blue-grey",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-borderbottom-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.tubiao")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.tubiaoSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(tmCell, {
              url: "../wxaccount/user",
              margin: [32, 16],
              showAvatar: "",
              round: 3,
              titleFontSize: 30,
              title: unref(language)("index.com.love"),
              label: "\u53EF\u767B\u5F55\u6A21\u677F\u5E02\u573A",
              rightText: unref(language)("index.com.loveSub")
            }, {
              avatar: withCtx(() => [
                createVNode(tmIcon, {
                  color: "orange",
                  "font-size": 38,
                  name: "tmicon-heart-fill"
                })
              ]),
              _: 1
            }, 8, ["title", "rightText"]),
            createVNode(tmCell, {
              onClick: seLocal,
              showAvatar: "",
              round: 3,
              titleFontSize: 30,
              title: unref(language)("index.com.setLocal"),
              rightText: unref(language)("language")
            }, {
              avatar: withCtx(() => [
                createVNode(tmIcon, {
                  color: "primary",
                  "font-size": 38,
                  name: "tmicon-resource"
                })
              ]),
              _: 1
            }, 8, ["title", "rightText"]),
            createElementVNode("view", { class: "py-32 mx-32" }, [
              createVNode(tmDivider, {
                color: "grey-2",
                label: unref(language)("index.com.bottom")
              }, null, 8, ["label"])
            ]),
            createVNode(tmFloatButton, {
              onClick: onChangeDark,
              btn: { icon: "tmicon-ios-sunny", color: "pink", linear: "right" }
            }),
            createVNode(tmMessage, { ref: "msg" }, null, 512),
            createVNode(tmDrawer, {
              show: showCustom.value,
              "onUpdate:show": _cache[8] || (_cache[8] = ($event) => showCustom.value = $event),
              placement: "center",
              hideHeader: "",
              height: 450,
              width: 600
            }, {
              default: withCtx(() => [
                createElementVNode("view", { class: "pa-32 flex flex-col" }, [
                  createElementVNode("view", { class: "text-align-center py-24" }, [
                    createVNode(tmText, {
                      _class: "text-weight-b",
                      "font-size": 32,
                      label: "\u81EA\u5B9A\u4E49\u4E3B\u9898"
                    })
                  ]),
                  createVNode(tmInput, {
                    prefixLabel: "\u989C\u8272\u503C",
                    placeholder: "\u8BF7\u8F93\u5165\u989C\u8272\u503C,\u6BD4\u5982:#FF00FF",
                    border: 1,
                    showClear: "",
                    modelValue: showCustomColor.value,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => showCustomColor.value = $event)
                  }, null, 8, ["modelValue"]),
                  createVNode(tmInput, {
                    prefixLabel: "\u989C\u8272\u540D\u79F0",
                    margin: [0, 24],
                    placeholder: "\u5B57\u6BCD,\u5982:darkGreen",
                    border: 1,
                    showClear: "",
                    modelValue: showCustomName.value,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => showCustomName.value = $event)
                  }, null, 8, ["modelValue"]),
                  createVNode(tmButton, {
                    onClick: changeCustomColor,
                    block: "",
                    label: "\u786E\u8BA4\u5207\u6362"
                  })
                ])
              ]),
              _: 1
            }, 8, ["show"])
          ]),
          _: 1
        }, 512)
      ]);
    };
  }
});
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/mp/anydoor-v2/src/pages/index/index.nvue"]]);
export { index as default };
