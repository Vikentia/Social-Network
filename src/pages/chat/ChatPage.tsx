import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { ChatMessageType } from "../../api/chat-api";
import { useDispatch, useSelector } from "react-redux";
import {
    sendMessage,
    startMessagesListening,
    stopMessagesListening,
} from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
};

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        //@ts-ignore
        dispatch(startMessagesListening());
        return () => {
            //@ts-ignore
            dispatch(stopMessagesListening());
        };
    }, []);

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
};

const Messages: React.FC = () => {
    const messages = useSelector<AppStateType>(
        (state) => state.chat.messages
    ) as ChatMessageType[];

    return (
        <div style={{ height: "400px", overflow: "auto" }}>
            {messages.map((m) => (
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
    const [message, setMessage] = useState("");
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
        "pending"
    );

    const dispatch = useDispatch();

    const sendMessageHandler = () => {
        if (!message) return;
        //@ts-ignore
        dispatch(sendMessage(message));
        setMessage("");
    };
    return (
        <div>
            <TextArea
                onChange={(e) => setMessage(e.currentTarget.value)}
                value={message}
                rows={2}
            />
            <Button
                onClick={sendMessageHandler}
                type="primary"
                // disabled={wsChannel !== null && readyStatus !== "ready"}
            >
                Send
            </Button>
        </div>
    );
};
export default ChatPage;
