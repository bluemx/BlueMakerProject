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
    "revision": "c6b586c13e2edb6b1aa9f4c524e60c00"
  }, {
    "url": "assets/_...all_-42e6309b.js",
    "revision": null
  }, {
    "url": "assets/_key_-b568e96f.js",
    "revision": null
  }, {
    "url": "assets/_name_-86fefbe4.js",
    "revision": null
  }, {
    "url": "assets/404-145586a7.js",
    "revision": null
  }, {
    "url": "assets/about-3cedf162.js",
    "revision": null
  }, {
    "url": "assets/app-cde0d0c9.js",
    "revision": null
  }, {
    "url": "assets/ar-3116e923.js",
    "revision": null
  }, {
    "url": "assets/builder-a6d2fcf9.js",
    "revision": null
  }, {
    "url": "assets/builder-a70ead1a.js",
    "revision": null
  }, {
    "url": "assets/dashboard-c03dc388.js",
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
    "url": "assets/home-b30a09bd.js",
    "revision": null
  }, {
    "url": "assets/id-f4fd9e4f.js",
    "revision": null
  }, {
    "url": "assets/index-0040c945.js",
    "revision": null
  }, {
    "url": "assets/index-6d187418.css",
    "revision": null
  }, {
    "url": "assets/it-3c0c7e92.js",
    "revision": null
  }, {
    "url": "assets/ja-0025478b.js",
    "revision": null
  }, {
    "url": "assets/jszip-8dffc35f.js",
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
    "url": "assets/README-f05fb4c4.js",
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
    "url": "assets/virtual_pwa-register-bd0d8eb1.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-a7b12eab.js",
    "revision": null
  }, {
    "url": "assets/zh-CN-253ef87b.js",
    "revision": null
  }, {
    "url": "dashboard.html",
    "revision": "1aff72609796c3399b924309d5fd13c0"
  }, {
    "url": "index.html",
    "revision": "7256a32c3e9bef6727d089a92f00c65b"
  }, {
    "url": "readme.html",
    "revision": "e3d073f85f75585bfce42d269641a523"
  }, {
    "url": "riodas.html",
    "revision": "1c184ca244c65d26e33ee15863256a55"
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
