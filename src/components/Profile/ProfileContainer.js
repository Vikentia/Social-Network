import React from "react";
import Profile from "./Profile";
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux";
import {
    useLocation,
    useNavigate,
    useParams,
    Navigate
} from "react-router-dom";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) { userId = this.props.userId }   //устанавливает по умолчанию юзера с id=25234
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    render() {

        return (
            <Profile {...this.props} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose(connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }), withRouter)(ProfileContainer)



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

