<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPmailer.php';
require 'phpmailer/src/SMTP.php';


include "config.php";

$invite = "Task Timer Invite ";


if(isset($_POST["send"])){

$request = json_decode($_POST['send']);



$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'kurukintesekalpen@gmail.com';
$mail->Password = 'qkygxchvssvmjgik';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setFrom('kurukintesekalpen@gmail.com');
$mail->addAddress($request->username);
$mail->isHTML(true);
$mail->Subject = $_POST["subject"];
$mail->Body = $_POST["message"];
$mail->send();


$response = array();

$response = createResponse(200, "Successful", "Succesful", $records);

echo json_encode($response);
}