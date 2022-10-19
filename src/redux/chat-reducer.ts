import { Dispatch } from 'redux';
import { FormAction } from 'redux-form';
import { ChatMessageType, chatAPI } from '../api/chat-api';
import { ActionsTypes, BaseThunkType } from "./redux-store";


export type InitialStateType = typeof initialState
export type ChatReducerActionTypes = ActionsTypes<typeof actions>

const MESSAGES_RECEIVED = 'SN/CHAT/MESSAGES_RECEIVED';

let initialState = {
    messages: [] as ChatMessageType[],
}

const chatReducer = (state = initialState, action: ChatReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return { ...state, messages: [...state.messages, ...action.payload.messages] }

        default:
            return state;
    }
}

export const actions = {
    messageReceived: (messages: ChatMessageType[]) => (
        { type: MESSAGES_RECEIVED, payload: { messages } } as const
    ),

}
let _newMessageHandler: ((message: ChatMessageType[]) => void) | null = null


const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(actions.messageReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): BaseThunkType<ChatReducerActionTypes> => async (dispatch) => {
    chatAPI.start()
    //@ts-ignore
    chatAPI.subscribe(newMessageHandlerCreator)
}
export const stopMessagesListening = (): BaseThunkType<ChatReducerActionTypes> => async (dispatch) => {
    //@ts-ignore
    chatAPI.unsubscribe(newMessageHandlerCreator)
    chatAPI.stop()
}
// export const sendMessage = (message: string): BaseThunkType<ChatReducerActionTypes> => async (dispatch) => {
export const sendMessage = (message: string): BaseThunkType<ActionsType | FormAction> => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;

type ActionsType = ActionsTypes<typeof actions>