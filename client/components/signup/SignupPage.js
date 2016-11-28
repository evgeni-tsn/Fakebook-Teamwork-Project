import React from 'react'
import SignupForm from './SignupForm'
import { connect } from 'react-redux'
import { userSignupRequest, isUserExist } from '../../actions/signupActions'
import { addFlashMessage } from '../../actions/flashMessages'

class SignupPage extends React.Component {
  render() {
    const {userSignupRequest, addFlashMessage, isUserExist} = this.props
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm
            userSignupRequest={userSignupRequest}
            isUserExist={isUserExist}
            addFlashMessage={addFlashMessage}/>
        </div>
      </div>
    )
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExist: React.PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest, addFlashMessage, isUserExist})(SignupPage)