'use strict';

// Declare app level module which depends on views, and components
angular.module('LaPorraca', [
  'ngRoute',
  'LaPorraca.usuario',
   'LaPorraca.clasificacion',
   'LaPorraca.participantes',     
   'LaPorraca.equipos'   
]).
config(['$routeProvider', function($routeProvider) {
	var nombre = localStorage.getItem("Nombre");
	
 // Routes will be here
   $routeProvider.otherwise({redirectTo: 'Clasificacion'});
}]);

