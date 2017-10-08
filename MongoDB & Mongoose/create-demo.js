const Student = require('./models/Student')
const Course = require('./models/Course')
const Teacher = require('./models/Teacher')
let errorHandler = err => {
  console.log(`Error: ${err['message']}`)
}
module.exports = async function () {
  let mathTeacher = new Teacher({
    name: 'Oliver'
  })
  let programmingTeacher = new Teacher({
    name: 'George'
  })
  let psychologyTeacher = new Teacher({
    name: 'Barry'
  })
  let math = new Course({
    name: 'Mathematics Basics',
    isOpen: true,
    teacher: mathTeacher
  })
  let programming = new Course({
    name: 'Programming Basics',
    isOpen: true,
    teacher: programmingTeacher
  })
  let psychology = new Course({
    name: 'Psychology Advanced',
    isOpen: false,
    teacher: psychologyTeacher
  })
  let petar = new Student({
    firstName: 'Petar',
    lastName: 'Petrov',
    facultyNumber: '13765',
    age: 20,
    grades: [2, 2, 3],
    courses: [math, psychology]
  })
  let georgi = new Student({
    firstName: 'Georgi',
    lastName: 'Georgiev',
    facultyNumber: '13333',
    age: 16,
    grades: [6, 6, 6],
    courses: [programming]
  })
  let mitko = new Student({
    firstName: 'Dimitar',
    lastName: 'Kirilov',
    facultyNumber: '13090',
    age: 19,
    grades: [5, 6, 4],
    courses: [math, psychology, programming]
  })

  math.students.push(petar, mitko)
  psychology.students.push(petar, mitko)
  programming.students.push(georgi, mitko)
  try {
    await Promise.all([
      mathTeacher.save(),
      programmingTeacher.save(),
      psychologyTeacher.save(),
      math.save(),
      programming.save(),
      psychology.save(),
      petar.save(),
      georgi.save(),
      mitko.save()
    ])
      .then(subjects => {
        console.log(subjects)
      })
      .catch(errorHandler)
  } catch (err) {
    errorHandler(err)
  }
  
}
