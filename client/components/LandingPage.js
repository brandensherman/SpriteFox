import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function LandingPage() {
  let chars = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

  let hash = '';
  for (let j = 0; j < 6; j++) {
    hash += chars[Math.floor(Math.random() * 62)];
  }

  return (
    <div className='container'>
      <div className='landing-container'>
        <div className='center-box'>
          <h1>SpriteLab</h1>
          <p>
            A real-time, collaborative editor for creating animated sprites and
            pixel art.
          </p>
          <p>
            To get started, click the button below and join a new room. If you'd
            like to have a friend draw with you, simply send them the url once
            you enter the room.
          </p>
          <Link className='btn landing-btn' to={`/${hash}`}>
            <h3>Create Sprite</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
