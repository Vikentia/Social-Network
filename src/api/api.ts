import axios from 'axios';
import { UserType } from '../types/types';
import { ResultCodesEnum } from './auth-api';

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "e82d0870-e644-47bb-8212-44d44c6489be",
    }
})


export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    message: Array<string>
    resultCode: RC
}



