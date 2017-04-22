const db = require('../../database/database.js');

describe('rooms_users tests', () => {
  // add some test data before each test
  beforeEach(() =>
    db.rooms_users.drop()
      .then(db.rooms_users.create)
      .then(() => (
        db.rooms_users.add({ userId: 1, roomId: 1 })
    ))
  );
  it('should have one entry populated', () => (
    db.rooms_users.all().then((results) => {
      expect(results.length).toEqual(1);
    })
  ));
  it('return an id of 2 when a second room is added', () => (
    db.rooms_users.add({ userId: 2, roomId: 2 }).then((results) => {
      expect(results).toEqual(2);
    })
  ));
});
