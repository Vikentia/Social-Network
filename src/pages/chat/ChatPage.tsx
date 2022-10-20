import React, { useState, useEffect, useRef } from "react";
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

    const status = useSelector<AppStateType>((state) => state.chat.status);

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
            {status === "error" && <div>Some error. Please refresh page!</div>}
            <Messages />
            <AddMessageForm />
        </div>
    );
};

const Messages: React.FC = React.memo(() => {
    const messages = useSelector<AppStateType>(
        (state) => state.chat.messages
    ) as ChatMessageType[];
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(false);
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        if (
            Math.abs(
                element.scrollHeight - element.scrollTop - element.clientHeight
            ) < 300
        ) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    };

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef?.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    return (
        <div
            style={{ height: "400px", overflow: "auto" }}
            onScroll={scrollHandler}
        >
            {messages.map((m) => (
                <Message key={m.userId + m.message} message={m} />
            ))}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
});

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

    const readyStatus = useSelector<AppStateType>((state) => state.chat.status);

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
                disabled={readyStatus !== "ready"}
            >
                Send
            </Button>
        </div>
    );
};
export default ChatPage;
