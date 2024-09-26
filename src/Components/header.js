import { useContext } from "react";
import { EthersContext } from "../Context/EthersContext";
import { Link } from "react-router-dom";
import { shortenAddress } from "../Utils/ShortenAddress";
import BlockchainBox from "./BlockchainBox";
import { CloseIcon } from "../icons/close-icon";
import { Container } from "./ui";
import taiko from "../images/taiko.svg";

export const Header = () => {
  //rainbow

  const { connectWallet, currentAccount } = useContext(EthersContext);
  return (
    <>
      <header className="flex items-center justify-between flex-wrap bg-transparent py-3 px-6">
        <Container className="flex items-center justify-between w-full">
          {/* Logo and Title */}
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img className="w-12 h-12" src={taiko} alt="Taiko Logo" />
            <h1 className="ml-4 text-4xl font-bold bg-gradient-to-r from-pink-300 via-pink-500 to-pink-700 text-transparent bg-clip-text">
              Taiko Pay
            </h1>
          </div>

          {/* Navigation and Wallet Connect */}
          <nav className="flex-grow flex items-center justify-end space-x-4">
            <div className="hidden md:flex gap-10"></div>{" "}
            {/* Empty div for future nav items */}
            <div className="flex items-center space-x-4">
              {currentAccount ? (
                <div className="flex items-center space-x-3">
                  <BlockchainBox />
                  <button className="inline-block text-sm px-4 py-2 rounded transition-all text-white bg-pink-600 hover:bg-pink-400">
                    <div className="font-bold">
                      {shortenAddress(currentAccount)}
                    </div>
                  </button>
                </div>
              ) : (
                <button className="inline-block text-sm px-4 py-2 rounded-lg transition-all text-white bg-pink-600 hover:bg-black-300">
                  <div className="font-bold text-lg" onClick={connectWallet}>
                    Connect Wallet
                  </div>
                </button>
              )}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};
