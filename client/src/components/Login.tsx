import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@material-ui/core';

interface LoginProps {
  username: string;
  setUsername: (username: string) => void;
  setUser_id: (user_id: number) => void;
}

const Login = ({ username, setUsername, setUser_id }: LoginProps) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const postBody = {
      username,
      password
    }

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody)
    }

    fetch('/account/login', postOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      // handle successful login
      setUser_id(data.user_id);
      navigate('/dashboard');
    })
    .catch(error => {
      // handle error
      console.error('There was an error logging in:', error);
      // display error message to user
    });
  }

  return (
    <div className='login'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
        }}
      >
        <center>
          <h1>Login to RFridge</h1>
        </center>
        <TextField
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant='contained'
          type='submit'
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button
          type='button'
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </Box>
    </div >
  );
}

export default Login
