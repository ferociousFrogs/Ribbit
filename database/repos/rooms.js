const sql = require('../queries').rooms;

module.exports = (repo, pgp) => {


  return {
    // Creates the table;
    create: () =>
        repo.none(sql.create),

    // Adds roomName and user1_Id to room
    add: roomObj =>
      repo.one(sql.add, roomObj, room => room.id),

    // Adds code to a room with a given roomName
    addCode: () =>
      repo.none(sql.addCode),

    // Returns all records for rooms;
    all: () =>
      repo.any(sql.add),

    // Add user2_Id to room
    addUser2: () =>
      repo.none(sql.addUser2),

    // Find the roomId based on roomName
    findId: roomName =>
      repo.none(sql.findId, roomName, room => room.Id),

    // Find the roomName given a roomId
    findName: roomId =>
      repo.none(sql.findName, roomId, room => room.name),

    // Finds all users in a room
    usersInRoom: roomId =>
      repo.any(sql.usersInRoom, roomId)
  };
};
