App.controller('bookController-personalInfo',function($scope, PersonalSrv, $location) {
   $scope.adults = 1;
   $scope.children = 0;
   $scope.infants = 0;

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

      console.log($scope.adultFormData);
      console.log($scope.childFormData);
      console.log($scope.infantFormData);
      // check to make sure the form is completely valid
      if (isValid) {
         console.log('good');

         PersonalSrv.setAdultsInfo($scope.adultFormData);
         PersonalSrv.setChildrenInfo($scope.childFormData);
         PersonalSrv.setInfantsInfo($scope.infantFormData);

         $location.path('/tabs/payment');
      }
      else {
         console.log('bad');
      }

   };

});
