import { combineReducers } from 'redux'
import flashMessages from './reducers/flashMessages'
import auth from './reducers/auth'
import statuses from './reducers/statuses'
import search from './reducers/search'

export default combineReducers({
  flashMessages,
  auth,
  statuses,
  search
})