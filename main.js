(function(){

	var app = angular.module("porracaApp", ["firebase"]);

	app.controller("LoginCtrl", ["$scope", "$firebaseAuth",
	  function($scope, $firebaseAuth) {
		var ref = new Firebase("https://europorraca.firebaseio.com");
		var auth = $firebaseAuth(ref);
		
		//user-auth: https://www.firebase.com/docs/web/libraries/angular/guide/user-auth.html
		//store user data: https://www.firebase.com/docs/web/guide/user-auth.html#section-storing
		
		$scope.register = function(){
			$scope.error = null;

			auth.$createUser({
			  email: $scope.email,
			  password: $scope.password
			}).then(function(userData) {
				console.log("User " + userData.uid + " created successfully!");
				$scope.login(true);
			}).catch(function(error) {
				$scope.error = error;
				console.error("Error: ", error);
			});
		};
		
		$scope.login = function(isNew){
			$scope.error = null;
			auth.$authWithPassword({
			  email: $scope.email,
			  password: $scope.password
			}).then(function(authData) {
				$scope.authData = authData;
				
				if(isNew){
					saveUserInOurBD(authData); //remember, user & pass are stored in a separated location. Once the user registers, we store its name and ID in our BD
				}
				console.log("Logged in as:", authData.uid);
			}).catch(function(error) {
				$scope.error = error;
				console.error("Authentication failed:", error);
			});
		};
		
		function saveUserInOurBD(authData){
			ref.child("users").child(authData.uid).set({
			  name: authData.password.email.replace(/@.*/, '')
			});
		}

		
	}]);
	

})();


	