import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { EthersContext } from "../Context/EthersContext";
import '../Styles/Salary.css'
import { shortenAddress } from "../Utils/ShortenAddress";
import Loader from "./Loader";
import { ethers } from "ethers";

function Transactions() {
    // getCompanyTransactions
    const { getCompanyTransactions } = useContext(EthersContext)
    const [Loaded, setLoaded] = useState(false)
    const [Transactions, setTransactions] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        initiator()
    }, [])
    const initiator = async () => {
        setLoaded(false)
        const transactions = await getCompanyTransactions()
        if(transactions) setTransactions(transactions)
        setLoaded(true)
    }
  return (
          <div className='emp_main text-center'>
              <div className='text-white text-3xl pt-4 ml-2 font-sans pb-2'> Previous Transactions</div>

          {Transactions.map((transaction, index)=>{
              let etherValue = ethers.utils.formatEther(transaction.amount._hex);
              etherValue =  parseInt(etherValue, 16)
              const date = new Date(parseInt(transaction.time, 16) * 1000);
            return (
                <div className='flex justify-center pt-3'>
              <div className='flex  text-xl bg-yellow-100 bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg py-2 '>
                  <div className='text-blue-500 w-6  p-2 '>
                      {index+1}
                  </div>

                  <div className='emp_sal text-green-400 w-32  p-2'>
                      {etherValue}
                  </div>
                  <div className='emp_name text-white w-32  p-2'>
                            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                  </div>
                  <div className='emp_name text-white w-32  p-2'>
                      {date.getHours()}:{date.getMinutes()}
                  </div>
              </div>
              <div className='list_breaker'></div>
          </div>
            )
          })}
        </div>
  )
}

export default Transactions