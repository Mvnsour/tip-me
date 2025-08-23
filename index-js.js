import { createWalletClient, custom } from 'https://esm.sh/viem'

const connectButton = document.getElementById("connect-button");

let walletClient;

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    console.log("Connect button clicked");
    walletClient =createWalletClient({
      transport: custom(window.ethereum)
    });
    await walletClient.requestAddresses();
    connectButton.innerHTML = 'Connected';
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

connectButton.onclick = connectWallet;