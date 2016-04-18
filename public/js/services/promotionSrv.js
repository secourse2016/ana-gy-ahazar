App.factory('promotionSrv', function ($http) {
   return {
      checkCode: function(code) {
         return $http.get('/api/validatepromo/' + code);
      }
   };
});
