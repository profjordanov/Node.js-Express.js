const mongoose = require('mongoose')
let connectionString = 'mongodb://localhost:27017/mycustomdb'
let errorHandler = err => {
  console.log(`Error: ${err['message']}`)
}
mongoose.Promise = global.Promise
const createDemo = require('./create-demo')
const quieryingDemo = require('./querying-demo')
const updateDemo = require('./update-demo')
const removeDemo = require('./remove-demo')

mongoose.connect(connectionString, err => {
  if (err) {
    errorHandler(err)
    return
  }

  createDemo()
  quieryingDemo()
  updateDemo()
  removeDemo()
})


//let mongoose = require('mongoose')
//const objectId = mongoose.Schema.ObjectId
//mongoose.Promise = global.Promise
//
//mongoose.connect('mongodb://localhost:27017/mycustomdb', (err) =>{
//  if(err){
//    console.log(err)
//    return
//  }
//
//  let carSchema = new mongoose.Schema({
//    name: { type: String, required: true },
//    age: { type: Number, default:0 },
//    owner: {type: objectId}
//  })
//
//  // Model Methods
//  carSchema.methods.sayHello = function () {
//    return `Hellow from ${this.name}. I am ${this.age} years old!`
//  }
//// Custom validation
//  carSchema.path('age').validate(value =>{
//    return value >= 0 && value < 20
//  }, 'Age must be between 0 and 20')
//
//
//  let Cat = mongoose.model('Cat', carSchema)
//
//
//  let ownerSchema = new mongoose.Schema({
//    name: {type: String, required:true, unique: true }
//  })
//
//  ownerSchema.virtual('fullName').get(function () {
//    return this.firstName + ' ' + this.lastName
//  })
//
//  let Owner = mongoose.model('Owner', ownerSchema)
//
//  Cat
//    .findById('59d8f7302c2154138b2b63fd')
//    .then(cat =>{
//      cat.name = 'Nov IVAN'
//      cat.save()
//    })
//
//  Cat
//    .findByIdAndUpdate('59d8f75f2c2154138b2b63fe', {
//      $set: { name: 'Drug Ivan'}
//    })
//    .exec()
//
//  Cat
//    .update(
//      { name: 'Ivan'},
//      {$set: {name: 'Pesho'}},
//      {multi: true}
//    )
//    .exec()
//
//  Cat
//    .remove(
//      { name: 'ivan'}
//    )
//    .exec()

//  new Owner({
//    firstName:'Ivan',
//    lastName:'Ivanov'
//  }).save()
//    .then(owner =>{
//      console.log(owner.fullName//)
//    })
//
//  Cat
//    .find({})
//    .then(cats =>{
//      for(let cat of cats){
//        console.log(cat.sayHello())
//      }
//    })

//  Owner
//    .find({})
//    .then(owners => {
//      console.log(owners)
//
//      for(let owner of owners){
//        Cat
//          .find({owner: owner._id})
//          .then(cats =>{
//            console.log(cats//)
//          })
//      }
//    })

// let owner = new Owner({
//   name: 'Shefa'
// })

// owner
//   .save()
//   .then(owner =>{
//     let cat = new Cat({
//       name: 'Silvestar',
//       age: 2 ,
//       owner: owner._id
//     })

//     cat
//       .save()
//       .then(cat =>{
//         console.log(cat)
//       })
//   })


//  cat
//    .save()
//    .then(cat =>{
//      console.log(cat)
//    })
//    .catch(err =>{
//      let errors = err.errors
//      for(let errKey in errors){
//        console.log(errors[errKey].message)
//      }
//    })

// let Monkey = mongoose.model('Monkey', {
//   name: {type: String, required: true},
//   age: {type: Number,  default: 0}
// })

// let Owner = mongoose.m//

// let monkey = new Monkey({
//   name: 'Bai Ivan',
//   age: 12
// })

// Monkey
//   .find({})
//   .exec()
//   .then(monkeys =>{
//     console.log(monkeys)
//   })

//monkey.save()
//  .then(monkey =>{
//    console.log(monkey//)
//  })
//})