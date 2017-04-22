const db = require('../../database/database.js');

beforeAll(() =>
  // Clears the database
  // Jest will wait for this promise to resolve before running tests.
  db.complex.dropAllTables()
    .then(db.complex.initializeDB)
);


// tests queries for rooms
describe('Room table populates and returns data', () => {
  // add some test data before each test
  beforeEach(() =>
    db.rooms.drop()
      .then(db.rooms.create)
      .then(() => (
        db.rooms.add('foo')
    ))
  );

  it('should have one entry populated', () => (
    db.rooms.all().then((results) => {
      expect(results.length).toEqual(1);
    })
  ));

  it('return an id of 2 when a second room is added', () => (
    db.rooms.add('RoomName').then((results) => {
      expect(results).toEqual(2);
    })
  ));

  it('should find the id for a given roomName', () => (
    db.rooms.findId({ roomName: 'foo' }).then((results) => {
      expect(results.id).toEqual(1);
    })
  ));

  it('should find the name for a given roomId', () => (
    db.rooms.findName({ roomId: 1 }).then((results) => {
      expect(results.name).toEqual('foo');
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
          name: 'Corbin',
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
      name: 'Multipass',
      email: 'Multi-pass',
      fbToken: 58008
    })
    .then((results) => {
      expect(results).toEqual(2);
    })
  ));

  it('should find the id for a given userName', () => (
    db.users.findId({ userName: 'Corbin' }).then((results) => {
      console.log('users results', results);
      expect(results).toEqual(1);
    })
  ));

  it('should find the name for a given userId', () => (
    db.users.findName({ userId: 1 }).then((results) => {
      expect(results).toEqual('Corbin');
    })
  ));
});
