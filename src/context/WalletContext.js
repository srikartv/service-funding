import { createContext, useState, useContext } from 'react';

// Create the context
export const WalletContext = createContext();

// Create a custom hook to use the WalletContext easily
export const useWallet = () => useContext(WalletContext);

// Predefined mnemonic and password
const validMnemonic = "around anchor cover marine coast ecology army torch accuse habit misery man";
const validPassword = "qwerty@123";

// Provider component that wraps the app and makes wallet state available globally
export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [walletDetails, setWalletDetails] = useState({
    name: '',
    walletType: '',
    amount: '0.00', // Initial amount
    accountId: '',
  });

  // Function to connect the wallet using mnemonic and password
  const connectWallet = (mnemonic, password) => {
    setIsLoading(true);

    // Simulate a wallet connection delay (e.g., fetching wallet details)
    setTimeout(() => {
      // Validate the provided mnemonic and password
      if (mnemonic === validMnemonic && password === validPassword) {
        // Mock wallet details
        setWalletDetails({
          name: 'User Wallet',
          walletType: 'Software', // Mock wallet type
          amount: '5.34', // Initial mock balance
          accountId: '0x1234567asdfgh1234567asdfgh', // Mock account ID
        });
        setIsConnected(true);
        alert('Wallet connected successfully!');
      } else {
        alert('Invalid mnemonic or password. Please try again.');
      }

      setIsLoading(false); // End loading state after connection
    }, 2000);
  };

  // Function to disconnect the wallet
  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletDetails({
      name: '',
      walletType: '',
      amount: '0.00', // Reset amount
      accountId: '',
    });
  };

  // Function to update wallet balance after withdrawal
  const updateWalletBalance = (newBalance) => {
    setWalletDetails((prev) => ({
      ...prev,
      amount: newBalance.toFixed(2), // Update balance with two decimal places
    }));
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletDetails,
        isLoading,
        connectWallet,
        disconnectWallet,
        updateWalletBalance, // Expose function to update balance
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
