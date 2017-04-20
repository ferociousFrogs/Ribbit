const tables = {
  users: require('../queries').users,
  rooms: require('../queries').rooms
};


module.exports = (repo, pgp) => ({
  initializeDB: () => (
      repo.tx((t) => {
        const keys = Object.values(tables);
        const queries = keys.map(table => t.none(table['create']));
        return t.batch(queries);
      })
    )
    .then(() => console.log('Tables created!')),

  createRoom: roomObj => (
  // Assumes user is in system
    // roomObj should equal {roomName: roomName, userName: userName}
    repo.task(task => (
        task.oneOrNone(tables.users.findId, roomObj.userName, user => user && user.id)
            .then((userId) => {
              const roomInfo = {
                roomName: roomObj.roomName,
                user1_Id: userId
              };
              return userId || task.one(tables.rooms.add, roomInfo, room => room.id);
            })
            .catch(err => console.error('Error creating room', err))
      ))
      .then((data) => {
        console.log('success! we have data', data);
      })
      .catch(err => console.error('Error creating room', err))
    )

});