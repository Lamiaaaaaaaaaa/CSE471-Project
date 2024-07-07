require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const storiesRoutes = require('./routes/stories');
const userRoutes = require('./routes/user');
const cors = require('cors');
const mernModel = require('./models/userModel')
const app = express();

console.log('MONGO_URI:', process.env.MONGO_URI);
//Middleware
app.use(express.json());
app.use(cors());

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
  mernModel.create(req, body)
  .then(user => res.json(user))
  .catch(err => res.json(err))
})
