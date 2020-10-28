import React, { useEffect, useState } from 'react'
import { GrDocumentText } from 'react-icons/gr'
import { Link } from 'react-router-dom'
const { log } = console

function FileGridItem(props) {
	let file = props.file

	return (
		<div className='list-item'>
      <Link to={'/files/' + file._id}>
    		<GrDocumentText className='doc-icon'/> {file.name}
      </Link>
		</div>
	)
}

function FilesGrid(props) {

	if (!props.files) {
		return 'Loading..'
	}

	return 'FilesGrid.'

  return (
    <div className='list'>
      {props.files && props.files.map(file => (
      	<FileGridItem key={file._id} file={file} />
      ))}
    </div>
  )
}

export default function Home(props) {
	if (!props.Files) {
		return 'Loading'
	}

	let [fileNames, setFileNames] = useState(null)
	useEffect(() => {
		async function getFiles() {
			let files = await props.Files.getFiles()
			fileNames = files.map(f => f.name)
			setFileNames(fileNames)
		}
		getFiles()
		fileNames && fileNames.map(f => log(f))
	}, [fileNames])
	

	return (
			<div path='/' className='home'>
				<h1>Journal</h1>

				<FilesGrid fileNames={fileNames} />
			</div>
	)
}
