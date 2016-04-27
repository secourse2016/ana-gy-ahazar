App.factory('PersonalSrv', function ($http) {
   return {
      /* personal Infromation Part*/
      setPaymentToken: function(value) {
         this.paymentToken = value;
      },
      getPaymentToken: function() {
         return this.paymentToken;
      },
      setAdultsInfo: function(value) {
         this.adultsInfo = value;
      },
      getAdultsInfo: function() {
         return this.adultsInfo;
      },
      setChildrenInfo: function(value) {
         this.childrenInfo = value;
      },
      getChildrenInfo: function() {
         return this.childrenInfo;
      },
      setInfantsInfo: function(value) {
         this.infantsInfo = value;
      },
      getInfantsInfo: function() {
         return this.infantsInfo;
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
      setTotalPrice: function(value) {
         this.totalPrice = value;
      },
      getTotalPrice: function() {
         return this.totalPrice;
      }
   };
});
