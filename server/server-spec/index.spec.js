const app = require('../index.js');
const request = require('supertest');


// to create a test
  // 1) Be sure to wrap your test in a "test('it should...', () => {})"
  // 2) You cannot run the server test while the server is running.
  //    Shut down the server before running tests.
  // 3) Pass the server file (the file being tested) to the request function then follow the example
  // 4) control + c to end the test session after it finishes running.

test('App component snapshot test', () => {
  request(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
    });
});
