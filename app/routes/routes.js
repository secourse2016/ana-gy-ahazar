var flights = require('../flights');


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
		flights.updateReservation(req.params.bookRef);
	});


	/**
	 * This route deletes a certain reservation from the database
	 *
	 */
	app.delete('/api/flights/reservation', function (req,res) {
		flights.deleteReservation(req.params.bookRef);
		res.send("Reservation cancelled!");
	});

};
