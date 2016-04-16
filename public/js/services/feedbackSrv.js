App.factory('FeedbackSrv', function ($http) {
   return {
      storeFeedback: function(feedbackData) {
         return $http.post('/feedback', feedbackData);
      }
   };
});
