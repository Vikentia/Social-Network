const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
        // { id: 1, followed: true, fullName: 'Dima', status: 'admin', location: { country: 'Belarus', city: 'Minsk' } },
        // { id: 2, followed: true, fullName: 'Sasha', status: 'no-admin', location: { country: 'Belarus', city: 'Gomel' } },
        // { id: 3, followed: false, fullName: 'Olya', status: 'user', location: { country: 'Belarus', city: 'Brest' } },
    ],
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return { ...state, users: state.users.map(item => item.id === action.payload.id ? { ...item, followed: true } : item) };
        case UNFOLLOW:
            return { ...state, users: state.users.map(item => item.id === action.payload.id ? { ...item, followed: false } : item) };
        case SET_USERS:
            return { ...state, users: [...state.users, ...action.payload.users] };
        default:
            return state;
    }

}

export const followACr = (id) => ({ type: FOLLOW, payload: { id } })
export const unfollowACr = (id) => ({ type: UNFOLLOW, payload: { id } })
export const setUsersACr = (users) => ({ type: SET_USERS, payload: { users } })


export default usersReducer;