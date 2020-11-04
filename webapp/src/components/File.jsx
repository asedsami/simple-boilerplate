import React from 'react'
import { useParams } from 'react-router-dom'
import { dbHelpers } from '../utils'
const { log } = console

export default class File extends React.Component {
	async componentDidUpdate(prevProps, prevState) {
		const { isFirstUpdate } = this.prevState

		if (isFirstUpdate) {
			let eventHndlr = this.props.syncHandler.on('change', async () => {
				await this.reloadFileSnippets()
			})
		}
	}

	async reloadFileSnippets() {
		const { fileId } = useParams()
		const fileSnippets = await dbHelpers(this.props.localDB).getFileSnippets(fileId)
		this.setState({ fileSnippets })
	}

	render() {
		// log('snippets', this.state.fileSnippets)
		return (
			<h1>File {fileId}</h1>
		)
	}
}
