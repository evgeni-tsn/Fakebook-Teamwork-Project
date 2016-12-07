import React from 'react'
import { connect } from 'react-redux'
import StatusList from '../components/profile/StatusList'
import { fetchAllStatuses, fetchAllTillPage, fetchAllBeginNew, comment, setFetching } from '../actions/statusActions'
import $ from 'jquery'

class Greetings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
    }

    this.handleComment = this.handleComment.bind(this)
    this.loadMoreStatuses = this.loadMoreStatuses.bind(this)
    this.eventScroll = this.eventScroll.bind(this)
  }

  eventScroll() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 20 && !this.props.fetching) {
      this.props.setFetching(true)
      this.loadMoreStatuses()
    }
  }

  componentDidMount() {
    this.props.fetchAllBeginNew()
    $(window).scroll(this.eventScroll)
  }

  componentWillUnmount() {
    $(window).unbind('scroll', this.eventScroll)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.username !== nextProps.params.username) {
      this.props.setFetching(true)
      this.props.fetchAllBeginNew()
    }
  }

  handleComment(statusId, content) {
    comment(statusId, content)
      .then((res) => {
        if(res.data.ok) this.props.fetchAllTillPage(this.state.page)
      })
      .catch(console.log)
  }

  loadMoreStatuses() {
    if(!this.props.finished) {
      // console.log("TRYING TO LOAD MORE")
      this.setState({page: this.state.page + 1})
      this.props.fetchAllStatuses(this.props.statuses, this.state.page)
    } else {
      // console.log('FINISHED')
      this.props.setFetching(false)
    }
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
    finished: state.users.finished,
    fetching: state.users.fetching,
  }
}

export default connect(mapStateToProps, {fetchAllStatuses, fetchAllBeginNew, fetchAllTillPage, setFetching})(Greetings)