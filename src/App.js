import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CreateCampaign from './components/CreateCampaign';
import DonationForm from './components/DonationForm';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/donate" element={<DonationForm />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;