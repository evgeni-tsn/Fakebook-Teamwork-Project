import React from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { createStatus } from '../../actions/statusActions'

class StatusForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      errors: {},
      isLoading: false,
      auth: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit(event) {
    event.preventDefault()
      this.props.createStatus(this.state).then(() => {
      this.context.router.push(`/${this.props.auth.user.username}`)
    })
    toastr.success("Status was added successfully!")
  }

  render() {
    const {content, errors, isLoading} = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Create new Status</h3>
        <div className="form-group">
          <textarea
            className="form-control"
            rows="5"
            name="content"
            placeholder="What's on your mind?"
            value={content}
            onChange={this.onChange}>
        </textarea>
        </div>

        <button type="submit" disabled={isLoading} className="btn btn-primary btn-block">Create</button>
      </form>
    )
  }
}

StatusForm.propTypes = {
  createStatus: React.PropTypes.func.isRequired,
}

StatusForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { createStatus })(StatusForm)

