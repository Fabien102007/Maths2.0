const CACHE = "maths2-runtime-v36";
const CORE = ["./", "./index.html", "./landing.html", "./style.css", "./app.js", "./account.js", "./config.js", "./data.js", "./curriculum.js", "./account.js", "./privacy.html", "./legal.html", "./manifest.webmanifest", "./assets/icon.svg"];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  // Toujours vérifier la version publiée en ligne avant d'utiliser le cache.
  event.respondWith((async () => {
    try {
      const response = await fetch(request, { cache: "no-store" });
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
      }
      return response;
    } catch (error) {
      const cached = await caches.match(request, { ignoreSearch: true });
      if (cached) return cached;
      if (request.mode === "navigate") return caches.match("./index.html");
      throw error;
    }
  })());
});