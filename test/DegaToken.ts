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

    const degaToken = await ethers.deployContract("DegaToken", [
      "$DEGA",
      "$DEGA",
    ]);

    await degaToken.initialize(ethers.parseEther("1000000")); // Initialize with 1 million tokens
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
      await degaToken.mint(owner.address, 1000);
    };
    await expect(mintFunction()).to.be.reverted;
  });

  it("Should allow burning of tokens", async function () {
    const { degaToken, owner } = await deployDegaTokenFixture();
    const initialBalance = await degaToken.balanceOf(owner.address);
    await degaToken.burn(ethers.parseEther("1000"));
    const finalBalance = await degaToken.balanceOf(owner.address);
    expect(finalBalance).to.equal(initialBalance - ethers.parseEther("1000"));
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
});
