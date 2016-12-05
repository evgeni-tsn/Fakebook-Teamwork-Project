import axios from 'axios'
import { ADD_FRIEND } from './types'

export function addFriend(username) {
    return dispatch => {
        console.log(status)
        return axios.post('/api/users/befriend/'+username, username)
            .then(console.log)
            .catch(err => console.log('error: ' + err))
    }
}

export function setFriends(friends = []) {
    return {
        type: ADD_FRIEND,
        friends: friends
    }
}

