const express = require('express')
const cors = require('cors');
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/user/Desktop/Project_RTTT/RTTT/Backend/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
const app = express()
const port = 3001

app.post('/upload/pdf', upload.single('file'), function (req, res, next) {
  console.log(req.file.filename);
  res.send(req.file.filename)
});

app.post('/upload/image', upload.single('image'), function (req, res, next) {
  console.log(req.file.filename);
  res.send(req.file.filename)
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})