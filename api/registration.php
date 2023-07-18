<?php
include "config.php";

if (isset($_POST['register'])) {
    $registerRequest = json_decode($_POST['register']);
    $response = array();

    if ($registerRequest->password != $registerRequest->confirmPassword) {
        $response = createResponse(401, "Error", "Password does not match");
    } else {
        $password = password_hash($registerRequest->password, PASSWORD_DEFAULT);

        $sqlDuplicate = "SELECT * FROM `tbl_users` WHERE username = '$registerRequest->username';";
        $results = $connection->query($sqlDuplicate);


        $count = $results->num_rows;

        if($count == 0){
            $sql = "INSERT INTO `tbl_users`(`fname`, `lname`, `account_level`, `username`, `password`, `is_active`) 
            VALUES ('{$registerRequest->fname}','{$registerRequest->lname}','1','{$registerRequest->username}','{$password}','1')";
    
            $isInserted = $connection->query($sql);
    
            if ($isInserted) {
                $response = createResponse(200, "Successful", "Successfully Saved");
            } else {
                $response = createResponse(300, "Error", "Error while saving user");
            }
        }
        else{
            $response = createResponse(300, "Error", "Username already exist");
        }

    }

    
    echo json_encode($response);
}