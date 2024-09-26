import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { EthersContext } from "../Context/EthersContext";
import '../Styles/Salary.css'
import { shortenAddress } from "../Utils/ShortenAddress";
import Loader from "./Loader";
function Salary() {
    const { EmpWallet, getEmployeeName, changeEmployeeSalary } = useContext(EthersContext)
    const [Loaded, setLoaded] = useState(false)
    const [Name, setName] = useState("")
    const [Salary, setSalary] = useState()
    const inputStyle = "my-2 rounded-sm p-2 outline-white bg-transparent text-white border-none text-sm white-glassmorphism w-64 border-slate-300 mt-5"
    const navigate = useNavigate()
    useEffect(() => {
        initiator()
    }, [])
    const initiator = async () => {
        if(!EmpWallet) navigate("/company")
        setLoaded(false)
        const name = await getEmployeeName(EmpWallet)
        setName(name);
        setLoaded(true)
    }

    const handleSalary = async()=>{
        if (!Salary || Salary <= 0 || Salary === undefined || Salary === null) return alert("Please enter a valid Salary")
        setLoaded(false)
        await changeEmployeeSalary(Salary,EmpWallet)
        setLoaded(true)
        navigate('/company')
    }

    return (

        <div className='emp_main  text-center'>
            {
                Loaded ? <div className='flex justify-center pt-3'>
                    <div className='  text-xl bg-yellow-100 bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg  pb-10 w-96'>
                        <div className='text-white text-3xl py-2 ml-2 font-sans pb-2 backdrop-blur-lg w-full -ml-0.5 '>Change Salary</div>
                        <div><input placeholder="Enter Salary for the Employee in Matic" className={inputStyle} onChange={(e) => setSalary(e.target.value)} type="number"></input></div>
                        <div className='text-xs text-left ml-1 text-white mt-2 ml-3'>Name:</div>
                        <div className='emp_sal text-white w-64  text-left px-1  ml-3'>
                            {Name}
                        </div>
                        <div className='text-xs text-left ml-1 text-white mt-2  ml-3'>Wallet:</div>
                        <div className='emp_sal text-white w-64  text-left px-1  ml-3'>
                            {EmpWallet ? shortenAddress(EmpWallet) : "0x00000...00000"}
                        </div>
                        <div className='remove_employees_btn bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg font-semibold mx-3 mt-3' onClick={handleSalary}>
                            Proceed to change
                        </div>
                        </div> 
                </div> : <Loader />
            }

        </div>
    )
}

export default Salary