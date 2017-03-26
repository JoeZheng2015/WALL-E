this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v2').then(function(cache) {
            return cache.addAll([
            '/WALL-E/', // 对应项目 url，所以没有资源也要缓存
            '/WALL-E/index.html',
            '/WALL-E/app.js',
            '/WALL-E/images/wallpaper1.jpg',
            ])
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

