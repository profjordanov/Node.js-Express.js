const encryption = require('../util/encryption')
const User = require('mongoose').model('User')
const Tweet = require('../models/Tweet')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: async (req, res) => {
    const reqUser = req.body
    const salt = encryption.generateSalt()
    const hashedPass =
      encryption.generateHashedPassword(salt, reqUser.password)
    try {
      const user = await User.create({
        username: reqUser.username,
        hashedPass,
        salt,
        firstName: reqUser.firstName,
        lastName: reqUser.lastName,
        roles: []
      })
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/register', user)
        } else {
          res.redirect('/')
        }
      })
    } catch (e) {
      console.log(e)
      res.locals.globalError = e
      res.render('users/register')
    }
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: async (req, res) => {
    const reqUser = req.body
    try {
      const user = await User.findOne({username: reqUser.username})
      if (!user) {
        errorHandler('Invalid user data')
        return
      }
      if (!user.authenticate(reqUser.password)) {
        errorHandler('Invalid user data')
        return
      }
      req.logIn(user, (err, user) => {
        if (err) {
          errorHandler(err)
        } else {
          res.redirect('/')
        }
      })
    } catch (e) {
      errorHandler(e)
    }

    function errorHandler (e) {
      console.log(e)
      res.locals.globalError = e
      res.render('users/login')
    }
  },
  addAdminGet: (req, res) => {
    User.find({roles: {$ne: 'Admin'}}).then(users => {
      res.render('users/admin-add', {
        users: users
      })
    })
  },

  addAdminPost: (req, res) => {
    let userId = req.body.user

    User.findByIdAndUpdate(userId, {$addToSet: {roles: 'Admin'}}).then(() => {
      res.redirect('/admins/all')
    })
  },

  all: (req, res) => {
    User.find({roles: {$in: ['Admin']}}).then(admins => {
      res.render('users/admin-all', {
        admins: admins
      })
    })
  }
}

module.exports.profile = (req, res) => {
  let username = req.params.username
  User.findOne({username: username}).then(user => {
    if (!user) {
      res.redirect('/')
      return
    }
    Tweet.find({author: user._id}).populate('author')
      .sort('-date').limit(100).then(tweets => {
      for (let tweet of tweets) {
        tweet.views++
        tweet.save()
      }
      res.render('users/profile', {
        user: user,
        tweets: tweets
      })
    })
  })
}