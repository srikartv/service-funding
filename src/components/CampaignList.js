import { SimpleGrid, Box, Text, Heading, Image, Button, Home } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DonationForm from './DonationForm';
import React from 'react';

const campaigns = [
  {
    title: "Covid Relief Fund",
    amountRaised: "3.12 ETH",
    target: "11999 ETH",
    imageUrl: "E:/minor/service-funding/src/images/covid.jpeg",
  },
  {
    title: "Oxygen Crisis in India",
    amountRaised: "1.1 ETH",
    target: "20 ETH",
    imageUrl: "images/oxygen.jpeg",
  },
  // Add more campaigns here
];

function CampaignList() {
  const navigate = useNavigate();

  const handleDonateClick = (campaign) => {
    navigate('/donate', { state: { campaign } }); // Pass campaign details
  };
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      {campaigns.map((campaign, idx) => (
        <Box key={idx} borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white">
          <Image src={campaign.imageUrl} alt={campaign.title} />
          <Box p={4}>
            <Heading as="h4" size="md" mb={2}>{campaign.title}</Heading>
            <Text fontSize="sm">Raised: {campaign.amountRaised}</Text>
            <Text fontSize="sm">Target: {campaign.target}</Text>
            <Button mt={3} size="sm" colorScheme="green" onClick={() => handleDonateClick(campaign)}>
              Donate
            </Button>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default CampaignList;
