const CACHE_FILES = [
  '/index.html',
  './',

  '/manifest.webmanifest',

  '/images/share-image.jpg',

  '/favicon.ico',
  '/favicon.svg',
  '/apple-touch-icon.png',

  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
]

const CACHE_VERSION = '1.2.8'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CACHE_FILES))
      .then(self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return cacheNames.filter((cacheName) => !CACHE_VERSION.includes(cacheName))
      }).then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete)
        }))
      }).then(() => self.clients.claim())
    )
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return

  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(async function() {
      try {
        return await fetch(event.request)
      } catch (err) {
        return caches.match(event.request)
      }
    }())
  }
})
