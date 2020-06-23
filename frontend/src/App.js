import React from 'react';
import './App.css';
import logo from './assets/logo.png';

import Routes from './routes';
import { Route } from 'react-router-dom';

function App() {

  return (
    <div className="container">
      <img className="logo" src= {logo} alt="BeautyMenu"/>
      <div className="content">
        <Routes/>
        

      </div>
    </div>
  );
}

export default App;
