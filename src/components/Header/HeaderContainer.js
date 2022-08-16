import React from 'react';
import Header from './Header';
import { useSelector, useDispatch, connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
        login: state.auth.login,
});

export default connect(mapStateToProps, {  logout })(HeaderContainer);


















//  const HeaderContainer = (props) => {
    //     const state = useSelector(state => state.auth)
    //     const dispatch = useDispatch()
    //     const setAuthUserDataDispatch = ({ id, email, login }) => dispatch(setAuthUserData(id, email, login))
    
    //     React.useEffect(() => {
    //         axios
    //             .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
    //                 withCredentials: true,
    //             })
    //             .then((response) => {
    //                 setAuthUserDataDispatch(response.data.data)
    //             });
    //     }, [])
    //     console.log('state', state);
    //     return <Header {...props} state={state} setAuthUserDataDispatch={setAuthUserDataDispatch} />
    
    // }
    
    // export default HeaderContainer;