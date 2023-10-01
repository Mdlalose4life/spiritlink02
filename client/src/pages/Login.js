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
  useToast,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import customAxios from '../axiosUser';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { LoginUser } = useUserContext();
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();  
  const [isLoading, setIsLoading] = useState(false);

  async function loginHandler(ev) {
    ev.preventDefault();

    try {
      // Set loading state
      setIsLoading(true);

      const response = await customAxios.post('/user/login', {
        email,
        password,
      });

      console.log('Login response', response.data);
      toast({
        title: 'Logged in successfully',
        description: 'Logged in successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Navigate to the chat page upon successful login
      navigate('/chat');

    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      // Reset loading state after login attempt
      setIsLoading(false);
    }

    // Call LoginUser function if needed
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
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}
            loadingText="Logging in..."
          >
            {isLoading ? (
              <>
                <CircularProgress
                  isIndeterminate
                  size="24px"
                  color='blue.400'
                  trackColor='transparent'
                />
                <CircularProgressLabel ml={2}>Logging in...</CircularProgressLabel>
              </>
            ) : (
              'Login'
            )}
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
