import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState("");
    const [pw, setPassword] = useState("");
    const navigate=useNavigate();
    const validateUrPw = () =>{
      if (!email) {
        alert("Please enter a valid email address");
        return false;
      }
      const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
      if (!emailRegex.test(email)) {
          alert("Please enter a valid email address");
          return false;
      }
      if (!pw) {
        alert("Please enter the password");
        return false;
      }
      if (pw.length < 6) {
          alert("Password must contain at least 6 characters");
          return false;
      }
      return true;
    }

  const handlelogin = async (e) => {
    e.preventDefault();
    if (validateUrPw()) {
      try {
        const response = await axios.post('http://localhost:3001/login', {email,password:pw});
        
        const { token } = response.data;
        localStorage.setItem('token', token); // Store the token in localStorage
        localStorage.setItem('username', response.data.username);
        console.log("Valid form submitted"); 
        navigate('/');
        window.location.reload();
      } catch (err) {
        alert('The email address and password combination entered do not match any account. Please try again.');
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="main">
      <div className="sub-main-login">
        <h1 className="title-login">Login</h1>
        <div className="contnt-login">
          <form onSubmit={handlelogin}>
              <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-login"/>
              <br/>
              <input type="password" placeholder="Enter password" value={pw} onChange={(e) => setPassword(e.target.value)} className="input-login"/>
              <div className="Login-button" style={{top:"140px",position:"absolute"}}>
                <button type="submit" className="button2-login">Login</button>
              </div>
              <div className="link2">
                  Don't have an account? <Link to="/signup">Create Account</Link>
              </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}