import React from "react";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import s from './Dialogs.module.scss';
import { Navigate } from "react-router-dom";


function Dialogs(props) {
    let state = props.dialogsPage;

    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name} />);
    let messagesElements = state.messages.map(mess => <Message key={mess.id} message={mess.message} />)
    // let newMessageBody = state.messages.newMessageBody;
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea onChange={onNewMessageChange} value={newMessageBody} placeholder="Enter your message"></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;

