import React, { useState,useEffect } from 'react'
import './Students.css'
import axios from 'axios'
const Students = () => {

  const [ordStudents,setOrdStudents] = useState([])
const [students,setStudents] = useState([])
const url = 'https://mhilis-fee-portal-backend-1.onrender.com'
// const url = 'http://localhost:3000'
const handleCheckboxChange = async (id)=>{
  const studentIndex = ordStudents.findIndex(student => student._id === id);
    if (studentIndex !== -1) {
      // If student is already in ordStudents, remove it
      const updatedOrdStudents = [...ordStudents];
      updatedOrdStudents.splice(studentIndex, 1);
      setOrdStudents(updatedOrdStudents);
    } else {
      // If student is not in ordStudents, add it
      const studentToAdd = students.find(student => student._id === id);
      if (studentToAdd) {
        setOrdStudents(prevStudents => [...prevStudents, studentToAdd]);
      }
    } console.log(ordStudents)
}
const showMessage = (msg)=>{
    alert(msg)
}
const removeStudent = async (id)=>{
    const pr = prompt("Type 'delete' to confirm")
    if(pr!=='delete'){
return
    }
    try {
        const token = localStorage.getItem('adminToken')
        console.log(token)
  const response = await fetch(`${url}/admin/removestudent?sId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    
  });
  console.log(response)
  if(response.status===200){
    showMessage('student removed')
    
  }
    } catch (error) {
        console.log('error in removing students')
        showMessage(error)
    }

}
const createOrder = async()=>{
  try {
      const token = localStorage.getItem('adminToken')
      console.log(token)
      const payload = ordStudents
      const response = await axios.post(`${url}/admin/createOrders`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }})

// console.log("cafes are",response)
if (response.status===200) {
  showMessage('order created')
}
  } catch (error) {
      showMessage('error')
  }
}

    const fetchSt = async (req,res)=>{
        try {
            const token = localStorage.getItem('adminToken')
            console.log(token)
      const response = await fetch(`${url}/admin/fetchstudents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        
      });
      if(response.status===200){
        const data = await response.json();
        console.log('students',data)
        setStudents(data)
        
        
      }
        } catch (error) {
            console.log('error in fetching students')
        }
    }

    useEffect(()=>{
fetchSt()
    },[])

  return (
    <div className='student-container'>
    <button onClick={()=>(createOrder())} >Create Fee Orders</button>

      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>School</th>
            <th>Phone</th>
            <th>Standard</th>
            <th>Total Fee</th>
            <th>Courses</th>
            <th>Remove</th>
            <th>Generate Fee</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.gender}</td>
              <td>{student.school}</td>
              <td>{student.phone}</td>
              <td>{student.standard}</td>
              <td>{student.totalFee}</td>
             

              <td>
                <ul>
                {student.courses.map((course, index) => (
                 <li> <span key={index}>{course}{index !== student.courses.length - 1 ? ', ' : ''}</span></li>
                ))}
                </ul>
              </td>
              <td><button onClick={()=>{removeStudent(student._id)}} >Remove</button></td>
              <td><input id={student._id}
        type="checkbox"
        
        onChange={()=>{handleCheckboxChange(student._id)}}
      /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Students
