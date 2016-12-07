import React  from 'react'
import { browserHistory } from 'react-router'

export default class LinkListModal extends React.Component {
	render() {
		return (
			<div>
				{this.props.list.map((item, i) => {
					return <div key={i}>
						<span className="cursor-pointer blue"
						      onClick={() => {
					        browserHistory.push(`/${item}`)
									this.props.removeModal()}
						      }>
							{item}
						</span>
					</div>
				})}
			</div>
		);
	}
}

LinkListModal.PropTypes = {
	list: React.PropTypes.array.isRequired
}