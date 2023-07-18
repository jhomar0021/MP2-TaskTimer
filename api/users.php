<?php
include "config.php";


if (isset($_GET['index'])) {
    $sqlCommand = "SELECT * FROM " . TBL_USERS;
    $results = $connection->query($sqlCommand);

    $response = array();
    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $response = createResponse(200, "Successful", "Succesful", $records);

    echo json_encode($response);
}

if (isset($_GET['show'])) {
    $request = json_decode($_GET['show']);

    $sqlCommand = "SELECT * FROM " . TBL_USERS . " WHERE id = " . $request->id;
    $results = $connection->query($sqlCommand);

    $response = array();
    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $response = createResponse(200, "Successful", "Succesful", $records);

    echo json_encode($response);
}

if (isset($_POST['store'])) {
    $registerRequest = json_decode($_POST['register']);
    $response = array();

    if ($registerRequest->password != $registerRequest->confirmPassword) {
        $response = createResponse(401, "Error", "Password does not match");
    } else {
        $password = password_hash($registerRequest->password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO `tbl_users`(`fname`, `lname`, `course_id`, `username`, `password`, `is_active`) 
        VALUES ('{$registerRequest->fname}','{$registerRequest->lname}','1','{$registerRequest->username}','{$password}','1')";

        $isInserted = $connection->query($sql);

        if ($isInserted) {
            $response = createResponse(200, "Successful", "Successfully Saved");
        } else {
            $response = createResponse(300, "Error", "Error while saving user");
        }
    }

    
    echo json_encode($response);
}

if (isset($_POST['update'])) {
    $request = json_decode($_POST['update']);

    $sqlCommand = "UPDATE " . TBL_USERS . " SET 
    fname = '{$request->record->fname}',
    lname = '{$request->record->lname}',
    username = '{$request->record->username}'
    WHERE id = {$request->id}
    ";
    $isUpdated = $connection->query($sqlCommand);

    $response = array();

    if ($isUpdated) {
        $response = createResponse(200, "Successful", "Successfully Updated user");
    } else {
        $response = createResponse(300, "Error", "Error while updating user");
    }

    echo json_encode($response);
}

if (isset($_POST['destroy'])) {
    $request = json_decode($_POST['destroy']);

    $sqlCommand = "DELETE FROM " . TBL_USERS . " WHERE id = " . $request->id;
    $isDeleted = $connection->query($sqlCommand);

    $response = array();

    if ($isDeleted) {
        $response = createResponse(200, "Successful", "Successfully Deleted");
    } else {
        $response = createResponse(300, "Error", "Error while deleting user");
    }

    echo json_encode($response);
}