require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const storiesRoutes = require('./routes/stories');
const userRoutes = require('./routes/user');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UserImage = require('./models/userImageModel');

const app = express();
console.log('MONGO_URI:', process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('File received:', req.file); // Log received file details
  UserImage.create({ image: req.file.filename })
    .then(result => res.json({ success: true, result }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ success: false, error: 'Database error' });
    });
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

app.use('/api/stories', storiesRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB and listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log('Database connection error:', error);
  });

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  User.signup(name, email, password)
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ error: err.message }));
});
