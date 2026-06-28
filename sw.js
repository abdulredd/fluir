/* ─── Fluir · Service Worker ──────────────────────────────────────────────
   Precache checklist — add new deploy assets here AND bump CACHE_NAME:
   • css/pages.css, css/components.css, …
   • js/* modules (app, store, data, pages, lesson builders)
   • vendor sql-wasm / jszip, icons, manifest
   Run `npm test` — tests/sw.test.js validates every path exists.
   ─────────────────────────────────────────────────────────────────────── */

const CACHE_NAME = 'fluir-v115';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/tokens.css',
  '/css/base.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/pages.css',
  '/js/app.js',
  '/js/store.js',
  '/js/utils.js',
  '/js/vocab-display.js',
  '/js/dom.js',
  '/js/icons.js',
  '/js/sw-register.js',
  '/js/chapters/access.js',
  '/js/streak.js',
  '/js/data/vocab-keys.js',
  '/js/data/registry.js',
  '/js/games.js',
  '/js/games/index.js',
  '/js/games/dispatch.js',
  '/js/games/shared.js',
  '/js/games/ui.js',
  '/js/games/article-picker.js',
  '/js/games/fill-article.js',
  '/js/games/matching.js',
  '/js/games/plural-picker.js',
  '/js/games/adjective.js',
  '/js/games/translation.js',
  '/js/games/conjugation.js',
  '/js/games/ser-vs-estar.js',
  '/js/games/number-quiz.js',
  '/js/games/sentence-completion.js',
  '/js/games/vocab-picker.js',
  '/js/training-questions.js',
  '/js/training/lesson-types.js',
  '/js/training/coverage.js',
  '/js/training/practice-sources.js',
  '/js/training/generate-question.js',
  '/js/anki.js',
  '/js/data/grammar-rules.js',
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
  '/pages/ui.js',
  '/pages/lesson.js',
  '/pages/lesson/index.js',
  '/pages/lesson/intro.js',
  '/pages/lesson/rules.js',
  '/pages/lesson/questions.js',
  '/pages/lesson/builder-utils.js',
  '/pages/lesson/builder-registry.js',
  '/pages/lesson/runner.js',
  '/pages/lesson/builders/ch1.js',
  '/pages/lesson/builders/ch2.js',
  '/pages/lesson/builders/ch3.js',
  '/pages/lesson/builders/ch4.js',
  '/pages/lesson/builders/ch5.js',
  '/pages/lesson/builders/ch6.js',
  '/pages/lesson/builders/ch7.js',
  '/pages/lesson/builders/ch8.js',
  '/pages/lesson/builders/ch9.js',
  '/pages/lesson/builders/ch10.js',
  '/pages/lesson/builders/ch11.js',
  '/pages/lesson/builders/ch12.js',
  '/pages/lesson/builders/ch13.js',
  '/pages/lesson/builders/ch14.js',
  '/pages/lesson/builders/ch15.js',
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

/** HTML + JS + CSS: network-first so deploys propagate while online; cache is offline fallback. */
function isNetworkFirst(url) {
  const { pathname } = new URL(url);
  if (pathname === '/' || pathname.endsWith('.html')) return true;
  if (pathname.endsWith('.js')) return true;
  if (pathname.endsWith('.css')) return true;
  return false;
}

function isCacheable(response) {
  return response && response.status === 200 && response.type === 'basic';
}

async function putInCache(request, response) {
  if (!isCacheable(response)) return;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    await putInCache(request, response.clone());
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const shell = await caches.match('/index.html');
      if (shell) return shell;
    }
    throw err;
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  await putInCache(request, response.clone());
  return response;
}

async function precacheAll(cache, urls) {
  const results = await Promise.allSettled(
    urls.map(url => cache.add(url))
  );
  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.warn('[Fluir SW] precache failed:', urls[i], result.reason);
    }
  });
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => precacheAll(cache, PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    isNetworkFirst(event.request.url)
      ? networkFirst(event.request)
      : cacheFirst(event.request)
  );
});
