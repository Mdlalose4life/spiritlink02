import React from 'react';
import {
  Box,
  Container,
  Flex,
  Spacer,
  Heading,
  Link as ChakraLink,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import logo from '../assets/sbu.png';

function Navigation() {
  return (
    <Box bg="gray.200" borderBottom="1px solid #e2e8f0">
      <Container maxW="container.lg">
        <Flex py={2} alignItems="center">
          <Link to="/">
            <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
          </Link>
          <Spacer />
          <HStack spacing={6}>
            <ChakraLink as={Link} to="/Chat">
              Chat
            </ChakraLink>
            <ChakraLink as={Link} to="/Login">
              Login
            </ChakraLink>
            <ChakraLink as={Link} to="/Signup">
              Signup
            </ChakraLink>
            <Menu>
              <MenuButton as={ChakraLink} rightIcon={<ChevronDownIcon />}>
                Link
              </MenuButton>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navigation;
