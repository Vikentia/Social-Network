import React from 'react';
import './style.css';
import Header from '../Header/index';
import Navigation from '../Navigation';
import { BrowserRouter, Routes } from 'react-router-dom';
import Profile from '../Profile';
import Dialogs from '../Dialogs';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navigation />

        <div className='content'>
          <Routes path='/dialogs' component={Dialogs} />
          <Routes path='/profile' component={Profile} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
