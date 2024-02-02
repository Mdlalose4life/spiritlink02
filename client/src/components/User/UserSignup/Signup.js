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
  Center,
  Image,
  InputGroup,
  InputLeftElement,
  CircularProgress,
  CircularProgressLabel
 } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserStates/UserContext';
import customAxios from '../customAxios/axiosUser';
import logo from '../../../assets/sbu.png'
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { CiLink } from "react-icons/ci";


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
  const [isLoading, setIsLoading] = useState(false)
  
  async function signupHandler(ev) {
    ev.preventDefault();
    try {
      setIsLoading(true)
      const { data } = await customAxios.post('user/register', {
        username,
        email,
        password,
        confirmpassword,
        accesslink,
      });

      //console.log('Signup response', response.data);
      SignupUser(data);
      toast({
        title: 'success',
        description: 'Signup successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Navigate the user to the chat if signup is succesfull
      localStorage.setItem('UserToken', data.token)
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      navigate('/chat');

    } catch (error) {
      console.error('Signup failed',error);
      toast({
        title: 'Error',
        description: 'Signup failed. Please check your information and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <Center h="100vh" bg="#78aacb">
      <Stack
      boxShadow="md"
      bg="#EBF8FF"
      p="20"
      rounded="md"
      boxSize={{
                base:"89%",
                md:"580px",
                lg:"590px"
              }}
      alignItems="center"
      justifyContent="center"
      >
        <form onSubmit={signupHandler}>
            <Stack w= {{
                        base:"320px",
                        md:"520px",
                        lg:"540px"
                        }}>
                <Link to="/">
                    <Image src={logo} maxW="140px" mx="auto" mt="-10"/>  
                </Link>
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <CiUser color='#78aacb'/>
                        </InputLeftElement>
                            <Input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            size="md"
                            fontSize="small"
                            />             
                    </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
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
                            fontSize="small"
                            />
                    </InputGroup>
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
                        size="md"
                        fontSize="small"
                        />
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <RiLockPasswordLine color='#78aacb'/>
                        </InputLeftElement>
                            <Input
                            type="password"
                            placeholder="Enter password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            size="md"
                            fontSize="small"
                            />
                    </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Access Link</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <CiLink color='#78aacb' />
                        </InputLeftElement>
                            <Input
                            type="string"
                            placeholder="Enter Access Link"
                            value={accesslink}
                            onChange={(e) => setAccessLink(e.target.value)}
                            size="md"
                            fontSize="small"
                            />
                        </InputGroup>
            </FormControl>
            <Button
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}
            loadingText="Signing up..."
            >
              {isLoading ? (
                <>
                <CircularProgress
                  isIndeterminate
                  size="24px"
                  color='blue.400'
                  trackColor='tranparent'
                />
                <CircularProgressLabel ml={2}>Signing up... </CircularProgressLabel>
                </>
              ) : (
                'Signup'
              )}

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