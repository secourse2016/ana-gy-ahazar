App.controller('bookController-personalinformation', function($scope, $http, $location) {
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
	$http.get('/api/countries').success(function (res){
		$scope.countries = res;
	});


   $scope.adults = 2; // should get it from the service.
   var children = 1; // should get it from the service.
   var infants = 1; // should get it from the service.

   $scope.numAdults = function(){
        return new Array($scope.adults);
   };
   $scope.numChildren = function(){
        return new Array(children);
   };
   $scope.numInfants = function(){
        return new Array(infants);
   };

   /*
   Validations
   */
   $scope.submitted = false;
   // function to submit the form after all validation has occurred
   $scope.submitForm = function(isValid) {
      $scope.submitted = true;

      // check to make sure the form is completely valid
      if (isValid) {
         console.log('good');
         $location.url('/book/payment');
      }
      else {
         console.log('bad');
      }

   };
})
