$(document).ready(function() {
   $('.slider').click(function() {
      next();
   });
   $('.tab-links a').on('click', function(e)  {
      var currentAttrValue = $(this).attr('href');
      $(this).parent('li').addClass('active').siblings().removeClass('active');
   });
});

function next(){
   $('.slider ul').animate({marginLeft : "-=1000px"}, 1000, function() {
      $(this).find("li:last").after($(this).find('li:first'));
      $(this).css({marginLeft : 0});
   });
}
