<?php
session_start();
include "config.php";

if (isset($_POST['getLoggedUser'])) {

    if (isset($_SESSION['logged-in-user'])) {
        $response = createResponse(200, "Succesful", "Successful", $_SESSION['logged-in-user']);
    } else {
        $response = createResponse(401, "Forbidden", "Error Accessing Page");
    }
    
    echo json_encode($response);
}

if (isset($_POST['logout'])) {
    session_destroy();

    $response = createResponse(200, "Succesful", "Successfully Logout");

    echo json_encode($response);
}