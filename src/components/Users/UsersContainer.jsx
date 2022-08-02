import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import {
    followACr,
    unfollowACr,
    setUsersACr,
    setCurrentPageACr,
    setTotalUsersCountACr,
} from "../../redux/users-reducer";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followACr(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowACr(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersACr(users));
        },
        setCurrentPage: (page) => {
            dispatch(setCurrentPageACr(page));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountACr(totalCount));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
