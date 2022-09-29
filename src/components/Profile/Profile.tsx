import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "./Profile.module.scss";
import { ProfileType } from "../../types/types";

type PropsType = {
    profile: ProfileType;
    status: string;
    updateStatus: (status: string) => void;
    isOwner: boolean;
    savePhoto: (file: File) => void;
    saveProfile: (profile: ProfileType) => Promise<any>;
};
const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    );
};
export default Profile;
