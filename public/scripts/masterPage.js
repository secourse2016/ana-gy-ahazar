$(document).ready(function() {
  var count = $('.slider ul li').size();

   $('#next').click(function() {
     if(count > 1)
      next();
   });

   $('#previous').click(function() {
     if(count > 1)
      previous();
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

function previous(){
  $('.slider ul').find('li:last').animate({width : 0}, 0, function() {
    $('.slider ul').find("li:first").before($(this));
    $('.slider ul').css({marginRight : 0});
    $(this).animate({width : 1000}, 1000);
  });
}
