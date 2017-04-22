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
    repo.one(sql.findId, userName, user => user.id),

  // find userName for a given userId
  findName: userId =>
    repo.one(sql.findName, userId, user => user.name),

  // drop the table
  drop: () =>
    repo.any(sql.drop)
});

