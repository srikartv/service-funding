import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import CampaignList from './CampaignList';
import { useContext } from 'react';
import { CampaignContext } from '../context/CampaignContext';

function Home() {
  const { campaigns } = useContext(CampaignContext); // Fetch campaigns from context

  return (
    <Box bg="#f7f7f7" py={12} px={6}>
      {/* Main Content Area */}
      <VStack spacing={8} textAlign="center">
        {/* Heading */}
        <Heading as="h2" size="2xl" color="#845ec2">
          What is Service Funding?
        </Heading>

        {/* About Description */}
        <Text fontSize="lg" color="gray.600" maxW="3xl">
          Service Funding is a decentralized platform built on blockchain technology that enables secure and transparent public funding.
          Our platform allows users to create, fund, and support projects without relying on traditional intermediaries.
          By leveraging smart contracts, we ensure that all transactions are automated, traceable, and immutable.
        </Text>

        {/* Benefits Section */}
        <Text fontSize="md" color="gray.600" maxW="3xl">
          Whether you're a creator looking to bring your project to life or a supporter wanting to contribute to a meaningful cause,
          Service Funding provides the trust, security, and transparency you need in public funding.
        </Text>

        {/* Campaign List */}
        {campaigns.length > 0 ? (
          <CampaignList campaigns={campaigns} />
        ) : (
          <Text fontSize="lg" color="gray.600">
            No campaigns available. Be the first to create one!
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default Home;