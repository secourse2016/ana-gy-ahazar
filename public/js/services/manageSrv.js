App.factory('ManageSrv', function ($http) {
   return {
   setLastName: function(value) {
      this.lastName = value;
   },

   getLastName: function() {
      return this.lastName;
   },
    setBookingReference : function(value) {
      this.bookingReference = value;
   },

   getBookingReference: function() {
      return this.bookingReference;
   },
};
});