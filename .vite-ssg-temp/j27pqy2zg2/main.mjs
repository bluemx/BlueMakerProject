import { makeSymbol, assign, isNumber, isString, isObject, isBoolean, warn, isEmptyObject, createEmitter, getGlobalThis, format, isArray, isPlainObject, isRegExp, isFunction, inBrowser, hasOwn } from "@intlify/shared";
import { CoreWarnCodes, CompileErrorCodes, registerMessageResolver, resolveValue, registerLocaleFallbacker, fallbackWithLocaleChain, setDevToolsHook, createCompileError, DEFAULT_LOCALE, updateFallbackLocale, NUMBER_FORMAT_OPTIONS_KEYS, DATETIME_FORMAT_OPTIONS_KEYS, setFallbackContext, createCoreContext, clearDateTimeFormat, clearNumberFormat, setAdditionalMeta, getFallbackContext, NOT_REOSLVED, isTranslateFallbackWarn, isTranslateMissingWarn, parseTranslateArgs, translate, MISSING_RESOLVE_VALUE, parseDateTimeArgs, datetime, parseNumberArgs, number } from "@intlify/core-base";
import { h, getCurrentInstance, effectScope, inject, onMounted, onUnmounted, ref, computed, watch, Fragment, isRef, createVNode, Text, defineComponent, resolveComponent, mergeProps, unref, useSSRContext, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, renderList, withDirectives, vModelText } from "vue";
import { setupDevtoolsPlugin } from "@vue/devtools-api";
import { VueDevToolsLabels, VueDevToolsPlaceholders, VueDevToolsTimelineColors } from "@intlify/vue-devtools";
import NProgress from "nprogress";
import { createPinia, defineStore, storeToRefs } from "pinia";
import { createClient } from "@supabase/supabase-js";
import unocssui, { UInput } from "unocss-ui";
import { ViteSSG } from "vite-ssg";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import JSZipUtils from "jszip-utils";
import saveAs from "file-saver";
import { Configuration, OpenAIApi } from "openai";
import { Vue3JsonEditor } from "vue3-json-editor";
import draggable from "vuedraggable";
import { useClipboard, useStorage, useDark, useToggle, usePreferredDark } from "@vueuse/core";
import { UseDraggable } from "@vueuse/components";
import { useHead } from "@vueuse/head";
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
const _sfc_main$m = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layouts/404.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const __layout_0 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/layouts/404.vue"]]);
const useBuilderStore = defineStore("builder", () => {
  const router = useRouter();
  const type = ref(null);
  const doc = ref(null);
  const files = ref();
  const dockey = ref();
  const menu = ref(null);
  const modulos = ref();
  const modulosobj = ref({});
  const usertemplates = ref([]);
  const getUserTemplates = async () => {
    const { data: usertemplates2, error } = await supabase.from("usertemplates").select("*").eq("type", type.value);
    usertemplates2.value = usertemplates2;
    return usertemplates2;
  };
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
    console.log("guardando...", doc.value);
    await supabase.from("documents").update(doc.value).eq("key", dockey.value);
  };
  const downloadDoc = () => {
  };
  const loadModulos = async () => {
    const { data: modulos2, error } = await supabase.from("modulos").select("*").eq("type", type.value);
    modulos2.value = modulos2;
    modulos2 == null ? void 0 : modulos2.forEach((i) => {
      modulosobj.value[i.name] = { ...i.schema, icon: i.icon, color: i.color };
    });
    return modulos2;
  };
  const blockprops = (blockname) => {
    return modulosobj.value[blockname];
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
  const urlToPromise = async (url) => {
    return new Promise(function(resolve, reject) {
      JSZipUtils.getBinaryContent(url, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
  const download = async () => {
    const JSZip = await import("jszip/dist/jszip.js");
    console.trace("download()");
    const zip = new JSZip.default();
    console.trace("new JSZip");
    let document2 = JSON.stringify(doc.value.content);
    var mainfolder = zip.folder(dockey.value);
    var filesfolder = mainfolder.folder("files");
    console.trace("document + folders");
    files.value.forEach((file) => {
      console.trace("files foreach", file.name);
      document2 = document2.replaceAll(file.url, "files/" + file.name);
      filesfolder.file(
        file.name,
        urlToPromise(file.url),
        { binary: true }
      );
    });
    mainfolder.file("oda.json", document2);
    console.trace("added document");
    zip.generateAsync({ type: "blob" }).then(function(content) {
      saveAs(content, dockey.value + ".zip");
      console.trace("saveAs");
    });
  };
  return { menu, usertemplates, type, doc, dockey, files, modulos, modulosobj, newDoc, loadDoc, getContent, updateAssets, saveDoc, downloadDoc, loadModulos, metadata, download, blockprops, getUserTemplates };
});
const _sfc_main$l = {
  __name: "AudioToAssets",
  __ssrInlineRender: true,
  props: {
    item: Object
  },
  setup(__props) {
    const props = __props;
    const builderstore = useBuilderStore();
    const router = useRoute();
    const stored = ref(false);
    const name = ref("");
    const loading = ref(false);
    ref(false);
    const save = async () => {
      fetchFileFromURL(props.item.audioUrl).then(uploadFile).catch(console.error);
    };
    const fetchFileFromURL = async (url, filename) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      const blob = await response.blob();
      blob.name = name.value + ".mp3";
      return blob;
    };
    const uploadFile = async (file) => {
      loading.value = true;
      await supabase.storage.from(builderstore.type).upload(router.params.key + "/" + file.name, file, {
        cacheControl: "3600",
        upsert: false
      });
      builderstore.updateAssets();
      name.value = "";
      loading.value = false;
      stored.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = resolveComponent("UInput");
      const _component_UButton = resolveComponent("UButton");
      if (!unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-1" }, _attrs))}><div class="text-xs flex justify-between gap-1"><div>Nombre de archivo:</div></div>`);
        if (!unref(stored)) {
          _push(`<div class="flex mt-1 gap-1">`);
          _push(ssrRenderComponent(_component_UInput, {
            size: "sm",
            modelValue: unref(name),
            "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
            placeholder: "Nombre de template",
            class: "text-neutral"
          }, {
            append: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`.mp3`);
              } else {
                return [
                  createTextVNode(".mp3")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          if (unref(name).length > 2) {
            _push(ssrRenderComponent(_component_UButton, {
              size: "sm",
              color: "primary",
              onClick: save
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Guardar`);
                } else {
                  return [
                    createTextVNode("Guardar")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="text-center text-amber">${ssrInterpolate(unref(name))} guardado</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-1" }, _attrs))}><div class="text-center text-accent-100">Guardando en assets</div></div>`);
      }
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/AudioToAssets.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __unplugin_components_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/AudioToAssets.vue"]]);
const _sfc_main$k = {
  __name: "builderDetailsAudios",
  __ssrInlineRender: true,
  setup(__props) {
    const playuid = "8KzIuwwb8NaDGI54pmlEgMB0vIt1";
    const playsk = "d624b1bc7b6c4e72948946c292e0c08f";
    const playOptions = {
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "AUTHORIZATION": "Bearer " + playsk,
        "X-USER-ID": playuid
      }
    };
    useBuilderStore();
    const voices = ref([]);
    const loading = ref(false);
    const loadVoices = () => {
      const options = { ...playOptions, method: "GET" };
      fetch("https://play.ht/api/v1/getVoices", options).then((response) => response.json()).then((response) => {
        voices.value = response.voices;
      }).catch((err) => console.error(err));
    };
    const audiofiles = ref([]);
    const voicesGenderFilter = ref("-");
    const voicesLanguageFilter = ref("en-US");
    const voicesNameFilter = ref("");
    const voicesFilter = computed(() => {
      const filteredGender = () => {
        let res = [];
        if (voicesGenderFilter.value == "-") {
          res = voices.value;
        } else {
          res = voices.value.filter((item) => {
            return item.gender.toLowerCase() == voicesGenderFilter.value.toLowerCase();
          });
        }
        return res;
      };
      const filteredLang = filteredGender().filter((item) => {
        return item.languageCode.toLowerCase() == voicesLanguageFilter.value.toLowerCase();
      });
      const filteredName = filteredLang.filter((item) => {
        return item.name.toLowerCase().includes(voicesNameFilter.value.toLowerCase());
      });
      return filteredName;
    });
    const generateAudio = async () => {
      console.log("generateAudio()");
      loading.value = true;
      var options = {
        ...playOptions,
        method: "POST",
        body: JSON.stringify({
          content: [content.value],
          voice: voice.value.value,
          title: file.value || "abc",
          //narrationStyle: false,
          globalSpeed: "100%",
          //pronunciations: [],
          trimSilence: true
          //transcriptionvalue: 'string'
        })
      };
      fetch("https://play.ht/api/v1/convert", options).then((response) => response.json()).then((response) => {
        if (response.status == "CREATED") {
          console.log("created");
          checkForFileConvertion(response.transcriptionId, options);
        }
      }).catch((err) => console.error(err));
    };
    const checkForFileConvertion = (transcriptionId, options) => {
      console.log("checking");
      var options = { ...playOptions, method: "GET" };
      fetch("https://play.ht/api/v1/articleStatus?transcriptionId=" + transcriptionId, options).then((responseFile) => responseFile.json()).then((responseFile) => {
        if (responseFile.converted) {
          console.log("file:", responseFile);
          const thefile = {
            ...responseFile,
            voice: voice.value,
            content: content.value
          };
          audiofiles.value.push(thefile);
          loading.value = false;
        } else {
          setTimeout(() => {
            console.log("check again...");
            checkForFileConvertion(transcriptionId, options);
          }, 1e3);
        }
      }).catch((errFile) => console.error(errFile));
    };
    const file = ref("instruccion");
    const content = ref("");
    const voice = ref({ "value": "en-US-SaraNeural", "name": "Sara", "language": "English (US)", "voiceType": "Neural", "languageCode": "en-US", "gender": "Female", "service": "ms", "styles": ["angry", "cheerful", "excited", "friendly", "hopeful", "sad", "shouting", "terrified", "unfriendly", "whispering"], "sample": "https://media.play.ht/full_-MmMggzQYiUs1EbXmmEv.wav" });
    const playudio = (theid) => {
      document.querySelectorAll("audio").forEach((i) => {
        i.pause();
      });
      const player = document.getElementById(theid);
      player.play();
    };
    const stopaudio = (theid) => {
      document.querySelectorAll("audio").forEach((i) => {
        i.pause();
      });
    };
    onMounted(() => {
      loadVoices();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = resolveComponent("UButton");
      const _component_UPopover = resolveComponent("UPopover");
      const _component_AudioToAssets = __unplugin_components_0$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full bg-slate-800 flex flex-col" }, _attrs))}><div class="border-l-4 border-r-4 border-slate-500 p-2"><div class="grid grid-cols-2 items-center my-1 gap-1 justify-center"><div class="flex gap-1 items-center my-1"><!--[-->`);
      ssrRenderList(["en-US", "en-CA", "en-GB", "es-MX"], (item, index) => {
        _push(ssrRenderComponent(_component_UButton, {
          size: "xs",
          class: "px-1",
          type: unref(voicesLanguageFilter) == item ? "primary" : "default",
          onClick: ($event) => voicesLanguageFilter.value = item,
          key: index
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item)}`);
            } else {
              return [
                createTextVNode(
                  toDisplayString(item),
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
      });
      _push(`<!--]--></div><div class="flex gap-1 items-center justify-end"><!--[-->`);
      ssrRenderList(["-", "Female", "Male"], (item, index) => {
        _push(ssrRenderComponent(_component_UButton, {
          size: "xs",
          class: "px-1",
          type: unref(voicesGenderFilter) == item ? "secondary" : "default",
          onClick: ($event) => voicesGenderFilter.value = item,
          key: index
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item)}`);
            } else {
              return [
                createTextVNode(
                  toDisplayString(item),
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(unref(UInput), {
        modelValue: unref(voicesNameFilter),
        "onUpdate:modelValue": ($event) => isRef(voicesNameFilter) ? voicesNameFilter.value = $event : null,
        placeholder: "Nombre",
        class: "text-xs p-0.5 text-dark"
      }, null, _parent));
      _push(`</div><!-- lista -->`);
      if (!unref(loading)) {
        _push(`<div class="border-4 border-slate-500 p-2"><div class="h-[180px] text-xs overflow-y-scroll"><!--[-->`);
        ssrRenderList(unref(voicesFilter), (item, index) => {
          _push(`<div class="${ssrRenderClass(["flex gap-1 w-full justify-between  mb-0.5 hover:bg-primary-700 cursor-pointer", item.value == unref(voice).value ? "bg-accent" : "bg-slate-500"])}"><div><strong>${ssrInterpolate(item.name)}</strong>`);
          if (item.isKid) {
            _push(`<span class="text-amber inline-block ml-2">(Niño)</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="opacity-50 text-[8px] inline-block ml-2">${ssrInterpolate(item.voiceType)}</span></div><div class="rounded flex justify-center gap-1">`);
          _push(ssrRenderComponent(_component_UButton, {
            size: "xs",
            class: "i-solar-play-linear bg-white",
            onClick: ($event) => playudio("a" + index)
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            size: "xs",
            class: "i-solar-stop-linear bg-white",
            onClick: ($event) => stopaudio()
          }, null, _parent));
          _push(`<audio${ssrRenderAttr("src", item.sample)} type="audio/mp3" invisible w-0${ssrRenderAttr("id", "a" + index)}></audio></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div flex flex-col gap-2 mt-1>`);
      if (!unref(loading)) {
        _push(`<textarea${ssrRenderAttr("placeholder", unref(voice).name + ": Diálogo")} id="" name="" class="w-full resize-none text-xs rounded text-white bg-dark">${ssrInterpolate(unref(content))}</textarea>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading)) {
        _push(ssrRenderComponent(_component_UButton, {
          onClick: generateAudio,
          class: "ml-auto",
          type: "accent"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Generar audio`);
            } else {
              return [
                createTextVNode("Generar audio")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="text-accent-100 text-xs flex gap-1 justify-center items-center"><div class="i-solar-refresh-circle-broken ml-auto text-xl" animate-spin></div><span>Procesando...</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- list of files --><div class="bg-slate-400 p-1 mt-2"><!--[-->`);
      ssrRenderList(unref(audiofiles), (item, index) => {
        _push(`<div class="${ssrRenderClass([" w-full  bg-slate-700 mb-0.5 p-1 "])}"><div class="flex gap-1 items-center text-sm"><div><strong class="text-sm">${ssrInterpolate(item.voice.name)}</strong><span class="text-[8px] leading-2 inline-block ml-1">${ssrInterpolate(item.content)}</span></div><span class="opacity-50 text-[8px] inline-block ml-1">(${ssrInterpolate(item.audioDuration)}s)</span><div class="rounded flex justify-center gap-1 ml-auto">`);
        _push(ssrRenderComponent(_component_UButton, {
          size: "xs",
          class: "i-solar-play-linear bg-white",
          onClick: ($event) => playudio("b" + index)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          size: "xs",
          class: "i-solar-stop-linear bg-white",
          onClick: ($event) => stopaudio()
        }, null, _parent));
        _push(`<audio${ssrRenderAttr("src", item.audioUrl)} type="audio/mp3" invisible w-0${ssrRenderAttr("id", "b" + index)}></audio></div><div class="text-right flex justify-center ml-2">`);
        _push(ssrRenderComponent(_component_UPopover, {
          trigger: "click",
          class: "leading-2"
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_AudioToAssets, { item }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_AudioToAssets, { item }, null, 8, ["item"])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                size: "sm",
                type: "primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`A assets`);
                  } else {
                    return [
                      createTextVNode("A assets")
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  size: "sm",
                  type: "primary"
                }, {
                  default: withCtx(() => [
                    createTextVNode("A assets")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsAudios.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __unplugin_components_4 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsAudios.vue"]]);
const _sfc_main$j = {
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
    const playudio = (index) => {
      const theid = "audio" + index;
      const player = document.getElementById(theid);
      player.play();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = resolveComponent("UButton");
      const _component_UPopover = resolveComponent("UPopover");
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
          _push(`<div flex gap-2 items-center><div i-solar-music-notes-line-duotone></div><div class="w-12 aspect-square bg-slate-1/10 rounded flex justify-center text-3xl"><audio${ssrRenderAttr("src", item.url)} type="audio/mp3" w-full${ssrRenderAttr("id", "audio" + index)}></audio>`);
          _push(ssrRenderComponent(_component_UButton, {
            class: "i-solar-play-linear bg-white",
            onClick: ($event) => playudio(index)
          }, null, _parent));
          _push(`</div></div>`);
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
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsAssetsList.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __unplugin_components_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsAssetsList.vue"]]);
const _sfc_main$i = {
  __name: "builderDetailsAssetsUploader",
  __ssrInlineRender: true,
  setup(__props) {
    useBuilderStore();
    useRoute();
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "upload-area p-5 border-dashed border-4 border-white bg-slate-500 shadow m-2",
        "cursor-pointer": "",
        "text-center": "",
        "text-xs": "",
        "text-white": "",
        "hover:border-slate-800": ""
      }, _attrs))}><div class="mx-auto text-2xl mb-1" i-solar-upload-line-duotone></div><div>Arrastrar archivos o seleccionarlos dando click</div><input type="file" multiple hidden></div>`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsAssetsUploader.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __unplugin_components_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsAssetsUploader.vue"]]);
const _sfc_main$h = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_BuilderDetailsAssetsUploader = __unplugin_components_0$7;
  const _component_BuilderDetailsAssetsList = __unplugin_components_1$4;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_BuilderDetailsAssetsUploader, null, null, _parent));
  _push(ssrRenderComponent(_component_BuilderDetailsAssetsList, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsAssets.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$2], ["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsAssets.vue"]]);
const promptSystemText = `You are a JSON coder that turns the prompt into json a object.The code you write will be compiler into ant html interactive learning activity. You can use three json blocks: "group", "text", "image".
{ "block": "group", "class": "", "content": [], "background": "", "id": "", "name": "YxOn" }
{ "text": "texto", "class": "", "id": "", "block": "text", "name": "j4DU" }
{ "file": "", "class": "", "id": "", "block": "image", "name": "bEVs" }
The class field uses classes from tailwind and daisyui. Only the group has "content" where you can nest more blocks. Text block has "text" key where texts should go. Next there is an usage example. All names and structures should be replaced accordingly:
{"class":"bg-slate-200 rounded p-1","content":[{"class":"text-center","content":[{"text":"Im a text","class":"text-2xl font-bold mb-4","id":"","block":"text","name":"abcd"}],"background":"","id":"","block":"group","name":"h4ip"},{"block":"group","class":"grid grid-cols-2 gap-5","content":[{"block":"group","class":"bg-sky-800 p-1 rounded flex justify-center items-center","content":[{"text":"Hello! Im a text.","class":"text-white text-4xl","id":"","block":"text","name":"zCKP"}],"background":"","id":"","name":"Elli","hidden":false},{"block":"group","class":"bg-rose-500 p-1 rounded","content":[{"file":"https://mtvmbpemhwbrljhzdrci.supabase.co/storage/v1/object/public/riodas/A1-2U1L1EB/shot.png","class":"","id":"","block":"image","name":"9AqT"}],"background":"","id":"","name":"C5i6","hidden":false}],"background":"","id":"","name":"klmn","hidden":false}],"background":"","id":"","block":"group","name":"PT:Zuow"}
The name is a random 4 characters string.  The first groups name (the one the root), where all the items are, should be prefixed with "PT:"+[4 caracters]. Only one "PT:" per object. Is important that every "name" is unique through all the document.
I will ask you for structures and you will write them using group, text, and image. I will give you specific instructions in spanish.
If images are required use the ones from the "Pool of images" that have a closer name to the requirement. Put the name of the image from the pool on the "file" key.
Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation.`;
const _sfc_main$g = {
  __name: "builderDetailsPrompts",
  __ssrInlineRender: true,
  setup(__props) {
    const configuration = new Configuration({
      apiKey: window.atob("c2stazNBcmVsNlRyYWRQV3R0ZHFLQVFUM0JsYmtGSlRBQzUwU2V6RmFsaXR5MFpvakM0")
    });
    delete configuration.baseOptions.headers["User-Agent"];
    const openai = new OpenAIApi(configuration);
    const builderstore = useBuilderStore();
    const theprompt = ref();
    const imagespool = ref();
    const loading = ref(false);
    const sending = async () => {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { "role": "system", "content": promptSystemText + imagespool.value },
          { role: "user", content: theprompt.value }
        ]
      });
      const content = completion.data.choices[0].message.content;
      try {
        const response = JSON.parse(content);
        pushToscene(response);
        loading.value = false;
      } catch (e) {
        loading.value = false;
        alert("Error... intenta de nuevo o usa un prompt más corto");
        throw new Error("The json strucure generated from gpt is not a valid one, please try again");
      }
    };
    const pushToscene = (obj) => {
      builderstore.doc.content.activity.scenes[0].content.push(obj);
      imagespool.value = " Pool of images:" + builderstore.files.map((i) => i.url).toString();
    };
    const promptSend = () => {
      loading.value = true;
      sending();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = resolveComponent("UButton");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full bg-slate-800 flex flex-col" }, _attrs))}><textarea placeholder="PROMPT" id="" name="" class="h-full resize-none text-xs rounded m-2 text-white bg-dark">${ssrInterpolate(unref(theprompt))}</textarea>`);
      if (unref(theprompt)) {
        _push(`<div class="text-right p-5 flex gap-2">`);
        if (!unref(loading)) {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: promptSend,
            class: "ml-auto"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Enviar prompt`);
              } else {
                return [
                  createTextVNode("Enviar prompt")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<div><div class="i-solar-refresh-circle-broken ml-auto" animate-spin></div> Procesando... </div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsPrompts.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsPrompts.vue"]]);
const _sfc_main$f = {
  __name: "builderDetailsCodigo",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    storeToRefs(builderstore);
    ref(true);
    function onJsonChange(value) {
      builderstore.doc.content = value;
    }
    function onModeChange(value) {
    }
    const contentModel = ref(builderstore.doc ? builderstore.doc.content : "");
    watch(() => builderstore.doc.content, (newContent) => {
      contentModel.value = newContent;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        relative: "",
        "bg-stone-6": "",
        "h-full": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Vue3JsonEditor), {
        mode: "code",
        modelValue: unref(contentModel),
        "onUpdate:modelValue": ($event) => isRef(contentModel) ? contentModel.value = $event : null,
        class: "bg-white h-full",
        onJsonChange,
        onModeChange
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsCodigo.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __unplugin_components_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsCodigo.vue"]]);
const _sfc_main$e = {
  __name: "BDModulosTemplates",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  emits: ["loadBlock"],
  setup(__props, { emit: emits }) {
    const builderstore = useBuilderStore();
    const templates = ref([]);
    const loadItems = async () => {
      templates.value = await builderstore.getUserTemplates();
    };
    loadItems();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(templates).length == 0) {
        _push(`<div${ssrRenderAttrs(_attrs)}>Cargando...</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-h-[100px] overflow-y-scroll" }, _attrs))}><div p-1>Seleccionar template:</div><div class="flex flex-wrap gap-0.5 px-1 mb-1"><!--[-->`);
        ssrRenderList(unref(templates), (item, index) => {
          _push(`<div class="cursor-pointer p-0.5 bg-stone-500 text-white w-fit rounded border-2 border-stone-700 hover:bg-stone-300 hover:text-stone-800">${ssrInterpolate(item.name)}</div>`);
        });
        _push(`<!--]--></div></div>`);
      }
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/BDModulosTemplates.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __unplugin_components_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/BDModulosTemplates.vue"]]);
const _sfc_main$d = {
  __name: "BDModulosSaveTemplate",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    const builderstore = useBuilderStore();
    const stored = ref(false);
    const name = ref("");
    const save = async () => {
      const theitem = { name: name.value, object: props.data, type: builderstore.type };
      const { data, error } = await supabase.from("usertemplates").insert([
        theitem
      ]).select();
      if (data) {
        stored.value = true;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = resolveComponent("UInput");
      const _component_UButton = resolveComponent("UButton");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-1" }, _attrs))}><div class="text-xs flex justify-between gap-1"><div>Template:</div><div class="text-primary"><strong>${ssrInterpolate(__props.data.block)}</strong> [${ssrInterpolate(__props.data.name)}]</div></div>`);
      if (!unref(stored)) {
        _push(`<div class="flex mt-1 gap-1">`);
        _push(ssrRenderComponent(_component_UInput, {
          size: "sm",
          modelValue: unref(name),
          "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
          placeholder: "Nombre de template",
          class: "text-neutral"
        }, null, _parent));
        if (unref(name).length > 2) {
          _push(ssrRenderComponent(_component_UButton, {
            size: "sm",
            color: "primary",
            onClick: save
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Guardar`);
              } else {
                return [
                  createTextVNode("Guardar")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="text-center text-amber">${ssrInterpolate(unref(name))} guardado</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/BDModulosSaveTemplate.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __unplugin_components_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/BDModulosSaveTemplate.vue"]]);
const _sfc_main$c = {
  __name: "BDModulosDropzones",
  __ssrInlineRender: true,
  props: {
    data: Object,
    itemKey: String,
    level: Number,
    parentblock: String
  },
  setup(__props) {
    const props = __props;
    const source = ref("Hello");
    const { text, copy, copied, isSupported } = useClipboard({ source });
    const builderstore = useBuilderStore();
    const templateLoad = (element, index, item) => {
      thelist.value[index] = item;
    };
    const thelist = ref(props.data[props.itemKey]);
    const drag = ref(false);
    ref([]);
    const onStart = (e) => {
      e.item.classList.add("ring-2", "ring-amber-3");
    };
    const onEnd = (e) => {
      e.item.classList.remove("ring-2", "ring-amber-3");
    };
    const moduloName = props.itemKey + "_" + props.level;
    const dropzones = ["content", "scenes", "options"];
    const noninput = ["block", "name"];
    const copyToast = ref();
    const copytxt = (txt) => {
      copy(txt);
    };
    const getRandomCharacters = (_) => "xxxx".replace(/x/g, (_2) => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.random() * 62 | 0]);
    const moveFN = (moveto, index) => {
      if (moveto == -1 && index == 0) {
        return false;
      }
      const element = thelist.value.splice(index, 1)[0];
      thelist.value.splice(index + moveto, 0, element);
    };
    const fnHide = (element) => {
      if (!element.hasOwnProperty("hidden")) {
        element["hidden"] = true;
      } else {
        element["hidden"] = !element["hidden"];
      }
    };
    const fnClone = (el, index) => {
      const newel = JSON.parse(JSON.stringify(el));
      if (!(el == null ? void 0 : el.symbol)) {
        newel["name"] = getRandomCharacters();
        newel["id"] = getRandomCharacters();
      }
      thelist.value.splice(index + 1, 0, updateNamesWithRandomCharacters(newel));
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
    const collapsecontent = useStorage(builderstore.dockey + "-collapsecontent", {});
    const collapseFN = (index, element) => {
      collapsecontent.value[moduloName + index] = !collapsecontent.value[moduloName + index];
    };
    const accordion = ref({});
    const open = (index, element) => {
      mouseoverFN(element);
      syncblock(index, element);
      accordion.value[moduloName + index] = !accordion.value[moduloName + index];
    };
    const syncblock = (index, element) => {
      if (element.symbol || !builderstore.modulosobj[element.block]) {
        return false;
      }
      const schema = builderstore.modulosobj[element.block];
      Object.keys(schema.properties).forEach((el) => {
        if (!element.hasOwnProperty(el)) {
          const prop = schema.properties[el];
          if (prop.type == "string") {
            element[el] = "";
          }
          if (prop.type == "number") {
            element[el] = 0;
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
      if (!(element == null ? void 0 : element.name)) {
        element["name"] = getRandomCharacters();
      }
    };
    const updateNamesWithRandomCharacters = (objitem) => {
      const obj = objitem;
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          updateNamesWithRandomCharacters(obj[key]);
        } else if (key === "name") {
          obj[key] = getRandomCharacters();
        } else if (key === "id") {
          obj[key] = obj[key] + getRandomCharacters();
        }
      }
      return obj;
    };
    const mouseoverFN = (item) => {
      if (item.name) {
        document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({ type: "hover", name: item.name }), "*");
      }
    };
    const colorvariation = (element) => {
      var _a;
      let lclass = "";
      lclass = "border-l-2 border-" + ((_a = builderstore == null ? void 0 : builderstore.modulosobj[props.parentblock]) == null ? void 0 : _a.color) + "-";
      if (props.level % 2 === 1) {
        lclass += "700";
      } else {
        lclass += "500";
      }
      return lclass;
    };
    const handlegradient = (element) => {
      var _a, _b, _c, _d;
      let fromcolor = "";
      let tocolor = "";
      if (props.parentblock == element.block) {
        if (props.level % 2 === 1) {
          fromcolor = "from-" + ((_a = builderstore == null ? void 0 : builderstore.modulosobj[props.parentblock]) == null ? void 0 : _a.color) + "-700";
          tocolor = "to-" + ((_b = builderstore == null ? void 0 : builderstore.modulosobj[props.parentblock]) == null ? void 0 : _b.color) + "-900";
        } else {
          fromcolor = "from-" + ((_c = builderstore == null ? void 0 : builderstore.modulosobj[props.parentblock]) == null ? void 0 : _c.color) + "-900";
          tocolor = "to-" + ((_d = builderstore == null ? void 0 : builderstore.modulosobj[props.parentblock]) == null ? void 0 : _d.color) + "-700";
        }
      }
      let lclass = "bg-gradient-to-r " + fromcolor + " " + tocolor;
      return lclass;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_UPopover = resolveComponent("UPopover");
      const _component_BDModulosSaveTemplate = __unplugin_components_0$6;
      const _component_UButton = resolveComponent("UButton");
      const _component_BDModulosTemplates = __unplugin_components_1$2;
      const _component_BDModulosInputs = __unplugin_components_1$1;
      const _component_BDModulosDropzones = resolveComponent("BDModulosDropzones", true);
      const _component_UToast = resolveComponent("UToast");
      _push(`<!--[-->`);
      if (Object.keys(unref(builderstore).modulosobj).length) {
        _push(ssrRenderComponent(unref(draggable), {
          list: unref(thelist),
          group: { name: "people", pull: true, put: true },
          "item-key": "name",
          class: ["min-h-[30px] border-l-1 border-b-1 border-t-1 border-t-dashed border-b-dashed flex flex-col gap-0.5  pl-1 pr-0.5 py-1", "border-" + ((_b = (_a = unref(builderstore)) == null ? void 0 : _a.modulosobj[__props.parentblock]) == null ? void 0 : _b.color) + "-500", "bg-" + ((_d = (_c = unref(builderstore)) == null ? void 0 : _c.modulosobj[__props.parentblock]) == null ? void 0 : _d.color) + "-500/10"],
          onStart,
          onEnd,
          handle: ".handle"
        }, {
          item: withCtx(({ element, index }, _push2, _parent2, _scopeId) => {
            var _a2, _b2, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l;
            if (_push2) {
              _push2(`<div class="${ssrRenderClass(["hover:ring-1 ring-accent", unref(drag) ? "ring-1 ring-accent" : "", element.hidden ? "opacity-50" : "", colorvariation()])}"${_scopeId}><div class="${ssrRenderClass([[handlegradient(element), "border-l-1 border-t-1 border-b-1 border-b-slate-500", "border-" + ((_b2 = (_a2 = unref(builderstore)) == null ? void 0 : _a2.modulosobj[element.block]) == null ? void 0 : _b2.color) + "-500"], "flex gap-1 items-center justify-center relative xyz"])}"${_scopeId}><div class="handle flex gap-1 items-center justify-between grow px-1 cursor-grab p-0.5"${_scopeId}><div flex items-center w-full grow${_scopeId}><div class="${ssrRenderClass("flex gap-0.5 text-" + ((_d2 = (_c2 = unref(builderstore)) == null ? void 0 : _c2.modulosobj[element.block]) == null ? void 0 : _d2.color) + "-500")}"${_scopeId}><div class="text-[10px]"${_scopeId}>${ssrInterpolate(__props.level)}</div>`);
              if (element.block == "image" && element.file) {
                _push2(`<img class="w-4 h-4 mr-1"${ssrRenderAttr("src", element.file)}${_scopeId}>`);
              } else {
                _push2(`<!--[-->`);
                if (element.marker) {
                  _push2(`<div class="hasicon mr-1"${_scopeId}>${element.marker}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if ((_f = (_e = unref(builderstore)) == null ? void 0 : _e.modulosobj[element.block]) == null ? void 0 : _f.icon) {
                  _push2(`<div class="hasicon w-4 h-4 mr-1"${_scopeId}>${unref(builderstore).modulosobj[element.block].icon}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              }
              _push2(`</div>`);
              if (element == null ? void 0 : element.symbol) {
                _push2(`<div flex items-center justify-between grow class="bg-gradient-to-r from-red-800 to-info items-center relative"${_scopeId}><div${_scopeId}>symbol</div><div${_scopeId}>${ssrInterpolate(element.symbol)}</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (element.block == "separator") {
                _push2(`<div flex items-center justify-between grow class="bg-gradient-to-r from-red-800 to-info items-center relative" style="${ssrRenderStyle("background:" + element.color + ";")}"${_scopeId}><div${_scopeId}>${ssrInterpolate(element.text)}</div></div>`);
              } else {
                _push2(`<div flex items-center justify-between grow${_scopeId}><div class="flex gap-2 items-center"${_scopeId}><div${_scopeId}>${ssrInterpolate(element.block)}</div>`);
                if (element.block == "text" && element.text) {
                  _push2(`<div class="text-[10px] text-ellipsis leading-2 bg-red-900/50 p0.5"${_scopeId}>${ssrInterpolate(element.text.substring(0, 10))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (element.block == "word" && element.word) {
                  _push2(`<div class="text-[10px] text-ellipsis leading-2 bg-teal-600/50 p0.5"${_scopeId}>${ssrInterpolate(element.word.substring(0, 10))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (element.block == "image" && element.file) {
                  _push2(`<div class="text-[10px] text-ellipsis leading-2 bg-blue-900/50 p0.5"${_scopeId}>${ssrInterpolate(element.file.split("/").slice(-1)[0].substring(0, 10))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (element.block == "icon" && element.icon) {
                  _push2(`<div class="text-[10px] text-ellipsis leading-2 bg-gray-900/50 p0.5"${_scopeId}>${ssrInterpolate(element.icon.substring(0, 10))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              }
              _push2(`</div></div><!-- ACTIONS --><div class="flex gap-y-0.5 gap-x-1 items-center justify-center bg-gradient-to-l from-white to-white/10 px-1"${_scopeId}>`);
              if (element == null ? void 0 : element.name) {
                _push2(`<div class="flex text-[10px]"${_scopeId}><div${_scopeId}>N:</div><div class="cursor-pointer bg-dark/20 rounded hover:text-amber active:text-lime"${_scopeId}>${ssrInterpolate(element.name.substring(0, 4))}</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (element == null ? void 0 : element.id) {
                _push2(`<div class="flex text-[10px]"${_scopeId}><div${_scopeId}>I:</div><div class="max-w-[40px] overflow-x-hidden cursor-pointer bg-white/20 rounded hover:text-amber active:text-lime"${_scopeId}>${ssrInterpolate(element.id.substring(0, 4))}</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (element == null ? void 0 : element.content) {
                _push2(`<div class="${ssrRenderClass(["leading-2", unref(collapsecontent)[moduloName + index] ? "bg-lime-300 rounded" : ""])}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UPopover, { trigger: "hover" }, {
                  content: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span dark:text-white text-xs p-1${_scopeId2}>Vista de contenido</span>`);
                    } else {
                      return [
                        createVNode("span", {
                          "dark:text-white": "",
                          "text-xs": "",
                          "p-1": ""
                        }, "Vista de contenido")
                      ];
                    }
                  }),
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="${ssrRenderClass(["i-solar-list-down-minimalistic-line-duotone", "cursor-pointer text-dark hover:text-white"])}"${_scopeId2}></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: ["i-solar-list-down-minimalistic-line-duotone", "cursor-pointer text-dark hover:text-white"],
                          onClick: ($event) => collapseFN(index)
                        }, null, 8, ["onClick"])
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_UPopover, {
                trigger: "hover",
                class: "leading-2"
              }, {
                content: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span dark:text-white text-xs p-1${_scopeId2}>Mover arriba</span>`);
                  } else {
                    return [
                      createVNode("span", {
                        "dark:text-white": "",
                        "text-xs": "",
                        "p-1": ""
                      }, "Mover arriba")
                    ];
                  }
                }),
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="${ssrRenderClass(["i-solar-arrow-to-top-left-bold-duotone", "cursor-pointer text-dark hover:text-white"])}"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: ["i-solar-arrow-to-top-left-bold-duotone", "cursor-pointer text-dark hover:text-white"],
                        onClick: ($event) => moveFN(-1, index)
                      }, null, 8, ["onClick"])
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UPopover, {
                trigger: "hover",
                class: "leading-2"
              }, {
                content: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span dark:text-white text-xs p-1${_scopeId2}>Mover abajo</span>`);
                  } else {
                    return [
                      createVNode("span", {
                        "dark:text-white": "",
                        "text-xs": "",
                        "p-1": ""
                      }, "Mover abajo")
                    ];
                  }
                }),
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="${ssrRenderClass(["i-solar-arrow-to-down-left-bold-duotone", "cursor-pointer text-dark hover:text-white"])}"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: ["i-solar-arrow-to-down-left-bold-duotone", "cursor-pointer text-dark hover:text-white"],
                        onClick: ($event) => moveFN(1, index)
                      }, null, 8, ["onClick"])
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UPopover, {
                trigger: "hover",
                class: "leading-2"
              }, {
                content: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span dark:text-white text-xs p-1${_scopeId2}>Ocultar/Mostrar</span>`);
                  } else {
                    return [
                      createVNode("span", {
                        "dark:text-white": "",
                        "text-xs": "",
                        "p-1": ""
                      }, "Ocultar/Mostrar")
                    ];
                  }
                }),
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="${ssrRenderClass([element.hidden ? "i-solar-eye-closed-bold-duotone" : "i-solar-eye-broken", "cursor-pointer text-dark hover:text-white"])}"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: [element.hidden ? "i-solar-eye-closed-bold-duotone" : "i-solar-eye-broken", "cursor-pointer text-dark hover:text-white"],
                        onClick: ($event) => fnHide(element)
                      }, null, 10, ["onClick"])
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UPopover, {
                trigger: "hover",
                class: "leading-2"
              }, {
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
                        onClick: ($event) => fnClone(element, index)
                      }, null, 8, ["onClick"])
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UPopover, {
                trigger: "click",
                class: "leading-2"
              }, {
                content: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_BDModulosSaveTemplate, { data: element }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_BDModulosSaveTemplate, { data: element }, null, 8, ["data"])
                    ];
                  }
                }),
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div i-solar-cloud-upload-line-duotone class="cursor-pointer text-dark hover:text-white"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        "i-solar-cloud-upload-line-duotone": "",
                        class: "cursor-pointer text-dark hover:text-white"
                      })
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UPopover, {
                trigger: "click",
                class: "leading-2"
              }, {
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
              _push2(`</div><!-- actions--></div>`);
              if (unref(accordion)[moduloName + index] && element.block == "template") {
                _push2(ssrRenderComponent(_component_BDModulosTemplates, {
                  data: element,
                  onLoadBlock: ($event) => templateLoad(element, index, $event)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(accordion)[moduloName + index]) {
                _push2(`<div${_scopeId}><!--[-->`);
                ssrRenderList(Object.keys(element), (itemNest, indexNest) => {
                  _push2(`<!--[-->`);
                  if (!dropzones.includes(itemNest) && !noninput.includes(itemNest)) {
                    _push2(`<div${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_BDModulosInputs, {
                      data: element,
                      "item-key": itemNest,
                      level: __props.level + 1,
                      parentblock: element.block
                    }, null, _parent2, _scopeId));
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]-->`);
                if (!(element == null ? void 0 : element.symbol)) {
                  _push2(`<div class="p-1 text-right w-full flex justify-end"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UButton, {
                    size: "xs",
                    class: "px-2",
                    onClick: ($event) => fnSymbol(element, index)
                  }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`Convertir en símbolo`);
                      } else {
                        return [
                          createTextVNode("Convertir en símbolo")
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!unref(collapsecontent)[moduloName + index]) {
                _push2(`<!--[-->`);
                ssrRenderList(Object.keys(element), (itemNest, indexNest) => {
                  _push2(`<!--[-->`);
                  if (dropzones.includes(itemNest) && Array.isArray(element[itemNest])) {
                    _push2(`<div class=""${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_BDModulosDropzones, {
                      data: element,
                      "item-key": itemNest,
                      level: __props.level + 1,
                      parentblock: element.block
                    }, null, _parent2, _scopeId));
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode(
                  "div",
                  {
                    class: ["hover:ring-1 ring-accent", unref(drag) ? "ring-1 ring-accent" : "", element.hidden ? "opacity-50" : "", colorvariation()]
                  },
                  [
                    createVNode("div", {
                      onMouseover: ($event) => mouseoverFN(element),
                      class: ["flex gap-1 items-center justify-center relative xyz", [handlegradient(element), "border-l-1 border-t-1 border-b-1 border-b-slate-500", "border-" + ((_h = (_g = unref(builderstore)) == null ? void 0 : _g.modulosobj[element.block]) == null ? void 0 : _h.color) + "-500"]]
                    }, [
                      createVNode("div", { class: "handle flex gap-1 items-center justify-between grow px-1 cursor-grab p-0.5" }, [
                        createVNode("div", {
                          flex: "",
                          "items-center": "",
                          "w-full": "",
                          grow: "",
                          onClick: ($event) => open(index, element)
                        }, [
                          createVNode(
                            "div",
                            {
                              class: "flex gap-0.5 text-" + ((_j = (_i = unref(builderstore)) == null ? void 0 : _i.modulosobj[element.block]) == null ? void 0 : _j.color) + "-500"
                            },
                            [
                              createVNode(
                                "div",
                                { class: "text-[10px]" },
                                toDisplayString(__props.level),
                                1
                                /* TEXT */
                              ),
                              element.block == "image" && element.file ? (openBlock(), createBlock("img", {
                                key: 0,
                                class: "w-4 h-4 mr-1",
                                src: element.file
                              }, null, 8, ["src"])) : (openBlock(), createBlock(
                                Fragment,
                                { key: 1 },
                                [
                                  element.marker ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "hasicon mr-1",
                                    innerHTML: element.marker
                                  }, null, 8, ["innerHTML"])) : createCommentVNode("v-if", true),
                                  ((_l = (_k = unref(builderstore)) == null ? void 0 : _k.modulosobj[element.block]) == null ? void 0 : _l.icon) ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "hasicon w-4 h-4 mr-1",
                                    innerHTML: unref(builderstore).modulosobj[element.block].icon
                                  }, null, 8, ["innerHTML"])) : createCommentVNode("v-if", true)
                                ],
                                64
                                /* STABLE_FRAGMENT */
                              ))
                            ],
                            2
                            /* CLASS */
                          ),
                          (element == null ? void 0 : element.symbol) ? (openBlock(), createBlock("div", {
                            key: 0,
                            flex: "",
                            "items-center": "",
                            "justify-between": "",
                            grow: "",
                            class: "bg-gradient-to-r from-red-800 to-info items-center relative"
                          }, [
                            createVNode("div", null, "symbol"),
                            createVNode(
                              "div",
                              null,
                              toDisplayString(element.symbol),
                              1
                              /* TEXT */
                            )
                          ])) : createCommentVNode("v-if", true),
                          element.block == "separator" ? (openBlock(), createBlock(
                            "div",
                            {
                              key: 1,
                              flex: "",
                              "items-center": "",
                              "justify-between": "",
                              grow: "",
                              class: "bg-gradient-to-r from-red-800 to-info items-center relative",
                              style: "background:" + element.color + ";"
                            },
                            [
                              createVNode(
                                "div",
                                null,
                                toDisplayString(element.text),
                                1
                                /* TEXT */
                              )
                            ],
                            4
                            /* STYLE */
                          )) : (openBlock(), createBlock("div", {
                            key: 2,
                            flex: "",
                            "items-center": "",
                            "justify-between": "",
                            grow: ""
                          }, [
                            createVNode("div", { class: "flex gap-2 items-center" }, [
                              createVNode(
                                "div",
                                null,
                                toDisplayString(element.block),
                                1
                                /* TEXT */
                              ),
                              element.block == "text" && element.text ? (openBlock(), createBlock(
                                "div",
                                {
                                  key: 0,
                                  class: "text-[10px] text-ellipsis leading-2 bg-red-900/50 p0.5"
                                },
                                toDisplayString(element.text.substring(0, 10)),
                                1
                                /* TEXT */
                              )) : createCommentVNode("v-if", true),
                              element.block == "word" && element.word ? (openBlock(), createBlock(
                                "div",
                                {
                                  key: 1,
                                  class: "text-[10px] text-ellipsis leading-2 bg-teal-600/50 p0.5"
                                },
                                toDisplayString(element.word.substring(0, 10)),
                                1
                                /* TEXT */
                              )) : createCommentVNode("v-if", true),
                              element.block == "image" && element.file ? (openBlock(), createBlock(
                                "div",
                                {
                                  key: 2,
                                  class: "text-[10px] text-ellipsis leading-2 bg-blue-900/50 p0.5"
                                },
                                toDisplayString(element.file.split("/").slice(-1)[0].substring(0, 10)),
                                1
                                /* TEXT */
                              )) : createCommentVNode("v-if", true),
                              element.block == "icon" && element.icon ? (openBlock(), createBlock(
                                "div",
                                {
                                  key: 3,
                                  class: "text-[10px] text-ellipsis leading-2 bg-gray-900/50 p0.5"
                                },
                                toDisplayString(element.icon.substring(0, 10)),
                                1
                                /* TEXT */
                              )) : createCommentVNode("v-if", true)
                            ])
                          ]))
                        ], 8, ["onClick"])
                      ]),
                      createCommentVNode(" ACTIONS "),
                      createVNode("div", { class: "flex gap-y-0.5 gap-x-1 items-center justify-center bg-gradient-to-l from-white to-white/10 px-1" }, [
                        (element == null ? void 0 : element.name) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex text-[10px]"
                        }, [
                          createVNode("div", null, "N:"),
                          createVNode("div", {
                            onClick: ($event) => copytxt(element.name),
                            class: "cursor-pointer bg-dark/20 rounded hover:text-amber active:text-lime"
                          }, toDisplayString(element.name.substring(0, 4)), 9, ["onClick"])
                        ])) : createCommentVNode("v-if", true),
                        (element == null ? void 0 : element.id) ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex text-[10px]"
                        }, [
                          createVNode("div", null, "I:"),
                          createVNode("div", {
                            onClick: ($event) => copytxt(element.id),
                            class: "max-w-[40px] overflow-x-hidden cursor-pointer bg-white/20 rounded hover:text-amber active:text-lime"
                          }, toDisplayString(element.id.substring(0, 4)), 9, ["onClick"])
                        ])) : createCommentVNode("v-if", true),
                        (element == null ? void 0 : element.content) ? (openBlock(), createBlock(
                          "div",
                          {
                            key: 2,
                            class: ["leading-2", unref(collapsecontent)[moduloName + index] ? "bg-lime-300 rounded" : ""]
                          },
                          [
                            createVNode(
                              _component_UPopover,
                              { trigger: "hover" },
                              {
                                content: withCtx(() => [
                                  createVNode("span", {
                                    "dark:text-white": "",
                                    "text-xs": "",
                                    "p-1": ""
                                  }, "Vista de contenido")
                                ]),
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: ["i-solar-list-down-minimalistic-line-duotone", "cursor-pointer text-dark hover:text-white"],
                                    onClick: ($event) => collapseFN(index)
                                  }, null, 8, ["onClick"])
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
                        )) : createCommentVNode("v-if", true),
                        createVNode(
                          _component_UPopover,
                          {
                            trigger: "hover",
                            class: "leading-2"
                          },
                          {
                            content: withCtx(() => [
                              createVNode("span", {
                                "dark:text-white": "",
                                "text-xs": "",
                                "p-1": ""
                              }, "Mover arriba")
                            ]),
                            default: withCtx(() => [
                              createVNode("div", {
                                class: ["i-solar-arrow-to-top-left-bold-duotone", "cursor-pointer text-dark hover:text-white"],
                                onClick: ($event) => moveFN(-1, index)
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
                          {
                            trigger: "hover",
                            class: "leading-2"
                          },
                          {
                            content: withCtx(() => [
                              createVNode("span", {
                                "dark:text-white": "",
                                "text-xs": "",
                                "p-1": ""
                              }, "Mover abajo")
                            ]),
                            default: withCtx(() => [
                              createVNode("div", {
                                class: ["i-solar-arrow-to-down-left-bold-duotone", "cursor-pointer text-dark hover:text-white"],
                                onClick: ($event) => moveFN(1, index)
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
                          {
                            trigger: "hover",
                            class: "leading-2"
                          },
                          {
                            content: withCtx(() => [
                              createVNode("span", {
                                "dark:text-white": "",
                                "text-xs": "",
                                "p-1": ""
                              }, "Ocultar/Mostrar")
                            ]),
                            default: withCtx(() => [
                              createVNode("div", {
                                class: [element.hidden ? "i-solar-eye-closed-bold-duotone" : "i-solar-eye-broken", "cursor-pointer text-dark hover:text-white"],
                                onClick: ($event) => fnHide(element)
                              }, null, 10, ["onClick"])
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        ),
                        createVNode(
                          _component_UPopover,
                          {
                            trigger: "hover",
                            class: "leading-2"
                          },
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
                                onClick: ($event) => fnClone(element, index)
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
                          {
                            trigger: "click",
                            class: "leading-2"
                          },
                          {
                            content: withCtx(() => [
                              createVNode(_component_BDModulosSaveTemplate, { data: element }, null, 8, ["data"])
                            ]),
                            default: withCtx(() => [
                              createVNode("div", {
                                "i-solar-cloud-upload-line-duotone": "",
                                class: "cursor-pointer text-dark hover:text-white"
                              })
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        ),
                        createVNode(
                          _component_UPopover,
                          {
                            trigger: "click",
                            class: "leading-2"
                          },
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
                      createCommentVNode(" actions")
                    ], 42, ["onMouseover"]),
                    unref(accordion)[moduloName + index] && element.block == "template" ? (openBlock(), createBlock(_component_BDModulosTemplates, {
                      key: 0,
                      data: element,
                      onLoadBlock: ($event) => templateLoad(element, index, $event)
                    }, null, 8, ["data", "onLoadBlock"])) : createCommentVNode("v-if", true),
                    unref(accordion)[moduloName + index] ? (openBlock(), createBlock("div", { key: 1 }, [
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(Object.keys(element), (itemNest, indexNest) => {
                          return openBlock(), createBlock(
                            Fragment,
                            null,
                            [
                              !dropzones.includes(itemNest) && !noninput.includes(itemNest) ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode(_component_BDModulosInputs, {
                                  data: element,
                                  "item-key": itemNest,
                                  level: __props.level + 1,
                                  parentblock: element.block
                                }, null, 8, ["data", "item-key", "level", "parentblock"])
                              ])) : createCommentVNode("v-if", true)
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          );
                        }),
                        256
                        /* UNKEYED_FRAGMENT */
                      )),
                      !(element == null ? void 0 : element.symbol) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-1 text-right w-full flex justify-end"
                      }, [
                        createVNode(_component_UButton, {
                          size: "xs",
                          class: "px-2",
                          onClick: ($event) => fnSymbol(element, index)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Convertir en símbolo")
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["onClick"])
                      ])) : createCommentVNode("v-if", true)
                    ])) : createCommentVNode("v-if", true),
                    !unref(collapsecontent)[moduloName + index] ? (openBlock(true), createBlock(
                      Fragment,
                      { key: 2 },
                      renderList(Object.keys(element), (itemNest, indexNest) => {
                        return openBlock(), createBlock(
                          Fragment,
                          { key: indexNest },
                          [
                            dropzones.includes(itemNest) && Array.isArray(element[itemNest]) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: ""
                            }, [
                              createVNode(_component_BDModulosDropzones, {
                                data: element,
                                "item-key": itemNest,
                                level: __props.level + 1,
                                parentblock: element.block
                              }, null, 8, ["data", "item-key", "level", "parentblock"])
                            ])) : createCommentVNode("v-if", true)
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )) : createCommentVNode("v-if", true)
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
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UToast, {
        ref_key: "copyToast",
        ref: copyToast,
        position: "bottom",
        align: "left"
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/BDModulosDropzones.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __unplugin_components_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/BDModulosDropzones.vue"]]);
const _sfc_main$b = {
  __name: "BDModulosInputs",
  __ssrInlineRender: true,
  props: {
    data: Object,
    itemKey: String,
    level: Number,
    parentblock: String
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
      let fm = builderstore.files.map((item) => {
        return {
          label: item.name,
          value: item.url,
          mime: item.mimetype
        };
      });
      fm.unshift({ label: " - ", value: " " });
      return fm;
    });
    const levelColor = () => {
      var _a;
      if (props.parentblock) {
        return ((_a = builderstore == null ? void 0 : builderstore.modulosobj[props.parentblock]) == null ? void 0 : _a.color) + "-500";
      } else {
        let col = "";
        if (props.level == 0) {
          col = "accent-700";
        }
        if (props.level == 1) {
          col = "accent-900";
        }
        if (props.level == 2) {
          col = "success-700";
        }
        if (props.level == 3) {
          col = "success-900";
        }
        if (props.level == 4) {
          col = "warning-700";
        }
        if (props.level == 5) {
          col = "warning-900";
        }
        if (props.level == 6) {
          col = "info-700";
        }
        if (props.level == 7) {
          col = "info-900";
        }
        if (props.level == 8) {
          col = "primary-700";
        }
        if (props.level == 9) {
          col = "primary-900";
        }
        return col;
      }
    };
    const accordion = ref({});
    const dropzones = ["content", "scenes", "options"];
    const symbolReplaceFN = ref();
    const symbolReplaceNew = () => {
      if (!symbolReplaceFN.value) {
        return false;
      }
      refData.value[symbolReplaceFN.value] = "";
      symbolReplaceFN.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_USelect = resolveComponent("USelect");
      const _component_UInput = resolveComponent("UInput");
      const _component_URadio = resolveComponent("URadio");
      const _component_USwitch = resolveComponent("USwitch");
      const _component_BDModulosInputs = resolveComponent("BDModulosInputs", true);
      const _component_BDModulosDropzones = __unplugin_components_0$5;
      if (__props.itemKey != "block") {
        _push(`<div${ssrRenderAttrs(mergeProps({
          "border-l-1": "",
          class: ["mb-0.5 border-" + levelColor(), ""],
          "text-xs": "",
          "data-level": __props.level
        }, _attrs))}><!--STRING inputs-->`);
        if (typeof unref(refData)[__props.itemKey] != "object") {
          _push(`<!--[-->`);
          if ((_a = unref(properties)) == null ? void 0 : _a.input) {
            _push(`<div class="grid grid-cols-4 items-center p-1"><!-- FILE -->`);
            if (typeof unref(refData)[__props.itemKey] == "string" && ((_b = unref(properties)) == null ? void 0 : _b.input) == "file") {
              _push(`<!--[--><label>${ssrInterpolate(__props.itemKey)}</label><div col-span-3>`);
              _push(ssrRenderComponent(_component_USelect, {
                modelValue: unref(refData)[__props.itemKey],
                "onUpdate:modelValue": ($event) => unref(refData)[__props.itemKey] = $event,
                options: unref(filesmap)
              }, {
                option: withCtx(({ item }, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<div class="flex gap-1"${_scopeId}>`);
                    if ((item == null ? void 0 : item.mime) && item.mime.includes("image")) {
                      _push2(`<div w-8${_scopeId}><img${ssrRenderAttr("src", item.value)} w-8${_scopeId}></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((item == null ? void 0 : item.mime) && item.mime.includes("audio")) {
                      _push2(`<div w-8 text-center${_scopeId}><div i-solar-play-linear mx-auto${_scopeId}></div></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((item == null ? void 0 : item.mime) && item.mime.includes("video")) {
                      _push2(`<div w-8 text-center${_scopeId}><div i-solar-video-frame-play-vertical-line-duotone mx-auto${_scopeId}></div></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((item == null ? void 0 : item.mime) && item.mime.includes("video")) {
                      _push2(`<div${_scopeId}><img${ssrRenderAttr("src", item.value)} w-8${_scopeId}></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div${_scopeId}>${ssrInterpolate(item.label)}</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex gap-1" }, [
                        (item == null ? void 0 : item.mime) && item.mime.includes("image") ? (openBlock(), createBlock("div", {
                          key: 0,
                          "w-8": ""
                        }, [
                          createVNode("img", {
                            src: item.value,
                            "w-8": ""
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("v-if", true),
                        (item == null ? void 0 : item.mime) && item.mime.includes("audio") ? (openBlock(), createBlock("div", {
                          key: 1,
                          "w-8": "",
                          "text-center": ""
                        }, [
                          createVNode("div", {
                            "i-solar-play-linear": "",
                            "mx-auto": ""
                          })
                        ])) : createCommentVNode("v-if", true),
                        (item == null ? void 0 : item.mime) && item.mime.includes("video") ? (openBlock(), createBlock("div", {
                          key: 2,
                          "w-8": "",
                          "text-center": ""
                        }, [
                          createVNode("div", {
                            "i-solar-video-frame-play-vertical-line-duotone": "",
                            "mx-auto": ""
                          })
                        ])) : createCommentVNode("v-if", true),
                        (item == null ? void 0 : item.mime) && item.mime.includes("video") ? (openBlock(), createBlock("div", { key: 3 }, [
                          createVNode("img", {
                            src: item.value,
                            "w-8": ""
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("v-if", true),
                        createVNode(
                          "div",
                          null,
                          toDisplayString(item.label),
                          1
                          /* TEXT */
                        )
                      ])
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent));
              _push(`</div><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--COLOR-->`);
            if (((_c = unref(properties)) == null ? void 0 : _c.input) == "color") {
              _push(`<!--[--><label>${ssrInterpolate(__props.itemKey)}</label><div col-span-3>`);
              _push(ssrRenderComponent(_component_UInput, {
                modelValue: unref(refData)[__props.itemKey],
                "onUpdate:modelValue": ($event) => unref(refData)[__props.itemKey] = $event,
                class: "dark:text-neutral w-full",
                size: "sm",
                type: "color"
              }, null, _parent));
              _push(`</div><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--REPEAT-->`);
            if (((_d = unref(properties)) == null ? void 0 : _d.input) == "repeat") {
              _push(`<!--[--><label>${ssrInterpolate(__props.itemKey)}</label><div col-span-3 mt-1>`);
              _push(ssrRenderComponent(_component_UInput, {
                modelValue: _ctx.repeater,
                "onUpdate:modelValue": ($event) => _ctx.repeater = $event,
                class: "dark:text-neutral w-full",
                size: "sm"
              }, {
                append: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<div w-full px-2 cursor-pointer${_scopeId}>+</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        "w-full": "",
                        "px-2": "",
                        "cursor-pointer": "",
                        onClick: _ctx.repeaterNew
                      }, "+", 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent));
              _push(`</div><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else if ((_e = unref(properties)) == null ? void 0 : _e.enum) {
            _push(`<div class="grid grid-cols-4 items-center p-1"><label>${ssrInterpolate(__props.itemKey)}</label><div col-span-3 class="flex flex-wrap text-white gap-2"><!--[-->`);
            ssrRenderList(unref(properties).enum, (pItem, pIndex) => {
              _push(ssrRenderComponent(_component_URadio, {
                key: pIndex,
                modelValue: unref(refData)[__props.itemKey],
                "onUpdate:modelValue": ($event) => unref(refData)[__props.itemKey] = $event,
                value: pItem,
                type: "primary",
                class: "bg-white px-1 rounded"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(pItem)}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(pItem),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent));
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!--[--><!--NO INPUT or ENUM DEFINED --><div class="${ssrRenderClass([[__props.itemKey == "class" ? "bg-primary/70" : "", __props.itemKey == "id" ? "bg-secondary/30" : "", __props.itemKey == "text" ? "bg-rose-600/30" : ""], "grid grid-cols-4 items-center px-1 py-0.5"])}"><!-- TEXT-->`);
            if (typeof unref(refData)[__props.itemKey] == "string") {
              _push(`<!--[--><label>${ssrInterpolate(__props.itemKey)}</label><div col-span-3>`);
              if (__props.itemKey == "class") {
                _push(`<textarea class="dark:text-neutral w-full text-[12px] !p-0.5 textarea rounded border-1 border-primary leading-3" size="sm">${ssrInterpolate(unref(refData)[__props.itemKey])}</textarea>`);
              } else {
                _push(ssrRenderComponent(_component_UInput, {
                  modelValue: unref(refData)[__props.itemKey],
                  "onUpdate:modelValue": ($event) => unref(refData)[__props.itemKey] = $event,
                  class: "dark:text-neutral w-full !p-0.5 !text-[12px]",
                  size: "sm"
                }, null, _parent));
              }
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
            if (__props.itemKey == "symbol") {
              _push(`<!--[--><label mt-1>Reemplazo:</label><div col-span-3 mt-1>`);
              _push(ssrRenderComponent(_component_UInput, {
                modelValue: unref(symbolReplaceFN),
                "onUpdate:modelValue": ($event) => isRef(symbolReplaceFN) ? symbolReplaceFN.value = $event : null,
                class: "dark:text-neutral w-full",
                size: "sm"
              }, {
                append: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<div w-full px-2 cursor-pointer${_scopeId}>+</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        "w-full": "",
                        "px-2": "",
                        "cursor-pointer": "",
                        onClick: symbolReplaceNew
                      }, "+")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent));
              _push(`</div><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><!--]-->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!--[--><!--/ string inputs --><!-- OBJECT inputs--><div><div p-1 class="${ssrRenderClass(["bg-" + levelColor()])}" text-white cursor-pointer>${ssrInterpolate(__props.itemKey)} ${ssrInterpolate((_f = unref(properties)) == null ? void 0 : _f.input)} <!-- : {{ data[itemKey].block }} : {{ properties?.input }}--></div>`);
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
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/BDModulosInputs.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __unplugin_components_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/BDModulosInputs.vue"]]);
const _sfc_main$a = {
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
      item["id"] = getRandomCharacters();
      return item;
    }
    loadModulos();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(draggable), mergeProps({
        list: unref(modules),
        group: { name: "people", pull: "clone", put: false },
        "item-key": "id",
        class: ["grid grid-cols-4 md:grid-cols-7 lg:grid-cols-9 gap-0.5 p-0.5", unref(drag) ? "bg-pink" : ""],
        sort: false,
        clone: clonedModule,
        onStart: ($event) => drag.value = true,
        onEnd: ($event) => drag.value = false
      }, _attrs), {
        item: withCtx(({ element }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttr("title", element.name)} flex flex-col cursor-grab items-center justify-center bg-white dark:bg-slate-8${_scopeId}><div${_scopeId}>${element.icon}</div><div class="text-[6px] break-words"${_scopeId}>${ssrInterpolate(element.name)}</div></div>`);
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
                  "div",
                  { class: "text-[6px] break-words" },
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsBlocks.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __unplugin_components_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsBlocks.vue"]]);
const _sfc_main$9 = {
  __name: "builderDetailsModulos",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    ref(false);
    ref();
    const contentModel = ref(builderstore.doc ? builderstore.doc.content : "");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BuilderDetailsBlocks = __unplugin_components_0$4;
      const _component_BDModulosInputs = __unplugin_components_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ relative: "" }, _attrs))}><div sticky top-0 z-10 bg-slate-800>`);
      _push(ssrRenderComponent(_component_BuilderDetailsBlocks, null, null, _parent));
      _push(`</div><!-- version 1 --><!--
    <div class="bg-slate-300 dark:bg-slate-700 p-0.5">
      <template v-for="(key, index) in Object.keys(contentModel)">
        <BuilderDetailsContainers  :data="contentModel" :keyval="key" :level="1" :blockparent="key" />
      </template>
    </div>
    --><div bg-slate-100 dark:bg-slate-900><!--[-->`);
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetailsModulos.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __unplugin_components_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetailsModulos.vue"]]);
const _sfc_main$8 = {
  __name: "builderDetails",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BuilderDetailsModulos = __unplugin_components_0$3;
      const _component_BuilderDetailsCodigo = __unplugin_components_1$3;
      const _component_BuilderDetailsPrompts = __unplugin_components_2;
      const _component_BuilderDetailsAssets = __unplugin_components_3;
      const _component_BuilderDetailsAudios = __unplugin_components_4;
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: "w-2/6",
        "bg-slate-5": "",
        "h-screen": "",
        flex: "",
        "flex-col": ""
      }, _attrs))}><header p-2 text-center text-xs text-white>${ssrInterpolate(unref(builderstore).menu.name)}</header><section bg-slate-800 overflow-x-hidden overflow-y-auto flex flex-col grow>`);
      _push(ssrRenderComponent(_component_BuilderDetailsModulos, {
        style: unref(builderstore).menu.id == "modulos" ? null : { display: "none" }
      }, null, _parent));
      if (unref(builderstore).menu.id == "codigo") {
        _push(ssrRenderComponent(_component_BuilderDetailsCodigo, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_BuilderDetailsPrompts, {
        style: unref(builderstore).menu.id == "prompts" ? null : { display: "none" }
      }, null, _parent));
      if (unref(builderstore).menu.id == "assets") {
        _push(ssrRenderComponent(_component_BuilderDetailsAssets, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_BuilderDetailsAudios, {
        style: unref(builderstore).menu.id == "audios" ? null : { display: "none" }
      }, null, _parent));
      _push(`</section></aside>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderDetails.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderDetails.vue"]]);
const _sfc_main$7 = {
  __name: "builderNotes",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    const dialog = ref(false);
    const note = ref(builderstore.doc.notes);
    const handleWindow = ref(null);
    ref("w-60");
    const updateNote = () => {
      builderstore.doc.notes = note.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div title="Notas" class="aspect-square flex cursor-pointer items-center justify-center bg-amber-600/30 hover:bg-amber"><div class="i-solar-notebook-line-duotone"></div></div><div class="fixed bottom-0 left-20 bg-slate-700 shadow text-xs p-1 w-80"></div>`);
      if (unref(dialog)) {
        _push(ssrRenderComponent(unref(UseDraggable), {
          "prevent-default": true,
          handle: unref(handleWindow),
          class: ["floating-window resize overflow-auto z-90 text-xs fixed bg-white shadow-xl border-2 border-amber-500 min-w-[220px] min-h-[220px] flex flex-col"]
        }, {
          default: withCtx(({ x, y }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<header class="bg-amber-500 text-slate-600 cursor-grab p-0.5 flex gap-2"${_scopeId}> Notas </header><textarea class="dark:text-slate-900 h-60 w-full h-full flex-grow resize-none text-[12px] textarea rounded-0 leading-4 p-2"${_scopeId}>${ssrInterpolate(unref(note))}</textarea>`);
            } else {
              return [
                createVNode("header", {
                  ref_key: "handleWindow",
                  ref: handleWindow,
                  class: "bg-amber-500 text-slate-600 cursor-grab p-0.5 flex gap-2",
                  onMousedown: _ctx.startDragging
                }, " Notas ", 40, ["onMousedown"]),
                withDirectives(createVNode("textarea", {
                  "onUpdate:modelValue": ($event) => isRef(note) ? note.value = $event : null,
                  class: "dark:text-slate-900 h-60 w-full h-full flex-grow resize-none text-[12px] textarea rounded-0 leading-4 p-2",
                  onInput: updateNote
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vModelText, unref(note)]
                ])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/builderNotes.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __unplugin_components_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/builderNotes.vue"]]);
const _sfc_main$6 = {
  __name: "builderMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    const buttons = ref([
      { name: "Módulos", id: "modulos", icon: "i-solar:box-minimalistic-broken" },
      { name: "Código", id: "codigo", icon: "i-solar:code-2-bold-duotone" },
      { name: "Prompts", id: "prompts", icon: "i-solar:chat-square-call-line-duotone" },
      { name: "Assets", id: "assets", icon: "i-solar:file-smile-broken" },
      { name: "Audios", id: "audios", icon: "i-solar:translation-2-line-duotone" }
    ]);
    const currentbutton = ref(buttons.value[0]);
    builderstore.menu = currentbutton.value;
    const saveToast = ref();
    const saveLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UToast = resolveComponent("UToast");
      const _component_router_link = resolveComponent("router-link");
      const _component_BuilderNotes = __unplugin_components_0$2;
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
      _push(ssrRenderComponent(_component_router_link, {
        class: "mt-auto",
        to: "/" + unref(builderstore).type
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div title="Regresar" class="mt-auto aspect-square flex cursor-pointer items-center justify-center bg-neutral-900/30 hover:bg-amber mb-20"${_scopeId}><div class="i-solar-arrow-left-broken"${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("div", {
                title: "Regresar",
                class: "mt-auto aspect-square flex cursor-pointer items-center justify-center bg-neutral-900/30 hover:bg-amber mb-20"
              }, [
                createVNode("div", { class: "i-solar-arrow-left-broken" })
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_BuilderNotes, null, null, _parent));
      _push(`<div title="Sincronizar" class="aspect-square flex cursor-pointer items-center justify-center bg-stone-5/30 hover:bg-amber"><div class="i-solar-refresh-circle-line-duotone"></div></div><div title="Guardar" class="aspect-square flex cursor-pointer items-center justify-center bg-cyan-5/30 hover:bg-amber">`);
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
      _push(`</div><div title="Descargar" class="aspect-square flex cursor-pointer items-center justify-center bg-emerald-5/30 hover:bg-amber"><div class="i-solar:cloud-download-line-duotone"></div></div></aside>`);
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
    router.push("/dashboard");
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
const __pages_import_0__ = () => import("./assets/index-e402fcad.js");
const __pages_import_2__ = () => import("./assets/dashboard-47aa0832.js");
const __pages_import_3__ = () => import("./assets/about-0c00c4c2.js");
const __pages_import_4__ = () => import("./assets/README-57503617.js");
const __pages_import_5__ = () => import("./assets/_...all_-b61d8411.js");
const __pages_import_6__ = () => import("./assets/_name_-179281f9.js");
const __pages_import_7__ = () => import("./assets/_key_-a7261d19.js");
const routes$1 = [{ "name": "riodas", "path": "/riodas", "component": __pages_import_0__, "props": true, "meta": { "layout": "builder", "requiresAuth": true } }, { "name": "index", "path": "/", "component": __pages_import_1__, "props": true, "meta": { "layout": "home", "requiresAuth": false } }, { "name": "dashboard", "path": "/dashboard", "component": __pages_import_2__, "props": true, "meta": { "layout": "default", "requiresAuth": true } }, { "name": "about", "path": "/about", "component": __pages_import_3__, "props": true }, { "name": "README", "path": "/readme", "component": __pages_import_4__, "props": true }, { "name": "all", "path": "/:all(.*)*", "component": __pages_import_5__, "props": true, "meta": { "layout": 404 } }, { "name": "hi-name", "path": "/hi/:name", "component": __pages_import_6__, "props": true }, { "name": "riodas-key", "path": "/riodas/:key", "component": __pages_import_7__, "props": true, "meta": { "layout": "builder", "requiresAuth": true } }];
const main = "";
const __uno = "";
localStorage.theme = "dark";
document.getElementsByTagName("html")[0].setAttribute("class", "dark");
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
