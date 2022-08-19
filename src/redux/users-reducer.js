import { usersAPI } from '../api/api'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],

}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return { ...state, users: state.users.map(item => item.id === action.payload.id ? { ...item, followed: true } : item) };
        case UNFOLLOW:
            return { ...state, users: state.users.map(item => item.id === action.payload.id ? { ...item, followed: false } : item) };
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

export const followSuccess = (id) => ({ type: FOLLOW, payload: { id } })
export const unfollowSuccess = (id) => ({ type: UNFOLLOW, payload: { id } })
export const setUsers = (users) => ({ type: SET_USERS, payload: { users } })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, payload: { currentPage } })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_COUNT, payload: { totalUsersCount } })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, payload: { isFetching } })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsers = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    usersAPI
        .getUsers(currentPage, pageSize)
        .then((data) => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
}
export const follow = (usedId) => (dispatch) => {
    dispatch(toggleFollowingProgress(true, usedId));
    usersAPI.follow(usedId).then((data) => {
        !data.resultCode && dispatch(followSuccess(usedId));
        dispatch(toggleFollowingProgress(false, usedId));
    });
}
export const unfollow = (usedId) => (dispatch) => {
    dispatch(toggleFollowingProgress(true, usedId));
    usersAPI.unfollow(usedId).then((data) => {
        !data.resultCode && dispatch(unfollowSuccess(usedId));
        dispatch(toggleFollowingProgress(false, usedId));
    });
}


export default usersReducer;

