import React from "react";
import MyPosts from "./MyPosts";
import ProfileInfo from "./ProfileInfo";
import './style.css'

function Profile() {
    return (
        <div className="profile">
            <ProfileInfo />
            <MyPosts />
        </div>
    )
}
export default Profile;