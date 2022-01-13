import React from 'react';
import './style.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';
import Dialogs from '../Dialogs/Dialogs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App(props) {
  return (
    <Router>

      <div className="App">
        <Header />
        <Navigation />

        <div className='content'>
          <Routes>
            <Route path='/dialogs' element={<Dialogs
              dialogData={props.state.messagesPages.dialogData}
              messageData={props.state.messagesPages.messageData}
              store={props.store} />} />
            <Route path='/profile' element={<Profile
              profilePage={props.state.profilePages}
              dispatch={props.dispatch} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
