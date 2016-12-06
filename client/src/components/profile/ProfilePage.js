import React from 'react'
import StatusList from './StatusList'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchStatuses, deleteStatus } from '../../actions/userActions'
import { follow, unfollow } from '../../actions/followerActions'
import {modal} from 'react-redux-modal'
import LinkListModal from '../modals/LinkListModal'

class ProfilePage extends React.Component {
  constructor(props){
    super(props)

    this.handleDeleteStatus = this.handleDeleteStatus.bind(this)
  }

  componentDidMount() {
    this.props.fetchStatuses(this.props.params.username)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.username !== nextProps.params.username) {
      this.props.fetchStatuses(nextProps.params.username)
    }
  }

  handleDeleteStatus(id) {
    deleteStatus(id)
    this.props.fetchStatuses(this.props.params.username)
  }

  handleFollow(username) {
    follow(username)
      .then((data) => {
        if(data.data.ok) this.context.router.push('/')
      })
      .catch(console.log)
  }

  handleUnfollow(username) {
    unfollow(username)
      .then(data => {
        if(data.data.ok) this.context.router.push('/')
      })
      .catch(console.log)
  }

  openFollowersModal() {
    modal.add(LinkListModal, {
      title: 'Followers',
      size: 'medium',
      closeOnOutsideClick: true,
      hideTitleBar: false,
      hideCloseButton: false,
      list: this.props.userData.followers
    })
  }

  openFollowingModal() {
    modal.add(LinkListModal, {
      title: 'Following',
      size: 'medium',
      closeOnOutsideClick: true,
      hideTitleBar: false,
      hideCloseButton: false,
      list: this.props.userData.following
    })
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <span className="fs28">{this.props.params.username}</span>
          <br/>
          <div>
            <span className="foll-data" onClick={this.openFollowersModal.bind(this)}>Followers: {this.props.userData.followersCount}</span>
            <span className="foll-data" onClick={this.openFollowingModal.bind(this)}>Following: {this.props.userData.followingCount}</span>
          </div>
          <Link to="/add"><button className="btn btn-primary">Add New Status</button></Link>
          <button onClick={() => {this.handleFollow(this.props.params.username)}}  className="btn btn-primary">Follow</button>
        </div>
          <h2 className="header">Statuses</h2>
          <StatusList statuses={this.props.statuses} del={this.handleDeleteStatus}/>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  statuses: React.PropTypes.array.isRequired,
  userData: React.PropTypes.object.isRequired,
  fetchStatuses: React.PropTypes.func.isRequired,
}

ProfilePage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    statuses: state.users.statuses,
    userData: state.users.userData
  }
}

export default connect(mapStateToProps, { fetchStatuses })(ProfilePage)