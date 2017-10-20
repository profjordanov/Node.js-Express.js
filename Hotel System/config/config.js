module.exports = {
  development: {
    port: process.env.PORT || 3000,
    //TODO: Set the dabase name
    dbPath: 'mongodb://localhost:27017/hotelSystemDb'
  },
  production: {}
}