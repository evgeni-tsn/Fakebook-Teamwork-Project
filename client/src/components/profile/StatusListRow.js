import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import moment from 'moment'
import { connect } from 'react-redux'

class StatusListRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: ''
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleComment = this.handleComment.bind(this)
    this.onInput = this.onInput.bind(this)
  }

  handleDelete() {
    if (confirm("Are you sure you want to delete this status?") === true) {
      this.props.del(this.props.status._id)
    }
  }

  handleComment () {
    if(this.state.input) {
      this.props.comment(this.props.status._id, this.state.input)
    }
  }

  onInput(e) {
    this.setState({input: e.target.value})
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
          {this.props.status.comments.map(function (comment, i) {
            return <li key={i} className="text-wrap">
              <Link to={`/${comment.user.username}`} className="comment-user-link">
                {comment.user.username}:
              </Link>
              <span className="comment-content"> {comment.content}</span>
              </li>
          })}
        </ul>
        {this.props.comment && this.props.auth ? <div className="row">
        <span className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
          <input type="text" className="form-control" placeholder="What do you think?" onChange={this.onInput}/>
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
    );
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

