import profileReducer, { addPostActionCreater, deletePost } from './profile-reducer';

let state = {
    posts: [
        { id: 1, message: 'Post1', likesCount: 12 },
        { id: 2, message: 'Post2', likesCount: 34 },
        { id: 3, message: 'Post3', likesCount: 52 },
        { id: 4, message: 'Post4', likesCount: 42 },
        { id: 5, message: 'Post5', likesCount: 18 },
        { id: 6, message: 'Post6', likesCount: 62 },
    ]
}

it('length of posts should be incremented', () => {
    let action = addPostActionCreater('Test message')
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(7)
})
it('new message should be correct added', () => {
    let action = addPostActionCreater('Test message')
    let newState = profileReducer(state, action)
    expect(newState.posts[6].message).toBe('Test message')
})
it('after remove of post length should decremented', () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)
})
it(`after remove of post length shouldn't be changed if id isn't correct`, () => {
    let action = deletePost(10)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(6)
})
