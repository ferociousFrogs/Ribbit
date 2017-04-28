// socket utility functions
const db = require('../../database/database.js');

module.exports = {
  dropNCreateDBTables: () => (
    db.complex.dropAllTables()
    .then(db.complex.initializeDB)
    .catch(err => console.error('Error dropping or creating tables', err))
  ),

  createTablesIfNotExists: () => (
    db.complex.initializeDB()
  ),

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

  findAllRooms: userName => (
    db.complex.findAllRooms(userName)
      .catch(err => console.error(err))
  ),

  findAllMessages: userAndRoomNames => (
    db.complex.findAllMessages(userAndRoomNames)
      .catch(err => console.error(err))
  ),

  checkOrCreateRoom: room => (
    // room = {roomName, userName}
    db.rooms.findId(room)
      .then((roomId) => {
        if (roomId) {
          return roomId;
        }
        return db.rooms.add(room);
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
        return db.rooms_users.findRoomsUsersId(room);
      })
      .then((roomsUsersId) => {
        if (roomsUsersId) {
          return roomsUsersId;
        }
        return db.rooms_users.add(room);
      })
      .catch(err => console.error(`Error checking or creating Room ${room.roomName} with error = ${err}`))
  ),

  sendMessageOrCode: (messageOrCode) => {
    // if there is an mCId, it's code in progress
    // and we only need to update the same MC row with new data
    if (messageOrCode.mCId) {
      return db.messagesNCode.update(messageOrCode)
                .catch(err => console.error(err));
    }
    // messageOrCode = {userName, peerName, roomName, type, data, mCId}
    const user1MC = Object.create(messageOrCode);
    const user2MC = Object.create(messageOrCode);
    // need to switch the username property to reuse the same query
    // for the peerName
    user2MC.userName = messageOrCode.peerName;
    return db.users.findId(user1MC)
      .then((user1Id) => {
        messageOrCode.senderId = user1Id;
        return db.users.findId(user2MC);
      })
      .then((user2Id) => {
        messageOrCode.receiverId = user2Id;
        return db.rooms.findId(messageOrCode);
      })
      .then((roomId) => {
        messageOrCode.roomId = roomId;
        if (typeof messageOrCode.mCId === 'number') {
          return messageOrCode.mCId;
        }
        if (messageOrCode.type === 'code') {
          return db.messagesNCode.findMCId(messageOrCode);
        }
        return false;
      })
      .then((messageId) => {
        if (messageId) {
          messageOrCode.mCId = messageId;
          return db.messagesNCode.update(messageOrCode);
        }
        return db.messagesNCode.add(messageOrCode);
      })
      .catch(err => console.error(err));
  },

  addDummyDataToDB: () => (
    db.complex.dropAllTables()
    .then(db.complex.initializeDB)
    .then(db.complex.addDummyData)
    .catch(err => console.error('Error dropping, creating, or filling tables', err))
  )
};
