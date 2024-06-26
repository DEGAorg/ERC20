# DEGA ERC20

This project contains the implementation of an ERC20 token for the DEGA organization. The project uses Hardhat as its development environment and integrates several plugins for testing, deploying, and verifying contracts.

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm (usually comes with Node.js)
- Hardhat

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/DEGAorg/ERC20.git
   cd ERC20
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Environment Variables

Configuration variables are set via tasks in the `vars` scope and can be retrieved in the config using the `vars` object. This feature is useful for user-specific values or for data that shouldn't be included in the code repository.

1. Set the `PRIVATE_KEY` variable:

   ```sh
   npx hardhat vars set PRIVATE_KEY
   ✔ Enter value: ********************************
   ```

2. Set the `ETHERSCAN_API_KEY` variable:

   ```sh
   npx hardhat vars set ETHERSCAN_API_KEY
   ✔ Enter value: ********************************
   ```

### Basic Commands

#### Compile the Contracts

To compile the smart contracts, run:

```sh
npx hardhat compile
```

#### Run Tests

To run the tests, use the following command:

```sh
npx hardhat test
```

#### Deploy Contracts

You can deploy the contracts to a specific network by running:

```sh
npx hardhat run scripts/deploy.js --network <network_name>
```

Replace `<network_name>` with either `bnb_testnet` or `bnb_mainnet` depending on where you want to deploy.

#### Verify Contracts

After deploying your contracts, you can verify them on Etherscan using:

```sh
npx hardhat verify --network <network_name> <contract_address>
```

Replace `<network_name>` with the target network, `<contract_address>` with the address of your deployed contract.

### Additional Hardhat Commands

Hardhat provides a range of commands to help with development:

- **Clean the cache and artifacts**: 

  ```sh
  npx hardhat clean
  ```

- **Generate TypeScript typings for your contracts**: 

  ```sh
  npx hardhat typechain
  ```

- **Run the Hardhat node**: 

  ```sh
  npx hardhat node
  ```

For more information, refer to the [Hardhat documentation](https://hardhat.org/getting-started/).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.