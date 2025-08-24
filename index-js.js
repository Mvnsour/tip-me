// Import necessary functions from viem via CDN
import { createWalletClient, custom } from 'https://esm.sh/viem'

const connectButton = document.getElementById("connect-btn");

let walletClient;

async function connectWallet() {
  // Check if window.ethereum is present
  if (typeof window.ethereum !== "undefined") {
    console.log("Connect button clicked");
    walletClient = createWalletClient({
      transport: custom(window.ethereum)
    });
    await walletClient.requestAddresses();
    connectButton.innerHTML = 'Connected';

    try {
      // Wait for the user to connect their wallet
      const addresses = await walletClient.requestAddresses();
      console.log("Connected accounts:", addresses); // Log the connected address(es)

      // This code now runs ONLY AFTER the await completes successfully
      connectButton.innerHTML = `Connected: ${addresses[0].slice(0, 6)}...`; // Show part of address
      console.log("Connection successful!");

    } catch (error) {
      // Handle errors, like the user rejecting the connection
      console.error("Connection failed:", error);
      connectButton.innerHTML = "Connect"; // Reset button text on failure
    }
    
  } else {
    // Wallet is not installed
    connectButton.innerHTML = "Please install MetaMask";
  }
}

connectButton.onclick = connectWallet;