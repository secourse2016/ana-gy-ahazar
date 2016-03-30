$(document).ready(function() {
   $('.tabs .tab-links a').on('click', function(e)  {
      var currentAttrValue = $(this).attr('href');

      $('.tabs #' + currentAttrValue).siblings().hide(0);
      $('.tabs #' + currentAttrValue).show(0);
      $(this).parent('li').addClass('active').siblings().removeClass('active');
   });
});
