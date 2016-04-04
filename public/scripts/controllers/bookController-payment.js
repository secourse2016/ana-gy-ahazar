App.controller('bookController-payment', function($scope, $http) {
   $scope.tabName = 'book-payment';
   $scope.tabPart = 'tab-part-next active';


   setTimeout(function() {
      setHeight('book-payment');
   }, 0);

   $http.get('/api/countries').success(function (res){
     $scope.countries = res;
   });	
});
