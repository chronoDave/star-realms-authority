"use strict";(()=>{self.addEventListener("install",e=>{e.waitUntil(caches.open("srat").then(s=>{s.addAll(["/","/index.html","/index.css","/index.js","/assets/authority.png","/assets/bg.png","/assets/life-up.wav","/assets/life-down.wav"])}))});self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(s=>s||fetch(e.request)))});})();
//# sourceMappingURL=service.js.map
