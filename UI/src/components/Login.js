import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar/Navbar';
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlelogin = (e) => {
        e.preventDefault();
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
              <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-signup"/>
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