const MODEL_ERROR_MSG = 'FilesModel Error in method '

const { log } = console
const options = {
	conflicts: true,
	descending: true,
	include_docs: true,
}

export default class FilesModel {
	constructor(credentials, localFiles) {
		// credentials will be used to decrypt data

		this.localFiles = localFiles
		this.credentials = credentials
	}

	async getFile(fileId) {
		const fileDoc = await this._fetchOne(fileId)

		return fileDoc[0]
	}

	async getFiles() {
		const type = 'file'
		const files =	await this._fetch({ type })

		return files
	}

	async getFileSnippets(fileId) {
		const type = 'fileSnippet'

		const fileSnippets = await this._fetch({ type, fileId })
		return fileSnippets
	}

	async editFile(file) {
		const result = await this._edit(file)

		return result	
	}

	async editFileSnippet(updatedFileSnippet) {
		const result = await this._edit(updatedFileSnippet)

		return result
	}

	async createFile(name) {
		const type = 'file'

		const result = await this._create({ name, type })
		return result
	}

	async appendFileSnippetToFile(fileId, text) {
		const type = 'fileSnippet'

		try {
			const file = await this.getFile(fileId)
			
			if (!file) {
				throw new Error('no such file', fileId)
			}

			const result = await this._create({ text, type, fileId })
			return result
		} catch (error) {
			log('FilesModel.appendFileSnippetToFile Error', error)
		}
	}

	async _fetch(selector) {
		const idPrefix = generateIdPrefix(selector)

		try {
			const doc = await this.localFiles.allDocs({
				conflicts: true,
				descending: true,
				include_docs: true,
				// startkey: idPrefix,
				// endkey: idPrefix + '\uffff',
			})

			return doc.rows.map(row => row.doc)
		} catch (error) {
			console.log('FilesModel.fetch:')
			console.log('	idPrefix: ' + idPrefix)
			console.log('		Error: ', error)
		}
	}

	async _create(doc) {
		const idPrefix = generateIdPrefix(doc)

		try {
			const result = await this.localFiles.put({
				_id: idPrefix + Date.now(),
				...doc,
			})

			return result
		} catch (error) {
			console.log('FilesModel.create:')
			console.log('	idPrefix: ' + idPrefix)
			console.log('	doc: ' + doc)
			console.log('		Error: ', error)
		}
	}

	async _fetchOne(id) {

		try {
			const doc = this.localFiles.get(id, {
				conflicts: true,
			})

			return doc
		} catch (error) {
			console.log('FilesModel.fetchOne:')
			console.log('	id: ' + id)
			console.log('		Error: ', error)
		}
	}

	async _edit(updatedDoc) {

		try {
			const result = this.localFiles.put(updatedDoc)
			return result
		} catch (error) {
			console.log('FilesModel.edit:')
			console.log('	updatedDoc: ' + updatedDoc)
			console.log('		Error: ', error)
		}
	}
}

function generateIdPrefix({ type, fileId }) {
	const prefixes = {
		'file': 				type + '_',									// file_
		'fileSnippet': type + '_' + fileId + '_'		// fileSnippet_[fileId]_ 
	}

	return prefixes[type]
}


