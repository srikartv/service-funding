import React, { useState } from 'react';
import { Box, Heading, Text, Input, Button, FormLabel, Flex, Grid } from '@chakra-ui/react';

function DonationForm({ campaignTitle, walletBalance }) { // Pass campaign title and wallet balance as props

  const [donationAmount, setDonationAmount] = useState('');
  const [walletId, setWalletId] = useState('');
  const [numRequests, setNumRequests] = useState(1); // Default to 1 request
  const [numApprovers, setNumApprovers] = useState(1); // Default to 1 approver
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donationConfirmed, setDonationConfirmed] = useState(false);

  const handleDonationSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    // Simulate API call to process donation (replace with your actual logic)
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

    setDonationConfirmed(true);
    setIsSubmitting(false);
    setDonationAmount(''); // Clear donation amount after submission
  };

  return (
    <Box as="form" onSubmit={handleDonationSubmit}>
      <Flex direction="row" wrap="wrap">
        {/* Left side: Wallet Balance */}
        <Box w="50%" p={4} borderRight="1px solid" borderColor="gray.200">
          <Heading as="h4" size="md">
            Wallet Balance:
          </Heading>
          <Text fontSize="lg" fontWeight="bold">
            {walletBalance} ETH
          </Text>
        </Box>

        {/* Right side: Donation Form */}
        <Box w="50%" p={4}>
          <Heading as="h2" size="md" mb={4} color="black">
            Donate to {campaignTitle}
          </Heading>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormLabel htmlFor="donationAmount">Minimum Contribution (ETH)</FormLabel>
            <Input
              id="donationAmount"
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Enter minimum contribution"
              mb={4}
              required
            />

            <FormLabel htmlFor="walletId">Wallet ID</FormLabel>
            <Input
              id="walletId"
              type="text"
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
              placeholder="Enter your wallet ID"
              mb={4}
              required
            />

            <FormLabel htmlFor="numRequests">Number of Requests</FormLabel>
            <Input
              id="numRequests"
              type="number"
              value={numRequests}
              onChange={(e) => setNumRequests(e.target.value)}
              placeholder="Enter number of requests"
              mb={4}
              min={1} // Set minimum value to 1
            />

            <FormLabel htmlFor="numApprovers">Number of Approvers</FormLabel>
            <Input
              id="numApprovers"
              type="number"
              value={numApprovers}
              onChange={(e) => setNumApprovers(e.target.value)}
              placeholder="Enter number of approvers"
              mb={4}
              min={1} // Set minimum value to 1
            />
          </Grid>

          <Button type="submit" isLoading={isSubmitting} colorScheme="green" float="right">
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
  );
}

export default DonationForm;