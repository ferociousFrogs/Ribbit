// express server
const app = require('express')();
const os = require('os');
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database/dbutils');
// const url = require('url');

// initialize DB
db.chained.initializeDB();

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client')));

const codeParser = (code) => {
  code.value = code.value.replace(/\\n/gi, '');
  if (code.language === 'Javascript') {
    return eval(code.value);
  } else if (code.language === 'Python') {
    return 'Python coming soon!';
  } else if (code.language === 'Ruby') {
    return 'Ruby coming soon!';
  }
  return null;
};

console.log(codeParser({
  value: 'function ribbit() { return "Ribbit";};ribbit();',
  language: 'Javascript'
}));

// Routes
app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/runCode', (req, res) => {
  const result = codeParser(req.query);
  console.log(result);
  res.status(200).send(JSON.stringify(result));
});

app.get('*', (req, res) => {
  res.status(302).redirect('/');
});


const countClients = (room) => {
  const clientsInRoom = io.nsps['/'].adapter.rooms[room];
  const numClients = clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length;
  return numClients;
};
// sockets
io.on('connection', (socket) => {
  socket.on('join room', (room) => {
    const numClients = countClients(room);
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
      db.rooms.add(room);
    } else {
      console.log(`Client ID ${socket.id} joined room ${room}`);
      io.sockets.in(room).emit('Join', room);
      socket.join(room);
      socket.emit('Joined', room, socket.id);
      io.sockets.in(room).emit('Ready');
      db.rooms.addUser2(room);
    }
  });

  socket.on('any room left', (room) => {
    const numClients = countClients(room);
    if (numClients >= 2) {
      socket.emit('full', room);
    } else {
      socket.emit('not full', room);
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
