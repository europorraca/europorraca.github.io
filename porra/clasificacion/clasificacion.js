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
			$scope.Partido4 = partidos.Partido4;
			$scope.Partido5 = partidos.Partido5;
			$scope.Partido6 = partidos.Partido6;
			
		 
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
					  $scope.golFuera = response.fixtures[$scope.Partido1].result.goalsAwayTeam;
				  }
				   //Tiempo
				   if (response.fixtures[$scope.Partido1].status == 'IN_PLAY'){
					   $scope.Tiempo = "Jugando";					   
				   }
				   if (response.fixtures[$scope.Partido1].status == 'FINISHED'){
					   $scope.Tiempo = "Acabado";					   
				   }
				   if (response.fixtures[$scope.Partido1].status == 'TIMED'){
						var date = new Date(response.fixtures[$scope.Partido1].date);						
					   $scope.Tiempo = date.getHours() +'h' ;					   
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
					  $scope.golFuera1 = response.fixtures[$scope.Partido2].result.goalsAwayTeam;
				  }
				    //Tiempo
				   if (response.fixtures[$scope.Partido2].status == 'IN_PLAY'){
					   $scope.Tiempo2 = "Jugando";					   
				   }
				   if (response.fixtures[$scope.Partido2].status == 'FINISHED'){
					   $scope.Tiempo2 = "Acabado";					   
				   }
				   if (response.fixtures[$scope.Partido2].status == 'TIMED'){
					   
	                   var date = new Date(response.fixtures[$scope.Partido2].date);						
					   $scope.Tiempo2 = date.getHours() +'h' ;					   					   
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
					  $scope.golFuera2 = response.fixtures[$scope.Partido3].result.goalsAwayTeam;
				  }
				    //Tiempo
				   if (response.fixtures[$scope.Partido3].status == 'IN_PLAY'){
					   $scope.Tiempo3 = "Jugando";					   
				   }
				   if (response.fixtures[$scope.Partido3].status == 'FINISHED'){
					   $scope.Tiempo3 = "Acabado";					   
				   }
				   if (response.fixtures[$scope.Partido3].status == 'TIMED'){
					   
                       var date = new Date(response.fixtures[$scope.Partido3].date);						
					   $scope.Tiempo3 = date.getHours() +'h' ;					   
				   }
				   $scope.EquipoCasa2 = response.fixtures[$scope.Partido3].homeTeamName
				   $scope.EquipoFuera2 = response.fixtures[$scope.Partido3].awayTeamName
				   
				    // do something with the response, e.g. isolate the id of a linked resource        
				  if(response.fixtures[$scope.Partido4].result.goalsHomeTeam == null){
					  $scope.golEncasa3 = 0;
				  }else{
					  $scope.golEncasa3 = response.fixtures[$scope.Partido4].result.goalsHomeTeam;
				  }
				   if(response.fixtures[$scope.Partido4].result.goalsAwayTeam == null){
					  $scope.golFuera3 = 0;
				  }else{
					  $scope.golFuera3 = response.fixtures[$scope.Partido4].result.goalsAwayTeam;
				  }
				   //Tiempo
				   if (response.fixtures[$scope.Partido4].status == 'IN_PLAY'){
					   $scope.Tiempo4 = "Jugando";					   
				   }
				   if (response.fixtures[$scope.Partido4].status == 'FINISHED'){
					   $scope.Tiempo4 = "Acabado";					   
				   }
				   if (response.fixtures[$scope.Partido4].status == 'TIMED'){
						var date = new Date(response.fixtures[$scope.Partido4].date);						
					   $scope.Tiempo4 = date.getHours() +'h' ;					   
				   }
				   $scope.EquipoCasa3 = response.fixtures[$scope.Partido4].homeTeamName
				   $scope.EquipoFuera3 = response.fixtures[$scope.Partido4].awayTeamName
				   
				   
				   // do something with the response, e.g. isolate the id of a linked resource        
				  if(response.fixtures[$scope.Partido5].result.goalsHomeTeam == null){
					  $scope.golEncasa4 = 0;
				  }else{
					  $scope.golEncasa4 = response.fixtures[$scope.Partido5].result.goalsHomeTeam;
				  }
				   if(response.fixtures[$scope.Partido5].result.goalsAwayTeam == null){
					  $scope.golFuera4 = 0;
				  }else{
					  $scope.golFuera4 = response.fixtures[$scope.Partido5].result.goalsAwayTeam;
				  }
				   //Tiempo
				   if (response.fixtures[$scope.Partido5].status == 'IN_PLAY'){
					   $scope.Tiempo5 = "Jugando";					   
				   }
				   if (response.fixtures[$scope.Partido5].status == 'FINISHED'){
					   $scope.Tiempo5 = "Acabado";					   
				   }
				   if (response.fixtures[$scope.Partido5].status == 'TIMED'){
						var date = new Date(response.fixtures[$scope.Partido5].date);						
					   $scope.Tiempo5 = date.getHours() +'h' ;					   
				   }
				   $scope.EquipoCasa4 = response.fixtures[$scope.Partido5].homeTeamName;
				   $scope.EquipoFuera4 = response.fixtures[$scope.Partido5].awayTeamName;
				   
				   
				    // do something with the response, e.g. isolate the id of a linked resource        
				  if(response.fixtures[$scope.Partido6].result.goalsHomeTeam == null){
					  $scope.golEncasa5 = 0;
				  }else{
					  $scope.golEncasa5 = response.fixtures[$scope.Partido6].result.goalsHomeTeam;
				  }
				   if(response.fixtures[$scope.Partido6].result.goalsAwayTeam == null){
					  $scope.golFuera5 = 0;
				  }else{
					  $scope.golFuera5 = response.fixtures[$scope.Partido6].result.goalsAwayTeam;
				  }
				   //Tiempo
				   if (response.fixtures[$scope.Partido6].status == 'IN_PLAY'){
					   $scope.Tiempo6 = "Jugando";					   
				   }
				   if (response.fixtures[$scope.Partido6].status == 'FINISHED'){
					   $scope.Tiempo6 = "Acabado";					   
				   }
				   if (response.fixtures[$scope.Partido6].status == 'TIMED'){
						var date = new Date(response.fixtures[$scope.Partido6].date);						
					   $scope.Tiempo6 = date.getHours() +'h' ;					   
				   }
				   $scope.EquipoCasa5 = response.fixtures[$scope.Partido6].homeTeamName
				   $scope.EquipoFuera5 = response.fixtures[$scope.Partido6].awayTeamName
				   
				   
				   
				   
				   
				   
				   
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
	
	$scope.Equipos = {        
        list: {"Equipos": []   }
    };
	 
	 firebase.database().ref('Equipos').once('value').then(function(snapshot) {
		 var equipos = snapshot.val();
		for(var equipo in equipos){
			$scope.Equipos.list.Equipos.push({Nombre: equipos[equipo].Nombre, 
			Eliminado: equipos[equipo].Eliminado});
		}
		 
		$scope.$apply(); 
	 });
	

    firebase.database().ref('Europorraquers').once('value').then(function(snapshot) {
		var usuarios = snapshot.val();
		for(var usuario in usuarios){
			$scope.Usuarios.list.Juagadores.push({Nombre: usuarios[usuario].Nombre, 
			Equipo1: usuarios[usuario].Equipo1,
			Equipo2: usuarios[usuario].Equipo2,
			Equipo3: usuarios[usuario].Equipo3,
			Equipo4: usuarios[usuario].Equipo4,
			Equipo1Eliminado: objectFindByKeyValue($scope.Equipos.list.Equipos,'Nombre',usuarios[usuario].Equipo1),
			Equipo2Eliminado: objectFindByKeyValue($scope.Equipos.list.Equipos,'Nombre',usuarios[usuario].Equipo2),
			Equipo3Eliminado: objectFindByKeyValue($scope.Equipos.list.Equipos,'Nombre',usuarios[usuario].Equipo3),
			Equipo4Eliminado: objectFindByKeyValue($scope.Equipos.list.Equipos,'Nombre',usuarios[usuario].Equipo4),
			Jugador: usuarios[usuario].Jugador,
			Puntos: usuarios[usuario].Puntos});
		}
		 
		$scope.$apply(); 
	});
	
		
	
	//PAra las rondas
	
	$scope.Rondas = {        
        list: {"Jugadores": []   }
    };
	
	firebase.database().ref('Rondas/Jugadores').once('value').then(function(snapshot) {
		var usuarios = snapshot.val();
		for(var usuario in usuarios){
			$scope.Rondas.list.Jugadores.push({Nombre: usuarios[usuario].Nombre, 
			Octavos1: usuarios[usuario].Octavos1.Casa + ' - ' + usuarios[usuario].Octavos1.Fuera,
			Octavos2: usuarios[usuario].Octavos2.Casa + ' - ' + usuarios[usuario].Octavos2.Fuera,
			Octavos3: usuarios[usuario].Octavos3.Casa + ' - ' + usuarios[usuario].Octavos3.Fuera,
			Octavos4: usuarios[usuario].Octavos4.Casa + ' - ' + usuarios[usuario].Octavos4.Fuera,
			Octavos5: usuarios[usuario].Octavos5.Casa + ' - ' + usuarios[usuario].Octavos5.Fuera,
			Octavos6: usuarios[usuario].Octavos6.Casa + ' - ' + usuarios[usuario].Octavos6.Fuera,
			Octavos7: usuarios[usuario].Octavos7.Casa + ' - ' + usuarios[usuario].Octavos7.Fuera,
			Octavos8: usuarios[usuario].Octavos8.Casa + ' - ' + usuarios[usuario].Octavos8.Fuera,
			Puntos: usuarios[usuario].Puntos});
		}
		 
		$scope.$apply(); 
	});
/////////////////////	
			
	 
	
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


function objectFindByKeyValue(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i]['Eliminado'];
        }
    }
    return 'N';
}