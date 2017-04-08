// express server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
let port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client')));


// Routes
app.get('/', (req, res) => {
  res.send();
}); 

app.listen(port, function () {
  console.log('Ribbit app listening on port ' + port + '!');
});