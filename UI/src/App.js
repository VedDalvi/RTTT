import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import Translate from './components/Translate';
import About from './components/About'
import Signup from './components/Signup';

export default function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Homepage/>
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
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}