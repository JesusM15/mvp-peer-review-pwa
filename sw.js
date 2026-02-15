// Service Worker para PWA - Cache First Strategy
const CACHE_NAME = 'peer-review-v1';
const urlsToCache = [
  '/',
  './index.html',
  './styles.css',
  './ArticleManager.js',
  './ArticleStorage.js',
  './icon-192.svg',
  './icon-512.svg',
  './manifest.json'
];

// Instalación - Cache de recursos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación - Limpieza de caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Cache First Strategy
self.addEventListener('fetch', (event) => {
  // Solo procesar peticiones HTTP/HTTPS, ignorar chrome-extension, chrome://, etc.
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // No cache hit - fetch from network
        return fetch(event.request).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone response for caching
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Network failed - try offline fallback
        return caches.match('./index.html');
      })
  );
});