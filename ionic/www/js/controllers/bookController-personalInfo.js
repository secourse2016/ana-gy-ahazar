App.controller('bookController-personalInfo',function($scope) {
   $scope.adults = 1;
   $scope.children = 1;
   $scope.infants = 1;

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
