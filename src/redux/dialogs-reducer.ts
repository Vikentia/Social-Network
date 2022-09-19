const SEND_MESSAGE = 'SEND_MESSAGE';

export type InitialStateType = {
    dialogs: InitialStateDialogsType[]
    messages: InitialStateMessagesType[]
}
type InitialStateDialogsType = {
    id: number
    name: string
}
type InitialStateMessagesType = {
    id: number
    message: string
}
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
}

const dialogsReducer = (state = initialState, action: DialogsReducerActionTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.payload.newMessageBody;
            return { ...state, messages: [...state.messages, { id: 7, message: body }] };
        default:
            return state;
    }

}

export const sendMessageCreater = (newMessageBody: string): SendMessageCreaterActionType => ({ type: SEND_MESSAGE, payload: { newMessageBody } })

export type SendMessageCreaterActionType = {
    type: typeof SEND_MESSAGE
    payload: { newMessageBody: string }
}

export type DialogsReducerActionTypes = SendMessageCreaterActionType
export default dialogsReducer;