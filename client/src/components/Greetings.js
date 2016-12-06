import React from 'react'
import { connect } from 'react-redux'
import StatusList from '../components/profile/StatusList'
import { fetchAllStatuses, comment } from '../actions/statusActions'

class Greetings extends React.Component {
  constructor(props) {
    super(props)
    this.handleComment = this.handleComment.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllStatuses()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.username !== nextProps.params.username) {
      this.props.fetchAllStatuses()
    }
  }

  handleComment(statusId, content) {
    comment(statusId, content)
      .then((res) => {
        if(res.data.ok) this.props.fetchAllStatuses()
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Welcome to Fakebook</h1>
        </div>
        <StatusList statuses={this.props.statuses} comment={this.handleComment}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    statuses: state.users.statuses,
  }
}

export default connect(mapStateToProps, {fetchAllStatuses})(Greetings)