import React,{useState} from 'react'
import axios from 'axios'
import './Addstudent.css'
const AddStudent = ({courses}) => {
    const url = 'https://mhilis-fee-portal-backend-1.onrender.com'
 
     const [name, setName] = useState('');
  const [fName, setFName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [standard, setStandard] = useState('');
  const [course, setCourse] = useState([]);
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
const showMessage = (msg)=>{
    alert(msg)
}
  const handleCheckboxChange = (e) => {
    const courseId = e.target.value;
    if (e.target.checked) {
      setCourse([...course, courseId]);
    } else {
      setCourse(courses.filter((id) => id !== courseId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload= {
      name,
      fName,
      phone,
      email,
      school,
      standard,
      course,
      gender,
      password
    };
    // Submit the form data using fetch or axios
     // For testing

    try{
        const token = localStorage.getItem('adminToken')
        const resp = await axios.post(`${url}/admin/addStudent`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });

      if(resp.status===200){
        setName('')
        setEmail('')
        setFName('')
        setPassword('')
        setPhone('')
        setSchool('')
        setGender('')
        setCourse('')
        setStandard('')
        showMessage('student added')
      }
    } catch (error) {
        showMessage('student not added due to some error')
    }

  };

  return (
    <>
   <div className='st-container'>
      <h2>Add Student</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Father Name" value={fName} onChange={(e) => setFName(e.target.value)} required />
      <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="School name" value={school} onChange={(e) => setSchool(e.target.value)} required />
      <select value={standard} onChange={(e) => setStandard(e.target.value)} required>
        <option value="" disabled>Select standard</option>
        {[...Array(13)].map((_, index) => (
          <option key={index + 1} value={index + 1}>{index + 1}</option>
        ))}
      </select>
      <div>
        <label>Select Courses:</label>
        {/* Replace 'courseList' with your array of course objects */}
        {courses.map((course1) => (
          <div key={course1.id}>
            <input type="checkbox" id={course1.id} value={course1._id} onChange={handleCheckboxChange} />
            <label htmlFor={course1.id}>{course1.name}</label>
          </div>
        ))}
      </div>
      <select value={gender} onChange={(e) => setGender(e.target.value)} required>
        <option value="" disabled>Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={handleSubmit}>Submit</button>
    </div>
    </>
  )
}

export default AddStudent
