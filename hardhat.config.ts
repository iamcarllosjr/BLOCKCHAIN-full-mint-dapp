import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const { ALCHEMY_API_KEY, METAMASK_PRIVATE_KEY, API_POLYGON_SCAN } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    polygon: {
      url: ALCHEMY_API_KEY,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for PolygonScan
    // For cerify contract
    apiKey: API_POLYGON_SCAN,
  },
};

export default config;
