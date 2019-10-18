const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  type: {
    type: String,
  },
  desc: {
    type: String
  },
  income: {
    type: String
  },
  expend:{
    type: String
  },
  cash: {
    type: String
  },
  remark: {
    type: String    
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('profile', ProfileSchema)