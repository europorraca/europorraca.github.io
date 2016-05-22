'use strict';
 
angular.module('myApp.home', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])
 
// Home controller
.controller('HomeCtrl', ['$scope','$firebaseSimpleLogin','$window',function($scope,$firebaseSimpleLogin,$window) {
	var firebaseObj = new Firebase("https://blinding-fire-4682.firebaseio.com/");
	var loginObj = $firebaseSimpleLogin(firebaseObj);
 
 var user = localStorage.getItem("User");
 if(user !=null ){
	 localStorage.setItem("User",null);
 }
 $scope.SignIn = function(event) {
    event.preventDefault();  // To prevent form refresh
	if($scope.user == null){
		 alert('Faltan campos por rellenar');
	}else{
	var username = $scope.user.email;
    var password = $scope.user.password;
    
	     loginObj.$login('password', {
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
			localStorage.setItem("User", username);
			localStorage.setItem("token", user.firebaseAuthToken);
			
            $window.location.href = 'porra/porra.html';
        }, function(error) {
            // Failure callback
           alert('Error al loginarte');
        });	 
		
	}
    
    
}
}]);