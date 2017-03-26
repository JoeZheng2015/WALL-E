this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v2').then(function(cache) {
            return cache.addAll([
            '/WALL-E/', // 访问目录时，返回了 html 文件，所以需要缓存这个请求
            // '/WALL-E/index.html', 对 html 的请求反而是不用的
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

