App.factory('promotionSrv', function ($http) {
   return {
      checkCode: function(code) {
         return $http.get('http://54.191.202.17/api/validatepromo/' + code + '/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBaXIgTWFkYWdhc2NhciIsImlhdCI6MTQ2MDk1MDc2NywiZXhwIjoxNDkyNDg2NzcyLCJhdWQiOiI1NC4xOTEuMjAyLjE3Iiwic3ViIjoiQWlyLU1hZGFnYXNjYXIifQ.E_tVFheiXJwRLLyAIsp1yoKcdvb8_xCfhjODqG2QkBI');
      }
   };
});
