import React from 'react'

class Greetings extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Welcome to Fakebook</h1>
        </div>
        <h4>Here will be listed all statuses</h4>
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">User Info</div>
            <div className="panel-body">Status content</div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">User Info</div>
            <div className="panel-body">Status content</div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">User Info</div>
            <div className="panel-body">Status content</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Greetings