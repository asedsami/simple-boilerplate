export default async function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		try {
			// log('registerSW.try', sw)
			window.addEventListener('load', async function () {
				console.log('serviceWorker.load')
				await navigator.serviceWorker.register('/sw.js', {scope: '/'})
			})
		} catch (e) {
			console.log('SW registration failed', e)
		}
	}

  return Promise.resolve()
}