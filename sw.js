/* ─── Fluir · Service Worker ────────────────────────────────────────────── */

const CACHE_NAME = 'fluir-v48';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/tokens.css',
  '/css/base.css',
  '/css/layout.css',
  '/css/components.css',
  '/js/app.js',
  '/js/store.js',
  '/js/games.js',
  '/js/anki.js',
  '/js/data/chapter1.js',
  '/js/data/chapter2.js',
  '/js/data/chapter3.js',
  '/js/data/chapter4.js',
  '/js/data/chapter5.js',
  '/js/data/chapter6.js',
  '/js/data/chapter7.js',
  '/js/data/chapter8.js',
  '/js/data/chapter9.js',
  '/js/data/chapter10.js',
  '/js/data/chapter11.js',
  '/js/data/chapter12.js',
  '/js/data/chapter13.js',
  '/js/data/chapter14.js',
  '/js/data/chapter15.js',
  '/js/data/chapters-list.js',
  '/pages/home.js',
  '/pages/lesson.js',
  '/pages/training.js',
  '/pages/progress.js',
  '/pages/settings.js',
  '/js/vendor/sql-wasm.min.js',
  '/js/vendor/sql-wasm.wasm',
  '/js/vendor/jszip.min.js',
  '/assets/icons/icon-192.svg',
  '/assets/icons/icon-512.svg',
  '/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
