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
	 * This route seeds the database
	 *
	 */
	app.get('/db/seed', function(req, res) {
		flights.seed(function(){
			res.send("seeded sucessful")
		});
	 });

	 /**
	  * This route validates the promotion_code
	  *
	  */
	app.get('/api/validatepromo/:promoCode',function(req,res) {


	});

};
