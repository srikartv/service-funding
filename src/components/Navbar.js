// src/components/Navbar.js
import React from 'react';
import { Box, Flex, Button, Heading, Spacer } from '@chakra-ui/react';
import ConnectWalletComponent from './ConnectWalletComponent';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const { isConnected, disconnectWallet, walletDetails } = useWallet();

  return (
    <Flex as="nav" p={4} bg="green.600" color="white" align="center">
      <Heading size="lg">ServiceFunding</Heading>
      <Spacer />
      <Box>
        {isConnected ? (
          <>
            <Button colorScheme="teal" mr={4}>
              {walletDetails.name} ({walletDetails.walletID.slice(0, 6)}...)
            </Button>
            <Button colorScheme="red" onClick={disconnectWallet}>
              Disconnect
            </Button>
          </>
        ) : (
          <ConnectWalletComponent />
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
