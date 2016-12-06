import axios from 'axios'
import {SET_STATUSES, SET_USER_DATA} from './types'

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

export function setUserData (userData = {}) {
    return {
        type: SET_USER_DATA,
        userData: {
            username: userData.username,
            followers: userData.followers.map(user => user.username),
            following: userData.following.map(user => user.username),
            followersCount: userData.followers.length || 0,
            followingCount: userData.following.length || 0
        }
    }
}

export function fetchStatuses(user) {
    return dispatch => {
        return axios.get(`/api/users/${user}`)
            .then(data => {
                dispatch(setStatuses(data.data.user.statuses))
                dispatch(setUserData(data.data.user))
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
