// express server
const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
const url = require('url');


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
  value: 'function ribbit() { return 1+1;};ribbit();',
  language: 'Javascript'
}));

// Routes
app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('*', (req, res) => {
  // const pathName = req.url;
  // res.pathName = pathName;
  res.status(302).redirect('/');
});

app.get('/runCode', (req, res) => {
  const result = codeParser(req.query);
  console.log(result);
  res.status(200).send(result.toString());
});

io.on('connection', (socket) => {
  socket.on('join room', (room) => {
    console.log('joining room', room);
    socket.join(room);
  });
  socket.on('chat message', (message) => {
    // console.log('message: ', message);
    if (message.userName === 'Guest') {
      const idSlice = socket.id.slice(0, 5);
      message.userName = `Guest(${idSlice}) :`;
    }
    io.to(message.roomName).emit('chat message', message);
  });
  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });
  socket.on('code-edit', (code) => {
    socket.broadcast.emit('newCode', code);
  });
});

http.listen(port, () => {
  console.log(`Ribbit app listening on port ${port}!`);
});

module.exports = app;
