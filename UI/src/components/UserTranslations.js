import React, {useEffect,useState,useRef} from 'react'
import Navbar from './navbar/Navbar'
import nav from './images/navicon.png'
import { Link, useNavigate } from 'react-router-dom';

export default function UserTranslations({ isLoggedIn, setLoggedIn }) {
    
    const [username, setUsername] = useState("");
    const [translations, setTranslations] = useState([]);
    const [loading, setLoading] = useState(true);
    const textRef = useRef(null);
    const fileRef = useRef(null);
    const imgRef = useRef(null);
    const navigate = useNavigate();
    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    };

    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    };
    
    const handleTranslateNow = () => {
    // Check if user is logged in (you can implement your logic here)
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/translate');
        }
    };

    const downloadFile = async (id, filename) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/user-translations/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
        if (!response.ok) {
          alert("Download failed");
          return;
        }
      
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const handleDeleteTranslation = (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;
    
        if (window.confirm('About to delete a translation. Are you sure?')) {
            fetch(`http://localhost:3001/user-translations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to delete');
                    setTranslations(translations.filter(t => t.id !== id));
                })
                .catch((err) => {
                    console.error('Error deleting translation:', err);
                    alert('Failed to delete translation.');
                });
        }
    };

    // Fetch user-specific translations from the backend
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedToken = localStorage.getItem('token');

        if (storedUsername) {
            setUsername(storedUsername);

            fetch(`http://localhost:3001/user-translations/${storedUsername}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) throw new Error('Failed to fetch');
                    return response.json();
                })
                .then((data) => {
                    setTranslations(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching translations:', err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [isLoggedIn]);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/', { replace: true })
        window.location.reload();
    };

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            <div id="mySidenav" className="sidenav">
                <button className="closebtn" onClick={closeNav}>&times;</button>
                <Link to="#" onClick={() => textRef.current?.scrollIntoView({ behavior: "smooth" })}>Text Translations</Link>
                <Link to="#" onClick={() => fileRef.current?.scrollIntoView({ behavior: "smooth" })}>File Translations</Link>
                <Link to="#" onClick={() => imgRef.current?.scrollIntoView({ behavior: "smooth" })}>Image Translations</Link>
                <Link onClick={handleTranslateNow}>Translate</Link>
                <Link to='/Signup'>Sign Up</Link>
                <Link onClick={handleLogout}>Log Out</Link>
            </div>
            <button className="sidebtn" onClick={openNav}><img src={nav} alt="nav" /></button>

            <div className="usertranslation">
                <h2>{isLoggedIn && username ? username : "User"}, here's what you have translated before.</h2>
                <div className="cont_tran">
                    {loading ? (
                        <h4>Loading your translations...</h4>
                    ) : translations.length === 0 ? (
                        <h4>You have no translations yet &#x1F61E;. <br></br>Please Translate some Text, Files or Images then comeback here.</h4>
                    ) : (
                    <>
                        <h4 ref={textRef}> Text Translations</h4>
                        <ul className='cont_tran_text'>
                            {translations.filter(t => t.type === 'text').map((translation) => (
                                <li key={translation.id} style={{ marginBottom: '1.5rem' }}>
                                    <p style={{fontSize:'20px'}}>
                                        <em style={{fontWeight:'1000'}}>Uploaded on:</em> {new Date(translation.created_at).toLocaleDateString()} {new Date(translation.created_at).toLocaleTimeString()}
                                    </p>
                                    <strong style={{textDecoration:'underline', fontSize:'25px'}}>Input:</strong><br></br> <p style={{fontSize:'18px'}}>{translation.input_text}</p>
                                    <strong style={{textDecoration:'underline', fontSize:'25px'}}>Translated:</strong><br></br> <p style={{fontSize:'18px'}}>{translation.translated_text}</p>
                                    <button className="txtdel" onClick={() => handleDeleteTranslation(translation.id)} >Delete</button>
                                </li>
                            ))}
                        </ul>

                        <h4 ref={fileRef}> File Translations</h4>
                        <ul className='cont_tran_file'>
                            {translations.filter((t) => t.type === 'file' || t.type === 'pdf').map((file) => (
                                <li key={file.id} style={{ marginBottom: '1.5rem' }}>
                                    <p style={{ fontSize: '20px' }}>
                                        <em style={{ fontWeight: '1000' }}>Uploaded on:</em>{' '}
                                        {new Date(file.created_at).toLocaleDateString()}{' '}
                                        {new Date(file.created_at).toLocaleTimeString()}
                                    </p>
                                    <p style={{ fontSize: '18px' }}>
                                        <strong>Filename:</strong> {file.filename}
                                    </p>
                                    <div style={{display:'flex'}}>
                                        <button className="filedlbt" onClick={() => downloadFile(file.id, file.filename)}>Download File</button>
                                        <br />
                                        <button className="filedel" onClick={() => handleDeleteTranslation(file.id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <h4 ref={imgRef}> Image Translations</h4>
                        <ul className='cont_tran_img'>
                            {translations.filter((t) => t.type === 'image').map((file) => (
                                <li key={file.id} style={{ marginBottom: '1.5rem' }}>
                                    <p style={{ fontSize: '20px' }}>
                                        <em style={{ fontWeight: '1000' }}>Uploaded on:</em>{' '}
                                        {new Date(file.created_at).toLocaleDateString()}{' '}
                                        {new Date(file.created_at).toLocaleTimeString()}
                                    </p>
                                    <p style={{ fontSize: '18px' }}>
                                        <strong>Filename:</strong> {file.filename}
                                    </p>
                                    <button button className="imgdlbt" onClick={() => downloadFile(file.id, file.filename)}>Download File</button>
                                    <br />
                                    <button className="imgdel" onClick={() => handleDeleteTranslation(file.id)}>
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                    )}
                </div>
            </div>
        </>
    );
}