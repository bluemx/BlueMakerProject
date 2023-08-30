import { ref, onMounted, watch, resolveComponent, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { u as useBuilderStore, b as block0 } from "../main.mjs";
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
import "crunker";
import "vuedraggable";
import "openai";
import "vue3-json-editor";
import "@vueuse/core";
import "@vueuse/components";
import "@vueuse/head";
const _sfc_main = {
  __name: "[key]",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRoute();
    const builderstore = useBuilderStore();
    const loading = ref();
    builderstore.type = "riodas";
    const iframeurl = window.location.href.includes("localhost") ? "https://localhost:5173/#MAKER" : "https://odas.win/#MAKER";
    const loadDoc = async () => {
      await builderstore.loadDoc(router.params.key);
      sendData();
    };
    const iframe = ref();
    ref(false);
    const sendData = () => {
      var _a;
      const datos = {
        type: "oda",
        oda: (_a = builderstore == null ? void 0 : builderstore.doc) == null ? void 0 : _a.content
      };
      iframe.value.contentWindow.postMessage(JSON.stringify(datos), "*");
    };
    onMounted(() => {
      var _a;
      (_a = loading == null ? void 0 : loading.value) == null ? void 0 : _a.showModal();
      watch(builderstore, (ncontent) => {
        if (ncontent.doc) {
          sendData();
        }
      }, { deep: true });
      setTimeout(() => {
        loadDoc();
      }, 200);
      iframe.value.onload = () => {
        sendData();
        builderstore.iframe = iframe.value;
      };
    });
    const restartoda = () => {
      const datos = { type: "restartoda" };
      iframe.value.contentWindow.postMessage(JSON.stringify(datos), "*");
      setTimeout(() => {
        sendData();
      }, 200);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = resolveComponent("UButton");
      _push(`<!--[-->`);
      if (!unref(builderstore).doc) {
        _push(`<dialog> Loading... </dialog>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section flex-grow bg-slate-100 p-1 dark:bg-slate-900 relative><iframe${ssrRenderAttr("src", unref(iframeurl))} frameborder="0" class="w-full h-full" allow="camera;microphone;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true"></iframe><div absolute right-2 bottom-2>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: restartoda,
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Reset ODA`);
          } else {
            return [
              createTextVNode("Reset ODA")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><!--]-->`);
    };
  }
};
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/riodas/[key].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
