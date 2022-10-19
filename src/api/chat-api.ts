
let subcribers = [] as Array<SubscriberType>

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log("close channel");
    setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
    let data = JSON.parse(e.data);
    // setMessages((prevMessages) => [...prevMessages, ...data]);
    subcribers.forEach(s => s(data))
};


function createChannel() {
    ws?.removeEventListener("close", closeHandler);
    ws?.close();

    ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
    );
    ws.addEventListener("close", closeHandler);
    ws.addEventListener("message", messageHandler);

}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subcribers = []
        ws?.removeEventListener("close", closeHandler);
        ws?.removeEventListener("message", messageHandler);
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subcribers.push(callback)
        return () => {
            subcribers = subcribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subcribers = subcribers.filter(s => s !== callback)
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
type SubscriberType = (messages: ChatMessageType[]) => void