App.controller('bookController-outgoing', function($scope) {
   $scope.tabName = 'book-outgoing';
   $scope.tabPart = 'tab-part-next active';


   setTimeout(function() {
      setHeight('book-outgoing');
   }, 0);
});
