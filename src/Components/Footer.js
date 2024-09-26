import React from "react";

import logo from "../images/logo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4"></div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <a
        className="text-white text-left text-xs"
        href="github.com/taslimmuhammed/Ncrypt"
      >
        github.com/taslimmuhammed/payroll
      </a>
      {/* <p className="text-white text-right text-xs">All rights reserved</p> */}
    </div>
  </div>
);

export default Footer;
