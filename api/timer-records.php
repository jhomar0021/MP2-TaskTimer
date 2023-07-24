<?php
include "config.php";

session_start();

$createdBy = $_SESSION['logged-in-user']["id"];

if (isset($_GET['index'])) {
    $sqlCommand = "SELECT * FROM `db_timer`.`tbl_timer` WHERE `id` = $createdBy;";
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

    $registerRequest = json_decode($_POST['store']);
    $response = array();

    $sql = "INSERT INTO ". TBL_TIMER. " (`timer_name`, `id`)
    VALUES ('{$registerRequest->timer_name}','{$createdBy}')";

    $isInserted = $connection->query($sql);

    if ($isInserted) {
        $response = createResponse(200, "Successful", "Successfully Saved");
    } else {
        $response = createResponse(300, "Error", "Error while saving user");
    }

    
    echo json_encode($response);
}

if (isset($_POST['destroy'])) {
    $request = json_decode($_POST['destroy']);

    
    $sqlCommand = "DELETE FROM " . TBL_TIMER . " WHERE timer_id = '" . $request->timer_id . "'";;
    $isDeleted = $connection->query($sqlCommand);

    $response = array();

    if ($isDeleted) {
        $response = createResponse(200, "Successful", "Successfully Deleted");
    } else {
        $response = createResponse(300, "Error", "Error while deleting user");
    }

    echo json_encode($response);
}