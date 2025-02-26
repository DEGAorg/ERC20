// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        "option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log("Deploying the contracts with the account:", deployerAddress);

  console.log(
    "Account balance:",
    ethers.formatEther(await ethers.provider.getBalance(deployerAddress))
  );

  // Define the token configuration
  const tokenName = "DegaToken";
  
  const multiSigAddress = "0x";
  const tokenInitialSupply = ethers.parseEther("37500000000");

  // Deploy the token contract
  const Token = await ethers.getContractFactory(tokenName);
  const token = await Token.deploy(tokenInitialSupply, multiSigAddress);
  await token.waitForDeployment();

  console.log(`${tokenName} address:`, await token.getAddress());

  // Verify the contract
  console.log("\b\n Verifying Contract");

  await hre.run("verify:verify", {
    address: await token.getAddress(),
    constructorArguments: [tokenInitialSupply, multiSigAddress],
  });

  console.log("\b\n Contract Verified");

  // Save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ [token.contractName]: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync(token.contractName);

  fs.writeFileSync(
    path.join(contractsDir, `${token.contractName}.json`),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
    console.error(error);
    process.exit(1);
  });