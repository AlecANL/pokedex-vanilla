const cacheName = 'app-v1';

const files = [
  '/',
  '/index.html',
  '/src/css/mobile-styles.css',
  '/src/js/app.js',
];

self.addEventListener('install', e => {
  console.log('installed');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('cached');
      cache.addAll(files);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(listKeys => {
      console.log(listKeys);
      return Promise.all(
        listKeys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
  console.log('activaded');
});

self.addEventListener('fetch', e => {
  console.log('fetch');
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
