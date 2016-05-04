App.controller('bookSearch', function($scope,FlightsSrv,$location,ionicDatePicker){
	$scope.searchData = {};

	var ipObj1 = {
		callback: function (val) {  //Mandatory
			console.log('Return value from the datepicker popup is : ' + val, new Date(val));
			$scope.searchData.departureDate = val;

			if(new Date($scope.searchData.returnDate) < new Date($scope.searchData.departureDate)){
				$scope.searchData.returnDate = $scope.searchData.departureDate;
			}
		},
		from: new Date(), //Optional
		to: new Date(2030, 12, 31), //Optional
		showTodayButton: true,
		todayLabel: 'Today',
		closeLabel: 'Close',
		inputDate: new Date(),      //Optional
		closeOnSelect: true,       //Optional
		templateType: 'popup'       //Optional
	};

	var ipObj2 = {
		callback: function (val) {  //Mandatory
			console.log('Return value from the datepicker popup is : ' + val, new Date(val));
			$scope.searchData.returnDate = val;
		},
		from: new Date(), //Optional
		to: new Date(2030, 12, 31), //Optional
		showTodayButton: true,
		todayLabel: 'Today',
		closeLabel: 'Close',
		inputDate: new Date(),      //Optional
		closeOnSelect: true,       //Optional
		templateType: 'popup'       //Optional
	};

	$scope.openDepartureDatePicker = function(){
		ipObj1.inputDate = new Date($scope.searchData.departureDate) || new Date();
		ionicDatePicker.openDatePicker(ipObj1);
	};

	$scope.openReturnDatePicker = function(){
		ipObj2.inputDate = new Date($scope.searchData.returnDate) || new Date();
		ipObj2.from = new Date($scope.searchData.departureDate) || new Date();
		ionicDatePicker.openDatePicker(ipObj2);
	};

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
