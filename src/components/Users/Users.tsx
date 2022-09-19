import React from "react";
import { UserType } from "../../types/types";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

type PropsType = {
    totalUsersCount: number;
    onPageChanged: (pageNumber: number) => void;
    pageSize: number;
    users: Array<UserType>;
    currentPage: number;
    followingInProgress: number[];
    unfollow: (id: number) => void;
    follow: (id: number) => void;
};

const Users: React.FC<PropsType> = ({
    totalUsersCount,
    onPageChanged,
    pageSize,
    users,
    currentPage,
    followingInProgress,
    unfollow,
    follow,
    ...props
}) => {
    return (
        <div>
            <div>
                <Pagination
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                />
            </div>
            {users.map((user) => (
                <User
                    key={user.id}
                    user={user}
                    followingInProgress={followingInProgress}
                    unfollow={unfollow}
                    follow={follow}
                />
            ))}
        </div>
    );
};

export default Users;
