App.factory('FlightsSrv', function ($http) {
   return {
      getAirportCodes : function() {
         return $http.get('/api/airports');
      },
      setFlightData: function(newData) {
         this.flightData = newData;
      },
      getFlightData: function() {
         return this.flightData;
      }

   };
});
