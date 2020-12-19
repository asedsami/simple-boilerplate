import React from 'react'
import FileItem from './FileItem.jsx'

export default function FilesList(props) {
	if (!props.files) {
		return 'Loading..'
	}

  return (
    <div className='files-list'>
      {props.files.map(file => (
      	<FileItem key={file._id} file={file} />
      ))}
    </div>
  )
}