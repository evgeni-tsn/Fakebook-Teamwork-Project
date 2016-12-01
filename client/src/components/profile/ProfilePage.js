import React from 'react'
import StatusList from './StatusList'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchStatuses } from '../../actions/statusActions'

class ProfilePage extends React.Component {
  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    this.props.fetchStatuses()
    return (
      <div>
        <h1>Hello 'Insert Username here' this is your profile</h1>
        <Link to="/profile/add"><button className="btn btn-primary btn-block">Add New Status</button></Link>
        <h2 className="header">Statuses</h2>
        <StatusList statuses={this.props.statuses}/>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  statuses: React.PropTypes.array.isRequired,
  fetchStatuses: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    statuses: state.statuses
  }
}

export default connect(mapStateToProps, {fetchStatuses})(ProfilePage)