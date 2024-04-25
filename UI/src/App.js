import React,{ useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';   //Importing React Router
import Homepage from './components/Homepage';
import Translate from './components/Translate';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  //createBrowserRouter is the recommended router for all React Router web projects. It uses the DOM History API to update the URL and manage the history stack.
  const router = createBrowserRouter([

    //Array of Route objects
    {
      path:'/',//The basename of the app for situations where you can't deploy to the root of the domain, but a sub directory.'/' is used for Landingpage here
      element:<Homepage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
    },
    {
      path:'/translate',
      element:<Translate/>
    },
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/login',
      element:<Login setLoggedIn={setLoggedIn}/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>     {/*All data router objects are passed to this component to render your app and enable the rest of the data APIs.*/}
    </>
  );
}