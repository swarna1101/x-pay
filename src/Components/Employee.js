import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { EthersContext } from "../Context/EthersContext";
import "../Styles/Employee.css";
import Loader from "./Loader";
import { ethers } from "ethers";

function Employee() {
  const {
    getContractBalance,
    getWalletBalance,
    getEmployeeTransactions,
    getName,
    getEmployeeSalary,
    claimSalary,
  } = useContext(EthersContext);
  const [Loaded, setLoaded] = useState(false);
  const [ContractBalance, setContractBalance] = useState("0");
  const [WalletBalance, setWalletBalance] = useState("0");
  const [mySalary, setMySalary] = useState("0");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);
      try {
        const contractBal = await getContractBalance();
        setContractBalance(contractBal);
        const walletBal = await getWalletBalance();
        setWalletBalance(walletBal);
        const mySal = await getEmployeeSalary();
        setMySalary(mySal);

        setLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoaded(true);
      }
    };
    fetchData();
  }, [
    getContractBalance,
    getWalletBalance,
    getEmployeeTransactions,
    getName,
    navigate,
  ]);

  // Function to calculate days remaining in the month
  const getDaysRemainingInMonth = () => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return Math.ceil((endOfMonth - now) / (1000 * 60 * 60 * 24));
  };

  const handleClaimSalary = async () => {
    await claimSalary();
  };

  return (
    <div className="emp_main">
      {Loaded ? (
        <Row>
          <Col sm={12} className="mb-4">
            <div className="days-remaining text-center text-white">
              Days Remaining Until End of Month: {getDaysRemainingInMonth()}
            </div>
          </Col>
          <Col sm={12} className="mb-4">
            <div className="contract_balance text-center text-white">
              <h2>Contract Balance</h2>
              <div>{ContractBalance} ETH</div>
            </div>
          </Col>
          <Col sm={12} className="mb-4">
            <div className="contract_balance text-center text-white">
              <h2>My Monthly Salary</h2>
              <div>{mySalary} ETH</div>
            </div>
          </Col>
          <Col sm={12} className="mb-4">
            <div className="wallet_balance text-center text-white">
              <h2>My Balance</h2>
              <div>{WalletBalance} ETH</div>
            </div>
          </Col>
          <Col sm={12} className="text-center">
            <button
              className="ghost-round full-width"
              onClick={handleClaimSalary}
            >
              Claim Salary
            </button>
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Employee;
