App.controller('feedbackController', function($scope, FeedbackSrv) {

   $scope.feedbackData = {};

   /*
   Validations
   */
   $scope.submitted = false;
   // function to submit the form after all validation has occurred
   $scope.submitForm = function(isValid) {
      $scope.submitted = true;

      // check to make sure the form is completely valid
      if (isValid) {
         console.log('good');
         // Sends a post request to store the feedback in the database.
         FeedbackSrv.storeFeedback($scope.feedbackData).success(function(response) {
            if (response == "success") {
               toastr.options.closeButton = true;
               toastr.options.timeOut = 4000; // How long the toast will display without user interaction
               toastr.options.extendedTimeOut = 700; // How long the toast will display after a user hovers over it
               toastr.success('Your feedback has been sent!');
               $scope.feedbackData = {};
               $scope.submitted = false;
            }
            else {
               toastr.options.closeButton = true;
               toastr.options.timeOut = 4000; // How long the toast will display without user interaction
               toastr.options.extendedTimeOut = 700; // How long the toast will display after a user hovers over it
               toastr.error('An error has occured. Please try to send again.');
            }
         });
      }
      else {
         console.log('bad');
      }

   };
});
