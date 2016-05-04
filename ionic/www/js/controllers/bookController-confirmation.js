App.controller('bookController-confirmation', function($scope, FlightsSrv, PersonalSrv, $location){

  // Departure Flight Info
  var departureFlight = FlightsSrv.getDepartureFlight();
  $scope.departureOrigin = departureFlight.origin;
  $scope.departureDestination = departureFlight.destination;
  $scope.departureDepDate = departureFlight.departureDateTime;
  $scope.departureReturnDate = departureFlight.arrivalDateTime;
  $scope.departureClass = departureFlight.class;

  // Return Flight Info
  var returnFlight = FlightsSrv.getReturnFlight();
  if (typeof returnFlight != 'undefined') {
    $scope.returnOrigin = returnFlight.origin;
    $scope.returnDestination = returnFlight.destination;
    $scope.returnDepDate = returnFlight.departureDateTime;
    $scope.returnReturnDate = returnFlight.arrivalDateTime;
    $scope.returnClass = returnFlight.class;

    $scope.showReturn = true;
  }
  else {
    $scope.showReturn = false;
  }

  $scope.adults = PersonalSrv.getAdultsInfo();
  $scope.children = PersonalSrv.getChildrenInfo();
  $scope.infants = PersonalSrv.getInfantsInfo();

  $scope.total_price = FlightsSrv.getTotalPrice();
});
