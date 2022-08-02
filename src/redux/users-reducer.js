const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: !false
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
        default:
            return state;
    }

}

export const follow = (id) => ({ type: FOLLOW, payload: { id } })
export const unfollow = (id) => ({ type: UNFOLLOW, payload: { id } })
export const setUsers = (users) => ({ type: SET_USERS, payload: { users } })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, payload: { currentPage } })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_COUNT, payload: { totalUsersCount } })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, payload: { isFetching } })


export default usersReducer;