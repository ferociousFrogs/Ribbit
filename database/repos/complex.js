const tables = {
  users: require('../queries').users,
  rooms: require('../queries').rooms,
  messagesNCode: require('../queries').messagesNCode,
  rooms_users: require('../queries').rooms_users,
  messages_users: require('../queries').messages_users
};

const complex = require('../queries').complex;

// Exporting chained queries that run as tasks or transactions
// Both offer the opportunity to query the db multiple times
// while on the same DB connection
module.exports = (repo, pgp) => ({
  initializeDB: () => (
      repo.tx((t) => {
        const keys = Object.values(tables);
        const queries = keys.map(table => t.none(table['create']));
        return t.batch(queries);
      })
    )
    .then(() => console.log('Tables created!'))
    .catch(err => console.error('Error creating tables (repos/complex.js) ', err)),

  // drop all the tables in the db
  dropAllTables: () => (
      repo.tx((t) => {
        const keys = Object.values(tables);
        const queries = keys.map(table => t.none(table['drop']));
        return t.batch(queries);
      })
    )
    .then(() => console.log('Tables dropped!'))
    .catch(err => console.error('Error dropping tables', err)),

  findAllRooms: (userName) => (
    repo.any(complex.findAllRooms, userName)
  )
});
