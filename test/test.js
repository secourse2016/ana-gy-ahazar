var assert = require('chai').assert;
var request = require('supertest');
var db = require('../app/db.js');
var app = require('../app/app.js');
var flights = require('../app/flights');

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
