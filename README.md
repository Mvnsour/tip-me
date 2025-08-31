# EN  
## Tip Me dApp

A minimal decentralized application for sending tips via Ethereum smart contracts. Built with plain HTML/JavaScript, later migrated to TypeScript for stronger typing and maintainability.  

### Overview  
The application demonstrates a lightweight Web3 workflow:  
- Connect a wallet (MetaMask).  
- Send ETH to the smart contract (`fund`).  
- Query the contract balance.  
- Withdraw accumulated funds (`withdraw`, owner-only).  

Includes a **JavaScript baseline** (`index.js`) and a **TypeScript migration** (`index.ts`) to illustrate modern best practices.  

### Tech Stack  
- **Frontend**: HTML, JavaScript → TypeScript  
- **Blockchain**: Solidity, [Viem](https://viem.sh/), Anvil (Foundry)  
- **Wallet**: MetaMask  
- **Tools**: VS Code, Live Server

### Workflow Demonstration
-  **Start the Server:** Launch a local web server (e.g., using the VS Code "Live Server" extension).
-  **Run Anvil:** Start a local Anvil blockchain instance in a terminal.
-  **Connect Wallet:** Open the application in your browser, configure MetaMask to connect to the Anvil network, and click "Connect".
-  **Fund the Contract:** Enter an amount and click "Buy Coffee" to send a transaction.
-  **Check Balance:** Click "Get Balance" to read the contract's updated balance.
-  **Withdraw Funds:** Click "Withdraw" to trigger a withdrawal transaction.

### Setup  

1.  **Prerequisites:** Ensure you have [Node.js](https://nodejs.org/) and [Foundry](https://getfoundry.sh/) installed. Install the [MetaMask](https://metamask.io/) browser extension.
2.  **Clone the repository:**
    ```bash
    git clone [repository URL]
    cd [repository name]
    ```
3.  **Start Anvil:**
    ```bash
    anvil
    ```
    (Note: Anvil provides test accounts and private keys you can import into MetaMask.)
4.  **Start the Server:** Use the VS Code "Live Server" extension or a similar command to serve `index.html`.

### Project Structure 
```raw 
  ├── index.html # UI
  ├── index.js # Initial implementation in JS
  ├── constant.js # ABI
  ├── index.ts # TypeScript migration
  └── constant.ts # TypeScript migration
  ```

# FR
## Tip Me dApp

Une application décentralisée minimale permettant d'envoyer des pourboires (« acheter un café ») via des contrats intelligents Ethereum. Construite avec du HTML/JavaScript simple, elle a ensuite été migrée vers TypeScript pour une typage et une maintenabilité plus solides.

### Présentation
Cette dApp illustre un flux Web3 minimal :
- Connexion d’un wallet (MetaMask).
- Envoi d’ETH au smart contract (`fund`).
- Lecture du solde du contrat.
- Retrait des fonds (`withdraw`, réservé au propriétaire).

Le projet inclut une implémentation initiale en JavaScript (`index.js`) et une migration vers TypeScript (`index.ts`) afin de se rapprocher des bonnes pratiques de développement modernes.

### Stack Technique 
- **Frontend**: HTML, JavaScript → TypeScript  
- **Blockchain**: Solidity, [Viem](https://viem.sh/), Anvil (Foundry)  
- **Wallet**: MetaMask  
- **Tools**: VS Code, Live Server

### Démonstration du flux de travail 🚀
-  **Lancer le serveur :** Démarrer un serveur local (par exemple, avec l'extension VS Code "Live Server").
-  **Lancer Anvil :** Exécuter une instance locale de la blockchain Anvil dans un terminal.
-  **Connecter le portefeuille :** Ouvrir l'application dans le navigateur, configurer MetaMask pour se connecter au réseau Anvil et cliquer sur "Connect".
-  **Financer le contrat :** Saisir un montant et cliquer sur "Buy Coffee" pour envoyer une transaction.
-  **Vérifier le solde :** Cliquer sur "Get Balance" pour lire le solde mis à jour du contrat.
-  **Retirer les fonds :** Cliquer sur "Withdraw" pour déclencher une transaction de retrait.

### Installation et Lancement 🚀
1.  **Prérequis :** Assurez-vous d'avoir [Node.js](https://nodejs.org/) et [Foundry](https://getfoundry.sh/) installés. Installez l'extension de navigateur [MetaMask](https://metamask.io/).
2.  **Cloner le dépôt :**
    ```bash
    git clone [https://www.linguee.com/french-english/translation/d%C3%A9p%C3%B4t.html](https://www.linguee.com/french-english/translation/d%C3%A9p%C3%B4t.html)
    cd [nom du dépôt]
    ```
3.  **Lancer Anvil :**
    ```bash
    anvil
    ```
    (Note : Anvil fournit des comptes de test et des clés privées que vous pouvez importer dans MetaMask.)
4.  **Lancer le serveur :** Utilisez l'extension "Live Server" de VS Code ou une commande similaire pour servir `index.html`.

### Structure du projet 
```raw
  ├── index.html # Interface utilisateur
  ├── index.js # Version initiale en JS
  ├── constant.js # ABI
  ├── index.ts # Migration en TypeScript
  └── constant.ts # TypeScript migration
  ```