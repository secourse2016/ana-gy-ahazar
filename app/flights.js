var moment = require('moment');
var db = require('./db');
var fs = require('fs');
var http = require('http');








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

	var originOrDestination1 =["BOM", "CAI", "HKG", "JNB", "RUH",
	"LHR", "LAS", "LAX", " FRA", "CIA"];

	var originOrDestination2 =["DEL", "JED", "KNH", "CPT", "JED",
	"JFK", "LAX", "SFO", "THF", "LIN"];

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
//updating a reservation of a given booking reference with given new information
var updateReservation = function (bookRef, newInfo, callback){

	db.getDatabase().collection('reservations').find({booking_ref_number : bookRef}).toArray(function (err,record) {
		if(err) throw err;

		var adults = record[0].adults;
		var children = record[0].children;
		var infants = record[0].infants;

		var newAdults = newInfo.adults;
		var newChildren = newInfo.children;
		var newInfants = newInfo.infants;

		var finalAdults = [];
		var finalChildren = [];
		var finalInfants = [];

		for (var i=0; i<adults.length; i++) {
			var passport_number = adults[i].passport_number;
			var issue_date = adults[i].issue_date;
			var expiry_date = adults[i].expiry_date;

			newAdults[i].passport_number = passport_number;
			newAdults[i].issue_date = issue_date;
			newAdults[i].expiry_date = expiry_date;

			finalAdults.push(newAdults[i]);

		}

		if(adults.length==0)
			finalAdults = adults;

		db.getDatabase().collection('reservations').updateOne(
			{booking_ref_number: bookRef},
			{ $set:
				{
					adults: finalAdults
				}
			},
			function(err, results) {

			});



		for (var i=0; i<children.length; i++) {
			var passport_number = children[i].passport_number;
			var issue_date = children[i].issue_date;
			var expiry_date = children[i].expiry_date;

			newChildren[i].passport_number = passport_number;
			newChildren[i].issue_date = issue_date;
			newChildren[i].expiry_date = expiry_date;
			finalChildren.push(newChildren[i]);

		}

		if(children.length==0)
			finalChildren = children;

		db.getDatabase().collection('reservations').updateOne(
			{booking_ref_number: bookRef},
			{ $set:
				{
					children: finalChildren
				}
			},
			function(err, results) {

			}
			);



		for (var i=0; i<infants.length; i++) {
			var passport_number = infants[i].passport_number;
			var issue_date = infants[i].issue_date;
			var expiry = infants[i].expiry;

			newInfants[i].passport_number = passport_number;
			newInfants[i].issue_date = issue_date;
			newInfants[i].expiry = expiry_date;

			finalInfants.push(newInfants[i]);

		}

		if (infants.length==0)
			finalInfants=infants;

		db.getDatabase().collection('reservations').updateOne(
			{booking_ref_number: bookRef},
			{ $set:
				{
					infants: finalInfants
				}
			},
			function(err, results) {

			});
		callback();
	});

};

//deleting/cancelling a reservation of a given booking reference
var cancelReservation = function (bookRef, callback) {
	db.getDatabase().collection('reservations').find({booking_ref_number : bookRef}).toArray(function (err,record){
		if(err) throw err;

		db.getDatabase().collection('reservations').remove({'booking_ref_number' : bookRef },1);
		callback();

	});

}



/*
search for all one way flights
// */

var getOneWayFlights = function(oneway,callback){
      var flights = [] ;

       db.getDatabase().collection('flights').find(oneway).toArray(function(err,data){
              if(err){
                callback(err) ;
              }
              else {
                for( i=0; i<data.length ;i++){

        
                     var currFlight = data[i];
                     var aircraft = currFlight.aircraft
                     var aircraftType = aircraft.aircraftType;
                     var aircraftModel = aircraft.aircraftModel ;
                     var flight = {
                        "aircraftType":  aircraftType,
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


/**
* This function make http request
* @param {onResult} callback function that is called after the requesting is complete.
*/
var makeOnlineRequest =  function(options, onResult)
{    
    var req = http.request(options, function(res)
    {
        
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
        
               output += chunk;

        });

        res.on('end', function() {
            var obj = output;
            console.log(obj);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
      throw err;
    });

    req.end();
};

/**
* This function search for flights in airlines.json .
*
* @param {Function} callback function that is called after the searching is complete.
*/
var getOtherFlights = function(oneway,callback){
         
        var airlines = JSON.parse(fs.readFileSync('data/airlines.json', 'utf8'));
        var flights = [] ;

       for (var i = 0; i < airlines.length; i++) {
            var currAirLine =
            {
                "airline": airlines[i].airline ,
                "IP": airlines[i].IP
                   }
          

           var ip = currAirLine['IP']; 


          var options = {
               host: ip ,
               path: '/api/flights/search/'+oneway.origin+'/'+oneway.destination+'/'+oneway.departureDateTime+'/'+oneway.class+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI',
               method: 'GET',
               headers: {
                         'Content-Type': 'application/json'
                         }
                 };
            makeOnlineRequest(options,function(statusCode, result){
            flights.push(result);
            
         });
     
        }; 
        callback(null,flights) ;
   };


module.exports = {

	getCountries: getCountries,
	getAirports: getAirports,
	randomBoolean: randomBoolean,
	chooseRandomElement: chooseRandomElement,
	generateFlightnumber: generateFlightnumber,
	seed: seed,
	generatePromo: generatePromo,
	getReservation: getReservation,
	updateReservation: updateReservation,
	cancelReservation: cancelReservation,
  getOneWayFlights : getOneWayFlights ,
  getOtherFlights :getOtherFlights ,
  makeOnlineRequest : makeOnlineRequest ,

};
