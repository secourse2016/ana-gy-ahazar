var block = false;
var hoverBlock = false;

$(document).ready(function() {

   $('#next,#previous').hide();

   $('#promotionArea').hover(function () {
      $('#next,#previous').fadeIn(200);
   }, function() {
      $('#next,#previous').fadeOut(200);
   });

   var count = $('.slider ul li').size();
   if(count > 1){
      $('.slider ul').css({marginLeft: '-=1000'});
   }


   $('#next').click(function() {
      if(!block){
         if(count > 1){
            block = true;
            next();
         }
      }
   });

   $('#previous').click(function() {
      if(!block){
         if(count > 1){
            block = true;
            previous();
         }
      }
   });

   $('.tab-links a').on('click', function(e)  {
      $(this).parent('li').addClass('active').siblings().removeClass('active');
   });
});

function next(){
   $('.slider ul').find("li:last").after($('.slider ul').find('li:first'));
   $('.slider ul').css({marginLeft : 0});
   $('.slider ul').animate({marginLeft : "-=1000px"}, 1000, function() {
      block = false;
   });
}

function previous(){
   $('.slider ul').animate({marginLeft : "+=1000px"}, 1000, function() {
      $('.slider ul').find("li:first").before($('.slider ul').find('li:last'));
      $('.slider ul').css({marginLeft : "-=1000"});
      block = false;
   });
}
