import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { authAPI, securityAPI, ResultCodesEnum } from '../api/api'
import { AppStateType } from './redux-store';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
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
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}
type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export type AuthReducerActionTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => (
    { type: SET_USER_DATA, payload: { userId, email, login, isAuth } }
)
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => (
    { type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } }
)

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthReducerActionTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.authMe()
    if (data.resultCode === ResultCodesEnum.Success) {
        const { id, login, email } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => { //ТИПИЗАЦИЯ
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        const action = stopSubmit('login', { _error: message })
        dispatch(action)
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;