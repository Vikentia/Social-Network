import { usersAPI } from '../api/api'
import { PhotosType, UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

type InitialStateType = typeof initialState

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array os users ids

}

const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            // return { ...state, users: state.users.map(item => item.id === action.payload.id ? { ...item, followed: true } : item) };
            return { ...state, users: updateObjectInArray(state.users, action.payload.id, 'id', { followed: true }) };
        case UNFOLLOW:
            // return { ...state, users: state.users.map(item => item.id === action.payload.id ? { ...item, followed: false } : item) };
            return { ...state, users: updateObjectInArray(state.users, action.payload.id, 'id', { followed: false }) };
        case SET_USERS:
            return { ...state, users: action.payload.users };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload.currentPage }
        case SET_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.payload.totalUsersCount }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.payload.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId)
            }
        default:
            return state;
    }

}
export type FollowSuccessActionType = {
    type: typeof FOLLOW
    payload: { id: number }
}
export type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    payload: { id: number }
}
export type SetUsersActionType = {
    type: typeof SET_USERS
    payload: { users: UserType[] }
}
export type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    payload: { currentPage: number }
}
export type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_COUNT
    payload: { totalUsersCount: number }
}
export type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    payload: { isFetching: boolean }
}
export type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const followSuccess = (id: number): FollowSuccessActionType => ({ type: FOLLOW, payload: { id } })
export const unfollowSuccess = (id: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, payload: { id } })
export const setUsers = (users: UserType[]): SetUsersActionType => ({ type: SET_USERS, payload: { users } })
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, payload: { currentPage } })
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_COUNT, payload: { totalUsersCount } })
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, payload: { isFetching } })
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    const data = await usersAPI
        .getUsers(page, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}
const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId)
    !data.resultCode && dispatch(actionCreator(userId));
    dispatch(toggleFollowingProgress(false, userId));
}
export const follow = (userId: number) => async (dispatch: any) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)
    let actionCreator = followSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}
export const unfollow = (userId: number) => async (dispatch: any) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI)
    let actionCreator = unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export default usersReducer;

