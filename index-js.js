// Import necessary functions from viem via CDN
import { createWalletClient, custom, createPublicClient } from 'https://esm.sh/viem'

const connectButton = document.getElementById("connect-btn");
const balanceButton = document.getElementById("balance-btn");
const fundButton = document.getElementById("fund-btn");
const ethAmountInput = document.getElementById("eth-amount");


let walletClient;
let publicClient;

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

async function fund() {
  const ethAmount = ethAmountInput.value;
  console.log(`Funding with ${ethAmount} ETH`);

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum)
    });
    await walletClient.requestAddresses();

    // Create Public Client after Wallet Client is ready
    publicClient = createPublicClient({
      transport: custom(window.ethereum)
    });
    await publicClient.simulateContract()
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

connectButton.onclick = connectWallet;
fundButton.onclick = fund;