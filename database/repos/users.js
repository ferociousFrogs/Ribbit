const sql = require('../queries').users;

module.exports = (db, pgp) => {

    /*
     This repository mixes hard-coded and dynamic SQL,
     primarily to show a diverse example of using both.
     */

    return {

        // Creates the table;
        create: () =>
            db.none(sql.create),

        // Initializes the table with some user records, and return their id-s;
        // init: () =>
        //     db.map(sql.init, [], row => row.id),

        // // Drops the table;
        // drop: () =>
        //     db.none(sql.drop),

        // Removes all records from the table;
        // empty: () =>
        //     db.none(sql.empty),

        // Adds a new user, and returns the new id;
        add: name =>
            db.one(sql.add, name, user => user.id),

        // Tries to delete a user by id, and returns the number of records deleted;
        // remove: id =>
        //     db.result('DELETE FROM Users WHERE id = $1', id, r => r.rowCount),

        // Tries to find a user from id;
        // find: id =>
        //     db.oneOrNone('SELECT * FROM Users WHERE id = $1', id),

        // Returns all user records;
        all: () =>
            db.any('SELECT * FROM users'),

        // Returns the total number of users;
        // total: () =>
        //     db.one('SELECT count(*) FROM Users', [], a => +a.count)
    };
};
