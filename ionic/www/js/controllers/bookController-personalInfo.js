App.controller('bookController-personalInfo',function($scope, PersonalSrv, FlightsSrv, $location) {
   $scope.adults = parseInt(FlightsSrv.getAdults());
   $scope.children = parseInt(FlightsSrv.getChildren());
   $scope.infants = parseInt(FlightsSrv.getInfants());

   $scope.adultFormData = [];
   $scope.childFormData = [];
   $scope.infantFormData = [];

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

      // sala7 daaaah 
      console.log($scope.adultFormData);
      console.log($scope.childFormData);
      console.log($scope.infantFormData);
      PersonalSrv.setAdultsInfo($scope.adultFormData);
      PersonalSrv.setChildrenInfo($scope.childFormData);
      PersonalSrv.setInfantsInfo($scope.infantFormData);

      $location.path('/tabs/payment');
      // check to make sure the form is completely valid
      if (isValid) {
         console.log('good');

      }
      else {
         console.log('bad');
      }

   };

});
