import React from 'react'
import FileGridItem from './FileGridItem.jsx'

export default function FilesGrid(props) {
	if (!props.files) {
		return 'Loading..'
	}

  return (
    <div className='list'>
      {props.files.map(file => (
      	<FileGridItem key={file._id} file={file} />
      ))}
    </div>
  )
}