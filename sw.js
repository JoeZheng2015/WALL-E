const relativeUrl = [
    './',
    'index.html',
    'app.js',
    'images/wallpaper1.jpg',
]

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('WALL-E-V1').then(function(cache) {
            const absoluteUrl = relativeUrl.map(url => new URL(url, location).toString())

            return cache.addAll(absoluteUrl)
        })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

