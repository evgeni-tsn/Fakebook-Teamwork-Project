import React from 'react'
import StatusListRow from './StatusListRow'

export default function StatusList({statuses}) {

  const emptyMsg = (<p>You did not have any status.</p>)

  return (
    <div>
      {statuses.length === 0 ? emptyMsg : ''}

      <div className="panel-group">
        {statuses.map(status =>
          <StatusListRow key={status._id} status={status}/>
        )}
      </div>
    </div>
  )
}

StatusList.propTypes = {
  statuses: React.PropTypes.array.isRequired
}