var currentTab = 'book';

$(document).ready(function() {
   $('.slider').click(function() {
      next();
   });

   $('.tab-links a').on('click', function(e)  {
      $(this).parent('li').addClass('active').siblings().removeClass('active');
      currentTab = $(this).attr('href');
      setTimeout(function() {
         setHeight();
      }, 5);
   });
});

setTimeout(function() {
   setHeight();
}, 5);

function next(){
   $('.slider ul').animate({marginLeft : "-=1000px"}, 1000, function() {
      $(this).find("li:last").after($(this).find('li:first'));
      $(this).css({marginLeft : 0});
   });
}

function setHeight() {
   console.log('#' + currentTab);
   var h = $('#' + currentTab).outerHeight();
   $('.tab-content').animate({height:h+35},500);
   console.log(currentTab + " " + h);
}
