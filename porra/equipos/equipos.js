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
	
	
	$scope.jugadores = $firebaseObject(firebaseObj.child('Jugadores'));
	$scope.equipos = $firebaseObject(firebaseObj.child('Equipos'));			
	$scope.usuarios = $firebaseObject(firebaseObj.child('Europorraquers'));
	$scope.eventos = $firebaseObject(firebaseObj.child('Eventos'));	
	$scope.rondas = $firebaseObject(firebaseObj.child('Rondas/Cruces'));
	$scope.jugadoresRondas = $firebaseObject(firebaseObj.child('Rondas/Jugadores'));
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
	
	$scope.Historico = function(event) {
    event.preventDefault();  // To prevent form refresh
	if(document.getElementById("historico").hidden == false){
		document.getElementById("historico").hidden = true;	
	}else{
		document.getElementById("historico").hidden = false;
	}
	
     
    
} 
	
	 
 $scope.Guardar = function(event) {
    event.preventDefault();  // To prevent form refresh
	
	var aEquipos = {};
	var aUsuarios = {};
	var aJugadores = {};
	//Guardamos la puntuacion del equipo
	$scope.equipos.forEach(function(value,key) {
		    aEquipos[key] = $scope.equipos[key];           			
			aEquipos[key].Puntos = $scope.equipos[key].Partido1 + $scope.equipos[key].Partido2 + $scope.equipos[key].Partido3 + $scope.equipos[key].Partido4 + $scope.equipos[key].Partido5 + $scope.equipos[key].Partido6 + $scope.equipos[key].Partido7;
        });	
		//Guardamos la puntuacion de los jugadores
		$scope.jugadores.forEach(function(value,key) {
		    aJugadores[key] = $scope.jugadores[key];           
			//Guardamos la puntuacion del equipo
			aJugadores[key].Puntos = $scope.jugadores[key].Puntos ;
        });	
   $scope.usuarios.forEach(function(value,key) {
	   aUsuarios[key] = $scope.usuarios[key]; 
	   if(aUsuarios[key].Equipo1 != "" && aUsuarios[key].Equipo2 != "" && aUsuarios[key].Equipo3 != "" && aUsuarios[key].Equipo4 != "" && aUsuarios[key].Jugador != ""){
		   aUsuarios[key].Puntos = aJugadores[aUsuarios[key].Jugador].Puntos  + aEquipos[aUsuarios[key].Equipo1].Puntos + aEquipos[aUsuarios[key].Equipo2].Puntos + aEquipos[aUsuarios[key].Equipo3].Puntos + aEquipos[aUsuarios[key].Equipo4].Puntos;
		   
	   }else{aUsuarios[key].Puntos =0}
	   
   });	   
   //var eventos = {Eventos : ""}
		
	    writeData(aEquipos,aUsuarios,aJugadores);
	
	
    
    
}

