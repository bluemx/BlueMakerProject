import{g as a,M as o,o as e,c as n,N as l}from"./app-9aebb73f.js";const p={class:"prose prose-sm m-auto text-left"},t=l(`<h2>File-based Routing</h2><p>Routes will be auto-generated for Vue files in this dir with the same file structure. Check out <a href="https://github.com/hannoeru/vite-plugin-pages" target="_blank" rel="noopener"><code>vite-plugin-pages</code></a> for more details.</p><h3>Path Aliasing</h3><p><code>~/</code> is aliased to <code>./src/</code> folder.</p><p>For example, instead of having</p><pre hidden></pre><div class="shiki-container language-ts"><pre class="shiki shiki-dark vitesse-dark" style="background-color:#121212;" tabindex="0"><code><span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">isDark</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">../../../../composables</span><span style="color:#C98A7D99;">&#39;</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light vitesse-light" style="background-color:#ffffff;" tabindex="0"><code><span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">isDark</span><span style="color:#393A34;"> </span><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">../../../../composables</span><span style="color:#B5695999;">&#39;</span></span>
<span class="line"></span></code></pre></div><p>now, you can use</p><pre hidden></pre><div class="shiki-container language-ts"><pre class="shiki shiki-dark vitesse-dark" style="background-color:#121212;" tabindex="0"><code><span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">isDark</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">~/composables</span><span style="color:#C98A7D99;">&#39;</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light vitesse-light" style="background-color:#ffffff;" tabindex="0"><code><span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">isDark</span><span style="color:#393A34;"> </span><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">~/composables</span><span style="color:#B5695999;">&#39;</span></span>
<span class="line"></span></code></pre></div>`,10),r=[t],A=[],c={__name:"README",setup(i,{expose:s}){return s({frontmatter:{meta:[]}}),o({meta:[]}),(D,h)=>(e(),n("div",p,r))}},m=a(c,[["__file","/Users/fldsmdfr/Documents/GitHub/BlueMakerProject/src/pages/README.md"]]);export{m as default,A as meta};