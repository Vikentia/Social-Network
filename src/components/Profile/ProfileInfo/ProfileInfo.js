import React from "react";
import { Preloader } from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.scss";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div className={s.profileInfo}>
      {/* <img
        className={s.myProfile__photo}
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4d8e9a38-4031-432e-af38-876842697a29/d9u15i3-e3303997-96e5-41dd-8254-305e84383889.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi80ZDhlOWEzOC00MDMxLTQzMmUtYWYzOC04NzY4NDI2OTdhMjkvZDl1MTVpMy1lMzMwMzk5Ny05NmU1LTQxZGQtODI1NC0zMDVlODQzODM4ODkucG5nIn1dXX0.u71nQl_a_E6ryQQkSQORUDPY-8xoOMrU23SaeZtPC5o"
        alt=""
        photo
      /> */}
      <div className={s.description_block}>
        <p>Профиль {props.profile.fullName}, id: {props.profile.userId}</p>
        <div><img src={props.profile.photos.small ? props.profile.photos.small : "https://binkor.ru/images/vopros/user_hover.png"} /></div>
        O себе: {props.profile.aboutMe}
        <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      </div>

    </div>
  );
}
export default ProfileInfo;
