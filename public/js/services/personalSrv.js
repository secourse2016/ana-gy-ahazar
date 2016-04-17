App.factory('personalSrv', function ($http) {
   return {
    /* personal Infromation Part*/
    setFirstName: function(value) {
      this.firstName = value;
   },

   getFirstName: function() {
      return this.firstName;
   },
   setLastName: function(value) {
      this.lastName = value;
   },

   getLastName: function() {
      return this.lastName;
   },
   setTitle: function(value) {
      this.title = value;
   },

   getTitle: function() {
      return this.title;
   },
   setNationality: function(value) {
      this.nationality = value;
   },

   getNationality: function() {
      return this.nationality;
   },
   setBirthDate: function(value) {
      this.birthDate = value;
   },

   getBirthDate: function() {
      return this.birthDate;
   },
   setPassportNumber: function(value) {
      this.passportNumber = value;
   },

   getPassportNumber: function() {
      return this.passportNumber;
   },

   /*Contact information */
   setPersonalEmail: function(value) {
      this.personalEmail = value;
   },

   getPersonalEmail: function() {
      return this.personalEmail;
   },
   setPersonalMobile: function(value) {
      this.personalMobile = value;
   },

   getPersonalMobile: function() {
      return this.personalMobile;
   },

   /*Emergency contact information*/ 
   setEmergencyEmail: function(value) {
      this.emergencyEmail = value;
   },

   getEmergencyEmail: function() {
      return this.emergencyEmail;
   },
   setEmergencyMobile: function(value) {
      this.emergencyMobile = value;
   },

   getEmergencyMobile: function() {
      return this.emergencyMobile;
   },
   /*Special requirements */
   setMealPreference: function(value) {
      this.mealPreference = value;
   },

   getMealPreference: function() {
      return this.mealPreference;
   },

   setSpecialNeeds: function(value) {
      this.specialNeeds = value;
   },

   getSpecialNeeds: function() {
      return this.specialNeeds;
   },
   /*Flight Info */
   setSelectedOriginAirport: function(value) {
      this.selectedOriginAirport = value;
   },
   getSelectedOriginAirport: function() {
      return this.selectedOriginAirport;
   },
   setSelectedDestinationAirport: function(value) {
      this.selectedDestinationAirport = value;
   },
   getSelectedDestinationAirport: function() {
      return this.selectedDestinationAirport;
   },
   setDepartureDate: function(value) {
      this.departureDate = value;
   },
   getDepartureDate: function() {
      return this.departureDate;
   },
   setReturnDate: function(value) {
      this.returnDate = value;
   },
   getReturnDate: function() {
      return this.returnDate;
   },
   setAdults: function(value) {
      this.adults = value;
   },
   getAdults: function() {
      return this.adults;
   },
   setChildren: function(value) {
      this.children = value;
   },
   getChildren: function() {
      return this.children;
   },
   setInfants: function(value) {
      this.infants = value;
   },
   getInfants: function() {
      return this.infants;
   },
   setClass: function(value) {
      this.class = value;
   },
   getClass: function() {
      return this.class;
   },


   /*Payment Information*/
   setCardholder: function(value){
      this.cardholder = value;
   },
   getCardholder: function(){
      return this.cardholder;
   },
   setMethod: function(value){
      this.method = value;
   },
   getMethod: function(){
      return this.method;
   },
   setCardNumber: function(value){
      this.cardNumber = value;
   },
   getCardNumber: function(){
      return this.cardNumber;
   },
   setCVS: function(value){
      this.CVS = value;
   },
   getCVS: function(){
      return this.CVS;
   },
   setExpiryDate: function(value){
      this.expiryDate = value;
   },
   getExpiryDate: function(){
      return this.expiryDate;
   },
   setBillingCountry:function(value){
      this.billingCountry = value;
   },
   getBillingCountry: function(){
      return this.billingCountry;
   },
     setBillingCity:function(value){
      this.billingCity = value;
   },
   getBillingCity: function(){
      return this.billingCity;
   },  
   setBillingState:function(value){
      this.billingState = value;
   },
   getBillingState: function(){
      return this.billingState;
   },
   setZipCode:function(value){
      this.zipCode = value;
   },
   getZipCode: function(){
      return this.zipCode;
   },
   setAddress:function(value){
      this.address = value;
   },
   getAddress: function(){
      return this.address;
   },
   setPromotionCode:function(value){
      this.promotionCode = value;
   },
   getPromotionCode: function(){
      return this.promotionCode;
   },
   


};
});
