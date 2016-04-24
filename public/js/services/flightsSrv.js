App.factory('FlightsSrv', function ($http) {
   return {
      getAirportCodes : function() {
         return $http.get('/api/airports', {
            "headers" : {'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI'}
         });
      },
      getCountries: function() {
         return $http.get('/api/countries', {
            "headers" : {'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI'}
         });
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
      setTotalPrice: function(value) {
         this.total_price = value;
      },
      getTotalPrice: function() {
         return this.total_price;
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
      storeReservation: function(reservation) {
         return $http.post('/api/flights/reservation', reservation , {
            "headers" : {'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI'}
         });
      },
      getRoundFlights: function(dep_air, ret_air, dep_date, ret_date, classs, totalSeats) {
         console.log("dep_air: ", dep_air);
         console.log("ret_air: ", ret_air);
         console.log("dep_date: ", dep_date);
         console.log("ret_date: ", ret_date);
         console.log("classs: ", classs);
         console.log("total seats", totalSeats);
         return $http.get('/api/flights/search/' + dep_air + '/' + ret_air + '/' + dep_date + '/' + ret_date + '/' + classs + '/' + totalSeats , {
            "headers" : {'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI'}
         });
      },
      getOneFlights: function(dep_air, ret_air, dep_date, classs, totalSeats) {
       	 console.log("dep_air: ", dep_air);
         console.log("ret_air: ", ret_air);
         console.log("dep_date: ", dep_date);
         console.log("classs: ", classs);
         console.log("total seats", totalSeats);

	return $http.get('/api/flights/search/' + dep_air + '/' + ret_air + '/' + dep_date + '/' + classs + '/' + totalSeats , {
            "headers" : {'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI'}
         });
      },
      getOtherRoundFlights: function(dep_air, ret_air, dep_date, ret_date, classs, totalSeats) {
         return $http.get('/api/flights/searchOutSideRound/' + dep_air + '/' + ret_air + '/' + dep_date + '/' + ret_date + '/' + classs + '/' + totalSeats , {
            "headers" : {'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI'}
         });
      },
      getOtherOneFlights: function(dep_air, ret_air, dep_date, classs, totalSeats) {
         return $http.get('/api/flights/searchOutSide/' + dep_air + '/' + ret_air + '/' + dep_date + '/' + classs + '/' + totalSeats , {
            "headers" : {'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI'}
         });
      },
   };
});
