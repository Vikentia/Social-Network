import React from 'react';
import Header, { MapPropsType, DispatchPropsType } from './Header';
import { useSelector, useDispatch, connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
    render() {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state:AppStateType) => ({
        isAuth: state.auth.isAuth,
        login: state.auth.login,
});

export default connect<MapPropsType,DispatchPropsType,{},AppStateType>(mapStateToProps, {  logout })(HeaderContainer);


















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