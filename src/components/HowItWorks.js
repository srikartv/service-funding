import { Box, SimpleGrid, Text, Icon } from '@chakra-ui/react';
import { FaRegLightbulb, FaShareAlt, FaWallet } from 'react-icons/fa';

function HowItWorks() {
  return (
    <Box bg="green.50" p={8} borderRadius="lg" mt={8}>
      <Text fontSize="2xl" mb={4} textAlign="center">How Service Funding Works</Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        <Box textAlign="center">
          <Icon as={FaRegLightbulb} w={10} h={10} mb={2} color="green.400" />
          <Text>Create a Campaign for Fundraising</Text>
        </Box>
        <Box textAlign="center">
          <Icon as={FaShareAlt} w={10} h={10} mb={2} color="green.400" />
          <Text>Share Your Campaign</Text>
        </Box>
        <Box textAlign="center">
          <Icon as={FaWallet} w={10} h={10} mb={2} color="green.400" />
          <Text>Request and Withdraw Funds</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default HowItWorks;
