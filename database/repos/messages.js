const sql = require('../queries').messages;

module.exports = (repo, pgp) => {


  return {
    // Creates the table;
    create: () =>
        repo.none(sql.create),

    // Adds message with messageObj = {userId, roomId, message}
    add: messageObj =>
      repo.one(sql.add, messageObj, message => message.id),

    // Returns all records for messages;
    all: () =>
      repo.any(sql.add),

    // Finds all messages in a room given a roomId
    messagesInRoom: roomId =>
      repo.any(sql.messagesInRoom, roomId)
  };
};
