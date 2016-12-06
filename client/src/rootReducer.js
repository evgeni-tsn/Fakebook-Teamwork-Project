import { combineReducers } from 'redux'
import flashMessages from './reducers/flashMessages'
import auth from './reducers/auth'
import users from './reducers/users'
import search from './reducers/search'

export default combineReducers({
  flashMessages,
  auth,
  users,
  search
})