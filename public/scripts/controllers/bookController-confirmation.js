App.controller('bookController-confirmation', function($scope) {
	$scope.tabName = 'book-confirmation';
	$scope.tabPart = 'tab-part-next active';

	setTimeout(function() {
		setHeight('book-confirmation');
	},0);
	
})