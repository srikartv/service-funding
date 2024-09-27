import { Box, Text, Link, Flex } from '@chakra-ui/react';

function Footer() {
  return (
    <Box bg="green.600" p={4} color="white" mt={10}>
      <Flex justifyContent="space-between">
        <Text>© 2024 Service Funding</Text>
        <Link href="https://github.com/your-repo" isExternal color="gold">
          Github Repo
        </Link>
      </Flex>
    </Box>
  );
}

export default Footer;
