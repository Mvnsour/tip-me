# EN  
## Tip Me dApp  

A minimal decentralized application for sending tips ("buying a coffee") via Ethereum smart contracts. Built with plain HTML/JavaScript, later migrated to TypeScript for stronger typing and maintainability.  



#### Overview  
The application demonstrates a lightweight Web3 workflow:  
- Connect a wallet (MetaMask).  
- Send ETH to the smart contract (`fund`).  
- Query the contract balance.  
- Withdraw accumulated funds (`withdraw`, owner-only).  

Includes a **JavaScript baseline** (`index-js.js`) and a **TypeScript migration** (`index-ts.ts`) to illustrate modern best practices.  



#### Tech Stack  
- **Frontend**: HTML, JavaScript → TypeScript  
- **Blockchain**: Solidity, [Viem](https://viem.sh/), Anvil (Foundry)  
- **Wallet**: MetaMask  
- **Tools**: VS Code, Live Server  

---

#### Project Structure  
