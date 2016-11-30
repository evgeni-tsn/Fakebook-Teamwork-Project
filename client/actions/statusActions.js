import axios from 'axios'

export function createStatus(status) {
  return dispatch => {
    return axios.post('/api/statuses', status)
  }
}