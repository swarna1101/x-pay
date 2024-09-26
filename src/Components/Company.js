import React, { useContext, useState, useEffect } from "react";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import { EthersContext } from "../Context/EthersContext";
import "../Styles/Company.css";
import Loader from "./Loader";
import { ethers } from "ethers";

function Company() {
  const {
    getEmployeeList,
    calculateTotalSalary,
    removeEmployee,
    payEmployees,
    addEmployee,
    getEmployeeNumber,
    getContractBalance,
  } = useContext(EthersContext);

  const [Loaded, setLoaded] = useState(false);
  const [TotalSal, setTotalSal] = useState(0);
  const [EmpList, setEmpList] = useState([]);
  const [Name, setName] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [empName, setEmpName] = useState("");
  const [empAddress, setEmpAddress] = useState("");
  const [empSalary, setEmpSalary] = useState("");
  const [empNum, setEmpNum] = useState("0");
  const [contractBalance, setContractBalance] = useState("0");

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(true);
      try {
        const empNumber = await getEmployeeNumber();
        setEmpNum(empNumber);
        const empList = await getEmployeeList();
        setEmpList(empList);
        const totalSal = await calculateTotalSalary();
        setTotalSal(totalSal);
        let contractBal = await getContractBalance();
        setContractBalance(contractBal);
        setLoaded(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoaded(false);
      }
    };
    fetchData();
  }, [getEmployeeList, calculateTotalSalary]);

  // Function to calculate days remaining in the month
  const getDaysRemainingInMonth = () => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return Math.ceil((endOfMonth - now) / (1000 * 60 * 60 * 24));
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const intiateTransactions = async () => {
    setLoaded(true);
    try {
      await payEmployees();
      setLoaded(false);
      alert("Successfully locked salaries");
    } catch (error) {
      setLoaded(false);
      console.error("Error locking salaries:", error);
      alert("Something went wrong, try again");
    }
  };

  const handleAddEmployee = async () => {
    if (empAddress && empSalary) {
      try {
        await addEmployee(empAddress, empSalary);
        setEmpAddress("");
        setEmpSalary("");
        handleClose();
        // Refresh employee list after adding a new employee
        const empList = await getEmployeeList();
        setEmpList(empList);
      } catch (error) {
        console.error("Error adding employee:", error);
        alert("Something went wrong, try again");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleRemoveEmployee = async (wallet) => {
    setLoaded(true);
    try {
      await removeEmployee(wallet);
      // Refresh employee list after removing an employee
      const empList = await getEmployeeList();
      setEmpList(empList);
    } catch (error) {
      console.error("Error removing employee:", error);
      alert("Something went wrong, try again");
    }
    setLoaded(false);
  };

  return (
    <div className="emp_main">
      <Row>
        <Col sm={12} className="mb-4">
          <div className="days-remaining">
            <div className="text-white text-2xl text-center">
              Days Remaining Until End of Month: {getDaysRemainingInMonth()}
            </div>
            <div className="text-white text-xl text-center mt-10">
              Contract Balance: {contractBalance} ETH
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={5} md={12} className="probox">
          <div className="pro_box">
            <div className="cmp_box bg-pink-800">
              <div className="cmp_name font-sans">{Name}</div>
              <div className="flex justify-between p-5">
                <div className="bg-white p-3 rounded-lg">
                  <div>No of Employees:</div>
                  <div className="text-xl text-black text-center">{empNum}</div>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <div>Total Salary</div>
                  <div className="text-orange-600 text-xl text-center">
                    {TotalSal} ETH
                  </div>
                </div>
              </div>
              <div className="flex-col justify-center w-100">
                <div
                  className="text-center bg-red-400 mx-5 rounded-lg p-3 hover:bg-white"
                  onClick={intiateTransactions}
                >
                  Deposit Payroll
                </div>
                <div
                  className="text-center bg-red-100 mx-5 rounded-lg p-3 my-2 hover:bg-red-500"
                  onClick={handleShow}
                >
                  Add Employees
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={12} lg={7} md={12}>
          <div className="text-white text-3xl my-5 ml-2">Employees</div>

          <div className="emp_list">
            {/* Employee Table */}
            <table className="employee-table table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {EmpList.map((address, index) => (
                  <tr key={address}>
                    <td>{index + 1}</td>
                    <td>{address}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveEmployee(address)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>

      {/* Modal for adding employee */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter wallet address"
                value={empAddress}
                onChange={(e) => setEmpAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary (in ETH)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter salary"
                value={empSalary}
                onChange={(e) => setEmpSalary(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Company;
