'use strict';
 
angular.module('LaPorraca.participantes', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/participantes', {
        templateUrl: 'participantes/participantes.html',
        controller: 'ParticipantesCtrl'
    });
}])
 
// Home controller
.controller('ParticipantesCtrl', ['$scope','$firebaseObject','$window',function($scope,$firebaseObject,$window) {
	var firebaseObj = new Firebase("https://blinding-fire-4682.firebaseio.com/");	
	var user = localStorage.getItem("User");
	if(user.split("@").length > 0){
		user = user.split("@")[0];
	}
	if(user != null ){
	
		$scope.participantes = $firebaseObject(firebaseObj.child('Europorraquers'));
		//$scope.array = chunk($scope.participantes,4);
		//Nos loginamos en firebase
		var token = localStorage.getItem("token");
		firebase.auth().signInWithCustomToken(token).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
 
	});
	}//if(user != null )
	
angular.forEach($scope.participantes, function (value,index) {
           alert(value);
})
	var aEquipos = {};
	
	$scope.participantes.forEach(function(value,key) {
		    aEquipos[key] = $scope.participantes[key];           
			//Guardamos la puntuacion del equipo
			
        });	
	 
	
	
	
	$scope.CargarFoto = function() {
		$scope.participantes.forEach(function(value,key) {
		    aEquipos[key] = $scope.participantes[key];           
			//Guardamos la puntuacion del equipo
			alert('Cargamos foto');
        });	
	}		
	//CargarFoto();
	 
 $scope.Guardar = function(event) {
    event.preventDefault();  // To prevent form refresh
	var nombre = $scope.user.Nombre;
    var frase = $scope.user.Frase;
	
	writeUserData('jmateu',nombre,frase);
	
	
    
    
}
}]);

var chunk = function(arr, size) {
   var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
          newArr.push(arr.slice(i, i+size));
      }
   return newArr;
};

function writeUserData(userId, nombre, frase) {
  firebase.database().ref('Europorraquers/' + userId).set({
    Nombre: nombre,
    Frase: frase
  });
}