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
const title = "About";
const meta = [{ "property": "og:title", "content": "About" }, { "name": "twitter:title", "content": "About" }];
const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const frontmatter = { "title": "About", "meta": [{ "property": "og:title", "content": "About" }, { "name": "twitter:title", "content": "About" }] };
    __expose({ frontmatter });
    const head = { "title": "About", "meta": [{ "property": "og:title", "content": "About" }, { "name": "twitter:title", "content": "About" }] };
    useHead(head);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "prose prose-sm m-auto text-left" }, _attrs))}><div class="text-center"><!-- You can use Vue components inside markdown --><div i-carbon-dicom-overlay class="text-4xl -mb-6 m-auto"></div><h3>About</h3></div><p><a href="https://github.com/antfu/vitesse" target="_blank" rel="noopener">Vitesse</a> is an opinionated <a href="https://github.com/vitejs/vite" target="_blank" rel="noopener">Vite</a> starter template made by <a href="https://github.com/antfu" target="_blank" rel="noopener">@antfu</a> for mocking apps swiftly. With <strong>file-based routing</strong>, <strong>components auto importing</strong>, <strong>markdown support</strong>, I18n, PWA and uses <strong>UnoCSS</strong> for styling and icons.</p><pre hidden></pre><div class="shiki-container language-js"><pre class="shiki shiki-dark vitesse-dark" style="${ssrRenderStyle({ "background-color": "#121212" })}" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#758575DD" })}">// syntax highlighting example</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#CB7676" })}">function</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#80A665" })}">vitesse</span><span style="${ssrRenderStyle({ "color": "#666666" })}">()</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#666666" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}">  </span><span style="${ssrRenderStyle({ "color": "#CB7676" })}">const</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#BD976A" })}">foo</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#CB7676" })}">=</span><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}"> </span><span style="${ssrRenderStyle({ "color": "#C98A7D99" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C98A7D" })}">bar</span><span style="${ssrRenderStyle({ "color": "#C98A7D99" })}">&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#DBD7CAEE" })}">  </span><span style="${ssrRenderStyle({ "color": "#BD976A" })}">console</span><span style="${ssrRenderStyle({ "color": "#666666" })}">.</span><span style="${ssrRenderStyle({ "color": "#80A665" })}">log</span><span style="${ssrRenderStyle({ "color": "#666666" })}">(</span><span style="${ssrRenderStyle({ "color": "#BD976A" })}">foo</span><span style="${ssrRenderStyle({ "color": "#666666" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#666666" })}">}</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light vitesse-light" style="${ssrRenderStyle({ "background-color": "#ffffff" })}" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#A0ADA0" })}">// syntax highlighting example</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#AB5959" })}">function</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#59873A" })}">vitesse</span><span style="${ssrRenderStyle({ "color": "#999999" })}">()</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#999999" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#393A34" })}">  </span><span style="${ssrRenderStyle({ "color": "#AB5959" })}">const</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#B07D48" })}">foo</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#AB5959" })}">=</span><span style="${ssrRenderStyle({ "color": "#393A34" })}"> </span><span style="${ssrRenderStyle({ "color": "#B5695999" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#B56959" })}">bar</span><span style="${ssrRenderStyle({ "color": "#B5695999" })}">&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#393A34" })}">  </span><span style="${ssrRenderStyle({ "color": "#B07D48" })}">console</span><span style="${ssrRenderStyle({ "color": "#999999" })}">.</span><span style="${ssrRenderStyle({ "color": "#59873A" })}">log</span><span style="${ssrRenderStyle({ "color": "#999999" })}">(</span><span style="${ssrRenderStyle({ "color": "#B07D48" })}">foo</span><span style="${ssrRenderStyle({ "color": "#999999" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#999999" })}">}</span></span>
<span class="line"></span></code></pre></div><p>Check out the <a href="https://github.com/antfu/vitesse" target="_blank" rel="noopener">GitHub repo</a> for more details.</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/pages/about.md"]]);
export {
  about as default,
  meta,
  title
};
