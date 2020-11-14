const mongoose = require('mongoose');
const Answer = require('./answer.js')

const questionSchema = mongoose.Schema({
  user: String,
  date: Date,
  question: String,
  answers: [{type: mongoose.Schema.ObjectId, ref: 'Answer'}]
})
const Question = mongoose.model('Question', questionSchema);

module.exports = Question