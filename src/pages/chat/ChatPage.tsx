import React from "react";
import { Button, Input } from "antd";

const wsChannel = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

export type ChatMessageType = {
    message: string | null;
    photo: string | undefined;
    userId: number | null;
    userName: string | null;
};

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
};

const Chat: React.FC = () => {
    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
};

const Messages: React.FC = () => {
    const [messages, setMessages] = React.useState<ChatMessageType[]>([
        {
            message: "Дефолтное сообщение",
            photo: "https://kartinkin.net/uploads/posts/2021-07/1626811209_19-kartinkin-com-p-kruglie-arti-art-krasivo-20.jpg",
            userId: 999,
            userName: "Victoria",
        },
    ]);

    React.useEffect(() => {
        wsChannel.addEventListener("message", (e: MessageEvent) => {
            let data = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...data]);
        });
    }, []);

    return (
        <div style={{ height: "400px", overflow: "auto" }}>
            {messages.map((m) => (
                //@ts-ignore
                <Message key={m.userId + m.message} message={m} />
            ))}
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img src={message.photo} width={"20"} /> <b>{message.userName}</b>{" "}
            <p>{message.message}</p>
            <hr />
        </div>
    );
};

const AddMessageForm: React.FC = () => {
    const { TextArea } = Input;
    const [message, setMessage] = React.useState("");

    const sendMessage = () => {
        if (!message) return;
        wsChannel.send(message);
        setMessage("");
    };
    return (
        <div>
            <TextArea
                onChange={(e) => setMessage(e.currentTarget.value)}
                value={message}
                rows={2}
            />
            <Button onClick={sendMessage} type="primary">
                Send
            </Button>
        </div>
    );
};
export default ChatPage;
