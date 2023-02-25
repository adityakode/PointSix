// Importing dependencies
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test contract", function () {
  let testContract;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Deploying the contract
    const TestContract = await ethers.getContractFactory("Test");
    [owner, addr1] = await ethers.getSigners();
    testContract = await TestContract.deploy();
    await testContract.deployed();
  });
  

  describe("Minting NFTs", function () {
    it("Should mint an NFT ", async function () {
      // Minting NFT
      await testContract.connect(owner).mint(addr1.address);
     
    });
  });

  describe("Showing the codeBase of an NFT", function () {
    it("Should return the codeBase of the NFT if it is made visible", async function () {
      // Minting NFT
      await testContract.connect(owner).mint(addr1.address);
      // Making codeBase visible
      await testContract.connect(owner).makeVisible(0);
      // Checking if the codeBase can be viewed
      expect(await testContract.showcode(0)).to.not.equal(0);
    });

    it("Should revert if trying to view codeBase of a non-existent NFT", async function () {
      // Checking if showcode function reverts when called with an invalid tokenId
      await expect(testContract.showcode(0)).to.be.revertedWith("ERC721: invalid token ID");
    });

    it("Should revert if trying to view codeBase of an NFT that hasn't made its code visible", async function () {
      // Minting NFT
      await testContract.connect(owner).mint(addr1.address);
      // Checking if the showcode function reverts when called on an NFT whose codeBase is not visible
      await expect(testContract.showcode(0)).to.be.revertedWith("Secret Code is hidden");
    });
  });

  describe("Making the codeBase of an NFT visible", function () {
    it("Should allow the owner to make the codeBase of an NFT visible", async function () {
      // Minting NFT
      await testContract.connect(owner).mint(addr1.address);
      // Making codeBase visible
      await testContract.connect(owner).makeVisible(0);
      // Checking if the codeBase can be viewed after making it visible
      expect(await testContract.showcode(0)).to.not.equal(0);
    });

   
  });
  describe("Burning an NFT", function () {
    it("Should allow the owner to burn an NFT and delete its codeBase", async function () {
      // Minting NFT
      await testContract.connect(owner).mint(addr1.address);
      // Burning NFT
      await testContract.connect(owner).burnNFT(0);
    
   
    });

 
  })
})
