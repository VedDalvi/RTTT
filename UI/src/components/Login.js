import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';

export default function Login({ setLoggedIn }) {
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

    const handlelogin = (e) => {
      e.preventDefault();
      if (validateUrPw()) {
        console.log("Valid form submitted"); 
        setLoggedIn(true);
        navigate('/');
      }
    };

  return (
    <>
    <Navbar/>
    <div className="main">
      <div className="sub-main" style={{height:"350px"}}>
        <h1 className="title">Login</h1>
        <div className="contnt">
          <form onSubmit={handlelogin}>
              <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-signup"/>
              <br/>
              <input type="password" placeholder="Enter password" value={pw} onChange={(e) => setPassword(e.target.value)} className="input-signup"/>
              <div className="Login-button" style={{top:"140px",position:"absolute"}}>
                <button type="submit" className="button2">Login</button>
              </div>
              <div className="link1" style={{top:"250px"}}>
                  Don't have an account? <Link to="/signup" style={{top:"10px",position:"relative"}}>Create Account</Link>
              </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}