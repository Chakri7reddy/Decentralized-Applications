
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FriendsToken", function () {
  let FriendsToken;
  let friendsToken;
  let owner;

  beforeEach(async function () {
    FriendsToken = await ethers.getContractFactory("FriendsToken");
    friendsToken = await FriendsToken.deploy("FriendsToken", "FT", 1000000);
    [owner] = await ethers.getSigners();
  });

  it("Should have the correct name, symbol, and initial supply", async function () {
    const name = await friendsToken.name();
    const symbol = await friendsToken.symbol();
    const totalSupply = await friendsToken.totalSupply();
    const ownerBalance = await friendsToken.balanceOf(owner.address);

    expect(name, "Name").to.equal("FriendsToken");
    expect(symbol, "Symbol").to.equal("FT");
    expect(totalSupply, "Total Supply").to.equal(1000000);
    expect(ownerBalance, "Owner Balance").to.equal(1000000);
  });
});
