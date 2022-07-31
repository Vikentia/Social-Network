import React from "react";
import Dialogs from './Dialogs';
import { updateNewMessageBodyCreater, sendMessageCreater } from "../../redux/dialogs-reducer";
import { connect } from 'react-redux'

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => dispatch(sendMessageCreater()),
        updateNewMessageBody: (body) => dispatch(updateNewMessageBodyCreater(body)),
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;

