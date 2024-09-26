import classnames from "classnames";
import {
  ArbiIcon,
  AvalancheIcon,
  BinanceIcon,
  EthereumIcon,
  MoonbeamIcon,
  PolkadotIcon,
} from "../icons";

export const Container = ({ children, className = "" }) => {
  return (
    <div className={classnames("max-w-7xl m-auto w-full px-5", className)}>
      {children}
    </div>
  );
};

export const DarkBackground = ({ className = "", children }) => {
  return (
    <div
      className={classnames(
        "bg-gradient-to-r from-[#09081a70] to-cdark-500",
        className
      )}
    >
      {children}
    </div>
  );
};

export const SupportedChains = ({ className }) => {
  return (
    <div
      className={classnames(
        "flex overflow-hidden space-x-6 md:space-x-12 absolute top-0 left-0 items-center px-6",
        className
      )}
    >
      <div className="h-16 w-40 flex items-center justify-center">
        <BinanceIcon />
      </div>
      <div className="h-16 w-40 flex items-center justify-center">
        <MoonbeamIcon />
      </div>
      <div className="h-16 w-40 flex items-center justify-center">
        <PolkadotIcon />
      </div>
      <div className="h-16 w-40 flex items-center justify-center">
        <ArbiIcon />
      </div>
      <div className="h-16 w-40 flex items-center justify-center">
        <AvalancheIcon />
      </div>
      <div className="h-16 w-40 flex items-center justify-center">
        <EthereumIcon />
      </div>
    </div>
  );
};
