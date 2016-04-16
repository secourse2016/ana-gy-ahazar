var db = require('db');

/**
 * This function returns a JSON object with all the countries.
 *
 * @param {Funtion} callback function that is called after retrieving the countries.
 * @returns {JSONObject}
 */
var getCountries = function(callback) {
  db.collection('countries').find().toArray(function(err, docs) {
    callback(err, docs);
  });
};

/**
 * This function returns a JSON object with all the Airports.
 *
 * @param {Funtion} callback function that is called after retrieving the airports.
 * @returns {JSONObject}
 */
var getCountries = function(callback) {
  db.collection('airports').find().toArray(function(err, docs) {
    callback(err, docs);
  });
};
