import React, { useEffect, useState, useContext } from "react";
import { EthersContext } from "../Context/EthersContext";
import { chainIdMapping } from "../Utils/networks";
import taiko from "../images/taiko.svg";

const BlockchainBox = () => {
  const { chainId, switchNetwork } = useContext(EthersContext);
  const [isOpen, setIsOpen] = useState(false);

  // Ensure the user stays on Taiko Mainnet or Testnet
  // useEffect(() => {
  //   if (chainId !== "167000" && chainId !== "167009") {
  //     switchNetwork("167009"); // Force to Taiko Mainnet
  //   }
  // }, []);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 9999,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      border: "none",
      padding: "20px",
      maxWidth: "600px",
    },
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const switchHandler = async (chain) => {
    await switchNetwork(chain);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleOpenModal}
        >
          {chainIdMapping[chainId]?.name || "Unknown Network"}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-3 rounded-md">
            <div className="flex justify-between">
              <div className="font-roboto font-semibold text-2xl">
                Choose Chain
              </div>
              <button
                onClick={handleCloseModal}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 justify-items-center items-center">
              <div
                className="h-20 w-20 bg-stone-900 rounded-md flex flex-col justify-center items-center text-center cursor-pointer"
                onClick={() => {
                  switchHandler("167009"); // Hekla Testnet
                }}
              >
                <img src={taiko} className="w-7 h-11 mb-1" alt="Taiko Hekla" />
                <div className="text-xs text-white">Hekla Testnet</div>
              </div>

              <div
                className="h-20 w-20 bg-stone-900 rounded-md flex flex-col justify-center items-center text-center cursor-pointer"
                onClick={() => {
                  switchHandler("167000"); // Taiko Mainnet
                }}
              >
                <img
                  src={taiko}
                  className="w-7 h-11 mb-1"
                  alt="Taiko Mainnet"
                />
                <div className="text-xs text-white">Mainnet</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainBox;
