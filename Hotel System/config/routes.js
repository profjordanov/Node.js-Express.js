const controllers = require('../controllers')
const restrictedPages = require('./auth')

module.exports = app => {
  app.get('/', controllers.home.index)

  app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about)

  app.get('/add', restrictedPages.isAuthed, controllers.hotel.addGet)
  app.post('/add', restrictedPages.isAuthed, controllers.hotel.addPost)

  app.get('/list', controllers.hotel.all)
  app.get('/hotel/:id/:title', controllers.hotel.viewHotelGet)
  app.post('/hotel/:id/:title',restrictedPages.isAuthed, controllers.comment.addPost)

  app.get('/profile/:username',restrictedPages.isAuthed, controllers.user.profile)

  app.get('/admins/add', restrictedPages.hasRole('Admin'), controllers.user.addAdminGet)
  app.post('/admins/add', restrictedPages.hasRole('Admin'), controllers.user.addAdminPost)
  app.get('/admins/all', restrictedPages.hasRole('Admin'), controllers.user.all)

  app.get('/post/edit/:id', restrictedPages.hasRole('Admin'), controllers.hotel.editGet)
  app.post('/post/edit/:id', restrictedPages.hasRole('Admin'), controllers.hotel.editPost)
  app.get('/post/delete/:id', restrictedPages.hasRole('Admin'), controllers.hotel.deleteGet)
  app.post('/post/delete/:id', restrictedPages.hasRole('Admin'), controllers.hotel.deletePost)

  app.get('/category/add', restrictedPages.hasRole('Admin'), controllers.category.addGet)
  app.post('/category/add', restrictedPages.hasRole('Admin'), controllers.category.addPost)
  app.get('/category/delete', restrictedPages.hasRole('Admin'), controllers.category.deleteGet)
  app.post('/category/delete', restrictedPages.hasRole('Admin'), controllers.category.deletePost)
  app.get('/categories', controllers.category.all)

  app.get('/register', controllers.user.registerGet)
  app.post('/register', controllers.user.registerPost)

  app.post('/logout', controllers.user.logout)
  app.get('/login', controllers.user.loginGet)
  app.post('/login', controllers.user.loginPost)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}