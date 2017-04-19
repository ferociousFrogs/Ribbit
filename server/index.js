// express server
const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const url = process.env.url || 'http://localhost';
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client')));

// Routes
app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/runCode', (req, res) => {
  // call the seperate server
  const codeToEval = req.query;
  console.log(codeToEval);
  axios.get(`${url}:8080/evalCode`, {
    params: {
      code: codeToEval
    }
  })
  .then((result) => {
    console.log(result.data);
    res.status(200).send(result.data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

io.on('connection', (socket) => {

  socket.on('join room', (room) => {
    const clientsInRoom = io.nsps['/'].adapter.rooms[room];
    const numClients = clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length;
    // max two clients
    if (numClients === 2) {
      socket.emit('full', room);
      return;
    }
    console.log(`Room ${room} now has ${numClients + 1} client(s)`);
    if (numClients === 0) {
      socket.join(room);
      console.log(`Client ID ${socket.id} created room ${room}`);
      socket.emit('Created', room, socket.id);
    } else {
      console.log(`Client ID ${socket.id} joined room ${room}`);
      io.sockets.in(room).emit('Join', room);
      socket.join(room);
      socket.emit('Joined', room, socket.id);
      io.sockets.in(room).emit('Ready');
    }
  });

  socket.on('leave room', (room) => {
    socket.leave(room);
  });

  socket.on('chat message', (message) => {
    console.log(`user ${message.userName} sent message to room ${message.roomName}`);
    socket.to(message.roomName).emit('chat message', message);
  });


  socket.on('code-edit', (code) => {
    socket.to(code.room).emit('newCode', code);
  });

  socket.on('video message', (message) => {
    console.log(`Client said: ${message}`);
    socket.broadcast.emit('video message', message);
  });
  // Create Room socket connection
  // Update this with new validated code from pull request: https://github.com/googlecodelabs/webrtc-web/issues/5

  socket.on('ipaddr', () => {
    const ifaces = os.networkInterfaces();
    for (let dev in ifaces) {
      ifaces[dev].forEach((details) => {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Ribbit app listening on port ${port}!`);
});

module.exports = app;
