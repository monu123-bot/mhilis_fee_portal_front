import React, { useEffect, useState } from 'react'
import AddCourse from './inner/AddCourse'
import AddStudent from './inner/AddStudent'
import Defaulters from './inner/Defaulters'
import Students from './inner/Students'
import Transactions from './inner/Transactions'
import TotalFeeCollected from './inner/TotalFeeCollected'

const AdminHome = ({setIsLogin}) => {
    const url = 'https://mhilis-fee-portal-backend-1.onrender.com'
    const [pendingOrder,setPendingOrder] = useState([])
    const [transactions,setTransactions] = useState([])
    const [courses,setCourses] = useState([])
    const [students,setStudents] = useState([])
    const [user,setUser] = useState('')


    const showMessage = (msg)=>{
        alert(msg)
    }
    
    const fetchUser = async ()=>{
        try {
            const token = localStorage.getItem('adminToken')
            console.log(token)
      const response = await fetch(`${url}/admin/fetchpersonaldetails`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        
      });
      // console.log("cafes are",response)
      if (response.ok) {
        // setCommentCount(commentCount+1)
        // setComment([newComment,...comment])

        // console.log(comment)
        const data = await response.json();
console.log(data)
      setUser(data.user)
      setCourses(data.courses)
    }
        } catch (error) {
            showMessage('error')
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])
  return (
    <>

    <div className='adm-cont'>
        <br/>
    <button onClick={()=>(setIsLogin(false))} >{user.name }Logout</button>
    <br/><br/>
    
   
    <Students/>
    <Defaulters/>
    <Transactions/>
    <AddStudent courses={courses}  />
    <AddCourse courses={courses} setCourses={setCourses}  />
   
    <TotalFeeCollected/>
    </div>
    </>
  )
}

export default AdminHome
