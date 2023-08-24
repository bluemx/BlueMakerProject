import { defineComponent, watchEffect, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { a as useUserStore, c as useI18n, _ as _export_sfc } from "../main.mjs";
import "@intlify/shared";
import "@intlify/core-base";
import "@vue/devtools-api";
import "@intlify/vue-devtools";
import "nprogress";
import "pinia";
import "@supabase/supabase-js";
import "unocss-ui";
import "vite-ssg";
import "jszip-utils";
import "file-saver";
import "openai";
import "vue3-json-editor";
import "vuedraggable";
import "@vueuse/core";
import "@vueuse/components";
import "@vueuse/head";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[name]",
  __ssrInlineRender: true,
  props: {
    "name": { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    useRouter();
    const user = useUserStore();
    const { t } = useI18n();
    watchEffect(() => {
      user.setNewName(props.name);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(_attrs)}><div text-4xl><div i-carbon-pedestrian inline-block></div></div><p>${ssrInterpolate(unref(t)("intro.hi", { name: props.name }))}</p><p text-sm opacity-75><em>${ssrInterpolate(unref(t)("intro.dynamic-route"))}</em></p>`);
      if (unref(user).otherNames.length) {
        _push(`<p mt-4 text-sm><span opacity-75>${ssrInterpolate(unref(t)("intro.aka"))}:</span><ul><!--[-->`);
        ssrRenderList(unref(user).otherNames, (otherName) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_RouterLink, {
            to: `/hi/${otherName}`,
            replace: ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(otherName)}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(otherName),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><button m="3 t6" text-sm btn>${ssrInterpolate(unref(t)("button.back"))}</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/hi/[name].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _name_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/pages/hi/[name].vue"]]);
export {
  _name_ as default
};
