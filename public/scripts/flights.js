$(document).ready(function () {
	$('.day-button').click(function(){
		$(this).siblings().removeClass('activated')
		$(this).addClass('activated');
	});

	$('.classesTabs a').on('click', function(e)  {
    $(this).parent('li').addClass('activated').siblings().removeClass('activated');
  });
});