App.factory('ManageSrv', function ($http) {
   return {
      cancelReservation: function(booking) {
         return $http.delete('http://54.191.202.17/api/flights/' + booking + '?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI');
      },
      editReservation: function(newInfo) {
         return $http.put('http://54.191.202.17/api/flights/reservation?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI',newInfo);
      },

      setBookingReference: function(value) {
         this.bookingRef = value;
      },
      getBookingReference: function() {
         return this.bookingRef;
      },
      getReservation: function(booking) {
         return $http.get('http://54.191.202.17/api/flights/reservation/' + booking + '?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI');
      },
      setReservationData: function(value) {
         this.reservationData = value;
      },
      getReservationData: function() {
         return this.reservationData;
      },
   };
});
