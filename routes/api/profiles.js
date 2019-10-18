const express = require('express')
const router = express.Router()
const passport = require('passport')

const Profile = require('../../model/Profile.js')

// @route GET /api/profile/test
// @desc  返回请求得json数据
//  access public
router.get('/test', (req, res) => {
  res.json({
    msg: 'profile works'
  })
})

//  @route POST /api/profile/add
//  @desc 创建信息接口
//  access private
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  let profileFields = {}
  profileFields = req.body

  new Profile(profileFields)
    .save()
    .then(profile => {
      res.json(profile)
    })
})

//@route GET /api/profiles
//@desc 获取所有记录
//@access private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile
    .find()
    .then(profile => {
      if (!profile) {
        return res.status(404).json('No Content')
      }
      res.json(profile)
    })
    .catch(errr => res.status(500).json('Error'))
})

//@route GET /api/profiles/:id
//@desc 获取单个记录
//@access private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile
    .findOne({ _id: req.params.id })
    .then(profile => {
      if (!profile) {
        return res.status(404).json('No Content')
      }
      res.json(profile)
    })
    .catch(errr => res.status(500).json('Error'))
})

// @route POST /api/profile/edit//:id
// @desc  编辑条目
//@access  private
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  let profileFields = req.body
  Profile
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    )
    .then(profile => {
      res.json(profile)
    })
    .catch(errr => res.status(500).json('Error'))
})

// @route POST /api/profile/delete/:id
// @desc  删除条目
//@access  private
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile
    .findOneAndRemove({ _id: req.params.id })
    .then(profile => {
      profile.save()
    })
    .then(profile => {
      res.json(profile)
    })
    .catch(err => res.status(500).json('Error'))
})

module.exports = router