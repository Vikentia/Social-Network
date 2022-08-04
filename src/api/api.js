import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "43682266-6cea-407d-95a3-5756ab4b895a",
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
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
}

export const followAPI = {
    follow(userId) {
        return instance.delete(`follow/` + userId)
            .then(response => response.data)
    },
    unfollow(userId) {
        return instance.post(`follow/` + userId)
            .then(response => response.data)
    }
}

