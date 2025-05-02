const fs = require('fs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { generateToken } = require('./utils/jwt');
const db = require('./db')
const path = require('path');

// User Registration
exports.signup = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  const values = [username, email, password];

  db.query(query, values, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Username or email already exists' });
      }
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    const userId = result.insertId;
    const token = generateToken(userId);

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

  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], (err, results) => {
    if (err) {
        return res.status(500).json({ message: 'Database error' });
    }
    
    const user = results[0];
    
    console.log('User from DB:', user);
    console.log('Provided password:', password);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    res.status(200).json({
      message: 'Login successful',
      token: token,
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

  const query = `DELETE FROM users WHERE email = ?`;
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
};

// 🟡 JWT TOKEN VERIFICATION
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token missing or invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

//Functions to Save & Get Translations from DB
exports.saveTextTranslationtoDB = (req, res) => {
    const userId = req.params.userId;
    const { type, inputText, translatedText } = req.body;
  
    const query = 'INSERT INTO translations (user_id, type, input_text, translated_text) VALUES (?, ?, ?, ?)';
    db.query(query, [userId, type, inputText, translatedText], (err, result) => {
      if (err) {
        console.error('Error saving translation:', err);
        return res.status(500).json({ message: 'Error saving translation' });
      }
      res.status(201).json({ message: 'Translation saved successfully' });
    });
};
exports.downloadTranslatedFile = (req, res) => {
  console.log(`Download route hit for ID: ${req.params.id}`);

  const fileId = req.params.id;
  const sql = 'SELECT file_data, filename, type FROM translations WHERE id = ?';

  db.query(sql, [fileId], (err, results) => {
    if (err) {
      console.error('Download error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    const file = results[0];

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}.docx"`);
    res.send(file.file_data);
  });
};
exports.getTextTranslationfromDB = (req, res) => {
  const username = req.params.username;
  const getUserQuery = 'SELECT id FROM users WHERE username = ?';
  db.query(getUserQuery, [username], (err, userResults) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (userResults.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = userResults[0].id;

    const getTranslationsQuery = 'SELECT * FROM translations WHERE user_id = ? ORDER BY created_at DESC';
    db.query(getTranslationsQuery, [userId], (err, translationResults) => {
      if (err) {
        console.error('Error fetching translations:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(200).json(translationResults);
    });
  });
};
exports.deleteTranslationFromDB = (req, res) => {
  const translationId = req.params.id;
  const query = 'DELETE FROM translations WHERE id = ?';
  
  db.query(query, [translationId], (err, result) => {
    if (err) {
      console.error('Error deleting translation:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json({ message: 'Translation deleted successfully' });
  });
};
// 🟡 FILE DELETION
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