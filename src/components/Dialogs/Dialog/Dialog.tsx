import React from "react";
import { NavLink } from "react-router-dom";

type PropsType = {
    id: number;
    name: string;
};
const Dialog: React.FC<PropsType> = (props) => {
    return (
        <div>
            <NavLink to={"/dialogs/" + props.id}> {props.name} </NavLink>
        </div>
    );
};

export default Dialog;
