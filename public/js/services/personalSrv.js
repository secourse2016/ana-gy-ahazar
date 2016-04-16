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
      /*Flight Information */

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

   };
});
