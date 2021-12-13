import React from "react";
import MyPosts from "./MyPosts";
import './style.css'

function Profile() {
    return (
        <div className="profile">
            <img className='myProfile__photo' src='https://million-wallpapers.ru/wallpapers/6/25/558793398422584/nebesnaya-glad-slivaetsya-s-vodnoj-gladyu-garmoniya.jpg' alt='' photo />
            <MyPosts />
        </div>
    )
}
export default Profile;