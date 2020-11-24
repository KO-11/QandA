const mongoose = require('mongoose');
const mongoUri = 'mongodb://database/qanda'

mongoose.Promise = global.Promise;

const db = mongoose.connect(mongoUri, {useNewUrlParser: true})
  .then(() => {console.log('connecterd to mongo')})

module.exports = db;