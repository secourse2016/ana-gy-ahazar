App.controller('bookController-confirmation', function($scope, FlightsSrv, PersonalSrv) {

	// flight info
	$scope.origin = FlightsSrv.getSelectedOriginAirport();
	$scope.destination = FlightsSrv.getSelectedDestinationAirport() ;
	$scope.departureDate = FlightsSrv.getDepartureDate();
	$scope.returnDate = FlightsSrv.getReturnDate();
	$scope.class = FlightsSrv.getClass();

	// These arrays should come from the service.

	$scope.adults = PersonalSrv.getAdultsInfo();

	$scope.children = PersonalSrv.getChildrenInfo();

	$scope.infants = PersonalSrv.getInfantsInfo();

	$scope.total_price = 1555;
});
