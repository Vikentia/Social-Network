import React from "react";

type PropsType = {
    message: string   
}
const Message:React.FC<PropsType> = (props)=> {
    return <div >
        <div>{props.message}</div>
    </div>
}


export default Message;
