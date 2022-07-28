import React from "react";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import s from './Dialogs.module.scss';
import { updateNewMessageBodyCreater, sendMessageCreater } from "../../redux/dialogs-reducer";

function Dialogs(props) {

    let state = props.state.getState().messagesPages;
    let dialogsData = state.dialogData
        .map(dialog => <Dialog id={dialog.id} name={dialog.name} />);

    let messagesData = state.messageData
        .map(mess => <Message message={mess.message} />)
    let newMessageBody = state.messageData.newMessageBody;

    let onSendMessageClick = () => {
        props.state.dispatch(sendMessageCreater());
    }
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.state.dispatch(updateNewMessageBodyCreater(body));
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsData}
            </div>

            <div className={s.messages}>
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

