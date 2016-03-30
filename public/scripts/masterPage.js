$(document).ready(function() {
  $('.slider').click(function() {
    next();
  });

  $('.tabs .tab-links a').on('click', function(e)  {
    var currentAttrValue = $(this).attr('href');

    $('.tabs ' + currentAttrValue).siblings().hide(500);
    $('.tabs ' + currentAttrValue).show(500);
    $(this).parent('li').addClass('active').siblings().removeClass('active');

    e.preventDefault();
  });
});

function next(){
  $('.slider ul').animate({marginLeft : "-=1000px"}, 2000, function() {
    $(this).find("li:last").after($(this).find('li:first'));
    $(this).css({marginLeft : 0});
  });
}
