import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { compose } from "redux";
import { Preloader } from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
    getUsers,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
} from "../../redux/users-selectors";
import {
    actions,
    requestUsers,
    follow,
    unfollow,
} from "../../redux/users-reducer";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
type MapStatePropsType = {
    currentPage: number;
    pageSize: number;
    isFetching: boolean;
    totalUsersCount: number;
    users: Array<UserType>;
    followingInProgress: Array<number>;
};
type MapDispatchPropsType = {
    unfollow: (id: number) => void;
    follow: (id: number) => void;
    getUsers: (currentPage: number, pageSize: number) => void;
    setCurrentPage: (pageNumber: number) => void;
};
type OwnPropsType = {};
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize } = this.props;
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader />}
                <Users
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                />
            </>
        );
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         followingInProgress: state.usersPage.followingInProgress,
//     };
// };

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state),
        isFetching: getIsFetching(state),
    };
};
export default compose(
    // withAuthRedirect,
    connect<
        MapStatePropsType,
        MapDispatchPropsType,
        OwnPropsType,
        AppStateType
    >(mapStateToProps, {
        setCurrentPage: actions.setCurrentPage,
        getUsers: requestUsers,
        follow,
        unfollow,
    })
)(UsersContainer);
