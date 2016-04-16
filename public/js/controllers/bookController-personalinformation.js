App.controller('bookController-personalinformation', function($scope, personalSrv) {
	/*
      Angular Bootstrap Datepicker.
    */
   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
   $scope.format = $scope.formats[0];
   $scope.altInputFormats = ['M!/d!/yyyy'];

   $scope.open1 = function() {
      $scope.popup1.opened = true;
   };

   $scope.popup1 = {
      opened: false
   };

	$scope.open2 = function() {
      $scope.popup2.opened = true;
   };

   $scope.popup2 = {
      opened: false
   };

	$scope.open3 = function() {
      $scope.popup3.opened = true;
   };

   $scope.popup3 = {
      opened: false
   };

	/*
		Get The countries for the country code dropdown list.
	 */
	// $http.get('/api/countries').success(function (res){
	// 	$scope.countries = res;
	// });

   $scope.next = function() {
      /* personal Infromation*/
      personalSrv.setFirstName($scope.first_name);
      personalSrv.setLastName($scope.last_name);
      personalSrv.setTitle($scope.title)
      personalSrv.setNationality($scope.nationality);
      personalSrv.setBirthDate($scope.birth_date);
      personalSrv.setPassportNumber($scope.passport_number);
      
      /*Contact information */
      personalSrv.setPersonalEmail($scope.personal_email);
      personalSrv.setPersonalMobile($scope.personal_Mobile);
      
      /*Emergency contact information*/ 
      personalSrv.setPersonalEmail($scope.emergency_email);
      personalSrv.setPersonalMobile($scope.emergency_Mobile);
      
      /*Special requirements */
      personalSrv.setMealPreference($scope.meal_preference);
      personalSrv.setSpecialNeeds($scope.special_needs);

    }
})
