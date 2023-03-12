self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('srat').then(cache => {
      cache.addAll([
        '/',
        '/index.html',
        '/index.css',
        '/index.js',
        '/assets/authority.png',
        '/assets/bg.png',
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
