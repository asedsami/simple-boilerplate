import React from 'react'
import { GrDocumentText } from 'react-icons/gr'
import {
	BrowserRouter as Router,
	Switch,
	Route,
}

function FilesGrid(props) {
  return (
    <div className='list'>
      {props.files && props.files.map(file => (
        <div className='list-item' key={file._id}>
          <a href={'/files/' + file._id}>
        		<GrDocumentText className='doc-icon'/> {file.name}
          </a>
        </div>
      ))}
    </div>
  )
}

export default function Home(props) {
  
	console.log('files', props.files)
	return (
		<div className='home'>
			<h1>Journal</h1>
			<FilesGrid files={props.files} />
		</div>

			// <ul>
				// {props && props.files && props.files.map(file => (
					// <div key={file._id}>
						// <a href={'/files/' + file._id}>
							// {file.name}
						// </a>
					// </div>
				// ))}
			// </ul>
	)
}
