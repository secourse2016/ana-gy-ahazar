var flights = require('../flights');
var db = require('../db');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var path = require('path');

module.exports = function(app) {

	var protect = ['/api/countries','/api/airports','/db/seed','/db/delete',
	'/api/flights/search/:origin/:destination/:departureDateTime/:class','/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class',
	'/api/flights/reservation/:bookingReference','/api/flights/reservation','/api/flights/reservation',
	'/api/flights/:reservation','/api/validatepromo/:promoCode','/feedback'];
	/**
	* This route returns the master page
	*
	*/
	app.get('/', function(req, res) {
		res.sendFile('index.html');
	});

	/* Middlewear to Secure API Endpoints */
	app.use(function(req, res, next) {

		var token = req.body.wt || req.query.wt || req.headers['x-access-token'];

		var jwtSecret = process.env.JWTSECRET;

		try
		{
			var payload = jwt.verify(token, jwtSecret);
			req.payload = payload;
			next();
		}
		catch (err)
		{
			console.log(req.url);
			res.status(403).sendFile(path.join(__dirname, '../../public', '403.html'));
		}
	});

	/**
	* This route returns a json object with all the countries.
	*
	*/
	app.get('/api/countries', function(req, res) {
		flights.getCountries(function(err, data) {
			res.json(data);
		});
	});

	/**
	* This route returns a json objects with all the airports.
	*
	*/
	app.get('/api/airports', function(req, res) {
		flights.getAirports(function(err, data) {
			res.json(data);
		});
	});

	/**
	* This route seeds the database
	*
	*/
	app.get('/db/seed', function(req, res) {
		flights.seed(function(err,seeded){
			if(err){
				throw err;
			}
			res.send("seeded sucessful");
		});
	});

	/**
	* This route deletes the database
	*
	*/
	app.get('/db/delete', function(req, res) {
		db.clear(function(){
			res.send("deleted successfully");
		});
	});

	/**
	* This route searchs for one ways flights.
	*
	*/
	app.get('/api/flights/search/:origin/:destination/:departureDateTime/:class/:numberOfSeats?' , function(req, res){
		if(!req.params.numberOfSeats){
			req.params.numberOfSeats = 1;
		}

		var dep_date = moment(parseInt(req.params.departureDateTime));

		var oneWay = {
			"origin": req.params.origin,
			"destination": req.params.destination,
			"departureDate": dep_date.format('YYYY-MM-DD'),
			"class": req.params.class ,
			"remaining_seats" : { $gte: parseInt(req.params.numberOfSeats)}
		};

		var result = {
			outgoingFlights : {}
		};

		flights.getOneWayFlights(oneWay , function(err ,data){
			if (err)
			throw err;

			else{
				result.outgoingFlights = data;

				res.json(result);
			}
		});
	});

	/**
	* This route searchs for round trip flights.
	*
	*/
	app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:numberOfSeats?', function(req, res) {
		if(!req.params.numberOfSeats){
			req.params.numberOfSeats = 1;
		}

		var dep_date = moment(parseInt(req.params.departingDate));
		var ret_date = moment(parseInt(req.params.returningDate));

		var  outGoing = {
			"origin":        req.params.origin,
			"destination":   req.params.destination,
			"departureDate": dep_date.format('YYYY-MM-DD'),
			"class": req.params.class,
			"remaining_seats" : { $gte: parseInt(req.params.numberOfSeats)}
		};

		var  inComing = {
			"origin":        req.params.destination,
			"destination":   req.params.origin,
			"departureDate": ret_date.format('YYYY-MM-DD'),
			"class": req.params.class,
			"remaining_seats" : { $gte: parseInt(req.params.numberOfSeats)}
		};

		var result = {
			outgoingFlights : {} ,
			returnFlights : {}
		};

		flights.getOneWayFlights(outGoing,function(err ,data){
			if(err) throw err ;
			else{
				result.outgoingFlights = data ;

				flights.getOneWayFlights(inComing,function(err ,d){
					if(err) throw err ;
					result.returnFlights = d ;

					res.json(result) ;
				});
			}
		});
	});

	/**
	* This route gets a specific reservation information
	*
	*/
	app.get('/api/flights/reservation/:bookingReference', function(req, res) {
		flights.getReservation(function(err, data) {
			res.json(data);
		}, req.params.bookingReference);
	});

	/**
	* This route posts a new reservation into the database and returns the booking reference.
	*
	*/
	app.post('/api/flights/reservation', function(req, res) {

		var reservation = req.body;

		// formatting the passengers to meet the standard
		var adults = reservation.adults;
		var children = reservation.children;
		var infants = reservation.infants;

		var passengers  = [] ;

		for (var i = 0; i < adults.length; i++) {
			var currAdult = adults[i] ;
			var passenger  = {
				firstName: currAdult.first_name ,
				lastName: currAdult.last_name ,
				passportNum: currAdult.passport_number ,
				passportExpiryDate: new Date(currAdult.expiry_date).getTime() ,
				dateOfBirth: new Date(currAdult.birth_date).getTime() ,
				nationality: currAdult.nationality ,
				email: currAdult.email
			};

			passengers.push(passenger) ;
		}

		if(children){
			for (var i = 0; i < children.length; i++) {
				var currChild = children[i] ;
				var passenger  = {
					firstName: currChild.first_name ,
					lastName: currChild.last_name ,
					passportNum: currChild.passport_number ,
					passportExpiryDate: new Date(currChild.expiry_date).getTime() ,
					dateOfBirth: new Date(currChild.birth_date).getTime() ,
					nationality: currChild.nationality ,
					email: currChild.email
				};
				passengers.push(passenger) ;
			}
		}

		if(infants){
			for (var i = 0; i < infants.length; i++) {
				var currInfant = infants[i] ;
				var passenger  = {
					firstName: currInfant.first_name ,
					lastName: currInfant.last_name ,
					passportNum: currInfant.passport_number ,
					passportExpiryDate: new Date(currInfant.expiry_date).getTime() ,
					dateOfBirth: new Date(currInfant.birth_date).getTime() ,
					nationality: currInfant.nationality ,
					email: currInfant.email
				};
				passengers.push(passenger);
			}
		}

		var outgoingIP = reservation.dep_flight.IP;
		var dep_cost = reservation.dep_price;
		var paymentToken = reservation.paymentToken;
		var outgoingFlightId = reservation.dep_flight.flightId;

		reservation.dep_flight._id = reservation.dep_flight.flightId;
		delete reservation.dep_flight.flightId;

		var dep_request = {
			"passengerDetails": passengers,
			"class": reservation.class,
			"cost": dep_cost,
			"outgoingFlightId": outgoingFlightId,
			"paymentToken": paymentToken
		};

		var ret_request = null;
		var incomingIP = null;


		//The requests are ready. statrting sending
		if(reservation.ret_flight){
			incomingIP = reservation.ret_flight.IP;
			var returnFlightId = reservation.ret_flight.flightId;
			var ret_cost = reservation.ret_price;

			reservation.ret_flight._id = reservation.ret_flight.flightId;
			delete reservation.ret_flight.flightId;

			if(outgoingIP  != incomingIP){
				//the request will be sent to two different airline

				ret_request = JSON.parse(JSON.stringify(dep_request));
				ret_request.outgoingFlightId = returnFlightId;
				ret_request.cost = ret_cost;

				flights.reserve(outgoingIP, dep_request, reservation, function(resOut) {
					try {
						var jsonOut = (resOut);
						if(resIn.errorMessage){
							res.send('error');
						}
						else{
							flights.reserve(incomingIP, ret_request, reservation, function(resIn) {
								try{
									var jsonIn = (resIn);
									if(resIn.errorMessage){
										res.send('error');
									}
									else{
										res.json({
											"outIP": outgoingIP,
											"refNumOut": resOut.refNum,
											"inIP": incomingIP,
											"refNumIn": resIn.refNum
										});
									}
								}catch(err){
									res.send('error');
								}
							});
						}
					}catch(err) {
						res.send('error');
					}
				});

			}
			else{

				dep_request.returnFlightId = returnFlightId;
				dep_request.cost = dep_request.cost + ret_cost;

				flights.reserve(outgoingIP, dep_request, reservation, function(response) {
					try {
						var json = (response);
						if(response.errorMessage){
							res.send('error');
						}
						else{
							res.json({
								"outIP": outgoingIP,
								"refNumOut": response.refNum
							});
						}
					}catch(err) {
						res.send('error');
					}
				});
			}
		}
		else{
			flights.reserve(outgoingIP, dep_request,reservation, function(response) {
				try {
					var json = (response);
					if(response.errorMessage){
						res.send('error');
					}
					else{
						res.json({
							"outIP": outgoingIP,
							"refNumOut": response.refNum
						});
					}
				}catch(err) {
					res.send('error');
				}
			});
		}


});

