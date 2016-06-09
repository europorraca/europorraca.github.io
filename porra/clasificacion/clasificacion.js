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
.controller('ClasificacionCtrl', ['$scope','$firebaseObject','$window','$http',function($scope,$firebaseObject,$window,$http) {
	var firebaseObj = new Firebase("https://blinding-fire-4682.firebaseio.com/");	
	var user = localStorage.getItem("User");
	if(user.split("@").length > 0){
		user = user.split("@")[0];
	}
	if(user != null ){
	//PARA EL LIVE	
	
	
		firebase.database().ref('Live/Partidos').once('value').then(function(snapshot) {
			var partidos = snapshot.val();
		    $scope.Partido1 = partidos.Partido1;
			$scope.Partido2 = partidos.Partido2;
			$scope.Partido3 = partidos.Partido3;
			
		 
						 $.ajax({
				  headers: { 'X-Auth-Token': 'dd0896404b00402fa3181ac867bce4d1' },
				  url: 'http://api.football-data.org/v1/soccerseasons/424/fixtures',
				  dataType: 'json',
				  type: 'GET',
				}).done(function(response) {
					
				  // do something with the response, e.g. isolate the id of a linked resource        
				  if(response.fixtures[$scope.Partido1].result.goalsHomeTeam == null){
					  $scope.golEncasa = 0;
				  }else{
					  $scope.golEncasa = response.fixtures[$scope.Partido1].result.goalsHomeTeam;
				  }
				   if(response.fixtures[$scope.Partido1].result.goalsAwayTeam == null){
					  $scope.golFuera = 0;
				  }else{
					  $scope.golFuera = response.fixtures[$scope.Partido1].result.goalsHomeTeam;
				  }
				   
				   $scope.EquipoCasa = response.fixtures[$scope.Partido1].homeTeamName
				   $scope.EquipoFuera = response.fixtures[$scope.Partido1].awayTeamName
				   
				   // do something with the response, e.g. isolate the id of a linked resource        
				  if(response.fixtures[$scope.Partido2].result.goalsHomeTeam == null){
					  $scope.golEncasa1 = 0;
				  }else{
					  $scope.golEncasa1 = response.fixtures[$scope.Partido2].result.goalsHomeTeam;
				  }
				   if(response.fixtures[$scope.Partido2].result.goalsAwayTeam == null){
					  $scope.golFuera1 = 0;
				  }else{
					  $scope.golFuera1 = response.fixtures[$scope.Partido2].result.goalsHomeTeam;
				  }
				   
				   $scope.EquipoCasa1 = response.fixtures[$scope.Partido2].homeTeamName
				   $scope.EquipoFuera1 = response.fixtures[$scope.Partido2].awayTeamName
				   
				   // do something with the response, e.g. isolate the id of a linked resource        
				  if(response.fixtures[$scope.Partido3].result.goalsHomeTeam == null){
					  $scope.golEncasa2 = 0;
				  }else{
					  $scope.golEncasa2 = response.fixtures[$scope.Partido3].result.goalsHomeTeam;
				  }
				   if(response.fixtures[$scope.Partido3].result.goalsAwayTeam == null){
					  $scope.golFuera2 = 0;
				  }else{
					  $scope.golFuera2 = response.fixtures[$scope.Partido3].result.goalsHomeTeam;
				  }
				   
				   $scope.EquipoCasa2 = response.fixtures[$scope.Partido3].homeTeamName
				   $scope.EquipoFuera2 = response.fixtures[$scope.Partido3].awayTeamName
				   
				  $scope.$apply(); 
				}); 		 
		 
		$scope.$apply();
		});
		
		
			
	
	

	//PARA EL LIVE	
	
$scope.Ayer = function(event) {
    event.preventDefault();  // To prevent form refresh
	if(document.getElementById("ayer").hidden == false){
		document.getElementById("ayer").hidden = true;	
	}else{
		document.getElementById("ayer").hidden = false;
	}	
}
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


}]);

function writeUserData(userId, nombre, frase) {
  firebase.database().ref('Europorraquers/' + userId).set({
    Nombre: nombre,
    Frase: frase
  });
}