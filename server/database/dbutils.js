// As of right now, this file defines and limits the db calls
// that can be made from the server
// it's pretty redundant at the moment, and the system
// can be refactored so that this file isn't required

// Eventually, it would be beneficial to extract all of the socket 
// routes out from the server file as well

const db = require('../../database/database.js');

module.exports = {
  rooms: {
    create: db.rooms.create,
    add: db.rooms.add,
    addCode: db.rooms.addCode,
    addUser2: db.rooms.addUser2,
    all: db.rooms.all,
    findName: db.rooms.findName, // takes a room_id
    findId: db.rooms.findId, // takes a roomName
    usersInRoom: db.rooms.usersInRoom // finds user Id's for the room
  },
  users: {
    create: db.users.create,
    add: db.users.add,
    all: db.users.all,
    findId: db.rooms.findId, // takes a userName
    findName: db.users.findName // takes a user_id
  },
  chained: {
    createRoom: db.chained.createRoom,
    initializeDB: db.chained.initializeDB,
  }
};
