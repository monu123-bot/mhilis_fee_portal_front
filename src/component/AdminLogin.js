import React from 'react'
import  { useEffect, useState } from 'react'
import axios from 'axios'
import './Admin.css'
import AdminHome from './AdminHome'
const AdminLogin = () => {
  const url = 'https://mhilis-fee-portal-backend-1.onrender.com'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin,setIsLogin] = useState(false)
    const showMessage = (msg)=>{
      alert(msg)
  }
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit =async (event) => {
      event.preventDefault();
      const payload = {
        email,password
    }
   try {
    const resp = await axios.post(`${url}/admin/login`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

      console.log(resp)
      if (resp.status === 200) {

        // localStorage.setItem('student',JSON.stringify(data))
        // console.log(JSON.parse(localStorage.getItem('student')))
          const time = new Date().getTime()
          const token1 = resp.headers.get('Authorization')
        //   console.log(token1,resp.headers)
      localStorage.setItem('adminToken', token1);
      // const result = await resp.json();
      // console.log('token is ',result)
          // localStorage.setItem("providertoken", token);
          localStorage.setItem("providerlogintime", time)
          setIsLogin(true)
          
      } 
      else{
        showMessage(resp.msg)
      }

   } catch (error) {
    console.log(error)
    showMessage(error)
   }


    console.log('Email:', email);
    console.log('Password:', password);
    // Reset form fields
    setEmail('');
    setPassword('');
    };
  return (
 <>
    {!isLogin ? (

      <div className='container'>
    <h2>Admin Login Page</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
    ) : <AdminHome isLogin={isLogin} setIsLogin={setIsLogin} />}

</>
  )
}

export default AdminLogin
