const {log}=console

const dbHelpers = (localDB) => ({
	async getFiles(fileId) {
		const selector = { type: 'file', fileId }

		try {
			const doc = await localDB.allDocs({
				conflicts: true,
				include_docs: true,
				...generateKeys(selector)
			})

			return doc.rows.map(row => row.doc)
		} catch (err) {
			log('utils.dbHelpers.catch', err)
		}
	},

	async getFileSnippets(fileId) {
		const selector = { type: 'fileSnippet', fileId }

		try {
			const doc = await localDB.allDocs({
				conflicts: true,
				include_docs: true,
				...generateKeys(selector)
			})

			return doc.rows.map(row => row.doc)
		} catch (err) {
			log('utils.dbHelpers.catch', err)
		}
	},

	async addSnippetToFile(snippet) {
		const type = 'fileSnippet'
		const { fileId, text } = snippet

		const result = await localDB.put({
			text,
			_id: type + '_' + fileId + '_' + Date.now(),
		})

		return result
	},

})

function generateKeys(selector) {
	const { type, fileId='' } = selector
	const prefixes = {
		'file': 			 type + '_' + fileId,					  // file_ || file_[fileId]
		'fileSnippet': type + '_' + fileId + '_', 		// fileSnippet_[fileId]_ 
	}

	const idPrefix = prefixes[type]

	return {
		startkey: idPrefix,
		endkey: idPrefix + '\uffff',
	}
}

export default dbHelpers