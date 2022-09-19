import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './auth-reducer';
import { AppStateType } from './redux-store';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

export type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

let initialState: InitialStateType = {
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

type AppReducerActionTypes = InitializedSuccessActionType

const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AppReducerActionTypes>

export const initializeApp = () => (dispatch: any) => {   //ТИПИЗАЦИЯ
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })

}

export default appReducer;