$scope.GuardarRondas = function(event) {
    event.preventDefault();  // To prevent form refresh
	
	var aCruce = {};
	var JugadoresRondas = {};
	
	//Guardamos la puntuacion del cruce
	$scope.rondas.forEach(function(value,key) {
		    aCruce[key] = $scope.rondas[key];           			
			aCruce[key].Casa = $scope.rondas[key].Casa ;
			aCruce[key].Fuera = $scope.rondas[key].Fuera;
			if ($scope.rondas[key].Fuera > $scope.rondas[key].Casa){
				aCruce[key].Signo = 2;
			}
			if ($scope.rondas[key].Fuera < $scope.rondas[key].Casa){
				aCruce[key].Signo = 1;
			}
			if ($scope.rondas[key].Fuera == $scope.rondas[key].Casa){
				aCruce[key].Signo = 'X';
			}
	});	
	//Guardamos los puntos de cada jugador
	$scope.jugadoresRondas.forEach(function(value,key) {
	    JugadoresRondas[key] = $scope.jugadoresRondas[key]; 
	   var Puntos = 0
	   //Puntos Octavos 1
	   if ($scope.rondas["Octavos1"].Casa == JugadoresRondas[key].Octavos1.Casa && $scope.rondas["Octavos1"].Fuera == JugadoresRondas[key].Octavos1.Fuera){
		   Puntos = Puntos + 10;
	   }
	   if ($scope.rondas["Octavos1"].Signo == JugadoresRondas[key].Octavos1.Signo){
		   Puntos = Puntos + 4;
	   }
	   //Puntos Octavos 2
	    if ($scope.rondas["Octavos2"].Casa == JugadoresRondas[key].Octavos2.Casa && $scope.rondas["Octavos2"].Fuera == JugadoresRondas[key].Octavos2.Fuera){
		   Puntos = Puntos + 10;
	   }
	   if ($scope.rondas["Octavos2"].Signo == JugadoresRondas[key].Octavos2.Signo){
		   Puntos = Puntos + 4;
	   }
	   //Puntos Octavos 3
	    if ($scope.rondas["Octavos3"].Casa == JugadoresRondas[key].Octavos3.Casa && $scope.rondas["Octavos3"].Fuera == JugadoresRondas[key].Octavos3.Fuera){
		   Puntos = Puntos + 10;
	   }
	   if ($scope.rondas["Octavos3"].Signo == JugadoresRondas[key].Octavos3.Signo){
		   Puntos = Puntos + 4;
	   }
	   //Puntos Octavos 4
	    if ($scope.rondas["Octavos4"].Casa == JugadoresRondas[key].Octavos4.Casa && $scope.rondas["Octavos4"].Fuera == JugadoresRondas[key].Octavos4.Fuera){
		   Puntos = Puntos + 10;
	   }
	   if ($scope.rondas["Octavos4"].Signo == JugadoresRondas[key].Octavos4.Signo){
		   Puntos = Puntos + 4;
	   }
	   
	   //Puntos Octavos 5
	    if ($scope.rondas["Octavos5"].Casa == JugadoresRondas[key].Octavos5.Casa && $scope.rondas["Octavos5"].Fuera == JugadoresRondas[key].Octavos5.Fuera){
		   Puntos = Puntos + 10;
	   }
	   if ($scope.rondas["Octavos5"].Signo == JugadoresRondas[key].Octavos5.Signo){
		   Puntos = Puntos + 4;
	   }
	   
	   //Puntos Octavos 6
	    if ($scope.rondas["Octavos6"].Casa == JugadoresRondas[key].Octavos6.Casa && $scope.rondas["Octavos6"].Fuera == JugadoresRondas[key].Octavos6.Fuera){
		   Puntos = Puntos + 10;
	   }
	   if ($scope.rondas["Octavos6"].Signo == JugadoresRondas[key].Octavos6.Signo){
		   Puntos = Puntos + 4;
	   }
	   
	   //Puntos Octavos 7
	    if ($scope.rondas["Octavos7"].Casa == JugadoresRondas[key].Octavos7.Casa && $scope.rondas["Octavos7"].Fuera == JugadoresRondas[key].Octavos7.Fuera){
		   Puntos = Puntos + 10;
	   }
	   if ($scope.rondas["Octavos7"].Signo == JugadoresRondas[key].Octavos7.Signo){
		   Puntos = Puntos + 4;
	   }
	   
	   //Puntos Octavos 8
	    if ($scope.rondas["Octavos8"].Casa == JugadoresRondas[key].Octavos8.Casa && $scope.rondas["Octavos8"].Fuera == JugadoresRondas[key].Octavos8.Fuera){
		   Puntos = Puntos + 10;
	   }
	   if ($scope.rondas["Octavos8"].Signo == JugadoresRondas[key].Octavos8.Signo){
		   Puntos = Puntos + 4;
	   }
	   
	   JugadoresRondas[key].Puntos = Puntos;
	   
	   
		
	   	   
   });	
		
  
		
	writeDataRondas(aCruce,JugadoresRondas);
	
	
    
    
}
}]);

function writeDataRondas(aCruce,JugadoresRondas) {
	firebase.database().ref('Rondas/Cruces').update(aCruce);
	firebase.database().ref('Rondas/Jugadores').update(JugadoresRondas);
	
	
  
}


function writeData(aEquipos,aUsuarios,aJugadores) {
	firebase.database().ref('Equipos').update(aEquipos);
	firebase.database().ref('Europorraquers').update(aUsuarios);
	firebase.database().ref('Jugadores').update(aJugadores);
	
  
}