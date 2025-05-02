import React,{ useEffect,useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';   //Importing React Router
import Homepage from './components/Homepage';
import Translate from './components/Translate';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserTranslations from './components/UserTranslations';

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState();
  useEffect(() => {
    // Check if token is present in localStorage and if it's valid
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true); // If token exists, the user is logged in
    } else {
      setLoggedIn(false); // No token means user is not logged in
    }
  }, []); // Empty dependency array ensures this runs once when the app is loaded

  //createBrowserRouter is the recommended router for all React Router web projects. It uses the DOM History API to update the URL and manage the history stack.
  const router = createBrowserRouter([

    //Array of Route objects
    {
      path:'/',//The basename of the app for situations where you can't deploy to the root of the domain, but a sub directory.'/' is used for Landingpage here
      element:<Homepage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
    },
    {
      path:'/translate',
      element:<ProtectedRoute> <Translate isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/> </ProtectedRoute>
    },
    {
      path:'/about',
      element:<About isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/user-translations',
      element:<ProtectedRoute> <UserTranslations isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/> </ProtectedRoute>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>     {/*All data router objects are passed to this component to render your app and enable the rest of the data APIs.*/}
    </>
  );
}