require('dotenv').config();


const express = require('express')
const mongoose = require('mongoose');
const storiesRoutes = require('./routes/stories')
const userRoutes = require('./routes/user')


const app = express()


app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get("/", (req, res) => {
    res.json({mssg: "Welcome to the app"})
})

//routes
app.use('/api/stories',storiesRoutes)
app.use('/api/user',userRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log('connected to the database listening on port ', process.env.PORT)
    
    })
  })
  .catch((error) => {
    console.log(error)
  })



