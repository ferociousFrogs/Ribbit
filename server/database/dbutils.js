// As of right now, this file defines and limits the db calls
// that can be made from the server

// Eventually, I would like to extra all of the socket routes
// out from the server file as well

const db = require('../../database/database.js');


module.exports = {
  rooms: {
    create: db.rooms.create,
    add: db.rooms.add,
    addUser2: db.rooms.addUser2,
    all: db.rooms.all,
    findName: db.rooms.findName, // takes a room_id
    findId: db.rooms.findId // takes a roomName
  },
  users: {
    create: db.users.create,
    add: db.users.add,
    all: db.users.all,
    findName: db.users.findName, // takes a user_id
    findId: db.rooms.findId // takes a userName
  }

  // createAndQuery: db.task(task => (
  //   task.none('CREATE TABLE rooms (id serial PRIMARY KEY, name text NOT NULL);')
  //            .then(() => (
  //              task.none(`INSERT INTO rooms values ('1', 'Dylan!!');`)
  //            ))
  //            .then(() => (
  //              task.any(`SELECT * FROM rooms`)
  //            ))
  // ))
  // .then((data) => {
  //   console.log('success! we have data', data);
  // })
  // .catch((err) => { console.log('no results', err); })
};
