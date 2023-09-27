import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';
import profile from '../assets/2.png';
import {useState } from 'react';
import './Signup.css';
import customAxios from '../axiosUser'


function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfrimPassword] = useState('');
  const [accesslink, setaccessLink] = useState('');

  async function SignupHandler(ev) {
    ev.preventDefault();
    try {
      const response = await customAxios.post('auth/register', {
      username,
      email,
      password,
      confirmpassword,
      accesslink,
    });
    console.log('signup response', response.data)      
    } catch (error) {
      console.error('Signup failed', error)
    }

  }

  return (
  <Container>
    <Form onSubmit={SignupHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h2 className='text-center' >
          Create an account
        </h2>
        <div className='profile-pic'>
          <img src={profile} className='profile-pic'/>
        </div>
        <label htmlfor="profile-upload" className='profile_upload'>
          <i className='fas fa-plus-circle add-pic-icon'></i>
        </label>
        <Form.Label>username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)}  value={username} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={e=> setEmail(e.target.value)}  value={email} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={e=> setPassword(e.target.value)} value={password} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={e=> setConfrimPassword(e.target.value)} value={confirmpassword} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Access Link</Form.Label>
        <Form.Control type="string" placeholder="Enter Access Link" onChange={e=> setaccessLink(e.target.value)} value={accesslink} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Signup
      </Button>
      <div className='py-4'>
        <p className='text-center'>
          Alreade have an account ? <Link to='/Login'>Login</Link>
        </p>
      </div>
    </Form>      
  </Container>

  );
}

export default Signup;