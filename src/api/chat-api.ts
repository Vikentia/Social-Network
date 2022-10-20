import { StatusType } from "../redux/chat-reducer";

let subcribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
}

let ws: WebSocket | null = null;
type EventsNamesType = 'messages-received' | 'status-changed'

const notifySubscribersAboutStatus = (status: StatusType) => {
    subcribers["status-changed"].forEach(s => s(status))
}
const closeHandler = () => {
    console.log("close channel");
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
    let data = JSON.parse(e.data);
    // setMessages((prevMessages) => [...prevMessages, ...data]);
    subcribers['messages-received'].forEach(s => s(data))
};
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
};
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('Refresh page!')
};
const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler);
    ws?.removeEventListener("message", messageHandler);
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}


function createChannel() {
    cleanUp()
    ws?.close();

    ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
    );
    notifySubscribersAboutStatus('pending')
    ws.addEventListener("close", closeHandler);
    ws.addEventListener("message", messageHandler);
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)

}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subcribers['messages-received'] = []
        subcribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subcribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },

}

export type ChatMessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void