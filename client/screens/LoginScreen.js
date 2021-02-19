import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      '/api/auth/login',
      {
        email,
        password,
      },
      config
    );

    if (data.success === true) {
      const cookie = await axios.get('/api/auth/me');
      localStorage.setItem('userInfo', JSON.stringify(cookie.data));

      history.push(redirect);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='auth-container'>
        <form className='form-container' onSubmit={handleSubmit}>
          <div className='form-item'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor='password'>Password</label>
            <input
              type='text'
              name='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className='btn btn-submit' type='submit'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
