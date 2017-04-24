// socket utility functions
const db = require('../../database/database.js');


module.exports = {
  dropNCreateDBTables: () => {
    db.complex.dropAllTables()
    .then(db.complex.initializeDB)
    .catch(err => console.error('Error dropping or creating tables', err));
  },

  namedRooms: io => (
    io.nsps['/'].adapter.rooms
  ),

  countClients: (namedRooms, room) => {
    const clientsInRoom = namedRooms[room];
    const numClients = clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length;
    return numClients;
  },

  checkOrCreateUser: user => (
    // user = {userName, etc.}
    db.users.findId(user)
      .then((userId) => {
        if (userId) {
          return userId;
        }
        return db.users.add((user));
      })
  ),

  checkOrCreateRoom: room => (
    // room = {roomName, userName}
    db.rooms.findId(room)
      .then((roomId) => {
        if (roomId) {
          return roomId;
        }
        return db.rooms.add((room));
      })
      .then((roomId) => {
        room.roomId = roomId;
        if (!room.userId) {
          return db.users.findId(room);
        }
        return room.userId;
      })
      .then((userId) => {
        room.userId = userId;
        return db.rooms_users.add(room);
      })
      .catch(err => console.error(`Error checking or creating Room ${room.roomName} with error = ${err}`))
  ),

  sendMessageOrCode: messageOrCode => (
    db.users.findId(messageOrCode)
      .then((userId) => {
        messageOrCode.userId = userId;
        return db.rooms.findId(messageOrCode);
      })
      .then((roomId) => {
        messageOrCode.roomId = roomId;
        return db.messagesNCode.add(messageOrCode);
      })
      .then((messageId) => {
        messageOrCode.mCId = messageId;
        return db.messages_users.add(messageOrCode);
      })
      .catch(err => console.error(err))
  )
};
