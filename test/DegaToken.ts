import { expect } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";

describe("DegaToken", function () {
  let DegaToken: any;
  let degaToken: any;
  let owner: any;
  let addr1: any;

  async function deployDegaTokenFixture() {
    DegaToken = await ethers.getContractFactory("DegaToken");
    [owner, addr1] = await ethers.getSigners();

    const degaToken = await ethers.deployContract("DegaToken", [ethers.parseEther("100000000"), owner.address]);

    return { degaToken, owner, addr1 };
  }

  it("Should deploy and assign the total supply of tokens to the owner", async function () {
    const { degaToken, owner } = await deployDegaTokenFixture();
    const ownerBalance = await degaToken.balanceOf(owner.address);
    const totalSupply = await degaToken.totalSupply();
    expect(ownerBalance).to.equal(totalSupply);
  });

  it("Should not allow minting more tokens", async function () {
    const { degaToken, owner } = await deployDegaTokenFixture();
    const mintFunction = async () => {
      try {
        await (degaToken as any).mint(owner.address, 1000);
        return false
      } catch (error: any) {
        if (error.message.includes("degaToken.mint is not a function")) {
          console.log(`Error: ${error.message}`);
          console.log(`Capture mint error and return value for test confirmation`);
          return true
        }
        return false
      }
    };
    const result = await mintFunction();
    expect(result).to.be.true;
  });

  it("Should allow burning of tokens", async function () {
    const { degaToken, owner } = await deployDegaTokenFixture();
    const initialBalance = await degaToken.balanceOf(owner.address);
    await degaToken.burn(ethers.parseEther("100"));
    const finalBalance = await degaToken.balanceOf(owner.address);
    expect(finalBalance).to.equal(initialBalance - ethers.parseEther("100"));
  });

  it("Should not allow burning more tokens than the user possesses", async function () {
    const { degaToken, owner } = await deployDegaTokenFixture();
    const initialBalance = await degaToken.balanceOf(owner.address);
    const burnAmount = initialBalance + ethers.parseEther("1"); // More than the balance
    await expect(degaToken.burn(burnAmount)).to.be.revertedWithCustomError(
      degaToken,
      `ERC20InsufficientBalance`
    );
  });

  it("Should have 18 decimals", async function () {
    const { degaToken } = await deployDegaTokenFixture();
    const decimals = await degaToken.decimals();
    expect(decimals).to.equal(18);
  });

  it("Should have correct ownership", async function () {
    const { degaToken, owner, addr1 } = await deployDegaTokenFixture();
    expect(await degaToken.owner()).to.equal(owner.address);
  });
  it("Should transfer ownership", async function () {
    const { degaToken, owner, addr1 } = await deployDegaTokenFixture();
    await degaToken.transferOwnership(addr1.address);
    expect(await degaToken.owner()).to.equal(addr1.address);
  });

  it("Should prevent non-owners from transferring ownership", async function () {
    const { degaToken, addr1 } = await deployDegaTokenFixture();
    await expect(degaToken.connect(addr1).transferOwnership(addr1.address)).to.be.revertedWithCustomError(DegaToken, "OwnableUnauthorizedAccount");
  });

  it("Should prevent from burning without tokens", async function () {
    const { degaToken, addr1 } = await deployDegaTokenFixture();
    await expect(degaToken.connect(addr1).burn(ethers.parseEther("100"))).to.be.revertedWithCustomError(DegaToken, "ERC20InsufficientBalance");
  });
});
