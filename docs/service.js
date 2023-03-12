"use strict";(()=>{self.addEventListener("install",e=>{e.waitUntil(caches.open("srat").then(t=>{t.addAll(["/","/index.html","/index.css","/index.js","/assets/authority.png","/assets/bg.png"])}))});self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>t||fetch(e.request)))});})();
//# sourceMappingURL=service.js.map
