this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v2').then(function(cache) {
      return cache.addAll([
        '/WALL-E/',
        '/WALL-E/index.html',
        '/WALL-E/app.js',
        '/WALL-E/images/wallpaper1.jpg',
      ]).then(res => {
        console.log('All resources have been fetched and cached.');
        return res
      })
    })
  );
});

this.addEventListener('fetch', function(event) {
  console.log('-', event.request)
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

