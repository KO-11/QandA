const app = require('./server.js');
const port = 3000;

app.listen(port, function() {
  console.log('Q&A API listening on port' + port);
});