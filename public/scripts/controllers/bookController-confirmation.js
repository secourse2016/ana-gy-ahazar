App.controller('bookController-confirmation', function($scope) {
	$scope.tabName = 'book-confirmation';
	$scope.tabPart = 'tab-part-next active';
	$scope.name = "Mohammed";
	$scope.dateOfBirth = "13/13/2013";
	$scope.nationality = "Egyptian" ;
	$scope.passport = "1234";
	$scope.from = "Miami" ;
	$scope.destination = "Malibu" ;
	$scope.departureDate = "1/5/2778" ;
	$scope.returnDate = "5/5/2868";
	$scope.class = "First" ;
	$scope.phone = "phone";
	$scope.email = "mohammed.waheed44@gmail.com";
	$scope.emailEmg = "mdsfafa@yahoo.com" ;
	$scope.phoneEmg = "58574685";

	setTimeout(function() {
		setHeight('book-confirmation');
	},0);
	
});
