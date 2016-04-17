var flights = require('../flights');
// var bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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
	 * This route edits reservation info
	 *
	 */
	app.put('/api/flights/reservation', function (req,res) {
		var newInfo = req.body;
		var bookingRef = newInfo.booking_ref_number;
		flights.updateReservation(bookingRef, newInfo);
	});


	/**
	 * This route deletes a certain reservation from the database
	 *
	 */
	app.delete('/api/flights/:reservation', function (req,res) {
		var bookingRef = req.params.reservation;
		flights.deleteReservation(bookingRef);
		res.send("Reservation cancelled!");

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
		flights.seed(function(){
			res.send("seeded sucessful");
		});
	 });

	 /**
	  * This route validates the promotion_code
	  *
	  */
	app.get('/api/validatepromo/:promoCode',function(req,res) {


	});
};
