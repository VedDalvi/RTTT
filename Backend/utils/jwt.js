const jwt = require('jsonwebtoken');
//Generate a JSON Web Token with a 24h duration.
//Used to ensure only a logged in user can access the translation features on website.
//This token is also used by the react-app in ProtectedRoute.js to ensure the previous comment.

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};