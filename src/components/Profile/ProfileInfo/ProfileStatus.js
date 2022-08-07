import React, { useState } from "react";


const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false)

  const activateEditMode = (e) => {
    setEditMode(true)
  }
  const deactivateEditMode = (e) => {
    setEditMode(false)
  }
  return (
    <div >
      {editMode
        ? <input value={props.status} onBlur={deactivateEditMode} autoFocus />
        : <span onDoubleClick={activateEditMode} >{props.status}</span>
      }
    </div>
  );
}
export default ProfileStatus;
