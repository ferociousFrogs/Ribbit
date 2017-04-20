const sql = require('../queries').users;

module.exports = (repo, pgp) => ({
  create: () =>
    repo.none(sql.create),
  add: name =>
    repo.one(sql.add, name, user => user.id),
  all: () =>
    repo.any(sql.all),
  findId: userName =>
    repo.one(sql.findId, userName, user => user.id),
  findName: userId =>
    repo.one(sql.findName, userId, user => user.name)
});

