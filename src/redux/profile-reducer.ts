import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/api'
import { PhotosType, PostsType, ProfileType } from '../types/types';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

export type InitialStateType = {
    posts: PostsType[]
    profile: null | ProfileType
    status: string
    newPostText: string
}


let initialState: InitialStateType = {
    posts: [
        { id: 1, message: 'Post1', likesCount: 12 },
        { id: 2, message: 'Post2', likesCount: 34 },
        { id: 3, message: 'Post3', likesCount: 52 },
        { id: 4, message: 'Post4', likesCount: 42 },
        { id: 5, message: 'Post5', likesCount: 18 },
        { id: 6, message: 'Post6', likesCount: 62 },
    ],
    profile: null,
    status: '',
    newPostText: '',
}
const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 7,
                message: action.payload.newPostText,
                likesCount: 0
            };
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
export type AddPostActionCreaterActionType = {
    type: typeof ADD_POST
    payload: { newPostText: string }
}
export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    payload: { profile: ProfileType }
}
export type SetStatusActionType = {
    type: typeof SET_STATUS
    payload: { status: string }
}
export type DeletePostActionType = {
    type: typeof DELETE_POST
    payload: { postId: number }
}
export type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    payload: { photos: PhotosType }
}
export const addPostActionCreater = (newPostText: string): AddPostActionCreaterActionType => ({ type: ADD_POST, payload: { newPostText } })
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, payload: { profile } })
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, payload: { status } })
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, payload: { postId } })
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, payload: { photos } })

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(data));
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data));
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (!data.resultCode) { dispatch(setStatus(status)) }
    }
    catch (error) { }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    let data = await profileAPI.savePhoto(file)
    if (!data.resultCode) { dispatch(savePhotoSuccess(data.data.photos)) }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)
    if (!data.resultCode) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}


export default profileReducer;