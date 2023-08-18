<?php
session_start();
include "config.php";

if (isset($_POST['auth'])) { 

    $loginRequest = json_decode($_POST['auth']);
    $response = array();

    $sql = "SELECT * FROM " . TBL_USERS . " WHERE username = '" . $loginRequest->username . "'";
    $results = $connection->query($sql);

    $users = array();

    while ($row = $results->fetch_assoc()) {
        array_push($users, $row);
    }
    
    $response = createResponse(401, "Log-in Failed", "Account doesn't exist");

    foreach ($users as $user) {

        if (password_verify($loginRequest->password, $user['password'])) {

            if($user['account_level'] == 2){
                $response = createResponse(200, "Successful", "Admin Access");
                if (empty($_SESSION['logged-in-user'])) {
                    $_SESSION['logged-in-user'] = $user;
                }
            }

            else{
                $response = createResponse(200, "Successful", "User Access");
                if (empty($_SESSION['logged-in-user'])) {
                    $_SESSION['logged-in-user'] = $user;
                }
            }
        }

        else {
            $response = createResponse(401, "Log-in Failed!", "Username/Password does not match");
        }
    }


    echo json_encode($response);
}