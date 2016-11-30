import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/login'

import validateInput from '../../../server/shared/validations/login'

import TextFieldGroup from '../common/TextFieldGroup'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state)

    if (!isValid) {
      this.setState({errors})
    }

    return isValid
  }

  onSubmit(event) {
    event.preventDefault()
    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true})
      this.props.login(this.state).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState({errors: err.response.data, isLoading: false})
      )
    }
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {errors, identifier, password, isLoading} = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        {/*{console.dir(errors.errors.form)}*/}
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, {login})(LoginForm)