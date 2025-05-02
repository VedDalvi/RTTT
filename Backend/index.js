const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const fs = require('fs');
var logger = require('morgan');

const {signup, login, verifyToken, saveTextTranslationtoDB, 
      downloadTranslatedFile, getTextTranslationfromDB, deleteTranslationFromDB, 
      deleteUser,deleteFile } = require("./controllers.js");
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
app.use(express.static('C:\\Users\\Rutij\\Desktop\\Project\\RTTT\\Captioning\\content'));

//TEXT
app.post('/text', function(req, res, next) {
  const { iptext, lang1, lang2  } = req.body;
  console.log("Input text:", iptext);
  console.log("Source language:", lang1);
  console.log("Target language:", lang2);

  let translatedText = '';

   // Convert language names to ISO codes to fix problem with API not recognising text properly
   const languageCodes = {
    'English': 'en',
    'Konkani': 'gom'
  };
  
  const sourceLangCode = languageCodes[lang1];
  const targetLangCode = languageCodes[lang2];

  // Spawn a Child process to execute the py script
  const pythonProcess = spawn('python', [process.env.textTrans, iptext, sourceLangCode, targetLangCode],{env: { ...process.env, PYTHONIOENCODING: 'utf-8' }});

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
  const pythonProcess = spawn('python', [process.env.file, filePath], {env: { ...process.env, PYTHONIOENCODING: 'utf-8' }});

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script child process exited with code ${code}`);
    const translatedFileUrl = process.env.transFile;
    try {
      const pathToDocxFile = process.env.transFile;
      const originalInputName = req.file.originalname.replace(/\.[^/.]+$/, '');
      const originalName = `${originalInputName}_translated.docx`;
      const fileBuffer = fs.readFileSync(pathToDocxFile);
      const userId = req.user?.id || req.body.userId;

      if (!userId) {
        return res.status(400).send('Missing user ID');
      }

      db.query(
        `INSERT INTO translations (user_id, type, file_data, filename) VALUES (?, ?, ?, ?)`,
        [userId, 'file', fileBuffer, originalName],
        (err, results) => {
          if (err) {
            console.error('DB insert error:', err);
            return res.status(500).send('Failed to save file to DB');
          }
          res.json({ 'translatedFileUrl': 'http://localhost:3001/translated_output.docx' });
        }
      );
    } catch (err) {
      console.error('File read error:', err);
      res.status(500).send('Could not read translated file');
    }
  });
  setTimeout(()=>deleteFile(process.env.uploads + "/" + req.file.filename),7000);
});

//IMAGE
app.post('/upload/image', upload.single('image'), function (req, res, next) {
  console.log(req.file.filename);
  const imagePath = path.join(process.env.uploads, req.file.filename);
  
  // Spawn a child process to execute the Python script for image translation
  const pythonProcess = spawn('python', [process.env.file, imagePath], {env: { ...process.env, PYTHONIOENCODING: 'utf-8' }}); 

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script child process exited with code ${code}`);
    const translatedFileUrl = process.env.transFile;
    try {
      const pathToDocxFile = process.env.transFile;
      const originalInputName = req.file.originalname.replace(/\.[^/.]+$/, '');
      const originalName = `${originalInputName}_translated.docx`;
      const fileBuffer = fs.readFileSync(pathToDocxFile);
      const userId = req.user?.id || req.body.userId;

      if (!userId) {
        return res.status(400).send('Missing user ID');
      }

      db.query(
        `INSERT INTO translations (user_id, type, file_data, filename) VALUES (?, ?, ?, ?)`,
        [userId, 'image', fileBuffer, originalName],
        (err, results) => {
          if (err) {
            console.error('DB insert error:', err);
            return res.status(500).send('Failed to save file to DB');
          }
          res.json({ 'translatedFileUrl': 'http://localhost:3001/translated_output.docx' });
        }
      );
    } catch (err) {
      console.error('File read error:', err);
      res.status(500).send('Could not read translated file');
    }
  });

  setTimeout(()=>deleteFile(process.env.uploads + "/" + req.file.filename), 7000)
});

//VIDEO
app.post('/upload/video', upload.single('video'), function (req, res, next) {
  console.log(req.file.filename);
  const videoPath = path.join(process.env.uploads, req.file.filename);

  // Spawn a child process to execute the Python script for Video Captioning
  const pythonProcess = spawn('python', [process.env.caption, videoPath], {env: { ...process.env, PYTHONIOENCODING: 'utf-8' }}); 

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script child process exited with code ${code}`);
    const translatedFileUrl = process.env.transVid;
    const ZipUrl = process.env.transVid;
    res.json({'translatedFileUrl': 'http://localhost:3001/translated_video.mp4','ZipUrl': 'http://localhost:3001/transcripts.zip'});
  });
  
});

app.post('/signup', signup);
app.post('/login', login);
app.delete('/delete', deleteUser);
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

app.post('/user-translations/:userId', verifyToken, saveTextTranslationtoDB);
app.get('/user-translations/:id([0-9]+)', downloadTranslatedFile);
app.get('/user-translations/:username',verifyToken, getTextTranslationfromDB);
app.delete('/user-translations/:id', verifyToken, deleteTranslationFromDB);

app.listen(port, () => {
  console.log(`${port}`)
})