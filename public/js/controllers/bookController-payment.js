App.controller('bookController-payment', function($scope, $http) {

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

});
