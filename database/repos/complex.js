const tables = {
  users: require('../queries').users,
  rooms: require('../queries').rooms,
  messagesNCode: require('../queries').messagesNCode,
  rooms_users: require('../queries').rooms_users,
  messages_users: require('../queries').messages_users
};

const complex = require('../queries').complex;
const dummyData = require('../../spec/dummyData.js');

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

  findAllRooms: user => (
    repo.any(complex.findAllRooms, user)
  ),

  findAllMessages: user => (
    repo.any(complex.findAllMessages, user)
  ),

  addDummyData: () => (
      repo.tx((t) => {
        const roomQueries = dummyData.rooms.map((room, index) =>
          t.any(tables.rooms.add, dummyData.rooms[index]));
        return t.batch(roomQueries);
      })
    )
    .then(() => {
      console.log('Rooms added!');
      repo.tx((t) => {
        const userQueries = dummyData.users.map((user, index) =>
          t.any(tables.users.add, dummyData.users[index]));
        return t.batch(userQueries);
      });
    })
    .then(() => {
      console.log('Users added!');
      repo.tx((t) => {
        const messagesQueries = dummyData.messages.map((message, index) =>
          t.any(tables.messagesNCode.add, dummyData.messages[index]));
        return t.batch(messagesQueries);
      });
    })
    .then(() => console.log('Messages added!'))
    .catch(err => console.error('Error creating tables (repos/complex.js) ', err))
});
