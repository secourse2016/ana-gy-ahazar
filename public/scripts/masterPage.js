var block = false;
var hoverBlock = false;

$(document).ready(function() {

   $('#left,#right').hide();

   $('#promotionArea').hover(function () {
      $('#left,#right').fadeIn(200);
   }, function() {
      $('#left,#right').fadeOut(200);
   });

   var count = $('.slider ul li').size();
   if(count > 1){
      $('.slider ul').css({marginLeft: '-=1000'});
   }


   $('#right').click(function() {
      if(!block){
         if(count > 1){
            block = true;
            next();
         }
      }
   });

   $('#left').click(function() {
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
