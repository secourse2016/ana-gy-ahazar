App.factory('FlightSrv', function($http) {
	return {
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
      setAirline: function(value) {
         this.airline = value;
      },
      getAirline: function() {
         return this.airline;
      },
      setFlightTime: function(value) {
         this.time = value;
      },
      getFlightTime: function() {
         return this.time;
      },
      setSeats: function(value) {
         this.seats = value;
      },
      getSeats: function() {
         return this.seats;
      },
      setPlaneModel: function(value) {
         this.planeModel = value;
      },
      getPlaneModel: function() {
         return this.planeModel;
      },
      setCost: function(value) {
         this.cost = value;
      },
      getCost: function() {
         return this.cost;
      },
      setEntertainment: function(value) {
         this.entertainment = value;
      },
      getEntertainment: function() {
         return this.entertainment;
      }
  };
});