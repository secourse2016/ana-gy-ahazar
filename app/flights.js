var db = require('./db');

var getReservation = function(callback, bookingReference) {
  db.getDatabase.collection('reservations').find({booking_ref_number: bookingReference}).toArray(function(err, reservation) {
  	callback(err, reservation);
  });
};