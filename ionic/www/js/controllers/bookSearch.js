App.controller('bookSearch', function($scope,$location){
	
$(document).ready(function () {
    $(".radio").change(function () { 
        if (this.value == "one") { 
            $('#date2').hide(2000); 
        } else {
            $('#date2').show(2000); 
        }
    });
});

});