App.controller('HomeController', function($scope, $location) {
   var index = 0;
   var promos = ['Experience Comfort & Luxury', 'Great Flight Deals To Domestic Destinations',
   'Air Madagascar, The Natural Choice', 'Experience Of A Lifetime'];
   $('#holder').text(promos[0]);

   setInterval(function() {
      index = (index+1)%4;

      $(function() {
         $('#holder').fadeOut(400, function() {
            $('#holder').text(promos[index]).fadeIn(400);
         });
      });

   }, 3500);

   $scope.go = function() {
      $location.path('/tabs/book');
   };
});
