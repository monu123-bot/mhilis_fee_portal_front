import React,{useState} from 'react'
import axios  from 'axios';
const AddCourse = ({courses,setCourses}) => {
    const url = 'https://mhilis-fee-portal-backend-1.onrender.com'
    const [name, setName] = useState('');
    const [fee, setFee] = useState('');
    const showMessage = (msg)=>{
        alert(msg)
    }
    const handleSubmit =async (e) => {
      e.preventDefault();
      const payload = {
        name,
        fee
      };
      try{
        const token = localStorage.getItem('adminToken')
        const resp = await axios.post(`${url}/admin/addCourse`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });

      if(resp.status===200){
        
        setName('')
        setFee('')
        showMessage('course added')
      }
    } catch (error) {
        showMessage('course not added due to some error')
    }
    //   console.log(formData); // For testing
    };
  
    return (
      <div>
        <h2>Add Course</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Enter Fee" value={fee} onChange={(e) => setFee(e.target.value)} required />
        <button onClick={handleSubmit}>Add</button>
      </div>
    );
}

export default AddCourse
