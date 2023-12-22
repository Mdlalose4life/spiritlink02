import React, { useState } from 'react';
import customAxios from '../customAxios/axiosUser';
import {
  Button,
  useToast,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function Logout() {
const navigate = useNavigate();
const toast = useToast();
const [isLoading, setIsLoading] = useState(false)

  async function handleLogout() {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('UserToken');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }
      
      const data = await customAxios.post('/user/logout', { token });
      console.log('Logout successful', data);
      toast({
        title: 'Logged out successfully',
        description: 'Goodbye',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
  return (
  <div>
    <Button colorScheme="red"
    onClick={handleLogout}
    type='submit'
    isLoading={isLoading}
    loadingText="Logging out..."
    >
      Logout
    </Button>
  </div>
  );
}
export default Logout;
