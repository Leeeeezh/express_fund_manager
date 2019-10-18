const express = require('express')
const router = express.Router()
const User = require('../../model/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretOrKey } = require('../../config/keys.js')
const passport = require('passport')

router.get('/test', (req,res)=>{
  res.json({
    msg: 'test'
  })
})

router.post('/register', (req, res) => {
  const email = req.body.email
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(409).json({ msg: "该邮箱已被注册" })
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role
        })

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash
            newUser
              .save()
              .then(user => res.json({
                msg: 'Register Successfully',
                name: req.body.name,
                email: req.body.email,
                role: req.body.role
              }))
              .catch(err => {
                console.log(err)
              })
          })
        })
      }
    })
})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ msg: 'User is not exist' })
      }

      bcrypt
        .compare(password, user.password)
        .then(result => {
          if (result) {
            const rule = {
              id: user.id,
              name: user.name,
              role: user.role,
              email: user.email
            }
            jwt.sign(rule, secretOrKey, {
              expiresIn: 3600
            }, (err, token) => {
              if (err) {
                throw err
              }
              res.json({
                msg: 'success',
                token: 'Bearer ' + token
              })
            })
          } else {
            return res
              .status(401)
              .json({ msg: 'Password incorrect' })
          }
        })
    })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    msg: 'success',
    id: req.user.id,
    email: req.user.email,
    role: req.user.role
  })
})


module.exports = router