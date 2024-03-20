import React from "react";
export default function Login() {
  return (
    <>
        <div className="main">
            <div className="sub-main">
                <div className="title">
                    <h1>Sign-Up</h1>
                </div>

                <div className="textt">                    
                    <input type=" text " placeholder="User Name " className="input-signup" />                    
                    <br/>
                    <br/>
                    <input type="email" placeholder="Email " className="input-signup"/>
                    <br/>
                    <br/>                    
                    <input type=" password " placeholder="Password " className="input-signup"/>                    
                </div>
                <div className="Login-button">
                    <button className="button2"> Register </button>
                </div>
                    <div className="link1">
                        <p>
                            Already have an account? <a href="/">Sign in</a>
                        </p>
                    </div>
            </div>
        </div>
    </>
  );
}