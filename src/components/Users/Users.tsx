import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import {
    actions,
    FilterType,
    requestUsers,
    follow,
    unfollow,
} from "../../redux/users-reducer";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter,
} from "../../redux/users-selectors";

type PropsType = {};

const Users: React.FC<PropsType> = () => {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const followingInProgress = useSelector(getFollowingInProgress);
    const users = useSelector(getUsers);
    const filter = useSelector(getUsersFilter);

    const dispatch = useDispatch<any>();

    React.useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    };

    const _follow = (userId: number) => {
        dispatch(follow(userId));
    };
    const _unfollow = (userId: number) => {
        dispatch(unfollow(userId));
    };

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
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged} />
            </div>
            {users.map((user) => (
                <User
                    key={user.id}
                    user={user}
                    followingInProgress={followingInProgress}
                    unfollow={_unfollow}
                    follow={_follow}
                />
            ))}
        </div>
    );
};

export default Users;
