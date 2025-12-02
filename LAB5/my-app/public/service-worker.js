const CACHE_NAME = 'nutriindex-v1';

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Просто пробрасываем запросы дальше
  // (для PWA нам хватает offline fallback)
});
