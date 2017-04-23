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

  checkOrCreateUser: (user) => (
    // user = {userName, etc.}
    db.users.findId(user)
      .then((userId) => {
        if (typeof userId === 'number') {
          return userId;
        }
        return db.users.add((user));
      })
      .catch(err => console.error(`Error checking or creating User ${user.userName} with error = ${err}`))
  ),

  checkOrCreateRoom: (room) => {
    // room = {roomName, userId}
    return db.rooms.findId(room.roomName)
      .then((roomId) => {
        if (typeof roomId === 'number') {
          return roomId;
        }
        return db.rooms.add((room.roomName));
      })
      .then((roomId) => {
        if (!room.userId) {
          return roomId;
        }
        room.roomId = roomId;
        return db.rooms_users.add(room);
      })
      .catch(err => console.error(`Error checking or creating Room ${room.roomName} with error = ${err}`));
  }
};
