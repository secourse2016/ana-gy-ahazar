var db = require('./db');


//Should know the datatype sent from the Frontend.
var updateReservation = function (bookRef) {
	db = db.getDatabase();
	var collection = db.getCollection("reservation");
	db.reservation.update({'booking_ref_number' : bookRef},
		
		"first_name": ,

		"last_name": ,

		"nationality": ,

		"date_of_birth": ,

		"meal_preference": ,

		"special_needs": ,

		"contact_id": "String",

		"emergency_contact_id": "String"
		);
};


var deleteReservation = function (bookRef) {
	db = db.getDatabase();
	var collection = db.getCollection("reservation");
	collection.remove({'booking_ref_number' : bookRef }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
   	});
};