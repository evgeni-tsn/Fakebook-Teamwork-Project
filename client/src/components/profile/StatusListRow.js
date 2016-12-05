import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router'
import moment from 'moment'
import {deleteStatus} from '../../actions/statusActions'
import {connect} from 'react-redux'

const StatusListRow = ({status, del}) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <a className="status-user-link" onClick={() => browserHistory.push(`/${status.user.username}`)}>Author: {status.user.username}</a>
      </div>
      <div className="panel-heading">Last active: {moment(status.updatedAt).fromNow()}</div>
      <div className="panel-body">Content: {status.content}</div>
      <ul>
        {status.comments.map(function(comment, i) {
          return <li key={i}>{comment.content}</li>
        })}
      </ul>
        <div className="panel-heading">Posted: {moment(status.createdAt).format('hh:mm:ss | DD/MM/YYYY')} <span className="cursor-pointer" onClick={() => del(status._id)}>[DELETE]</span> </div>
    </div>
  );
};

StatusListRow.propTypes = {
  status: PropTypes.object.isRequired
};

export default connect(null,{deleteStatus})(StatusListRow);
