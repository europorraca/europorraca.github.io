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
	}else{
		alert("Usario incorrecto por favor vuelve a loginarte")
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
 firebase.auth().signInWithCustomToken(token).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
 
	});

	
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
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

   

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
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
