import React, { useState } from 'react';
import { Box, Heading, Text, Input, Button, FormLabel, Flex, Grid, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';  // Import the custom hook to access WalletContext

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Flex as="nav" align="center" p={4} bg="black.100">
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Back to Home"
        onClick={() => navigate('/')}
        variant="ghost"
        mr={4}
      />
      <Text fontSize="xl" fontWeight="bold">
        Donation Portal
      </Text>
    </Flex>
  );
};

function DonationForm() {
  const { walletDetails, isConnected, updateWalletBalance } = useWallet();  // Get wallet details from context
  const location = useLocation();
  const navigate = useNavigate(); // Create navigate function
  const campaign = location.state?.campaign; // Access the campaign from the state passed

  const [donationAmount, setDonationAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donationConfirmed, setDonationConfirmed] = useState(false);
  const [warning, setWarning] = useState('');

  const handleDonationSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const amountInETH = parseFloat(donationAmount);
    const minimumContribution = parseFloat(campaign.minimumContribution);
    const walletBalance = parseFloat(walletDetails.amount);

    if (amountInETH < minimumContribution || amountInETH > walletBalance) {
      setWarning(`Donation amount must be at least ${minimumContribution} ETH and cannot exceed your wallet balance of ${walletBalance} ETH.`);
      setIsSubmitting(false);
      return;
    }

    // Simulate an API call to process donation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update wallet balance after donation
    const newBalance = walletBalance - amountInETH;
    updateWalletBalance(newBalance); // Use the update function

    setDonationConfirmed(true);
    setIsSubmitting(false);
    setDonationAmount(''); // Clear donation amount after submission
    setWarning(''); // Clear warning after successful submission
  };

  if (!isConnected || !walletDetails) {
    return <Text>Please connect your wallet to proceed with the donation.</Text>;
  }

  if (!campaign) {
    return <Text>No campaign selected. Please go back and select a campaign to donate to.</Text>;
  }

  return (
    <>
      <Navbar />
      <Box as="form" onSubmit={handleDonationSubmit}>
        <Flex direction="row" wrap="wrap">
          {/* Left side: Wallet Balance */}
          <Box w="50%" p={4} borderRight="1px solid" borderColor="gray.200">
            <Heading as="h4" size="md">
              Wallet Balance:
            </Heading>
            <Text fontSize="lg" fontWeight="bold">
              {walletDetails.amount} {/* Show the wallet balance */}
            </Text>
          </Box>

          {/* Right side: Donation Form */}
          <Box w="50%" p={4}>
            <Heading as="h2" size="md" mb={4} color="white">
              Donate to {campaign.campaignName}
            </Heading>

            <Text mb={4}>{campaign.description}</Text> {/* Display campaign description */}

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormLabel htmlFor="donationAmount">Donation Amount (ETH)</FormLabel>
              <Input
                id="donationAmount"
                type="number"
                value={donationAmount}
                onChange={(e) => {
                  setDonationAmount(e.target.value);
                  setWarning(''); // Clear warning on new input
                }}
                placeholder={`Enter donation amount`}
                mb={4}
                required
                min={campaign.minimumContribution} // Set minimum value based on campaign data
                step="0.01" // Allow for decimal inputs
              />

              <FormLabel htmlFor="walletId">Wallet ID</FormLabel>
              <Input
                id="walletId"
                type="text"
                value={walletDetails.accountId}  // Show wallet ID from context
                isReadOnly  // Make wallet ID read-only
                mb={4}
              />
            </Grid>

            {warning && (
              <Text mt={4} color="red.500">
                {warning}
              </Text>
            )}

            <Button type="submit" isLoading={isSubmitting} colorScheme="green" float="right" mr={2}>
              Donate Now
            </Button>

            {donationConfirmed && (
              <Text mt={4} color="green.500">
                Thank you for your donation!
              </Text>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default DonationForm;
