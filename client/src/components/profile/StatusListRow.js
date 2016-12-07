import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import moment from 'moment'
import { connect } from 'react-redux'

const perPage = 5

class StatusListRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      commentPage: 1,
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleComment = this.handleComment.bind(this)
    this.showMoreComments = this.showMoreComments.bind(this)
  }

  handleDelete() {
    if (confirm("Are you sure you want to delete this status?") === true) {
      this.props.del(this.props.status._id)
    }
  }

  handleComment () {
    if(this.refs.CommentInput.value) {
      this.props.comment(this.props.status._id, this.refs.CommentInput.value)
      this.refs.CommentInput.value = ''
    }
  }

  showMoreComments() {
    this.setState({commentPage: this.state.commentPage + 1})
    this.forceUpdate()
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <Link to={`/${this.props.status.user.username}`} className="status-user-link">{this.props.status.user.username}</Link>
        </div>
        <div className="panel-heading text-wrap">Last active: {moment(this.props.status.updatedAt).fromNow()}</div>
        <div className="panel-body text-wrap">{this.props.status.content}</div>
        <ul className="ul-no-bullets">
          {this.props.status.comments.slice(0, this.state.commentPage * perPage).map(function (comment, i) {
            return <li key={i} className="text-wrap">
              <Link to={`/${comment.user.username}`} className="comment-user-link text-wrap">
                {comment.user.username}:
              </Link>
                <span className="comment-content text-wrap"> {comment.content} <span className="text-wrap comment-content fr mgr20">{moment(comment.createdAt).fromNow()}</span></span>
              </li>
          })}

          {this.props.status.comments.length > this.state.commentPage * perPage ?
            <div>
              <span onClick={this.showMoreComments} className="cursor-pointer">...More</span>
            </div> : null}
        </ul>
        {this.props.comment && this.props.auth && this.props.auth.isAuthenticated ? <div className="row">
        <span className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
          <input ref="CommentInput" type="text" className="form-control" placeholder="What do you think?"/>
        </span>
          <span className="col-lg-2 col-md-2 col-sm-4 col-xs-4">
          <button className="btn btn-primary btn-sm comment-button" onClick={this.handleComment}>Comment</button>
        </span>
        </div> : null}
        <div className="panel-heading">
          Posted: {moment(this.props.status.createdAt).format('hh:mm:ss | DD/MM/YYYY')}
          {this.props.del ? <button className="btn btn-danger btn-sm fr" onClick={this.handleDelete}>DELETE</button> : null }
        </div>
      </div>
    )
  }
}

StatusListRow.propTypes = {
  status: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(StatusListRow)

