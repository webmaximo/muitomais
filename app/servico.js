// This is the "Offline page" service worker

const CACHE = "app-pwa";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "offline.html";

//Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener('install', function(event) {
    var offlinePage = new Request('offline.html');
    event.waitUntil(
      fetch(offlinePage).then(function(response) {
        return caches.open('app-pwa').then(function(cache) {
          console.log('[PWA APP] Cached offline page during Install'+ response.url);
          return cache.put(offlinePage, response);
        });
    }));
  });
  
  //If any fetch fails, it will show the offline page.
  //Maybe this should be limited to HTML documents?
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function(error) {
        console.error( '[PWA APP] Network request Failed. Serving offline page ' + error );
        return caches.open('app-pwa').then(function(cache) {
          return cache.match('offline.html');
        });
      }
    ));
  });
  
  //This is a event that can be fired from your page to tell the SW to update the offline page
  self.addEventListener('refreshOffline', function(response) {
    return caches.open('app-pwa').then(function(cache) {
      console.log('[PWA APP] Offline page updated from refreshOffline event: '+ response.url);
      return cache.put(offlinePage, response);
    });
  });