var flights = require('../flights');
var bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
	app.post('/api/flights/reservation', function (req,res) {
		flights.updateReservation(req.body.bookRef);
	});


	/**
	 * This route deletes a certain reservation from the database
	 *
	 */
	app.delete('/api/flights/reservation', function (req,res) {
		flights.deleteReservation(req.body.bookRef);
		res.send("Reservation cancelled!");
	});

};
