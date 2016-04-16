var flights = require('../flights');
var db = require('../db');

module.exports = function(app) {

	var jwt = require('jsonwebtoken');

	/**
	 * This route returns the master page
	 *
	 */
	app.get('/', function(req, res) {
		res.sendFile('index.html');
	});

	app.get('/db/delete', function(req, res) {
    db.clear(function(){
    	res.send("deleted successfully");
       });
   });

	 app.get('/api/flights/reservation/:bookingReference', function(req, res) {
		 flights.getReservation(function(err, data) {
			 res.json(data);
		 }, bookingReference);
	 });

};
