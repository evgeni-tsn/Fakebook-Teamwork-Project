import {SET_USER_DATA} from '../actions/types'

const initialState = {
  userData: {},
}

export default function users(state = initialState, action = {}) {
  switch (action.type){
    case SET_USER_DATA:
      return {...state, userData: action.userData}
    default:
      return state
  }
}