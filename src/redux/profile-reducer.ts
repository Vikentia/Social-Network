import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { profileAPI } from '../api/profile-api'
import { PhotosType, PostsType, ProfileType } from '../types/types';
import { ActionsTypes, AppStateType, BaseThunkType } from './redux-store';

const ADD_POST = 'SN/PROFILE/ADD-POST';
const DELETE_POST = 'SN/PROFILE/DELETE_POST';
const SET_USER_PROFILE = 'SN/PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'SN/PROFILE/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SN/PROFILE/SAVE_PHOTO_SUCCESS';

export type InitialStateType = typeof initialState
export type ProfileReducerActionTypes = ActionsTypes<typeof actions>
type ThunkTypeProfileReducer = BaseThunkType<ProfileReducerActionTypes | ReturnType<typeof stopSubmit>>

let initialState = {
    posts: [
        { id: 1, message: 'Hello', likesCount: 12 },
        { id: 2, message: 'Good day!', likesCount: 34 },
        { id: 3, message: 'Great weather', likesCount: 52 },
        { id: 4, message: 'Welcome!', likesCount: 42 },
        { id: 5, message: 'Hi', likesCount: 18 },
        { id: 6, message: 'Ooops))', likesCount: 62 },
    ] as PostsType[],
    profile: null as null | ProfileType,
    status: '',
    newPostText: '',
}
const profileReducer = (state = initialState, action: ProfileReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 7,
                message: action.payload.newPostText,
                likesCount: 0
            };
            // return { ...state, posts: [...state.posts, newPost]};
            return { ...state, posts: [...state.posts, newPost], newPostText: '' };
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(post => action.payload.postId !== post.id) }
        case SET_USER_PROFILE:
            return { ...state, profile: action.payload.profile }
        case SET_STATUS:
            return { ...state, status: action.payload.status }
        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.payload.photos } as ProfileType } //Исправить
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreater: (newPostText: string) => ({ type: ADD_POST, payload: { newPostText } }) as const,
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, payload: { profile } }) as const,
    setStatus: (status: string) => ({ type: SET_STATUS, payload: { status } }) as const,
    deletePost: (postId: number) => ({ type: DELETE_POST, payload: { postId } }) as const,
    savePhotoSuccess: (photos: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, payload: { photos } }) as const,
}

export const getUserProfile = (userId: number): BaseThunkType<ProfileReducerActionTypes> => async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUserProfile(data));
}
export const getStatus = (userId: number): BaseThunkType<ProfileReducerActionTypes> => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): BaseThunkType<ProfileReducerActionTypes> => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (!data.resultCode) { dispatch(actions.setStatus(status)) }
    }
    catch (error) { }
}
export const savePhoto = (file: any): BaseThunkType<ProfileReducerActionTypes> => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (!data.resultCode) { dispatch(actions.savePhotoSuccess(data.data.photos)) }
}
export const saveProfile = (profile: ProfileType): ThunkTypeProfileReducer => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)
    if (!data.resultCode) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("UserId can't be null")
        }
    } else {
        dispatch(stopSubmit('edit-profile', { _error: data.message[0] }))
        return Promise.reject(data.message[0])
    }
}

export default profileReducer;