require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.18",
  networks: {
    bnbtestnet: {
      url: "https://indulgent-newest-leaf.bsc-testnet.discover.quiknode.pro/8a8483b20d028a2b4ca603f1f86a6f1d702a6624/",
      accounts: [PRIVATE_KEY],
    },
  },
};
