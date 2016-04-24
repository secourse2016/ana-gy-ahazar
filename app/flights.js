var moment = require('moment');
var db = require('./db');
var fs = require('fs');
var http = require('http');
var mongo = require('mongodb');

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
* @param {Function} callback function that is called after retrieving the countries.
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
* @param {Function} callback function that is called after retrieving the airports.
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
	for(var i = 0; i < 4; i++) {
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
	"LHR", "LCF", "LAX", " FRA", "FCO"];

	var originOrDestination2 =["DEL", "JED", "TPE", "CPT", "JED",
	"JFK", "LAX", "SFO", "TXL", "LIN"];

	var airCrafts = [];

	for (var i = 0; i < 200; i++) {
		var generatedAircraftModel = String.fromCharCode(65 + (Math.floor(Math.random() * 26))) + '' + Math.floor(100 + Math.random() * 900).toString();
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
	var dep_date = moment('2016-04-11');
	var dep_dateTime = moment('2016-04-11 03:40 AM', 'YYYY-MM-DD hh:mm A');

	var flights = [];

	/* seeding the flight table back and forth form list originOrDestination1 to originOrDestination2 and vice versa */
	for (var i = 11; i < 62; i++) {
		for (var j = 0; j < originOrDestination1.length; j++) {
			var flightDuration = Math.floor(1 + (Math.random() * 16));
			var randomCost = Math.floor(600+Math.random() * 8400);


			var ret_dateTime = dep_dateTime.clone();
			ret_dateTime = ret_dateTime.add(flightDuration, 'h');
			console.log(dep_dateTime.format('YYYY-MM-DD hh:mm'));
			console.log(ret_dateTime.format('YYYY-MM-DD hh:mm'));

			var origin = originOrDestination1[j];
			var destination = originOrDestination2[j];
			var flight =	{
				"Airline": "Air Madagascar",
				"flightNumber": generateFlightnumber(),
				"departureDate":  dep_date.format('YYYY-MM-DD'),
				"departureDateTime":dep_dateTime.toDate().getTime(),
				"arrivalDateTime": ret_dateTime.toDate().getTime(),
				"class": "economy",
				"type": "Direct",
				"tranzit": [],
				"duration": flightDuration,
				"origin": origin,
				"destination": destination,
				"remaining_seats": 50,
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
			var flightB = JSON.parse(JSON.stringify(flight));
			flightB.class = "business";
			flightB.cost = parseInt(flightB.cost) + 300;
			flights.push(flightB);

			origin = originOrDestination2[j];
			destination = originOrDestination1[j];
			flight =	{
				"Airline": "Air Madagascar",
				"flightNumber": generateFlightnumber(),
				"departureDate": dep_date.format('YYYY-MM-DD'),
				"departureDateTime": dep_dateTime.toDate().getTime(),
				"arrivalDateTime": ret_dateTime.toDate().getTime(),
				"class": "economy",
				"type": "Direct",
				"tranzit": [],
				"duration": flightDuration,
				"origin": origin,
				"destination": destination,
				"remaining_seats": 50,
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
			flightB = JSON.parse(JSON.stringify(flight));
			flightB.class = "business";
			flightB.cost = parseInt(flightB.cost) + 300;
			flights.push(flightB);

		}

		dep_date = dep_date.add('1', 'd');
		dep_dateTime = dep_dateTime.add('1', 'd');
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

		if(adults.length === 0)
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

			if(children.length === 0)
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

			if (infants.length === 0)
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

				record = record[0];

				var totalSeats = record.total_seats;

				db.getDatabase().collection('reservations').remove({'booking_ref_number' : bookRef }, 1, function(err, result) {
					record.dep_flight._id = new mongo.ObjectID(record.dep_flight._id);
					db.getDatabase().collection('flights').updateOne(
						{ _id: record.dep_flight._id },
						{ $inc: { remaining_seats: totalSeats } },
						function(err, result) {
							if(!record.ret_flight){
								callback();
							}
							else{
								record.ret_flight._id = new mongo.ObjectID(record.ret_flight._id);
								db.getDatabase().collection('flights').updateOne(
									{ _id: record.ret_flight._id },
									{ $inc: { remaining_seats: totalSeats } },
									function(err, result) {
											callback();
								});
							}
						});
					});
				});
			};

			/**
			* This function searchs for one way trip flights.
			*
			* @param {JSONObject} search constraints, {Function} callback function that is called after the search is complete.
			* @returns {JSONObject}
			*/
			var getOneWayFlights = function(oneway, callback){
				var flights = [] ;

				db.getDatabase().collection('flights').find(oneway).toArray(function(err,data){
					if(err){
						callback(err) ;
					}
					else {
						for( i=0; i<data.length ;i++){
							var currFlight = data[i];
							var aircraft = currFlight.aircraft;
							var aircraftType = aircraft.aircraftType;
							var aircraftModel = aircraft.aircraftModel ;

							var flight =	{
								"flightId": currFlight._id,
								"flightNumber": currFlight.flightNumber,
								"aircraftType":  aircraftType,
								"aircraftModel": aircraftModel,
								"departureDateTime": currFlight.departureDateTime,
								"arrivalDateTime": currFlight.arrivalDateTime,
								"origin": currFlight.origin,
								"destination": currFlight.destination,
								"cost": currFlight.cost,
								"currency": currFlight.currency,
								"class": currFlight.class,
								"Airline": currFlight.Airline
							};
							flights.push(flight) ;
						}

						callback(null,flights) ;
					}
				});
			};

			/**
			* This function adds a reservation to the database and generates a unique booking reference.
			*
			* @param {JSONObject} reservation, {Function} callback function that is called after the insertion is complete.
			*/
			var reserve = function(reserve_info, callback){
				var code = "";
				var totalSeats = parseInt(reserve_info.total_seats);

				for (var i = 0; i < 15; i++) {
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

				db.getDatabase().collection('reservations').count({"booking_ref_number": code}, function(err, count) {
					if(count === 0){
						reserve_info.booking_ref_number = code;
						db.getDatabase().collection('reservations').insert(reserve_info, function(err, docs) {
							if(err){
								callback(err, null);
							}
							else{
								reserve_info.dep_flight._id = new mongo.ObjectID(reserve_info.dep_flight._id);
								db.getDatabase().collection('flights').updateOne(
									{ _id: reserve_info.dep_flight._id },
									{ $inc: { remaining_seats: -totalSeats } },
									function(err, docs) {
										if(err){
											callback(err, null);
										}
										else{
											if(!reserve_info.ret_flight){
												callback(null, code);
											}
											else{
												reserve_info.ret_flight._id = new mongo.ObjectID(reserve_info.ret_flight._id);
												db.getDatabase().collection('flights').updateOne(
													{ _id: reserve_info.ret_flight._id },
													{ $inc: { remaining_seats: -totalSeats } },
													function(err, docs) {
														if(err){
															callback(err, null);
														}
														else{
															callback(null, code);
														}
													});
											}
										}
									});
								}
							});
						}
						else{
							reserve(reserve_info, callback);
						}
					});
				};

				/**
				* This function adds a feedback to the database.
				*
				* @param {JSONObject} feedback, {Function} callback function that is called after the insertion is complete.
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
							onResult(res.statusCode, obj);
						});
					});

					req.setTimeout(3000, function() {
						console.log('timeout');
					});

					req.on('end', function() {
						console.log('done');
						req.abort();
					});

					req.on('error', function(err) {
						req.abort();
					});

					req.end();
				};

				/**
				* This function search for flights in airlines.json One way.
				*
				* @param {Function} callback function that is called after the searching is complete.
				*/
				var airlines = JSON.parse(fs.readFileSync('data/airlines.json', 'utf8'));
				flightsOne = {
					outgoingFlights: []
				};
				var getOtherFlightsOneWay = function(oneway, i, callback){
					console.log(i);
					if(i === airlines.length){
						callback(null,flightsOne);
						return;
					}

					var currAirLine =
					{
						"IP": airlines[i].IP
					};


					var ip = currAirLine.IP;


					var options = {
						host: ip ,
						path: '/api/flights/search/'+oneway.origin+'/'+oneway.destination+'/'+oneway.departureDateTime+'/'+oneway.class+'/'+oneway.numberOfSeats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI',
						method: 'GET',
						headers: {
							'Content-Type': 'application/json'
						}
					};
					try{
						makeOnlineRequest(options,function(statusCode, result){
							try {
								var json = JSON.parse(result);

								flightsOne.outgoingFlights = concat(flightsOne.outgoingFlights, json.outgoingFlights);
							}catch(err) {

							}
							getOtherFlightsOneWay(oneway, (i + 1), callback);
						});
					}
					catch(err){
						getOtherFlightsOneWay(oneway, (i + 1), callback);
					}
				};

				/**
				* This function search for flights in airlines.json round trip.
				*
				* @param {Function} callback function that is called after the searching is complete.
				*/
				flightsRound = {
					outgoingFlights: [],
					returnFlights: []
				};
				var getOtherFlightsRound = function(constraints, i, callback){
					if(i === airlines.length){
						return callback(null,flightsRound);
					}

					var currAirLine = airlines[i];

					console.log(currAirLine.airline);
					var ip = currAirLine.IP;


					var options = {
						host: ip ,
						path: '/api/flights/search/'+constraints.origin+'/'+constraints.destination+'/'+constraints.departureDateTime+'/'+constraints.returnDate+'/'+constraints.class+'/'+constraints.numberOfSeats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI',
						method: 'GET',
						headers: {
							'Content-Type': 'application/json'
						}
					};
					try{
						makeOnlineRequest(options,function(statusCode, result){
							try {
								var json = JSON.parse(result);

								flightsRound.outgoingFlights = concat(flightsRound.outgoingFlights, json.outgoingFlights);
								flightsRound.returnFlights = concat(flightsRound.returnFlights, json.returnFlights);
							}catch(err) {

							}
							getOtherFlightsRound(constraints, (i + 1), callback);
						});
					}
					catch(err){
						getOtherFlightsRound(constraints, (i + 1), callback);
					}
				};

				var concat = function(x, y) {
					for (var i = 0; i < y.length; i++) {
						x.push(y[i]);
					}

					return x;
				};

				module.exports = {
					getCountries: getCountries,
					getAirports: getAirports,
					randomBoolean: randomBoolean,
					chooseRandomElement: chooseRandomElement,
					generateFlightnumber: generateFlightnumber,
					seed: seed,
					addFeedback:addFeedback,
					getOneWayFlights:getOneWayFlights,
					reserve:reserve,
					generatePromo: generatePromo,
					getReservation: getReservation,
					updateReservation: updateReservation,
					cancelReservation: cancelReservation,
					getOtherFlightsOneWay :getOtherFlightsOneWay ,
					getOtherFlightsRound: getOtherFlightsRound,
					makeOnlineRequest : makeOnlineRequest,
					concat: concat
				};
