const controllers = require('../controllers')
const restrictedPages = require('./auth')

module.exports = app => {
  app.get('/', controllers.home.index)

  app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about)

  app.get('/register', controllers.user.registerGet)
  app.post('/register', controllers.user.registerPost)

  app.post('/logout', controllers.user.logout)
  app.get('/login', controllers.user.loginGet)
  app.post('/login', controllers.user.loginPost)

  app.get('/tweet', restrictedPages.isAuthed, controllers.tweet.addGet)
  app.post('/tweet', restrictedPages.isAuthed, controllers.tweet.addPost)

  app.get('/tag/:tagName', controllers.tweet.showBytag)

  app.get('/profile/:username',restrictedPages.isAuthed, controllers.user.profile)

  app.get('/admins/add', restrictedPages.hasRole('Admin'), controllers.user.addAdminGet)
  app.post('/admins/add', restrictedPages.hasRole('Admin'), controllers.user.addAdminPost)
  app.get('/admins/all', restrictedPages.hasRole('Admin'), controllers.user.all)

  app.get('/edit/:id', restrictedPages.hasRole('Admin'), controllers.tweet.editGet)
  app.post('/edit/:id', restrictedPages.hasRole('Admin'), controllers.tweet.editPost)
  app.get('/delete/:id', restrictedPages.hasRole('Admin'), controllers.tweet.deleteGet)
  app.post('/delete/:id', restrictedPages.hasRole('Admin'), controllers.tweet.deletePost)

  app.post('/like/:id', restrictedPages.isAuthed, controllers.tweet.like)
  app.post('/dislike/:id', restrictedPages.isAuthed, controllers.tweet.dislike)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}