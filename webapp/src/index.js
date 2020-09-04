import '@babel/polyfill'
import './index.scss'
// import sw from './sw.js'
import React from 'react'
import ReactDOM from 'react-dom'

const { log } = console

async function registerSW() {
	if ('serviceWorker' in navigator) {
		try {
			// log('registerSW.try', sw)
			window.addEventListener('load', async function () {
				log('load')
				await navigator.serviceWorker.register('/sw.js', {scope: '/'})
			})
		} catch (e) {
			log('SW registration failed', e)
		}
	}

	return new Promise(()=> {})
}

class App extends React.Component {
	async componentDidMount() {

		await registerSW()

		fetch("http://localhost:4000/")
			.then(response => response.json())
	}

	render() {
		return (
			<h1>Hello World from React</h1>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))