var assert = require('chai').assert;
var request = require('supertest');
var app = require('../app/app.js');
var flights = require('../app/flights');
var db = require('../app/db.js');
var fs = require('fs');

before(function(done) {
  // use this after you have completed the connect function
  db.connect(process.env.DBURL, function(err, db) {
    if(err) {
      return done(err);
    }
    else {
      done();
    }
  });
});

describe("randomBoolean", function() {
  it("should return a random boolean value", function() {
    // TODO
    var randomBoolean =  flights.randomBoolean();
    assert.equal(randomBoolean==true || randomBoolean==false,true);
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

describe("seed", function() {
it("", function() {
// TODO
flights.seed(function(){
seeded=true;
assert.equal(seededfalse);
done();
});
});
});
