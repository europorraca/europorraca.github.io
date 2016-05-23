'use strict';
 
angular.module('LaPorraca.equipos', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/equipos', {
        templateUrl: 'equipos/equipos.html',
        controller: 'EquiposCtrl'
    });
}])
 
// Home controller
.controller('EquiposCtrl', ['$scope','$firebaseObject','$window',function($scope,$firebaseObject,$window) {
	var firebaseObj = new Firebase("https://blinding-fire-4682.firebaseio.com/");	
	var user = localStorage.getItem("User");
	if(user.split("@").length > 0){
		user = user.split("@")[0];
	}
	if(user != null ){
	
	$scope.equipos = $firebaseObject(firebaseObj.child('Equipos'));			
	$scope.usuarios = $firebaseObject(firebaseObj.child('Europorraquers'));
	$scope.eventos = $firebaseObject(firebaseObj.child('Eventos'));	
	if(user == "jmateu"){
	$scope.noesSuperusuario = false;
	$scope.esSuperusuario = true;
	}else{
		$scope.noesSuperusuario = true;
		$scope.esSuperusuario = false;
	}
	
			
	 
	
	}else{
		alert("Usario incorrecto por favor vuelve a loginarte");
	}
	
	 
	
	 
 $scope.Guardar = function(event) {
    event.preventDefault();  // To prevent form refresh
	
	var aEquipos = {};
	var aUsuarios = {};
	
	$scope.equipos.forEach(function(value,key) {
		    aEquipos[key] = $scope.equipos[key];           
			//Guardamos la puntuacion del equipo
			aEquipos[key].Puntos = $scope.equipos[key].Partido1 + $scope.equipos[key].Partido2 + $scope.equipos[key].Partido3 + $scope.equipos[key].Partido4 + $scope.equipos[key].Partido5 + $scope.equipos[key].Partido6 + $scope.equipos[key].Partido7;
        });	
   $scope.usuarios.forEach(function(value,key) {
	   aUsuarios[key] = $scope.usuarios[key]; 
	   if(aUsuarios[key].Equipo1 != "" && aUsuarios[key].Equipo2 != "" && aUsuarios[key].Equipo3 != "" && aUsuarios[key].Equipo4 != ""){
		   aUsuarios[key].Puntos = aEquipos[aUsuarios[key].Equipo1].Puntos + aEquipos[aUsuarios[key].Equipo2].Puntos + aEquipos[aUsuarios[key].Equipo3].Puntos + aEquipos[aUsuarios[key].Equipo4].Puntos;
		   
	   }else{aUsuarios[key].Puntos =0}
	   
   });	   
   //var eventos = {Eventos : ""}
		
	    writeData(aEquipos,aUsuarios);
	
	
    
    
}
}]);

function writeData(aEquipos,aUsuarios) {
	firebase.database().ref('Equipos').update(aEquipos);
	firebase.database().ref('Europorraquers').update(aUsuarios);
	
  
}