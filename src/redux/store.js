import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';


let store = {
    _state: {
        profilePages: {
            posts: [
                { id: 1, message: 'Post1', likesCount: 12 },
                { id: 2, message: 'Post2', likesCount: 34 },
                { id: 3, message: 'Post3', likesCount: 52 },
                { id: 4, message: 'Post4', likesCount: 42 },
                { id: 5, message: 'Post5', likesCount: 18 },
                { id: 6, message: 'Post6', likesCount: 62 },
            ],
            newPostText: 'blabla'
        },

        messagesPages: {
            dialogData: [
                { id: 1, name: 'Viktor' },
                { id: 2, name: 'Sveta' },
                { id: 3, name: 'Igor' },
                { id: 4, name: 'Masha' },
                { id: 5, name: 'Petya' },
                { id: 6, name: 'Viсtoria' }
            ],
            messageData: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'Bye' },
                { id: 3, message: 'Hello' },
                { id: 4, message: 'Mess' },
                { id: 5, message: 'Mess123' },
                { id: 6, message: 'Mess456' },
            ],
            newMessageBody: ''
        },
        sidebar: {}

    },
    getState() {
        return this._state;
    },
    rerender() {
        console.log('state changed');
    },
    subscribe(observer) {
        this.rerender = observer;
    },
    dispatch(action) {             // action = {type: ''}
        this._state.profilePages = profileReducer(this._state.profilePages, action);
        this._state.messagesPages = dialogsReducer(this._state.messagesPages, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this.rerender(this._state);
    }
}

export default store;