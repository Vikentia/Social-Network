import React from 'react';
import s from './App.module.scss';
import HeaderContainer from '../Header/HeaderContainer';
import Navigation from '../Navigation/Navigation';
import ProfileContainer from '../Profile/ProfileContainer';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from '../Dialogs/DialogsContainer';
import UsersContainer from '../Users/UsersContainer';
import Login from '../Login/Login';
import { connect } from 'react-redux'
import { initializeApp } from '../../redux/app-reducer';
import { Preloader } from '../common/Preloader/Preloader';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className={s.App}>
        <HeaderContainer />
        <Navigation />

        <div className={s.content}>
          <Routes>
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/profile' element={<ProfileContainer />} >
              <Route path=':userId' element={<ProfileContainer />} />
            </Route>
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    );
  }

}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, { initializeApp })(App);
