import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'

class NavigationBar extends React.Component {

  logout(event) {
    event.preventDefault()
    this.props.logout()
  }

  render() {
    const {isAuthenticated} = this.props.auth
    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/add">Add New Status</Link></li>
        <li><Link to={`/${this.props.auth.user.username}`}>{this.props.auth.user.username}</Link></li>
        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    )

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"> Login</span></Link></li>
        <li><Link to="/signup"><span className="glyphicon glyphicon-user"> Signup</span></Link></li>
      </ul>
    )

    return (
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand" href="#">Fakebook</Link>
          </div>

          {isAuthenticated ? userLinks : guestLinks}
        </div>
      </div>
    )
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout})(NavigationBar)