App.factory('ManageSrv', function ($http) {
   return {
      cancelReservation: function(booking) {
         return $http.delete('/api/flights/' + booking);
      },
      setBookingReference: function(value) {
         this.bookingRef = value;
      },
      getBookingReference: function() {
         return this.bookingRef;
      },
      getReservation: function(booking) {
         return $http.get('/api/flights/reservation/' + booking);
      },
      setReservationData: function(value) {
         this.reservationData = value;
      },
      getReservationData: function() {
         return this.reservationData;
      }
   };
});
