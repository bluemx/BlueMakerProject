import { mergeProps, useSSRContext, ref, unref, defineComponent, resolveComponent, withCtx, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, a as useUserStore, s as supabase, f as favicon, b as block0 } from "../main.mjs";
import { useRouter } from "vue-router";
import "@intlify/shared";
import "@intlify/core-base";
import "@vue/devtools-api";
import "@intlify/vue-devtools";
import "nprogress";
import "pinia";
import "@supabase/supabase-js";
import "unocss-ui";
import "vite-ssg";
import "vue3-json-editor";
import "vue-codemirror";
import "@codemirror/lang-json";
import "@codemirror/theme-one-dark";
import "vuedraggable";
import "@vueuse/head";
import "@vueuse/core";
const _sfc_main$3 = {
  __name: "UserLogout",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "bg-slate-400 p-2" }, _attrs))}> Logout </button>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UserLogout.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/UserLogout.vue"]]);
const _sfc_main$2 = {
  __name: "AdminAuthorized",
  __ssrInlineRender: true,
  setup(__props) {
    const authorized = ref([]);
    const newuser = ref();
    async function loadItems() {
      const { data, error, status } = await supabase.from("authorized").select();
      authorized.value = data;
      newuser.value = null;
    }
    loadItems();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto my-10 max-w-4xl" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(authorized), (item, index) => {
        _push(`<div class="grid grid-cols-2 mb-0.5 bg-slate-1 p-1"><div text-sm dark:text-dark>${ssrInterpolate(item.email)}</div><button class="bg-rose text-xs text-white hover:bg-slate-5"> Eliminar </button></div>`);
      });
      _push(`<!--]--><form class="grid grid-cols-2 bg-slate-1 p-1"><input${ssrRenderAttr("value", unref(newuser))} type="email" placeholder="nuevo" required rounded p-2 text-center text-xs dark:text-neutral><button class="bg-slate-5 text-xs text-white hover:bg-blue"> Añadir </button></form></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/AdminAuthorized.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __unplugin_components_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/AdminAuthorized.vue"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AdminAuthorized = __unplugin_components_0$1;
  _push(ssrRenderComponent(_component_AdminAuthorized, _attrs, null, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UserAdmin.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/components/UserAdmin.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "DashboardPage"
  },
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useUserStore();
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_router_link = resolveComponent("router-link");
      const _component_UserAdmin = __unplugin_components_0;
      const _component_UserLogout = __unplugin_components_1;
      _push(`<!--[--><div><div><img${ssrRenderAttr("src", unref(favicon))} alt="BlueMaker" mx-auto w-6></div><div my-5>${ssrInterpolate((_b = (_a = unref(user)) == null ? void 0 : _a.profile) == null ? void 0 : _b.username)}</div></div><div grid grid-cols-4 mx-auto max-w-2xl gap-2>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/riodas" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button aspect-square w-full bg-rose${_scopeId}> RIODAS </button>`);
          } else {
            return [
              createVNode("button", {
                "aspect-square": "",
                "w-full": "",
                "bg-rose": ""
              }, " RIODAS ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<button aspect-square w-full bg-slate-1 dark:text-neutral> MAILING </button><button aspect-square w-full bg-slate-1 dark:text-neutral> SITIO </button><button aspect-square w-full bg-slate-1 dark:text-neutral></button></div><div mt-36>`);
      if (((_d = (_c = unref(user)) == null ? void 0 : _c.profile) == null ? void 0 : _d.role) == "admin") {
        _push(ssrRenderComponent(_component_UserAdmin, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UserLogout, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/pages/dashboard.vue"]]);
export {
  dashboard as default
};
