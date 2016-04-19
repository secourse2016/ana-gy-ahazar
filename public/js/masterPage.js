var currentIndex = 0; // index for background and promo.
var totalCount = 4; // total number of background images and promos.
var promos = ['Experience Comfort & Luxury', 'Great Flight Deals To Domestic Destinations',
'Air Madagascar, The Natural Choice', 'Experience Of A Lifetime'];

/*
Every 4.5 seconds change the background image and change the text promo text.
*/
setInterval(function() {
   currentIndex = (currentIndex+1)%totalCount;

   // fade out whatever is in #promo then fade in the new text.
   $(function() {
      $('#promo').fadeOut(400, function() {
         $('#promo').text(promos[currentIndex]).fadeIn(400);
      });
   });

   $('body').css('background-image', 'url(/assets/background' + currentIndex + '.jpg)'); //doesn't work in firefox
}, 4500);

$(document).ready(function() {
   $('#promo').text(promos[0]).fadeIn(400);

   // Document ready shorthand statement
   $(function() {
      // Select link by id and add click event
      $('#scroller').click(function() {

         // Animate Scroll to #footer
         $('html,body').animate({
            scrollTop: $("#footer").offset().top }, // Tell it to scroll to the top #footer
            '1000' // How long scroll will take in milliseconds
         );

         // Prevent default behavior of link
         return false;
      });
   });
});

function isNumber(e){
   e = e || window.event;
   var charCode = e.which ? e.which : e.keyCode;
   return /\d/.test(String.fromCharCode(charCode));
}
