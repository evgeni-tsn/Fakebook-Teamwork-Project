import axios from 'axios'
import { SET_OPTIONS } from './types'

export function searchByUsername (username, page = 0) {

	return dispatch => {
		return axios.get(`/api/users/search/${username}/page/${page}`)
			.then(data => {
				console.log(data)
				dispatch(setOptions(data.data.users))
			})
			.catch(console.log)
	}
}

export function clearSearch() {
	return dispatch => { dispatch(setOptions([])) }
}

export function setOptions (state = []) {
	console.log('STATE', state)
	return {
		type: SET_OPTIONS,
		options: state
	}
}