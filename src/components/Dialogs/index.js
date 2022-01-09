import React from "react";
import Message from "./Message";
import Dialog from "./Dialog";
import './style.css';





function Dialogs(props) {

    let dialogsData = props.dialogData
        .map(dialog => <Dialog id={dialog.id} name={dialog.name} />);

    let messagesData = props.messageData
        .map(mess => <Message message={mess.message} />)

    return (
        <div className="dialogs">
            <div className="dialogs__items">
                {dialogsData}
            </div>

            <div className="messages">
                {messagesData}
            </div>

        </div>
    )
}

export default Dialogs;

