const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  facultyNumber: { type: String, required: true, unique: true },
  age: { type: Number },
  courses: [{type: ObjectId, ref: 'Course'}],
  grades: { type: Array }
})
studentSchema.methods.getInfo = function () {
  return `I am ${this.firstName} ${this.lastName}`
} // Additional methods
studentSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
}) // virtual props

studentSchema.path('firstName').validate(function () {
  return this.firstName.length >= 2 && this.firstName.length <= 10
}, 'First name must be between 2 and 10 symbols long!')

module.exports = mongoose.model('Student', studentSchema)
