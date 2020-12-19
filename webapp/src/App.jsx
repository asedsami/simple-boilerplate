import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { registerServiceWorker, handleDBSync } from './utils/'
import Pages from './pages'
const { Home, File } = Pages
// import Home from './pages/Home.jsx'
// import File from './pages/File.jsx'

global.clog = console.log
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
      const lastChangeDate = Date.now()

    	this.setState({
    		lastChangeDate
    	})
    })
	}

	render() {
		const username = 'username'
		const password = 'password'
		const dbName = `http://${username}:${password}@localhost:5984/files-${username}`
	  return (
      this.state.localDB && this.state.syncHandler ? (
        <Router>
          <Switch>
            
            <Route exact path='/'>
            	<Home
                lastChangeDate={this.state.lastChangeDate}
                localDB={this.state.localDB}
            		syncHandler={this.state.syncHandler} />
            </Route>
            
            <Route path='/files/:fileId' render={(props) => (
              <File {...props}
                lastChangeDate={this.state.lastChangeDate}
                localDB={this.state.localDB}
                syncHandler={this.state.syncHandler} />
            )} />

          </Switch>
        </Router>
      ) : (
        <h1>'loading db...'</h1>
      )
		)
	}
}