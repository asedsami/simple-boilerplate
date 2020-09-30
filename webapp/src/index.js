import '@babel/polyfill'
import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import PouchDB from 'pouchdb'
const { log } = console

const remoteDB = 'http://asedsami:password@localhost:5984/todos-asedsami'
const replicaOptions = {
  live: true,
  retry: true,
  // fetch: function (url, opts) {
  //   opts.headers.set('X-Some-Special-Header', 'foo')
  //   return PouchDB.fetch(url, opts)
  // }
  // continuous: true
  // since: 'now'
}

let localDB = new PouchDB('todos')
let syncHandler = localDB.sync(remoteDB, replicaOptions)

function showTodos() {
  localDB.allDocs({include_docs: true, descending: true}, function(err, doc) {
    console.log(doc.rows.map(row => row.doc.title));
  })
}
global.showTodos = showTodos
global.localDB = localDB
global.addTodo = function addTodo(text) {
  var todo = {
    _id: new Date().toISOString(),
    title: text,
    completed: false
  };
  localDB.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a todo!');
    }
  });
}

syncHandler.on('change', showTodos)
  .on('error', err => console.log('error remote', err))
  .on('paused', info => console.log('pause remote', info))
  .on('active', info => console.log('active remote', info))
  .on('complete', info => console.log('cancel remote'))


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