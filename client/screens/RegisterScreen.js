import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

    if (password !== confirmPassword) {
      console.log('passwords do not match');
    } else {
      const { data } = await axios.post(
        '/api/auth/register',
        {
          name,
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
    }
  };

  return (
    <div className='auth-container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <div className='form-item'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-item'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-item'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-item'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className='btn btn-submit' type='submit'>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
