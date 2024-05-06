const fs = require('fs');
 const mysql = require('mysql');
 require('dotenv').config();
 

 const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
 });

// Connect to the database
 connection.connect((err) => {
     if (err) {
         console.error('Error connecting to database:', err);
         return;
     }
     console.log('Connected to MySQL database');
 });



 exports.register = function (req, res) {
     const { username, password, email } = req.body;

     // Check if the username already exists
     connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
         if (err) {
             console.error('Error executing query:', err);
             res.status(500).json({ error: 'Internal Server Error' });
             return;
         }

         if (results.length > 0) {
             res.status(400).json({ error: 'Username or Email already exists' });
             return;
        }


         // Insert the new user into the database
         connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], (err) => {
             if (err) {
                 console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                 return;
             }

             res.status(201).json({ message: 'User registered successfully' });
         });
     });
 };

 exports.login = function (req, res){
     const { email, password, } = req.body;

     connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
         if (err) {
             console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
         }

         if (results.length > 0) {
             res.status(200).json({ message: 'Login successful' });
         } else {
            res.status(401).json({ error: 'Invalid credentials' });
         }
     });
 };

exports.deleteFile = (filePath) => {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return;
            }
            console.log('File deleted successfully');
        });
    } else {
        console.log('File not found');
    }
};