App.factory('FlightsSrv', function ($http) {
   return {
      getAirportCodes : function() {
         //http://54.191.202.17/feedback/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI
         return $http.get('http://54.191.202.17/api/airports/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI');
      },
      getCountries: function() {
         return $http.get('http://54.191.202.17/api/countries/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI');
      },
      /*Flight Info */
      setSearchOther: function(value) {
         this.searchOther = value;
      },
      getSearchOther: function() {
         return this.searchOther;
      },
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
      setDepartureFlight: function(value) {
         this.departureFlight = value;
      },
      getDepartureFlight: function() {
         return this.departureFlight;
      },
      setReturnFlight: function(value) {
         this.returnFlight = value;
      },
      getReturnFlight: function() {
         return this.returnFlight;
      },
      setOutgoingPrice: function(value) {
         this.outgoing_price = value;
      },
      getOutgoingPrice: function() {
         return this.outgoing_price;
      },
      setIncomingPrice: function(value) {
         this.incoming_price = value;
      },
      getIncomingPrice: function() {
         return this.incoming_price;
      },
      setTotalPrice: function(value) {
         this.total_price = value;
      },
      getTotalPrice: function() {
         return this.total_price;
      },
      setAirline: function (value) {
          this.airline = value;
      },
      getAirline: function () {
         return this.airline;
      },
      setDepartureDateTime: function (value) {
         this.departureDateTime = value;
      },
      getDepartureDateTime: function () {
         return this.departureDateTime;
      },
      setArrivalDateTime: function (value) {
         this.arrivalDateTime = value;
      },
      getArrivalDateTime: function () {
         return this.arrivalDateTime;
      },
      setAircraftType: function (value) {
         this.aircraftType = value;
      },
      getAircraftType: function () {
         return this.aircraftType;
      },
      setAircraftModel: function (value) {
         this.aircraftModel = value;
      },
      getAircraftModel: function () {
         return this.aircraftModel;
      },
      setCost: function (value) {
         this.cost = value;
      },
      getCost: function () {
         return this.cost;
      }

   };
});
