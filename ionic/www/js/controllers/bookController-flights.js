
App.controller('bookController-flights', function($scope, $location) { 
       var flights = 
      [
        {id:"1", Airline:"Air Madagascar", Time:"03:40 - 07:40", Seats:"50", planeModel:"Bombardier F868", Cost:"8127 USD",  Entertainment:"Wifi Radio USB "},
        {id:"2", Airline:"Air Madagascar", Time:"03:40 - 07:40", Seats:"50", planeModel:"Bombardier F868", Cost:"8127 USD",  Entertainment:"Wifi Radio USB "},
        {id:"3", Airline:"Air Madagascar", Time:"03:40 - 07:40", Seats:"50", planeModel:"Bombardier F868", Cost:"8127 USD",  Entertainment:"Wifi Radio USB "},
        ];
        $scope.flights = flights;

      var retFlights = 
      [
        {id:"4", Airline:"Air Madagascar", Time:"03:40 - 07:40", Seats:"50", planeModel:"Bombardier F868", Cost:"8127 USD",  Entertainment:"Wifi Radio USB "},
        {id:"5", Airline:"Air Madagascar", Time:"03:40 - 07:40", Seats:"50", planeModel:"Bombardier F868", Cost:"8127 USD",  Entertainment:"Wifi Radio USB "},
      ];
      $scope.retFlights = retFlights;

      $scope.showInfo = function(flightID) {
        console.log("clicked");
        var flight;
       for (var i = 0; i < flights.length; i++) {
        if (flights[i].id === parseInt(flightID)) {
          flight= flights[i];
          break;
        }
      }
      for (var i = 0; i < retFlights.length; i++) {
        if (retFlights[i].id === parseInt(flightID)) {
          flight= retFlights[i];
          break;
        }
      }
      $scope.airline=flight.Airline;
      $scope.time = flight.Time;
      $scope.seats = flight.Seats;
      $scope.planeModel = flight.planeModel;
      $scope.cost = flight.Cost;
      $scope.entertainment = flight.Entertainment;
      
      }

      })





  


