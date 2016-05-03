App.controller('manageController-edit', function($scope, $location) {
  $scope.adults= 		[{

			"title" : "Mr.",

			"phone_code" : "Afghanistan (+93)",

			"em_phone_code" : "Afghanistan (+93)",

			"mealPreference" : "None",

			"specialNeed" : "None",

			"first_name" : "Nour ElDin",

			"last_name" : "Khaled",

			"nationality" : "Egyptain",

			"birth_date" : "2016-04-19T22:00:00.000Z",

			"passport_number" : "123123",

			"issue_date" : "2016-04-04T22:00:00.000Z",

			"expiry_date" : "2016-04-18T22:00:00.000Z",

			"email" : "m@m.com",

			"phone_number" : "1312321",

			"em_email" : "m@m.com",

			"em_phone_number" : "312313"

		}, 		{

			"title" : "Ms.",

			"phone_code" : "Afghanistan (+93)",

			"em_phone_code" : "Afghanistan (+93)",

			"mealPreference" : "None",

			"specialNeed" : "None",

			"first_name" : "Mahesty",

			"last_name" : "Nasser",

			"nationality" : "Maldivian",

			"birth_date" : "1995-11-10T22:00:00.000Z",

			"passport_number" : "123123",

			"issue_date" : "2016-04-04T22:00:00.000Z",

			"expiry_date" : "2016-04-18T22:00:00.000Z",

			"email" : "hesty@jesty.com",

			"phone_number" : "15373638",

			"em_email" : "rawshana@rawshana.com",

			"em_phone_number" : "312313"

		}];

  $scope.children = [
  			{

			"mealPreference" : "None",

			"specialNeed" : "None",

			"first_name" : "Eyad",

			"last_name" : "Nasser",

			"nationality" : "Egyptain",

			"birth_date" : "2016-04-19T22:00:00.000Z",

			"passport_number" : "123123",

			"issue_date" : "2016-04-04T22:00:00.000Z",

			"expiry_date" : "2016-04-18T22:00:00.000Z",

		}, {

			"mealPreference" : "None",

			"specialNeed" : "None",

			"first_name" : "Saden",

			"last_name" : "Nasser",

			"nationality" : "Egyptain",

			"birth_date" : "2016-04-19T22:00:00.000Z",

			"passport_number" : "123123",

			"issue_date" : "2016-04-04T22:00:00.000Z",

			"expiry_date" : "2016-04-18T22:00:00.000Z",

		}
  ];

  $scope.infants = [
  {

			"mealPreference" : "None",

			"specialNeed" : "Deaf passenger",

			"first_name" : "Nour ElDin",

			"last_name" : "Khaled",

			"nationality" : "Egyptain",

			"birth_date" : "2016-04-19T22:00:00.000Z",

			"passport_number" : "123123",

			"issue_date" : "2016-04-04T22:00:00.000Z",

			"expiry_date" : "2016-04-18T22:00:00.000Z",

		},
	{

			"mealPreference" : "None",

			"specialNeed" : "None",

			"first_name" : "Asser",

			"last_name" : "Khaled",

			"nationality" : "Egyptain",

			"birth_date" : "2016-04-19T22:00:00.000Z",

			"passport_number" : "123123",

			"issue_date" : "2016-04-04T22:00:00.000Z",

			"expiry_date" : "2016-04-18T22:00:00.000Z",

		}

  ];

   $scope.adultFormData = [];
   $scope.childFormData = [];
   $scope.infantFormData = [];

   /* By Default all the formData arrays should contain the old data */
   for(i = 0; i < $scope.adults.length; i++) {
      var currentAdult = $scope.adults[i];
      // console.log(currentAdult);

      var json = {};
      json.first_name = currentAdult.first_name;
      json.last_name = currentAdult.last_name;
      json.nationality = currentAdult.nationality;
      json.birth_date = currentAdult.birth_date;
      json.email = currentAdult.email;
      json.phone_number = currentAdult.phone_number;
      json.em_email = currentAdult.em_email;
      json.em_phone_number = currentAdult.em_phone_number;
      json.passport_number = currentAdult.passport_number;

      $scope.adultFormData[i] = json;
   }

   for(i = 0; i < $scope.children.length; i++) {
      var currentChild = $scope.children[i];
      var json = {};
      json.first_name = currentChild.first_name;
      json.last_name = currentChild.last_name;
      json.nationality = currentChild.nationality;
      json.birth_date = currentChild.birth_date;
      json.passport_number = currentChild.passport_number;

      $scope.childFormData[i] = json;
   }

   for(i = 0; i < $scope.infants.length; i++) {
      var currentInfant = $scope.infants[i];
      var json = {};
      json.first_name = currentInfant.first_name;
      json.last_name = currentInfant.last_name;
      json.nationality = currentInfant.nationality;
      json.birth_date = currentInfant.birth_date;
      json.passport_number = currentInfant.passport_number;

      $scope.infantFormData[i] = json;
   }
});
