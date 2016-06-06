'use strict';
 
angular.module('LaPorraca.clasificacion', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/clasificacion', {
        templateUrl: 'clasificacion/clasificacion.html',
        controller: 'ClasificacionCtrl'
    });
}])
 
// Home controller
.controller('ClasificacionCtrl', ['$scope','$firebaseObject','$window',function($scope,$firebaseObject,$window) {
	var firebaseObj = new Firebase("https://blinding-fire-4682.firebaseio.com/");	
	var user = localStorage.getItem("User");
	if(user.split("@").length > 0){
		user = user.split("@")[0];
	}
	if(user != null ){
	
	$scope.clasificacion = $firebaseObject(firebaseObj.child('Europorraquers'));	
$scope.eventos = $firebaseObject(firebaseObj.child('Eventos'));	
	$scope.Usuarios = {        
        list: {"Juagadores": []   }
    };
	
	

    firebase.database().ref('Europorraquers').once('value').then(function(snapshot) {
		var usuarios = snapshot.val();
		for(var usuario in usuarios){
			$scope.Usuarios.list.Juagadores.push({Nombre: usuarios[usuario].Nombre, 
			Equipo1: usuarios[usuario].Equipo1,
			Equipo2: usuarios[usuario].Equipo2,
			Equipo3: usuarios[usuario].Equipo3,
			Equipo4: usuarios[usuario].Equipo4,
			Jugador: usuarios[usuario].Jugador,
			Puntos: usuarios[usuario].Puntos});
		}
		 
		$scope.$apply(); 
	});
	
		
	
				
			
	 
	
	}else{
		alert("Usario incorrecto por favor vuelve a loginarte");
	}
	
	 
	
	 
 $scope.Guardar = function(event) {
    event.preventDefault();  // To prevent form refresh
	var nombre = $scope.user.Nombre;
    var frase = $scope.user.Frase;
	
	writeUserData('jmateu',nombre,frase);
	
	
    
    
}

$scope.Historico = function(event) {
    event.preventDefault();  // To prevent form refresh
	if(document.getElementById("historico").hidden == false){
		document.getElementById("historico").hidden = true;	
	}else{
		document.getElementById("historico").hidden = false;
	}
	
     
    
}


}]);

function writeUserData(userId, nombre, frase) {
  firebase.database().ref('Europorraquers/' + userId).set({
    Nombre: nombre,
    Frase: frase
  });
}