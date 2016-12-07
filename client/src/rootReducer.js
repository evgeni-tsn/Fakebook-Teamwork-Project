import { combineReducers } from 'redux'
import flashMessages from './reducers/flashMessages'
import auth from './reducers/auth'
import users from './reducers/users'
import search from './reducers/search'
import statuses from './reducers/statuses'
import {reducer as modalReducer} from 'react-redux-modal'

export default combineReducers({
  flashMessages,
  auth,
  users,
  statuses,
  search,
  modals: modalReducer
})