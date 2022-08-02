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
import axios from "axios";

class UsersContainer extends React.Component {
    componentDidMount() {
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
            )
            .then((response) => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
            )
            .then((response) => this.props.setUsers(response.data.items));
    };

    render() {
        return (
            <Users
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onPageChanged={this.onPageChanged}
            />
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
