App.controller('bookController-personalInfo',function($scope) {
   $scope.adults = 2;
   $scope.children = 2;
   $scope.infants = 2;

   $scope.numAdults = function(){
      return new Array($scope.adults);
   };
   $scope.numChildren = function(){
      return new Array($scope.children);
   };
   $scope.numInfants = function(){
      return new Array($scope.infants);
   };

});
