import { Container, Flex, HStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import React from 'react';

export default function Footer() {
  return (
    <Flex
      bg="blue.100"
      borderTop="px solid #4299E1"
      py={3}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Container maxW="container.lg">
        <HStack spacing={6}>
          <ChakraLink as="a" href="/privacy-policy">
            Privacy Policy
          </ChakraLink>
          <ChakraLink as="a" href="/terms-of-service">
            Terms of Service
          </ChakraLink>
          <Text>&copy; 2024 SpiritLink. All rights reserved.</Text>
        </HStack>
      </Container>
    </Flex>
  );
}
