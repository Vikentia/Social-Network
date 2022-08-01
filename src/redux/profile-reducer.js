const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        { id: 1, message: 'Post1', likesCount: 12 },
        { id: 2, message: 'Post2', likesCount: 34 },
        { id: 3, message: 'Post3', likesCount: 52 },
        { id: 4, message: 'Post4', likesCount: 42 },
        { id: 5, message: 'Post5', likesCount: 18 },
        { id: 6, message: 'Post6', likesCount: 62 },
    ],
    newPostText: ''
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 7,
                message: state.newPostText,
                likesCount: 0
            };
            return { ...state, posts: [...state.posts, newPost], newPostText: '' };
        case UPDATE_NEW_POST_TEXT:
            return { ...state, newPostText: action.newText };
        default:
            return state;
    }
}

export const addPostActionCreater = () => ({ type: ADD_POST })

export const updateNewPostActionCreater = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})
export default profileReducer;