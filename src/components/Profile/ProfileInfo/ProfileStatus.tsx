import React, { useState, useEffect, ChangeEvent } from "react";

type PropsType = {
    status: string;
    updateStatus: (status: string) => void;
};

const ProfileStatus: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {editMode ? (
                <input
                    onChange={onStatusChange}
                    value={status}
                    onBlur={deactivateEditMode}
                    autoFocus
                />
            ) : (
                <span
                    onDoubleClick={activateEditMode}
                    style={{ border: "none", paddingLeft: 10 }}
                >
                    {" "}
                    {props.status || "no status"}{" "}
                </span>
            )}
        </div>
    );
};
export default ProfileStatus;
