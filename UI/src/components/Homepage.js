import React, {useEffect,useState,useRef} from 'react'
import Navbar from './navbar/Navbar';
import arr from './images/rightar.png'
import nav from './images/navicon.png'
import Format from './format/Format'
import Features from './features/Features'
import { Link, useNavigate } from 'react-router-dom';

export default function Homepage({ isLoggedIn, setLoggedIn }) {
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  const topRef = useRef(null);
  const formatRef = useRef(null);
  const featuresRef = useRef(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
      
  useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
          setUsername(storedUsername);
      }
  }, []);
    
  const handleTranslateNow = () => {
    // Check if user is logged-in to allow using website
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/translate');
    }
  };

  const handleTranslations = () => {
    // Check if user is logged-in to view their translations
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/user-translations');
    }
  };

  const handleLogout = () => {
      localStorage.removeItem('token');
      setLoggedIn(false);
      navigate('/', { replace: true })
      window.location.reload();
  };
  return (
    <div ref={topRef}>
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
      <div id="mySidenav" className="sidenav">
        <button className="closebtn" onClick={closeNav}>&times;</button>
        <Link to="#" onClick={() => topRef.current.scrollIntoView({ behavior: "smooth" })}>Home</Link>
        <Link to="#" onClick={() => formatRef.current.scrollIntoView({ behavior: "smooth" })}>Formats Supported</Link>
        <Link to="#" onClick={() => featuresRef.current.scrollIntoView({ behavior: "smooth" })}>Features</Link>
        <Link onClick={handleTranslateNow}>Translate</Link>
        <Link onClick={handleTranslations}>Previous Translations</Link>
        {isLoggedIn && username ? (
          <>
            <Link onClick={handleLogout}>Log Out</Link>
          </>
        ) : (
          <>
            <Link to='/Signup'>Sign Up</Link>
            <Link to='/Login'>Log in</Link>
          </>
        )}
        
      </div>
      <button className="sidebtn" onClick={openNav}><img src={nav} alt=""/></button> 
      <div className="container">
        <div className="layout1">
            <div className="layout1b">
                <font style={{top:'10px',position: 'relative'}}>Offers translation of <b>English Documents</b> to <b>Konkani</b>.<br/>Supports <b>plain text, documents</b> and <b>image</b> translations.<br/><br/>
                Also <b>video captioning</b> from <b>English to Konkani</b> is supported.</font>
            </div>
            <Link style={{textDecoration: 'none'}} onClick={handleTranslateNow} className="button1"><img src={arr} alt="" /><font>TRANSLATE NOW</font></Link>
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