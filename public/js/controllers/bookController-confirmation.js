App.controller('bookController-confirmation', function($scope) {

	// flight info
	$scope.origin = "Miami" ;
	$scope.destination = "Malibu" ;
	$scope.departureDate = "1/5/2778" ;
	$scope.returnDate = "5/5/2868";
	$scope.class = "First" ;

	// These arrays should come from the service.

	$scope.adults = [
		{'title': 'Mr.', 'firstName': 'Mohamed', 'lastName': 'Waheed', 'dateOfBirth': '13/12/2013',
		'nationality': 'Egyptian', 'passport': '1234', 'phone': '+201097642897', 'email': 'mohammed.waheed44@gmail.com',
		'emailEmg': 'mdsfafa@yahoo.com', 'phoneEmg': '+201097642897', 'mealPreference': 'None', 'specialNeed': 'None'},
		{'title': 'Mr.', 'firstName': 'Nour ElDin', 'lastName': 'Khaled', 'dateOfBirth': '11/12/1995',
		'nationality': 'Egyptian', 'passport': '1234', 'phone': '+201097642897', 'email': 'nour.khaled@gmail.com',
		'emailEmg': 'dfdsf@yahoo.com', 'phoneEmg': '+201097642897', 'mealPreference': 'None', 'specialNeed': 'None'}
	];

	$scope.children = [
		{'title': 'Mr.', 'firstName': 'Mohamed', 'lastName': 'Waheed', 'dateOfBirth': '13/12/2013',
		'nationality': 'Egyptian', 'passport': '1234', 'mealPreference': 'None', 'specialNeed': 'None'}
		// {'title': 'Mr.', 'firstName': 'Hassan', 'lastName': 'Wael', 'dateOfBirth': '13/12/2323',
		// 'nationality': 'Egyptian', 'mealPreference': 'None', 'specialNeed': 'None'}

	];

	$scope.infants = [
		{'title': 'Mr.', 'firstName': 'Hassan', 'lastName': 'Wael', 'dateOfBirth': '13/12/2323',
		'nationality': 'Egyptian', 'passport': '1234', 'mealPreference': 'None', 'specialNeed': 'None'}

	];

	$scope.total_price = 1555;
});
