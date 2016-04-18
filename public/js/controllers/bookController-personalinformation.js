App.controller('bookController-personalinformation', function($scope, $http) {
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
})
