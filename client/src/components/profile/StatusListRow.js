import React, { PropTypes } from 'react';

const StatusListRow = ({status}) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">Author: {status.user}</div>
      <div className="panel-body">Content: {status.content}</div>
      <div className="panel-heading">Posted on: {new Date(status.createdAt).toLocaleString()}</div>
    </div>
  );
};

StatusListRow.propTypes = {
  status: PropTypes.object.isRequired
};

export default StatusListRow;
