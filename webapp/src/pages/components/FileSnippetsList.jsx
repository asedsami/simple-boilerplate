import React from 'react'
import FileSnippetItem from './FileSnippetItem.jsx'

export default function FileSnippetsList(props) {
	if (!props.fileSnippets) {
		return 'loading...'
	}

	return (
		<div className='file-snippets-list'>
			{props.fileSnippets.map(fileSnippet => (
				<FileSnippetItem key={fileSnippet._id} fileSnippet={fileSnippet} />
			))}
		</div>
	)
}