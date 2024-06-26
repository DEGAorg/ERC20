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
    const degaToken = await ethers.deployContract("DegaToken");
    return { degaToken, owner, addr1 };
  }

  it("Should deploy and assign the total supply of tokens to the owner", async function () {
    const { degaToken, owner } = await deployDegaTokenFixture();
    const ownerBalance = await degaToken.balanceOf(owner.address);
    const totalSupply = await degaToken.totalSupply();
    expect(ownerBalance).to.equal(totalSupply);
  });

  // Cannot test minting because function does not exists
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
    await degaToken.burn(1000);
    const finalBalance = await degaToken.balanceOf(owner.address);
    expect(finalBalance).to.equal(initialBalance - BigInt(1000));
  });
});
