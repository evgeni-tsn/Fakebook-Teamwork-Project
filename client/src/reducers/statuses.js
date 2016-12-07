import {SET_STATUSES, CLEAN_STATUSES, SET_FINISHED, SET_FETCHING} from '../actions/types'

const initialState = {
	statuses: [],
	finished: false,
	fetching: false,
}

export default function users(state = initialState, action = {}) {
	switch (action.type){
		case SET_STATUSES:
			return {...state, statuses: action.statuses}
		case CLEAN_STATUSES:
			return {...state, statuses: []}
		case SET_FINISHED:
			return {...state, finished: action.finished}
		case SET_FETCHING:
			return {...state, fetching: action.fetching}
		default:
			return state
	}
}