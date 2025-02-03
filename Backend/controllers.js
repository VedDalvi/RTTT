const fs = require('fs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const { generateToken } = require('./utils/jwt');
const db = new sqlite3.Database('./database.sqlite');

// CREATE USERS TABLE (if not exists)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table created successfully.');
        }
    });
});

// User Registration
exports.signup = (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password], (err) => {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ message: 'Username or email already exists' });
                }
                return res.status(500).json({ message: 'Database error' });
            }
            // Generate token with user ID (lastID is the newly created user’s ID)
            const token = generateToken(this.lastID); 

            res.status(201).json({ 
                message: 'User registered successfully',
                token: token
            });
        });
};

// User Login
exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user.id);
        res.status(200).json({
            message: 'Login successful',
            token: token, // Send the token to the client
            userId: user.id,
            username: user.username
        });
    });
};

// User Deletion
exports.deleteUser = (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required to delete a user' });
    }
    
    db.run(`DELETE FROM users WHERE email = ?`, [email], function (err) {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the header (Bearer token)
  if (!token) {
    return res.status(403).json({ message: 'Token missing or invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId; // Attach userId to request
    next();
  });
};

// Delete uploaded Files (Existing Functionality)
exports.deleteFile = (filePath) => {
    if (fs.existsSync(filePath)) {
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