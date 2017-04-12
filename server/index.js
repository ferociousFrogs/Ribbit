// express server
const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client')));


// Routes
app.get('/', (req, res) => {
  res.status(200).send();
});


io.on('connection', (socket) => {
  socket.on('join', (users) => {
    const newUser = users.find(user => user.id === '');
    newUser.id = socket.id;
    io.emit('newUser', newUser);
  });
  socket.on('chat message', (message) => {
    // console.log('message: ', message);
    io.emit('chat message', message);
  });
  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Ribbit app listening on port ${port}!`);
});

module.exports = app;
