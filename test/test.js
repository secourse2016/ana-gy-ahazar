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
describe("clear", function() {
	it("should delete all the database", function() {
		db.clear(function() {
			db.listCollections().toArray().then(function (collections) {
				collections.forEach(function (c) {
					var count = db.collection(c.name).count();
					assert.equal(count,0);
				});
			});
		})

});
});

describe("getReservation", function() {
	it("should review your reservation", function() {
		var bookingReference = 'abc1234567';
		flights.getReservation(function(err, reservation) {
			assert.equal(reservation.length, 1);

		}, bookingReference);

	});
});