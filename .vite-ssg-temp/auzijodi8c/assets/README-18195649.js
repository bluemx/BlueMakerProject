import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _export_sfc } from "../main.mjs";
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
import "jszip";
import "jszip-utils";
import "file-saver";
import "vue3-json-editor";
import "vuedraggable";
import "@vueuse/head";
import "@vueuse/core";
const meta = [];
const _sfc_main = {
  __name: "README",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const frontmatter = { "meta": [] };
    __expose({ frontmatter });
    const head = { "meta": [] };
    useHead(head);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "prose prose-sm m-auto text-left" }, _attrs))}><h2>File-based Routing</h2><p>Routes will be auto-generated for Vue files in this dir with the same file structure. Check out <a href="https://github.com/hannoeru/vite-plugin-pages" target="_blank" rel="noopener"><code>vite-plugin-pages</code></a> for more details.</p><h3>Path Aliasing</h3><p><code>~/</code> is aliased to <code>./src/</code> folder.</p><p>For example, instead of having</p><pre hidden></pre><div class="shiki-container language-ts"><pre class="shiki shiki-dark vitesse-dark" style="${ssrRenderStyle({ "background-color": "#121212" })}" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#4D9375" })}">import</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#666666" })}">{</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#BD976A" })}">isDark</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#666666" })}">}</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#4D9375" })}">from</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#C98A7D99" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C98A7D" })}">../../../../composables</span><span style="${ssrRenderStyle({ "color": "#C98A7D99" })}">&#39;</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light vitesse-light" style="${ssrRenderStyle({ "background-color": "#ffffff" })}" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#1E754F" })}">import</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#999999" })}">{</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#B07D48" })}">isDark</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#999999" })}">}</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#1E754F" })}">from</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#B5695999" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#B56959" })}">../../../../composables</span><span style="${ssrRenderStyle({ "color": "#B5695999" })}">&#39;</span></span>
<span class="line"></span></code></pre></div><p>now, you can use</p><pre hidden></pre><div class="shiki-container language-ts"><pre class="shiki shiki-dark vitesse-dark" style="${ssrRenderStyle({ "background-color": "#121212" })}" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#4D9375" })}">import</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#666666" })}">{</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#BD976A" })}">isDark</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#666666" })}">}</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#4D9375" })}">from</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#C98A7D99" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C98A7D" })}">~/composables</span><span style="${ssrRenderStyle({ "color": "#C98A7D99" })}">&#39;</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light vitesse-light" style="${ssrRenderStyle({ "background-color": "#ffffff" })}" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#1E754F" })}">import</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#999999" })}">{</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#B07D48" })}">isDark</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#999999" })}">}</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#1E754F" })}">from</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#B5695999" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#B56959" })}">~/composables</span><span style="${ssrRenderStyle({ "color": "#B5695999" })}">&#39;</span></span>
<span class="line"></span></code></pre></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/README.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const README = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/pages/README.md"]]);
export {
  README as default,
  meta
};
