App.controller('bookController-payment', function($scope, $http, $location) {

   /*
      To Get all the countries.
    */
   $http.get('/api/countries').success(function (res){
     $scope.countries = res;
   });

   /*
      Angular Bootstrap Datepicker.
    */
   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
   $scope.format = $scope.formats[0];
   $scope.altInputFormats = ['M!/d!/yyyy'];

   $scope.open = function() {
      $scope.popup.opened = true;
   };

   $scope.popup = {
      opened: false
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
         $location.url('/book/confirmation');
      }
      else {
         console.log('bad');
      }

   };

});
