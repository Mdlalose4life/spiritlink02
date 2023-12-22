import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/neon.jpg';
import Navigation from '../../components/Home/Header/Navigation'


function Home() {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/Signup');
  };

  return (
    <Box
      className="home-container"
      textAlign="center"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center center"
      backgroundRepeat="no-repeat"
      height="100vh"
      color="white"
    >
      <Navigation />
      <Heading as="h1" size="xl" py="16" color="#187bcd">
        Welcome to SpiritLink
      </Heading>
      <Text fontSize="xl" mt={4} color="black">
        Tired of getting spam messages and advertisements in your dedicated community?
        <br />
        Or do you want to watch videos without interruptions? 
        <br />
        Start using SpiritLink and truly connect with your friends.
      </Text>
      <Button colorScheme="blue" size="lg" mt={8} onClick={handleGetStartedClick}>
        Get Started
      </Button>
    </Box>
  );
}

export default Home;
