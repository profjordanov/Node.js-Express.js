const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isOpen: { type: Boolean, required: true },
  students: [{ type: ObjectId, ref: 'Student' }],
  teacher: { type: ObjectId, ref: 'Teacher' }
})

module.exports = mongoose.model('Course', courseSchema)
