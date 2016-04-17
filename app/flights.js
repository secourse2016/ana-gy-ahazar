var moment = require('moment');
var db = require('./db');
var fs = require('fs');


/**
* This function returns a JSON object with all the countries.
*
* @param {Funtion} callback function that is called after retrieving the countries.
* @returns {JSONObject}
*/
var getCountries = function(callback) {
  db.getDatabase().collection('countries').find().toArray(function(err, docs) {
    callback(err, docs);
  });
};

/**
* This function returns a JSON object with all the Airports.
*
* @param {Funtion} callback function that is called after retrieving the airports.
* @returns {JSONObject}
*/
var getAirports = function(callback) {
  db.getDatabase().collection('airports').find().toArray(function(err, docs) {
    callback(err, docs);
  });
};

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

  var airCrafts = [];

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
  var date = new Date (dateCode);

  var flights = [];

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
  var countries = JSON.parse(fs.readFileSync('data/countries.json', 'utf8'));

  /* seeding the airports table */
  var airports = JSON.parse(fs.readFileSync('data/airports.json', 'utf8'));

  /* seeding the promotion codes table */
  var promotionCodes = [];
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

//Should know the datatype sent from the Frontend.
var updateReservation = function (bookRef, newInfo){
	var dataBase = db.getDatabase();
	var collection = db.getCollection("reservation");

	int i = 0;
	for each (var adult in adults) {
		db.reservaton.update(
			{'booking_ref_number' : bookRef},
			
			{$set: {
				"adults." + i + ".0" : newAdults[i].first_name,
				"adults." + i + ".1" : newAdults[i].last_name,
				"adults." + i + ".2" : newAdults[i].nationality,
				"adults." + i + ".3" : newAdults[i].date_of_birth,
				"adults." + i + ".7" : newAdults[i].meal_preference,
				"adults." + i + ".8" : newAdults[i].special_needs,
				"adults." + i + ".9" : newAdults[i].contact,
				"adults." + i + ".10" : newAdults[i].emergency_contact,
			}
				
			}
		);
		i++;
	}


	int i = 0;
	for each (var child in children) {
		db.reservaton.update(
			{'booking_ref_number' : bookRef},
			
			{$set: {
				"children." + i + ".0" : newChildren[i].first_name,
				"children." + i + ".1" : newChildren[i].last_name,
				"children." + i + ".2" : newChildren[i].nationality,
				"children." + i + ".3" : newChildren[i].date_of_birth,
				"children." + i + ".7" : newChildren[i].meal_preference,
				"children." + i + ".8" : newChildren[i].special_needs,
				"children." + i + ".9" : newChildren[i].contact,
				"children." + i + ".10" : newChildren[i].emergency_contact,				
			}
		);
		i++;
	}

	int i = 0;
	for each (var infant in infants) {
		db.reservaton.update(
			{'booking_ref_number' : bookRef},
			
			{$set: {
				"infants." + i + ".0" : newInfants[i].first_name,
				"infants." + i + ".1" : newInfants[i].last_name,
				"infants." + i + ".2" : newInfants[i].nationality,
				"infants." + i + ".3" : newInfants[i].date_of_birth,
				"infants." + i + ".7" : newInfants[i].meal_preference,
				"infants." + i + ".8" : newInfants[i].special_needs,
				"infants." + i + ".9" : newInfants[i].contact,
				"infants." + i + ".10" : newInfants[i].emergency_contact,				
			}
		);
		i++;
	}
};


var deleteReservation = function (bookRef) {
	var dataBase = db.getDatabase();
	var collection = dataBase.getCollection("reservation");
	collection.remove({'booking_ref_number' : bookRef }, function(err) {
    if (err) throw err;
   	});
};

module.exports = {
  getCountries: getCountries,
  getAirports: getAirports,
  randomBoolean: randomBoolean,
  randomFlightClass: randomFlightClass,
  chooseRandomElement: chooseRandomElement,
  generateFlightnumber: generateFlightnumber,
  seed: seed,
  generatePromo: generatePromo
};
