const db = require('../../database/database.js');

describe('messages_code tests', () => {
  // add some test data before each test
  beforeEach(() =>
    db.messages_code.drop()
      .then(db.messages_code.create)
      .then(() => (
        db.messages_code.add({ user1Id: 1, user2Id: 2, roomId: 5, type: 'message', data: 'Lilu Dallas multi-pass' })
    ))
  );
  it('should have one entry populated', () => (
    db.messages_code.all().then((results) => {
      expect(results.length).toEqual(1);
    })
  ));
  it('should return an id of 2 when a second room is added', () => (
    db.messages_code.add({ user1Id: 3, user2Id: 4, roomId: 13, type: 'code', data: 'const fifthElement = (elements) => elements.filter(element => element === "love"' }).then((results) => {
      expect(results).toEqual(2);
    })
  ));
});
