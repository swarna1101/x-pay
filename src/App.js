import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CompanyPage from "./Pages/CompanyPage";
import EmployeePage from "./Pages/EmployeePage";
import TransactionsPage from "./Pages/TransactionsPage";
import VerifyPage from "./Pages/VerifyPage";
import SalaryPage from "./Pages/SalaryPage";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/company" element={<CompanyPage />}></Route>
        <Route path="/employee" element={<EmployeePage />}></Route>
        <Route path="/transactions" element={<TransactionsPage />}></Route>
        <Route path="/addemployees" element={<VerifyPage />}></Route>
        <Route path="/changesalary" element={<SalaryPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
