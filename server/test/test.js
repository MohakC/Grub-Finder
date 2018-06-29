const assert = require('assert');
const request = require('supertest');
const expect = require("expect.js");

const testUserInfo = {
  "fname" : "Ben",
  "lname": "Smith",
  "username": "B",
  "password": "password",
  "phone": "2323323323",
  "address": "7064 Belltoll Ct",
  "email": "ben@gmail.com",
  "restaurants": []
}

const testUser = {
  "username": "B",
  "password": "password",
}
const invalidTestUser = {
  "username": "B",
  "password": "testing",
}

let testUserJWT;

before('Check Express Connection', function(done) {
  app = require('../index').app;
  app.listen(3000, () => {
    console.log("Express Connected");
    done();
  });
});

before('Check Mongo Connection',function(done) {
  mongo = require('../index').mongo;
  mongo.connection.on('open', function() {
    console.log("Mongo Connected");
    done();
  });
});

describe('POST /users/register', function() {
  it('respond with json', function(done) {
    request(app)
      .post('/api/v1/users/register')
      .send(testUserInfo)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.message).to.eql('User Created');
        expect(res.body.user.phone).to.equal(testUserInfo.phone);
        expect(res.body.user.username).to.equal(testUserInfo.username);
        done();
    });
  });


  it('not let duplicate usernames exists', function(done) {
    request(app)
    .post('/api/v1/users/register')
    .send(testUserInfo)
    .end((err, res) => {
      expect(res.body.message).to.eql('Username has already been taken');
      done();
    });
  });
});

describe('POST /users/login', function() {
  it('respond with json', function(done) {
    request(app)
      .post('/api/v1/users/login')
      .send(testUser)
      .end((err, res) => {
        expect(res.body.message).to.eql('User Authenticated');
        expect(res.body.user[0].password).to.equal(testUser.password);
        expect(res.body.user[0].username).to.equal(testUser.username);
        testUserJWT = res.body.JWT;
        done();
    });
  });

  it('not let invalid password', function(done) {
    request(app)
    .post('/api/v1/users/login')
    .send(invalidTestUser)
    .end((err, res) => {
      if (err) throw err;
      expect(res.body.message).to.eql('Invalid username or password');
      done();
    });
  });
});

describe('POST /restaurants', function() {
  const testQuery = {
    "city": "Delhi",
    "cuisine": "Chinese"
  }
  it('create entries in database', function(done) {
    this.timeout(5000);  
    request(app)
      .post('/api/v1/restaurants/')
      .set('Authorization', testUserJWT)
      .send(testQuery)
      .end((err, res) => {
        if (err) throw err
        expect(res.body.message).to.eql('Added to DB');
        done();
    });
  });
});

describe('GET /restaurants/<city>/<cuisine>', function() {
  it('finds restaurants based on query', function(done) {
    request(app)
      .get('/api/v1/restaurants/Delhi/Chinese')
      .set('Authorization', testUserJWT)
      .end((err, res) => {
        if (err) throw err
        expect(res.body.data).to.be.ok();
        done();
    });
  });
});

describe('POST /restaurants/favorites', function() {
  it('adds a restaurant to a user favorites', function(done) {
    request(app)
      .post('/api/v1/restaurants/favorites')
      .set('Authorization', testUserJWT)
      .send({"res_id": "833"})
      .end((err, res) => {
        if (err) throw err
        expect(res.body.message).to.eql('Added to favourites');
        done();
    });
  });
});

describe('GET /restaurants/favorites', function() {
  it('gets all favorites for a user', function(done) {
    request(app)
      .get('/api/v1/restaurants/favorites')
      .set('Authorization', testUserJWT)
      .end((err, res) => {
        if (err) throw err
        expect(res.body.restaurants).to.not.be.empty();
        done();
    });
  });
});

describe('POST /restaurants/reviews', function() {
  it('adds a review to a restaurant', function(done) {
    request(app)
      .post('/api/v1/restaurants/reviews')
      .set('Authorization', testUserJWT)
      .send({"res_id": "833", "review":"Awesome"})
      .end((err, res) => {
        if (err) throw err
        expect(res.body.message).to.eql('Review Added');
        done();
    });
  });
});

describe('PUT /restaurants/reviews', function() {
  it('removes a review from a restaurant', function(done) {
    request(app)
      .put('/api/v1/restaurants/reviews')
      .send({"res_id": "833", "review":"Awesome"})
      .set('Authorization', testUserJWT)
      .end((err, res) => {
        if (err) throw err
        expect(res.body.message).to.be.eql('Review Deleted');
        done();
    });
  });
});

describe('DELETE /restaurants/favorites/<res_id>', function() {
  it('deletes a restaurant from a user favorites', function(done) {
    request(app)
      .delete('/api/v1/restaurants/favorites/833')
      .set('Authorization', testUserJWT)
      .end((err, res) => {
        if (err) throw err
        expect(res.body.message).to.be.eql('Deleted from favourites');
        done();
    });
  });
});






after(function() {
  const User = mongo.model('User');
  User.findOneAndDelete({"username" : testUser.username}, () => {
    console.log("Test User Deleted");
  });
});