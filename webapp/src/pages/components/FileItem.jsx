import React from 'react'
import { Link } from 'react-router-dom'
import { GrDocumentText } from 'react-icons/gr'

export default function FileItem(props) {
	let file = props.file

	return (
		<div className='file-item'>
      <Link to={'/files/' + file._id}>
    		<GrDocumentText className='doc-icon'/> {file.name}
      </Link>
		</div>
	)
}