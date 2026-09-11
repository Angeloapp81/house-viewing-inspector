const CACHE_NAME = 'inspector-v2';

// Install new version immediately
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

// Delete all old cached files
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// Always fetch fresh from the network first
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
