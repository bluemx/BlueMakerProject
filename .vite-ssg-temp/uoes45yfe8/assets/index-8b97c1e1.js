import { useSSRContext, ref, computed, onMounted, resolveComponent, mergeProps, unref, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { u as useBuilderStore, s as supabase, b as block0 } from "../main.mjs";
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
import "vuedraggable";
import "crunker";
import "axios";
import "openai";
import "vue3-json-editor";
import "@vueuse/core";
import "@vueuse/components";
import "@vueuse/head";
const _sfc_main$1 = {
  __name: "BuilderDocManager",
  __ssrInlineRender: true,
  props: {
    defaultDoc: Object
  },
  setup(__props) {
    const builderstore = useBuilderStore();
    const dialog = ref();
    const filter = ref("");
    const docs = ref([]);
    const docsFilter = computed(() => {
      if (filter.value == "" || filter.value == null) {
        return docs.value;
      } else {
        return docs.value.filter((item) => {
          return item.key.toLowerCase().includes(filter.value.toLowerCase());
        });
      }
    });
    async function loadItems() {
      const { data: documents, error } = await supabase.from("documents").select("key");
      docs.value = documents;
    }
    const canCreate = computed(() => {
      let res = false;
      if (docsFilter.value && docsFilter.value.length) {
        if (docsFilter.value[0].key == filter.value)
          res = true;
      }
      return res;
    });
    onMounted(() => {
      dialog.value.showModal();
      loadItems();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<dialog${ssrRenderAttrs(mergeProps({
        ref_key: "dialog",
        ref: dialog,
        class: "flex flex-col gap-2 bg-slate-100"
      }, _attrs))}><div class="flex"><input${ssrRenderAttr("value", unref(filter))} required flex-grow rounded-tl p-2 text-center dark:text-neutral type="email" placeholder="ID"><button${ssrIncludeBooleanAttr(unref(canCreate)) ? " disabled" : ""} border-1 rounded-tr bg-slate px-6 py-1 text-xs text-white disabled:bg-slate-1> Nuevo </button></div><div grid grid-cols-2 my-5 gap-1 md:grid-cols-6 dark:text-neutral><!--[-->`);
      ssrRenderList(unref(docsFilter), (item, index) => {
        _push(ssrRenderComponent(_component_router_link, {
          to: `/${unref(builderstore).type}/${item.key}`,
          "border-1": "",
          "border-slate": "",
          rounded: "",
          "p-1": "",
          "text-center": "",
          "text-xs": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button${_scopeId}>${ssrInterpolate(item.key)}</button>`);
            } else {
              return [
                createVNode("button", null, toDisplayString(item.key), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></dialog>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/BuilderDocManager.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const builderstore = useBuilderStore();
    builderstore.type = "riodas";
    builderstore.doc = null;
    const defaultDocument = { "title": "Title", "clock": true, "countdown": 0, "intro": { "buttons": { "start": "Start" }, "content": [] }, "activity": { "scenes": [{ "block": "scene", "name": "SC1", "countdown": 0, "instructions": { "open": true, "content": [{ "block": "group", "class": "flex gap-2 items-center", "content": [{ "block": "audio", "class": "", "file": "instruction.mp3" }, { "block": "text", "class": "", "text": "Instructions text goes here..." }] }] }, "content": [{ "block": "group", "class": "bg-slate-100 rounded p-3 my-2 max-w-3xl mx-auto", "content": [{ "block": "text", "class": "", "text": "Activity content...", "name": "3Ovd", "hidden": false }], "background": "", "name": "4Cs6", "hidden": false }, { "symbol": "FinalizeGroup" }] }] }, "end": { "buttons": { "restart": false }, "content": [{ "symbol": "finishedAll" }] }, "symbols": { "finishedAll": { "class": "w-full", "content": [{ "block": "group", "class": "bg-slate-100 rounded p-5 text-center w-full", "content": [{ "block": "text", "text": "Congratulations, you finished the activity.", "class": "", "name": "Congra" }], "background": "", "name": "CongraGroup" }, { "block": "group", "class": "text-center p-5", "content": [{ "block": "finished", "name": "finishedBlock" }], "background": "", "name": "finishedGroup" }], "background": "", "block": "group" }, "FinalizeGroup": { "block": "group", "class": "text-center mt-10", "content": [{ "block": "button", "class": "mx-auto", "to": "/end", "text": "Finalize", "name": "FinalizeBTN" }], "background": "" } } };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BuilderDocManager = _sfc_main$1;
      if (!unref(builderstore).doc) {
        _push(ssrRenderComponent(_component_BuilderDocManager, mergeProps({ "default-doc": defaultDocument }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/riodas/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
