/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-ac117c94'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "about.html",
    "revision": "f56d2a7515e720054a087df675080265"
  }, {
    "url": "assets/_...all_-43021ba1.js",
    "revision": null
  }, {
    "url": "assets/_key_-15bd3b51.js",
    "revision": null
  }, {
    "url": "assets/_name_-2cf770e9.js",
    "revision": null
  }, {
    "url": "assets/404-cf487ac2.js",
    "revision": null
  }, {
    "url": "assets/about-5f6d5398.js",
    "revision": null
  }, {
    "url": "assets/app-c8e81ced.js",
    "revision": null
  }, {
    "url": "assets/ar-3116e923.js",
    "revision": null
  }, {
    "url": "assets/builder-a102cc51.js",
    "revision": null
  }, {
    "url": "assets/builder-fbafaac1.js",
    "revision": null
  }, {
    "url": "assets/dashboard-403db83e.js",
    "revision": null
  }, {
    "url": "assets/de-ac17cf5a.js",
    "revision": null
  }, {
    "url": "assets/en-2ef8769f.js",
    "revision": null
  }, {
    "url": "assets/es-44e40f41.js",
    "revision": null
  }, {
    "url": "assets/fr-3deced60.js",
    "revision": null
  }, {
    "url": "assets/home-b1c6c3df.js",
    "revision": null
  }, {
    "url": "assets/id-f4fd9e4f.js",
    "revision": null
  }, {
    "url": "assets/index-3ec50c06.css",
    "revision": null
  }, {
    "url": "assets/index-6dd51f0a.js",
    "revision": null
  }, {
    "url": "assets/it-3c0c7e92.js",
    "revision": null
  }, {
    "url": "assets/ja-0025478b.js",
    "revision": null
  }, {
    "url": "assets/jszip-91ed46b9.js",
    "revision": null
  }, {
    "url": "assets/ka-4057ec5d.js",
    "revision": null
  }, {
    "url": "assets/ko-8aa88c71.js",
    "revision": null
  }, {
    "url": "assets/pl-0a9960ff.js",
    "revision": null
  }, {
    "url": "assets/pt-BR-df026943.js",
    "revision": null
  }, {
    "url": "assets/README-6c5d7f28.js",
    "revision": null
  }, {
    "url": "assets/ru-afb15a13.js",
    "revision": null
  }, {
    "url": "assets/tr-d2e1ae0a.js",
    "revision": null
  }, {
    "url": "assets/uk-557bb745.js",
    "revision": null
  }, {
    "url": "assets/uz-b8775f75.js",
    "revision": null
  }, {
    "url": "assets/vi-80491d22.js",
    "revision": null
  }, {
    "url": "assets/virtual_pwa-register-2051fc53.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-a7b12eab.js",
    "revision": null
  }, {
    "url": "assets/zh-CN-253ef87b.js",
    "revision": null
  }, {
    "url": "dashboard.html",
    "revision": "8f5f9235793ceeb31600037beba7ba2a"
  }, {
    "url": "index.html",
    "revision": "96ed98c4a447d3ad00a28e56811ab2b8"
  }, {
    "url": "readme.html",
    "revision": "205151f5c7338bf56e74c6303748598c"
  }, {
    "url": "riodas.html",
    "revision": "108274a1a0f4fdb2cc40200e523475c3"
  }, {
    "url": "favicon.svg",
    "revision": "81a0a655d0a408148ad2361b72b9c3c8"
  }, {
    "url": "safari-pinned-tab.svg",
    "revision": "81a0a655d0a408148ad2361b72b9c3c8"
  }, {
    "url": "pwa-192x192.png",
    "revision": "018c3abc2c6b290ce696767a2db75d40"
  }, {
    "url": "pwa-512x512.png",
    "revision": "78d2efd7eb8dc77da9019bc1e77d4708"
  }, {
    "url": "manifest.webmanifest",
    "revision": "efec1326f07322ad5eba1ac8645f9856"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
