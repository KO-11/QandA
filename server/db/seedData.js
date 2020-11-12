const Qanda = require('./qanda.js');
const db = require('./index.js');
const data = require('./data.json');

var seedData = function() {
  Qanda.insertMany(data)
    .then((results) => {
      console.log('successfully seeded');
    })
    .catch((err) => {
      console.error('unable to seed data')
    })
}

seedData();