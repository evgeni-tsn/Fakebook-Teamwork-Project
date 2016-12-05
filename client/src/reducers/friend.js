import {ADD_FRIEND} from '../actions/types'

export default function statuses(state = [], action = {}) {
    switch (action.type){
        case ADD_FRIEND:
            return action.friends
        default: return state
    }
}