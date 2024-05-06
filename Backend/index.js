const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const mysql = require('mysql');
const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');
const bodyParser = require('body-parser');

const { register,login,deleteFile } = require("./controllers.js");
require('dotenv').config();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.uploads)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
const app = express()
const port = 3001

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/upload/pdf', upload.single('file'), function (req, res, next) {
  console.log(req.file.filename);
  const filePath = path.join(process.env.uploads, req.file.filename);

  // Spawn a child process to execute the Python script
  const pythonProcess = spawn('python', ['C:\\Users\\Rutij\\Desktop\\Project\\RTTT\\OCR\\Tesseract_OCR_test.py', filePath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script child process exited with code ${code}`);
    // Send response indicating success
  });

  setTimeout(()=>deleteFile(process.env.uploads + "/" + req.file.filename),7000);
  res.send(req.file.filename)
});

app.post('/upload/image', upload.single('image'), function (req, res, next) {
  console.log(req.file.filename);
  const imagePath = path.join(process.env.uploads, req.file.filename);
  
  // Spawn a child process to execute the Python script for image translation
  const pythonProcess = spawn('python', ['C:\\Users\\Rutij\\Desktop\\Project\\RTTT\\OCR\\Tesseract_OCR_test.py', imagePath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script child process exited with code ${code}`);
    // Send response indicating success
  });

  setTimeout(()=>deleteFile(process.env.uploads + "/" + req.file.filename), 7000)
  res.send(req.file.filename)
});

// app.post('/register', register);
// app.post('/login', login);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})