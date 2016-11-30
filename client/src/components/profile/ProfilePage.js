import React from 'react'
import StatusForm from './StatusForm'

class ProfilePage extends React.Component {
  render(){
    return (
      <div>
        {console.log(this.props)}
        <h1>Hello 'Insert Username here' this is your profile</h1>
        <StatusForm/>
      </div>
    )
  }
}

export default ProfilePage