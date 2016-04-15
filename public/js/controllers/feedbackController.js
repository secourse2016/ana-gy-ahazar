App.controller('feedbackController', function($scope, FeedbackSrv) {

   $scope.feedbackData = {};

   /*
   This function sends a post request to store the feedback in the database.
   */
   $scope.sendFeedback = function() {
      FeedbackSrv.storeFeedback($scope.feedbackData).success(function() {
         toastr.options.closeButton = true;
         toastr.options.timeOut = 4000; // How long the toast will display without user interaction
         toastr.options.extendedTimeOut = 700; // How long the toast will display after a user hovers over it
         toastr.success('Your feedback has been sent!');
         $scope.feedbackData = {};
      });
   };
});
