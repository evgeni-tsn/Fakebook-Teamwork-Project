import React from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
import { connect } from 'react-redux'
import { createStatus} from '../../actions/statusActions'

class StatusForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.createStatus(this.state)
  }

  render() {
    const {content, errors, isLoading} = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create new Status</h1>

        <TextFieldGroup
          field="content"
          label="Status"
          name="content"
          value={content}
          onChange={this.onChange}
          error={errors.content}
        />

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    )
  }
}

StatusForm.propTypes = {
  createStatus: React.PropTypes.func.isRequired
}

export default connect(null, {createStatus})(StatusForm)

