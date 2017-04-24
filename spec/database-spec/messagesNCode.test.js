const db = require('../../database/database');

describe('messagesNCode tests', () => {
  // add some test data before each test
  beforeEach(() =>
    db.messagesNCode.drop()
      .then(db.messagesNCode.create)
      .then(() => (
        db.messagesNCode.add({ roomId: 5, type: 'message', data: 'Lilu Dallas multi-pass' })
    ))
  );
  it('should have one entry populated', () => (
    db.messagesNCode.all().then((results) => {
      expect(results.length).toEqual(1);
    })
  ));
  it('should return an id of 2 when a second room is added', () => (
    db.messagesNCode.add({ roomId: 13, type: 'code', data: 'const fifthElement = (elements) => elements.filter(element => element === "love"' })
      .then((results) => {
        expect(results).toEqual(2);
      })
  ));
});
