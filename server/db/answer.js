const mongoose = require('mongoose');
const Question = require('./question.js');

const answerSchema = mongoose.Schema({
  user: String,
  answer: String,
  date: Date,
  yes: Number,
  no: Number,
  flag: Boolean
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer