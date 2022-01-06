import React from "react";
import { NavLink } from "react-router-dom";
import './style.css';

function Dialog(props) {
    return <div className="dialog dialog_active">
        <NavLink to={'/dialogs/' + props.id}> {props.name} </NavLink>
    </div>
}

function Message(props) {
    return <div className="message">
        <div className="message">{props.message}</div>
    </div>
}

function Dialogs() {
    return (
        <div className="dialogs">
            <div className="dialogs__items">
                <Dialog id='1' name='Viktor' />
                <Dialog id='2' name='Sveta' />
                <Dialog id='3' name='Igor' />
                <Dialog id='4' name='Masha' />
                <Dialog id='5' name='Petya' />
                <Dialog id='6' name='Viсtoria' />
            </div>

            <div className="messages">
                <Message message='Hi' />
                <Message message='Bye' />
                <Message message='Hello' />
                <Message message='Mess' />
                <Message message='Mess123' />
            </div>

        </div>
    )
}

export default Dialogs;
