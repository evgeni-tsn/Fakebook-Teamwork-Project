import axios from 'axios'
import { SET_STATUSES } from './types'

export function createStatus(status) {
  return dispatch => {
    return axios.post('/api/statuses', status)
  }
}

export function setStatuses(statuses) {
  return {
    type: SET_STATUSES,
    statuses
  }
}

export function fetchStatuses() {
  return dispatch => {
    return axios.get('/api/statuses')
                .then(data => dispatch(setStatuses(data.data)))
  }
}