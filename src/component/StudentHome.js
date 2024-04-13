import React, { useEffect, useState } from 'react'
import './StudentHome.css'
import axios from 'axios';
const StudentHome = ({ isLogin, setIsLogin }) => {
  const url = 'https://mhilis-fee-portal-backend-1.onrender.com'
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState({});
  const [dues, setDues] = useState([])
  const [transactions, setTransactions] = useState([])
  const getMonthName = (monthNumber) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[monthNumber - 1];
  };

  function formatDate(date) {
    console.log(date)
    const dateObject = new Date(date)
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear().toString().slice(2);
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  const showMessage = (msg) => {
    alert(msg)
  }
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('studentToken')
      console.log(token)
      const response = await fetch(`${url}/student/orders`, {
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

        let due = data.orders.filter((e) => e.paid_at === null);
        let trans = data.orders.filter((e) => e.paid_at !== null);
        console.log(due, trans)
        console.log(data)
        setTransactions(trans)
        setDues(due)
        setUser(data.user)
        console.log(data)
      }
    } catch (error) {
      showMessage('error')
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    setIsLogin(false)
  }
  const payfee = async (order_id, amount) => {
    var options = {
      "key": "rzp_live_Eelj9HykfOptW5", // Enter the Key ID generated from the Dashboard
      "amount": `${amount / 100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "mHilis Education",
      "description": "An Educational Institute",
      "image": "https://example.com/your_logo",
      "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response) {
        const body = {
          ...response
        }
        const validateRes = await fetch(`${url}/payment/validate`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const jsonRes = await validateRes.json()
        console.log(jsonRes)
      },
      "prefill": {
        "name": user.name,
        "email": user.email,
        "contact": user.phone
      },

    };
    var rzp1 = new window.Razorpay(options);

    rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();

  }
  useEffect(() => {
    fetchOrders()
  }, [])
  return (
    <>
      <h3>Fee Portal</h3>
      <div className="container">
      <h4>{user.name} </h4>
      <button onClick={() => { handleLogout() }}>Logout</button>
      </div>
      <div className="container">
        <h3>Your dues</h3>
        {dues.map((order) => (
          <div className="order-card" key={order.id}>
            <p>Amount: {order.amount / 100}</p>
            <p>Month: {getMonthName(new Date(order.created_at * 1000).getMonth() + 1)}</p>
            <small style={{ color: 'rgba(83, 82, 82, 0.815)' }}>Pay your fees by 10th of this month</small>
            <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded" className="form-group">
              <input type="hidden" name="key_id" value="rzp_live_Eelj9HykfOptW5" />
              <input type="hidden" name="amount" value={order.amount / 100} />
              <input type="hidden" name='order_id' value={order.id} />
              <input type="hidden" name="name" value="mHilis Education" />
              <input type="hidden" name="description" value="An Educational Institute" />
              <input type="hidden" name="image" value="https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.jpg" />
              <input type="hidden" name="prefill[name]" value={user.name} />
              <input type="hidden" name="prefill[contact]" value={user.phone} />
              <input type="hidden" name="prefill[email]" value={user.email} />
              <input type="hidden" name="callback_url" value={`${url}/payment/success?a=${order.amount}`} />
              <input type="hidden" name="cancel_url" value={`${url}/payment/failure`} />
            </form>
            <button onClick={() => { payfee(order.id, order.amount) }}>Pay Now</button>
          </div>
        ))}
        {dues.length === 0 && <b><small>No Dues</small></b>}
      </div>
  
      <div className="container">
        <h3>Transaction History</h3>
        {transactions.map(order => (
          <div className="order-card" key={order.id}>
            <p>Amount: {order.amount / 100}</p>
            <p>Month: {getMonthName(new Date(order.created_at * 1000).getMonth() + 1)}</p>
            <b><small>Paid at: {formatDate(order.paid_at)}</small></b>
          </div>
        ))}
        {transactions.length === 0 && <b><small>No Transaction</small></b>}
      </div>
    </>
  );
}

export default StudentHome
