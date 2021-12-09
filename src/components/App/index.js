import React from 'react';
import './style.css';
import Header from '../Header/index';
import Navigation from '../Navigation';
import Content from '../Content';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Props from '../Props/index';
import Component from '../Component/index';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navigation />
        <Content />
        <div>
          <Routes path='/component' component={Component} />
          <Routes path='/props' component={Props} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
