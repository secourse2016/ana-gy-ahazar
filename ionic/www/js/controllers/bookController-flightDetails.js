App.controller('bookController-flightDetails', function($scope, $location, FlightSrv) { 
	$scope.airline = FlightSrv.getAirline();
	$scope.time = FlightSrv.getFlightTime();
	$scope.seats = FlightSrv.getSeats();
	$scope.planeModel = FlightSrv.getPlaneModel();
	$scope.cost = FlightSrv.getCost();
	$scope.entertainment = FlightSrv.getEntertainment();

	var book = function () {
		$location.url("/tabs/personalInfo");
	};
})
