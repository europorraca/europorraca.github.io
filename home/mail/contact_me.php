<?php
// Check for empty fields
if(empty($_POST['email'])  		||
  
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['email'];
$email_address = $_POST['email'];

	
// Create the email and send the message
$to = 'jimmystakadugan@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: \n\nMessage:\n";
$headers = "From: jmateu@laporraca.net23.net\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
echo "mandamos mail! a $headers y $email_subject" ;
//mail($to,$email_subject,$email_body,$headers);
if(mail('jimmystakadugan@gmail.com', 'My Subject', 'pepepepepe')){
	  echo 'Email on the way';
}
return true;			
?>