var moment = require('moment');
var db = require('./db');
var fs = require('fs');

/**
* This function return an array of length 1 of a specific reservation info.
* @param {Function} callback function, {String} the booking reference
* @returns {JSONObject}
*/
var getReservation = function(callback, bookingReference) {
  db.getDatabase().collection('reservations').find({booking_ref_number: bookingReference}).toArray(function(err, reservation) {
  	callback(err, reservation);
  });
};

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
      "aircraftType": chooseRandomElement(aircraftTypes),
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
  var date = new Date ('2016-04-11  3:25 AM');

  var flights = [];

  /* seeding the flight table back and forth form list originOrDestination1 to originOrDestination2 and vice versa */
  for (var i = 11; i < 61; i++) {
    for (var j = 0; j < originOrDestination1.length; j++) {
      var flightDuration = Math.floor(1 + (Math.random() * 16));
      var dateCode = moment(date).toDate().getTime();
      var dateArrive = date;
      dateArrive.setHours(dateArrive.getHours() + flightDuration);
      dateArrive = moment(dateArrive).toDate().getTime();

      var origin = originOrDestination1[j];
      var destination = originOrDestination2[j];
      var flight =	{
        "Airline": "Air Madagascar",
        "departureDateTime":dateCode,
        "arrivalDateTime": dateArrive,
        "class": "economy",
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
      var flightF = JSON.parse(JSON.stringify(flight));
      flightF.class = "first";
      flights.push(flightF);
      var flightB = JSON.parse(JSON.stringify(flight));
      flightB.class = "business";
      flights.push(flightB);

      origin = originOrDestination2[j];
      destination = originOrDestination1[j];
      flight =	{
        "Airline": "Air Madagascar",
        "flightNumber": generateFlightnumber(),
        "departureDateTime": dateCode,
        "arrivalDateTime": dateArrive,
        "class": "economy",
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
      flightF = JSON.parse(JSON.stringify(flight));
      flightF.class = "first";
      flights.push(flightF);
      flightB = JSON.parse(JSON.stringify(flight));
      flightB.class = "business";
      flights.push(flightB);

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
      if(err){
        callback(err,false);
      }
      else{
        database.collection('flights').insert(flights, function(err, docs) {
          if(err){
            callback(err,false);
          }
          else{
            database.collection('countries').insert(countries, function(err, docs) {
              if(err){
                callback(err,false);
              }
              else{
                database.collection('airports').insert(airports, function(err, docs) {
                  if(err){
                    callback(err,false);
                  }
                  else{
                    database.collection('promotionCodes').insert(promotionCodes, function(err, docs) {
                      if(err){
                        callback(err,false);
                      }
                      else{
                        callback(null,true);
                      }

                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
};

/*
search for all one way flights
*/

      var getOneWayFlights = function(oneway,callback){
      var flights = {} ;
   
       db.getDatabase().collection('flight').find(oneway).toArray(function(err,data){
              if(err){
                callback(err) ;
              }
              else {
                
                for(var i=0; i<data.length ;i++){
                     var currFlight = data[i]; 
                     var aircraftType = {} ;
                     var aircraftModel = {} ;
                     db.getDatabase().collection('airCraft').find({'aircraft_id':currFlight['aircraft_id']}).toArray(function(err,dat){
                           if(err)
                            callback(err) ;
                           else{
                             aircraftType = dat[aircraftType]  ;
                             aircraftModel= dat[aircraftModel] ;
                           }


                     });
                     var flight = {
                        "aircraftType": aircraftType,
                        "aircraftModel": aircraftModel,
                        "flightNumber": currFlight['flightNumber'],
                        "departureDateTime": currFlight['departureDateTime'],
                        "arrivalDateTime": currFlight['arrivalDateTime'],
                        "origin": currFlight['origin'],
                        "destination": currFlight['destination'],
                        "cost": currFlight['cost'],
                        "currency": currFlight['currency'],
                        "class": currFlight['class'],  
                        "Airline": currFlight['Airline']        
                    };
                    flights.push(flight) ;
                  }

                callback(null,flights) ;
              }
    });
}; 


/*
The function is used to insert a feedback into Database.
*/
   var addFeedback = function (feed, callback){
  db.getDatabase().collection('feedbacks').insert(feed, function(err, docs) {
    if (err){
              callback(err , null);
            }else{
              callback(null,docs);
            }
  });
};

module.exports = {
  getCountries: getCountries,
  getAirports: getAirports,
  randomBoolean: randomBoolean,
  chooseRandomElement: chooseRandomElement,
  generateFlightnumber: generateFlightnumber,
  seed: seed,
  generatePromo: generatePromo,
  addFeedback:addFeedback,
  getOneWayFlights:getOneWayFlights,
  getReservation: getReservation
};
