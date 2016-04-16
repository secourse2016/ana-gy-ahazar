App.controller('bookController-payment', function($scope, promotionSrv, $location) {

   /*
   To Get all the countries.
   */
   // $http.get('/api/countries').success(function (res){
   //   $scope.countries = res;
   // });

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

   $scope.total_cost = 1555;

   /*
   Promotion Code Validation
   */
   $scope.validation_pressed = false;
   $scope.success = false;

   $scope.validate = function() {
      $scope.validation_pressed = true;

      promotionSrv.checkCode($scope.promo_code).success(function(response) {
         
         var num = parseFloat(response);
         if (num > 0.0) {
            $scope.success = true;
            $scope.discount = num * 100;
            $scope.total_cost -= ($scope.total_cost * num);
         }
         else {
            $scope.success = false;
         }
      });
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
