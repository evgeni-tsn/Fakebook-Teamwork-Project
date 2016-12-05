import axios from 'axios'
import { SET_OPTIONS } from './types'

export function searchByUsername (username) {
	return dispatch => {
		return axios.get('/api/users/search/' + username)
			.then(data => {
				console.log(data)
				dispatch(setOptions(data.data.users))
			})
			.catch(console.log)
	}
}

export function setOptions (state = []) {
	console.log('STATE', state)
	return {
		type: SET_OPTIONS,
		options: state
	}
}