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
  Center,
  Image
 } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserStates/UserContext';
import customAxios from '../customAxios/axiosUser';
import logo from '../../../assets/sbu.png'

function Signup() {
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [accesslink, setAccessLink] = useState('');
  const [error] = useState('');
  const {SignupUser} = useUserContext();
  
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
      //console.log('Signup response', response.data);
      SignupUser(response.user);
      navigate('/chat');
      toast({
        title: 'success',
        description: 'Signup successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
      console.error('Signup failed',error);
      toast({
        title: 'Error',
        description: 'Signup failed. Please check your information and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <Center h="100vh" bg="#78aacb">
      <Stack
      boxShadow="md"
      bg="#EBF8FF"
      p="20"
      rounded="md"
      boxSize="600px"
      alignItems="center"
      justifyContent="center"
      >
        <form onSubmit={signupHandler}>
            <Stack w="530px">
                <Link to="/">
                    <Image src={logo} maxW="140px" mx="auto" mt="-10"/>  
                </Link>
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="md"
                fontSize="small"
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="md"
                fontSize="small"
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="md"
                fontSize="small"
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                type="password"
                placeholder="Enter password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="md"
                fontSize="small"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Access Link</FormLabel>
                <Input
                type="string"
                placeholder="Enter Access Link"
                value={accesslink}
                onChange={(e) => setAccessLink(e.target.value)}
                size="md"
                fontSize="small"
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
      </Stack>
    </Center>
  );
}

export default Signup;