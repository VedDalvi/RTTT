const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const mysql = require('mysql');
const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');
const bodyParser = require('body-parser');
var logger = require('morgan');

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
app.use(logger('dev'));
app.use(cors());
app.use(express.static('C:\\Users\\Rutij\\Desktop\\Project\\RTTT\\OCR\\content'));
//TEXT
app.post('/text', function(req, res, next) {
  const { iptext } = req.body;
  console.log("Input text:", iptext);

  let translatedText = '';

  // Spawn a Child process to execute the py script
  const pythonProcess = spawn('python', [process.env.textTrans, iptext],{env: { ...process.env, PYTHONIOENCODING: 'utf-8' }});

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script stdout: ${data}`);
    translatedText += data.toString('utf-8');
    res.json({translatedText});
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
    res.status(500).json({ error: 'An error occurred during translation' });
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script child process exited with code ${code}`);
  });
});

//PDF
app.post('/upload/pdf', upload.single('file'), function (req, res, next) {
  console.log(req.file.filename);
  const filePath = path.join(process.env.uploads, req.file.filename);

  // Spawn a child process to execute the Python script
  const pythonProcess = spawn('python', [process.env.file, filePath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script child process exited with code ${code}`);
    const translatedFileUrl = process.env.transFile;
    res.json({'translatedFileUrl': 'http://localhost:3001/translated_output.docx'});
  });

  setTimeout(()=>deleteFile(process.env.uploads + "/" + req.file.filename),7000);
});

//IMAGE
app.post('/upload/image', upload.single('image'), function (req, res, next) {
  console.log(req.file.filename);
  const imagePath = path.join(process.env.uploads, req.file.filename);
  
  // Spawn a child process to execute the Python script for image translation
  const pythonProcess = spawn('python', [process.env.file, imagePath]); 

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script child process exited with code ${code}`);
    const translatedFileUrl = process.env.transFile;
    res.json({'translatedFileUrl': 'http://localhost:3001/translated_output.docx'});
  });

  setTimeout(()=>deleteFile(process.env.uploads + "/" + req.file.filename), 7000)
});

//VIDEO
app.post('/upload/video', upload.single('video'), function (req, res, next) {
  console.log(req.file.filename);
  const videoPath = path.join(process.env.uploads, req.file.filename);

  // Spawn a child process to execute the Python script for Video Captioning
  const pythonProcess = spawn('python', [process.env.caption, videoPath]); 

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script child process exited with code ${code}`);
    const translatedFileUrl = process.env.transFile;
    res.json({'translatedFileUrl': 'http://localhost:3001/translated_output.docx'});
  });

  setTimeout(()=>deleteFile(process.env.uploads + "/" + req.file.filename),7000);
});


// app.post('/register', register);
// app.post('/login', login);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})