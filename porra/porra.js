'use strict';


// Declare app level module which depends on views, and components
angular.module('LaPorraca', [
  'ngRoute','dndLists','angular.filter',
  'LaPorraca.usuario',
   'LaPorraca.clasificacion',
   'LaPorraca.participantes',     
   'LaPorraca.equipos',
   'LaPorraca.reglas'    
]).
config(['$routeProvider', function($routeProvider) {
	
	
 // Routes will be here
   $routeProvider.otherwise({redirectTo: 'clasificacion'});
}]);

function cargarUsuario(){
	var nombre = localStorage.getItem("User");
	var div = document.getElementById("Aviso");
	div.textContent = nombre;
	
}

