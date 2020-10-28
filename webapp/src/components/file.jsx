import React from 'react'
import { useParams } from 'react-router-dom'

export default function file(props) {
	let { fileId } = useParams()

	return (
		<h1>File {fileId}</h1>
	)
}