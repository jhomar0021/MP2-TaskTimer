<?php
session_start();
include "config.php";

if (isset($_POST['getLoggedUser'])) {

    if (isset($_SESSION['logged-in-user'])) {
        $response = createResponse(200, "Succesful", "Successful", $_SESSION['logged-in-user']);

        $sqlCommand = "UPDATE " . TBL_USERS . " SET 
        is_online = '1'
        WHERE id = {$_SESSION['logged-in-user']["id"]}
        ";
        $isUpdated = $connection->query($sqlCommand);

    } else {
        $response = createResponse(401, "Forbidden", "Error Accessing Page");
    }
    
    echo json_encode($response);
}

if (isset($_POST['logout'])) {

    $sqlCommand = "UPDATE " . TBL_USERS . " SET 
    is_online = '0'
    WHERE id = {$_SESSION['logged-in-user']["id"]}
    ";
    $isUpdated = $connection->query($sqlCommand);

    session_destroy();

    $response = createResponse(200, "Succesful", "Successfully Logout");

    echo json_encode($response);
}