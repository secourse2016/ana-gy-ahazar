$(document).ready(function () {
	$('.day-button').click(function(){
		$(this).siblings().removeClass('activated')
		$(this).addClass('activated');
	});

// 	$('.classesTabs a').on('click', function()  {
//     $(this).parent('li').addClass('active').siblings().removeClass('active');
    
//     var elID = this.id;
    
//     if(elID == 'class1'){
//     	$('#ticketPrice').text('3,800 EGP');
//     	$('#chairCount').text('5');
//     	$('#ticketRadio').attr( 'disabled', false);
//     }
//     if(elID == 'class2'){
//     	$('#ticketPrice').text('4,260 EGP');
//     	$('#chairCount').text('1');
//     	$('#ticketRadio').attr( 'disabled', false);
//     }
//     if(elID == 'class3'){
//     	$('#ticketPrice').text('5,000 EGP');
//     	$('#chairCount').text('No Seats');
//     	$('#ticketRadio').attr( 'disabled', true);
//     }
//   });
});