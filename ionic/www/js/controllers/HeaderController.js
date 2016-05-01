App.controller('HeaderController', function($scope, $ionicModal, FeedbackSrv, $ionicLoading) {
   $scope.data = {};

   // Create and load the Modal
   $ionicModal.fromTemplateUrl('feedback.html', function(modal) {
      $scope.feedbackModal = modal;
   }, {
      scope: $scope,
      animation: 'slide-in-up'
   });

   // This function sends the feedback to the API.
   $scope.send = function() {
      FeedbackSrv.storeFeedback($scope.data).success(function(response) {
         $ionicLoading.show({ template: 'Your feedback has been sent!', noBackdrop: true, duration: 2000 });
      })
      .error(function() {
         console.log('error');
      });

      $scope.feedbackModal.hide();
      $scope.data = {};
   };

    // Open the feedback modal.
   $scope.open = function() {
      $scope.feedbackModal.show();
   };

   // Close the feedback modal.
   $scope.close = function() {
      $scope.feedbackModal.hide();
   };
});
