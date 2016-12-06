import React from 'react'
import StatusListRow from './StatusListRow'

export default function StatusList({statuses, comment, del}) {

  const emptyMsg = (<p>There are no statuses</p>)

  return (
    <div>
      {statuses.length === 0 ? emptyMsg : ''}

      <div className="panel-group">
        {statuses.map(status =>
          <StatusListRow key={status._id} status={status} comment={comment} del={del}/>
        )}
      </div>
    </div>
  )
}

StatusList.propTypes = {
  statuses: React.PropTypes.array.isRequired
}