import { randomUUID } from 'crypto';
import { Dispatch } from 'redux';
import { FormAction } from 'redux-form';
import { ChatMessageType, chatAPI } from '../api/chat-api';
import { ActionsTypes, BaseThunkType } from "./redux-store";
import { v1 } from 'uuid'


export type InitialStateType = typeof initialState
export type ChatReducerActionTypes = ActionsTypes<typeof actions>
export type StatusType = 'pending' | 'ready' | 'error'
type ChatMessageTypeWithV1 = ChatMessageType & { id: string }

const MESSAGES_RECEIVED = 'SN/CHAT/MESSAGES_RECEIVED';
const STATUS_CHANGED = 'SN/CHAT/STATUS_CHANGED';

let initialState = {
    messages: [] as ChatMessageTypeWithV1[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ChatReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state, messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
                    .filter((m, ind, array) => ind >= array.length - 100)
            }
        case STATUS_CHANGED:
            return { ...state, status: action.payload.status }

        default:
            return state;
    }
}

export const actions = {
    messageReceived: (messages: ChatMessageType[]) => (
        { type: MESSAGES_RECEIVED, payload: { messages } } as const
    ),
    statusChanged: (status: StatusType) => (
        { type: STATUS_CHANGED, payload: { status } } as const
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
let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): BaseThunkType<ChatReducerActionTypes> => async (dispatch) => {
    chatAPI.start()
    //@ts-ignore
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    //@ts-ignore
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): BaseThunkType<ChatReducerActionTypes> => async (dispatch) => {
    //@ts-ignore
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    //@ts-ignore
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
// export const sendMessage = (message: string): BaseThunkType<ChatReducerActionTypes> => async (dispatch) => {
export const sendMessage = (message: string): BaseThunkType<ActionsType | FormAction> => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;

type ActionsType = ActionsTypes<typeof actions>