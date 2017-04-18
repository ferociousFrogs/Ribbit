const pgp = require('pg-promise')();
const path = require('path');

const connection = process.env.DATABASE_URL || 'psql://localhost:5432/ribbit';
console.log('connection inside db', connection);

const db = pgp(connection);


module.exports = db;

db.task(task => {
  return task.none('CREATE TABLE rooms (id serial PRIMARY KEY, name text NOT NULL);')
              .then(() => {
                return task.none(`INSERT INTO rooms values ('1', 'ribbit');`);
              })
              .then(() => {
                return task.any(`SELECT * FROM rooms`);
              });
  })
  .then((data) => {
    console.log('success! we have data', data);
  })
  .catch((err) => { console.log('no results', err); });

