App.controller('bookController-confirmation', function($scope, personalSrv) {
	/* personal Infromation Part*/
	$scope.title = personalSrv.getTitle();
	$scope.firstName = personalSrv.getFirstName();
	$scope.lastName = personalSrv.getLastName();
	$scope.dateOfBirth = personalSrv.getBirthDate();
	$scope.nationality = personalSrv.getNationality();
	$scope.passport = personalSrv.getPassportNumber();
	
	/*Flight Information */
	$scope.origin = "Miami" ;
	$scope.destination = "Malibu" ;
	$scope.departureDate = "1/5/2778" ;
	$scope.returnDate = "5/5/2868";
	$scope.class = "First" ;
	
	/*Contact information */
	$scope.phone = personalSrv.getPersonalMobile();
	$scope.email = personalSrv.getPersonalEmail();
    
    /*Emergency contact information*/ 	
	$scope.emailEmg = personalSrv.getEmergencyEmail() ;
	$scope.phoneEmg = personalSrv.getEmergencyMobile();;
	
	/*Special requirements */
	$scope.mealPreference = personalSrv.getMealPreference();
	$scope.specialNeed = personalSrv.getSpecialNeeds();

});
