import React,{useState,useEffect} from 'react'

const TotalFeeCollected = () => {
    const url = 'https://mhilis-fee-portal-backend-1.onrender.com'
    

    const [totalfee,setTotalfee] = useState(null)
    const [from,setFrom] = useState()
    const [to,setTo] = useState()
    const handleCalculate = async (req,res)=>{
        setTotalfee(null)
        try {
            const token = localStorage.getItem('adminToken')
            console.log(token)
      const response = await fetch(`${url}/admin/totalPaidFee?startDate=${from}&endDate=${to}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        
      });
      if(response.status===200){
        const data = await response.json();
        console.log('totalfee',data.totalPaidFee)
        if(data.length>0){
            setTotalfee(data[0].totalPaidFee)
        }
        else{
            setTotalfee(0)
        }
        
        
      }
        } catch (error) {
            console.log('error in fetching totalfee')
        }
    }

    
  return (
    
<div className="chart">
      <h1>Total Fee</h1>
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <br /><br />
      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <br /> <p>Total Fee: {totalfee}</p><br />
      <button id="calculateBtn" onClick={handleCalculate}>Calculate</button>
      
    </div>
      
    
  )
}

export default TotalFeeCollected
