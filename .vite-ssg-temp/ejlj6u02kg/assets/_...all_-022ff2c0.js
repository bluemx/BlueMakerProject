import { defineComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { c as useI18n, b as block0 } from "../main.mjs";
import "@intlify/shared";
import "@intlify/core-base";
import "@vue/devtools-api";
import "@intlify/vue-devtools";
import "nprogress";
import "pinia";
import "@supabase/supabase-js";
import "unocss-ui";
import "vite-ssg";
import "vue-router";
import "jszip-utils";
import "file-saver";
import "crunker";
import "vuedraggable";
import "openai";
import "vue3-json-editor";
import "@vueuse/core";
import "@vueuse/components";
import "@vueuse/head";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...all]",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>${ssrInterpolate(unref(t)("not-found"))}</div>`);
    };
  }
});
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/[...all].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
