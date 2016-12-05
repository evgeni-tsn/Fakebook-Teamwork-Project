import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import { searchByUsername, clearSearch } from '../actions/searchActions'


class NavigationBar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.handleNextPage = this.handleNextPage.bind(this)
  }

  logout(event) {
    event.preventDefault()
    this.props.logout()
  }

  handleSearchChange(e) {
    this.state.page = 0
    if(e.target.value.length) {
      this.props.searchByUsername(e.target.value, this.state.page)
    } else {
      this.props.clearSearch()
    }
  }

  handleOptionClick(e) {
    this.refs.Search.value = ''
    this.state.page = 0
    this.props.clearSearch()
  }

  handleNextPage(e) {
    this.state.page += 1
    this.props.searchByUsername(this.refs.Search.value, this.state.page)
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

    const searchOptions = this.props.options.map((user, i) => {
      return <div key={i}><Link to={`/${user.username}` } onClick={this.handleOptionClick}  key={i}>{user.username}</Link></div>
    })

    const searchOptionsWrap =
      <div>
        <div>{searchOptions}</div>
        <div onClick={this.handleNextPage} className="cursor-pointer">...More</div>
      </div>

    return (
      <div>
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand" href="#">Fakebook</Link>
            </div>
            <div className="nav navbar-nav navbar-left" id={"search"}>
              {isAuthenticated ?
                <input
                  type={"text"}
                  onChange={this.handleSearchChange}
                  placeholder="Search"
                  className="form-control"
                  ref="Search"
                /> : null}
            </div>
            <div>
            </div>
            {isAuthenticated ? userLinks : guestLinks}
          </div>
        </div>
        { isAuthenticated && this.props.options.length > 0 ?
        <div id={"searchContainer"}>
            <div id="info">
              {this.props.options.length > 0 ?
                 searchOptionsWrap : null}
            </div>
        </div>: null }
      </div>
    )
  }
}

NavigationBar.propTypes = {
  options: React.PropTypes.array.isRequired,
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
  searchByUsername: React.PropTypes.func.isRequired,
  clearSearch: React.PropTypes.func.isRequired,
  handleSearchChange: React.PropTypes.func.isRequired,
  handleOptionClick: React.PropTypes.func.isRequired,
}

NavigationBar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    options: state.options
  }
}

export default connect(mapStateToProps, { logout, searchByUsername, clearSearch })(NavigationBar)