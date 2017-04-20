const connection = process.env.DATABASE_URL || 'psql://localhost:5432/ribbit';

const repos = {
  rooms: require('./repos/rooms.js')
};

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