/**
* This route edits a specific reservation info
*
*/
app.put('/api/flights/reservation', function (req,res) {
	var newInfo = req.body;
	var bookingRef = newInfo.booking_ref_number;
	flights.updateReservation(bookingRef, newInfo, function() {
		res.send('updated successfully');
	});
});

/**
* This route deletes a certain reservation from the database
*
*/
app.delete('/api/flights/:reservation', function (req,res) {
	var bookingRef = req.params.reservation;
	flights.cancelReservation(bookingRef, function() {
		res.send("Reservation cancelled!");
	});
});

/**
* This route books a flight and add it to the database
*
*/
app.post('/booking', function(req, res) {
	var reservation = req.body;

	var adults = [];
	var children = [];
	var infants = [];
	var dep_flight = {
		"_id": reservation.outgoingFlightId
	};
	var ret_flight = null;

	if(reservation.returnFlightId){
		ret_flight = {
			"_id": reservation.returnFlightId
		};
	}

	//seeding the arrays based on the age of the passanger
	var totalSeats = 0;

	for(var i = 0; i < reservation.passengerDetails.length; i++) {
		var curPassenger = reservation.passengerDetails[i];

		var age = flights.getAge(reservation.dateOfBirth);
		console.log(age);
		if(age <= 2){
			var fInfant = {
				"title" : "Mr.",
				"phone_code" : "Afghanistan (+93)",
				"em_phone_code" : "Afghanistan (+93)",
				"mealPreference" : "None",
				"specialNeed" : "None",
				"first_name" : curPassenger.firstName,
				"last_name" : curPassenger.lastName,
				"nationality" : curPassenger.nationality || 'Egyptian',
				"birth_date" : curPassenger.dateOfBirth,
				"passport_number" : curPassenger.passportNum,
				"issue_date" : new Date().getTime(),
				"expiry_date" : curPassenger.passportExpiryDate
			};

			infants.push(fInfant);
		}
		else if(age <= 12){
			var fChild = {
				"title" : "Mr.",
				"phone_code" : "Afghanistan (+93)",
				"em_phone_code" : "Afghanistan (+93)",
				"mealPreference" : "None",
				"specialNeed" : "None",
				"first_name" : curPassenger.firstName,
				"last_name" : curPassenger.lastName,
				"nationality" : curPassenger.nationality || 'Egyptian',
				"birth_date" : curPassenger.dateOfBirth,
				"passport_number" : curPassenger.passportNum,
				"issue_date" : new Date().getTime(),
				"expiry_date" : curPassenger.passportExpiryDate
			};

			children.push(fChild);
			totalSeats++;
		}
		else{
			var fAdult = {
				"title" : "Mr.",
				"phone_code" : "Afghanistan (+93)",
				"em_phone_code" : "Afghanistan (+93)",
				"mealPreference" : "None",
				"specialNeed" : "None",
				"first_name" : curPassenger.firstName,
				"last_name" : curPassenger.lastName,
				"email" : curPassenger.email || 'No E-mail',
				"nationality" : curPassenger.nationality || 'Egyptian',
				"birth_date" : curPassenger.dateOfBirth,
				"passport_number" : curPassenger.passportNum,
				"issue_date" : new Date().getTime(),
				"expiry_date" : curPassenger.passportExpiryDate,
				"phone_number" : 'No Phone',
				"em_email" : 'No emergency mail',
				"em_phone_number" : 'No emergency phone'
			};

			adults.push(fAdult);
			totalSeats++;
		}
	}


	var reservation_info = {
		'adults': adults,
		'children': children,
		'infants': infants,
		'dep_flight': dep_flight,
		'total_seats': totalSeats,
		'type': 'Direct'
	};

	if(ret_flight){
		reservation_info.ret_flight = ret_flight;
	}

	//trying the payment
	flights.charge(reservation.paymentToken, reservation.cost, function(err) {
		if(err){
			res.json({
				"refNum": null,
				"errorMessage": 'An error occurred while trying to charge the given credit card'
			});
		}
		else{
			flights.reserve(reservation_info, function(err, code) {
				if(err){
					res.json({
						"refNum": null,
						"errorMessage": 'An error occurred while trying to book the flight'
					});
				}
				else{
					res.json({
						"refNum": code,
						"errorMessage": null
					});
				}
			});
		}
	});

});

