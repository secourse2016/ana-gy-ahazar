App.controller('bookController-confirmation', function($scope, personalSrv) {

	console.log(personalSrv.getFirstName());
	/* personal Infromation Part*/
	$scope.title = personalSrv.getTitle();
	$scope.firstName = personalSrv.getFirstName();
	$scope.lastName = personalSrv.getLastName();
	$scope.dateOfBirth = personalSrv.getBirthDate();
	$scope.nationality = personalSrv.getNationality();
	$scope.passport = personalSrv.getPassportNumber();
	
	/*Flight Information */
	$scope.origin = personalSrv.getSelectedOriginAirport() ;
	$scope.destination = personalSrv.getSelectedDestinationAirport();
	$scope.departureDate = personalSrv.getDepartureDate();
	$scope.returnDate = personalSrv.getReturnDate();
	$scope.class = personalSrv.getClass();
	
	/*Contact information */
	$scope.phone = personalSrv.getPersonalMobile();
	$scope.email = personalSrv.getPersonalEmail();
    
    /*Emergency contact information*/ 	
	$scope.emailEmg = personalSrv.getEmergencyEmail() ;
	$scope.phoneEmg = personalSrv.getEmergencyMobile();;
	
	/*Special requirements */
	$scope.mealPreference = personalSrv.getMealPreference();
	$scope.specialNeed = personalSrv.getSpecialNeeds();

	   
console.log(personalSrv.getReturnDate());
console.log(personalSrv.getClass());
	    // console.log (personalSrv.getCardholder());
     //    console.log (personalSrv.getMethod());
     //    console.log (personalSrv.getCardNumber());
     //    console.log (personalSrv.getCVS());
     //    console.log (personalSrv.getExpiryDate());
     //    console.log (personalSrv.getBillingCountry());
     //    console.log (personalSrv.getBillingCity());
     //    console.log (personalSrv.getBillingState());
     //    console.log (personalSrv.getZipCode());
     //    console.log (personalSrv.getAddress());
     //    console.log (personalSrv.getPromotionCode());

});
