import React from 'react';
import { Navigate } from 'react-router-dom';

//This is to ensure that only a logged in user can access the main functionalities of the website.
//That means trying to access a link such as http://localhost:3000/translate without loggin in first would
//redirect that user to the login page.
//Login generates a 'token' stored in local storage, which will expire after 24h as specified in the node js script to generate jwt tokens.
//Import this file to main app.js where you have setup your react router to protect important links you wish only logged in user should access.

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;