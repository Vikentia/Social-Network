import React from 'react';
import s from './App.module.scss';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import ProfileContainer from '../Profile/ProfileContainer';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from '../Dialogs/DialogsContainer';
import UsersContainer from '../Users/UsersContainer';

const App = () => {
  return (
    <div className={s.App}>
      <Header />
      <Navigation />

      <div className={s.content}>
        <Routes>
          <Route path='/dialogs' element={<DialogsContainer />} />
          <Route path='/profile/*' element={<ProfileContainer />} />
          <Route path='/users' element={<UsersContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
