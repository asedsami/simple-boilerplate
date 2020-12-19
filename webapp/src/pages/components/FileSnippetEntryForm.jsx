import React from 'react'


export default class FileSnippetEntryForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			'newFileSnippet': ''	
		}

		this.textareaRef = React.createRef()
	}

	componentDidMount() {
		this.textareaRef.current.focus()
	}

	handleInputChange = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		})
	}

	addSnippetToFile = async (event) => {
		event.preventDefault()
		const result = await this.props.addSnippetToFile(this.state.newFileSnippet)

		if (result.ok) {
			this.setState({
				'newFileSnippet': ''
			})
		}
	}

	render() {
		return (
			<form onSubmit={this.addSnippetToFile}>
				<label>
					New Entry:
					<textarea
						autoFocus
						name='newFileSnippet'
						ref={this.textareaRef}
						onChange={this.handleInputChange}
						value={this.state.newFileSnippet} />
				</label>
				<input type='submit' value='Add to file' />
			</form>
		)
	}
}
