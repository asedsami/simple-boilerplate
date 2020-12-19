import PouchDB from 'pouchdb'

const { log } = console

export default function handleDBSync(username, password) {
	const remoteFilesUrl = `http://${username}:${password}@localhost:5984/files-${username}`


	const replicaOptions = {
	  live: true,
	  retry: true,
    batch_size: 1,
    batches_limit: 1,
	}

	let localDB       = new PouchDB('files')
	let syncHandler  = localDB.sync(remoteFilesUrl, replicaOptions)

  syncHandler
    .on('error', err => log('error remote', err))
    .on('paused', info => log('pause remote', info))
    .on('active', info => log('active remote', info))
    .on('complete', info => log('cancel remote'))

  const pouch = {
    localDB,
    syncHandler,
  }

  return pouch
}

