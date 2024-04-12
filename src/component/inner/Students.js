import React, { useState,useEffect } from 'react'
import './Students.css'
const Students = () => {
const [students,setStudents] = useState([])
const url = 'https://mhilis-fee-portal-backend-1.onrender.com'
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Students
