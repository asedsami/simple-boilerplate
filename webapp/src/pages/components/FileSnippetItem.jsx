import React from 'react'

export default function FileSnippetItem(props) {
	// let text = props.fileSnippet.text.replace('\n', `<br/>`)
	let text = props.fileSnippet.text
	clog('text', text)

	return (
		<div className='file-snippet-item'>
			{text}
		</div>
	)
}