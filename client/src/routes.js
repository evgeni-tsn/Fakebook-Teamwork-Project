import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import Greetings from './components/Greetings'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'
import ProfilePage from './components/profile/ProfilePage'
import StatusForm from './components/profile/StatusForm'

import requireAuth from './utilities/requireAuth'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings}/>
    <Route path="signup" component={SignupPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="profile" component={requireAuth(ProfilePage)}/>
    <Route path="add" component={requireAuth(StatusForm)}/>
  </Route>
)