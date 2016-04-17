var assert = require('chai').assert;
var request = require('supertest');
var db = require('../app/db.js');
var app = require('../app/app.js');
var flights = require('../app/flights');
var fs = require('fs');

before(function(done) {
  db.connect(process.env.DBURL, function(err, db) {
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

      assert.equal(airports.length, 5881);

      var airport = airports[0];
      assert.equal(typeof airport.iata != "undefined" && typeof airport.lon != "undefined" && typeof airport._id != "undefined" && typeof airport.iso != "undefined" && typeof airport.status != "undefined" && typeof airport.name != "undefined" && typeof airport.continent != "undefined" && typeof airport.type != "undefined" && typeof airport.lat != "undefined" && typeof airport.size != "undefined", true);
      done();
    });
  });
});

describe("randomBoolean", function() {
  it("should return a random boolean value", function() {
    // TODO
    var randomBoolean =  flights.randomBoolean();
    assert.equal(randomBoolean == true || randomBoolean == false, true);
  });
});

describe("randomFlightClass", function() {
  it("should return a random flight class", function() {
    // TODO
    var randomFlightClass =  flights.randomFlightClass();
    assert.equal(randomFlightClass==="business" || randomFlightClass==="economy" || randomFlightClass==="first",true);

  });
});

describe("chooseRandomElement", function() {
  var arrayOfNumbers = [1,7,2,8];
  it("should return a random element form the array", function() {
    // TODO
    var randomElement = flights.chooseRandomElement(arrayOfNumbers);
    var index      = arrayOfNumbers.indexOf(randomElement);
    assert.equal(index!==-1,true);

  });
});

describe("generateFlightnumber", function() {
  it("should return a random flight number with begining with two letters and reset are five numbers", function() {
    // TODO
    var randomFlightnumber =  flights.generateFlightnumber();
    var lettersPart = randomFlightnumber.substring(0, 2);
    var numbersPart = randomFlightnumber.substring(2, 7);
    var flag = false;
    for (var i = 0; i < lettersPart.length ;i++) {
      if(lettersPart.charCodeAt(i)>=65 && lettersPart.charCodeAt(i)<=90){
        flag=true;
        assert.equal(flag,true);
      }
      flag = false;
    }
    assert.equal(typeof parseInt(numbersPart)=== "number",true);

  });
});

describe("generatePromo", function() {
  it("should return a JSON object of code , discount , and if it is valid or not", function() {
    // TODO
    var generatePromo = flights.generatePromo();
    var flag = false;
    for (var i = 0; i < generatePromo.code.length; i++) {
      if((generatePromo.code.charCodeAt(i)>=65 && generatePromo.code.charCodeAt(i)<=90)||(generatePromo.code.charCodeAt(i)>=48 && generatePromo.code.charCodeAt(i)<=57)){
        flag=true;
        assert.equal(flag,true);
      }
      flag = false;
    }
    var discount = generatePromo.discount;
    assert(discount>0.0 && discount <= 1.0 ,true);
  }  );
});
describe("feedback",function(){
    it("should post a feedback into the feedback collection" , function(done){
       var feedback = {email:2356465655, message: 45643786970};
       request.post('/feedback').send(feedback).expect(200,done);
    });

  });


