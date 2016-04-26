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
			"remaining_seats" : { $gte: req.params.numberOfSeats}
		};

		var  inComing = {
			"origin":        req.params.destination,
			"destination":   req.params.origin,
			"departureDate": ret_date.format('YYYY-MM-DD'),
			"class": req.params.class,
			"remaining_seats" : { $gte: req.params.numberOfSeats}
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

		var dep_request = {
			"passengerDetails": passengers,
			"cost": dep_cost,
			"outgoingFlightId": outgoingFlightId,
			"paymentToken": paymentToken
		};

		var ret_request = null;
		var incomingIP = null;

		if(reservation.ret_flight){
			//rount trip flight
			incomingIP = reservation.ret_flight.IP;
			var returnFlightId = reservation.ret_flight.flightId;
			var ret_cost = reservation.ret_price;

			if(outgoingIP === incomingIP){
				dep_request.returnFlightId = returnFlightId;
				dep_request.cost = dep_request.cost + ret_cost;
			}
			else{
				ret_request = JSON.parse(JSON.stringify(dep_request));
				ret_request.outgoingFlightId = returnFlightId;
				ret_request.cost = ret_cost;
			}
		}

		//The requests are ready. statrting sending
		if(!ret_request){
			//the request will be sent to one airline
			//don't forget to add the data
outgoingIP = 'localhost'; // delete this line ASAP <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
			var options = {
				host: outgoingIP ,
				port: 3000,
				path: '/booking/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				data: dep_request
			};

			flights.makeOnlineRequest(options, function(statusCode, response) {
				try {
					var json = JSON.parse(response);

					res.json({
						"outIP": outgoingIP,
						"refNumOut": response.refNum
					});
				}catch(err) {
					res.send('error');
				}
			});
		}
		else {
			//there must be two requests to be sent
			//don't forget to add the data
			var optionsOut = {
				host: outgoingIP ,
				path: '/booking/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: dep_request
			};

			//don't forget to add the data
			var optionsIn = {
				host: incomingIP ,
				path: '/booking/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: ret_request
			};

			flights.makeOnlineRequest(optionsOut, function(statusCode, resOut) {
				try {
					var jsonOut = JSON.parse(resOut);

					flights.makeOnlineRequest(optionsIn, function(statusCode, resIn) {
						try{
							var jsonIn = JSON.parse(resIn);

							res.json({
								"outIP": outgoingIP,
								"refNumOut": resOut.refNum,
								"inIP": incomingIP,
								"refNumIn": resIn.refNum
							});
						}catch(err){
							res.send('error');
						}
					});
				}catch(err) {
					res.send('error');
				}
			});
		}

		/*
		The response of this route should be either "error"
		or an array of booking references
		[
		{
		"outIP": "{{ the ip of the operating Airline outgoing }}",
		"refNumOut": {{ booking reference returned outgoing by the opretating Airline }},
		"inIP": "{{ the ip of the operating Airline incoming }}",
		"refNumIn": {{ booking reference returned inconing by the opretating Airline }},
	}
]
*/
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

console.log('wasal');
console.log(reservation);

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
		var curPassenger = reservaion.passengerDetails[i];

		var age = getAge(reservation.dateOfBirth);

		if(age <= 2){
			infants.push(curPassenger);
		}
		else if(age <= 12){
			children.push(curPassenger);
			totalSeats++;
		}
		else{
			adults.push(curPassenger);
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
	charge(reservation.paymentToken, reservation.cost, function(err) {
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
* This function charges a credit card with a specific amount
*
* @param {Token} paymentToken, {Integer} cost, {Function} callback function that is called once the payment is done
* @returns
*/
function charge(token, cost, callback) {
	callback(null);
}

/**
* This function calculates the age from a given birthDate
*
* @param {String} birthDate
* @returns {Integer}
*/
function getAge(dateString){
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
	{
		age--;
	}
	return age;
}

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
