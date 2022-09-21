import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/api'
import { PhotosType, UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { ActionsTypes, AppStateType } from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

type InitialStateType = typeof initialState
export type UserReducerActionsTypes = ActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UserReducerActionsTypes>


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array os users ids
}

const usersReducer = (state = initialState, action: UserReducerActionsTypes): InitialStateType => {

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

export const actions = {
    followSuccess: (id: number) => ({ type: FOLLOW, payload: { id } } as const),
    unfollowSuccess: (id: number) => ({ type: UNFOLLOW, payload: { id } } as const),
    setUsers: (users: UserType[]) => ({ type: SET_USERS, payload: { users } } as const),
    setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, payload: { currentPage } } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: SET_TOTAL_COUNT, payload: { totalUsersCount } } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, payload: { isFetching } } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId } as const),
}

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    const data = await usersAPI
        .getUsers(page, pageSize)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}
const followUnfollowFlow = async (dispatch: Dispatch<UserReducerActionsTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) => UserReducerActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId)
    !data.resultCode && dispatch(actionCreator(userId));
    dispatch(actions.toggleFollowingProgress(false, userId));
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)
    let actionCreator = actions.followSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI)
    let actionCreator = actions.unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export default usersReducer;

