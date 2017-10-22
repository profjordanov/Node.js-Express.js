const controllers = require('../controllers')
const restrictedPages = require('./auth')

module.exports = app => {
  app.get('/', controllers.home.index)

  app.get('/create-product', restrictedPages.hasRole('Admin'), controllers.product.addGet)
  app.post('/create-product', restrictedPages.hasRole('Admin'), controllers.product.addPost)
  app.get('/delete-product/:id', restrictedPages.hasRole('Admin'), controllers.product.deleteGet)
  app.post('/delete-product/:id', restrictedPages.hasRole('Admin'), controllers.product.deletePost)
  app.get('/edit-product/:id', restrictedPages.hasRole('Admin'), controllers.product.editGet)

  app.get('/customize-order/:id', restrictedPages.isAuthed, controllers.order.customizeOrderGet)
  app.post('/customize-order/:id', restrictedPages.isAuthed, controllers.order.customizeOrderPost)

  app.get('/order/orderDetails/:id', restrictedPages.isAuthed, controllers.order.orderDetailsGet)
  app.get('/orderStatus/:id', restrictedPages.isAuthed, controllers.order.orederStatusGet)

  app.get('/manageOrders', restrictedPages.hasRole('Admin'), controllers.order.manageOrdersGet)
  app.post('/manageOrders', restrictedPages.hasRole('Admin'), controllers.order.manageOrdersPost)


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