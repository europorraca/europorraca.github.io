'use strict';
var mymodal = angular.module('mymodal', []);
 
angular.module('LaPorraca.live', ['ngRoute','firebase'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/live', {
        templateUrl: 'live/live.html',
        controller: 'LiveCtrl'
    });
}])
 
// Home controller
.controller('LiveCtrl', ['$scope','$firebaseObject','$window','$http',function($scope,$firebaseObject,$window,$http) {
	 $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
	
	$.ajax({
  headers: { 'X-Auth-Token': 'dd0896404b00402fa3181ac867bce4d1' },
  url: 'http://api.football-data.org/v1/soccerseasons/424',
  dataType: 'json',
  type: 'GET',
}).done(function(response) {
  // do something with the response, e.g. isolate the id of a linked resource        
  var regex = /.*?(\d+)$/; // the ? makes the first part non-greedy
  $scope.partidoActual = response.currentMatchday;
   
}); 
	
	$.ajax({
  headers: { 'X-Auth-Token': 'dd0896404b00402fa3181ac867bce4d1' },
  url: 'http://api.football-data.org/v1/soccerseasons/424/fixtures',
  dataType: 'json',
  type: 'GET',
}).done(function(response) {
  // do something with the response, e.g. isolate the id of a linked resource        
  
   //$scope.golEncasa = response.fixtures[$scope.partidoActual-1].result.goalsHomeTeam;
   //$scope.golFuera = response.fixtures[$scope.partidoActual-1].result.goalsAwayTeam;
   $scope.golEncasa = 3;
   $scope.golFuera = 1;
   $scope.EquipoCasa = response.fixtures[$scope.partidoActual-1].homeTeamName
   $scope.EquipoFuera = response.fixtures[$scope.partidoActual-1].awayTeamName
  $scope.$apply(); 
}); 


		
		
		
	var firebaseObj = new Firebase("https://blinding-fire-4682.firebaseio.com/");	
	var user = localStorage.getItem("User");
	if(user.split("@").length > 0){
		user = user.split("@")[0];
	}
	if(user != null ){
	
		$scope.Usuario = user;
	
	$scope.Actual = "";
    $scope.chat = {        
        list: {"Frases": []   }
    };
	
	firebase.database().ref('Europorraquers/' + user).once('value').then(function(snapshot) {
		$scope.AvatarUser = snapshot.val().Avatar;
	});
	
	 $scope.chatCompleto = {        
        list: {"Frases": []   }
    };
	
	
	firebase.database().ref('Live/ChatCompleto').on('value', function(snapshot) {
		var frases = snapshot.val();
  updateStarCount($scope, frases);
});
	
	
	firebase.database().ref('Live/Chat').once('value').then(function(snapshot) {
	 var frases = snapshot.val();
	 var frase = new Object();
	 for(frase in frases){
		
		$scope.chat.list.Frases.push({Frase: frases[frase]});	
		
		 
		 
	 }
	 
     $scope.$apply(); 
	 
   });
   
  
	//firebase.database().ref('Live/ChatCompleto').once('value').then(function(snapshot) {
	// var frases = snapshot.val();
	// var frase = new Object();
	// for(frase in frases){
		
	//	$scope.chatCompleto.list.Frases.push({Frase: frases[frase].Frase, Avatar: frases[frase].Avatar});	
		
		 
		 
	// }
	 
    // $scope.$apply(); 
	 
   //});
					
			
	 
	
	}else{
		alert("Usario incorrecto por favor vuelve a loginarte");
	}
	
	$("#fraseActual").keyup(function(event){
    if(event.keyCode == 13){
        $("#enviar").click();
    }
});
	$scope.Cerveza = function(event) {
    event.preventDefault();  // To prevent form refresh
	if(document.getElementById("cerveza").hidden == false){
		document.getElementById("cerveza").hidden = true;	
	}else{
		document.getElementById("cerveza").hidden = false;
	}
	
  
    
    
}
	
	////////////Completo
	 
 $scope.GuardarCompleto = function(event) {
    event.preventDefault();  // To prevent form refresh
	
  
	
	var frase1;
	var frase2;
	var frase3;
	var frase4;
	var frase5;
	var frase6;
	var frase7;
	var frase8;
	
	var fraseActual = document.getElementById("fraseActual").value;
	frase1 = {Frase: $scope.chatCompleto.list.Frases[1].Frase, Avatar: $scope.chatCompleto.list.Frases[1].Avatar};
	frase2 = {Frase: $scope.chatCompleto.list.Frases[2].Frase, Avatar: $scope.chatCompleto.list.Frases[2].Avatar};
	frase3 = {Frase: $scope.chatCompleto.list.Frases[3].Frase, Avatar: $scope.chatCompleto.list.Frases[3].Avatar};
	frase4 = {Frase: $scope.chatCompleto.list.Frases[4].Frase, Avatar: $scope.chatCompleto.list.Frases[4].Avatar};
	frase5 = {Frase: $scope.chatCompleto.list.Frases[5].Frase, Avatar: $scope.chatCompleto.list.Frases[5].Avatar};
	frase6 = {Frase: $scope.chatCompleto.list.Frases[6].Frase, Avatar: $scope.chatCompleto.list.Frases[6].Avatar};
	frase7 = {Frase: $scope.chatCompleto.list.Frases[7].Frase, Avatar: $scope.chatCompleto.list.Frases[7].Avatar};
	frase8 = {Frase: $scope.Usuario + ' : ' + fraseActual , Avatar : $scope.AvatarUser};
	writeUserDataCompleto(frase1,frase2,frase3,frase4,frase5,frase6,frase7,frase8,$scope);
    
    
}
////////////simple
	 
 $scope.Guardar = function(event) {
    event.preventDefault();  // To prevent form refresh
	
  
	
	var frase1;
	var frase2;
	var frase3;
	var frase4;
	var frase5;
	
	frase1 = $scope.chat.list.Frases[1].Frase;
	frase2 = $scope.chat.list.Frases[2].Frase;
	frase3 = $scope.chat.list.Frases[3].Frase;
	frase4 = $scope.chat.list.Frases[4].Frase;
	frase5 = $scope.Usuario + ' : ' + $scope.Actual;
	writeUserData(frase1,frase2,frase3,frase4,frase5,$scope);
    
    
}

}]);

function writeUserData(frase1,frase2,frase3,frase4,frase5,$scope) {
  firebase.database().ref('Live/Chat').set({
    Frase1: frase1,
    Frase2: frase2,
	Frase3: frase3,
    Frase4: frase4,
	Frase5: frase5	
    
  });
  firebase.database().ref('Live/Chat').once('value').then(function(snapshot) {
	 var frases = snapshot.val();
	 var frase = new Object();
	 $scope.chat = {        
        list: {"Frases": []   }
    };
	$scope.Actual = "";
	 for(frase in frases){		
		$scope.chat.list.Frases.push({Frase: frases[frase]});	
			 
		 
	 }
	 
     $scope.$apply(); 
	 
   });
}

///////////COMPLETO
function writeUserDataCompleto(frase1,frase2,frase3,frase4,frase5,frase6,frase7,frase8,$scope) {
  firebase.database().ref('Live/ChatCompleto').set({
    Frase1: frase1,
    Frase2: frase2,
	Frase3: frase3,
    Frase4: frase4,
	Frase5: frase5,	
	Frase6: frase6,
	Frase7: frase7,
	Frase8: frase8    
  });
  firebase.database().ref('Live/ChatCompleto').once('value').then(function(snapshot) {
	 var frases = snapshot.val();
	 var frase = new Object();
	 $scope.chatCompleto = {        
        list: {"Frases": []   }
    };
	$scope.Actual = "";
	 for(frase in frases){		
		$scope.chatCompleto.list.Frases.push({Frase: frases[frase].Frase, Avatar: frases[frase].Avatar});		
			
		 	 }
	 document.getElementById("fraseActual").value = "";
     $scope.$apply(); 
	 
   });
}


function updateStarCount($scope, frases){
	
	 var frase = new Object();
	 $scope.chatCompleto = {        
        list: {"Frases": []   }
    };
	$scope.Actual = "";
	 for(frase in frases){		
		$scope.chatCompleto.list.Frases.push({Frase: frases[frase].Frase, Avatar: frases[frase].Avatar});		
			
		 	 }
	 
     $scope.$apply(); 
}

 


