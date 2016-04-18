App.factory('FlightsSrv', function ($http) {
   return {
      getAirportCodes : function() {
         return $http.get('/api/airports');
      },
      getCountries: function() {
         return $http.get('/api/countries');
      },

      /*Flight Info */
      setFlightType: function(value) {
         this.flightType = value;
      },
      getFlightType: function() {
         return this.flightType;
      },
      setSelectedOriginAirport: function(value) {
         this.selectedOriginAirport = value;
      },
      getSelectedOriginAirport: function() {
         return this.selectedOriginAirport;
      },
      setSelectedDestinationAirport: function(value) {
         this.selectedDestinationAirport = value;
      },
      getSelectedDestinationAirport: function() {
         return this.selectedDestinationAirport;
      },
      setDepartureDate: function(value) {
         this.departureDate = value;
      },
      getDepartureDate: function() {
         return this.departureDate;
      },
      setReturnDate: function(value) {
         this.returnDate = value;
      },
      getReturnDate: function() {
         return this.returnDate;
      },
      setAdults: function(value) {
         this.adults = value;
      },
      getAdults: function() {
         return this.adults;
      },
      setChildren: function(value) {
         this.children = value;
      },
      getChildren: function() {
         return this.children;
      },
      setInfants: function(value) {
         this.infants = value;
      },
      getInfants: function() {
         return this.infants;
      },
      setClass: function(value) {
         this.class = value;
      },
      getClass: function() {
         return this.class;
      },

      getRoundFlights: function(dep_air, ret_air, dep_date, ret_date, classs) {
         var x = '/api/flights/search/' + dep_air + '/' + ret_air + '/' + dep_date + '/' + ret_date + '/' + classs;
         return $http.get(x);
      },
      getOneFlights: function(dep_air, ret_air, dep_date, classs) {
         var x = '/api/flights/search/' + dep_air + '/' + ret_air + '/' + dep_date + '/' + classs;
         return $http.get(x);
      },

   };
});
