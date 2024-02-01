import { Flex, Text, Box} from '@chakra-ui/react';
import React from 'react';

export default function Footer() {
  return (
    <Flex
      bg="blue.100"
      borderTop="px solid #4299E1"
      py={3}
      justifyContent="center"
      textAlign="center"
    >
      <Box
        height={{
          base: "25%",
          md: "50%",
          xl: "100%",
        }}
      >
        <Text color="black" fontSize={{
          base: "10px",
          md: "15px",
          lg: "17px"
          }}>
            &copy; 2024 SpiritLink. All rights reserved.
        </Text>
      </Box>
    </Flex>
  );
}
