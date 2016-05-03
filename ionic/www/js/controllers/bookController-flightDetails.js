App.controller('bookController-flightDetails', function($scope, $location, FlightsSrv) { 
	console.log('entered');

	$scope.airline = FlightsSrv.getAirline();
	console.log(FlightsSrv.getAirline());
	$scope.depTime = FlightsSrv.getDepartureDateTime();
	$scope.arrTime = FlightsSrv.getArrivalDateTime();
	$scope.seats = 50;
	$scope.aircraftType = FlightsSrv.getAircraftType();
	$scope.aircraftModel = FlightsSrv.getAircraftModel();
	$scope.cost = FlightsSrv.getCost();
	$scope.entertainment = "Wifi Radio USB";
})
