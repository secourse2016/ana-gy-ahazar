App.factory('FlightsSrv', function ($http) {
   return {
      getAirportCodes : function() {
         return $http.get('/api/airports');
      },
      
   };
});
