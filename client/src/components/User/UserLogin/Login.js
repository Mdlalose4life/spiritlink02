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
  
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserStates/UserContext';
import customAxios from '../customAxios/axiosUser';
import logo from '../../../assets/sbu.png'
import catoorn from '../../../assets/catoorns.png'
import './Login'
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
  const [guestLoading, setguestLoading] = useState(false);

  async function loginHandler(ev) {
    ev.preventDefault();

    try {
      //console.log("1.0. I get executed")
      const config = {
        headers:{
          "Content-type": "application/json",          
        }
      };
      // Set loading state
      setIsLoading(true);
      const { data } = await customAxios.post('user/login' ,{
        email,
        password,
      }, config);

      LoginUser(data)
      toast({
        title: 'Logged in successfully',
        description: `Hi ${data.user.username} Welcome back to Spiritlink`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Navigate to the chat page upon successful login
      localStorage.setItem('UserToken', data.token);
      //console.log(data.user)
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
      // Reset loading state after login attempt
      setIsLoading(false);
    }

  }
  async function guestLoginHandler(ev) {
    ev.preventDefault();

    try {
      // Set loading state
      setguestLoading(true);

      // guest login defaults credentials
      const guestEmail = 'guest@gmail.com';
      const guestPassword = 'guest0123';

      const config = {
        headers:{
          "Content-type": "application/json",          
        }
      };

      const { data } = await customAxios.post('user/login' ,{
        email: guestEmail,
        password: guestPassword,
      }, config);

      LoginUser(data)
      toast({
        title: 'Guest logged in successfully',
        description: 'Guest user logged in successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Navigate to the chat page upon successful login
      localStorage.setItem('UserToken', data.token);
      //console.log(data.user)
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      navigate('/chat');

    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Guest login failed. Please signup as a guest user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      // Reset loading state after login attempt
      setguestLoading(false);
    }
  }

  return (
    <Center h="100vh" bg="#78aacb">
      <Image src={catoorn} maxW="400px" />
      <Stack
      boxShadow="md"
      bg="#EBF8FF"
      p="20"
      rounded="md"
      boxSize={{
                base:"80%",
                md:"450px",
                lg:"470px"
              }}
      alignItems="center"
      justifyContent="center"
      >
        <Link to="/">
          <Image src={logo} maxW="140px" mb="2" mt="-10"/>  
        </Link>
          <form onSubmit={loginHandler}>
            <Stack w= {{
                        base:"240px",
                        md:"400px",
                        lg:"415px"
                        }}>
              <FormControl isRequired isInvalid={error} w="100%">
                <FormLabel> Email address</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <MdAlternateEmail color='#78aacb'/>
                    </InputLeftElement>
                    <Input
                      type="email"  
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="md"
                      width="100%"
                      fontSize="small"
                    />
                  </InputGroup>
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <RiLockPasswordLine color='#78aacb'/>
                    </InputLeftElement>
                      <Input
                          type="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          fontSize="small"
                          size="md"
                          width="100%"
                        />
                  </InputGroup>
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
                <Button
                  colorScheme="red"
                  type="submit"
                  isLoading={guestLoading}
                  loadingText="Logging in..."
                  onClick={guestLoginHandler}
                >
                  {guestLoading ? (
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
                    'Login As A Guest'
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
          <Text fontSize='small' fontWeight="Bold" color="red">
            Log in with information you signuped with
          </Text>
      </Stack>
    </Center>
  );
}

export default Login;
