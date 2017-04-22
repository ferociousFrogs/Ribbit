// socket utility functions
const db = require('../../database/database.js');


module.exports = {
  dropNCreateDBTables: () => {
    db.complex.dropAllTables()
    .then(db.complex.initializeDB)
    .catch(err => console.error('Error dropping or creating tables', err));
  },

  countClients: (room) => {
    const clientsInRoom = io.nsps['/'].adapter.rooms[room];
    const numClients = clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length;
    return numClients;
  }
};
