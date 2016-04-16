var assert = require('chai').assert;
var request = require('supertest');
var app = require('../app/app.js');
var flights = require('../app/flights');
var db = require('../app/db.js');

before(function(done) {
  db.connect(function(err, db) {
    if(err) {
      return done(err);
    }
    else {
      done();
    }
  });
});
