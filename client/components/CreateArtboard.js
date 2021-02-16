import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function CreateArtboard() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='container'>
      <div className='landing-container'>
        <div className='center-box'>
          <h1>SpriteLab</h1>
          <form onSubmit={handleSubmit}>
            <input
              type='name'
              placeholder='Enter name of session'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className='btn btn-submit' type='submit'>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateArtboard;
