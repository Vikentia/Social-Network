import React from "react";
import Profile from "./Profile";
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux";
import {
    useLocation,
    useNavigate,
    useParams,
    Navigate
} from "react-router-dom";


class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.userId
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps) {
        if (this.props.router.params.userId !== prevProps) {
            this.refreshProfile()
        }
    }
    render() {

        return (
            <Profile {...this.props} isOwner={!this.props.router.params.userId} savePhoto={this.props.savePhoto} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose(withAuthRedirect, connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }), withRouter)(ProfileContainer)



function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
// export default compose(connect(mapStateToProps, { getUserProfile }), withRouter, withAuthRedirect)(ProfileContainer)


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)


// export default connect(mapStateToProps, { getUserProfile })(withRouter(AuthRedirectComponent));

