import PouchDB from 'pouchdb'

const { log } = console

export default function handleDBSync(username) {
	const remoteFilesUrl = `http://asedsami:password@localhost:5984/files-${username}`

	const replicaOptions = {
	  live: true,
	  retry: true,
	}

	let localFiles        = new PouchDB('files')
	let filesSyncHandler  = localFiles.sync(remoteFilesUrl, replicaOptions)

  filesSyncHandler.on('change', change => log('change remote', change))
    .on('error', err => log('error remote', err))
    .on('paused', info => log('pause remote', info))
    .on('active', info => log('active remote', info))
    .on('complete', info => log('cancel remote'))

  return {
  	localFiles,
  	filesSyncHandler,
  }
}

