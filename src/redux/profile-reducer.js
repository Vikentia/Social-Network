import { profileAPI } from '../api/api'

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';


let initialState = {
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
}
const profileReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export const addPostActionCreater = (newPostText) => ({ type: ADD_POST, payload: { newPostText } })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, payload: { profile } })
export const setStatus = (status) => ({ type: SET_STATUS, payload: { status } })
export const deletePost = (postId) => ({ type: DELETE_POST, payload: { postId } })

export const getUserProfile = (userId) => async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(data));
}
export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data));
}
export const updateStatus = (status) => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (!data.resultCode) { dispatch(setStatus(status)) }
}


export default profileReducer;