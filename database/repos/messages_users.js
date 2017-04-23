const sql = require('../queries').messages_users;

module.exports = (repo, pgp) => ({
  create: () =>
    repo.none(sql.create),

  // add room_user to db
  // roomUserObj =  {userId, roomId}
  add: messages_users =>
    repo.one(sql.add, roomUserObj, messages_users => messages_users.id),

  // find all room_user records
  all: () =>
    repo.any(sql.all),

  // drop the table
  drop: () =>
    repo.any(sql.drop)
});
