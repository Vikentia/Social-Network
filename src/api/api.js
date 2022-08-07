import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "e82d0870-e644-47bb-8212-44d44c6489be",
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/` + userId)
            .then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/` + userId)
            .then(response => response.data)
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateStatus(newStatus) {
        return instance.put(`profile/status`, { status: newStatus })
            .then(response => response.data)
    },
}



