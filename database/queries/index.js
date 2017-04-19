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

module.exports = {

  rooms: {
    create: sql('rooms/create.sql'),
    add: sql('rooms/add.sql'),
    addUser2: sql('rooms/addUser2.sql'),
    all: sql('rooms/all.sql'),
    findName: sql('rooms/findName.sql'),
    findId: sql('rooms/findId.sql')
  },
  users: {
    create: sql('users/create.sql'),
    add: sql('users/add.sql'),
    all: sql('users/all.sql'),
    findName: sql('users/findName.sql'),
    findId: sql('users/findId.sql')

  }
};
