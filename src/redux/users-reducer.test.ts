import usersReducer, { InitialStateType, actions } from './users-reducer';

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            { id: 0, name: 'Name 0', followed: false, photos: { small: null, large: null }, status: 'Status 0' },
            { id: 1, name: 'Name 1', followed: false, photos: { small: null, large: null }, status: 'Status 1' },
            { id: 2, name: 'Name 2', followed: true, photos: { small: null, large: null }, status: 'Status 2' },
            { id: 3, name: 'Name 3', followed: true, photos: { small: null, large: null }, status: 'Status 3' },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: []
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
})
test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})