const {log} = console
const cacheName = 'cacheNameTest-v0.2.9.9.0'
const staticAssets = [
	'./',
	'./index.html',
	// './index.js',
	// './main.js',
	// './dist/main.js'
]

self.addEventListener('install', async e => {
	console.log('sw.install')
	const cache = await caches.open(cacheName)
	await cache.addAll(staticAssets)
	return self.skipWaiting()
})

self.addEventListener('activate', e => {
	self.clients.claim()
})

// self.addEventListener('fetch', async e => {
// 	const req = e.request
// 	const url = new URL(req.url)
// 	console.log(url.origin, '------', location.origin)
// 	if (url.origin == location.origin) {
// 		e.respondWith(cacheFirst(req))
// 	} else {
// 		e.respondWith()
// 		e.respondWith(networkAndCache(req))
// 	}
// })


self.addEventListener('fetch', async e => {
	const req = e.request
	const url = new URL(req.url)
	const cache = await caches.open(cacheName)
	
	if (url.origin == location.origin) {
		const cached = await cache.match(req)
		const cacheOrFresh = cached ?? fetch(req)
		e.respondWith(cacheOrFresh)
	} else {
		const fresh = await fetch(req)

		e.respondWith(fresh)
	}
})

// async function cacheFirst(req) {
// 	log('cacheFirst')
// 	const cache = await caches.open(cacheName)
// 	const cached = await cache.match(req)
// 	return cached || fetch(req)
// }

// async function networkAndCache(req) {
// 	log('networkAndCache')
// 	const cache = await caches.open(cacheName)

// 	try {
// 		const fresh = await fetch(req)
// 		await cache.put(req, fresh.clone())
// 		return fresh
// 	} catch (e) {
// 		const cached = await cache.match(req)
// 		return cached
// 	}
// }