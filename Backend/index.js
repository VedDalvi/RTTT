const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const mysql = require('mysql');
const { register,login } = require("./controllers.js");
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
  res.send(req.file.filename)
});

app.post('/upload/image', upload.single('image'), function (req, res, next) {
  console.log(req.file.filename);
  res.send(req.file.filename)
});

app.post('/register', register);

app.post('/login', login);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})