// reRenderOnChange does not force a rerender

import React, { Suspense } from 'react'
import { PouchDB } from 'react-pouchdb'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { registerServiceWorker, handleDBSync } from '../utils/'
import Home from './Home.jsx'
import File from './File.jsx'

const { log } = console

export default class App extends React.Component {
	async componentDidMount() {
		await registerServiceWorker()
	}

	render() {
		const username = 'username'
		const password = 'password'
		const dbName = `http://${username}:${password}@localhost:5984/files-${username}`

		return (
			<PouchDB name={dbName}>
				<Suspense fallback='suspended and loading'>
        	<Home />
				</Suspense>
			</PouchDB>
		)
	}
}