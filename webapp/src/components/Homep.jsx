import React, { useEffect, useState } from 'react'
import { useAllDocs, AllDocs } from 'react-pouchdb'
import FilesGrid from './FilesGrid.jsx'
import { getAllDocsOptions, generateIdPrefix } from '../utils'

const {log}=console



// export default class Home extends React.Component {
// 	render() {

// 		return (
// 			<div path='/' className='home'>
// 				<h1>Journal</h1>
// 				<FilesGrid files={this.state.files} />
// 			</div>
// 		)
// 	}
// }

export default function Home(props) {
	// const selector = { type: 'file' }
	// const allDocsOptions = getAllDocsOptions(selector)
	// const files = 
	// log('Home', allDocsOptions)
	// let [files, setFiles] = useState([])
	// const files = []
	// useEffect(() => {
	// try {
		// const rows = useAllDocs({
			// include_docs: true,
		// })

		// files = rows.map(row => row.doc)
	// }	catch (err) {
		// log('err', err)
	// }

	try {

		return (
			<div path='/' className='home'>
				<h1>Journal</h1>
				<AllDocs children={({rows}) => (
					<FilesGrid files={rows.map(row => row.doc)} />
				)} />
			</div>
		)
	} catch(err) {
		log(err)
	}
}