const express = require('express');
const ejs = require('ejs');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Set up routes
const userController = require('./controller/userController.js');
app.get('/login',userController.getLogin)
app.post("/login",userController.postLogin);
app.get('/register', userController.getRegister);
app.post('/register', upload.single('profilePicture'), userController.postRegister);
app.get('/user/:userName', userController.getUser);

// Start server
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
