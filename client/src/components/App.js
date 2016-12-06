import React from 'react'
import NavigationBar from './NavigationBar'
import FlashMessagesList from './flash/FlashMessagesList'
import $ from 'jquery'

class App extends React.Component {
  componentDidMount() {
    // hack for bootstrap fixed navbar overlapping content
    (function subscribeToResize() {
      $(window).resize(adjust_body_offset)
      $(document).ready(adjust_body_offset)
      $(window).scroll(adjust_scroll_offset)
      $(document).ready(adjust_scroll_offset)

      function adjust_body_offset() {
        $('body').css('padding-top', $('.navbar-fixed-top').outerHeight(true) + 'px' );
      }

      function adjust_scroll_offset () {
        $('#info').css('padding-top', $(window).scrollTop() + 'px' );
      }
    }())
  }

  render() {
    return (
      <div className="container">
        <NavigationBar options={[]}/>
        <FlashMessagesList />
        {this.props.children}
      </div>
    )
  }
}

App.PropTypes = {
  currentUser: React.PropTypes.object.isRequired,
}

export default App