const dbURI = process.env.MONGO_DB_URI;
const should = require('chai').should();
const mongoose = require('mongoose');

var User = require('../../models/user');

describe("User test suite", () => {

  beforeEach((done) => {
    mongoose.Promise = global.Promise;

    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  it('should encrypt the password.', () => {
    let user = new User();
    user.password = 'start0000';
    expect(user.encryptPassword(user.password)).toContain('$2a$05');
  });

  it("should remove from database", (done) => {
    User.findOneAndRemove({
      email: 'movin@gmail.com'
    }, (err, data) => {
      if (err) return done(err);
      return done();
    });
  });

  it("should save on the database", (done) => {
    const mockedUser = {
      name: 'Movin',
      city: 'Shimla',
      state: 'Hp',
      email: 'movin@gmail.com',
      password: 'start0000'
    }
    const newUser = new User(mockedUser);

    newUser.password = newUser.encryptPassword('start0000');
    newUser.save((err, result) => {
      if (err) return done(err);
      return done(null, newUser);
    });
  });

});
