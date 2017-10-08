const Student = require('./models/Student')
const Course = require('./models/Course')
let errorHandler = err => {
  console.log(`Error: ${err['message']}`)
}

module.exports = async function () {
  // ALL STUDENTS IN DB
  try {
    await Student.find({})
      .then(allStudents => {
        for (let s of allStudents) {
          console.log(
            `ALL STUDENTS IN DB FN: ${s.facultyNumber} -> ${s.fullName}`
          )
        }
        console.log('-----------------------------------------------')
      })
      .catch(errorHandler)

    // FIRST STUDENT IN DB
    await Student.findOne({})
      .then(firstStudent => {
        console.log(
          ` FIRST STUDENT IN DB: ${firstStudent.facultyNumber} -> ${firstStudent.fullName}`
        )
        console.log('-----------------------------------------------')
      })
      .catch(errorHandler)

    // STUDENTS WITH FIRST NAME 'PETAR'
    await Student.find({})
      .where('firstName')
      .equals('Petar')
      .then(students => {
        for (let s of students) {
          console.log(`STUDENTS WITH FIRST NAME 'PETAR' -> ${s.fullName}`)
        }
        console.log('-----------------------------------------------')
      })
      .catch(errorHandler)

    // STUDENTS WITH AGE BETWEEN 19 & 22
    await Student.find({})
      .where('age')
      .gt(18)
      .lt(23)
      .then(students => {
        for (let s of students) {
          console.log(`STUDENTS WITH AGE BETWEEN 19 & 22 -> ${s.fullName}`)
        }
        console.log('-----------------------------------------------')
      })
      .catch(errorHandler)

    // SELECTION OF SOME PROPERTIES
    await Student.findOne({ firstName: 'Dimitar' })
      .select('facultyNumber age')
      .then(student => {
        console.log(`ONLY FN AND AGE & ID: ${student}`)
        console.log('-----------------------------------------------')
      })
      .catch(errorHandler)

    // SORTING BY AGE DESCENDING
    await Student.find({})
      .sort({ age: -1 })
      .then(students => {
        for (let s of students) {
          console.log(
            `SORTED BY AGE DESCENDING: FN ${s.facultyNumber} AGE: ${s.age}`
          )
        }
        console.log('-----------------------------------------------')
      })
      .catch(errorHandler)

    // STUDENT WITH FACULTYNUMBER 13090 AND HIS COURSES
    await Student.findOne({ facultyNumber: '13090' })
      .populate('courses') //
      .then(async function (student) {
        console.log(`STUDENT: ${student.fullName}`)
        let courses = student.courses
        for (let c of courses) {
          console.log(`COURSE ${c.name}`)
        }
        console.log('-----------------------------------------------')
      })
      .catch(errorHandler)

    // ALL COURSES IN DN SORTED IN ASC BY NAME AND THEIR TEACHERS
    await Course.find({})
      .sort({ name: 1 })
      .populate('teacher')
      .then(async function (courses) {
        for (let course of courses) {
          console.log(
            `COURSE: ${course.name} WITH TEACHER: ${course.teacher.name}`
          )
        }
        console.log('-----------------------------------------------')
      })
      .catch(errorHandler)
  } catch (err) {
    errorHandler(err)
  }
}
