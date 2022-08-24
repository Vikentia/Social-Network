import React from "react";
import s from "./Users.module.scss";
import { NavLink } from "react-router-dom";

const User = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div>
            <div className={s.userProfile} key={user.id}>
                <div className={s.userProfile__photo}>
                    <NavLink to={"/profile/" + user.id}>
                        <img
                            src={
                                user.photos.small ||
                                "https://binkor.ru/images/vopros/user_hover.png"
                            }
                            className={s.userPhoto}
                        />
                    </NavLink>
                </div>
                <div className={s.userProfile__button}>
                    {user.followed ? (
                        <button
                            disabled={followingInProgress.some(
                                (id) => id === user.id
                            )}
                            onClick={() => {
                                unfollow(user.id);
                            }}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            disabled={followingInProgress.some(
                                (id) => id === user.id
                            )}
                            onClick={() => {
                                follow(user.id);
                            }}
                        >
                            Follow
                        </button>
                    )}
                </div>

                <div className={s.userProfile__info}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
            </div>
        </div>
    );
};

export default User;
