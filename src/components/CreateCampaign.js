import { Box, Button, Input, FormLabel, Textarea, Heading, Flex } from '@chakra-ui/react';
import { useState } from 'react';

function CreateCampaign() {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const handleSubmit = () => {
    // Here you would typically handle form submission to the backend or smart contract
    console.log({
      minimumContribution,
      campaignName,
      description,
      imageUrl,
      targetAmount,
    });
  };

  return (
    <Box maxW="md" mx="auto" p={6} bg="white" boxShadow="lg" mt={6}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Create a New Campaign
      </Heading>

      {/* Change color to black here */}
      <FormLabel color="black">Minimum Contribution Amount (ETH)</FormLabel>
      <Input
        value={minimumContribution}
        onChange={(e) => setMinimumContribution(e.target.value)}
        placeholder="Minimum Contribution Amount"
        mb={4}
        // Added green color using borderColor
        borderColor="green.500" // Adjust the shade as needed
      />

      <FormLabel color="black">Campaign Name</FormLabel>
      <Input
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
        placeholder="Campaign Name"
        mb={4}
        // Added green color using borderColor
        borderColor="green.500" // Adjust the shade as needed
      />

      <FormLabel color="black">Campaign Description</FormLabel>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Campaign Description"
        mb={4}
        // Added green color using borderColor
        borderColor="green.500" // Adjust the shade as needed
      />

      <FormLabel color="black">Image URL</FormLabel>
      <Input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        mb={4}
        // Added green color using borderColor
        borderColor="green.500" // Adjust the shade as needed
      />

      <FormLabel color="black">Target Amount (ETH)</FormLabel>
      <Input
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        placeholder="Target Amount"
        mb={4}
        // Added green color using borderColor
        borderColor="green.500" // Adjust the shade as needed
      />

      <Flex justifyContent="center">
        <Button colorScheme="teal" onClick={handleSubmit} width="full">
          Submit Campaign
        </Button>
      </Flex>
    </Box>
  );
}

export default CreateCampaign;