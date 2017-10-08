const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courses: [{type: ObjectId, ref: 'Course'}]
})

module.exports = mongoose.model('Teacher', teacherSchema)
