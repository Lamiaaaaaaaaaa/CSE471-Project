require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const storiesRoutes = require('./routes/stories');
const userRoutes = require('./routes/user');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

// app.post('/upload', upload.single('file'), (req, res) => {
//   console.log('File received:', req.file); 
//   UserImage.create({ image: req.file.filename })
//     .then(result => res.json({ success: true, result }))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ success: false, error: 'Database error' });
//     });
// });

app.post('/upload', upload.single('file'), (req, res) => {
  const { userId } = req.body; // Get userId from the request body

  console.log('File received:', req.file); 
  if (!userId) {
    return res.status(400).json({ success: false, error: 'User ID is required' });
  }

  UserImage.create({ userId, image: req.file.filename })
    .then(result => res.json({ success: true, result }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ success: false, error: 'Database error' });
    });
});



app.delete('/api/user/delete-profile-picture', async (req, res) => {
  const { userId } = req.body; // Replace with actual user ID retrieval mechanism

  try {
    // Find and delete the user's image record
    const userImage = await UserImage.findOneAndDelete({ userId: userId });
    if (userImage) {
      // Optionally, delete the file from the filesystem
      const imagePath = path.join(__dirname, 'public/Images', userImage.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ success: false, error: 'Error deleting profile picture' });
  }
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


