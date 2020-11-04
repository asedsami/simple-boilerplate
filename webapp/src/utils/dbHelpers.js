const {log}=console

const dbHelpers = (localDB) => ({
	async getFiles() {
		try {
			const doc = await localDB.allDocs({
				conflicts: true,
				include_docs: true,
				...generateKeys({ type: 'file' })
			})

			return doc.rows.map(row => row.doc)
		} catch (err) {
			// log('Home.err', err)
		}
	}
})

function generateKeys(selector) {
	const { type, fileId } = selector
	const prefixes = {
		'file': 				type + '_',									// file_
		'fileSnippet': type + '_' + fileId + '_'		// fileSnippet_[fileId]_ 
	}

	const idPrefix = prefixes[type]

	return {
		startkey: idPrefix,
		endkey: idPrefix + '\uffff',
	}
}

export default dbHelpers