const sql = require('../queries').messages_users;

module.exports = (repo, pgp) => ({
  create: () =>
    repo.none(sql.create),

  // add room_user to db
  // roomUserObj =  {userId, roomId}
  add: messagesUsers =>
    repo.one(sql.add, messagesUsers, mU => mU.id),

  // find all room_user records
  all: () =>
    repo.any(sql.all),

  // drop the table
  drop: () =>
    repo.any(sql.drop)
});
