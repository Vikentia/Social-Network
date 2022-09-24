import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './auth-reducer';
import { AppStateType } from './redux-store';
import {ActionsTypes} from './redux-store';

const INITIALIZED_SUCCESS = 'SN/APP/INITIALIZED_SUCCESS';

export type InitialStateType = typeof initialState

export type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action: AppReducerActionTypes): InitialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true };
        default:
            return state;
    }
}


export const actions = {
    initializedSuccess: () => ({ type: INITIALIZED_SUCCESS })
}
type AppReducerActionTypes = ActionsTypes<typeof actions>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AppReducerActionTypes>

export const initializeApp = () => (dispatch: any) => {   //ТИПИЗАЦИЯ
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    })

}

export default appReducer;