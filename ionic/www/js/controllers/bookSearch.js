App.controller('bookSearch', function($scope,$location){

	$scope.searchData = {};
	$scope.searchData.search_other = false;
	$scope.searchData.trip_type = 'round';
	$scope.date_show = true;

	$scope.today = function() {
		$scope.searchData.departureDate = new Date();
		$scope.searchData.returnDate = new Date();
	};
	$scope.today();

	$scope.submitForm = function() {
		console.log($scope.searchData);
		console.log($scope.date_show);
	};
});
