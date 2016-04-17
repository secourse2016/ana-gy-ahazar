var moment = require('moment');
var db = require('./db');
var fs = require('fs');

/**
* This function return a random boolean value.
*
* @returns {Boolean}
*/
var randomBoolean = function() {
  var chosenBoolean = Math.random() < 0.5 ? true : false;
  return chosenBoolean;
};

/**
* This function returns a random flight class
*
* @returns {String}
*/
var randomFlightClass = function() {
  var number = Math.floor(Math.random() * 3);

  if(number === 0){
    return "business";
  }

  if(number === 1){
    return "first";
  }

  return "economy";
};

/**
* returns a random element from a givin array.
*
* @param {Array} an array of elements
* @returns {Object}
*/
var chooseRandomElement = function(array) {
  var number = Math.floor(Math.random() *(array.length));
  return array[number];
};

/**
* This function generates a random flight number.
*
* @returns {String}
*/
var generateFlightnumber = function() {
  var text = "";
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numbers = "0123456789";

  for(var i = 0; i < 2; i++) {
    text += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for(var i = 0; i < 5; i++) {
    text += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return text;
};

/**
* This function generates a random promotion codes
*
* @returns {JSONObject}
*/
var generatePromo = function() {
  //genereating a code
  var code = "";
  for (var i = 0; i < 8; i++) {
    if(randomBoolean()){
      //Capital Letter
      var letter = String.fromCharCode(65 + (Math.floor(Math.random() * 26)));
      code += letter;
    }
    else{
      //number
      var number = Math.floor(Math.random() * 10);
      code += number;
    }
  }

  //genereating a discount
  var discount = ((Math.floor(Math.random() * 100)) + 1) / 100;

  var valid = true;

  var promoCode = {
    "code": code,
    "discount": discount,
    "valid": valid
  };

  return promoCode;
};

/**
* This function seeds the database.
*
* @param {Function} callback function that is called after the seeding is complete.
*/
var seed = function(callback) {
  /* static arrays */
  var aircraftTypes =["Aerospatiale", "ATR", "Airbus", "Antonov", "Beechcraft", "Boeing", "BAC" , "BAE", "Comac",
  "Convair", "de Havilland", "Bombardier", "Canadair",
  "Embraer", "Fairchild", "Fokker", "Ilyushin", "Irkut", "Lockheed",
  "McDonnell Douglas", "Mitsubishi", "Saab", "Sukhoi", "Tupolev", "Vickers", "Yakovlev"];

  var originOrDestination1 =["Mumbai", "Cairo", "Hong kong", "Johannesburg", "Riyadh",
  "London Heathrew", "Las Vegas", "Las Angeles", " Frankfurt", "Rome"];

  var originOrDestination2 =["Delhi", "Jeddah", "Taiwan", "Cape Town", "Jeddah",
  "New York-JohnF. Kennedy", "Las Angeles", "San Francisco", "Berlin", "Milan"];

  var airCrafts = {};

  for (var i = 0; i < 200; i++) {
    var generatedAircraftModel = Math.floor(100 + Math.random() * 900).toString();
    var date_of_manufacture = moment('1990-06-10').toDate().getTime();

    var airCraft = 	{
      "aircraftModel": generatedAircraftModel,
      "date_of_manufacture": date_of_manufacture,
      "capacity": "300",
      "avg_speed": "700",
      "total_flight_hours": "2000",
      "in_flight_entertainment": 	{
        "wifi": randomBoolean(),
        "radio": randomBoolean(),
        "power_port": randomBoolean()
      }
    };

    airCrafts.push(airCraft);
  }

  var number = Math.floor(Math.random() * (originOrDestination1.length));
  var randomCost = Math.floor(600+Math.random() * 8400);
  var flightDuration = Math.round((1 + Math.random() * 16) * 10) / 10;
  var dateCode = moment('2016-04-30 12:25 AM', 'YYYY-MM-DD hh:mm A').toDate().getTime();
  var date = new Date (datecode);

  var flights = {};

  /* seeding the flight table back and forth form list originOrDestination1 to originOrDestination2 and vice versa */
  for (var i = 11; i < 61; i++) {
    for (var j = 0; j < originOrDestination1.length; j++) {
      var origin = originOrDestination1[j];
      var destination = originOrDestination2[j];
      var flight =	{
        "Airline": "Air Madagascar",
        "flightNumber": generateFlightnumber(),
        "departureDateTime":dateCode,
        "arrivalDateTime": date.getTime() + (flightDuration*1000*60*60),
        "class": randomFlightClass(),
        "type": "Direct",
        "tranzit": [],
        "duration": flightDuration,
        "origin": origin,
        "destination": destination,
        "remaining_seats": "50",
        "cost": randomCost,
        "currency": "USD",
        "seatmap": 	[
          {
            "seat": 5666,
            "taken": randomBoolean()
          }
        ],
        "aircraft": airCrafts[Math.floor(Math.random() * airCrafts.length)]
      };

      flights.push(flight);

      origin = originOrDestination2[j];
      destination = originOrDestination1[j];
      flight =	{
        "Airline": "Air Madagascar",
        "flightNumber": generateFlightnumber(),
        "departureDateTime": dateCode,
        "arrivalDateTime": date.getTime() + (flightDuration*1000*60*60),
        "class": randomFlightClass(),
        "type": "Direct",
        "tranzit": [],
        "duration": flightDuration,
        "origin": origin,
        "destination": destination,
        "remaining_seats": "50",
        "cost": randomCost,
        "currency": "USD",
        "seatmap": 	[
          {
            "seat": 5666,
            "taken": randomBoolean()
          }
        ],
        "aircraft": airCrafts[Math.floor(Math.random() * airCrafts.length)]
      };

      flights.push(flight);

    }

    date.setDate(date.getDate() + 1);
  }

  /* seeding the countries table */
  var countries = JSON.parse(fs.readFileSync('../data/countries.json', 'utf8'));

  /* seeding the airports table */
  var airports = JSON.parse(fs.readFileSync('../data/airports.json', 'utf8'));

  /* seeding the promotion codes table */
  var promotionCodes = {};
  for (var i = 0; i < 100; i++) {
    var promoCode = generatePromo();

    promotionCodes.push(promoCode);
  }

  var database = db.getDatabase();

  //clearing the database
  db.clear(function(){
    //seeding the database
    database.collection('airCrafts').insert(airCrafts, function(err, docs) {
      database.collection('flights').insert(flights, function(err, docs) {
        database.collection('countries').insert(countries, function(err, docs) {
          database.collection('airports').insert(airports, function(err, docs) {
            database.collection('promotionCodes').insert(promotionCodes, function(err, docs) {
              callback();
            });
          });
        });
      });
    });
  });
};

module.exports = {
  randomBoolean: randomBoolean,
  randomFlightClass: randomFlightClass,
  chooseRandomElement: chooseRandomElement,
  generateFlightnumber: generateFlightnumber,
  seed: seed,
  generatePromo: generatePromo
};
