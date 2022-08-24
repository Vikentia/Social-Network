import React from "react";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

const Users = ({
    totalUsersCount,
    onPageChanged,
    pageSize,
    users,
    followingInProgress,
    unfollow,
    follow,
    ...props
}) => {
    return (
        <div>
            <Pagination
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
            />
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
