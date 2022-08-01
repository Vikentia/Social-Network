import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { followACr, unfollowACr, setUsersACr } from "../../redux/users-reducer";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
