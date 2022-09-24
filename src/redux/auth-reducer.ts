import { Action } from 'redux';
import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { authAPI, ResultCodesEnum } from '../api/auth-api'
import { securityAPI } from '../api/security-api'
import { AppStateType, ActionsTypes, BaseThunkType } from './redux-store';

export type InitialStateType = typeof initialState
export type AuthReducerActionTypes = ActionsTypes<typeof actions>
type ThunkTypeAuthReducer = BaseThunkType<AuthReducerActionTypes | ReturnType<typeof stopSubmit>>

const SET_USER_DATA = 'SN/AUTH/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: AuthReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        { type: SET_USER_DATA, payload: { userId, email, login, isAuth } } as const
    ),
    getCaptchaUrlSuccess: (captchaUrl: string) => (
        { type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } } as const
    )
}

export const getAuthUserData = (): BaseThunkType<AuthReducerActionTypes> => async (dispatch) => {
    const data = await authAPI.authMe()
    if (data.resultCode === ResultCodesEnum.Success) {
        const { id, login, email } = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkTypeAuthReducer => async (dispatch) => { 
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        const message = data.message.length > 0 ? data.message[0] : 'Some error'  //messages => message
        const action = stopSubmit('login', { _error: message })
        dispatch(action)
    }
}
export const logout = (): BaseThunkType<AuthReducerActionTypes> => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): BaseThunkType<AuthReducerActionTypes> => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;