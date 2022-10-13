import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../common/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
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
    const [searchParams, setSearchParams] = useSearchParams();

    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const followingInProgress = useSelector(getFollowingInProgress);
    const users = useSelector(getUsers);
    const filter = useSelector(getUsersFilter);

    const dispatch = useDispatch<any>();

    React.useEffect(() => {
        const parsed = Object.fromEntries(searchParams);
        let actualPage = currentPage;
        let actualFilter = filter;
        if (parsed.page) actualPage = +parsed.page;
        if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term };
        if (parsed.friend)
            actualFilter = {
                ...actualFilter,
                friend:
                    parsed.friend === "null"
                        ? null
                        : parsed.friend === "true"
                        ? true
                        : false,
            };
        dispatch(requestUsers(actualPage, pageSize, actualFilter));
    }, []);

    React.useEffect(() => {
        const term = filter.term;
        const friend = filter.friend;

        let query =
            (term === "" ? "" : `&term=${term}`) +
            (friend === null ? "" : `&friend=${friend}`) +
            (currentPage === 1 ? "" : `&page=${currentPage}`);

        setSearchParams(query);
    }, [filter, currentPage]);

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
