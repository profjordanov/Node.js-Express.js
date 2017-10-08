const Student = require('./models/Student')
let errorHandler = err => {
  console.log(`Error: ${err['message']}`)
}

module.exports = () => {
  new Student({
    firstName: 'test',
    lastName: 'test',
    age: 1,
    facultyNumber: '11111'
  })
    .save()
    .then(sInfo => {
      Student.findByIdAndRemove(sInfo._id).then(s => {
        console.log(s._id)
      })
    })
    .catch(errorHandler)

  Student.remove({ age: 25 }).then(sInfo => {
    Student.findByIdAndRemove(sInfo._id)
      .then(s => {
        console.log(s)
      })
      .catch(errorHandler)
  })
}
