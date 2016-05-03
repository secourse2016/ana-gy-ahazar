
App.controller('bookController-flights', function($scope, FlightsSrv, $location) {

      var searchOther = FlightsSrv.getSearchOther();
      var flightType = FlightsSrv.getFlightType();
      $scope.dep_airport = FlightsSrv.getSelectedOriginAirport();
      $scope.ret_airport = FlightsSrv.getSelectedDestinationAirport();
      var depDate = FlightsSrv.getDepartureDate();
      var retDate = FlightsSrv.getReturnDate();
      var adults = FlightsSrv.getAdults();
      var children = FlightsSrv.getChildren();
      var infants = FlightsSrv.getInfants();
      var searchClass = FlightsSrv.getClass();

       var flights =
      [
        {Airline:"Air Madagascar", departureDateTime:"03:40",  arrivalDateTime: "07:40", aircraftType:"Bombardier", aircraftModel:"F868", Cost:"8127",  Entertainment:"Wifi Radio USB"},
        {Airline:"Egypt air", departureDateTime:"03:40",  arrivalDateTime: "07:40", aircraftType:"Bombardier", aircraftModel:"F868", Cost:"8127",  Entertainment:"Wifi Radio USB"},
        {Airline:"KLM", departureDateTime:"03:40",  arrivalDateTime: "07:40", aircraftType:"Bombardier", aircraftModel:"F868", Cost:"8127",  Entertainment:"Wifi Radio USB"},
        ];
        $scope.flights = flights;

      var retFlights =
      [
        {Airline:"Air Madagascar", departureDateTime:"03:40",  arrivalDateTime: "07:40", aircraftType:"Bombardier", aircraftModel:"F868", Cost:"8127",  Entertainment:"Wifi Radio USB"},
        {Airline:"Air Madagascar", departureDateTime:"03:40",  arrivalDateTime: "07:40", aircraftType:"Bombardier", aircraftModel:"F868", Cost:"8127",  Entertainment:"Wifi Radio USB"},
      ];
      $scope.retFlights = retFlights;


      if (FlightsSrv.getFlightType() == "round") {
        $scope.show_incoming = true;
      }


      $scope.showInfo = function(flight) {
        console.log("clicked");
        console.log(flight);

      FlightsSrv.setAirline(flight.Airline);
      FlightsSrv.setDepartureDateTime(flight.departureDateTime);
      FlightsSrv.setArrivalDateTime(flight.arrivalDateTime);
      FlightsSrv.setAircraftType(flight.aircraftType);
      FlightsSrv.setAircraftModel(flight.aircraftModel);
      FlightsSrv.setCost(flight.Cost);
      $location.path("/tabs/flights-details");
      $scope.$apply();
      };

    /*
    Validations
    */
   $scope.submitted = false;
      //should be editted
      $scope.submitForm = function(isValid) {
        $scope.submitted = true;

        // check to make sure the form is completely valid
        if (isValid) {
           console.log('good');

           FlightsSrv.setDepartureFlight($scope.dep_flight);
           FlightsSrv.setReturnFlight($scope.ret_flight);
           FlightsSrv.setOutgoingPrice(parseInt($scope.dep_price));
           FlightsSrv.setIncomingPrice(parseInt($scope.ret_price));
           FlightsSrv.setTotalPrice(parseInt($scope.dep_price) + parseInt($scope.ret_price));

          $location.path("/tabs/personalInfo");

        }
        else {
           console.log('bad');
        }

      };

      })
