const mongoose = require('mongoose');

const qandaSchema = mongoose.Schema({
  question: String,
  answer: String,
  yes: Number,
  no: Number,
  flag: Boolean
})

const Qanda = mongoose.model('Qanda', qandaSchema);

module.exports = Qanda