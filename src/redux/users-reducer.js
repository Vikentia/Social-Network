import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../utils/object-helpers';

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
            // return { ...state, users: state.users.map(item => item.id === action.payload.id ? { ...item, followed: true } : item) };
            return { ...state, users: updateObjectInArray(state.users, action.payload.id, 'id', { followed: true }) };
        case UNFOLLOW:
            // return { ...state, users: state.users.map(item => item.id === action.payload.id ? { ...item, followed: false } : item) };
            return { ...state, users: updateObjectInArrayInArray(state.users, action.payload.id, 'id', { followed: false }) };
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

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    const data = await usersAPI
        .getUsers(page, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}
export const follow = (userId) => async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(userId)
    let actionCreator = followSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}
export const unfollow = (userId) => async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(userId)
    let actionCreator = unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId)
    !data.resultCode && dispatch(actionCreator(userId));
    dispatch(toggleFollowingProgress(false, userId));
}


export default usersReducer;

