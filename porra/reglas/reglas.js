'use strict';
 
angular.module('LaPorraca.reglas', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/reglas', {
        templateUrl: 'reglas/reglas.html',
        controller: 'ReglasCtrl'
    });
}])
 
// Home controller
.controller('ReglasCtrl', ['$scope','$firebaseObject','$window',function($scope,$firebaseObject,$window) {
	var firebaseObj = new Firebase("https://blinding-fire-4682.firebaseio.com/");	
	var user = localStorage.getItem("User");
	if(user.split("@").length > 0){
		user = user.split("@")[0];
	}
	if(user != null ){
	
	$scope.clasificacion = $firebaseObject(firebaseObj.child('Europorraquers'));			
	//firebase.database().ref('Europorraquers').orderByChild('Puntos').once('value').then(function(snapshot) {
     //$scope.clasificacion = snapshot.val();
  
     //});
			
			
	 
	
	}else{
		alert("Usario incorrecto por favor vuelve a loginarte");
	}
	
	 
	
	 
 $scope.Guardar = function(event) {
    event.preventDefault();  // To prevent form refresh
	var nombre = $scope.user.Nombre;
    var frase = $scope.user.Frase;
	
	writeUserData('jmateu',nombre,frase);
	
	
    
    
}
}]);

function writeUserData(userId, nombre, frase) {
  firebase.database().ref('Europorraquers/' + userId).set({
    Nombre: nombre,
    Frase: frase
  });
}