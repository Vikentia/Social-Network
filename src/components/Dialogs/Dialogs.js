import React from "react";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import './style.css';
import { updateNewMessageBodyCreater, sendMessageCreater } from "../../redux/dialogs-reducer";

function Dialogs(props) {

    let state = props.store.getState().messagesPages;
    let dialogsData = state.dialogData
        .map(dialog => <Dialog id={dialog.id} name={dialog.name} />);

    let messagesData = state.messageData
        .map(mess => <Message message={mess.message} />)
    let newMessageBody = state.messageData.newMessageBody;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreater());
    }
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.store.dispatch(updateNewMessageBodyCreater(body));
    }

    return (
        <div className="dialogs">
            <div className="dialogs__items">
                {dialogsData}
            </div>

            <div className="messages">
                <div>{messagesData}</div>
                <div>
                    <div><textarea onChange={onNewMessageChange} value={newMessageBody} placeholder="Enter your message"></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;

