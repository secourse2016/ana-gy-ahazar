App.controller('bookController-confirmation', function($scope, FlightsSrv, PersonalSrv, $location) {

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

	$scope.total_price = FlightsSrv.getTotalPrice();


	$scope.addReservation = function() {
		console.log('here');
		var dep_flight = FlightsSrv.getDepartureFlight();
		var ret_flight = FlightsSrv.getReturnFlight();

		if (FlightsSrv.getFlightType() == "round") {
			console.log('round');
			var reservation = {'adults': $scope.adults,
									'children': $scope.children,
									'infants': $scope.infants,
									'dep_flight': dep_flight,
									'ret_flight': ret_flight,
									'class': $scope.class,
									'type': 'Direct'};
			FlightsSrv.storeReservation(reservation).success(function(response) {
				console.log(response);
				if (response == "error") {
					swal('Something went wrong please try again!', 'error');
				}
				else {
					swal({
						title: "Booking Reference: " + response,
						text: "Thank you for choosing Air Madagascar.",
						type: "success"
					});
					$location.url('/book');
				}
			});
		}
		else {
			console.log('one');
			var reservation = {'adults': $scope.adults,
									'children': $scope.children,
									'infants': $scope.infants,
									'dep_flight': dep_flight,
									'class': $scope.class,
									'type': 'Direct'};

			FlightsSrv.storeReservation(reservation).success(function(response) {
				console.log(response);
				if (response == "error") {
					swal('title','Something went wrong please try again!', 'error');
				}
				else {
					swal({
						title: "Booking Reference: " + response,
						text: "Thank you for choosing Air Madagascar.",
						type: "success"
					});
					$location.url('/book');
				}
			})
			.error(function() {
				console.log('error');
			});
		}


	}
});
