import { ChainId } from "@thirdweb-dev/sdk";
import { createContext } from "react";

const ChainContext = createContext({
    selectedChain: ChainId.Mainnet,
    setSelectedChain: (chain) => { },
});

export default ChainContext;