export default function getAllDocsOptions(selector) {
	const idPrefix = generateIdPrefix(selector)

	return {
		conflicts: true,
		descending: true,
		include_docs: true,
		startkey: idPrefix,
		endkey: idPrefix + '\uffff',
	}
}

function generateIdPrefix({ type, fileId }) {
	const prefixes = {
		'file': 				type + '_',									// file_
		'fileSnippet': type + '_' + fileId + '_'		// fileSnippet_[fileId]_ 
	}

	return prefixes[type]
}