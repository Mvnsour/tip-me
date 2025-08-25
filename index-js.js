// Import necessary functions from viem via CDN
import { createWalletClient, custom, createPublicClient, parseEther, defineChain } from 'https://esm.sh/viem'
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
    const [connectedAddress] = await walletClient.requestAddresses(); // Between brackets bc it returns a list
    const currentChain = await getCurrentChain(walletClient);

    // Create Public Client after Wallet Client is ready
    publicClient = createPublicClient({
      transport: custom(window.ethereum)
    });
    
    try {
      // We need to define contractAddress and contractAbi first
      // We also need to parse ethAmount into Wei (e.g., using viem's parseEther)
      const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: tipAbi,
        functionName: 'fund',
        chain: currentChain, // Optional
        account: connectedAddress,
        value: parseEther(ethAmount), // Convert ETH to Wei
        // args: [], // Include if your function takes arguments
      });
      console.log("Funding with:", parseEther(ethAmount), "Wei");
      // If simulation succeeds, request contains the prepared transaction details
      // We can then pass this to walletClient.writeContract() to send the actual transaction
      const hash = await walletClient.writeContract(request);
      console.log("Transaction hash:", hash);

    } catch (error) {
        console.error("Simulation failed:", error);
      }
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function getCurrentChain(client) {
  const chainId = await client.getChainId()
  const currentChain = defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["http://localhost:5500"],
      },
    },
  })
  return currentChain
}

connectButton.onclick = connectWallet;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;