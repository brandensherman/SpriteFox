import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Canvas from './Canvas';
import Palette from './Palette';
import Navbar from './Navbar';

function MainPage() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className='main-container'>
        <div>
          <Palette />
        </div>
        <div>
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
