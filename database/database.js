// create the connection pathway
const connection = process.env.DATABASE_URL || 'psql://localhost:5432/ribbit';

// create the paths to each set of unique queries
const repos = {
  rooms: require('./repos/rooms.js'),
  users: require('./repos/users.js'),
  messagesNcode: require('./repos/messagesNCode.js'),
  complex: require('./repos/complex.js'),
  rooms_users: require('./repos/rooms_users.js')
};

// map over our queries to attach them to the options we
// will pass to the database when we create it
const options = {
  extend: (obj) => {
    const keys = Object.keys(repos);
    keys.forEach((key) => {
      obj[key] = repos[key](obj, pgp);
    });
  }
};

const pgp = require('pg-promise')(options);

const db = pgp(connection);

module.exports = db;
