import { makeSymbol, assign, isNumber, isString, isObject, isBoolean, warn, isEmptyObject, createEmitter, getGlobalThis, format, isArray, isPlainObject, isRegExp, isFunction, inBrowser, hasOwn } from "@intlify/shared";
import { CoreWarnCodes, CompileErrorCodes, registerMessageResolver, resolveValue, registerLocaleFallbacker, fallbackWithLocaleChain, setDevToolsHook, createCompileError, DEFAULT_LOCALE, updateFallbackLocale, NUMBER_FORMAT_OPTIONS_KEYS, DATETIME_FORMAT_OPTIONS_KEYS, setFallbackContext, createCoreContext, clearDateTimeFormat, clearNumberFormat, setAdditionalMeta, getFallbackContext, NOT_REOSLVED, isTranslateFallbackWarn, isTranslateMissingWarn, parseTranslateArgs, translate, MISSING_RESOLVE_VALUE, parseDateTimeArgs, datetime, parseNumberArgs, number } from "@intlify/core-base";
import { h, getCurrentInstance, effectScope, inject, onMounted, onUnmounted, ref, computed, watch, Fragment, isRef, createVNode, Text, defineComponent, resolveComponent, mergeProps, unref, useSSRContext, withCtx, createTextVNode, shallowRef, openBlock, createBlock, createCommentVNode, toDisplayString, renderList } from "vue";
import { setupDevtoolsPlugin } from "@vue/devtools-api";
import { VueDevToolsLabels, VueDevToolsPlaceholders, VueDevToolsTimelineColors } from "@intlify/vue-devtools";
import NProgress from "nprogress";
import { createPinia, defineStore, storeToRefs } from "pinia";
import { createClient } from "@supabase/supabase-js";
import unocssui from "unocss-ui";
import { ViteSSG } from "vite-ssg";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import "vue3-json-editor";
import { Codemirror } from "vue-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import draggable from "vuedraggable";
import { useHead } from "@vueuse/head";
import { useDark, useToggle, usePreferredDark } from "@vueuse/core";
/*!
  * vue-i18n v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.2.2";
function initFeatureFlags() {
  let needWarn = false;
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
  if (process.env.NODE_ENV !== "production" && needWarn) {
    console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
  }
}
let code$1 = CoreWarnCodes.__EXTEND_POINT__;
const inc$1 = () => ++code$1;
const I18nWarnCodes = {
  FALLBACK_TO_ROOT: code$1,
  NOT_SUPPORTED_PRESERVE: inc$1(),
  NOT_SUPPORTED_FORMATTER: inc$1(),
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
  NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
  COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
  NOT_FOUND_PARENT_SCOPE: inc$1()
  // 13
};
const warnMessages = {
  [I18nWarnCodes.FALLBACK_TO_ROOT]: `Fall back to {type} '{key}' with root locale.`,
  [I18nWarnCodes.NOT_SUPPORTED_PRESERVE]: `Not supported 'preserve'.`,
  [I18nWarnCodes.NOT_SUPPORTED_FORMATTER]: `Not supported 'formatter'.`,
  [I18nWarnCodes.NOT_SUPPORTED_PRESERVE_DIRECTIVE]: `Not supported 'preserveDirectiveContent'.`,
  [I18nWarnCodes.NOT_SUPPORTED_GET_CHOICE_INDEX]: `Not supported 'getChoiceIndex'.`,
  [I18nWarnCodes.COMPONENT_NAME_LEGACY_COMPATIBLE]: `Component name legacy compatible: '{name}' -> 'i18n'`,
  [I18nWarnCodes.NOT_FOUND_PARENT_SCOPE]: `Not found parent scope. use the global scope.`
};
function getWarnMessage(code2, ...args) {
  return format(warnMessages[code2], ...args);
}
let code = CompileErrorCodes.__EXTEND_POINT__;
const inc = () => ++code;
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: code,
  // legacy module errors
  INVALID_ARGUMENT: inc(),
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSLALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  // directive module errors
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSLALLED_WITH_PROVIDE: inc(),
  // unexpected error
  UNEXPECTED_ERROR: inc(),
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  // for enhancement
  __EXTEND_POINT__: inc()
  // 29
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, process.env.NODE_ENV !== "production" ? { messages: errorMessages, args } : void 0);
}
const errorMessages = {
  [I18nErrorCodes.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [I18nErrorCodes.INVALID_ARGUMENT]: "Invalid argument",
  [I18nErrorCodes.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [I18nErrorCodes.NOT_INSLALLED]: "Need to install with `app.use` function",
  [I18nErrorCodes.UNEXPECTED_ERROR]: "Unexpected error",
  [I18nErrorCodes.NOT_AVAILABLE_IN_LEGACY_MODE]: "Not available in legacy mode",
  [I18nErrorCodes.REQUIRED_VALUE]: `Required in value: {0}`,
  [I18nErrorCodes.INVALID_VALUE]: `Invalid value`,
  [I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: `Cannot setup vue-devtools plugin`,
  [I18nErrorCodes.NOT_INSLALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [I18nErrorCodes.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [I18nErrorCodes.BRIDGE_SUPPORT_VUE_2_ONLY]: "vue-i18n-bridge support Vue 2.x only",
  [I18nErrorCodes.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION]: "Must define ‘i18n’ option or custom block in Composition API with using local scope in Legacy API mode",
  [I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
};
const TransrateVNodeSymbol = /* @__PURE__ */ makeSymbol("__transrateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const EnableEmitter = /* @__PURE__ */ makeSymbol("__enableEmitter");
const DisableEmitter = /* @__PURE__ */ makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOption = /* @__PURE__ */ makeSymbol("__injectWithOption");
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject(obj[key])) {
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
      if (isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  for (const key in src) {
    if (hasOwn(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(global, options, componentOptions) {
  let messages = isObject(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(global.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      global.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
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
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
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
      messageResolver: options.messageResolver,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    if (process.env.NODE_ENV !== "production") {
      ctxOptions.__v_emitter = isPlainObject(_context) ? _context.__v_emitter : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
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
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
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
    return type !== "translate" || !arg.resolvedMessage;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
      try {
        setAdditionalMeta(getMetaInfo());
        if (!_isGlobal) {
          _context.fallbackContext = __root ? getFallbackContext() : void 0;
        }
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
        if (!_isGlobal) {
          _context.fallbackContext = void 0;
        }
      }
    } else {
      ret = fn(_context);
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      if (process.env.NODE_ENV !== "production" && __root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
        if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
          warn(getWarnMessage(I18nWarnCodes.FALLBACK_TO_ROOT, {
            key,
            type: warnType
          }));
        }
        if (process.env.NODE_ENV !== "production") {
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
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function transrateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[TransrateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = isString(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return _context.messageResolver(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
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
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
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
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
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
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOption] = options.__injectWithOption;
    composer[TransrateVNodeSymbol] = transrateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  if (process.env.NODE_ENV !== "production") {
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
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponetI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return slot = [
        ...slot,
        ...isArray(current.children) ? current.children : [current]
      ];
    }, []);
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
function getFragmentableTag(tag) {
  return Fragment;
}
const Translation = (
  /* defineComponent */
  {
    /* eslint-disable */
    name: "i18n-t",
    props: assign({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: (val) => isNumber(val) || !isNaN(val)
      }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const { slots, attrs } = context;
      const i18n2 = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      return () => {
        const keys = Object.keys(slots).filter((key) => key !== "_");
        const options = {};
        if (props.locale) {
          options.locale = props.locale;
        }
        if (props.plural !== void 0) {
          options.plural = isString(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys);
        const children = i18n2[TransrateVNodeSymbol](props.keypath, arg, options);
        const assignedAttrs = assign({}, attrs);
        const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
        return h(tag, assignedAttrs, children);
      };
    }
  }
);
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
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
    } else if (isObject(props.format)) {
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
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign({}, attrs);
    const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormat = (
  /* defineComponent */
  {
    /* eslint-disable */
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
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[NumberPartsSymbol](...args)
      ));
    }
  }
);
const DatetimeFormat = (
  /*defineComponent */
  {
    /* eslint-disable */
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
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[DatetimePartsSymbol](...args)
      ));
    }
  }
);
function getComposer$2(i18n2, instance) {
  const i18nInternal = i18n2;
  if (i18n2.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n2.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
  }
}
function vTDirective(i18n2) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n2, instance.$);
    if (process.env.NODE_ENV !== "production" && modifiers.preserve) {
      warn(getWarnMessage(I18nWarnCodes.NOT_SUPPORTED_PRESERVE));
    }
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser && i18n2.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n2, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (process.env.NODE_ENV !== "production" && globalInstall && useI18nComponentName) {
    warn(getWarnMessage(I18nWarnCodes.COMPONENT_NAME_LEGACY_COMPATIBLE, {
      name: Translation.name
    }));
  }
  if (globalInstall) {
    app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
    app.component(NumberFormat.name, NumberFormat);
    app.component(DatetimeFormat.name, DatetimeFormat);
  }
  {
    app.directive("t", vTDirective(i18n2));
  }
}
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
let devtoolsApi;
async function enableDevTools(app, i18n2) {
  return new Promise((resolve, reject) => {
    try {
      setupDevtoolsPlugin({
        id: "vue-devtools-plugin-vue-i18n",
        label: VueDevToolsLabels[
          "vue-devtools-plugin-vue-i18n"
          /* PLUGIN */
        ],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
        app
        // eslint-disable-line @typescript-eslint/no-explicit-any
      }, (api) => {
        devtoolsApi = api;
        api.on.visitComponentTree(({ componentInstance, treeNode }) => {
          updateComponentTreeTags(componentInstance, treeNode, i18n2);
        });
        api.on.inspectComponent(({ componentInstance, instanceData }) => {
          if (componentInstance.vnode.el && componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
            if (i18n2.mode === "legacy") {
              if (componentInstance.vnode.el.__VUE_I18N__ !== i18n2.global.__composer) {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            } else {
              inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
            }
          }
        });
        api.addInspector({
          id: "vue-i18n-resource-inspector",
          label: VueDevToolsLabels[
            "vue-i18n-resource-inspector"
            /* CUSTOM_INSPECTOR */
          ],
          icon: "language",
          treeFilterPlaceholder: VueDevToolsPlaceholders[
            "vue-i18n-resource-inspector"
            /* CUSTOM_INSPECTOR */
          ]
        });
        api.on.getInspectorTree((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            registerScope(payload, i18n2);
          }
        });
        const roots = /* @__PURE__ */ new Map();
        api.on.getInspectorState(async (payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            api.unhighlightElement();
            inspectScope(payload, i18n2);
            if (payload.nodeId === "global") {
              if (!roots.has(payload.app)) {
                const [root] = await api.getComponentInstances(payload.app);
                roots.set(payload.app, root);
              }
              api.highlightElement(roots.get(payload.app));
            } else {
              const instance = getComponentInstance(payload.nodeId, i18n2);
              instance && api.highlightElement(instance);
            }
          }
        });
        api.on.editInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            editScope(payload, i18n2);
          }
        });
        api.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: VueDevToolsLabels[
            "vue-i18n-timeline"
            /* TIMELINE */
          ],
          color: VueDevToolsTimelineColors[
            "vue-i18n-timeline"
            /* TIMELINE */
          ]
        });
        resolve(true);
      });
    } catch (e) {
      console.error(e);
      reject(false);
    }
  });
}
function getI18nScopeLable(instance) {
  return instance.type.name || instance.type.displayName || instance.type.__file || "Anonymous";
}
function updateComponentTreeTags(instance, treeNode, i18n2) {
  const global = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  if (instance && instance.vnode.el && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global) {
      const tag = {
        label: `i18n (${getI18nScopeLable(instance)} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  {
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
}
function getLocaleMessageValue(messages) {
  const value = {};
  Object.keys(messages).forEach((key) => {
    const v = messages[key];
    if (isFunction(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isObject(v)) {
      value[key] = getLocaleMessageValue(v);
    } else {
      value[key] = v;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
  return ESC[a] || a;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n2) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  for (const [keyInstance, instance] of i18n2.__instances) {
    const composer = i18n2.mode === "composition" ? instance : instance.__composer;
    if (global === composer) {
      continue;
    }
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${getI18nScopeLable(keyInstance)} Scope`
    });
  }
}
function getComponentInstance(nodeId, i18n2) {
  let instance = null;
  if (nodeId !== "global") {
    for (const [component, composer] of i18n2.__instances.entries()) {
      if (composer.id.toString() === nodeId) {
        instance = component;
        break;
      }
    }
  }
  return instance;
}
function getComposer$1(nodeId, i18n2) {
  if (nodeId === "global") {
    return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  } else {
    const instance = Array.from(i18n2.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n2.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
  return null;
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  {
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
  }
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = makeSymbol(process.env.NODE_ENV !== "production" ? "vue-i18n" : "");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n2 = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return __allowComposition;
      },
      // install plugin
      async install(app, ...options2) {
        if ((process.env.NODE_ENV !== "production" || false) && true) {
          app.__VUE_I18N__ = i18n2;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
        if (__globalInjection) {
          injectGlobalFields(app, i18n2.global);
        }
        {
          apply(app, i18n2, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          i18n2.dispose();
          unmountApp();
        };
        if ((process.env.NODE_ENV !== "production" || false) && true) {
          const ret = await enableDevTools(app, i18n2);
          if (!ret) {
            throw createI18nError(I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          }
          const emitter = createEmitter();
          {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      // global accessor
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance
    };
    return i18n2;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSLALLED);
  }
  const i18n2 = getI18nInstance(instance);
  const global = getGlobalComposer(i18n2);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(global, options, componentOptions);
    return global;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n2, instance, options.__useComponent);
    if (composer2 == null) {
      if (process.env.NODE_ENV !== "production") {
        warn(getWarnMessage(I18nWarnCodes.NOT_FOUND_PARENT_SCOPE));
      }
      composer2 = global;
    }
    return composer2;
  }
  const i18nInternal = i18n2;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (global) {
      composerOptions.__root = global;
    }
    composer = createComposer(composerOptions);
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n2 = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n2) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSLALLED_WITH_PROVIDE);
    }
    return i18n2;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n2) {
  return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
}
function getComposer(i18n2, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
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
function setupLifeCycle(i18n2, target, composer) {
  let emitter = null;
  {
    onMounted(() => {
      if ((process.env.NODE_ENV !== "production" || false) && true && target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    onUnmounted(() => {
      if ((process.env.NODE_ENV !== "production" || false) && true && target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n2.__deleteInstance(target);
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm"];
function injectGlobalFields(app, composer) {
  const i18n2 = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n2, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n2;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  initFeatureFlags();
}
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
if (process.env.NODE_ENV !== "production")
  ;
const i18n = createI18n({
  legacy: false,
  locale: "",
  messages: {}
});
const localesMap = Object.fromEntries(
  Object.entries(/* @__PURE__ */ Object.assign({ "../../locales/ar.yml": () => import("./assets/ar-3dbdacfb.js"), "../../locales/de.yml": () => import("./assets/de-787d322a.js"), "../../locales/en.yml": () => import("./assets/en-9cacb006.js"), "../../locales/es.yml": () => import("./assets/es-e7fbd06b.js"), "../../locales/fr.yml": () => import("./assets/fr-5c8ac928.js"), "../../locales/id.yml": () => import("./assets/id-dbadba9e.js"), "../../locales/it.yml": () => import("./assets/it-77074bf9.js"), "../../locales/ja.yml": () => import("./assets/ja-0ba573e5.js"), "../../locales/ka.yml": () => import("./assets/ka-fca30c0d.js"), "../../locales/ko.yml": () => import("./assets/ko-69e6674b.js"), "../../locales/pl.yml": () => import("./assets/pl-13ad51cf.js"), "../../locales/pt-BR.yml": () => import("./assets/pt-BR-33adb31f.js"), "../../locales/ru.yml": () => import("./assets/ru-cbdd4651.js"), "../../locales/tr.yml": () => import("./assets/tr-cd3d7a15.js"), "../../locales/uk.yml": () => import("./assets/uk-44d8b938.js"), "../../locales/uz.yml": () => import("./assets/uz-54943a3d.js"), "../../locales/vi.yml": () => import("./assets/vi-1a32339c.js"), "../../locales/zh-CN.yml": () => import("./assets/zh-CN-a4df38c1.js") })).map(([path, loadLocale]) => {
    var _a;
    return [(_a = path.match(/([\w-]*)\.yml$/)) == null ? void 0 : _a[1], loadLocale];
  })
);
const availableLocales = Object.keys(localesMap);
const loadedLanguages = [];
function setI18nLanguage(lang) {
  var _a;
  i18n.global.locale.value = lang;
  if (typeof document !== "undefined")
    (_a = document.querySelector("html")) == null ? void 0 : _a.setAttribute("lang", lang);
  return lang;
}
async function loadLanguageAsync(lang) {
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang);
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang);
  const messages = await localesMap[lang]();
  i18n.global.setLocaleMessage(lang, messages.default);
  loadedLanguages.push(lang);
  return setI18nLanguage(lang);
}
const install$5 = ({ app }) => {
  app.use(i18n);
  loadLanguageAsync("en");
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  availableLocales,
  install: install$5,
  loadLanguageAsync
}, Symbol.toStringTag, { value: "Module" }));
const install$4 = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from) => {
      if (to.path !== from.path)
        NProgress.start();
    });
    router.afterEach(() => {
      NProgress.done();
    });
  }
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  install: install$4
}, Symbol.toStringTag, { value: "Module" }));
const install$3 = ({ isClient, initialState, app }) => {
  const pinia = createPinia();
  app.use(pinia);
  if (isClient)
    pinia.state.value = initialState.pinia || {};
  else
    initialState.pinia = pinia.state.value;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  install: install$3
}, Symbol.toStringTag, { value: "Module" }));
const install$2 = ({ isClient, router }) => {
  if (!isClient)
    return;
  router.isReady().then(async () => {
    const { registerSW } = await import("./assets/virtual_pwa-register-826d1c0b.js");
    registerSW({ immediate: true });
  }).catch(() => {
  });
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  install: install$2
}, Symbol.toStringTag, { value: "Module" }));
const supabaseUrl = "https://mtvmbpemhwbrljhzdrci.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dm1icGVtaHdicmxqaHpkcmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5NTYzOTYsImV4cCI6MjAwMTUzMjM5Nn0.GXWLByKavDTudFsWO7RLU4kozdtqpWDdPzbfHg8xIyc";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  supabase
}, Symbol.toStringTag, { value: "Module" }));
const useUserStore = defineStore("user", () => {
  const auth = ref(null);
  const profile = ref(null);
  const setUser = async (supabaseAuth) => {
    if (supabaseAuth) {
      auth.value = supabaseAuth;
      const { data, error, status } = await supabase.from("profiles").select("username, role, avatar_url").eq("id", supabaseAuth.user.id).single();
      if (error && status !== 406)
        throw error;
      if (data)
        profile.value = data;
    }
  };
  function logout() {
    auth.value = null;
  }
  return { auth, profile, setUser, logout };
});
async function authFn() {
  supabase.auth.getSession().then(({ data }) => {
    const user = useUserStore();
    user.setUser(data.session);
    return data.session;
  });
}
const install$1 = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(async (to, from, next) => {
      to.meta.requiresAuth;
      ref();
      useUserStore();
      await authFn();
      next();
    });
  }
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  install: install$1
}, Symbol.toStringTag, { value: "Module" }));
const tailwind = "";
const style = "";
const install = ({ isClient, initialState, app }) => {
  app.use(unocssui);
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  install
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "404",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterView = resolveComponent("RouterView");
      _push(`<main${ssrRenderAttrs(mergeProps({
        p: "x4 y10",
        text: "center teal-700 dark:gray-200"
      }, _attrs))}><div text-4xl><div i-carbon-warning inline-block></div></div>`);
      _push(ssrRenderComponent(_component_RouterView, null, null, _parent));
      _push(`<div><button text-sm btn m="3 t8">${ssrInterpolate(unref(t)("button.back"))}</button></div></main>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layouts/404.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __layout_0 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/layouts/404.vue"]]);
const useBuilderStore = defineStore("builder", () => {
  const router = useRouter();
  const type = ref(null);
  const doc = ref(null);
  const files = ref();
  const dockey = ref();
  const menu = ref(null);
  const modulos = ref();
  const modulosobj = ref({});
  const newDoc = async (key, content) => {
    const { data, error } = await supabase.from("documents").insert([
      { key, content }
    ]).select().single();
    router.push(`/${type.value}/${data.key}`);
  };
  const loadDoc = async (key) => {
    dockey.value = key;
    const { data: document2, error } = await supabase.from("documents").select("*").eq("key", key).single();
    doc.value = document2;
    updateAssets();
    return true;
  };
  const getContent = () => {
    return doc.value ? doc.value.content : null;
  };
  const geturl = (name) => {
    const { data } = supabase.storage.from(type.value).getPublicUrl(dockey.value + "/" + name);
    return data.publicUrl;
  };
  const saveDoc = async () => {
    await supabase.from("documents").update(doc.value).eq("key", dockey.value);
  };
  const downloadDoc = () => {
  };
  const loadModulos = async () => {
    const { data: modulos2, error } = await supabase.from("modulos").select("*").eq("type", type.value);
    modulos2.value = modulos2;
    modulos2 == null ? void 0 : modulos2.forEach((i) => {
      modulosobj.value[i.name] = { ...i.schema, icon: i.icon };
    });
    return modulos2;
  };
  const updateAssets = async () => {
    files.value = [];
    const { data, error } = await supabase.storage.from(type.value).list(dockey.value, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" }
    });
    data.forEach((itm) => {
      files.value.push({ name: itm.name, url: geturl(itm.name), mimetype: itm.metadata.mimetype });
    });
  };
  const metadata = (key, val) => {
    var _a;
    if (!((_a = doc.value.content) == null ? void 0 : _a.metadata)) {
      doc.value.content.metadata = {};
    }
    doc.value.content.metadata[key] = val;
  };
  return { menu, type, doc, dockey, files, modulos, modulosobj, newDoc, loadDoc, getContent, updateAssets, saveDoc, downloadDoc, loadModulos, metadata };
});
const _sfc_main$i = {
  __name: "builderDetailsAssetsList",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    useRoute();
    builderstore.updateAssets();
    const deleteAsset = async (item) => {
      await supabase.storage.from(builderstore.type).remove([builderstore.dockey + "/" + item.name]);
      builderstore.updateAssets();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPopover = resolveComponent("UPopover");
      const _component_UButton = resolveComponent("UButton");
      _push(`<!--[-->`);
      ssrRenderList(unref(builderstore).files, (item, index) => {
        _push(`<div class="flex gap-2 justify-between items-center p-1 my-1 bg-slate-100 dark:bg-slate-700">`);
        if (item.mimetype.includes("image")) {
          _push(`<div flex gap-2 items-center><div i-solar-sun-fog-line-duotone text-lg></div><img${ssrRenderAttr("src", item.url)} class="w-12"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (item.mimetype.includes("video")) {
          _push(`<div flex gap-2 items-center><div i-solar-clapperboard-open-play-line-duotone text-lg></div><div class="w-12 aspect-square bg-slate-1/10 rounded"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (item.mimetype.includes("audio")) {
          _push(`<div flex gap-2 items-center><div i-solar-music-notes-line-duotone></div><div class="w-12 aspect-square bg-slate-1/10 rounded"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div mr-auto>${ssrInterpolate(item.name)}</div>`);
        _push(ssrRenderComponent(_component_UPopover, { trigger: "hover" }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span dark:text-white text-xs p-1${_scopeId}>Abrir archivo</span>`);
            } else {
              return [
                createVNode("span", {
                  "dark:text-white": "",
                  "text-xs": "",
                  "p-1": ""
                }, "Abrir archivo")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<a${ssrRenderAttr("href", item.url)} target="_blank"${_scopeId}><div i-solar-square-bottom-up-line-duotone class="cursor-pointer"${_scopeId}></div></a>`);
            } else {
              return [
                createVNode("a", {
                  href: item.url,
                  target: "_blank"
                }, [
                  createVNode("div", {
                    "i-solar-square-bottom-up-line-duotone": "",
                    class: "cursor-pointer"
                  })
                ], 8, ["href"])
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
        _push(ssrRenderComponent(_component_UPopover, { trigger: "click" }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                "dark:text-dark": "",
                "text-xs": "",
                "p-1": "",
                onClick: ($event) => deleteAsset(item)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Eliminar archivo`);
                  } else {
                    return [
                      createTextVNode("Eliminar archivo")
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  "dark:text-dark": "",
                  "text-xs": "",
                  "p-1": "",
                  onClick: ($event) => deleteAsset(item)
                }, {
                  default: withCtx(() => [
                    createTextVNode("Eliminar archivo")
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["onClick"])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div i-solar-trash-bin-trash-linear class="cursor-pointer"${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", {
                  "i-solar-trash-bin-trash-linear": "",
                  class: "cursor-pointer"
                })
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsAssetsList.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __unplugin_components_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsAssetsList.vue"]]);
const _sfc_main$h = {
  __name: "builderDetailsAssetsUploader",
  __ssrInlineRender: true,
  setup(__props) {
    useBuilderStore();
    useRoute();
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "upload-area p-5 border-dashed border-4 border-slate-500 bg-white shadow m-2",
        "cursor-pointer": "",
        "text-center": "",
        "text-xs": "",
        "text-slate-500": "",
        "hover:border-slate-800": ""
      }, _attrs))}> Soltar archivos o clic <input type="file" hidden></div>`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsAssetsUploader.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __unplugin_components_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsAssetsUploader.vue"]]);
const _sfc_main$g = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_BuilderDetailsAssetsUploader = __unplugin_components_0$6;
  const _component_BuilderDetailsAssetsList = __unplugin_components_1$3;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_BuilderDetailsAssetsUploader, null, null, _parent));
  _push(ssrRenderComponent(_component_BuilderDetailsAssetsList, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsAssets.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$3], ["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsAssets.vue"]]);
const _sfc_main$f = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  let _temp0;
  _push(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
    id: "",
    name: "",
    cols: "30",
    rows: "10",
    "w-full": "",
    "m-2": ""
  }, _attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsPrompts.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __unplugin_components_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$2], ["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsPrompts.vue"]]);
const _sfc_main$e = {
  __name: "builderDetailsCodigo",
  __ssrInlineRender: true,
  setup(__props) {
    console.log(json);
    const extensions = [json(), oneDark];
    const view = shallowRef();
    const handleReady = (payload) => {
      view.value = payload.view;
    };
    const builderstore = useBuilderStore();
    storeToRefs(builderstore);
    ref(true);
    ref({ ...builderstore.doc.content });
    const contentModel = ref(builderstore.doc ? builderstore.doc.content : "");
    const jsoncode = ref(JSON.stringify(contentModel.value, null, "	"));
    watch(() => builderstore.doc.content, (newContent) => {
      contentModel.value = newContent;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><!--
    <Vue3JsonEditor v-model="contentModel" class="bg-white" @json-change="onJsonChange" @mode-change="onModeChange" />
  -->`);
      _push(ssrRenderComponent(unref(Codemirror), mergeProps({
        modelValue: unref(jsoncode),
        "onUpdate:modelValue": ($event) => isRef(jsoncode) ? jsoncode.value = $event : null,
        placeholder: "Code goes here...",
        class: "h-full",
        autofocus: true,
        "indent-with-tab": true,
        "tab-size": 2,
        extensions,
        onReady: handleReady
      }, _attrs), null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsCodigo.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __unplugin_components_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsCodigo.vue"]]);
const _sfc_main$d = {
  __name: "BDModulosDropzones",
  __ssrInlineRender: true,
  props: {
    data: Object,
    itemKey: String,
    level: Number
  },
  setup(__props) {
    const props = __props;
    const builderstore = useBuilderStore();
    const thelist = ref(props.data[props.itemKey]);
    const drag = ref(false);
    const moduloName = props.itemKey + "_" + props.level;
    const dropzones = ["content", "scenes", "options"];
    const noninput = ["block", "name"];
    const getRandomCharacters = (_) => "xxxx".replace(/x/g, (_2) => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.random() * 62 | 0]);
    const fnClone = (el) => {
      const newel = JSON.parse(JSON.stringify(el));
      if (!(el == null ? void 0 : el.symbol)) {
        newel["name"] = getRandomCharacters();
      }
      thelist.value.push(newel);
    };
    const fnSymbol = (el, index) => {
      if (!el.name) {
        el.name = getRandomCharacters();
      }
      const newel = JSON.parse(JSON.stringify(el));
      const thename = newel.name;
      delete newel["name"];
      builderstore.doc.content.symbols[thename] = newel;
      thelist.value[index] = {
        "symbol": thename
      };
    };
    const fnDelete = (el, index) => {
      thelist.value.splice(index, 1);
    };
    const accordion = ref({});
    const open = (index, element) => {
      syncblock(index, element);
      accordion.value[moduloName + index] = !accordion.value[moduloName + index];
    };
    const syncblock = (index, element) => {
      const schema = builderstore.modulosobj[element.block];
      Object.keys(schema.properties).forEach((el) => {
        if (!element.hasOwnProperty(el)) {
          console.log("adding:" + el);
          const prop = schema.properties[el];
          if (prop.type == "string") {
            element[el] = "";
          }
          if (prop.type == "boolean") {
            element[el] = false;
          }
          if (prop.type == "array") {
            element[el] = [];
          }
          if (prop.default) {
            element[el] = prop.default;
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPopover = resolveComponent("UPopover");
      const _component_UButton = resolveComponent("UButton");
      const _component_BDModulosInputs = __unplugin_components_2;
      const _component_BDModulosDropzones = resolveComponent("BDModulosDropzones", true);
      _push(ssrRenderComponent(unref(draggable), mergeProps({
        list: unref(thelist),
        group: { name: "people", pull: true, put: true },
        "item-key": "name",
        class: ["min-h-[30px] ring-1 ring-slate-4 flex flex-col gap-0.5  ml-0.5 pl-1 pr-0.5 py-1"],
        onStart: ($event) => drag.value = true,
        onEnd: ($event) => drag.value = false,
        handle: ".handle"
      }, _attrs), {
        item: withCtx(({ element, index }, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(drag) ? "ring-1 ring-accent" : "")}"${_scopeId}><div class="flex gap-1 bg-gradient-to-r from-teal-800 to-info items-center relative"${_scopeId}><div class="mb-0.5 handle flex gap-1 items-center justify-between grow px-1 cursor-grab p-1"${_scopeId}><div flex items-center w-full grow${_scopeId}>`);
            if ((_b = (_a = unref(builderstore)) == null ? void 0 : _a.modulosobj[element.block]) == null ? void 0 : _b.icon) {
              _push2(`<div class="hasicon w-4 h-4 mr-1"${_scopeId}>${unref(builderstore).modulosobj[element.block].icon}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (element == null ? void 0 : element.symbol) {
              _push2(`<!--[--><div${_scopeId}>symbol</div><div${_scopeId}>${ssrInterpolate(element.symbol)}</div><!--]-->`);
            } else {
              _push2(`<div flex items-center justify-between grow${_scopeId}><div${_scopeId}>${ssrInterpolate(element.block)}</div><div${_scopeId}>${ssrInterpolate(element.name)}</div></div>`);
            }
            _push2(`</div></div><!-- ACTIONS -->`);
            _push2(ssrRenderComponent(_component_UPopover, { trigger: "hover" }, {
              content: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span dark:text-white text-xs p-1${_scopeId2}>Duplicar</span>`);
                } else {
                  return [
                    createVNode("span", {
                      "dark:text-white": "",
                      "text-xs": "",
                      "p-1": ""
                    }, "Duplicar")
                  ];
                }
              }),
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-solar-copy-line-duotone class="cursor-pointer text-dark hover:text-white"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      "i-solar-copy-line-duotone": "",
                      class: "cursor-pointer text-dark hover:text-white",
                      onClick: ($event) => fnClone(element)
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UPopover, { trigger: "hover" }, {
              content: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span dark:text-white text-xs p-1${_scopeId2}>A símbolo</span>`);
                } else {
                  return [
                    createVNode("span", {
                      "dark:text-white": "",
                      "text-xs": "",
                      "p-1": ""
                    }, "A símbolo")
                  ];
                }
              }),
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-solar-link-round-bold-duotone class="cursor-pointer text-dark hover:text-white"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      "i-solar-link-round-bold-duotone": "",
                      class: "cursor-pointer text-dark hover:text-white",
                      onClick: ($event) => fnSymbol(element, index)
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UPopover, { trigger: "click" }, {
              content: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    size: "xs",
                    class: "mx-1 px-1",
                    type: "primary",
                    onClick: ($event) => fnDelete(element, index)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Eliminar bloque`);
                      } else {
                        return [
                          createTextVNode("Eliminar bloque")
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      size: "xs",
                      class: "mx-1 px-1",
                      type: "primary",
                      onClick: ($event) => fnDelete(element, index)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Eliminar bloque")
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["onClick"])
                  ];
                }
              }),
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-solar-trash-bin-trash-linear class="cursor-pointer text-dark hover:text-white"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      "i-solar-trash-bin-trash-linear": "",
                      class: "cursor-pointer text-dark hover:text-white"
                    })
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent2, _scopeId));
            _push2(`</div><!--[-->`);
            ssrRenderList(Object.keys(element), (itemNest, indexNest) => {
              _push2(`<!--[-->`);
              if (unref(accordion)[moduloName + index] && !dropzones.includes(itemNest) && !noninput.includes(itemNest)) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_BDModulosInputs, {
                  data: element,
                  "item-key": itemNest,
                  level: __props.level + 1
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(Object.keys(element), (itemNest, indexNest) => {
              _push2(`<!--[-->`);
              if (dropzones.includes(itemNest) && Array.isArray(element[itemNest])) {
                _push2(ssrRenderComponent(_component_BDModulosDropzones, {
                  data: element,
                  "item-key": itemNest,
                  level: __props.level + 1
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode(
                "div",
                {
                  class: unref(drag) ? "ring-1 ring-accent" : ""
                },
                [
                  createVNode("div", { class: "flex gap-1 bg-gradient-to-r from-teal-800 to-info items-center relative" }, [
                    createVNode("div", {
                      onClick: ($event) => open(index, element),
                      class: "mb-0.5 handle flex gap-1 items-center justify-between grow px-1 cursor-grab p-1"
                    }, [
                      createVNode("div", {
                        flex: "",
                        "items-center": "",
                        "w-full": "",
                        grow: ""
                      }, [
                        ((_d = (_c = unref(builderstore)) == null ? void 0 : _c.modulosobj[element.block]) == null ? void 0 : _d.icon) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "hasicon w-4 h-4 mr-1",
                          innerHTML: unref(builderstore).modulosobj[element.block].icon
                        }, null, 8, ["innerHTML"])) : createCommentVNode("v-if", true),
                        (element == null ? void 0 : element.symbol) ? (openBlock(), createBlock(
                          Fragment,
                          { key: 1 },
                          [
                            createVNode("div", null, "symbol"),
                            createVNode(
                              "div",
                              null,
                              toDisplayString(element.symbol),
                              1
                              /* TEXT */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        )) : (openBlock(), createBlock("div", {
                          key: 2,
                          flex: "",
                          "items-center": "",
                          "justify-between": "",
                          grow: ""
                        }, [
                          createVNode(
                            "div",
                            null,
                            toDisplayString(element.block),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "div",
                            null,
                            toDisplayString(element.name),
                            1
                            /* TEXT */
                          )
                        ]))
                      ])
                    ], 8, ["onClick"]),
                    createCommentVNode(" ACTIONS "),
                    createVNode(
                      _component_UPopover,
                      { trigger: "hover" },
                      {
                        content: withCtx(() => [
                          createVNode("span", {
                            "dark:text-white": "",
                            "text-xs": "",
                            "p-1": ""
                          }, "Duplicar")
                        ]),
                        default: withCtx(() => [
                          createVNode("div", {
                            "i-solar-copy-line-duotone": "",
                            class: "cursor-pointer text-dark hover:text-white",
                            onClick: ($event) => fnClone(element)
                          }, null, 8, ["onClick"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    ),
                    createVNode(
                      _component_UPopover,
                      { trigger: "hover" },
                      {
                        content: withCtx(() => [
                          createVNode("span", {
                            "dark:text-white": "",
                            "text-xs": "",
                            "p-1": ""
                          }, "A símbolo")
                        ]),
                        default: withCtx(() => [
                          createVNode("div", {
                            "i-solar-link-round-bold-duotone": "",
                            class: "cursor-pointer text-dark hover:text-white",
                            onClick: ($event) => fnSymbol(element, index)
                          }, null, 8, ["onClick"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    ),
                    createVNode(
                      _component_UPopover,
                      { trigger: "click" },
                      {
                        content: withCtx(() => [
                          createVNode(_component_UButton, {
                            size: "xs",
                            class: "mx-1 px-1",
                            type: "primary",
                            onClick: ($event) => fnDelete(element, index)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Eliminar bloque")
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["onClick"])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", {
                            "i-solar-trash-bin-trash-linear": "",
                            class: "cursor-pointer text-dark hover:text-white"
                          })
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    )
                  ]),
                  (openBlock(true), createBlock(
                    Fragment,
                    null,
                    renderList(Object.keys(element), (itemNest, indexNest) => {
                      return openBlock(), createBlock(
                        Fragment,
                        null,
                        [
                          unref(accordion)[moduloName + index] && !dropzones.includes(itemNest) && !noninput.includes(itemNest) ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(_component_BDModulosInputs, {
                              data: element,
                              "item-key": itemNest,
                              level: __props.level + 1
                            }, null, 8, ["data", "item-key", "level"])
                          ])) : createCommentVNode("v-if", true)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      );
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  )),
                  (openBlock(true), createBlock(
                    Fragment,
                    null,
                    renderList(Object.keys(element), (itemNest, indexNest) => {
                      return openBlock(), createBlock(
                        Fragment,
                        { key: indexNest },
                        [
                          dropzones.includes(itemNest) && Array.isArray(element[itemNest]) ? (openBlock(), createBlock(_component_BDModulosDropzones, {
                            key: 0,
                            data: element,
                            "item-key": itemNest,
                            level: __props.level + 1
                          }, null, 8, ["data", "item-key", "level"])) : createCommentVNode("v-if", true)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                2
                /* CLASS */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/BDModulosDropzones.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __unplugin_components_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/BDModulosDropzones.vue"]]);
const _sfc_main$c = {
  __name: "BDModulosInputs",
  __ssrInlineRender: true,
  props: {
    data: Object,
    itemKey: String,
    level: Number
  },
  setup(__props) {
    const props = __props;
    const moduloName = props.itemKey + "_" + props.level + "_" + Math.round(Math.random() * 100);
    const builderstore = useBuilderStore();
    const refData = ref(props.data);
    const properties = ref(false);
    const propertiesInterval = setInterval(() => {
      var _a;
      if (Object.keys(builderstore.modulosobj).length) {
        if (refData.value.block) {
          properties.value = (_a = builderstore.modulosobj[refData.value.block]) == null ? void 0 : _a.properties[props.itemKey];
        }
        clearInterval(propertiesInterval);
      }
    }, 500);
    const filesmap = computed(() => {
      return builderstore.files.map((item) => {
        return {
          label: item.name,
          value: item.url
        };
      });
    });
    const levelColor = () => {
      let col = "";
      if (props.level == 0) {
        col = "accent-500";
      }
      if (props.level == 1) {
        col = "accent-900";
      }
      if (props.level == 2) {
        col = "success-500";
      }
      if (props.level == 3) {
        col = "success-900";
      }
      if (props.level == 4) {
        col = "warning-500";
      }
      if (props.level == 5) {
        col = "warning-900";
      }
      if (props.level == 6) {
        col = "info-500";
      }
      if (props.level == 7) {
        col = "info-900";
      }
      if (props.level == 8) {
        col = "primary-500";
      }
      if (props.level == 9) {
        col = "primary-900";
      }
      return col;
    };
    const accordion = ref({});
    const dropzones = ["content", "scenes", "options"];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_USelect = resolveComponent("USelect");
      const _component_UInput = resolveComponent("UInput");
      const _component_USwitch = resolveComponent("USwitch");
      const _component_BDModulosInputs = resolveComponent("BDModulosInputs", true);
      const _component_BDModulosDropzones = __unplugin_components_0$5;
      if (__props.itemKey != "block") {
        _push(`<div${ssrRenderAttrs(mergeProps({
          "border-l-1": "",
          class: ["border-" + levelColor(), "m-0.5"],
          "text-xs": "",
          "data-level": __props.level
        }, _attrs))}><!--STRING inputs-->`);
        if (typeof unref(refData)[__props.itemKey] != "object") {
          _push(`<!--[-->`);
          if ((_a = unref(properties)) == null ? void 0 : _a.input) {
            _push(`<div class="grid grid-cols-4 items-center p-1"><!--{{itemKey}} PROPERTY #: {{ properties.input }}--><!-- FILE -->`);
            if (typeof unref(refData)[__props.itemKey] == "string") {
              _push(`<!--[--><label>${ssrInterpolate(__props.itemKey)}</label><div col-span-3>`);
              _push(ssrRenderComponent(_component_USelect, {
                modelValue: unref(refData)[__props.itemKey],
                "onUpdate:modelValue": ($event) => unref(refData)[__props.itemKey] = $event,
                options: unref(filesmap)
              }, null, _parent));
              _push(`</div><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!--[--><!--NO INPUT DEFINED --><div class="grid grid-cols-4 items-center p-1"><!-- TEXT-->`);
            if (typeof unref(refData)[__props.itemKey] == "string") {
              _push(`<!--[--><label>${ssrInterpolate(__props.itemKey)}</label><div col-span-3>`);
              _push(ssrRenderComponent(_component_UInput, {
                modelValue: unref(refData)[__props.itemKey],
                "onUpdate:modelValue": ($event) => unref(refData)[__props.itemKey] = $event,
                class: "dark:text-neutral w-full",
                size: "sm"
              }, null, _parent));
              _push(`</div><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!-- NUMBER -->`);
            if (typeof unref(refData)[__props.itemKey] == "number") {
              _push(`<!--[--><label>${ssrInterpolate(__props.itemKey)}</label><div col-span-3>`);
              _push(ssrRenderComponent(_component_UInput, {
                modelValue: unref(refData)[__props.itemKey],
                "onUpdate:modelValue": ($event) => unref(refData)[__props.itemKey] = $event,
                class: "dark:text-neutral w-full",
                size: "sm",
                type: "number"
              }, null, _parent));
              _push(`</div><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!-- boolean -->`);
            if (typeof unref(refData)[__props.itemKey] == "boolean") {
              _push(`<!--[--><label>${ssrInterpolate(__props.itemKey)}</label><div col-span-3>`);
              _push(ssrRenderComponent(_component_USwitch, {
                modelValue: unref(refData)[__props.itemKey],
                "onUpdate:modelValue": ($event) => unref(refData)[__props.itemKey] = $event,
                size: "sm"
              }, null, _parent));
              _push(`</div><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><!--]-->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!--[--><!--/ string inputs --><!-- OBJECT inputs--><div><div p-1 class="${ssrRenderClass(["bg-" + levelColor()])}" text-white cursor-pointer>${ssrInterpolate(__props.itemKey)} ${ssrInterpolate((_b = unref(properties)) == null ? void 0 : _b.input)} <!-- : {{ data[itemKey].block }} : {{ properties?.input }}--></div>`);
          if (!dropzones.includes(__props.itemKey)) {
            _push(`<!--[-->`);
            ssrRenderList(Object.keys(unref(refData)[__props.itemKey]), (keyNest, indexNested) => {
              _push(`<div style="${ssrRenderStyle(unref(accordion)[moduloName] ? null : { display: "none" })}">`);
              _push(ssrRenderComponent(_component_BDModulosInputs, {
                data: unref(refData)[__props.itemKey],
                "item-key": keyNest,
                level: __props.level + 1
              }, null, _parent));
              _push(`</div>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!--[--><!-- dropzones-->`);
            _push(ssrRenderComponent(_component_BDModulosDropzones, {
              data: unref(refData),
              "item-key": __props.itemKey,
              level: __props.level + 1
            }, null, _parent));
            _push(`<!--]-->`);
          }
          _push(`</div><!--]-->`);
        }
        _push(`<!-- /objects--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/BDModulosInputs.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/BDModulosInputs.vue"]]);
const _sfc_main$b = {
  __name: "builderDetailsContainersDraggable",
  __ssrInlineRender: true,
  props: {
    data: Object,
    keyval: String,
    level: Number,
    parent: String,
    blockparent: String
  },
  setup(__props) {
    const props = __props;
    const builderstore = useBuilderStore();
    const thelist = ref(props.data[props.keyval]);
    const dinamodel = ref({});
    const thisname = props.parent + props.level + props.keyval;
    const open = (key) => {
      dinamodel.value[key] = !dinamodel.value[key];
    };
    const drag = ref(false);
    const getRandomCharacters = (_) => "xxxx".replace(/x/g, (_2) => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.random() * 62 | 0]);
    const fnClone = (el) => {
      const newel = JSON.parse(JSON.stringify(el));
      if (!(el == null ? void 0 : el.symbol)) {
        newel["name"] = getRandomCharacters();
      }
      thelist.value.push(newel);
    };
    const fnSymbol = (el, index) => {
      if (!el.name) {
        el.name = getRandomCharacters();
      }
      const newel = JSON.parse(JSON.stringify(el));
      const thename = newel.name;
      delete newel["name"];
      builderstore.doc.content.symbols[thename] = newel;
      thelist.value[index] = {
        "symbol": thename
      };
    };
    const fnDelete = (el, index) => {
      thelist.value.splice(index, 1);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPopover = resolveComponent("UPopover");
      const _component_UButton = resolveComponent("UButton");
      const _component_BuilderDetailsContainers = __unplugin_components_1$1;
      const _component_BuilderDetailsContainersDraggable = resolveComponent("BuilderDetailsContainersDraggable", true);
      _push(ssrRenderComponent(unref(draggable), mergeProps({
        list: unref(thelist),
        group: { name: "people", pull: true, put: true },
        "item-key": "name",
        class: ["ml-1"],
        onStart: ($event) => drag.value = true,
        onEnd: ($event) => drag.value = false,
        handle: ".handle"
      }, _attrs), {
        item: withCtx(({ element, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(["!aspect-auto rounded-sm bg-slate-600/10 ring-1 ring-slate-300 p-1 mb-0.5  transition-all", unref(dinamodel)[thisname + index] ? "shadow !bg-slate-600/30 ring-primary ring-1 !my-2" : "", unref(drag) ? "ring-4" : ""])}"${_scopeId}><div flex gap-1 items-center justify-between class="${ssrRenderClass([" p-1 rounded-sm", unref(dinamodel)[thisname + index] ? "bg-slate-800/50 text-white" : "bg-gradient-to-r from-teal-300 to-primary-300"])}"${_scopeId}><div class="handle flex gap-1 items-center justify-between grow px-1 cursor-grab"${_scopeId}>`);
            if (element == null ? void 0 : element.symbol) {
              _push2(`<!--[--><div${_scopeId}>symbol</div><div${_scopeId}>${ssrInterpolate(element.symbol)}</div><!--]-->`);
            } else {
              _push2(`<!--[--><div${_scopeId}>${ssrInterpolate(element.block)}</div><div${_scopeId}>${ssrInterpolate(element.name)}</div><!--]-->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UPopover, { trigger: "hover" }, {
              content: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span dark:text-white text-xs p-1${_scopeId2}>Duplicar</span>`);
                } else {
                  return [
                    createVNode("span", {
                      "dark:text-white": "",
                      "text-xs": "",
                      "p-1": ""
                    }, "Duplicar")
                  ];
                }
              }),
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-solar-copy-line-duotone class="cursor-pointer hover:text-white"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      "i-solar-copy-line-duotone": "",
                      class: "cursor-pointer hover:text-white",
                      onClick: ($event) => fnClone(element)
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UPopover, { trigger: "hover" }, {
              content: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span dark:text-white text-xs p-1${_scopeId2}>A símbolo</span>`);
                } else {
                  return [
                    createVNode("span", {
                      "dark:text-white": "",
                      "text-xs": "",
                      "p-1": ""
                    }, "A símbolo")
                  ];
                }
              }),
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-solar-link-round-bold-duotone class="cursor-pointer hover:text-white"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      "i-solar-link-round-bold-duotone": "",
                      class: "cursor-pointer hover:text-white",
                      onClick: ($event) => fnSymbol(element, index)
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UPopover, { trigger: "click" }, {
              content: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    size: "xs",
                    class: "mx-1 px-1",
                    type: "primary",
                    onClick: ($event) => fnDelete(element, index)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Eliminar bloque`);
                      } else {
                        return [
                          createTextVNode("Eliminar bloque")
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      size: "xs",
                      class: "mx-1 px-1",
                      type: "primary",
                      onClick: ($event) => fnDelete(element, index)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Eliminar bloque")
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["onClick"])
                  ];
                }
              }),
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-solar-trash-bin-trash-linear class="cursor-pointer hover:text-white"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      "i-solar-trash-bin-trash-linear": "",
                      class: "cursor-pointer hover:text-white"
                    })
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(dinamodel)[thisname + index]) {
              _push2(`<div${_scopeId}><!--[-->`);
              ssrRenderList(Object.keys(element), (keyval2, index2) => {
                _push2(ssrRenderComponent(_component_BuilderDetailsContainers, {
                  "text-dark": "",
                  key: index2,
                  data: element,
                  keyval: keyval2,
                  parent: __props.keyval,
                  level: __props.level + 1,
                  blockparent: __props.blockparent
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- //FIXME: OPTIONS DESAPARECE --><!--
          {{ Array.isArray(element.content) || Array.isArray(element.options) }}
          <div v-if="element.options">{{ element.options }} {{thelist}}</div>
        -->`);
            if (Array.isArray(element.content) || Array.isArray(element.options)) {
              _push2(ssrRenderComponent(_component_BuilderDetailsContainersDraggable, {
                data: element,
                keyval: __props.keyval,
                level: __props.level,
                parent: __props.parent,
                blockparent: __props.blockparent
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(
                "div",
                {
                  class: ["!aspect-auto rounded-sm bg-slate-600/10 ring-1 ring-slate-300 p-1 mb-0.5  transition-all", unref(dinamodel)[thisname + index] ? "shadow !bg-slate-600/30 ring-primary ring-1 !my-2" : "", unref(drag) ? "ring-4" : ""]
                },
                [
                  createVNode(
                    "div",
                    {
                      flex: "",
                      "gap-1": "",
                      "items-center": "",
                      "justify-between": "",
                      class: [" p-1 rounded-sm", unref(dinamodel)[thisname + index] ? "bg-slate-800/50 text-white" : "bg-gradient-to-r from-teal-300 to-primary-300"]
                    },
                    [
                      createVNode("div", {
                        onClick: ($event) => open(thisname + index),
                        class: "handle flex gap-1 items-center justify-between grow px-1 cursor-grab"
                      }, [
                        (element == null ? void 0 : element.symbol) ? (openBlock(), createBlock(
                          Fragment,
                          { key: 0 },
                          [
                            createVNode("div", null, "symbol"),
                            createVNode(
                              "div",
                              null,
                              toDisplayString(element.symbol),
                              1
                              /* TEXT */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        )) : (openBlock(), createBlock(
                          Fragment,
                          { key: 1 },
                          [
                            createVNode(
                              "div",
                              null,
                              toDisplayString(element.block),
                              1
                              /* TEXT */
                            ),
                            createVNode(
                              "div",
                              null,
                              toDisplayString(element.name),
                              1
                              /* TEXT */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ], 8, ["onClick"]),
                      createVNode(
                        _component_UPopover,
                        { trigger: "hover" },
                        {
                          content: withCtx(() => [
                            createVNode("span", {
                              "dark:text-white": "",
                              "text-xs": "",
                              "p-1": ""
                            }, "Duplicar")
                          ]),
                          default: withCtx(() => [
                            createVNode("div", {
                              "i-solar-copy-line-duotone": "",
                              class: "cursor-pointer hover:text-white",
                              onClick: ($event) => fnClone(element)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                          /* DYNAMIC */
                        },
                        1024
                        /* DYNAMIC_SLOTS */
                      ),
                      createVNode(
                        _component_UPopover,
                        { trigger: "hover" },
                        {
                          content: withCtx(() => [
                            createVNode("span", {
                              "dark:text-white": "",
                              "text-xs": "",
                              "p-1": ""
                            }, "A símbolo")
                          ]),
                          default: withCtx(() => [
                            createVNode("div", {
                              "i-solar-link-round-bold-duotone": "",
                              class: "cursor-pointer hover:text-white",
                              onClick: ($event) => fnSymbol(element, index)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                          /* DYNAMIC */
                        },
                        1024
                        /* DYNAMIC_SLOTS */
                      ),
                      createVNode(
                        _component_UPopover,
                        { trigger: "click" },
                        {
                          content: withCtx(() => [
                            createVNode(_component_UButton, {
                              size: "xs",
                              class: "mx-1 px-1",
                              type: "primary",
                              onClick: ($event) => fnDelete(element, index)
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Eliminar bloque")
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["onClick"])
                          ]),
                          default: withCtx(() => [
                            createVNode("div", {
                              "i-solar-trash-bin-trash-linear": "",
                              class: "cursor-pointer hover:text-white"
                            })
                          ]),
                          _: 2
                          /* DYNAMIC */
                        },
                        1024
                        /* DYNAMIC_SLOTS */
                      )
                    ],
                    2
                    /* CLASS */
                  ),
                  unref(dinamodel)[thisname + index] ? (openBlock(), createBlock("div", { key: 0 }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(Object.keys(element), (keyval2, index2) => {
                        return openBlock(), createBlock(_component_BuilderDetailsContainers, {
                          "text-dark": "",
                          key: index2,
                          data: element,
                          keyval: keyval2,
                          parent: __props.keyval,
                          level: __props.level + 1,
                          blockparent: __props.blockparent
                        }, null, 8, ["data", "keyval", "parent", "level", "blockparent"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])) : createCommentVNode("v-if", true),
                  createCommentVNode(" //FIXME: OPTIONS DESAPARECE "),
                  createCommentVNode('\n          {{ Array.isArray(element.content) || Array.isArray(element.options) }}\n          <div v-if="element.options">{{ element.options }} {{thelist}}</div>\n        '),
                  Array.isArray(element.content) || Array.isArray(element.options) ? (openBlock(), createBlock(_component_BuilderDetailsContainersDraggable, {
                    key: 1,
                    data: element,
                    keyval: __props.keyval,
                    level: __props.level,
                    parent: __props.parent,
                    blockparent: __props.blockparent
                  }, null, 8, ["data", "keyval", "level", "parent", "blockparent"])) : createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsContainersDraggable.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __unplugin_components_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsContainersDraggable.vue"]]);
const _sfc_main$a = {
  __name: "builderDetailsContainers",
  __ssrInlineRender: true,
  props: {
    data: Object,
    keyval: String,
    level: Number,
    parent: String,
    blockparent: String
  },
  setup(__props) {
    const props = __props;
    const thedata = ref(props.data);
    const dinamodel = ref({});
    const thisname = props.parent + props.level + props.keyval;
    ref(false);
    const editable = () => {
      let vis = true;
      if (props.keyval == "block")
        vis = false;
      return vis;
    };
    const classFN = ref(null);
    watch(classFN, (nucl, oldw) => {
      if (classFN.value.length) {
        props.data[props.keyval] = classFN.value.join(" ");
      }
    }, { deep: true });
    if (props.keyval == "class") {
      let classFNval = props.data[props.keyval].trim().split(" ");
      if (classFNval.length == 1 && classFNval[0] == "") {
        classFNval = [];
      }
      classFN.value = classFNval;
    }
    const symbolReplaceFN = ref();
    const symbolReplaceNew = () => {
      thedata.value[symbolReplaceFN.value] = "";
      symbolReplaceFN.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTag = resolveComponent("UTag");
      const _component_UDynamicTags = resolveComponent("UDynamicTags");
      const _component_UInput = resolveComponent("UInput");
      const _component_USwitch = resolveComponent("USwitch");
      const _component_BuilderDetailsContainers = resolveComponent("BuilderDetailsContainers", true);
      const _component_UButton = resolveComponent("UButton");
      const _component_BuilderDetailsContainersDraggable = __unplugin_components_0$4;
      if (editable()) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          "my-0.5": "",
          "p-0.5": "",
          "text-xs": "",
          class: [`ml-${__props.level * 0.5}`, unref(dinamodel)[__props.keyval] ? "bg-slate-900/60 text-primary-100 text-bold" : "bg-slate-100 text-dark"],
          "data-level": "level"
        }, _attrs))}>`);
        if (typeof unref(thedata)[__props.keyval] == "string") {
          _push(`<label flex flex-wrap items-center>`);
          _push(ssrRenderComponent(_component_UTag, {
            size: "sm",
            type: "info"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.keyval)}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(__props.keyval),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          if (__props.keyval == "class") {
            _push(ssrRenderComponent(_component_UDynamicTags, {
              modelValue: unref(classFN),
              "onUpdate:modelValue": ($event) => isRef(classFN) ? classFN.value = $event : null,
              "text-dark": "",
              size: "sm",
              "mx-1": ""
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_UInput, {
              modelValue: unref(thedata)[__props.keyval],
              "onUpdate:modelValue": ($event) => unref(thedata)[__props.keyval] = $event,
              "text-dark": "",
              size: "sm",
              "mx-1": ""
            }, null, _parent));
          }
          _push(`</label>`);
        } else {
          _push(`<!---->`);
        }
        if (typeof unref(thedata)[__props.keyval] == "boolean") {
          _push(ssrRenderComponent(_component_USwitch, {
            modelValue: unref(thedata)[__props.keyval],
            "onUpdate:modelValue": ($event) => unref(thedata)[__props.keyval] = $event,
            size: "sm"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span${_scopeId}>${ssrInterpolate(__props.keyval)}</span>`);
              } else {
                return [
                  createVNode(
                    "span",
                    null,
                    toDisplayString(__props.keyval),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (typeof unref(thedata)[__props.keyval] == "number") {
          _push(`<label flex items-center><span>${ssrInterpolate(__props.keyval)}</span>`);
          _push(ssrRenderComponent(_component_UInput, {
            modelValue: unref(thedata)[__props.keyval],
            "onUpdate:modelValue": ($event) => unref(thedata)[__props.keyval] = $event,
            "text-dark": "",
            size: "sm",
            type: "number",
            "mx-1": ""
          }, null, _parent));
          _push(`</label>`);
        } else {
          _push(`<!---->`);
        }
        if (typeof unref(thedata)[__props.keyval] == "object" && !Array.isArray(unref(thedata)[__props.keyval])) {
          _push(`<!--[--><div size="sm" w-full mx-1 cursor-pointer flex>`);
          if (unref(dinamodel)[__props.keyval]) {
            _push(`<div i-solar:arrow-down-bold></div>`);
          } else {
            _push(`<div i-solar:alt-arrow-right-line-duotone></div>`);
          }
          _push(` ${ssrInterpolate(__props.keyval)}</div>`);
          if (unref(dinamodel)[__props.keyval]) {
            _push(`<div class="bg-slate-100/50 m-1"><!--[-->`);
            ssrRenderList(Object.keys(unref(thedata)[__props.keyval]), (keyval2, index) => {
              _push(ssrRenderComponent(_component_BuilderDetailsContainers, {
                key: index,
                data: unref(thedata)[__props.keyval],
                keyval: keyval2,
                parent: __props.keyval,
                level: __props.level + 1,
                blockparent: __props.blockparent
              }, null, _parent));
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (__props.keyval == "symbol") {
          _push(`<div bg-primary p-1 w-full> Reemplazos: <div class="flex gap-1 px-1 m-1">`);
          _push(ssrRenderComponent(_component_UInput, {
            modelValue: unref(symbolReplaceFN),
            "onUpdate:modelValue": ($event) => isRef(symbolReplaceFN) ? symbolReplaceFN.value = $event : null,
            placeholder: "Campo",
            size: "xs"
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            type: "secondary",
            disabled: !unref(symbolReplaceFN),
            onClick: symbolReplaceNew
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`+`);
              } else {
                return [
                  createTextVNode("+")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (typeof unref(thedata)[__props.keyval] == "object" && Array.isArray(unref(thedata)[__props.keyval]) && __props.parent != "content") {
          _push(`<!--[--><div class="flex bg-slate-1 text-dark w-fit rounded-t pt-0.5 px-2"><div i-solar-list-arrow-down-minimalistic-bold-duotone></div> ${ssrInterpolate(__props.keyval)}</div>`);
          _push(ssrRenderComponent(_component_BuilderDetailsContainersDraggable, {
            key: thisname,
            data: unref(thedata),
            keyval: __props.keyval,
            level: __props.level,
            parent: __props.parent,
            blockparent: __props.blockparent
          }, null, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsContainers.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __unplugin_components_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsContainers.vue"]]);
const _sfc_main$9 = {
  __name: "builderDetailsBlocks",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    const drag = ref(false);
    const modules = ref();
    async function loadModulos() {
      modules.value = await builderstore.loadModulos();
    }
    const getRandomCharacters = (_) => "xxxx".replace(/x/g, (_2) => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.random() * 62 | 0]);
    function clonedModule(i) {
      const props = JSON.parse(JSON.stringify(i.schema.properties));
      const item = {};
      Object.keys(i.schema.properties).forEach((el) => {
        const prop = props[el];
        if (prop.type == "string") {
          item[el] = "";
        }
        if (prop.type == "boolean") {
          item[el] = false;
        }
        if (prop.type == "array") {
          item[el] = [];
        }
        if (prop.default) {
          item[el] = prop.default;
        }
      });
      item["block"] = i.name;
      item["name"] = getRandomCharacters();
      return item;
    }
    loadModulos();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(draggable), mergeProps({
        list: unref(modules),
        group: { name: "people", pull: "clone", put: false },
        "item-key": "id",
        class: ["grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-0.5 p-0.5", unref(drag) ? "bg-pink" : ""],
        sort: false,
        clone: clonedModule,
        onStart: ($event) => drag.value = true,
        onEnd: ($event) => drag.value = false
      }, _attrs), {
        item: withCtx(({ element }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttr("title", element.name)} flex flex-col cursor-grab items-center justify-center bg-white dark:bg-slate-8${_scopeId}><div${_scopeId}>${element.icon}</div><span class="text-[8px]"${_scopeId}>${ssrInterpolate(element.name)}</span></div>`);
          } else {
            return [
              createVNode("div", {
                title: element.name,
                flex: "",
                "flex-col": "",
                "cursor-grab": "",
                "items-center": "",
                "justify-center": "",
                "bg-white": "",
                "dark:bg-slate-8": ""
              }, [
                createVNode("div", {
                  innerHTML: element.icon
                }, null, 8, ["innerHTML"]),
                createVNode(
                  "span",
                  { class: "text-[8px]" },
                  toDisplayString(element.name),
                  1
                  /* TEXT */
                )
              ], 8, ["title"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsBlocks.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __unplugin_components_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsBlocks.vue"]]);
const _sfc_main$8 = {
  __name: "builderDetailsModulos",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    ref(false);
    ref();
    const contentModel = ref(builderstore.doc ? builderstore.doc.content : "");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BuilderDetailsBlocks = __unplugin_components_0$3;
      const _component_BuilderDetailsContainers = __unplugin_components_1$1;
      const _component_BDModulosInputs = __unplugin_components_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ relative: "" }, _attrs))}><div sticky top-0 z-10 bg-slate-800>`);
      _push(ssrRenderComponent(_component_BuilderDetailsBlocks, null, null, _parent));
      _push(`</div><div class="bg-slate-300 dark:bg-slate-700 p-0.5"><!--[-->`);
      ssrRenderList(Object.keys(unref(contentModel)), (key, index) => {
        _push(ssrRenderComponent(_component_BuilderDetailsContainers, {
          data: unref(contentModel),
          keyval: key,
          level: 1,
          blockparent: key
        }, null, _parent));
      });
      _push(`<!--]--></div><div bg-slate-100 dark:bg-slate-900><!--[-->`);
      ssrRenderList(Object.keys(unref(contentModel)), (key, index) => {
        _push(ssrRenderComponent(_component_BDModulosInputs, {
          data: unref(contentModel),
          "item-key": key,
          level: 0
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsModulos.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __unplugin_components_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsModulos.vue"]]);
const _sfc_main$7 = {
  __name: "builderDetails",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BuilderDetailsModulos = __unplugin_components_0$2;
      const _component_BuilderDetailsCodigo = __unplugin_components_1$2;
      const _component_BuilderDetailsPrompts = __unplugin_components_2$1;
      const _component_BuilderDetailsAssets = __unplugin_components_3;
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: "w-2/6",
        "bg-slate-5": "",
        "h-screen": "",
        flex: "",
        "flex-col": ""
      }, _attrs))}><header p-2 text-center text-xs text-white>${ssrInterpolate(unref(builderstore).menu.name)}</header><section bg-slate-800 overflow-x-hidden overflow-y-auto fle>`);
      if (unref(builderstore).menu.id == "modulos") {
        _push(ssrRenderComponent(_component_BuilderDetailsModulos, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(builderstore).menu.id == "codigo") {
        _push(ssrRenderComponent(_component_BuilderDetailsCodigo, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(builderstore).menu.id == "prompts") {
        _push(ssrRenderComponent(_component_BuilderDetailsPrompts, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(builderstore).menu.id == "assets") {
        _push(ssrRenderComponent(_component_BuilderDetailsAssets, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section></aside>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetails.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetails.vue"]]);
const _sfc_main$6 = {
  __name: "builderMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    const buttons = ref([
      { name: "Módulos", id: "modulos", icon: "i-solar:box-minimalistic-broken" },
      { name: "Código", id: "codigo", icon: "i-solar:code-2-bold-duotone" },
      { name: "Prompts", id: "prompts", icon: "i-solar:chat-square-call-line-duotone" },
      { name: "Assets", id: "assets", icon: "i-solar:file-smile-broken" }
    ]);
    const currentbutton = ref(buttons.value[0]);
    builderstore.menu = currentbutton.value;
    const saveToast = ref();
    const saveLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UToast = resolveComponent("UToast");
      _push(`<aside${ssrRenderAttrs(mergeProps({
        "w-10": "",
        flex: "",
        "flex-col": "",
        "gap-2": "",
        "bg-slate-8": "",
        "text-white": ""
      }, _attrs))}><!--[-->`);
      ssrRenderList(unref(buttons), (item, index) => {
        _push(`<div${ssrRenderAttr("title", item.name)} class="${ssrRenderClass([[unref(currentbutton) === item ? "bg-slate-5" : ""], "aspect-square flex cursor-pointer items-center justify-center hover:text-amber"])}"><div class="${ssrRenderClass(item.icon)}"></div></div>`);
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_UToast, {
        ref_key: "saveToast",
        ref: saveToast,
        position: "bottom",
        align: "left"
      }, null, _parent));
      _push(`<div title="Sincronizar" class="mt-auto aspect-square flex cursor-pointer items-center justify-center bg-stone-5 hover:bg-amber"><div class="i-solar-refresh-circle-line-duotone"></div></div><div title="Guardar" class="aspect-square flex cursor-pointer items-center justify-center bg-cyan-5 hover:bg-amber">`);
      if (!unref(saveLoading)) {
        _push(`<div class="i-solar:diskette-broken"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(saveLoading)) {
        _push(`<div class="i-solar-diskette-bold animate-spin"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div title="Descargar" class="aspect-square flex cursor-pointer items-center justify-center bg-emerald-5 hover:bg-amber"><div class="i-solar:cloud-check-linear"></div></div></aside>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderMenu.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __unplugin_components_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderMenu.vue"]]);
const _sfc_main$5 = {
  __name: "builder",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BuilderMenu = __unplugin_components_0$1;
      const _component_BuilderDetails = __unplugin_components_1;
      const _component_RouterView = resolveComponent("RouterView");
      _push(`<main${ssrRenderAttrs(mergeProps({
        "h-screen": "",
        "w-screen": "",
        flex: ""
      }, _attrs))}>`);
      if (unref(builderstore).doc) {
        _push(ssrRenderComponent(_component_BuilderMenu, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(builderstore).doc) {
        _push(ssrRenderComponent(_component_BuilderDetails, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_RouterView, null, null, _parent));
      _push(`</main>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layouts/builder.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __layout_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/layouts/builder.vue"]]);
const _sfc_main$4 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_RouterView = resolveComponent("RouterView");
  _push(`<main${ssrRenderAttrs(mergeProps({
    "px-4": "",
    "py-10": "",
    text: "center gray-700 dark:gray-200"
  }, _attrs))}>`);
  _push(ssrRenderComponent(_component_RouterView, null, null, _parent));
  _push(`</main>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layouts/default.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __layout_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1], ["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/layouts/default.vue"]]);
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_RouterView = resolveComponent("RouterView");
  _push(`<main${ssrRenderAttrs(mergeProps({
    "px-4": "",
    "py-10": "",
    text: "center gray-700 dark:gray-200"
  }, _attrs))}>`);
  _push(ssrRenderComponent(_component_RouterView, null, null, _parent));
  _push(`<!--
    <TheFooter />

    <div mx-auto mt-5 text-center text-sm opacity-50>
      [Home Layout]
    </div>
    --></main>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layouts/home.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __layout_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender], ["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/layouts/home.vue"]]);
const layouts = {
  "404": __layout_0,
  "builder": __layout_1,
  "default": __layout_2,
  "home": __layout_3
};
function setupLayouts(routes2) {
  return routes2.map((route) => {
    var _a;
    return {
      path: route.path,
      meta: route.meta,
      component: layouts[((_a = route.meta) == null ? void 0 : _a.layout) || "default"],
      children: route.path === "/" ? [route] : [{ ...route, path: "" }]
    };
  });
}
const isDark = useDark();
useToggle(isDark);
const preferredDark = usePreferredDark();
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "BlueMaker",
      meta: [
        { name: "description", content: "Welcome" },
        {
          name: "theme-color",
          content: () => isDark.value ? "#00aba9" : "#ffffff"
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: () => preferredDark.value ? "/favicon-dark.svg" : "/favicon.svg"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterView = resolveComponent("RouterView");
      _push(ssrRenderComponent(_component_RouterView, _attrs, null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/App.vue"]]);
const _sfc_main$1 = {
  __name: "UserAuth",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const email = ref("");
    const sent = ref("");
    const router = useRouter();
    const route = useRoute();
    supabase.auth.onAuthStateChange((_, _session) => {
      if (_session && route.path == "/")
        router.push("/dashboard");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({
        "mx-auto": "",
        "my-10": "",
        "max-w-xs": "",
        rounded: "",
        "bg-slate-9": "",
        "p-5": "",
        "shadow-xl": ""
      }, _attrs))}><input${ssrRenderAttr("value", unref(email))} class="inputField dark:text-neutral" required rounded p-2 text-center type="email" placeholder="Tu correo"><input mt-5 cursor-pointer rounded bg-slate-5 p-2 text-xs font-bold text-slate-1 hover:bg-blue-3 type="submit"${ssrRenderAttr("value", unref(loading) ? "Procesando" : "Enviar acceso por correo")}${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>`);
      if (unref(sent)) {
        _push(`<div pt-2 text-xs text-white>${ssrInterpolate(unref(sent))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UserAuth.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/UserAuth.vue"]]);
const favicon = "/assets/favicon-8ecc0abb.svg";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "IndexPage"
  },
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useUserStore();
    ref(user.savedName);
    useRouter();
    useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserAuth = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div text-4xl><img${ssrRenderAttr("src", unref(favicon))} alt="BlueMaker" mx-auto w-12></div><p font-bold> BlueMaker </p>`);
      _push(ssrRenderComponent(_component_UserAuth, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const block0 = {};
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __pages_import_1__ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/pages/index.vue"]]);
const __pages_import_0__ = () => import("./assets/index-1faf67da.js");
const __pages_import_2__ = () => import("./assets/dashboard-5ee100f6.js");
const __pages_import_3__ = () => import("./assets/about-a2b812f0.js");
const __pages_import_4__ = () => import("./assets/README-375df591.js");
const __pages_import_5__ = () => import("./assets/_...all_-02ecb124.js");
const __pages_import_6__ = () => import("./assets/_name_-dcde4e5f.js");
const __pages_import_7__ = () => import("./assets/_key_-552ca550.js");
const routes$1 = [{ "name": "riodas", "path": "/riodas", "component": __pages_import_0__, "props": true, "meta": { "layout": "builder", "requiresAuth": true } }, { "name": "index", "path": "/", "component": __pages_import_1__, "props": true, "meta": { "layout": "home", "requiresAuth": false } }, { "name": "dashboard", "path": "/dashboard", "component": __pages_import_2__, "props": true, "meta": { "layout": "default", "requiresAuth": true } }, { "name": "about", "path": "/about", "component": __pages_import_3__, "props": true }, { "name": "README", "path": "/readme", "component": __pages_import_4__, "props": true }, { "name": "all", "path": "/:all(.*)*", "component": __pages_import_5__, "props": true, "meta": { "layout": 404 } }, { "name": "hi-name", "path": "/hi/:name", "component": __pages_import_6__, "props": true }, { "name": "riodas-key", "path": "/riodas/:key", "component": __pages_import_7__, "props": true, "meta": { "layout": "builder", "requiresAuth": true } }];
const main = "";
const __uno = "";
const routes = setupLayouts(routes$1);
const createApp = ViteSSG(
  App,
  { routes, base: "/" },
  (ctx) => {
    Object.values(/* @__PURE__ */ Object.assign({ "./modules/i18n.ts": __vite_glob_0_0, "./modules/nprogress.ts": __vite_glob_0_1, "./modules/pinia.ts": __vite_glob_0_2, "./modules/pwa.ts": __vite_glob_0_3, "./modules/router.ts": __vite_glob_0_4, "./modules/supabase.ts": __vite_glob_0_5, "./modules/unocssui.ts": __vite_glob_0_6 })).forEach((i) => {
      var _a;
      return (_a = i.install) == null ? void 0 : _a.call(i, ctx);
    });
  }
);
export {
  _export_sfc as _,
  useUserStore as a,
  block0 as b,
  useI18n as c,
  createApp,
  favicon as f,
  supabase as s,
  useBuilderStore as u
};
