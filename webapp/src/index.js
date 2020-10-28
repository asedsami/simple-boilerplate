import '@babel/polyfill'
import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home, File } from './components/'
import { registerServiceWorker, handleDBSync, FilesModel } from './utils/'

const { log } = console

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      password: 'p',
      username: 'u',
      Files: null,
    }
  }

	async componentDidMount() {
		await registerServiceWorker()
    const username = this.state.username
    const password = this.state.password
    const credentials = { username, password }

    const { localFiles } = handleDBSync(username)
    
    this.setState({
      Files: new FilesModel(credentials, localFiles),
    })
	}

	render() {

		return (
      <Router>
        <Switch>
          
          <Route exact path='/'>
            <Home Files={this.state.Files} />
          </Route>
          
          <Route path='/files/:fileId'>
            <File Files={this.state.Files} />
          </Route>

        </Switch>
      </Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))