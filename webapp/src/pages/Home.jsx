import _ from 'lodash'
import React from 'react'
import { dbHelpers } from '../utils'
import components from './components'
const { FilesList } = components

export default class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			files: []
		}
	}

	async componentDidMount() {
		// if (this.state.isFirstUpdate) {
			await this.loadFiles()

			// let eventHandler = this.props.syncHandler.on('change', async () => {
			// 	await this.reloadFiles()
			// })

		// 	this.setState({
		// 		eventHandler
		// 	})
		// }
	}

	// componentWillUnmount() {
		// this.state.eventHandler.cancel()
	// }


	async componentDidUpdate(prevProps, prevState) {
		if (this.props.lastChangeDate !== prevProps.lastChangeDate) {
			await this.loadFiles()
		}
	}
	// async componentDidUpdate(prevProps, prevState) {
		// const { isFirstUpdate } = this.state
		// const hasLocalDBChanged = _.isEqual(prevProps.localDB, this.props.localDB)

		// if (isFirstUpdate) {

			// this.setState({
				// isFirstUpdate: false
			// })
		// }

		// if(!hasLocalDBChanged) {
			// await this.reloadFiles()
		// }
	// }

	async loadFiles() {
		const files = await dbHelpers(this.props.localDB)
			.getFiles()
	
		this.setState({ files })		
	}

	render() {
		if (!this.state.files) {
			return 'loading files for FilesGrid'
		}
		
		return (
			<div path='/' className='home-page'>
				<h1>Journal</h1>
				<FilesList files={this.state.files} />
			</div>
		)
	}
}

// export default function Home(props) {
// 	const selector = { type: 'file' }
// 	const allDocsOptions = getAllDocsOptions(selector)
// 	const files = 
// 	log('Home', allDocsOptions)
// 	// const rows = useAllDocs(allDocsOptions)

// 	// log({row0: rows[0]})

// 	// const files = rows.map(row => row.doc)
// 	return (
// 		<div path='/' className='home'>
// 			<h1>Journal</h1>

// 			<FilesList files={files} />
// 		</div>
// 	)
// }