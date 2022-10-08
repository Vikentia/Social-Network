import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { APIResponseType } from '../api/api';
import { usersAPI } from '../api/users-api'
import { PhotosType, UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { ActionsTypes, AppStateType, BaseThunkType } from './redux-store';

const FOLLOW = 'SN/USERS/FOLLOW';
const UNFOLLOW = 'SN/USERS/UNFOLLOW';
const SET_USERS = 'SN/USERS/SET_USERS';
const SET_CURRENT_PAGE = 'SN/USERS/SET_CURRENT_PAGE';
const SET_FILTER = 'SN/USERS/SET_FILTER';
const SET_TOTAL_COUNT = 'SN/USERS/SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'SN/USERS/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS';

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
export type UserReducerActionsTypes = ActionsTypes<typeof actions>

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array os users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
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
        case SET_FILTER:
            return { ...state, filter: action.payload }
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
    setFilter: (filter: FilterType) => ({ type: SET_FILTER, payload:  filter  } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: SET_TOTAL_COUNT, payload: { totalUsersCount } } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, payload: { isFetching } } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId } as const),
}

export const requestUsers = (page: number, pageSize: number, filter: FilterType): BaseThunkType<UserReducerActionsTypes> => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));
    const data = await usersAPI
        .getUsers(page, pageSize, filter.term, filter.friend)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}
const followUnfollowFlow = async (dispatch: Dispatch<UserReducerActionsTypes>, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => UserReducerActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId)
    !data.resultCode && dispatch(actionCreator(userId));
    dispatch(actions.toggleFollowingProgress(false, userId));
}
export const follow = (userId: number): BaseThunkType<UserReducerActionsTypes> => async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)
    let actionCreator = actions.followSuccess
    await followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}
export const unfollow = (userId: number): BaseThunkType<UserReducerActionsTypes> => async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI)
    let actionCreator = actions.unfollowSuccess
    await followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export default usersReducer;

