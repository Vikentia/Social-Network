import React from 'react';
import './style.css';
import Header from '../Header/index';
import Navigation from '../Navigation';
import Content from '../Content';

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Content />
    </div>
  );
}

export default App;
