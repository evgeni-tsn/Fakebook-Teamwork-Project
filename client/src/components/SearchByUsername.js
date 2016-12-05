import React from 'react'
import { searchByUsername } from '../actions/searchActions'
import { connect } from 'react-redux'
import { Link } from 'react-dom'

class SearchByUsername extends React.Component {
	constructor(props){
		super(props)
		this.onChange = this.onChange.bind(this)
	}

	onChange(e) {
		this.props.searchByUsername(e.target.value)
	}

	render() {
		const options =
			this.props.options.map((user, i) =>
			{ return <li key={i} onClick={() => this.context.router.push(`/${user.username}`)}>{user.username}</li>})

		console.log('RENDER OPTIONS', options)
		return (
			<div>
				<div className="form-group">
					<input
						type={"text"}
						onChange={this.onChange}
						placeholder="Search"
						name="typeahead"
						className="form-control"
					/>
				</div>

				{this.props.options
				&& this.props.options.length > 0
				&& <ul>{options}</ul>}
			</div>

		)
	}
}

SearchByUsername.PropTypes = {
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.array.isRequired
}

SearchByUsername.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('MAPPING', state)
	return {
		options: state.options
	}
}

export default connect(mapStateToProps, { searchByUsername })(SearchByUsername)