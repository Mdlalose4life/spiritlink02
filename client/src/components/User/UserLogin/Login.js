import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  Link as ChakraLink,
  useToast,
  CircularProgress,
  CircularProgressLabel,
  Center,
  Image,
  InputGroup,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserStates/UserContext';
import customAxios from '../customAxios/axiosUser';
import logo from '../../../assets/sbu.png';
import catoorn from '../../../assets/catoorns.png';
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { LoginUser } = useUserContext();
  const [error] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  async function loginHandler(ev) {
    ev.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await customAxios.post('user/login', {
        email,
        password,
      });
      LoginUser(data);
      toast({
        title: 'Logged in successfully',
        description: `Hi ${data.user.username}, welcome back to Spiritlink!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem('UserToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
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
      setIsLoading(false);
    }
  }

  async function guestLoginHandler(ev) {
    ev.preventDefault();
    try {
      setGuestLoading(true);
      const guestEmail = 'guest@gmail.com';
      const guestPassword = 'guest0123';

      const { data } = await customAxios.post('user/login', {
        email: guestEmail,
        password: guestPassword,
      });

      LoginUser(data);
      toast({
        title: 'Guest login successful',
        description: `Hi Guest, welcome to Spiritlink!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem('UserToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      navigate('/chat');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Guest login failed. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setGuestLoading(false);
    }
  }

  return (
    <Center
      minH="100vh"
      bg="#78aacb"
      py={{ base: 4, sm: 8 }}
    >
      <Stack
        boxShadow="md"
        bg="#EBF8FF"
        p={{ base: 4, sm: 10 }}
        rounded="md"
        border="1px solid #CBD5E0"
        w={{ base: "95%", md: "460px", lg: "990px" }}
        maxH={{ base: "100%", md: "95%", lg: "63%" }}
        spacing={6}
        alignItems="center"
        justifyContent="center"
      >
        <Link to="/">
          <Image src={logo} maxW="160px" mx="auto" mb={{ base: 2, md: 0 }} />
        </Link>

        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="center"
          gap={4}
        >
          <Image
            src={catoorn}
            maxW={{ base: "220px", sm: "270px", md: "312px", lg: "450px" }}
            boxShadow="lg"
            rounded="md"
          />

          <form onSubmit={loginHandler}>
            <Stack
              w={{ base: "90vw", sm: "270px", md: "400px", lg: "420px" }}
              spacing={3}
            >
              <FormControl isRequired>
                <FormLabel fontSize="sm">Email address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdAlternateEmail color="#78aacb" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="sm"
                    fontSize="sm"
                    boxShadow="sm"
                    rounded="md"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="sm">Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <RiLockPasswordLine color="#78aacb" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="sm"
                    fontSize="sm"
                    boxShadow="sm"
                    rounded="md"
                  />
                </InputGroup>
              </FormControl>

              <Button
                colorScheme="blue"
                type="submit"
                size="sm"
                isLoading={isLoading}
                boxShadow="sm"
                rounded="md"
              >
                {isLoading ? (
                  <>
                    <CircularProgress isIndeterminate size="20px" color="blue.400" />
                    <CircularProgressLabel ml={2} fontSize="xs">Logging in...</CircularProgressLabel>
                  </>
                ) : (
                  'Login'
                )}
              </Button>

              <Button
                colorScheme="red"
                type="button"
                size="sm"
                isLoading={guestLoading}
                onClick={guestLoginHandler}
                boxShadow="sm"
                rounded="md"
              >
                {guestLoading ? (
                  <>
                    <CircularProgress isIndeterminate size="20px" color="blue.400" />
                    <CircularProgressLabel ml={2} fontSize="xs">Logging in...</CircularProgressLabel>
                  </>
                ) : (
                  'Login as Guest'
                )}
              </Button>

              <Text textAlign="center" fontSize="sm">
                Don't have an account?{' '}
                <ChakraLink as={Link} to="/Signup" color="blue.500">
                  Sign up
                </ChakraLink>
              </Text>

              <FormErrorMessage>{error}</FormErrorMessage>
            </Stack>
          </form>
        </Flex>
      </Stack>
    </Center>
  );
}

export default Login;
