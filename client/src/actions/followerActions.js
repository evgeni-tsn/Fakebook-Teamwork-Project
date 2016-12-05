import axios from 'axios'

export function follow(username) {
    return axios.post(`/api/users/follow/${username}`)
}

export function unfollow (username) {
    return axios.post(`/api/users/unfollow/${username}`)
}
