var filesToCache = [
  '.',
  '/',
  'index.html',
  'manifest.json',
  'service-worker.js',
  'javascript/jquery-2.2.0.min.js',
  'styles/reset.css',
  'styles/styles.css',
  'bilder/allImage.png',
  'bilder/backgroundImage.png',
  'bilder/manhole_57.png',
  'audio/tack.wav',
  'audio/tick.wav',
  'audio/troet.wav',
  'audio/tuck.wav'
];

	latestCacheName = 'App-Shell-v1';
	self.addEventListener('install', function (event) {
	  event.waitUntil(
		caches.open(latestCacheName)
		  .then(function (cache) {
			return cache.addAll(filesToCache)
			.then(() => self.skipWaiting());
		  })
	  );
	});

	self.addEventListener('activate', event => {
	  event.waitUntil(
		caches.keys().then(allCaches => {
			allCaches.forEach(cache => {
			  if (cache !== latestCacheName) {
				  caches.delete(cache);
			  }
			})
		})
	  );
	});

	self.addEventListener('fetch', function (event) {
	  event.respondWith(
		caches.match(event.request)
		.then(function (response) {
		  if (response) {
			return response;
		  } else {
			return fetch(event.request);
		  }
		})
	  );
   });

