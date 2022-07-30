import React from 'react';
import s from './App.module.scss';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from '../Dialogs/DialogsContainer';

const App = (props) => {
  return (
    <div className={s.App}>
      <Header />
      <Navigation />

      <div className={s.content}>
        <Routes>
          <Route path='/dialogs' element={<DialogsContainer />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
