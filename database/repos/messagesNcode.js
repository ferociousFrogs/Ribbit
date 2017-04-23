const sql = require('../queries').messagesNCode;

module.exports = (repo, pgp) => {


  return {
    // Creates the table;
    create: () =>
        repo.none(sql.create),

    // Adds message with messageObj = {user1Id, user2Id, roomId, type, data}
    add: messageObj =>
      repo.one(sql.add, messageObj, message => message.id),

    // Returns all records for messages;
    all: () =>
      repo.any(sql.all),

    // drop the table
    drop: () =>
      repo.any(sql.drop)
  };
};
