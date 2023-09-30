import React from 'react';
import { Button, Box, Heading, Text} from '@chakra-ui/react';
//import { useHistory } from 'react-router-dom';

function Home() {
  //const history = useHistory();

  //useEffect(() => {
    //const userInfor = JSON.parse(localStorage.getItem("userInfo"));
    //setUser(userInfor)

    //if (!userInfor){
      //history.push("/Chat");
    //}

  //}, [history])  
  return (
    <Box className="home-container" textAlign="center">
      <Heading as="h1" size="xl">
        Welcome to SpiritLink
      </Heading>
      <Text fontSize="xl" mt={4}>
        Stay connected.
      </Text>
      <Button colorScheme="blue" size="lg" mt={8}>
        Get Started
      </Button>
    </Box>
  );
}

export default Home;



