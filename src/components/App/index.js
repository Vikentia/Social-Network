import React from 'react';
import './style.css';
import Header from '../Header/index';
import Navigation from '../Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from '../Profile';
import Dialogs from '../Dialogs';


function App() {
  return (
    <Router>

      <div className="App">
        <Header />
        <Navigation />

        <div className='content'>
          <Routes>
            <Route path='/dialogs' element={<Dialogs />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
