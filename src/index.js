import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WalletProvider } from './context/WalletContext';
import { CampaignProvider } from './context/CampaignContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WalletProvider>
      <CampaignProvider>
        <App />
      </CampaignProvider>
    </WalletProvider>
  </React.StrictMode>
);
