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
  CircularProgressLabel,
  Flex
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserStates/UserContext';
import customAxios from '../customAxios/axiosUser';
import logo from '../../../assets/sbu.png';
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import catoorn from '../../../assets/catoorn_01.png';

function Signup() {
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error] = useState('');
  const { SignupUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  async function signupHandler(ev) {
    ev.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await customAxios.post('user/register', {
        username,
        email,
        password,
        confirmpassword,
      });

      SignupUser(data);
      toast({
        title: 'Success',
        description: `Hi ${data.user.username}, your account is set.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem('UserToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      navigate('/chat');

    } catch (error) {
      console.error('Signup failed', error);
      toast({
        title: 'Error',
        description: 'Signup failed. Please check your information and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function guestSignupHandler(ev) {
    ev.preventDefault();
    try {
      setGuestLoading(true);
      const guestUsername = 'guestuser';
      const guestEmail = 'guest@gmail.com';
      const guestPassword = 'guest0123';
      const guestConfirmPassword = 'guest0123';

      const { data } = await customAxios.post('user/register', {
        username: guestUsername,
        email: guestEmail,
        password: guestPassword,
        confirmpassword: guestConfirmPassword,
      });

      SignupUser(data);
      toast({
        title: 'Success',
        description: 'Hi Guest user, your account is successfully set.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem('UserToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      navigate('/chat');

    } catch (error) {
      console.error('Signup failed', error);
      toast({
        title: 'Error',
        description: 'Guest signup failed. Please try again.',
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
      minH={{ base: "100vh", sm: "100vh", lg: "100vh" }}
      bg="#78aacb"
      py={{ base: 4, sm: 8 }}
    >
      <Stack
        boxShadow="md"
        bg="#EBF8FF"
        p={{ base: 4, sm: 10 }}
        rounded="md"
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
            border="1px solid #CBD5E0"
            maxW={{ base: "220px", sm: "270px", md: "312px", lg: "450px" }}
            boxShadow="lg"
            rounded="md"
          />

          <form onSubmit={signupHandler}>
            <Stack
              w={{ base: "90vw", sm: "270px", md: "400px", lg: "420px" }}
              spacing={3}
            >
              <FormControl isRequired>
                <FormLabel fontSize="sm">Username</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <CiUser color="#78aacb" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    size="sm"
                    fontSize="sm"
                    boxShadow="sm"
                    rounded="md"
                  />
                </InputGroup>
              </FormControl>

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

              <FormControl isRequired>
                <FormLabel fontSize="sm">Confirm Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <RiLockPasswordLine color="#78aacb" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
              >
                {isLoading ? (
                  <>
                    <CircularProgress isIndeterminate size="20px" color="blue.400" />
                    <CircularProgressLabel ml={2} fontSize="xs">Signing up...</CircularProgressLabel>
                  </>
                ) : (
                  'Signup'
                )}
              </Button>

              <Button
                colorScheme="red"
                type="button"
                size="sm"
                isLoading={guestLoading}
                onClick={guestSignupHandler}
              >
                {guestLoading ? (
                  <>
                    <CircularProgress isIndeterminate size="20px" color="blue.400" />
                    <CircularProgressLabel ml={2} fontSize="xs">Signing up...</CircularProgressLabel>
                  </>
                ) : (
                  'Signup as a Guest'
                )}
              </Button>

              <Text textAlign="center" fontSize="sm">
                Already have an account?{' '}
                <ChakraLink as={Link} to="/Login" color="blue.500">
                  Login
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

export default Signup;
