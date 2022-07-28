import React from 'react';
import s from './App.module.scss';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';
import Dialogs from '../Dialogs/Dialogs';
import { Route, Routes } from 'react-router-dom';



const App = (props) => {
  return (
    <div className={s.App}>
      <Header />
      <Navigation />

      <div className={s.content}>
        <Routes>
          <Route path='/dialogs' element={<Dialogs
            // dialogData={props.state.messagesPages.dialogData}
            // messageData={props.state.messagesPages.messageData}
            state={props.store} />}
          />
          <Route path='/profile' element={<Profile
            profilePage={props.state.profilePages}
            dispatch={props.dispatch} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
