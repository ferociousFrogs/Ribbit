const sql = require('../queries').rooms;

module.exports = (repo, pgp) => {

    /*
     This dbsitory mixes hard-coded and dynamic SQL,
     primarily to show a diverse example of using both.
     */

  return {

    // Creates the table;
    create: () =>
        repo.none(sql.create),

    // // Removes all records from the table;
    // empty: () =>
    //     repo.none(sql.empty),

    // // Adds a new user, and returns the new id;
    add: roomObj =>
      repo.one(sql.add, roomObj, room => room.id),

    // // Tries to delete a user by id, and returns the number of records deleted;
    // remove: id =>
    //     repo.result('DELETE FROM Users WHERE id = $1', id, r => r.rowCount),

    // // Tries to find a user from id;
    // find: id =>
    //     repo.oneOrNone('SELECT * FROM Users WHERE id = $1', id),

    // Returns all user records;
    all: () =>
        repo.any('SELECT * FROM rooms;')

    // // Returns the total number of users;
    // total: () =>
    //     repo.one('SELECT count(*) FROM Users', [], a => +a.count)
  };
};
