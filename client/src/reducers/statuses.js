import {SET_STATUSES} from '../actions/types'

export default function statuses(state = [], action = {}) {
  switch (action.type){
    case SET_STATUSES:
      return action.statuses
    default: return state
  }
}