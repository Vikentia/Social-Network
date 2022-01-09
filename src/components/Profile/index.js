import React from "react";
import MyPosts from "./MyPosts";
import ProfileInfo from "./ProfileInfo";
import './style.css'



function Profile(props) {
    return (
        <div className="profile">
            <ProfileInfo />
            <MyPosts postsData={props.postsData} />
        </div>
    )
}
export default Profile;