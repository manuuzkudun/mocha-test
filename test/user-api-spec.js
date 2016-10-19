
const should = require('should');
require('co-mocha');
var data = require('../user-data');
const fs = require('co-fs');
const api = require('../user-web.js');
const request = require('co-supertest').agent(api.listen());

before( function *() {
  yield fs.writeFile('./users.json','[]');
})


describe('user data', function() {
  it('should have +1 user count after saving', function* () {
    // Get users
    const users = yield data.users.get();

    // Save new user
    yield data.users.save({name: 'John'});
    // Get new user count
    const newUsers = yield data.users.get();

    newUsers.length.should.equal(users.length + 1);

  });
});

describe('user web', function() {
  it('should have +1 user count after saving', function* () {
      var users = (yield request.get('/user').expect(200).end()).body;

      yield data.users.save({name: 'John'});

      var newUsers = (yield request.get('/user').expect(200).end()).body;

      newUsers.length.should.equal(users.length + 1);

  });

});
