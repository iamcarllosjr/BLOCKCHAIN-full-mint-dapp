import { ethers } from "hardhat";

async function main() {

  const [Deployer] = await ethers.getSigners();
  console.log("Account Deployer:", Deployer.address);
 
  const RoboPunksNFT = await ethers.getContractFactory("RoboPunksNFT");
  const roboPunksNFT = await RoboPunksNFT.deploy();

  console.log("RoboPunksNFT Address:", await roboPunksNFT.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
