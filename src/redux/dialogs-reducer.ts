import { ActionsTypes } from "./redux-store";

const SEND_MESSAGE = 'SN/DIALOGS/SEND_MESSAGE';

export type InitialStateType = typeof initialState

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

const dialogsReducer = (state = initialState, action: DialogsReducerActionTypes) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.payload.newMessageBody;
            return { ...state, messages: [...state.messages, { id: 7, message: body }] };
        default:
            return state;
    }

}

export const actions = {
    sendMessageCreater: (newMessageBody: string) => ({ type: SEND_MESSAGE, payload: { newMessageBody } } as const)
}

export type DialogsReducerActionTypes = ActionsTypes<typeof actions>
export default dialogsReducer;