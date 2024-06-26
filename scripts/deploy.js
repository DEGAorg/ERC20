// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log("Deploying the contracts with the account:", address);

  console.log(
    "Account balance:",
    ethers.formatEther(await ethers.provider.getBalance(address))
  );

  const Token = await ethers.getContractFactory("DegaToken");
  const token = await Token.deploy();
  await token.waitForDeployment();

  console.log("Token address:", await token.getAddress());

  console.log("\b\n Verifying Contract");

  await hre.run("verify:verify", {
    address: await token.getAddress(),
  });


  console.log("\b\n Contract Verified");

  // We also save the contract's artifacts and address in the frontend directory
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
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("DegaToken");

  fs.writeFileSync(
    path.join(contractsDir, "DegaToken.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
