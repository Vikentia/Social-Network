import React from "react";
import Dialogs from './Dialogs';
import { updateNewMessageBodyCreater, sendMessageCreater } from "../../redux/dialogs-reducer";
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => dispatch(sendMessageCreater()),
        updateNewMessageBody: (body) => dispatch(updateNewMessageBodyCreater(body)),
    }
}
let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer;

