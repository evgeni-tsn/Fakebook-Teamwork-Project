import axios from 'axios'
import { ADD_FRIEND } from './types'

export function follow(username) {
    return axios.post(`/api/users/follow/${username}`)
}

export function setFriends(friends = []) {
    return {
        type: ADD_FRIEND,
        friends: friends
    }
}

