var mongodb = require('mongodb').MongoClient;
var db = null;

/**
* connects to the database
*
* @param {String} database url, {Function} a function that is called after the connection is done successfuly.
*/
var connect = function(dbURL, callback) {
  mongodb.connect(dbURL, function(err, database) {
    if (err){
      console.log('Couldn\'t connect to MongoDB:' + err);
      throw err;
    }

    db = database;

    if(callback) callback(err, database);
  });
};

/**
* returns the database instance.
*
* @returns {MongoDBObject}
*/
var getDatabase = function() {
  if (db === null) throw Error('Database Object has not yet been initialized');
  return db;
};

/**
* clears all the collections in the database.
*
* @param {Function} callback function that is called after the clearing is finished.
*/
var clear = function(callback) {
  db.listCollections().toArray().then(function (collections) {
    collections.forEach(function (c) {
      db.collection(c.name).removeMany();
    });
    callback();
  }).catch(callback);
};

/**
* closes the connection to the database.
*
*/
var close = function() {
  db.close();
};

module.exports = {
  connect: connect,
  getDatabase: getDatabase,
  clear: clear,
  close: close
};
