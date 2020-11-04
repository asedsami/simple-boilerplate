import '@babel/polyfill'
import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import PouchDB from 'pouchdb'
import { Home, File } from './components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

const { log } = console

const remoteTodos = 'http://asedsami:password@localhost:5984/todos-asedsami'
const remoteFiles = 'http://asedsami:password@localhost:5984/files-asedsami'
const remoteFileSnippets = 'http://asedsami:password@localhost:5984/file-snippets-asedsami'

const replicaOptions = {
  live: true,
  retry: true,
}

let localTodos        = new PouchDB('todos')
let localFiles        = new PouchDB('files')
let localFileSnippets = new PouchDB('file-snippets')

let todosSyncHandler        = localTodos.sync(remoteTodos, replicaOptions)
let filesSyncHandler        = localFiles.sync(remoteFiles, replicaOptions)
let fileSnippetsSyncHandler = localFileSnippets.sync(remoteFileSnippets, replicaOptions)


global.showTodos = function showTodos() {
  localTodos.allDocs({
    include_docs: true,
    conflicts: true,
    descending: true,
  }, function(err, doc) {
    console.log(doc.rows.map(row => row.doc.title));
  })
}
global.getFiles = async function getFiles() {
  let filesDoc = await localFiles.allDocs({
    include_docs: true,
    descending: true,
    conflicts: true,
  })
  return filesDoc.rows.map(row => row.doc)
}
global.showFiles = function showFiles() {
  localFiles.allDocs({
    include_docs: true,
    conflicts: true,
    descending: true,
  }, function(err, doc) {
    console.log(doc.rows.map(row => row.doc));
  })
}
global.showFileSnippets = function showFileSnippets() {
  localFileSnippets.allDocs({
    include_docs: true,
    conflicts: true,
    descending: true,
  }, function(err, doc) {
    console.log(doc.rows.map(row => row.doc));
  })  
}
global.addTodo = function addTodo(text) {
  var todo = {
    _id: Date.now(),
    type: 'todo',
    title: text,
    completed: false
  };
  localTodos.put(todo, function callback(err, result) {
    if (!err) {
      console.log('created a todo!');
    }
  });
}
global.addFile = function addFile(name) {
  var file = {
    _id: Date.now(),
    type: 'file',
    name,
  }
  localFiles.put(file, function callback(err, result) {
    if (!err) {
      console.log('created a file!');
    }
  })
}
global.appendFileSnippet = function appendFileSnippet(fileId, text) {
  var fileSnippet = {
    _id: new Date.now(),
    type: 'fileSnippet',
    fileId,
    text,
  }
  localFileSnippets.put(fileSnippet, function callback(err, result) {
    if (!err) {
      console.log('appended a file snippet!');
    }
  })
}

async function registerSW() {
	if ('serviceWorker' in navigator) {
		try {
			// log('registerSW.try', sw)
			window.addEventListener('load', async function () {
				log('serviceWorker.load')
				await navigator.serviceWorker.register('/sw.js', {scope: '/'})
			})
		} catch (e) {
			log('SW registration failed', e)
		}
	}

  return Promise.resolve()
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      fileSnippets: []
    }
  }
	async componentDidMount() {
		await registerSW()

    this.setState({ files: await getFiles() })

    filesSyncHandler.on('change', showFiles)
      .on('change', async () => {this.setState({ files: await getFiles() })})
      .on('error', err => console.log('error remote', err))
      .on('paused', info => console.log('pause remote', info))
      .on('active', info => console.log('active remote', info))
      .on('complete', info => console.log('cancel remote'))

    fileSnippetsSyncHandler.on('change', showFiles)
      .on('error', err => console.log('error remote', err))
      .on('paused', info => console.log('pause remote', info))
      .on('active', info => console.log('active remote', info))
      .on('complete', info => console.log('cancel remote'))
	}

	render() {
		return (
      <Router>
        <Switch>
          
          <Route exact path='/'>
            <Home files={this.state.files}/>
          </Route>
          
          <Route path='/files/:fileId'>
            <File />
          </Route>

        </Switch>
    </Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))