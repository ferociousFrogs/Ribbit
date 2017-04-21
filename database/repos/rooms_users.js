const sql = require('../queries').rooms_users;

module.exports = (repo, pgp) => ({
  create: () =>
    repo.none(sql.create),

  // add room_user to db
  // roomUserObj =  {userId, roomId}
  add: roomUserObj =>
    repo.one(sql.add, roomUserObj, roomUser => roomUser.id),

  // find all room_user records
  all: () =>
    repo.any(sql.all)

});
