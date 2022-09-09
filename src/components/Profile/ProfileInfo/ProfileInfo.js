import React from "react";
import { Preloader } from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.scss";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  if (!profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
if(e.target.files.length){
  savePhoto(e.target.files[0])
}
  }
  return (
    <div className={s.profileInfo}>
      <div className={s.descriptionBlock}>
        <p>Профиль {profile.fullName}, id: {profile.userId}</p>
        <div><img src={profile.photos.small || "https://binkor.ru/images/vopros/user_hover.png"} className={s.mainPhoto} /></div>
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
        <div className={s.descriptionBlock__aboutMe}>O себе: {profile.aboutMe || '-----'} </div>
        <div className={s.descriptionBlock__status}><ProfileStatus status={status} updateStatus={updateStatus} /></div>
      </div>

    </div>
  );
}
export default ProfileInfo;
