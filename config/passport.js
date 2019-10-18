const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
// const User = mongoose.model('users')
const User = require('../model/User.js')
const { secretOrKey } = require('./keys')

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretOrKey
}

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User
      .findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, flase)
      })
      .catch(err => {
        console.log9err
      })
  }))
}