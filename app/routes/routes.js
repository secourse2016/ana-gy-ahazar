var flights = require('../flights');
var db = require('../db');
var moment = require('moment');
var jwt = require('jsonwebtoken');

module.exports = function(app) {

	var path = require('path');

	/**
	* This route returns the master page
	*
	*/
	app.get('/', function(req, res) {
		res.sendFile('index.html');
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

	app.post('/api/flights/reservation', function(req, res) {
		var reservation = req.body;
		flights.reserve(reservation , function (err, BRN){
			if (err) {
				res.send("error");
			}else{
				res.send(BRN + '');
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

	/* Middlewear to Secure API Endpoints */
	app.use(function(req, res, next) {
		// check header or url parameters or post parameters for token
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
			console.error('[ERROR]: JWT Error reason:', err);
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
	app.get('/api/flights/search/:origin/:destination/:departureDateTime/:class' , function(req, res){

		var dep_date = new Date(req.params.departureDateTime);
		dep_date = dep_date.getFullYear() + '' + dep_date.getMonth() + '' + dep_date.getDate();

		var oneWay = {
			"origin": req.params.origin,
			"destination": req.params.destination,
			"departureDate": dep_date,
			"class": req.params.class
		};

		flights.getOneWayFlights(oneWay , function(err ,data){
			if (err)
			throw err;

			else
			res.json(data);
		});
	});

	/**
	* This route searchs for round trip flights.
	*
	*/
	app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {

		var dep_date = new Date(req.params.departingDate);
		dep_date = dep_date.getFullYear() + '' + dep_date.getMonth() + '' + dep_date.getDate();
		var ret_date = new Date(req.params.returningDate);
		ret_date = ret_date.getFullYear() + '' +ret_date.getMonth() + '' + ret_date.getDate();

		var  outGoing = {
			"origin":        req.params.origin,
			"destination":   req.params.destination,
			"departureDate": dep_date,
			"class": req.params.class
		};

		var  inComing = {
			"origin":        req.params.destination,
			"destination":   req.params.origin,
			"departureDate": ret_date,
			"class": req.params.class
		};

		var result = {
			outGoing : {} ,
			inComing : {}
		};

		flights.getOneWayFlights(outGoing,function(err ,data){
			if(err) throw err ;
			else{
				result.outGoing = data ;

				flights.getOneWayFlights(inComing,function(err ,d){
					if(err) throw err ;
					result.inComing = d ;

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
		flights.reserve(reservation , function (err){
			if (err) {
				res.send("error");
			}else{
				res.send("success");
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
		}	);
	});
};
