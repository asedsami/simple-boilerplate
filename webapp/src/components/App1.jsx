import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { registerServiceWorker, handleDBSync } from '../utils/'
import Home from './Home.jsx'
import File from './File.jsx'

const { log } = console

export default class App extends React.Component {
  constructor(props) {
    super(props)
		
		this.state = {
			localDB: null,
			syncHandler: null,
		}    
  }

	async componentDidMount() {
		await registerServiceWorker()
    const username = 'asedsami'
    const password = 'password' 
    const credentials = { username, password }

    const { localDB, syncHandler } = handleDBSync(username, password)

   	this.setState({
   		localDB,
   		syncHandler,
   	})

    syncHandler.on('change', info => {
    	this.setState({
    		lastChange: Date.now()
    	})
    })
	}

	render() {
		const username = 'username'
		const password = 'password'
		const dbName = `http://${username}:${password}@localhost:5984/files-${username}`

	  return (
      <Router>
        <Switch>
          
          <Route exact path='/'>
          	<Home localDB={this.state.localDB}
          		syncHandler={this.state.syncHandler} />
          </Route>
          
          <Route path='/files/:fileId'>
            <File localDB={this.state.localDB}
            	syncHandler={this.state.syncHandler} />
          </Route>

        </Switch>
      </Router>
		)
	}
}