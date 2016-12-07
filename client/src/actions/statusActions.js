import { SET_STATUSES, CLEAN_STATUSES, SET_FINISHED, SET_FETCHING } from './types'
import axios from 'axios'

export function createStatus(status) {
	return dispatch => {
		return axios.post('/api/statuses/create', status)
			.then(console.log)
			.catch(err => console.log('error: ' + err))
	}
}

export function fetchAllStatuses(prevStatuses, page) {
	return dispatch => {
		return axios.get(`/api/statuses/${page}`)
			.then(data => {
				dispatch(setFetching())
				if(!data.data.finished) {
					dispatch(setStatuses(prevStatuses.concat(data.data.statuses)))
				} else {
					dispatch(setFinished(true))
				}
			})
	}
}

export function fetchAllTillPage(page) {
	return dispatch => {
		return axios.get(`/api/statuses/till/${page}`)
			.then(data => {
				dispatch(setFetching())
				dispatch(setStatuses(data.data.statuses))
			})
	}
}

export function fetchAllBeginNew() {
	return dispatch => {
		return axios.get(`/api/statuses/${0}`)
			.then(data => {
				dispatch(setFetching())
				dispatch(cleanStatuses())
				dispatch(setFinished(false))
				dispatch(setStatuses(data.data.statuses))
			})
	}
}

export function deleteStatus(id) {
	return axios.post('/api/statuses/delete/' + id)
		.then((data) => {
			return data.data.success
		})
		.catch(err => console.log('error: ' + err))
}

export function setFinished(finished = false) {
	return {
		type: SET_FINISHED,
		finished: finished
	}
}

export function setStatuses(statuses = []) {
	return {
		type: SET_STATUSES,
		statuses: statuses
	}
}

export function setFetching(fetching = false) {
	return {
		type: SET_FETCHING,
		fetching: fetching
	}
}

export function cleanStatuses() {
	return {
		type: CLEAN_STATUSES
	}
}

export function comment (statusId, content) {
		return axios.post(`/api/statuses/${statusId}`, { content: content })
}