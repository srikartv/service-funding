import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'; // Add ChakraProvider import
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Add BrowserRouter, Routes, Route import
import Header from './components/Header'; // Import Header component
import Home from './components/Home'; // Import Home component
import CreateCampaign from './components/CreateCampaign'; // Import CreateCampaign component
import DonationForm from './components/DonationForm'; // Import DonationForm component
import Withdraw from './components/Withdraw'; // Import Withdraw component
import { WalletProvider } from './context/WalletContext'; // Import WalletProvider
import { CampaignProvider } from './context/CampaignContext'; // Import CampaignProvider

function App() {
  return (
    <ChakraProvider>
      <WalletProvider> {/* Wrap the app in WalletProvider */}
        <CampaignProvider> {/* Wrap the app in CampaignProvider */}
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/donation" element={<DonationForm campaignTitle="Covid Relief Fund" />} />
              <Route path="/withdraw/:campaignId" element={<Withdraw />} /> {/* Add dynamic Withdraw route */}
              <Route path="/create" element={<CreateCampaign />} />
            </Routes>
          </BrowserRouter>
        </CampaignProvider>
      </WalletProvider>
    </ChakraProvider>
  );
}

export default App;
