const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Viktor' },
        { id: 2, name: 'Sveta' },
        { id: 3, name: 'Igor' },
        { id: 4, name: 'Masha' },
        { id: 5, name: 'Petya' },
        { id: 6, name: 'Viсtoria' }
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Bye' },
        { id: 3, message: 'Hello' },
        { id: 4, message: 'Mess' },
        { id: 5, message: 'Mess123' },
        { id: 6, message: 'Mess456' },
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return { ...state, newMessageBody: action.body };
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return { ...state, newMessageBody: '', messages: [...state.messages, { id: 7, message: body }] };
        default:
            return state;
    }

}

export const sendMessageCreater = () => ({ type: SEND_MESSAGE })

export const updateNewMessageBodyCreater = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
})
export default dialogsReducer;