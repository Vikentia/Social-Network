import React from "react";
import s from "./Users.module.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { followAPI } from "../../api/api";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
        if (i === 25) break;
    }

    return (
        <div>
            {pages.map((p) => (
                <span
                    className={props.currentPage === p && s.selectedPage}
                    onClick={(e) => props.onPageChanged(p)}
                >
                    {p}
                </span>
            ))}

            {props.users.map((u) => (
                <div className={s.userProfile} key={u.id}>
                    <div className={s.userProfile__photo}>
                        <NavLink to={"/profile/" + u.id}>
                            <img
                                src={
                                    u.photos.small ||
                                    "https://binkor.ru/images/vopros/user_hover.png"
                                }
                                className={s.userPhoto}
                            />
                        </NavLink>
                    </div>
                    <div className={s.userProfile__button}>
                        {u.followed ? (
                            <button
                                onClick={() => {
                                    followAPI.follow(u.id).then((data) => {
                                        !data.resultCode &&
                                            props.unfollow(u.id);
                                    });
                                }}
                            >
                                Unfollow
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    followAPI.unfollow(u.id).then((data) => {
                                        !data.resultCode && props.follow(u.id);
                                    });
                                }}
                            >
                                Follow
                            </button>
                        )}
                    </div>

                    <div className={s.userProfile__info}>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Users;
