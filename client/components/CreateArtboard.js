import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

const CreateArtboard = ({ location, history }) => {
  const [name, setName] = useState('');
  const redirect = location.search
    ? location.search.split('=')[1]
    : `/canvas/${name}`;

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/api/user/artboards`, {
      name,
      user: userInfo._id,
    });

    if (data.success) {
      localStorage.setItem(`${name}`, JSON.stringify({}));
      history.push(redirect);
    }
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
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArtboard;
