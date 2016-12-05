import axios from 'axios'
import {SET_STATUSES} from './types'

export function createStatus(status) {
    return dispatch => {
        return axios.post('/api/statuses/create', status)
            .then(console.log)
            .catch(err => console.log('error: ' + err))
    }
}

export function setStatuses(statuses = []) {
    return {
        type: SET_STATUSES,
        statuses: statuses
    }
}

export function fetchStatuses(user) {
    return dispatch => {
        return axios.get(`/api/users/${user}`)
            .then(data => {
                console.log(data)
                dispatch(setStatuses(data.data.user.statuses))
            })
            .catch(console.log)
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
