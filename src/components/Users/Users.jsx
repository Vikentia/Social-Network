import React from "react";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

const Users = ({
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
                    totalUsersCount={totalUsersCount}
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
