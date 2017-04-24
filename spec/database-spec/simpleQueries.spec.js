const db = require('../../database/database.js');


// tests queries for rooms
describe('Room table populates and returns data', () => {
  // add some test data before each test
  beforeEach(() =>
    db.rooms.drop()
      .then(db.rooms.create)
      .then(() => (
        db.rooms.add({ roomName: 'Flosten Paradise' })
    ))
  );

  it('should have one entry populated', () => (
    db.rooms.all().then((results) => {
      expect(results.length).toEqual(1);
    })
  ));

  it('return an id of 2 when a second room is added', () => (
    db.rooms.add({ roomName: 'RoomName' }).then((results) => {
      expect(results).toEqual(2);
    })
  ));

  it('should find the id for a given roomName', () => (
    db.rooms.findId({ roomName: 'Flosten Paradise' }).then((results) => {
      expect(results).toEqual(1);
    })
  ));

  it('should find the name for a given roomId', () => (
    db.rooms.findName({ roomId: 1 }).then((results) => {
      expect(results).toEqual('Flosten Paradise');
    })
  ));
});


// Tests queries for users
describe('Users table populates and returns data', () => {
  // add some test data before each test
  beforeEach(() =>
    db.users.drop()
      .then(db.users.create)
      .then(() => (
        db.users.add({
          userName: 'Corbin',
          email: 'Dallas',
          fbToken: 58008
        })
    ))
  );

  it('should have one entry populated', () => (
    db.users.all().then((results) => {
      expect(results.length).toEqual(1);
    })
  ));

  it('return an id of 2 when a second user is added', () => (
    db.users.add({
      userName: 'Multipass',
      email: 'Multi-pass',
      fbToken: 58008
    })
    .then((results) => {
      expect(results).toEqual(2);
    })
  ));

  it('should find the id for a given userName', () => (
    db.users.findId({ userName: 'Corbin' }).then((results) => {
      expect(results).toEqual(1);
    })
  ));

  it('should find the name for a given userId', () => (
    db.users.findName({ userId: 1 }).then((results) => {
      expect(results).toEqual('Corbin');
    })
  ));

  it('should have a timeStamp', () => (
    db.users.all().then((results) => {
      expect(results[0].time_stamp).toBeDefined();
    })
  ));
});