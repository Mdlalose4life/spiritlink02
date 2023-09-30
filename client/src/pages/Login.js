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
  Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import customAxios from '../axiosUser';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { LoginUser } = useUserContext();
  const [error, setError] = useState('');

  async function loginHandler(ev) {
    ev.preventDefault();

    try {
      const response = await customAxios.post('/user/login', {
        email,
        password,
      });
      console.log('Login response', response.data);
    } catch (err) {
      console.error('Login failed', err);
      setError('Invalid email or password');
    }
    await LoginUser({ email, password });
  }

  return (
    <Container maxW="container.sm">
      <form onSubmit={loginHandler}>
        <Stack spacing={4} py={6}>
          <FormControl isRequired isInvalid={error}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
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
          <Button colorScheme="blue" type="submit">
            Login
            <i class="fa-solid fa-right-to-bracket"></i>
          </Button>
          <Text textAlign="center">
            Don't have an account?{' '}
            <ChakraLink as={Link} to="/Signup">
              Signup
            </ChakraLink>
          </Text>
        </Stack>
      </form>
    </Container>
  );
}

export default Login;
