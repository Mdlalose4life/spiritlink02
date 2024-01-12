import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/neon.jpg';
import Navigation from '../../components/Home/Header/Navigation'
import Footer from '../Home/Footer/footer'


function Home() {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/Signup');
  };

  return (
    <Flex
      direction="column"
      justify="space-between"
      textAlign="center"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center center"
      backgroundRepeat="no-repeat"
      height="100vh"
      color="white"
    >
      <Navigation />
      <Heading as="h1" size="xl" py="2" color="#187bcd">
        Welcome to SpiritLink
      </Heading>
      <Text fontSize="xl" color="black">
        Tired of getting spam messages and advertisements in your dedicated community?
        <br />
        Or do you want to watch videos without interruptions? 
        <br />
        Start using SpiritLink and truly connect with your friends.
      </Text>
      <Button colorScheme="blue"
              size="lg"
              mt={8}
              mx={{base: 4, md: 60}}
              onClick={handleGetStartedClick}>
        Get Started
      </Button>
        <Footer/>
      </Flex>
  );
}

export default Home;
