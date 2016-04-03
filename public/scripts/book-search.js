$(document).ready(function () {
   
    $('.datepicker').datepicker({
      changeMonth: true,
      changeYear: true 
  });

    $("[id=radio02]").click(function(){
    	$('.RDate').hide();
    	$('.RDLogo').hide();
    	$('.RD').hide();

    });
    $("[id=radio01]").click(function(){
    	$('.RDate').show();
    	$('.RDLogo').show();
    	$('.RD').show();

    });


});