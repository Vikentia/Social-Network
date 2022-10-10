import React from "react";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import s from "./Dialogs.module.scss";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea, createField } from "../common/FormsControls/FormsControls";
import { required, maxLengthCreator } from "../../utils/validators";
import { InitialStateType } from "../../redux/dialogs-reducer";
import { LoginFormValuesType } from "../Login/LoginPage";

type OwnPropsType = {
    dialogsPage: InitialStateType;
    sendMessage: (messageText: string) => void;
};
type NewMessageFormValuesType = {
    newMessageBody: string;
};

const Dialogs: React.FC<OwnPropsType> = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((dialog) => (
        <Dialog key={dialog.id} id={dialog.id} name={dialog.name} />
    ));
    let messagesElements = state.messages.map((mess) => (
        <Message key={mess.id} message={mess.message} />
    ));

    let addNewMessage = (values: { newMessageBody: string }) => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>{dialogsElements}</div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    );
};

const maxLength100 = maxLengthCreator(100);

type NewMessageFormValuesKeysType = Extract<
    keyof NewMessageFormValuesType,
    string
>;
type PropsType = {};

const AddMessageForm: React.FC<
    InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>(
                    "Enter your message",
                    "newMessageBody",
                    [required, maxLength100],
                    Textarea
                )}
                <button>Send</button>
            </div>
        </form>
    );
};

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({ form: "dialogAddMessageForm" })(
    AddMessageForm
);
export default Dialogs;
