var flights = require('../flights');
var db = require('../db');
var moment = require('moment');

module.exports = function(app) {

	var jwt = require('jsonwebtoken');

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

	app.get('/api/flights/search/:origin/:destination/:departureDateTime/:classs' , function(req, res){

		var dep_date = new Date(req.params.departureDateTime);
		dep_date = dep_date.getFullYear() + '' + dep_date.getMonth() + '' + dep_date.getDate();

		var oneWay = {
			"origin": req.params.origin,
			"destination": req.params.destination,
			"departureDate": dep_date
		};
		flights.getOneWayFlights(oneWay , function(err ,data){
			if (err)
			throw err;

			else
			res.json(data);


		});

	});


	app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:classs', function(req, res) {
		// retrieve params from req.params.{{origin | departingDate | ...}}
		// return this exact format

		console.log(req.params);
		var dep_date = new Date(req.params.departingDate);
		dep_date = dep_date.getFullYear() + '' + dep_date.getMonth() + '' + dep_date.getDate();
		var ret_date = new Date(req.params.returningDate);
		ret_date = ret_date.getFullYear() + '' +ret_date.getMonth() + '' + ret_date.getDate();
		  console.log(dep_date);
		  console.log(ret_date);
		//   res.send('hi');

		var  outGoing = {
			"origin":        req.params.origin,
			"destination":   req.params.destination,
			"departureDate": dep_date
		};

		var  inComing = {
			"origin":        req.params.destination,
			"destination":   req.params.origin,
			"departureDate": ret_date
		};



		var result = {
			outGoing : {} ,
			inComing : {}
		} ;
		flights.getOneWayFlights(outGoing,function(err ,data ){
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
