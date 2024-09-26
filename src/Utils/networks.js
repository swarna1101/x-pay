export const chainIdMapping = {
  167009: {
    name: "Taiko Hekla",
    rpcUrls: ["https://rpc.hekla.taiko.xyz"],
    blockExplorerUrls: ["https://blockscoutapi.hekla.taiko.xyz"],
    nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
    hex: "0x28c61",
  },
  167000: {
    name: "Taiko Mainnet",
    rpcUrls: ["https://rpc.ankr.com/taiko"],
    blockExplorerUrls: ["https://taikoscan.io"],
    nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
    hex: "0x28c58",
  },
  11155111: {
    name: "Sepolia",
    rpcUrls: ["https://sepolia.infura.io/v3/17791caeae0b493489ca6d99f6530bc4"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
    nativeCurrency: {
      name: "ETH",
      decimals: 18,
      symbol: "ETH",
    },
    hex: "0x10f3",
  },
};
