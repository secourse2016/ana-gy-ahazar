App.controller('bookController-personalinformation', function($scope, $http) {
	$scope.tabName = 'book-personalinformation';
	$scope.tabPart = 'tab-part-next active';

	setTimeout(function() {
		setHeight('book-personalinformation');
	},0);
	
	$http.get('/api/countries').success(function (res){
		$scope.countries = res;
	});	
})