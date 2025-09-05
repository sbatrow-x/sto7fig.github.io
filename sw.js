// Service Worker for caching
const CACHE_NAME = 'swingto7figures-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/script.js',
  '/fbig.PNG',
  '/blogo.png',
  '/bg-500.png',
  '/bg-800.png',
  '/bg-1080.png',
  '/rv.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
