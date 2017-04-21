const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

// Helper for linking to external query files;
function sql(file) {
  const fullPath = path.join(__dirname, file); // generating full path;
  const options = {
    minify: true
  };

  const qf = new QueryFile(fullPath, options);
  if (qf.error) {
    console.error(qf.error);
  }
  return qf;
}

// exports an object of all the queries converted to
// strings with the queries' filenames used as keys
module.exports = {
  rooms: {
    create: sql('rooms/create.sql'),
    add: sql('rooms/add.sql'),
    all: sql('rooms/all.sql'),
    findName: sql('rooms/findName.sql'),
    findId: sql('rooms/findId.sql')
  },
  users: {
    create: sql('users/create.sql'),
    add: sql('users/add.sql'),
    all: sql('users/all.sql'),
    findId: sql('users/findId.sql'),
    findName: sql('users/findName.sql')
  },
  messages_code: {
    create: sql('messages_code/create.sql'),
    add: sql('messages_code/add.sql'),
    all: sql('messages_code/all.sql')
  },
  rooms_users: {
    create: sql('rooms_users/create.sql'),
    add: sql('rooms_users/add.sql'),
    all: sql('rooms_users/all.sql')
  }
};
