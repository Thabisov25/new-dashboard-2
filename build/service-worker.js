// Service Worker

const CACHE_NAME = "vincent-pt-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/logo192.png",
  "/logo512.png",
  "/manifest.json"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
