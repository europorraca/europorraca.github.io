'use strict';
 
angular.module('myApp.home', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])
 
// Home controller
.controller('HomeCtrl', ['$scope','$firebaseSimpleLogin','$window',function($scope,$firebaseSimpleLogin,$window) {
	var firebaseObj = new Firebase("https://blinding-fire-4682.firebaseio.com/");
	var loginObj = $firebaseSimpleLogin(firebaseObj);
 
 
 var user = localStorage.getItem("User");
 if(user !=null ){
	 localStorage.setItem("User",null);
 }
 $scope.SignIn = function(event) {
    event.preventDefault();  // To prevent form refresh
	if($scope.user == null){
		 alert('Faltan campos por rellenar');
	}else{
	var username = $scope.user.email;
    var password = $scope.user.password;
    firebase.initializeApp(config);
	firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

	     loginObj.$login('password', {
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
			localStorage.setItem("User", username);
			localStorage.setItem("token", user.firebaseAuthToken);
			
            $window.location.href = 'porra/porra.html';
        }, function(error) {
            // Failure callback
           alert('Error al loginarte');
        });	 
		
	}
    
    
}


 $scope.Mail = function(event) {
	  // get values from FORM
            var name = $("input#email").val();
            var email = $("input#email").val();
           
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "home/mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,                   
                    email: email
                    
                },
                cache: false,
                success: function() {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
}
}]);