import React from 'react'
import StatusList from './StatusList'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchStatuses } from '../../actions/statusActions'

class ProfilePage extends React.Component {

  constructor(props){
    super(props)
    this.props.fetchStatuses(this.props.auth.user.username)
  }
  componentDidMount() {
    this.props.fetchStatuses(this.props.auth.user.username)
  }

  render() {
    let username = this.props.auth.user.username
    return (
      <div>
        <h1>Hello {username}</h1>
        <Link to="/add"><button className="btn btn-primary btn-block">Add New Status</button></Link>
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
    statuses: state.statuses,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {fetchStatuses})(ProfilePage)