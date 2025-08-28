var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import necessary functions from viem via CDN
import { createWalletClient, custom, createPublicClient, parseEther, defineChain, formatEther } from 'viem';
import "viem/window";
import { contractAddress, tipAbi } from './constant';
// Define button elements with proper typing
const connectButton = document.getElementById("connect-btn");
const fundButton = document.getElementById("fund-btn");
const ethAmountInput = document.getElementById("eth-amount");
const balanceButton = document.getElementById("balance-btn");
const withdrawButton = document.getElementById("withdraw-btn");
// Declare variables with proper types
let walletClient;
let publicClient;
function connectWallet() {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if window.ethereum is present
        if (typeof window.ethereum !== "undefined") {
            walletClient = createWalletClient({
                transport: custom(window.ethereum)
            });
            yield walletClient.requestAddresses();
            connectButton.innerHTML = 'Connected';
            try {
                // Wait for the user to connect their wallet
                const addresses = yield walletClient.requestAddresses();
                console.log("Connected accounts:", addresses); // Log the connected address(es)
                // This code now runs ONLY AFTER the await completes successfully
                connectButton.innerHTML = `Connected: ${addresses[0].slice(0, 6)}...`; // Show part of address
                console.log("Connection successful!");
            }
            catch (error) {
                // Handle errors, like the user rejecting the connection
                console.error("Connection failed:", error);
                connectButton.innerHTML = "Connect"; // Reset button text on failure
            }
        }
        else {
            // Wallet is not installed
            connectButton.innerHTML = "Please install MetaMask";
        }
    });
}
function fund() {
    return __awaiter(this, void 0, void 0, function* () {
        const ethAmount = ethAmountInput.value;
        console.log(`Funding with ${ethAmount} ETH`);
        if (typeof window.ethereum !== "undefined") {
            walletClient = createWalletClient({
                transport: custom(window.ethereum)
            });
            const [connectedAddress] = yield walletClient.requestAddresses(); // Between brackets bc it returns a list
            const currentChain = yield getCurrentChain(walletClient);
            // Create Public Client after Wallet Client is ready
            publicClient = createPublicClient({
                transport: custom(window.ethereum)
            });
            try {
                // We need to define contractAddress and contractAbi first
                // We also need to parse ethAmount into Wei (e.g., using viem's parseEther)
                const { request } = yield publicClient.simulateContract({
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
                const hash = yield walletClient.writeContract(request);
                console.log("Transaction hash:", hash);
            }
            catch (error) {
                console.error("Simulation failed:", error);
            }
        }
        else {
            connectButton.innerHTML = "Please install MetaMask";
        }
    });
}
function getCurrentChain(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const chainId = yield client.getChainId();
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
        });
        return currentChain;
    });
}
function getBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof window.ethereum !== "undefined") {
            publicClient = createPublicClient({
                transport: custom(window.ethereum)
            });
            const balance = yield publicClient.getBalance({
                address: contractAddress,
            });
            console.log(formatEther(balance)); // Convert Wei to ETH for display
        }
    });
}
function withdraw() {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof window.ethereum !== "undefined") {
            walletClient = createWalletClient({
                transport: custom(window.ethereum)
            });
            const [connectedAddress] = yield walletClient.requestAddresses();
            const currentChain = yield getCurrentChain(walletClient);
            publicClient = createPublicClient({
                transport: custom(window.ethereum)
            });
            try {
                // Simulate the withdraw call (no value sent)
                const { request } = yield publicClient.simulateContract({
                    address: contractAddress,
                    abi: tipAbi,
                    functionName: 'withdraw',
                    chain: currentChain,
                    account: connectedAddress,
                    // no `value` field here
                });
                console.log("Simulating withdraw...");
                const hash = yield walletClient.writeContract(request);
                console.log("Withdraw tx hash:", hash);
            }
            catch (error) {
                console.error("Withdraw failed:", error);
            }
        }
        else {
            connectButton.innerHTML = "Please install MetaMask";
        }
    });
}
// Add event listeners with proper typing
connectButton.onclick = connectWallet;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;
