const mongodb = require('mongodb')
let connection = 'mongodb://localhost:27017/mycustomdb'

mongodb.MongoClient.connect(connection, (err,db) =>{
  if(err){
    console.log(err)
    return
  }

  let cats = db.collection('cats')
  cats
    .find({'name':'Vanka'})
      .toArray((err,data) =>{
    if(err){
      console.log(err)
      return
    }
    console.log(data)
    })

//cats
//    .insertMany([
//  { name: 'Vanka' , age:15 },
//  { name: 'Meni' , age:15 },
//  { name: 'Boni' , age:15 },
//  { name: 'Koni' , age:15 , color: 'Yellow' }
//], (err,result) =>{
//  if(err){
//    console.log(err)
//    return
//  }
//  console.log(result)
// })
})