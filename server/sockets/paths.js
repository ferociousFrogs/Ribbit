// socket paths
const utils = require('../utilities/utilityFunctions');

module.exports = (http) => {
  const io = require('socket.io')(http);

  io.on('connection', (socket) => {
    const namedRooms = utils.namedRooms(io);
    socket.on('join room', (room) => {
      const numClients = utils.countClients(namedRooms, room.roomName);
      // room = {roomName, userId}
      // max two clients
      if (numClients === 2) {
        socket.emit('full', room.roomName);
        return;
      }
      console.log(`Room ${room.roomName} now has ${numClients + 1} client(s)`);
      if (numClients === 0) {
        socket.join(room.roomName);
        console.log(`Client ID ${socket.id} created room ${room.roomName}`);
        socket.emit('Created', room.roomName, socket.id);
      } else {
        console.log(`Client ID ${socket.id} joined room ${room.roomName}`);
        io.sockets.in(room.roomName).emit('Join', room.roomName);
        socket.join(room.roomName);
        socket.emit('Joined', room.roomName, socket.id);
        io.sockets.in(room.roomName).emit('Ready');
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
      const dummyMsgObj = {
        user1Name: message.userName,
        user2Name: 'Dummy user2 name', // need to update front end
        data: message.text,
        type: 'message',
        roomName: message.roomName
      };
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

    socket.on('userName submitted', (user) => {
      // user = {userName, email, fbToken}
      const userResponse = user;
      return utils.checkOrCreateUser(user)
      .then((userId) => {
        userResponse.userId = userId;
        console.log('userId in userName submitted', userId);
        return socket.emit('user created', userResponse);
      })
      .catch(err => console.error(`Error checking or creating User ${user.userName} with error = ${err}`));
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
