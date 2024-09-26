import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EthersContext } from "../Context/EthersContext";
import Loader from "./Loader";
import { shortenAddress } from "../Utils/ShortenAddress";
import backLogo from "../images/back.png";
import { type } from "@testing-library/user-event/dist/type";
function Verify() {
  const [Rname, setRname] = useState();
  const { getEmployeeName, addEmployee } = useContext(EthersContext);
  const [Wallet, setWallet] = useState();
  const [Address, setAddress] = useState();
  const [Window, setWindow] = useState(0);
  const [Loaded, setLoaded] = useState(true);
  const [Salary, setSalary] = useState();
  const handleName = async () => {
    setLoaded(false);
    if (!Address) {
      setLoaded(true);
      return alert("Please enter a walid address");
    }
    const name = await getEmployeeName(Address);
    console.log(name);
    if (name === null || name === "" || name === undefined) {
      setLoaded(true);
      return alert(
        "Employee not registerd yet, please try a diffrent wallet address"
      );
    }
    setRname(name);
    setWindow(1);
    setLoaded(true);
  };
  const handleAdder = async () => {
    if (!Salary || Salary <= 0 || Salary === undefined || Salary === null)
      return alert("Please enter a valid Salary");
    setLoaded(false);
    await addEmployee(Address, Salary, Rname);
    setWindow(0);
    setLoaded(true);
  };
  const inputStyle =
    "my-2 rounded-sm p-2 outline-white bg-transparent text-white border-none text-sm white-glassmorphism w-64 border-slate-300 mt-5";
  if (Loaded)
    return (
      <div className="emp_main text-center">
        <div className="flex justify-center pt-3">
          <div className="  text-xl bg-yellow-100 bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg  pb-10 w-96">
            <div className="text-white text-3xl py-2 ml-2 font-sans pb-2 backdrop-blur-lg w-full -ml-0.5 flex">
              <img
                src={backLogo}
                className="w-9 ml-1 "
                onClick={() => {
                  setWindow(0);
                }}
              ></img>
              <div className=" text-center w-full -ml-2">Add Employees</div>
            </div>
            <div>
              <input
                placeholder="Enter Salary for the Employee in Matic"
                className={inputStyle}
                onChange={(e) => setSalary(e.target.value)}
                type="number"
              ></input>
            </div>
            <div className="text-xs text-left ml-1 text-white mt-2 ml-3">
              Name:
            </div>
            <div className="emp_sal text-white w-64  text-left px-1  ml-3">
              {Rname}
            </div>
            <div className="text-xs text-left ml-1 text-white mt-2  ml-3">
              Wallet:
            </div>
            <div className="emp_sal text-white w-64  text-left px-1  ml-3">
              {Address ? shortenAddress(Address) : "0x00000...00000"}
            </div>
            <div
              className="remove_employees_btn bg-green-500 hover:bg-green-600 p-2 rounded-lg font-semibold mx-3 mt-3"
              onClick={handleAdder}
            >
              Add to Company
            </div>
          </div>

          <div className="list_breaker"></div>
        </div>
      </div>
    );
  else return <Loader></Loader>;
}

export default Verify;
