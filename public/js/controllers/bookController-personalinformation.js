App.controller('bookController-personalinformation', function($scope, FlightsSrv, PersonalSrv, $location) {

   $scope.adultFormData = [];
   $scope.childFormData = [];
   $scope.infantFormData = [];

   $scope.adults = parseInt(FlightsSrv.getAdults());
   $scope.children = parseInt(FlightsSrv.getChildren());
   $scope.infants = parseInt(FlightsSrv.getInfants());

   /*
   Angular Bootstrap Datepicker.
   */
   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
   $scope.format = $scope.formats[0];
   $scope.altInputFormats = ['M!/d!/yyyy'];

   //   $http.get('/api/countries').success(function (res){
   // 	$scope.countries = res;
   // });



   $scope.numAdults = function(){
      return new Array($scope.adults);
   };
   $scope.numChildren = function(){
      return new Array($scope.children);
   };
   $scope.numInfants = function(){
      return new Array($scope.infants);
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

         console.log($scope.adultFormData);
         console.log($scope.childFormData);
         console.log($scope.infantFormData);

         PersonalSrv.setAdultsInfo($scope.adultFormData);
         PersonalSrv.setChildrenInfo($scope.childFormData);
         PersonalSrv.setInfantsInfo($scope.infantFormData);

         $location.url('/book/payment');
      }
      else {
         console.log('bad');
      }

   };

});
