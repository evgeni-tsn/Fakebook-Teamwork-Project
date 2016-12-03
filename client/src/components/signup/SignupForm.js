import React from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
import toastr from 'toastr'
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

function validateInput(data) {
  let errors = {}

  if(Validator.isEmpty(data.username)){
    errors.username = 'Username is required!'
  }

  if(Validator.isEmpty(data.email)){
    errors.email = 'Email is required!'
  }

  if (!Validator.isEmail(data.email)){
    errors.email = 'Email is invalid!'
  }

  if(Validator.isEmpty(data.password)){
    errors.password = 'Password is required!'
  }
  if(Validator.isEmpty(data.passwordConfirmation)){
    errors.passwordConfirmation = 'Password confirmation is required!'
  }

  if(!Validator.equals(data.password, data.passwordConfirmation)){
    errors.passwordConfirmation = 'Passwords must match!'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.checkUserExist = this.checkUserExist.bind(this)
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  checkUserExist(event){
    const field = event.target.name
    const val = event.target.value
    if(val !== ''){
      this.props.userExists(val).then(res => {
        let errors = this.state.errors
        let invalid;
        if (res.data.exists) {
          console.log('exists')
          errors[field] = 'There is user with such ' + field
          invalid = true
        } else {
          errors[field] = ''
          invalid = false
        }
        this.setState({errors, invalid})
      })
    }
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state)
    if (!isValid) {
      this.setState({errors})
    }
    return isValid
  }

  onSubmit(event) {
    toastr.options = {
      "closeButton": "true",
      "positionClass": "toast-top-right"
    }
    event.preventDefault()
    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true})

      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Sign up was successful!'
          })
          toastr.success("Sign up was successful!")
          this.context.router.push('/')
        },
        (err) => {
          this.setState({errors: err.response.data, isLoading: false})
        }
      )
    } else {
      toastr.error("You have validation errors!")
    }
  }

  render() {
    const {errors} = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join us! :)</h1>

        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          checkUserExist={this.checkUserExist}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          checkUserExist={this.checkUserExist}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  userExists: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm