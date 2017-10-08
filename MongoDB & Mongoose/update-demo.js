const Student = require('./models/Student')
let errorHandler = err => {
  console.log(`Error: ${err['message']}`)
}

module.exports = async function () {
  try {
    let student = await Student.findById('59d7c7efc93c7335c060fcb4')
    student.firstName = 'Kiril'
    let newStudent = await student.save()
    console.log(newStudent.firstName)
    student = await Student.findByIdAndUpdate('59d7c7efc93c7335c060fcb4', {
      $set: { firstName: 'Viki' }
    })
    student.firstName = 'Viki'
    newStudent = await student.save()
    console.log(newStudent.firstName)

    // UPDATE ALL THAT MATCH CONDITION
    await Student.update(
      { firstName: 'Viki' },
      { $set: { firstName: 'Stamat' } },
      { multi: true }
    )
  } catch (err) {
    errorHandler(err)
  }
}
