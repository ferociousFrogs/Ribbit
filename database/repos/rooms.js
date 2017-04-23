const sql = require('../queries').rooms;

module.exports = (repo, pgp) => {


  return {
    // Creates the table;
    create: () =>
        repo.none(sql.create),

    // Adds room to rooms
    add: roomName =>
      repo.one(sql.add, roomName, room => room.id),

    // Returns all records for rooms;
    all: () =>
      repo.any(sql.all),

    // Find the roomId based on roomName
    findId: roomName =>
      repo.oneOrNone(sql.findId, roomName),

    // Find the roomName given a roomId
    findName: roomId =>
      repo.oneOrNone(sql.findName, roomId),

    // drop the table
    drop: () =>
      repo.any(sql.drop)
  };
};
