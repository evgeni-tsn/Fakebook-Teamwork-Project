import React from 'react'
import { connect } from 'react-redux'
import StatusList from '../components/profile/StatusList'
import { fetchAllStatuses } from '../actions/statusActions'

class Greetings extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllStatuses()
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Welcome to Fakebook</h1>
        </div>
        <h4>Here will be listed all statuses</h4>
        <StatusList statuses={this.props.statuses}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    statuses: state.statuses,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {fetchAllStatuses})(Greetings)