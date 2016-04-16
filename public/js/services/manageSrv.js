App.factory('ManageSrv', function ($http) {
   return {
      cancelReservation: function(booking) {
         return $http.delete('/api/flights/' + booking);
      },
      getBookingReference: function() {
         return 'EASF3000';
      }
   };
});
