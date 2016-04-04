$(document).ready(function () {
   
    $('.datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
  
  });

    $("[id=radio02]").click(function(){
    	$('.RDate').hide(300);
    	$('.RDLogo').hide(300);
    	$('.RD').hide(300);

    });
    $("[id=radio01]").click(function(){
        $('.RDate').show(300);
    	$('.RDLogo').show(300);
    	$('.RD').show(300);
    	
    });


});