import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";

export default function Signup() {
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");

    const validateUrPw = () => {
        //Username Validation
        if (!uname) {
            alert("Please enter the user name");
            return false;
        }
        if (uname.length < 3) {
            alert("User name must be at least 'THREE' characters");
            return false;
        }
        //Email Validation
        if (!email) {
            alert("Please enter a valid email address");
            return false;
        }
        const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return false;
        }

        //Password Validation
        if (!pw1) {
            alert("Please enter the password");
            return false;
        }
        if (pw1.length < 6) {
            alert("Password must contain at least 6 characters");
            return false;
        }
        if (!pw2) {
            alert("Please confirm the password");
            return false;
        }
        if (pw1 !== pw2) {
            alert("Password mismatched! Please enter the correct password.");
            return false;
        }
        return true;
    };

    //Form Validation
    const handleSignup = (e) => {
        e.preventDefault();
        if (validateUrPw()) {
            console.log("Valid form submitted");
        }
    };

    return (
        <>
        <Navbar/>
        <div className="main">
            <div className="sub-main">
                <h1 className="title">Sign-Up</h1>
                <div className="contnt">
                    <form onSubmit={handleSignup}>
                        <input type="text" placeholder="User Name" value={uname} onChange={(e) => setUname(e.target.value)} className="input-signup"/>
                        <br />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-signup"/>
                        <br />
                        <input type="password" style={{marginRight: "32px"}} placeholder="Password" value={pw1} onChange={(e) => setPw1(e.target.value)} className="input-signup"/>
                        <input type="password" placeholder="Confirm Password" value={pw2} onChange={(e) => setPw2(e.target.value)} className="input-signup"/>

                        <div className="Login-button">
                            <button className="button2">Register</button>
                        </div>
                    </form>
                </div>
                <div className="link1">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
        </>
    );
}