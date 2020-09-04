self.addEventListener('install', async e => {
	console.log('sw.install')
	const cache = await caches.open(cacheName)
	await cache.addAll(staticAssets)
	return self.skipWaiting
})