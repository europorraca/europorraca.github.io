'use strict';
 
angular.module('LaPorraca.usuario', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/usuario', {
        templateUrl: 'usuario/usuario.html',
        controller: 'UsuarioCtrl'
    });
}])
 
// Home controller
.controller('UsuarioCtrl', ['$scope','$firebaseObject','$window',function($scope,$firebaseObject,$window) {
	var firebaseObj = new Firebase("https://blinding-fire-4682.firebaseio.com/");	
	var user = localStorage.getItem("User");
	if(user.split("@").length > 0){
		user = user.split("@")[0];
	}
	if(user != null ){
	$scope.profile = $firebaseObject(firebaseObj.child('Europorraquers').child(user));			
	$scope.CreditosTotales = 0;
	}else{
		alert("Usario incorrecto por favor vuelve a loginarte")
	}

//Para seleccionar
 $scope.dropdown = {  
		jugadorSelect: null, 
        list: {"Jugadores": []   }
    };
	
	firebase.database().ref('Jugadores').once('value').then(function(snapshot) {
	 var jugadores = snapshot.val();
	 var jugador = new Object();
	 for(jugador in jugadores){
		
		 $scope.dropdown.list.Jugadores.push({label: jugador, Creditos: jugadores[jugador].Creditos});
		 
	 }
	 
	 
     $scope.$apply(); 
	 
   });
   
  
  $scope.models = {
        selected: null,		
		max: 32,
        lists: {"Disponibles": [], 
		        "Seleccionados": []}
    };
	
	$scope.Selecciones = {        
        list: {"Totales": []   }
    };
	
	firebase.database().ref('Equipos').once('value').then(function(snapshot) {
	 var equipos = snapshot.val();
	 var equipo = new Object();
	 for(equipo in equipos){
		
		 $scope.Selecciones.list.Totales.push({label: equipo, Creditos: equipos[equipo].Creditos});
		 
	 }
	 
     $scope.$apply(); 
	 
   });

	
	firebase.database().ref('Europorraquers/' +  user).once('value').then(function(snapshot) {
		 var usuario = snapshot.val();
		 var Creditos1 = 0;
		 var Creditos2 = 0;
		 var Creditos3 = 0;
		 var Creditos4 = 0;
		 var CreditosJugador = 0;
		 if(objectFindByKey($scope.Selecciones.list.Totales,'label',usuario.Equipo1)){
			   Creditos1 = objectFindByKeyValue($scope.Selecciones.list.Totales,'label',usuario.Equipo1);
			}
			if(objectFindByKey($scope.Selecciones.list.Totales,'label',usuario.Equipo2)){
			   Creditos2 = objectFindByKeyValue($scope.Selecciones.list.Totales,'label',usuario.Equipo2);
			}
			if(objectFindByKey($scope.Selecciones.list.Totales,'label',usuario.Equipo3)){
			   Creditos3 = objectFindByKeyValue($scope.Selecciones.list.Totales,'label',usuario.Equipo3);
			}
			if(objectFindByKey($scope.Selecciones.list.Totales,'label',usuario.Equipo4)){
			   Creditos4 = objectFindByKeyValue($scope.Selecciones.list.Totales,'label',usuario.Equipo4);
			}
			//Para los jugadores
			if(usuario.Jugador != null){				
				CreditosJugador = objectFindByKeyValue($scope.dropdown.list.Jugadores,'label',usuario.Jugador);
				$scope.dropdown.jugadorSelect = usuario.Jugador;
			}
		 
		 
		 if(usuario.Equipo1 != ""){$scope.models.lists.Seleccionados.push({label: usuario.Equipo1, Creditos: Creditos1});}
		 if(usuario.Equipo2 != ""){$scope.models.lists.Seleccionados.push({label: usuario.Equipo2, Creditos: Creditos2});}
		 if(usuario.Equipo3 != ""){$scope.models.lists.Seleccionados.push({label: usuario.Equipo3, Creditos: Creditos3});}
		 if(usuario.Equipo4 != ""){$scope.models.lists.Seleccionados.push({label: usuario.Equipo4, Creditos: Creditos4});}
		
		
		$scope.$apply(); 
		
		 firebase.database().ref('Equipos').once('value').then(function(snapshot) {
	 var equipos = snapshot.val();
	 var equipo = new Object();
	 for(equipo in equipos){
		 if (!objectFindByKey($scope.models.lists.Seleccionados,'label',equipo)){
		$scope.models.lists.Disponibles.push({label: equipo, Creditos: equipos[equipo].Creditos});	 
		 }
		
		 
	 }
	 
     $scope.$apply(); 
	 
   });
   
	});
	
	$scope.$watch('dropdown', function(dropdown) {
		var Total = 0;
		if(dropdown.jugadorSelect != null){
			
			Total = objectFindByKeyValue(dropdown.list.Jugadores,'label',dropdown.jugadorSelect)
			
		}
		//Para las selecciones
		for(var equipo in $scope.models.lists.Seleccionados){
			if(objectFindByKey($scope.Selecciones.list.Totales,'label',$scope.models.lists.Seleccionados[equipo].label)){
			   Total = Total + objectFindByKeyValue($scope.Selecciones.list.Totales,'label',$scope.models.lists.Seleccionados[equipo].label);
			}
			//Total = Total +  model.lists.Seleccionados[equipo].Creditos;
		}
		
       $scope.CreditosTotales = 35 - Total;
    }, true);	
  
  	
    $scope.$watch('models', function(model) {
		
		var Total = 0;
		for(var equipo in model.lists.Seleccionados){
			if(objectFindByKey($scope.Selecciones.list.Totales,'label',model.lists.Seleccionados[equipo].label)){
			   Total = Total + objectFindByKeyValue($scope.Selecciones.list.Totales,'label',model.lists.Seleccionados[equipo].label);
			}
			//Total = Total +  model.lists.Seleccionados[equipo].Creditos;
		}
		//Para los jugadores
			if($scope.dropdown.jugadorSelect != null){				
				var CreditosJugador;
				CreditosJugador = objectFindByKeyValue($scope.dropdown.list.Jugadores,'label',$scope.dropdown.jugadorSelect);
				Total = Total + CreditosJugador
			}
       $scope.CreditosTotales = 35 - Total;
    }, true);

   	//PAra guardar	 
 $scope.Guardar = function(event) {
    event.preventDefault();  // To prevent form refresh
	if($scope.models.lists.Seleccionados.length >4){
		alert('Has seleccionado mas de 4 equipos!');
		return false;
	}
		
	if($scope.models.lists.Seleccionados[0] != null){var Equipo1 = $scope.models.lists.Seleccionados[0].label;}else{var Equipo1 = "";}
	if($scope.models.lists.Seleccionados[1] != null){var Equipo2 = $scope.models.lists.Seleccionados[1].label;}else{var Equipo2 = "";}
	if($scope.models.lists.Seleccionados[2] != null){var Equipo3 = $scope.models.lists.Seleccionados[2].label;}else{var Equipo3 = "";}
	if($scope.models.lists.Seleccionados[3] != null){var Equipo4 = $scope.models.lists.Seleccionados[3].label;}else{var Equipo4 = "";}
	    
		//Validamos los puntos
		
	    var Total = 0;
		if($scope.dropdown.jugadorSelect != null){
			
			Total = objectFindByKeyValue($scope.dropdown.list.Jugadores,'label',$scope.dropdown.jugadorSelect)
			
		}
		//Para las selecciones
		for(var equipo in $scope.models.lists.Seleccionados){
			if(objectFindByKey($scope.Selecciones.list.Totales,'label',$scope.models.lists.Seleccionados[equipo].label)){
			   Total = Total + objectFindByKeyValue($scope.Selecciones.list.Totales,'label',$scope.models.lists.Seleccionados[equipo].label);
			}
			
		}
		
       $scope.CreditosTotales = 35 - Total;
	   if($scope.CreditosTotales < 0){
		   alert('Has gastado mas de 35 créditos');
		return false;
	   }
	//Jugadores
		if($scope.dropdown.jugadorSelect != null){				
				var Jugador = $scope.dropdown.jugadorSelect;				
		}
		
	writeEquipos(user,Equipo1,Equipo2,Equipo3,Equipo4,Jugador);
	 
}
}]);

function objectFindByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return true;
        }
    }
    return false;
}

function objectFindByKeyValue(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i]['Creditos'];
        }
    }
    return 0;
}

function writeEquipos(userId, valEquipo1, valEquipo2, valEquipo3, valEquipo4, valJugador) {
  firebase.database().ref('Europorraquers/' +  userId).update({Equipo1 : valEquipo1});
  firebase.database().ref('Europorraquers/' +  userId).update({Equipo2 : valEquipo2});
  firebase.database().ref('Europorraquers/' +  userId).update({Equipo3 : valEquipo3});
  firebase.database().ref('Europorraquers/' +  userId).update({Equipo4 : valEquipo4});
  firebase.database().ref('Europorraquers/' +  userId).update({Jugador : valJugador});
 
  alert('La convocatoria se ha realizado con exito');
  
}
function handleFiles() {
 var el = document.getElementById("fileElem");
// File or Blob named mountains.jpg
var file = el.files[0]


// Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};
var user = localStorage.getItem("User");
	if(user.split("@").length > 0){
		user = user.split("@")[0];
	}
var token = localStorage.getItem("token");
 //firebase.auth().signInWithCustomToken(token).catch(function(error) {
	  // Handle Errors here.
	  //var errorCode = error.code;
	  //var errorMessage = error.message;
 
//	});

	
	var storageRef = firebase.storage().ref();
	var desertRef = storageRef.child(user  + '/' + 'avatar');
	//Borramos primero el archi avatar
	desertRef.delete().then(function() {
  // File deleted successfully
}).catch(function(error) {
  // Uh-oh, an error occurred!
});

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child(user  + '/' + 'avatar').put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
  switch (error.code) {
    case 'storage/unauthorized':
        console.log('storage/unauthorized');
      break;

    case 'storage/canceled':
       console.log('storage/canceled');
      break;

   

    case 'storage/unknown':
      console.log('storage/unknown');
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  var downloadURL = uploadTask.snapshot.downloadURL;
  document.getElementById("avatar").src = downloadURL;
  var user = localStorage.getItem("User");
	if(user.split("@").length > 0){
		user = user.split("@")[0];
	}
	var Data = {Avatar : downloadURL}
  firebase.database().ref('Europorraquers/' + user).update(Data);
});



}
