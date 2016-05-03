App.controller('bookSearch', function($scope,FlightsSrv,$location){
	
$(document).ready(function () {
    $(".radio").change(function () { 
        if (this.value == "one") { 
            $('#date2').hide(2000); 
        } else {
            $('#date2').show(2000); 
        }
    });
});
    $scope.from;
    console.log($scope.from);
  
 
$scope.trip = "round";
 $scope.search = function() {

         // FlightsSrv.setSearchOther($scope.search_other);
         // FlightsSrv.setFlightType($scope.trip_type);
         FlightsSrv.setSelectedOriginAirport($scope.From);
         FlightsSrv.setSelectedDestinationAirport($scope.To);
         FlightsSrv.setDepartureDate($scope.dateValue);
         FlightsSrv.setReturnDate($scope.dateValue2);
         FlightsSrv.setAdults($scope.adults);
         FlightsSrv.setChildren($scope.child);
         FlightsSrv.setInfants($scope.infant);
         FlightsSrv.setClass($scope.class);
console.log(FlightsSrv.getAdults()); 


        $location.path('/tabs/flights');        
    };

});