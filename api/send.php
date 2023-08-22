<?php
use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPmailer.php';
require 'phpmailer/src/SMTP.php';

session_start();

include "config.php";

$invite = "Task Timer Invite ";


if(isset($_POST["hash"])){
    $request = json_decode($_POST['hash']);

    $username = password_hash($request->username, PASSWORD_DEFAULT);
    $response = array();

    $response = createResponse(200, "Successful", "Succesful", $username);

    echo json_encode($response);
    
}


if(isset($_POST["sendinvite"])){

$request = json_decode($_POST['sendinvite']);



$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = $gmailuser;
$mail->Password = $gmailpass;
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setFrom($gmailuser);
$mail->addAddress($request->username);
$mail->isHTML(true);
$mail->Subject = $invite;
$mail->Body = $request->body;
$mail->send();


$response = array();

$response = createResponse(200, "Successful", "Succesful", $records);

echo json_encode($response);
}



if (isset($_POST['validate'])) { 

    $loginRequest = json_decode($_POST['validate']);
    $response = array();

    $sql = "SELECT * FROM " . TBL_USERS . " WHERE username = '" . $loginRequest->username . "'";
    $results = $connection->query($sql);

    $users = array();

    while ($row = $results->fetch_assoc()) {
        array_push($users, $row);
    }
    
    $response = createResponse(401, "Invalid", "Account doesn't exist");

    foreach ($users as $user) {
        if($user['is_active'] == 0){
            $response = createResponse(200, "Successful", "valid",$user['is_active']);
            if (empty($_SESSION['logged-in-user'])) {
                $_SESSION['logged-in-user'] = $user;
            }
        }

    }


    echo json_encode($response);
}

if (isset($_POST['verify'])) {
    $updaterRequest = json_decode($_POST['verify']);
    $response = array();

    if ($updaterRequest->password != $updaterRequest->confirmpassword) {
        $response = createResponse(401, "Error", "Password does not match");
    } else {
        $password = password_hash($updaterRequest->password, PASSWORD_DEFAULT);


            $sqlCommand = "UPDATE " . TBL_USERS . " SET 
            password = '{$password}',
            is_active = '1'
            WHERE username = '{$updaterRequest->username}'
            ";
            $isUpdated = $connection->query($sqlCommand);


            $isUpdated = $connection->query($sqlCommand);
        
            $response = array();
        
            if ($isUpdated) {
                $response = createResponse(200, "Successful", "Successfully Updated user");
            } else {
                $response = createResponse(300, "Error", "Error while updating user");
            }

    }
  
    echo json_encode($response);
}