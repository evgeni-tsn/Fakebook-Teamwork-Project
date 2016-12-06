import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import moment from 'moment'
import {deleteStatus} from '../../actions/userActions'
import {connect} from 'react-redux'

const StatusListRow = ({status, del}) => {
  function click() {
    if (confirm("Are you sure you want to delete this status?") === true) {
      del(status._id)
    }
  }
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <Link to={`/${status.user.username}`} className="status-user-link">Author: {status.user.username}</Link>
      </div>
      <div className="panel-heading">Last active: {moment(status.updatedAt).fromNow()}</div>
      <div className="panel-body">Content: {status.content}</div>
      <ul>
        {status.comments.map(function(comment, i) {
          return <li key={i}>{comment.content}</li>
        })}
      </ul>
        <div className="panel-heading">Posted: {moment(status.createdAt).format('hh:mm:ss | DD/MM/YYYY')} {del ? <button className="btn btn-danger btn-sm fr" onClick={click}>DELETE</button> : null }</div>
    </div>
  );
};

StatusListRow.propTypes = {
  status: PropTypes.object.isRequired
};

export default connect(null,{deleteStatus})(StatusListRow);
