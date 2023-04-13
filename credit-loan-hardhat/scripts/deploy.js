const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const ContractCredit = await hre.ethers.getContractFactory("CreditLoan");

  const creditLoan = await ContractCredit.deploy();
  await creditLoan.deployed();

  console.log(`owner address: ${owner.address}`);

  console.log(`Deployed contract address: ${creditLoan.address}`);

  console.log(`Contract deployed to ${creditLoan.address} on ${network.name}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
