import axios from 'axios';
import { ProfileType } from '../types/types';

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
    unfollow(userId: number) {
        return instance.delete(`follow/` + userId)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/` + userId)
            .then(response => response.data)
    }
}
export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}


type AuthMeType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    authMe() {
        return instance.get<AuthMeType>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateStatus(newStatus: string) {
        return instance.put(`profile/status`, { status: newStatus })
            .then(response => response.data)
    },
    savePhoto(file: any) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
            .then(response => response.data)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
            .then(response => response.data)
    },
}


