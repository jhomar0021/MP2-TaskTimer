<?php
include "config.php";

if (isset($_POST['submits'])) {
    $timestamp = json_decode($_POST['submits']);
    $response = array();
    echo $timestamp->timer_id;

    /**
     * Please change column names and values
     */
    $sql = "INSERT INTO `submit_stamp`(`submit`, `timer_id`, `time_stamp`) VALUES ('1','{$timestamp->timer_id}','{$timestamp->time_stamp}');";


    $isInserted = $connection->query($sql);

    if ($isInserted) {
        $response = createResponse(200, "Successful", "Successfully Saved",$timestamp);
    } else {
        $response = createResponse(300, "Error", "Error while saving user");
    }

    
    echo json_encode($response);
}