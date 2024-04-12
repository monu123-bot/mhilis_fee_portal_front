import React,{useState,useEffect} from 'react'
import './Transaction.css'
const Transactions = () => {
    const url = 'https://mhilis-fee-portal-backend-1.onrender.com'
    const [transactions,setTransactions] = useState([])
    const fetchTr = async (req,res)=>{
        try {
            const token = localStorage.getItem('adminToken')
            console.log(token)
      const response = await fetch(`${url}/admin/fetchtransactions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        
      });
      if(response.status===200){
        const data = await response.json();
        console.log('transactions',data)
        setTransactions(data)
        
      }
        } catch (error) {
            console.log('error in fetching transactions')
        }
    }

    useEffect(()=>{
fetchTr()
    },[])
  return (
    <div className="transactions-container">
    <h2>Transactions</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Amount</th>
          <th>Student Email</th>
          <th>Student Name</th>
          <th>Student Phone</th>
          <th>Student Standard</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction._id}>
            <td>{transaction._id}</td>
            <td>{transaction.amount/100}</td>
            <td>{transaction.student.email}</td>
            <td>{transaction.student.name}</td>
            <td>{transaction.student.phone}</td>
            <td>{transaction.student.standard}</td>
            <td>{new Date(transaction.time).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Transactions
