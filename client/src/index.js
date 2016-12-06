import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer'
import setAuthToken from './utilities/setAuthToken'
import jwtDecode from 'jwt-decode'
import { setCurrentUser } from './actions/authActions'
import ReduxModal from 'react-redux-modal'

const rootElement = document.getElementById('app')
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes}/>
      <ReduxModal/>
    </div>
  </Provider>, rootElement)
