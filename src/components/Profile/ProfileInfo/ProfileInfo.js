import React from "react";
import { Preloader } from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.scss";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />
  }
  return (
    <div className={s.profileInfo}>
      <div className={s.description_block}>
        <p>Профиль {profile.fullName}, id: {profile.userId}</p>
        <div><img src={profile.photos.small ? profile.photos.small : "https://binkor.ru/images/vopros/user_hover.png"} /></div>
        O себе: {profile.aboutMe}
        <ProfileStatus status={status} updateStatus={updateStatus} />
      </div>

    </div>
  );
}
export default ProfileInfo;
