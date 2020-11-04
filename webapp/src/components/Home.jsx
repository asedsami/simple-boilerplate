import React from 'react'
import FilesGrid from './FilesGrid.jsx'
import { dbHelpers } from '../utils'
import _ from 'lodash'

const { log } = console

export default class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isFirstUpdate: true
		}
	}

	async componentDidMount() {
		if (this.state.isFirstUpdate) {
			await this.reloadFiles()
		}
	}

	async componentDidUpdate(prevProps, prevState) {
		const { isFirstUpdate } = this.state
		const hasLocalDBChanged = _.isEqual(prevProps.localDB, this.props.localDB)

		if (isFirstUpdate) {
			let eventHndlr = this.props.syncHandler.on('change', async () => {
				await this.reloadFiles()
			})

			this.setState({
				isFirstUpdate: false
			})
		}

		if(!hasLocalDBChanged) {
			await this.reloadFiles()
		}
	}

	async reloadFiles() {
		const files = await dbHelpers(this.props.localDB).getFiles()
		this.setState({ files })		
	}

	render() {
		return (
			<div path='/' className='home'>
				<h1>Journal</h1>
				{(this.state && this.state.files) ? (
					<FilesGrid files={this.state.files} />
				) : 'loading FilesGrid'}
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

// 			<FilesGrid files={files} />
// 		</div>
// 	)
// }