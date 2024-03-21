import React, { useRef } from 'react'
import Navbar from './navbar/Navbar';
import arr from './images/rightar.png'
import nav from './images/navicon.png'
import Format from './format/Format'
import Features from './features/Features'
import { Link } from 'react-router-dom';

export default function Homepage(props) {
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  const formatRef = useRef(null);
  const featuresRef = useRef(null);
  return (
    <div>
      <Navbar />
      <div id="mySidenav" className="sidenav">
        <button className="closebtn" onClick={closeNav}>&times;</button>
        <Link to="#" onClick={() => formatRef.current.scrollIntoView({ behavior: "smooth" })}>Formats Supported</Link>
        <Link to="#" onClick={() => featuresRef.current.scrollIntoView({ behavior: "smooth" })}>Features</Link>
        <Link to='/Translate'>Translate</Link>
        <Link to='/Signup'>Sign Up</Link>
        <Link to='/Login'>Log in</Link>
      </div>
      <button className="sidebtn" onClick={openNav}><img src={nav} alt=""/></button> 
      <div className="container">
        <div className="layout1">
            <div className="layout1b">
                <font style={{top:'10px',position: 'relative'}}>Offers translation of <b>English Documents</b> to <b>Konkani</b>.<br/>Supports <b>plain text, documents</b> and <b>image</b> translations.<br/><br/>
                Also <b>video captioning</b> from <b>English to Konkani</b> is supported.</font>
            </div>
            <Link style={{textDecoration: 'none'}} to="/translate" className="button1"><img src={arr} alt="" /><font>TRANSLATE NOW</font></Link>
            <div className="layout1c">
              Reliable and hassle-free Translations
            </div>
        </div>
        <div className="layout2" ref={formatRef}>
          <div className="layout2a" >
            <font>Supported Formats</font>
            <div className="layout2a1">Upload your files in one of these formats.</div>
          </div>
          <div className="layout2b" >
            <Format />
          </div>
        </div>
        <div className="layout3" ref={featuresRef}>
          <div className="layout3a">
            <font>Features</font>
          </div>
          <Features />
        </div>
      </div>
    </div>
  )
}