import React, { lazy, Suspense } from 'react';
import s from './App.module.scss';
import HeaderContainer from '../Header/HeaderContainer';
import Navigation from '../Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux'
import { initializeApp } from '../../redux/app-reducer';
import { Preloader } from '../common/Preloader/Preloader';
const ProfileContainer = lazy(() => import('../Profile/ProfileContainer'))
const DialogsContainer = lazy(() => import('../Dialogs/DialogsContainer'))
const UsersContainer = lazy(() => import('../Users/UsersContainer'))
const Login = lazy(() => import('../Login/Login'))

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
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/profile' element={<ProfileContainer />} >
                <Route path=':userId' element={<ProfileContainer />} />
              </Route>
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }

}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, { initializeApp })(App);
