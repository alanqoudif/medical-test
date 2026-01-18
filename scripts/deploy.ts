import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Healthcare contract...");

  const Healthcare = await ethers.getContractFactory("Healthcare");
  const healthcare = await Healthcare.deploy();

  await healthcare.waitForDeployment();

  const address = await healthcare.getAddress();
  console.log("Healthcare deployed to:", address);
  console.log("\nPlease add this address to your .env file:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);

  // Wait for a few block confirmations before verifying
  console.log("\nWaiting for block confirmations...");
  await healthcare.deploymentTransaction()?.wait(5);
  console.log("Contract deployment confirmed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });