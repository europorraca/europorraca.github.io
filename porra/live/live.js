'use strict';
 
angular.module('LaPorraca.live', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/live', {
        templateUrl: 'live/live.html',
        controller: 'LiveCtrl'
    });
}])
 
// Home controller
.controller('LiveCtrl', ['$scope','$firebaseObject','$window',function($scope,$firebaseObject,$window) {
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
	
	
	
	
	////////////Completo
	 
 $scope.GuardarCompleto = function(event) {
    event.preventDefault();  // To prevent form refresh
	
  
	
	var frase1;
	var frase2;
	var frase3;
	var frase4;
	var frase5;
	
	frase1 = {Frase: $scope.chatCompleto.list.Frases[1].Frase, Avatar: $scope.chatCompleto.list.Frases[1].Avatar};
	frase2 = {Frase: $scope.chatCompleto.list.Frases[2].Frase, Avatar: $scope.chatCompleto.list.Frases[2].Avatar};
	frase3 = {Frase: $scope.chatCompleto.list.Frases[3].Frase, Avatar: $scope.chatCompleto.list.Frases[3].Avatar};
	frase4 = {Frase: $scope.chatCompleto.list.Frases[4].Frase, Avatar: $scope.chatCompleto.list.Frases[4].Avatar};
	frase5 = {Frase: $scope.Usuario + ' : ' + $scope.Actual , Avatar : $scope.AvatarUser};
	writeUserDataCompleto(frase1,frase2,frase3,frase4,frase5,$scope);
    
    
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
function writeUserDataCompleto(frase1,frase2,frase3,frase4,frase5,$scope) {
  firebase.database().ref('Live/ChatCompleto').set({
    Frase1: frase1,
    Frase2: frase2,
	Frase3: frase3,
    Frase4: frase4,
	Frase5: frase5	
    
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