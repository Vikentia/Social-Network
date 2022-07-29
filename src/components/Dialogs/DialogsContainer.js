import React from "react";
import Dialogs from './Dialogs';
import { updateNewMessageBodyCreater, sendMessageCreater } from "../../redux/dialogs-reducer";

function DialogsContainer(props) {

    let state = props.store.getState().dialogsPage;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreater())
    }
    let onNewMessageChange = (body) => {
        props.store.dispatch(updateNewMessageBodyCreater(body));
    }

    return (<Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} dialogsPage={state} />)
}

export default DialogsContainer;

