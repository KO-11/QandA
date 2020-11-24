const seed = require('./db/seedData.js');
const app = require('./server.js');
const port = 3002;

seed.seedQ();

app.listen(port, function() {
  console.log('Q&A API listening on port' + port);
});


