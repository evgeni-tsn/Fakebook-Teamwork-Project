import React from 'react'
import { browserHistory } from 'react-router'
import axios  from 'axios'

class SearchByUsername extends React.Component {
	constructor(props){
		super(props)

		this.searchRes = []
		this.onChange = this.onChange.bind(this)
	}

	onChange(e) {
		axios.get('/api/users/search/' + e.target.value)
			.then(data => {
				this.searchRes = data.data.users ? data.data.users : []
				this.render()
			})
	}

	render() {
		console.log(this.searchRes)
		return (
				<div className="form-group">
					<input
						type={"text"}
						onChange={this.onChange}
						placeholder="Search"
						name="typeahead"
						className="form-control"
					/>
					<ul>
						{this.searchRes.map(function(user) {
							return <li onClick={() => {browserHistory.push(`/${user.username}`)}} key={user._id}>
									{user.username}
							</li>
						})}
					</ul>
				</div>
		)
	}
}

SearchByUsername.PropTypes = {
	onChange: React.PropTypes.func.isRequired,
}

export default SearchByUsername