import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
} from "../../redux/profile-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
    useLocation,
    useNavigate,
    useParams,
    Navigate,
} from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";

// type MapPropsType = ReturnType<typeof mapStateToProps>;
type MapPropsType = {
    profile: ProfileType
    status: string
    userId: number
    isAuth: boolean
}
type DispatchPropsType = {
    getUserProfile: (userId: number) => void;
    getStatus: (userId: number) => void;
    updateStatus: (status: string) => void;
    savePhoto: (file: File) => void;
    saveProfile: (profile: ProfileType) => Promise<any>;
};

type PropsType = MapPropsType & DispatchPropsType & {
    router: any
};

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.router.params.userId;
        if (!userId) {
            userId = this.props.userId;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps: PropsType) {
        if (this.props.router.params.userId !== prevProps) {
            this.refreshProfile();
        }
    }
    render() {
        return (
            <Profile
                isOwner={!this.props.router.params.userId}
                // savePhoto={this.props.savePhoto}
                {...this.props}
            />
        );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile,
    }),
    withRouter
)(ProfileContainer);

function withRouter(Component: React.ComponentType) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}
// export default compose(connect(mapStateToProps, { getUserProfile }), withRouter, withAuthRedirect)(ProfileContainer)

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

// export default connect(mapStateToProps, { getUserProfile })(withRouter(AuthRedirectComponent));
