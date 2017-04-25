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
    findId: sql('rooms/findId.sql'),
    drop: sql('rooms/dropTable.sql')
  },
  users: {
    create: sql('users/create.sql'),
    add: sql('users/add.sql'),
    all: sql('users/all.sql'),
    findId: sql('users/findId.sql'),
    findName: sql('users/findName.sql'),
    drop: sql('users/dropTable.sql')
  },
  messagesNCode: {
    create: sql('messagesNCode/create.sql'),
    add: sql('messagesNCode/add.sql'),
    all: sql('messagesNCode/all.sql'),
    findMCId: sql('messagesNCode/findMCId.sql'),
    update: sql('messagesNCode/update.sql'),
    drop: sql('messagesNCode/dropTable.sql')
  },
  rooms_users: {
    create: sql('rooms_users/create.sql'),
    add: sql('rooms_users/add.sql'),
    all: sql('rooms_users/all.sql'),
    drop: sql('rooms_users/dropTable.sql')
  },
  messages_users: {
    create: sql('messages_users/create.sql'),
    add: sql('messages_users/add.sql'),
    all: sql('messages_users/all.sql'),
    drop: sql('messages_users/dropTable.sql')
  }
};
