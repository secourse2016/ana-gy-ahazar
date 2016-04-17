var db = require('./db');


//Should know the datatype sent from the Frontend.
var updateReservation = function (bookRef, newInfo){
	var dataBase = db.getDatabase();
	var collection = db.getCollection("reservation");

	var adults = newInfo.adults; // array
	var children = newInfo.children; // array
	var infants = newInfo.infants; // array

	var newAdults = {};
	var newChildren = {};
	var newInfants = {};

	for each (var adult in adults){
		
		var newAdultInfo = {
			"first_name": adult.first_name,

			"last_name": adult.last_name,

			"nationality": adult.nationality,

			"date_of_birth": adult.date_of_birth,

			"meal_preference": adult.meal_preference,

			"special_needs": ,adult.special_needs

			"contact": adult.contact,

			"emergency_contact": adult.emergency_contact
		}
		newAdults.add(newAdultInfo);

	}

		for each (var child in children){
		
		var newChildInfo = {
			"first_name": child.first_name,

			"last_name": child.last_name,

			"nationality": child.nationality,

			"date_of_birth": child.date_of_birth,

			"meal_preference": child.meal_preference,

			"special_needs": ,child.special_needs

			"contact": child.contact,

			"emergency_contact": child.emergency_contact
		}
		newChildren.add(newChildInfo);

	}

		for each (var infant in infants){
		
		var newInfantInfo = {
			"first_name": infant.first_name,

			"last_name": infant.last_name,

			"nationality": infant.nationality,

			"date_of_birth": infant.date_of_birth,

			"meal_preference": infant.meal_preference,

			"special_needs": ,infant.special_needs

			"contact": infant.contact,

			"emergency_contact": infant.emergency_contact
		}
		newInfants.add(newInfantInfo);

	}

	db.reservation.update(
		{'booking_ref_number' : bookRef},
		
		{
			"adults" : newAdults,
			"children" : newChildren,
			"infants" : newInfants
		}
	);
};


var deleteReservation = function (bookRef) {
	var dataBase = db.getDatabase();
	var collection = dataBase.getCollection("reservation");
	collection.remove({'booking_ref_number' : bookRef }, function(err) {
    if (err) throw err;
   	});
};