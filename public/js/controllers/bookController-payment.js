App.controller('bookController-payment', function($scope, promotionSrv) {

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
   $scope.validate = function() {
      $scope.validation_pressed = true;

      promotionSrv.checkCode($scope.promo_code).success(function(response) {
         console.log(response);
         var num = parseFloat(response);
         if (num == 0.0)
            $scope.success = false;
         else {
            $scope.success = true;
            $scope.discount = num * 100;
            $scope.total_cost -= ($scope.total_cost * num);
         }
      });
   };

});
