import {SET_STATUSES, SET_USER_DATA} from '../actions/types'

const initialState = {
  statuses: [],
  userData: {}
}

export default function users(state = initialState, action = {}) {
  switch (action.type){
    case SET_STATUSES:
      return {...state, statuses: action.statuses}
    case SET_USER_DATA:
      return {...state, userData: action.userData}
    default:
      return state
  }
}