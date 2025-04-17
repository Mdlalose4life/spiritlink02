import React from 'react';
import {
  Box,
  Container,
  Flex,
  Spacer,
  Link as ChakraLink,
  HStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/sbu.png';

function Navigation() {
  return (
    <Box bg="blue.100" borderBottom="1px solid #e2e8f0">
      <Container maxW="container.lg" px={{ base: 4, md: 6 }}>
        <Flex py={{ base: 2, md: 3 }} alignItems="center">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '120px',
                height: 'auto',
              }}
            />
          </Link>
          <Spacer />
          <HStack spacing={{ base: 3, md: 6 }}>
            <ChakraLink
              as={Link}
              to="/Login"
              color="black"
              fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            >
              Login
            </ChakraLink>
            <ChakraLink
              as={Link}
              to="/Signup"
              color="black"
              fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            >
              Signup
            </ChakraLink>
            <ChakraLink
              as={Link}
              to="/About Us"
              color="black"
              fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            >
              About Us
            </ChakraLink>
            <ChakraLink
              as={Link}
              to="/Services"
              color="black"
              fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            >
              Services
            </ChakraLink>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navigation;
