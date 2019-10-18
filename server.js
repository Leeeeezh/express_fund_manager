const express = require('express')
const mongoose = require('mongoose')
const { dbSrc } = require('./config/keys.js')
const users = require('./routes/api/users.js')
const profiles = require('./routes/api/profiles.js')
const bodyParser = require('body-parser')
const passport = require('passport')

mongoose
  .connect(dbSrc, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB Connected')
  })
  .catch(err => {
    console.log(err)
  })

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./config/passport.js')(passport)
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use(express.static(__dirname + '/client/dist'))
const port = process.env.PORT || 8088

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`)
})