import React from 'react'
import StatusList from './StatusList'
import { connect } from 'react-redux'
import { fetchUser } from '../../actions/userActions'
import { deleteStatus, comment } from '../../actions/statusActions'
import { follow, unfollow } from '../../actions/followerActions'
import {modal} from 'react-redux-modal'
import LinkListModal from '../modals/LinkListModal'

class ProfilePage extends React.Component {
  constructor(props){
    super(props)

    this.handleDeleteStatus = this.handleDeleteStatus.bind(this)
    this.handleComment = this.handleComment.bind(this)
  }

  componentDidMount() {
    this.props.fetchUser(this.props.params.username)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.username !== nextProps.params.username) {
      this.props.fetchUser(nextProps.params.username)
    }
  }

  handleDeleteStatus(id) {
    deleteStatus(id)
    this.props.fetchUser(this.props.params.username)
  }

  handleFollow(username) {
    follow(username)
      .then((data) => {
        if(data.data.ok)  this.props.fetchUser(this.props.params.username)
      })
      .catch(console.log)
  }

  handleUnfollow(username) {
    unfollow(username)
      .then(data => {
        if(data.data.ok) this.props.fetchUser(this.props.params.username)
      })
      .catch(console.log)
  }

  handleComment(statusId, content) {
    comment(statusId, content)
      .then((res) => {
        if(res.data.ok) this.props.fetchUser(this.props.params.username)
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
          { this.props.userData.username ?
            <div>
              <div className="jumbotron">
                <span className="fs28">{this.props.userData.username}</span>
                <br/>
                <div>
                  <span className="foll-data"
                        onClick={this.openFollowersModal.bind(this)}>Followers: {this.props.userData.followersCount}</span>
                  <span className="foll-data"
                        onClick={this.openFollowingModal.bind(this)}>Following: {this.props.userData.followingCount}</span>
                </div>
                {this.props.auth.user.username !== this.props.userData.username ? <div>
                <button onClick={() => {this.handleFollow(this.props.userData.username)}} className="btn btn-primary mgr20">
                  Follow
                </button>
                <button onClick={() => {this.handleUnfollow(this.props.userData.username)}} className="btn btn-primary mgr20">
                  Unfollow
                </button>
                </div>: null }
              </div>
              <h2 className="header">Statuses</h2>
              <StatusList statuses={this.props.statuses} comment={this.handleComment} del={this.handleDeleteStatus}/>
            </div>
            : <div className="fs28">{'No such user'}</div>}
      </div>
    )
  }
}

ProfilePage.propTypes = {
  statuses: React.PropTypes.array.isRequired,
  userData: React.PropTypes.object.isRequired,
  fetchUser: React.PropTypes.func.isRequired,
}

ProfilePage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    statuses: state.statuses.statuses,
    userData: state.users.userData,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { fetchUser })(ProfilePage)