import React from 'react'
import { dbHelpers } from '../utils'
import components from './components'
const { FileSnippetsList, FileSnippetEntryForm } = components

export default class File extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			file: {},
			fileSnippets: []
		}
	}


	async componentDidMount(prevProps, prevState) {
		await this.loadFileSnippets()
		clog('File.didMount')
		// let eventHandler = this.props.syncHandler.on('change', async () => {
		// 	clog('File.didMount change')
		// 	await this.loadFileSnippets()
		// })

		// this.setState({
			// eventHandler
		// })
	}

	async componentDidUpdate(prevProps, prevState) {
		clog('File.didUpdate')
		if (this.props.lastChangeDate !== prevProps.lastChangeDate) {
			await this.loadFileSnippets()
		}
	}

	// componentWillUnMount() {
		// clog('File.willUnmount')
		// this.state.eventHandler.cancel()
	// }

	addSnippetToFile = async (text) => {
		const result = await dbHelpers(this.props.localDB).addSnippetToFile({
			text,
			fileId: this.props.match.params.fileId,
		})

		return result
	}

	async loadFileSnippets() {
		const { fileId } = this.props.match.params

		const file = await dbHelpers(this.props.localDB)
			.getFiles(fileId)

		const fileSnippets = await dbHelpers(this.props.localDB)
			.getFileSnippets(fileId)

		this.setState({
			file,
			fileSnippets,
		})
	}

	render() {
		const { file, fileSnippets } = this.state
		clog('File.render.props.lastChangeDate', this.props.lastChangeDate)
		// const { fileId } = this.props.match.params
		// const { fileId } = useParams()
		// log('snippets', this.state.fileSnippets)
		if (!file || !fileSnippets) {
			return 'Loading File'
		}


		return (
			<div className='file-page'>
				<h1>File {file.name}</h1>
				<FileSnippetsList fileSnippets={fileSnippets} />
				<FileSnippetEntryForm addSnippetToFile={this.addSnippetToFile} />
			</div>
		)
	}
}
