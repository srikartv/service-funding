import React, { useContext } from 'react';
import { Box, SimpleGrid, Text, Heading, Image, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CampaignContext } from '../context/CampaignContext';
import { useWallet } from '../context/WalletContext'; // Import WalletContext to check login status

function CampaignList() {
  const { campaigns } = useContext(CampaignContext); // Fetch campaigns from CampaignContext
  const { isConnected } = useWallet(); // Check if the user is logged in (wallet is connected)
  const navigate = useNavigate(); // For navigation to DonationForm

  // Display dynamic campaigns if the wallet is connected
  const displayedCampaigns = isConnected ? campaigns : [];

  const handleDonate = (campaign) => {
    navigate('/donation', { state: { campaign } });
  };

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
      {displayedCampaigns.length > 0 ? (
        displayedCampaigns.map((campaign) => (
          <Box
            key={campaign.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg="white"
            boxShadow="lg"
          >
            {/* Campaign Image */}
            <Image
              src={campaign.imageUrl}
              alt={campaign.campaignName}
              borderRadius="md"
              mb={4}
              objectFit="cover"
              height="200px"
              width="100%"
            />
            {/* Campaign Heading */}
            <Heading as="h3" size="md" mb={4} color="#845ec2">
              {campaign.campaignName}
            </Heading>
            {/* Campaign Description */}
            <Text color="gray.700">
              {campaign.description}
            </Text>
            {/* Donate Button */}
            <Button mt={4} colorScheme="purple" onClick={() => handleDonate(campaign)}>
              Donate
            </Button>
          </Box>
        ))
      ) : (
        <Text fontSize="lg" color="gray.600">
          No campaigns available. Be the first to create one!
        </Text>
      )}
    </SimpleGrid>
  );
}

export default CampaignList;
