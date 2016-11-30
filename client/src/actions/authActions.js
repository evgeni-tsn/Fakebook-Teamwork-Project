import axios from 'axios'
import setAuthToken from '../utilities/setAuthToken'
import jwtDecode from 'jwt-decode'
import {SET_CURRENT_USER} from './types'

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data)
      .then(res => {
        const token = res.data.token
        localStorage.setItem('jwtToken', token)
        setAuthToken(token)
        dispatch(setCurrentUser(jwtDecode(token)))
      })
  }
}