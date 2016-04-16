var moment = require('moment');
var db = require('./db');

/**
* This function return a random boolea value.
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
* This function seeds the database.
*
* @param {Function} callback function that is called after the seeding is complete.
*/
var seed = function(cb) {
  var aircraftTypes =["Aerospatiale", "ATR", "Airbus", "Antonov", "Beechcraft", "Boeing", "BAC" , "BAE", "Comac",
  "Convair", "de Havilland", "Bombardier", "Canadair",
  "Embraer", "Fairchild", "Fokker", "Ilyushin", "Irkut", "Lockheed",
  "McDonnell Douglas", "Mitsubishi", "Saab", "Sukhoi", "Tupolev", "Vickers", "Yakovlev"];

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

    var airCrafts = db.getDatabase().collection('airCrafts');
    airCrafts.insert(airCraft);
  }

  var originOrDestination1 =["Mumbai", "Cairo", "Hong kong", "Johannesburg", "Riyadh",
  "London Heathrew", "Las Vegas", "Las Angeles", " Frankfurt", "Rome"];

  var originOrDestination2 =["Delhi", "Jeddah", "Taiwan", "Cape Town", "Jeddah",
  "New York-JohnF. Kennedy", "Las Angeles", "San Francisco", "Berlin", "Milan"];

  for (var i = 0; i < 200 i++) {
    var number = Math.floor(Math.random() *(originOrDestination1.length));
    var fromTo = randomBoolean();
    var origin = "";
    var destination = "";

    if(fromTo){
      origin = originOrDestination1[number];
      destination = originOrDestination2[number];
    }
    else{
      origin = originOrDestination2[number];
      destination = originOrDestination1[number];
    }

    var flight =	{
      "Airline": "Air Madagascar",
      "flightNumber": generateFlightnumber(),
      "departureDateTime": "Date",
      "arrivalDateTime": "Date",
      "class": "String",
      "type": "String",
      "tranzit": "Array",
      "duration": "Number",
      "origin": origin,
      "destination": destination,
      "remaining_seats": "50",
      "cost": "Number",
      "currency": "String",
      "seatmap": 	[
        {
          "seat_id": "String",
          "taken": "Boolean"
        }
      ],
      "aircraft_id": "String"
    };
  }

  //my part starts here :D
};

module.exports = {
  randomBoolean: randomBoolean,
  randomFlightClass: randomFlightClass,
  chooseRandomElement: chooseRandomElement,
  generateFlightnumber: generateFlightnumber,
  seed: seed
};
