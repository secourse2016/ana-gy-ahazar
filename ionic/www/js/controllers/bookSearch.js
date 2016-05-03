App.controller('bookSearch', function($scope,FlightsSrv,$location){


	$scope.searchData = {};
	$scope.searchData.search_other = false;
	$scope.searchData.trip_type = 'round';
	$scope.date_show = true;

	$scope.today = function() {
		$scope.searchData.departureDate = new Date();
		$scope.searchData.returnDate = new Date();
	};
	$scope.today();

	 $scope.submitted = false;
   
   $scope.submitForm = function(isValid) {
$scope.submitted = true;
if (isValid) {
         FlightsSrv.setSearchOther($scope.searchData.search_other);
         FlightsSrv.setFlightType($scope.searchData.trip_type);
         FlightsSrv.setSelectedOriginAirport($scope.searchData.selectedOrigin);
         FlightsSrv.setSelectedDestinationAirport($scope.searchData.selectedDestination);
         FlightsSrv.setDepartureDate($scope.searchData.departureDate);
         FlightsSrv.setReturnDate($scope.searchData.returnDate);
         FlightsSrv.setAdults($scope.searchData.adult);
         FlightsSrv.setChildren($scope.searchData.child);
         FlightsSrv.setInfants($scope.searchData.infant);
         FlightsSrv.setClass($scope.searchData.class);
         $location.path('/tabs/flights'); 
        } 
         else {
         console.log('bad');
      }       
    };
});
