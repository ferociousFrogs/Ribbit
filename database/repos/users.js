const sql = require('../queries').users;

module.exports = (repo, pgp) => ({
  create: () =>
    repo.none(sql.create),

  // add user to db
  // nameObj =  {name, email, fbToken}
  add: userObj =>
    repo.one(sql.add, userObj, user => user.id),

  // find all user records
  all: () =>
    repo.any(sql.all),

  // find userId for a given userName
  findId: userName =>
    repo.oneOrNone(sql.findId, userName, user => user ? user.id : 0),

  // find userName for a given userId
  findName: userId =>
    repo.oneOrNone(sql.findName, userId, user => user ? user.name : 0),

  // drop the table
  drop: () =>
    repo.any(sql.drop)
});

