var app = require('./app/app');
var db = require('./app/db');

/* connecting to the database */
db.connect(process.env.DBURL, function() {

  /* start listening */
  app.listen(process.env.PORT, function() {
     console.log('[up : ' + process.env.PORT + ']');
  });
});
