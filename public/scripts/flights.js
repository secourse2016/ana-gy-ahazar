$(document).ready(function () {
	$('.day-button').click(function(){
		$(this).siblings().removeClass('activated')
		$(this).addClass('activated');
	});

	$('.classesTabs a').on('click', function(e)  {
    $(this).parent('li').addClass('activated').siblings().removeClass('activated');

    var elID = this.id;
    
    if(elID == 'class1'){
    	$('#ticketPrice').text('3,800 EGP');
    	$('#chairCount').text('5');
    }
    if(elID == 'class2'){
    	$('#ticketPrice').text('4,260 EGP');
    	$('#chairCount').text('1');
    }
    if(elID == 'class3'){
    	$('#ticketPrice').text('5,000 EGP');
    	$('#chairCount').text('No Seats');
    	$('#ticketRadio').attr( 'disabled', true);
    }
  });
});