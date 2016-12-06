import { combineReducers } from 'redux'
import flashMessages from './reducers/flashMessages'
import auth from './reducers/auth'
import users from './reducers/users'
import search from './reducers/search'
import {reducer as modalReducer} from 'react-redux-modal'

export default combineReducers({
  flashMessages,
  auth,
  users,
  search,
  modals: modalReducer
})