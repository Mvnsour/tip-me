// Import necessary functions from viem via CDN
import { createWalletClient, custom, createPublicClient } from 'https://esm.sh/viem'
import { contractAddress, tipAbi } from './constant-js.js';

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
  const ethAmount = Number(ethAmountInput.value);
  console.log(`Funding with ${ethAmount} ETH`);

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum)
    });
    const [connectedAddress] = await walletClient.requestAddresses(); // Between brackets bc it returns a list

    // Create Public Client after Wallet Client is ready
    publicClient = createPublicClient({
      transport: custom(window.ethereum)
    });
    
    try {
      // We need to define contractAddress and contractAbi first
      // We also need to parse ethAmount into Wei (e.g., using viem's parseEther)
      const simulationResult = await publicClient.simulateContract({
        address: contractAddress,
        abi: tipAbi,
        functionName: 'fund',
        account: connectedAddress, // Use the address obtained from requestAddresses
        value: undefined,  // TODO: Add parsed ETH amount in Wei
      });
      console.log("Simulation successful:", simulationResult);
      // If simulation succeeds, simulationResult.request contains the prepared transaction details
      // We can then pass this to walletClient.writeContract() to send the actual transaction
      
    } catch (error) {
        console.error("Simulation failed:", error);
        // Handle simulation errors appropriately (e.g., display message to user)
    }
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

connectButton.onclick = connectWallet;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;