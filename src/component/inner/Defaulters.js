import React, { useEffect, useState } from 'react'
import './Defaulters.css'
const Defaulters = () => {
    const url = 'https://mhilis-fee-portal-backend-1.onrender.com'

    const [defaulters,setDefaulter] = useState([])
    function getMonthName(monthNumber) {
        console.log(monthNumber)
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthNumber - 1];
    }
    function getMonthNameFromTimestamp(timestamp) {
        const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
        const monthNumber = date.getMonth() + 1;
        return getMonthName(monthNumber);
    }
  
    const fetchDef = async (req,res)=>{
        try {
            const token = localStorage.getItem('adminToken')
            console.log(token)
      const response = await fetch(`${url}/admin/fetchdefaulters`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        
      });
      if(response.status===200){
        const data = await response.json();
        console.log('defaulters',data)
        setDefaulter(data)
        
      }
        } catch (error) {
            console.log('error in fetching defaulters')
        }
    }

    useEffect(()=>{
fetchDef()
    },[])

  return (
    <div className="defaulters-container">
      <h2>Defaulters List</h2>
      <table className="defaulters-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>School</th>
            <th>Standard</th>
            <th>Total Fee</th>
            <th>Courses</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {defaulters.map((defaulter) => (
            <tr key={defaulter._id}>
              <td>{defaulter.name}</td>
              <td>{defaulter.email}</td>
              <td>{defaulter.phone}</td>
              <td>{defaulter.school}</td>
              <td>{defaulter.standard}</td>
              <td>{defaulter.totalFee}</td>
              <td>
                <ul>
                  {defaulter.courses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {defaulter.order.map((order, index) => (
                    <li key={index}>{getMonthNameFromTimestamp(order)}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Defaulters
