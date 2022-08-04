import React from "react";
import Profile from "./Profile";
import { profileAPI } from '../../api/api';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) { userId = 2 }   //устанавливает по умолчанию юзера с id=2
        profileAPI.getUserProfile(userId)
            .then((data) => {
                this.props.setUserProfile(data)

            });
    }
    render() {
        return (
            <Profile {...this.props} />
        )
    }
}

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

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, { setUserProfile })(withRouter(ProfileContainer));

