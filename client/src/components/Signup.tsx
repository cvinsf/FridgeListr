import React, { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button'

interface SignupProps {
  username: string,
  setUsername: (username: string) => void
}

const Signup: FC<SignupProps> = ({ username, setUsername }) => {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  let navigate = useNavigate();

  const signupPost = () => {
    const postBody = {
      username,
      password,
      email
    };

    const postOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    };

    fetch('/account/signup', postOptions)
    .then((data) => data.json())
    .then((data) => {
      setUsername('');
      setPassword('');
      setEmail('');

      navigate('/home');
    })
    .catch((error: Error) => console.log(error));
  };

  return (
  <div className='signup'>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
    }}
  >
    <center>
      <h1>Sign Up!</h1>
    </center>
    <Input
      placeholder='Username'
      type='text'
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <Input
      placeholder='Password'
      type='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <Input
      placeholder='Email'
      type='email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Button
      type='submit'
      onClick={signupPost}
    >
      Sign Up
    </Button>
  </Box>
  </div >
  );
}

export default Signup