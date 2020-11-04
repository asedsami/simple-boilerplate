export default function generateIdPrefix({ type, fileId }) {
	const prefixes = {
		'file': 				type + '_',									// file_
		'fileSnippet': type + '_' + fileId + '_'		// fileSnippet_[fileId]_ 
	}

	return prefixes[type]
}