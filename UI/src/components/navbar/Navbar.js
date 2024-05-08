import React from 'react'
import def from './ico.png'
import usr from './user.png'
import abt from './abt.png'
import home from './home.png'
import sep from './separator.png'
import { Link, useLocation, useNavigate} from 'react-router-dom';

export default function Navbar({isLoggedIn, setLoggedIn}) {
    const location = useLocation();
    const navigate = useNavigate();
    // Function to render the home button
    const renderHomeButton = () => {
        return (
        <Link style={{ textDecoration: 'none' }} to="/" className="link">
            <button className="bton" href="/">
            <img src={home} width="40" height="40" className="img-fluid" alt="" />&emsp;Home
            </button>
        </Link>
        );
    };

    const handleLogout = () => {
        navigate('/', { replace: true })
        setLoggedIn(false);
    };

    // Render Navbar with only home button on login page
    if (location.pathname === "/login" || location.pathname === "/signup") {
        return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="layout1a">
                <img src={def} className="logo" width="70" height="70" alt="" />Real Time Text Translator<img className="separator1" src={sep} width="5" height="70" alt="" />
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                {renderHomeButton()}
                </ul>
            </div>
            </nav>
        </div>
        );
    }

  return (
    <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="layout1a">
            <img src={def} className="logo" width="70" height="70" alt=""/>Real Time Text Translator<img className="separator1" src={sep} width="5" height="70" alt=""/>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <Link style={{textDecoration:'none'}} to="/about" className="link"><button className="bton" href="/" >
                        <img src={abt} width="40" height="40" className="img-fluid" alt=""/>&emsp;About
                        </button></Link>

                    <Link style={{textDecoration:'none'}} to="/" className="link"><button className="bton" href="/" >
                        <img src={home} width="40" height="40" className="img-fluid" alt=""/>&emsp;Home
                        </button></Link>

                    <li className="nav-item dropdown">
                        <button className="bton" href="/" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={usr} width="40" height="40" className="img-fluid" alt=""/>&emsp;User
                        </button>
                        <form className="dropdown-menu p-4">
                        {isLoggedIn ? (
                            <>
                                <button type="submit" className="btn btn-primary" onClick={handleLogout}>Logout</button><br/><br/>
                                <Link className="btn btn-primary">Translations</Link>
                            </>
                        ) : (
                            <>
                                <p>Please login to continue</p>
                            </>
                        )}
                        </form>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}