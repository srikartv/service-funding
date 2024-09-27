import { useState } from 'react';
import { Box, Flex, Heading, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { ThreeDots } from 'react-loader-spinner';
import CreateCampaign from './CreateCampaign';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConnectWalletClick = () => {
    setIsLoading(true);

    // Simulate wallet connection process with 5-second delay
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);

      // Mock wallet details (this would typically come from the wallet connection API)
      setWalletDetails({
        name: "John Doe",
        walletType: "Metamask",
        amount: "2.45 ETH"
      });
    }, 5000);
  };
  const handleCreateCampaignClick = async () => {
    // Check if connected
    if (!isConnected) {
      alert('Please connect your wallet before creating a campaign.');
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate('/create-campaign');
  };
  const handleLogout = () => {
    setIsConnected(false);
    setWalletDetails(null);
    onClose(); // Close modal if open
  };
  return (
    <Box bg="white" py={4}>
      <Flex justify="space-between" align="center" px={6}>
        {/* Heading aligned to the left */}
        <Heading as="h1" size="lg" color="#845ec2">
          Service Funding Platform
        </Heading>

        {/* Right-aligned buttons */}
        <Box>
        !isCampaignCreationStarted && (
      <Button bg="#00c9a7" color="white" mr={4} _hover={{ bg: "#00b293" }} onClick={handleCreateCampaignClick}>
        Create a Campaign
      </Button>

          {!isConnected && (
            <Button
              bg="#00c9a7"
              color="white"
              onClick={handleConnectWalletClick}
              isDisabled={isLoading}
              _hover={{ bg: "#00b293" }}
            >
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}

          {isConnected && (
            <Button
              bg="#00c9a7"
              color="white"
              onClick={onOpen}
              _hover={{ bg: "#00b293" }}
            >
              Profile
            </Button>
          )}
        </Box>
      </Flex>

      {/* Wallet Connection Loading Animation */}
      {isLoading && (
        <Flex justify="center" mt={4}>
          <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#00c9a7" 
            ariaLabel="three-dots-loading" 
            visible={true}
          />
        </Flex>
      )}

      {/* Modal to show wallet details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wallet Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {walletDetails ? (
              <>
                <Text><strong>Name:</strong> {walletDetails.name}</Text>
                <Text><strong>Wallet Type:</strong> {walletDetails.walletType}</Text>
                <Text><strong>Amount:</strong> {walletDetails.amount}</Text>
              </>
            ) : (
              <Text>No wallet connected.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Header;
