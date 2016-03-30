$(document).ready(function() {
  $('.slider').click(function() {
    next();
  });
});

function next(){
  $('.slider ul').animate({marginLeft : "-=1000px"}, 2000, function() {
    $(this).find("li:last").after($(this).find('li:first'));
    $(this).css({marginLeft : 0});
  });
}
