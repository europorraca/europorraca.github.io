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
	firebase.database().ref('Live/Chat').once('value').then(function(snapshot) {
	 var frases = snapshot.val();
	 var frase = new Object();
	 for(frase in frases){
		if(frase != "Actual"){
		$scope.chat.list.Frases.push({Frase: frases[frase]});	
		}
		 
		 
	 }
	 
     $scope.$apply(); 
	 
   });
					
			
	 
	
	}else{
		alert("Usario incorrecto por favor vuelve a loginarte");
	}
	
	var commentsRef = firebase.database().ref('Live/Chat');
	commentsRef.on('child_changed', function(data) {
  //setCommentValues(postElement, data.key, data.val().text, data.val().author);
  //alert(data.key + ' ' + data.val().text + ' ' + data.val().author );
});
	
	// firebase.database().ref('Live/Chat/Frase1').on('value', function(snapshot) {
    
     //alert(snapshot.val());
    //});
	
	 
 $scope.Guardar = function(event) {
    event.preventDefault();  // To prevent form refresh
	
    //var frase = $scope.user.Frase;
	//for (var i = 0; i < $scope.chat.list.Frases.length - 1; i++) { 
	//$scope.chat.list.Frases[i] = $scope.chat.list.Frases[i+1]
   
  //  }
	//$scope.chat.list.Frases[$scope.chat.list.Frases.length - 1].Frase = "juan"
	
	//firebase.database().ref('Live/Chat').update($scope.chat.list.Frases);
	
	
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