/**
* This route validates the promotion_code
*
*/
app.get('/api/validatepromo/:promoCode',function(req,res) {
	var promoCode = req.params.promoCode;
	db.getDatabase().collection('promotionCodes').find({"code": promoCode}).toArray(function(err, result)  {
		result = result[0];

		if (err) {
			throw err;
		}

		if (result && result.valid) {
			var discount = result.discount;
			db.getDatabase().collection('promotionCodes').remove({"code": promoCode},  function(err, results) {
				res.send(discount+"");
			});
		} else {
			res.send(0.0+"");
		}
	});

});

/**
* This route posts a feedback to the database.
*
*/
app.post('/feedback', function( req , res ){
	var feedback = req.body;
	flights.addFeedback(feedback , function(err){
		if (err){
			res.send("error") ;
		}else{
			res.send("success");
		}
	});
});

/**
* This route returns a json objects with required  One Way flights from other Airlines.
*
*/
app.get('/api/flights/searchOutSide/:origin/:destination/:departureDateTime/:class/:numberOfSeats?' , function(req, res){
	if(!req.params.numberOfSeats){
		req.params.numberOfSeats = 1;
	}

	var oneWay = {
		"origin": req.params.origin,
		"destination": req.params.destination,
		"departureDateTime": parseInt(req.params.departureDateTime),
		"class": req.params.class,
		"remaining_seats" : { $gte: req.params.numberOfSeats}

	};

	flightsOne = {
		outgoingFlights: []
	};

	flights.getOtherFlightsOneWay(oneWay , 0, function(err ,data){
		if (err)
		throw err;

		else{
			res.json(data);
		}
	});
});

/**
* This route returns a json objects with required RoundTrip flights from other Airlines.
*
*/
app.get('/api/flights/searchOutSideRound/:origin/:destination/:departingDate/:returningDate/:class/:numberOfSeats?', function(req, res) {
	if(!req.params.numberOfSeats){
		req.params.numberOfSeats = 1;
	}

	var  constraints = {
		"origin":        req.params.origin,
		"destination":   req.params.destination,
		"departureDateTime": parseInt(req.params.departingDate),
		"returnDate": parseInt(req.params.returningDate),
		"class":         req.params.class,
		"remaining_seats" : { $gte: req.params.numberOfSeats}

	};

	flightsRound = {
		outgoingFlights: [],
		returnFlights: []
	};

	flights.getOtherFlightsRound(constraints, 0, function(err ,data ){
		if(err) throw err ;
		else{
			res.json(data);
		}
	});
});

};
