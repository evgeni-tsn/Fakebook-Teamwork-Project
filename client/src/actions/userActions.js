import axios from 'axios'
import { SET_USER_DATA} from './types'
import { setStatuses } from './statusActions'

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

export function fetchUser(user) {
    return dispatch => {
        return axios.get(`/api/users/${user}`)
            .then(data => {
                dispatch(setStatuses(data.data.user.statuses))
                dispatch(setUserData(data.data.user))
            })
            .catch(console.log)
    }
}