$(document).ready(function () {
    // console.log('here');
    $('.datepicker').datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
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