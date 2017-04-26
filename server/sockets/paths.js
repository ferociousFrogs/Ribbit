// socket paths
const utils = require('../utilities/utilityFunctions');

module.exports = (http) => {
  const io = require('socket.io')(http);

  io.on('connection', (socket) => {
    const namedRooms = utils.namedRooms(io);
    socket.on('join room', (room) => {
    socket.emit('hello', 'emitted hello');
      const numClients = utils.countClients(namedRooms, room);
      // room = {roomName, userId}
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
      if (room.userName && room.userName.length > 0) {
        console.log('username = ', room.userName);
        socket.broadcast.emit('peer name', room.userName);
      }
      utils.checkOrCreateRoom(room);
    });

    socket.on('any room left', (room) => {
      const numClients = utils.countClients(namedRooms, room);
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
      return utils.sendMessageOrCode(message)
                  .catch(err => console.error(err));
    });


    socket.on('code-edit', code => (
      utils.sendMessageOrCode(code)
                  .then((codeId) => {
                    code.mCId = codeId;
                    socket.to(code.roomName)
                          .emit('newCode', code);
                  })
                  .catch(err => console.error(err))
    ));

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

    socket.on('userName submitted', (user) => {
      // user = {userName, email, fbToken}
      const userResponse = user;
      return utils.checkOrCreateUser(user)
      .then((userId) => {
        userResponse.userId = userId;
        if (userId !== 0) {
          return utils.findAllRooms(userResponse);
        }
        return userId;
      })
      .then((rooms) => {
        console.log('rooms[0]', rooms[0]);
        userResponse.roomname = rooms[0].roomname;
        socket.emit('user created', userResponse);
        return utils.findAllMessages(userResponse);
      })
      .then(messages => console.log('messages', messages))
      .catch(err => console.error(`Error checking or creating User ${user.userName} with error = ${err}`));
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
