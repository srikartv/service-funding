import React, { createContext, useState } from 'react';

// Create the CampaignContext
export const CampaignContext = createContext();

// CampaignProvider component that will wrap the app or parts of the app that need access to the campaign data
export const CampaignProvider = ({ children }) => {
  // State to store the list of campaigns
  const [campaigns, setCampaigns] = useState([]);

  // Function to add a new campaign
  const addCampaign = (newCampaign) => {
    setCampaigns(prevCampaigns => [...prevCampaigns, newCampaign]);
  };

  // Function to remove a campaign by ID
  const removeCampaign = (campaignId) => {
    setCampaigns(prevCampaigns => prevCampaigns.filter(campaign => campaign.id !== Number(campaignId)));
  };

  return (
    // Provide the campaigns, addCampaign, and removeCampaign functions to the components that consume this context
    <CampaignContext.Provider value={{ campaigns, addCampaign, removeCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};
