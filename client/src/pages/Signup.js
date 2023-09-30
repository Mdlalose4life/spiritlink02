import React, { useState } from 'react';
import { 
  Button, 
  Container, 
  FormControl, 
  FormErrorMessage, 
  FormLabel, 
  Input, 
  Stack, 
  Text, 
  Link as ChakraLink,
 } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import customAxios from '../axiosUser';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [accesslink, setAccessLink] = useState('');
  const [error, setError] = useState('');

  async function signupHandler(ev) {
    ev.preventDefault();
    try {
      const response = await customAxios.post('user/register', {
        username,
        email,
        password,
        confirmpassword,
        accesslink,
      });
      console.log('Signup response', response.data);
    } catch (err) {
      console.error('Signup failed', err);
      setError('Signup failed. Please check your information and try again.');
    }
  }

  return (
    <Container maxW="container.sm">
      <form onSubmit={signupHandler}>
        <Stack spacing={4} py={6}>
          <Text textAlign="center" fontSize="2xl">
            Create an account
          </Text>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Access Link</FormLabel>
            <Input
              type="string"
              placeholder="Enter Access Link"
              value={accesslink}
              onChange={(e) => setAccessLink(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Signup
          </Button>
          <Text textAlign="center">
            Already have an account?{' '}
            <ChakraLink as={Link} to="/Login">
              Login
            </ChakraLink>
          </Text>
          <FormErrorMessage>{error}</FormErrorMessage>
        </Stack>
      </form>
    </Container>
  );
}

export default Signup;
