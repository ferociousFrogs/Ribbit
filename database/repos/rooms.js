const sql = require('../queries').rooms;

module.exports = (repo, pgp) => {


  return {
    // Creates the table;
    create: () =>
        repo.none(sql.create),

    // Adds room to rooms
    add: roomName =>
      repo.one(sql.add, roomWithUserName, room => room.id),

    // Returns all records for rooms;
    all: () =>
      repo.any(sql.add),

    // Find the roomId based on roomName
    findId: roomName =>
      repo.none(sql.findId, roomName),

    // Find the roomName given a roomId
    findName: roomId =>
      repo.none(sql.findName, roomId)
  };
};
