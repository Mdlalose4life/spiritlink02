import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from '../UserContext';
import customAxios from '../axiosUser';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { LoginUser } = useUserContext();
  
  async function LoginpHandler(ev) {
    ev.preventDefault();

    try {
      const response = await customAxios.post('/auth/login', {
        email,
        password,
      });
      console.log('Login response', response.data);
    } catch (error) {
      console.error('login failed', error);
    }
    await LoginUser({email, password});
  }

  return (
  <Container>
    <Form onSubmit={LoginpHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={e=> setEmail(e.target.value)}  value={email} required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={e=> setPassword(e.target.value)} value={password} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <div className='py-4'>
        <p className='text-center'>
          Don't have an account ? <Link to='/Signup'>Signup</Link>
        </p>
      </div>
    </Form>      
  </Container>

  );
}

export default Login;