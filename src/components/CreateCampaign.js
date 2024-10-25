import { Box, Button, Input, FormLabel, Textarea, Heading, Flex, Text } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { CampaignContext } from '../context/CampaignContext';

function CreateCampaign() {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null); // Change to handle image file
  const [targetAmount, setTargetAmount] = useState("");

  const { isConnected, walletAddress } = useWallet(); // Fetch wallet address
  const { addCampaign } = useContext(CampaignContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!isConnected) {
      alert("Please connect your wallet before creating a campaign.");
      return;
    }

    if (!imageFile) {
      alert("Please upload an image for your campaign.");
      return;
    }

    const newCampaign = {
      id: Date.now(),
      minimumContribution,
      campaignName,
      description,
      imageUrl: URL.createObjectURL(imageFile), // Use URL.createObjectURL to create a preview URL
      targetAmount,
      walletAddress, // Add the wallet address of the user creating the campaign
    };

    addCampaign(newCampaign);
    navigate('/');
  };

  return (
    <Box maxW="md" mx="auto" p={6} bg="white" boxShadow="lg" mt={6}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Create a New Campaign
      </Heading>

      {!isConnected && (
        <Text color="red.500" mb={4}>
          You must connect your wallet before creating a campaign.
        </Text>
      )}

      <FormLabel color="black">Minimum Contribution Amount (ETH)</FormLabel>
      <Input
        value={minimumContribution}
        onChange={(e) => setMinimumContribution(e.target.value)}
        placeholder="Minimum Contribution Amount"
        mb={4}
        borderColor="green.500"
        color="black"
      />

      <FormLabel color="black">Campaign Name</FormLabel>
      <Input
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
        placeholder="Campaign Name"
        mb={4}
        borderColor="green.500"
        color="black"
      />

      <FormLabel color="black">Campaign Description</FormLabel>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Campaign Description"
        mb={4}
        borderColor="green.500"
        color="black"
      />

      <FormLabel color="black">Upload Image</FormLabel>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        mb={4}
        borderColor="green.500"
        color="black"
      />

      <FormLabel color="black">Target Amount (ETH)</FormLabel>
      <Input
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        placeholder="Target Amount"
        mb={4}
        borderColor="green.500"
        color="black"
      />

      <Flex justifyContent="center">
        <Button colorScheme="teal" onClick={handleSubmit} isDisabled={!isConnected}>
          Create Campaign
        </Button>
      </Flex>
    </Box>
  );
}

export default CreateCampaign;
