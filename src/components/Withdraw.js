import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add useNavigate to redirect after withdrawing
import { Box, Button, Text, Heading } from '@chakra-ui/react';
import { CampaignContext } from '../context/CampaignContext';
import { useWallet } from '../context/WalletContext'; // To access wallet details

function Withdraw() {
  const { campaignId } = useParams(); // Get campaignId from the route parameters
  const { campaigns, removeCampaign } = useContext(CampaignContext);
  const { walletAddress } = useWallet(); // Assuming you have a wallet context with walletAddress
  const navigate = useNavigate(); // To navigate back to the home page after withdrawing

  // Find the campaign based on the campaignId and the connected wallet
  const campaign = campaigns.find((c) => c.id === Number(campaignId) && c.walletAddress === walletAddress);

  const handleWithdraw = () => {
    if (!campaign) return;

    // Remove the campaign using removeCampaign from context
    removeCampaign(campaignId);

    // Navigate back to the home page
    navigate('/');
  };

  return (
    <Box p={6}>
      {campaign ? (
        <>
          <Heading as="h2" size="lg" mb={4}>Withdraw Campaign</Heading>
          <Text><strong>Campaign Name:</strong> {campaign.campaignName}</Text>
          <Text><strong>Description:</strong> {campaign.description}</Text>
          <Text><strong>Raised Funds:</strong> {campaign.raisedFunds || '0'} ETH</Text>
          <Button mt={4} colorScheme="green" onClick={handleWithdraw}>
            Withdraw Campaign
          </Button>
        </>
      ) : (
        <Text>No campaign found or you are not the owner of this campaign.</Text>
      )}
    </Box>
  );
}

export default Withdraw;
