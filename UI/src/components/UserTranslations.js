import React, {useEffect,useState} from 'react'
import Navbar from './navbar/Navbar'
import nav from './images/navicon.png'
import { Link, useNavigate } from 'react-router-dom';

export default function UserTranslations({ isLoggedIn, setLoggedIn }) {
    
    const [username, setUsername] = useState("");
    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    };

    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    };

    const navigate = useNavigate();
    
    const handleTranslateNow = () => {
    // Check if user is logged in (you can implement your logic here)
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/translate');
        }
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/', { replace: true })
        window.location.reload();
    };

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
            <div id="mySidenav" className="sidenav">
                <button className="closebtn" onClick={closeNav}>&times;</button>
                <Link onClick={handleTranslateNow}>Translate</Link>
                <Link to='/Signup'>Sign Up</Link>
                <Link onClick={handleLogout}>Log Out</Link>
            </div>
            <button className="sidebtn" onClick={openNav}><img src={nav} alt=""/></button> 
            <div className="container">
            This is where translations of {isLoggedIn && username ? ( <>{username}</> ) : ( <>User</> )} will be displayed.
            </div>
        </>
    )
}
