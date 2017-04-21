const sql = require('../queries').rooms;

module.exports = (repo, pgp) => {


  return {
    // Creates the table;
    create: () =>
        repo.none(sql.create),

    // Adds room to rooms
    // roomWithUserName = {roomName and userId}
    // returns roomId
    add: roomWithUserName =>
      repo.one(sql.add, roomWithUserName, room => room.id),

    // Adds code to a room
    // roomNameWithCode = {code, roomName}
    addCode: roomNameWithCode =>
      repo.none(sql.addCode, roomNameWithCode),

    // Returns all records for rooms;
    all: () =>
      repo.any(sql.add),

    // Add user2_Id to room
    // roomWithUser2 = {roomName, userId}
    addUser2: roomWithUser2 =>
      repo.none(sql.addUser2, roomWithUser2),

    // Find the roomId based on roomName
    findId: roomName =>
      repo.none(sql.findId, roomName),

    // Find the roomName given a roomId
    findName: roomId =>
      repo.none(sql.findName, roomId),

    // Finds all users in a room
    usersInRoom: roomId =>
      repo.any(sql.usersInRoom, roomId)
  };
};
