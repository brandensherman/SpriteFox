import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Canvas from './Canvas';

function LandingPage() {
  return (
    <div className='container'>
      <div className='landing-container'>
        <div className='center-box'>
          <h1>SpriteFox</h1>
          <p>
            A real-time, collaborative editor
            <br />
            for creating animated sprites and pixel art
          </p>
          <Link className='btn' to='/MainPage'>
            Create Sprite
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
