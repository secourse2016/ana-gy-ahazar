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

/**
 * Tests if the countries are returned successfully from the database.
 *
 */
describe('getCountriesFromDB', function() {
  it('should return all countries documents in the database', function(done) {
    flights.getCountries(function(err, countries) {
      if(err)
      throw err;

      assert.equal(countries.length, 241);
      done();
    });
  });
});

/**
 * Tests if the airports are returned successfully from the database.
 *
 */
describe('getAirportsFromDB', function() {
  it('should return all airports documents in the database', function(done) {
    flights.getAirports(function(err, airports) {
      if(err)
      throw err;

      assert.equal(airports.length, 5881);
      done();
    });
  });
});

/**
 * Tests the API ends.
 *
 */
describe('API', function() {
  request = request(app);
  it("should return a 404 for urls that don't exist", function(done) {
    request.get('/kareem').expect(404, done);
  });

  it('/api/countries should return a countries JSON object array with keys [_id, name, dial_code, code]', function(done) {
    request.get('/api/countries').
    expect('Content-Type', 'application/json; charset=utf-8').
    expect(200).
    end(function(err, response) {
      if(err)
      throw err;

      var countries = JSON.parse(response.text);

      assert.equal(countries.length, 241);

      var country = countries[0];
      assert.equal(typeof country.name != "undefined" && typeof country.dial_code != "undefined" && typeof country._id != "undefined" && typeof country.code != "undefined", true);
      done();
    });
  });

  it('/api/airports should return a airports JSON object array with keys [_id, iata, lon, iso, status, name, continent, type, lat, size]', function(done) {
    request.get('/api/airports').
    expect('Content-Type', 'application/json; charset=utf-8').
    expect(200).
    end(function(err, response) {
      if(err)
      throw err;

      var airports = JSON.parse(response.text);

      assert.equal(countries.length, 5881);

      var airport = airports[0];
      assert.equal(typeof airport.iata != "undefined" && typeof airport.lon != "undefined" && typeof airport._id != "undefined" && typeof airport.iso != "undefined" && typeof airport.status != "undefined" && typeof airport.name != "undefined" && typeof airport.continent != "undefined" && typeof airport.type != "undefined" && typeof airport.lat != "undefined" && typeof airport.size != "undefined", true);
      done();
    });
  });
});
