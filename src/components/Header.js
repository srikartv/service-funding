import { 
  Box, Flex, Heading, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter, Input, useDisclosure 
} from '@chakra-ui/react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useWallet } from '../context/WalletContext';
import { CampaignContext } from '../context/CampaignContext';

function Header() {
  const navigate = useNavigate();
  const { isConnected, walletDetails, isLoading, connectWallet, disconnectWallet } = useWallet();
  const { campaigns } = useContext(CampaignContext); // Access campaigns from CampaignContext
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isConnectOpen, onOpen: onConnectOpen, onClose: onConnectClose } = useDisclosure();
  const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen, onClose: onWithdrawClose } = useDisclosure();

  const [mnemonic, setMnemonic] = useState('');
  const [password, setPassword] = useState('');

  // Filter campaigns created by the connected wallet
  const userCampaigns = campaigns.filter(campaign => campaign.walletID === walletDetails.walletID);

  const handleCreateCampaignClick = () => {
    if (!isConnected) {
      alert('Please connect your wallet before creating a campaign.');
      return;
    }
    navigate('/create-campaign');
  };

  const handleConnectWallet = () => {
    if (!mnemonic || !password) {
      alert('Please enter your 12-word phrase and password.');
      return;
    }
    connectWallet(mnemonic, password);
    onConnectClose();
  };

  const handleLogout = () => {
    disconnectWallet();
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
          <Button bg="#00c9a7" color="white" mr={4} _hover={{ bg: "#00b293" }} onClick={handleCreateCampaignClick}>
            Create a Campaign
          </Button>

          {!isConnected && (
            <Button
              bg="#00c9a7"
              color="white"
              onClick={onConnectOpen}
              isDisabled={isLoading}
              _hover={{ bg: "#00b293" }}
            >
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}

          {isConnected && (
            <>
              <Button
                bg="#00c9a7"
                color="white"
                onClick={onOpen}
                _hover={{ bg: "#00b293" }}
                mr={4}
              >
                Profile
              </Button>

              {/* Display Withdraw button only if the user has created campaigns */}
              {userCampaigns.length > 0 && (
                <Button
                  bg="green.500"
                  color="white"
                  onClick={onWithdrawOpen}
                  _hover={{ bg: "green.400" }}
                  mr={4}
                >
                  Withdraw
                </Button>
              )}

              <Button
                bg="red.500"
                color="white"
                onClick={handleLogout}
                _hover={{ bg: "red.400" }}
              >
                Disconnect Wallet
              </Button>
            </>
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
                <Text><strong>Available Balance:</strong> {walletDetails.amount}</Text>
                <Text><strong>Account ID:</strong> {walletDetails.accountId}</Text>
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

      {/* Modal for wallet connection */}
      <Modal isOpen={isConnectOpen} onClose={onConnectClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter 12-word mnemonic phrase"
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
              mb={4}
            />
            <Input
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleConnectWallet} isDisabled={isLoading}>
              Connect Wallet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for withdrawing funds */}
      <Modal isOpen={isWithdrawOpen} onClose={onWithdrawClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Campaign to Withdraw</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {userCampaigns.length > 0 ? (
              userCampaigns.map((campaign) => (
                <Box key={campaign.id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                  <Text fontWeight="bold">Campaign Name: {campaign.campaignName}</Text>
                  <Text>Description: {campaign.description}</Text>
                  <Text>Raised Funds: {campaign.raisedFunds || '0'} ETH</Text>
                  <Button
                    mt={3}
                    colorScheme="green"
                    onClick={() => navigate(`/withdraw/${campaign.id}`)}
                  >
                    Withdraw from this campaign
                  </Button>
                </Box>
              ))
            ) : (
              <Text>No campaigns available for withdrawal.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onWithdrawClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Header;
