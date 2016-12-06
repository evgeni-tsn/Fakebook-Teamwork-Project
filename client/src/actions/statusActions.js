import { SET_STATUSES, COMMENT } from './types'
import axios from 'axios'

export function createStatus(status) {
	return dispatch => {
		return axios.post('/api/statuses/create', status)
			.then(console.log)
			.catch(err => console.log('error: ' + err))
	}
}

export function fetchAllStatuses() {
	return dispatch => {
		return axios.get(`/api/statuses/`)
			.then(data => dispatch(setStatuses(data.data)))
	}
}

export function deleteStatus(id) {
	return axios.post('/api/statuses/delete/' + id)
		.then((data) => {
			return data.data.success
		})
		.catch(err => console.log('error: ' + err))
}

export function setStatuses(statuses = []) {
	return {
		type: SET_STATUSES,
		statuses: statuses
	}
}

export function comment (statusId, content) {
		return axios.post(`/api/statuses/${statusId}`, { content: content })
}