import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from './Profile.module.scss'



function Profile(props) {
    return (
        <div className={s.profile}>
            <ProfileInfo />
            <MyPostsContainer />
        </div>
    )
}
export default Profile;