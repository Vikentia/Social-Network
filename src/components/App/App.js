import React from 'react';
import s from './App.module.scss';
import HeaderContainer from '../Header/HeaderContainer';
import Navigation from '../Navigation/Navigation';
import ProfileContainer from '../Profile/ProfileContainer';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from '../Dialogs/DialogsContainer';
import UsersContainer from '../Users/UsersContainer';

const App = () => {
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
          {/* <Route path='/login' element={<UsersContainer />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
